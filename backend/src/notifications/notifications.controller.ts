import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { NotificationType } from './enums/notification-type.enum';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Get()
  findMyNotifications(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('unreadOnly') unreadOnly: boolean = false,
  ) {
    return this.notificationsService.findUserNotifications(req.user.userId, page, limit, unreadOnly);
  }

  @Get('stats')
  getNotificationStats(@Request() req) {
    return this.notificationsService.getNotificationStats(req.user.userId);
  }

  @Get('preferences')
  getMyPreferences(@Request() req) {
    return this.notificationsService.getUserPreferences(req.user.userId);
  }

  @Patch('preferences/:type')
  updatePreference(
    @Param('type') notificationType: NotificationType,
    @Body() preferences: any,
    @Request() req,
  ) {
    return this.notificationsService.updatePreference(req.user.userId, notificationType, preferences);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Patch('mark-all-read')
  markAllAsRead(@Request() req) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Patch(':id/archive')
  archiveNotification(@Param('id') id: string, @Request() req) {
    return this.notificationsService.archiveNotification(id, req.user.userId);
  }

  @Delete(':id')
  deleteNotification(@Param('id') id: string, @Request() req) {
    return this.notificationsService.deleteNotification(id, req.user.userId);
  }
}
