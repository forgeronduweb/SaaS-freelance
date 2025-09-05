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
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(private readonly notificationsService: NotificationsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connecté aux notifications: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      console.log(`Client déconnecté des notifications: ${client.id} (User: ${userId})`);
    }
  }

  @SubscribeMessage('authenticate')
  async handleAuthenticate(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(client.id, data.userId);
    client.join(`user_${data.userId}`);
    
    console.log(`Utilisateur authentifié pour notifications: ${data.userId} (Socket: ${client.id})`);
    
    // Envoyer les statistiques de notifications
    const stats = await this.notificationsService.getNotificationStats(data.userId);
    client.emit('notification_stats', stats);
    
    client.emit('authenticated', { success: true });
  }

  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      client.emit('error', { message: 'Non authentifié' });
      return;
    }

    try {
      await this.notificationsService.markAsRead(data.notificationId, userId);
      
      // Envoyer les nouvelles statistiques
      const stats = await this.notificationsService.getNotificationStats(userId);
      client.emit('notification_stats', stats);
      
      client.emit('notification_read', { notificationId: data.notificationId });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('mark_all_read')
  async handleMarkAllRead(@ConnectedSocket() client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      client.emit('error', { message: 'Non authentifié' });
      return;
    }

    try {
      await this.notificationsService.markAllAsRead(userId);
      
      // Envoyer les nouvelles statistiques
      const stats = await this.notificationsService.getNotificationStats(userId);
      client.emit('notification_stats', stats);
      
      client.emit('all_notifications_read');
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('get_notifications')
  async handleGetNotifications(
    @MessageBody() data: { page?: number, limit?: number, unreadOnly?: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      client.emit('error', { message: 'Non authentifié' });
      return;
    }

    try {
      const notifications = await this.notificationsService.findUserNotifications(
        userId,
        data.page || 1,
        data.limit || 20,
        data.unreadOnly || false
      );
      
      client.emit('notifications_list', notifications);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  // Méthodes pour envoyer des notifications en temps réel
  async sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit('new_notification', notification);
    
    // Envoyer aussi les nouvelles statistiques
    const stats = await this.notificationsService.getNotificationStats(userId);
    this.server.to(`user_${userId}`).emit('notification_stats', stats);
  }

  async broadcastNotification(notification: any) {
    this.server.emit('broadcast_notification', notification);
  }

  getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.values());
  }

  isUserConnected(userId: string): boolean {
    return Array.from(this.connectedUsers.values()).includes(userId);
  }
}
