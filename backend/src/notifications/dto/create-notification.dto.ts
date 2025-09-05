import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUUID, IsObject, IsDateString } from 'class-validator';
import { NotificationType, NotificationPriority } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Le titre est requis' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  title: string;

  @IsNotEmpty({ message: 'Le message est requis' })
  @IsString({ message: 'Le message doit être une chaîne de caractères' })
  message: string;

  @IsEnum(NotificationType, { message: 'Type de notification invalide' })
  type: NotificationType;

  @IsEnum(NotificationPriority, { message: 'Priorité invalide' })
  priority: NotificationPriority;

  @IsNotEmpty({ message: 'L\'ID utilisateur est requis' })
  @IsUUID('4', { message: 'L\'ID utilisateur doit être un UUID valide' })
  userId: string;

  @IsOptional()
  @IsUUID('4', { message: 'L\'ID expéditeur doit être un UUID valide' })
  senderId?: string;

  @IsOptional()
  @IsObject({ message: 'Les métadonnées doivent être un objet' })
  metadata?: any;

  @IsOptional()
  @IsDateString({}, { message: 'Format de date invalide pour scheduledFor' })
  scheduledFor?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Format de date invalide pour expiresAt' })
  expiresAt?: string;
}
