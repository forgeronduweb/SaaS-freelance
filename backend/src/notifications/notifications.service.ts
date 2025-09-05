import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationType, NotificationPriority, NotificationChannel } from './enums/notification-type.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private preferencesRepository: Repository<NotificationPreference>,
    private usersService: UsersService,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      scheduledFor: createNotificationDto.scheduledFor ? new Date(createNotificationDto.scheduledFor) : null,
      expiresAt: createNotificationDto.expiresAt ? new Date(createNotificationDto.expiresAt) : null,
    });

    const savedNotification = await this.notificationsRepository.save(notification);

    // Envoyer la notification selon les préférences de l'utilisateur
    await this.deliverNotification(savedNotification);

    return savedNotification;
  }

  async findUserNotifications(
    userId: string, 
    page: number = 1, 
    limit: number = 20,
    unreadOnly: boolean = false
  ): Promise<{ notifications: Notification[], total: number, unreadCount: number }> {
    const queryBuilder = this.notificationsRepository.createQueryBuilder('notification')
      .leftJoinAndSelect('notification.sender', 'sender')
      .where('notification.userId = :userId', { userId })
      .andWhere('notification.isArchived = :isArchived', { isArchived: false });

    if (unreadOnly) {
      queryBuilder.andWhere('notification.isRead = :isRead', { isRead: false });
    }

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('notification.createdAt', 'DESC');

    const [notifications, total] = await queryBuilder.getManyAndCount();

    // Compter les notifications non lues
    const unreadCount = await this.notificationsRepository.count({
      where: { userId, isRead: false, isArchived: false },
    });

    return { notifications, total, unreadCount };
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    notification.isRead = true;
    notification.readAt = new Date();

    return await this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
  }

  async archiveNotification(notificationId: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    notification.isArchived = true;
    notification.archivedAt = new Date();

    return await this.notificationsRepository.save(notification);
  }

  async deleteNotification(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    await this.notificationsRepository.remove(notification);
  }

  async getUserPreferences(userId: string): Promise<NotificationPreference[]> {
    return await this.preferencesRepository.find({
      where: { userId },
    });
  }

  async updatePreference(
    userId: string,
    notificationType: NotificationType,
    preferences: Partial<NotificationPreference>
  ): Promise<NotificationPreference> {
    let preference = await this.preferencesRepository.findOne({
      where: { userId, notificationType },
    });

    if (!preference) {
      preference = this.preferencesRepository.create({
        userId,
        notificationType,
        ...preferences,
      });
    } else {
      Object.assign(preference, preferences);
    }

    return await this.preferencesRepository.save(preference);
  }

  async createDefaultPreferences(userId: string): Promise<void> {
    const defaultPreferences = [
      // Missions
      { type: NotificationType.NEW_MISSION, inApp: true, email: true, push: true },
      { type: NotificationType.MISSION_APPLICATION, inApp: true, email: true, push: true },
      { type: NotificationType.APPLICATION_ACCEPTED, inApp: true, email: true, push: true },
      { type: NotificationType.APPLICATION_REJECTED, inApp: true, email: false, push: false },
      { type: NotificationType.MISSION_COMPLETED, inApp: true, email: true, push: true },
      
      // Messages
      { type: NotificationType.NEW_MESSAGE, inApp: true, email: false, push: true },
      
      // Paiements
      { type: NotificationType.PAYMENT_RECEIVED, inApp: true, email: true, push: true },
      { type: NotificationType.ESCROW_RELEASED, inApp: true, email: true, push: true },
      
      // Système
      { type: NotificationType.ACCOUNT_VERIFIED, inApp: true, email: true, push: false },
      { type: NotificationType.SECURITY_ALERT, inApp: true, email: true, push: true },
    ];

    for (const pref of defaultPreferences) {
      await this.preferencesRepository.save({
        userId,
        notificationType: pref.type,
        inAppEnabled: pref.inApp,
        emailEnabled: pref.email,
        pushEnabled: pref.push,
        instantDelivery: true,
      });
    }
  }

  // Méthodes utilitaires pour créer des notifications spécifiques
  async notifyNewMission(missionId: string, missionTitle: string, freelanceIds: string[]): Promise<void> {
    for (const freelanceId of freelanceIds) {
      await this.createNotification({
        title: 'Nouvelle mission disponible',
        message: `Une nouvelle mission "${missionTitle}" correspond à vos compétences`,
        type: NotificationType.NEW_MISSION,
        priority: NotificationPriority.NORMAL,
        userId: freelanceId,
        metadata: { missionId, actionUrl: `/missions/${missionId}` },
      });
    }
  }

  async notifyMissionApplication(clientId: string, missionTitle: string, freelanceName: string, applicationId: string): Promise<void> {
    await this.createNotification({
      title: 'Nouvelle candidature',
      message: `${freelanceName} a postulé à votre mission "${missionTitle}"`,
      type: NotificationType.MISSION_APPLICATION,
      priority: NotificationPriority.HIGH,
      userId: clientId,
      metadata: { applicationId, actionUrl: `/missions/applications/${applicationId}` },
    });
  }

  async notifyApplicationAccepted(freelanceId: string, missionTitle: string, clientName: string): Promise<void> {
    await this.createNotification({
      title: 'Candidature acceptée !',
      message: `${clientName} a accepté votre candidature pour "${missionTitle}"`,
      type: NotificationType.APPLICATION_ACCEPTED,
      priority: NotificationPriority.HIGH,
      userId: freelanceId,
      metadata: { actionUrl: `/dashboard/freelance` },
    });
  }

  async notifyNewMessage(userId: string, senderName: string, conversationId: string): Promise<void> {
    await this.createNotification({
      title: 'Nouveau message',
      message: `${senderName} vous a envoyé un message`,
      type: NotificationType.NEW_MESSAGE,
      priority: NotificationPriority.NORMAL,
      userId,
      metadata: { conversationId, actionUrl: `/messages/${conversationId}` },
    });
  }

  async notifyPaymentReceived(userId: string, amount: number, description: string): Promise<void> {
    await this.createNotification({
      title: 'Paiement reçu',
      message: `Vous avez reçu ${amount.toLocaleString()} FCFA - ${description}`,
      type: NotificationType.PAYMENT_RECEIVED,
      priority: NotificationPriority.HIGH,
      userId,
      metadata: { amount, actionUrl: `/dashboard/payments` },
    });
  }

  async notifyEscrowReleased(freelanceId: string, amount: number, missionTitle: string): Promise<void> {
    await this.createNotification({
      title: 'Fonds libérés',
      message: `${amount.toLocaleString()} FCFA ont été libérés pour la mission "${missionTitle}"`,
      type: NotificationType.ESCROW_RELEASED,
      priority: NotificationPriority.HIGH,
      userId: freelanceId,
      metadata: { amount, actionUrl: `/dashboard/payments` },
    });
  }

  private async deliverNotification(notification: Notification): Promise<void> {
    const preferences = await this.getUserPreferences(notification.userId);
    const typePreference = preferences.find(p => p.notificationType === notification.type);

    // Notification in-app (toujours activée)
    notification.sentInApp = true;

    // Email
    if (typePreference?.emailEnabled !== false) {
      await this.sendEmailNotification(notification);
    }

    // Push
    if (typePreference?.pushEnabled !== false) {
      await this.sendPushNotification(notification);
    }

    // SMS (uniquement pour les notifications urgentes)
    if (notification.priority === NotificationPriority.URGENT && typePreference?.smsEnabled) {
      await this.sendSmsNotification(notification);
    }

    await this.notificationsRepository.save(notification);
  }

  private async sendEmailNotification(notification: Notification): Promise<void> {
    try {
      // TODO: Intégrer avec un service d'email (SendGrid, Mailgun, etc.)
      console.log(`Envoi email à ${notification.user.email}:`, notification.title);
      
      notification.sentEmail = true;
      notification.emailSentAt = new Date();
    } catch (error) {
      notification.deliveryErrors = {
        ...notification.deliveryErrors,
        email: error.message,
      };
    }
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    try {
      // TODO: Intégrer avec Firebase Cloud Messaging ou autre service push
      console.log(`Envoi push à ${notification.userId}:`, notification.title);
      
      notification.sentPush = true;
      notification.pushSentAt = new Date();
    } catch (error) {
      notification.deliveryErrors = {
        ...notification.deliveryErrors,
        push: error.message,
      };
    }
  }

  private async sendSmsNotification(notification: Notification): Promise<void> {
    try {
      // TODO: Intégrer avec un service SMS (Twilio, etc.)
      console.log(`Envoi SMS à ${notification.user.phone}:`, notification.title);
      
      notification.sentSms = true;
      notification.smsSentAt = new Date();
    } catch (error) {
      notification.deliveryErrors = {
        ...notification.deliveryErrors,
        sms: error.message,
      };
    }
  }

  async cleanupExpiredNotifications(): Promise<void> {
    await this.notificationsRepository.delete({
      expiresAt: new Date(),
    });
  }

  async getNotificationStats(userId: string): Promise<{
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
    byPriority: Record<NotificationPriority, number>;
  }> {
    const notifications = await this.notificationsRepository.find({
      where: { userId, isArchived: false },
    });

    const stats = {
      total: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      byType: {} as Record<NotificationType, number>,
      byPriority: {} as Record<NotificationPriority, number>,
    };

    // Compter par type
    Object.values(NotificationType).forEach(type => {
      stats.byType[type] = notifications.filter(n => n.type === type).length;
    });

    // Compter par priorité
    Object.values(NotificationPriority).forEach(priority => {
      stats.byPriority[priority] = notifications.filter(n => n.priority === priority).length;
    });

    return stats;
  }
}
