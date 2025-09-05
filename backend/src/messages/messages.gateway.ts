import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/messages',
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      console.log(`Client déconnecté: ${client.id} (User: ${userId})`);
    }
  }

  @SubscribeMessage('authenticate')
  async handleAuthenticate(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(client.id, data.userId);
    client.join(`user_${data.userId}`);
    
    console.log(`Utilisateur authentifié: ${data.userId} (Socket: ${client.id})`);
    
    client.emit('authenticated', { success: true });
  }

  @SubscribeMessage('join_conversation')
  async handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      client.emit('error', { message: 'Non authentifié' });
      return;
    }

    try {
      // Vérifier que l'utilisateur a accès à cette conversation
      await this.messagesService.findConversation(data.conversationId, userId);
      
      client.join(`conversation_${data.conversationId}`);
      client.emit('joined_conversation', { conversationId: data.conversationId });
      
      console.log(`User ${userId} rejoint la conversation ${data.conversationId}`);
    } catch (error) {
      client.emit('error', { message: 'Accès refusé à cette conversation' });
    }
  }

  @SubscribeMessage('leave_conversation')
  async handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`conversation_${data.conversationId}`);
    client.emit('left_conversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      client.emit('error', { message: 'Non authentifié' });
      return;
    }

    try {
      const message = await this.messagesService.sendMessage(createMessageDto, userId);
      
      // Envoyer le message à tous les participants de la conversation
      this.server
        .to(`conversation_${createMessageDto.conversationId}`)
        .emit('new_message', message);

      // Envoyer une notification aux utilisateurs hors ligne
      // TODO: Intégrer avec le service de notifications
      
      client.emit('message_sent', { messageId: message.id });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('typing_start')
  async handleTypingStart(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    client.broadcast
      .to(`conversation_${data.conversationId}`)
      .emit('user_typing', { userId, conversationId: data.conversationId });
  }

  @SubscribeMessage('typing_stop')
  async handleTypingStop(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    client.broadcast
      .to(`conversation_${data.conversationId}`)
      .emit('user_stopped_typing', { userId, conversationId: data.conversationId });
  }

  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    try {
      await this.messagesService.markMessagesAsRead(data.conversationId, userId);
      
      // Notifier les autres participants que les messages ont été lus
      client.broadcast
        .to(`conversation_${data.conversationId}`)
        .emit('messages_read', { userId, conversationId: data.conversationId });
        
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('add_reaction')
  async handleAddReaction(
    @MessageBody() data: { messageId: string, emoji: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    try {
      const message = await this.messagesService.addReaction(data.messageId, data.emoji, userId);
      
      // Notifier tous les participants de la conversation
      this.server
        .to(`conversation_${message.conversationId}`)
        .emit('reaction_added', {
          messageId: data.messageId,
          emoji: data.emoji,
          userId,
          reactions: message.reactions,
        });
        
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('remove_reaction')
  async handleRemoveReaction(
    @MessageBody() data: { messageId: string, emoji: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    try {
      const message = await this.messagesService.removeReaction(data.messageId, data.emoji, userId);
      
      // Notifier tous les participants de la conversation
      this.server
        .to(`conversation_${message.conversationId}`)
        .emit('reaction_removed', {
          messageId: data.messageId,
          emoji: data.emoji,
          userId,
          reactions: message.reactions,
        });
        
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  // Méthodes utilitaires pour envoyer des notifications
  async notifyUser(userId: string, event: string, data: any) {
    this.server.to(`user_${userId}`).emit(event, data);
  }

  async notifyConversation(conversationId: string, event: string, data: any) {
    this.server.to(`conversation_${conversationId}`).emit(event, data);
  }

  getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.values());
  }

  isUserConnected(userId: string): boolean {
    return Array.from(this.connectedUsers.values()).includes(userId);
  }
}
