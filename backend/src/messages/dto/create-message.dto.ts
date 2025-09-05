import { IsNotEmpty, IsString, IsOptional, IsEnum, IsArray, IsUUID } from 'class-validator';
// MessageType sera disponible après génération du client Prisma

export class CreateMessageDto {
  @IsNotEmpty({ message: 'Le contenu du message est requis' })
  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  content: string;

  @IsEnum(['TEXT', 'FILE', 'IMAGE', 'SYSTEM'], { message: 'Type de message invalide' })
  type: 'TEXT' | 'FILE' | 'IMAGE' | 'SYSTEM';

  @IsNotEmpty({ message: 'L\'ID de conversation est requis' })
  @IsUUID('4', { message: 'L\'ID de conversation doit être un UUID valide' })
  conversationId: string;

  @IsOptional()
  @IsUUID('4', { message: 'L\'ID du message de réponse doit être un UUID valide' })
  replyToId?: string;

  @IsOptional()
  @IsArray({ message: 'Les pièces jointes doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque pièce jointe doit être une URL valide' })
  attachments?: string[];

  @IsOptional()
  attachmentMetadata?: {
    filename?: string;
    size?: number;
    mimeType?: string;
  }[];
}
