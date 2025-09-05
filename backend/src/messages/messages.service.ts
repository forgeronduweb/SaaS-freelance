import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createConversation(createConversationDto: CreateConversationDto, createdById: string) {
    // Vérifier que tous les participants existent
    const participants = await this.usersService.findAll();
    const validParticipantIds = participants.map(p => p.id);
    const invalidIds = createConversationDto.participantIds.filter(id => !validParticipantIds.includes(id));
    
    if (invalidIds.length > 0) {
      throw new BadRequestException(`Participants non trouvés: ${invalidIds.join(', ')}`);
    }

    // Ajouter le créateur aux participants s'il n'y est pas déjà
    const allParticipantIds = [...new Set([...createConversationDto.participantIds, createdById])];
    
    // Pour les conversations directes, limiter à 2 participants
    if (createConversationDto.type === 'DIRECT' && allParticipantIds.length > 2) {
      throw new BadRequestException('Une conversation directe ne peut avoir que 2 participants');
    }

    // Vérifier si une conversation directe existe déjà entre ces participants
    if (createConversationDto.type === 'DIRECT' && allParticipantIds.length === 2) {
      const existingConversation = await this.findDirectConversation(allParticipantIds[0], allParticipantIds[1]);
      if (existingConversation) {
        return existingConversation;
      }
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        title: createConversationDto.title,
        type: createConversationDto.type,
        createdById,
        missionId: createConversationDto.missionId,
        unreadCounts: allParticipantIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {}),
        participants: {
          create: allParticipantIds.map(userId => ({
            userId,
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        createdBy: true,
      },
    });

    return conversation;
  }

  async findUserConversations(userId: string, page: number = 1, limit: number = 10): Promise<{ conversations: Conversation[], total: number }> {
    const queryBuilder = this.conversationsRepository.createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participants')
      .leftJoinAndSelect('conversation.mission', 'mission')
      .leftJoin('conversation.participants', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('conversation.isActive = :isActive', { isActive: true });

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('conversation.lastMessageAt', 'DESC')
                .addOrderBy('conversation.updatedAt', 'DESC');

    const [conversations, total] = await queryBuilder.getManyAndCount();

    return { conversations, total };
  }

  async findConversation(id: string, userId: string): Promise<Conversation> {
    const conversation = await this.conversationsRepository.findOne({
      where: { id },
      relations: ['participants', 'mission', 'messages', 'messages.sender'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }

    // Vérifier que l'utilisateur fait partie de la conversation
    const isParticipant = conversation.participants.some(p => p.id === userId);
    if (!isParticipant) {
      throw new ForbiddenException('Non autorisé à accéder à cette conversation');
    }

    return conversation;
  }

  async sendMessage(createMessageDto: CreateMessageDto, senderId: string): Promise<Message> {
    const conversation = await this.findConversation(createMessageDto.conversationId, senderId);

    // Vérifier que la conversation est active
    if (!conversation.isActive) {
      throw new BadRequestException('Impossible d\'envoyer un message dans une conversation inactive');
    }

    const message = this.messagesRepository.create({
      ...createMessageDto,
      senderId,
      readBy: { [senderId]: new Date() }, // Le sender a automatiquement lu son message
    });

    const savedMessage = await this.messagesRepository.save(message);

    // Mettre à jour la conversation
    await this.updateConversationLastMessage(createMessageDto.conversationId, savedMessage.id);

    // Incrémenter les compteurs de messages non lus pour les autres participants
    await this.incrementUnreadCounts(createMessageDto.conversationId, senderId);

    return savedMessage;
  }

  async getConversationMessages(
    conversationId: string, 
    userId: string, 
    page: number = 1, 
    limit: number = 50
  ): Promise<{ messages: Message[], total: number }> {
    // Vérifier l'accès à la conversation
    await this.findConversation(conversationId, userId);

    const queryBuilder = this.messagesRepository.createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.replyTo', 'replyTo')
      .leftJoinAndSelect('replyTo.sender', 'replyToSender')
      .where('message.conversationId = :conversationId', { conversationId })
      .andWhere('message.deletedAt IS NULL');

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('message.createdAt', 'DESC');

    const [messages, total] = await queryBuilder.getManyAndCount();

    // Marquer les messages comme lus
    await this.markMessagesAsRead(conversationId, userId);

    return { messages: messages.reverse(), total }; // Inverser pour avoir l'ordre chronologique
  }

  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    const conversation = await this.findConversation(conversationId, userId);

    // Marquer tous les messages non lus comme lus
    await this.messagesRepository
      .createQueryBuilder()
      .update(Message)
      .set({
        readBy: () => `JSON_SET(COALESCE(readBy, '{}'), '$.${userId}', NOW())`,
        status: MessageStatus.READ,
        readAt: new Date(),
      })
      .where('conversationId = :conversationId', { conversationId })
      .andWhere('senderId != :userId', { userId })
      .andWhere(`JSON_EXTRACT(readBy, '$.${userId}') IS NULL`)
      .execute();

    // Réinitialiser le compteur de messages non lus
    const unreadCounts = conversation.unreadCounts || {};
    unreadCounts[userId] = 0;

    await this.conversationsRepository.update(conversationId, {
      unreadCounts,
    });
  }

  async editMessage(messageId: string, newContent: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['conversation', 'conversation.participants'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Vérifier que l'utilisateur est l'expéditeur du message
    if (message.senderId !== userId) {
      throw new ForbiddenException('Non autorisé à modifier ce message');
    }

    // Vérifier que l'utilisateur fait partie de la conversation
    const isParticipant = message.conversation.participants.some(p => p.id === userId);
    if (!isParticipant) {
      throw new ForbiddenException('Non autorisé');
    }

    // Sauvegarder le contenu original
    if (!message.isEdited) {
      message.originalContent = message.content;
    }

    message.content = newContent;
    message.isEdited = true;
    message.editedAt = new Date();

    return await this.messagesRepository.save(message);
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['conversation', 'conversation.participants'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Vérifier que l'utilisateur est l'expéditeur du message
    if (message.senderId !== userId) {
      throw new ForbiddenException('Non autorisé à supprimer ce message');
    }

    // Marquer comme supprimé au lieu de supprimer physiquement
    message.status = MessageStatus.DELETED;
    message.deletedAt = new Date();
    message.content = '[Message supprimé]';

    await this.messagesRepository.save(message);
  }

  async archiveConversation(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.findConversation(conversationId, userId);

    conversation.isArchived = true;
    return await this.conversationsRepository.save(conversation);
  }

  async unarchiveConversation(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.findConversation(conversationId, userId);

    conversation.isArchived = false;
    return await this.conversationsRepository.save(conversation);
  }

  async muteConversation(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.findConversation(conversationId, userId);

    conversation.isMuted = true;
    return await this.conversationsRepository.save(conversation);
  }

  async unmuteConversation(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.findConversation(conversationId, userId);

    conversation.isMuted = false;
    return await this.conversationsRepository.save(conversation);
  }

  async addReaction(messageId: string, emoji: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['conversation', 'conversation.participants'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Vérifier que l'utilisateur fait partie de la conversation
    const isParticipant = message.conversation.participants.some(p => p.id === userId);
    if (!isParticipant) {
      throw new ForbiddenException('Non autorisé');
    }

    const reactions = message.reactions || {};
    if (!reactions[emoji]) {
      reactions[emoji] = [];
    }

    // Ajouter la réaction si elle n'existe pas déjà
    if (!reactions[emoji].includes(userId)) {
      reactions[emoji].push(userId);
    }

    message.reactions = reactions;
    return await this.messagesRepository.save(message);
  }

  async removeReaction(messageId: string, emoji: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId },
      relations: ['conversation', 'conversation.participants'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    const reactions = message.reactions || {};
    if (reactions[emoji]) {
      reactions[emoji] = reactions[emoji].filter(id => id !== userId);
      
      // Supprimer l'emoji s'il n'y a plus de réactions
      if (reactions[emoji].length === 0) {
        delete reactions[emoji];
      }
    }

    message.reactions = reactions;
    return await this.messagesRepository.save(message);
  }

  private async findDirectConversation(userId1: string, userId2: string): Promise<Conversation | null> {
    const conversation = await this.conversationsRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participants')
      .where('conversation.type = :type', { type: ConversationType.DIRECT })
      .andWhere('conversation.isActive = :isActive', { isActive: true })
      .getMany();

    // Filtrer pour trouver la conversation avec exactement ces 2 participants
    const directConversation = conversation.find(conv => {
      const participantIds = conv.participants.map(p => p.id).sort();
      const targetIds = [userId1, userId2].sort();
      return participantIds.length === 2 && 
             participantIds[0] === targetIds[0] && 
             participantIds[1] === targetIds[1];
    });

    return directConversation || null;
  }

  private async updateConversationLastMessage(conversationId: string, messageId: string): Promise<void> {
    await this.conversationsRepository.update(conversationId, {
      lastMessageId: messageId,
      lastMessageAt: new Date(),
      messagesCount: () => 'messagesCount + 1',
    });
  }

  private async incrementUnreadCounts(conversationId: string, senderId: string): Promise<void> {
    const conversation = await this.conversationsRepository.findOne({
      where: { id: conversationId },
      relations: ['participants'],
    });

    if (!conversation) return;

    const unreadCounts = conversation.unreadCounts || {};
    
    // Incrémenter pour tous les participants sauf l'expéditeur
    conversation.participants.forEach(participant => {
      if (participant.id !== senderId) {
        unreadCounts[participant.id] = (unreadCounts[participant.id] || 0) + 1;
      }
    });

    await this.conversationsRepository.update(conversationId, {
      unreadCounts,
    });
  }
}
