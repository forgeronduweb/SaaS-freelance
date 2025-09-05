import { IsNotEmpty, IsArray, IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
// ConversationType sera disponible après génération du client Prisma

export class CreateConversationDto {
  @IsOptional()
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  title?: string;

  @IsEnum(['DIRECT', 'GROUP', 'SUPPORT'], { message: 'Type de conversation invalide' })
  type: 'DIRECT' | 'GROUP' | 'SUPPORT';

  @IsNotEmpty({ message: 'Les participants sont requis' })
  @IsArray({ message: 'Les participants doivent être un tableau' })
  @IsUUID('4', { each: true, message: 'Chaque participant doit être un UUID valide' })
  participantIds: string[];

  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de mission doit être un UUID valide' })
  missionId?: string;
}
