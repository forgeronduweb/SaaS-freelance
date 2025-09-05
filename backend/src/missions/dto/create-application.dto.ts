import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({ message: 'La lettre de motivation est requise' })
  @IsString({ message: 'La lettre de motivation doit être une chaîne de caractères' })
  coverLetter: string;

  @IsNotEmpty({ message: 'Le budget proposé est requis' })
  @IsNumber({}, { message: 'Le budget proposé doit être un nombre' })
  proposedBudget: number;

  @IsNotEmpty({ message: 'La date de livraison estimée est requise' })
  @IsDateString({}, { message: 'Format de date invalide' })
  estimatedDelivery: string;

  @IsOptional()
  @IsString({ message: 'Le portfolio doit être une chaîne de caractères' })
  portfolio?: string;

  @IsOptional()
  @IsArray({ message: 'Les pièces jointes doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque pièce jointe doit être une URL valide' })
  attachments?: string[];

  @IsOptional()
  @IsString({ message: 'Les notes additionnelles doivent être une chaîne de caractères' })
  additionalNotes?: string;
}
