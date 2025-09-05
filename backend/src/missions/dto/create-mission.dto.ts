import { IsNotEmpty, IsString, IsArray, IsNumber, IsEnum, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { MissionUrgency } from '../enums/mission-status.enum';

export class CreateMissionDto {
  @IsNotEmpty({ message: 'Le titre est requis' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  title: string;

  @IsNotEmpty({ message: 'La description est requise' })
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description: string;

  @IsNotEmpty({ message: 'Les compétences requises sont obligatoires' })
  @IsArray({ message: 'Les compétences doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque compétence doit être une chaîne de caractères' })
  requiredSkills: string[];

  @IsNotEmpty({ message: 'Le budget est requis' })
  @IsNumber({}, { message: 'Le budget doit être un nombre' })
  budget: number;

  @IsEnum(MissionUrgency, { message: 'Niveau d\'urgence invalide' })
  urgency: MissionUrgency;

  @IsNotEmpty({ message: 'La date limite est requise' })
  @IsDateString({}, { message: 'Format de date invalide' })
  deadline: string;

  @IsOptional()
  @IsString({ message: 'La catégorie doit être une chaîne de caractères' })
  category?: string;

  @IsOptional()
  @IsBoolean({ message: 'isRemote doit être un booléen' })
  isRemote?: boolean;

  @IsOptional()
  @IsString({ message: 'La localisation doit être une chaîne de caractères' })
  location?: string;

  @IsOptional()
  @IsArray({ message: 'Les pièces jointes doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque pièce jointe doit être une URL valide' })
  attachments?: string[];

  @IsOptional()
  @IsString({ message: 'La durée estimée doit être une chaîne de caractères' })
  estimatedDuration?: string;

  @IsOptional()
  @IsString({ message: 'Les notes doivent être une chaîne de caractères' })
  clientNotes?: string;
}
