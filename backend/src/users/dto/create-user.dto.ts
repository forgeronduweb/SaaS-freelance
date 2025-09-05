import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsString, IsArray, IsNumber, IsUrl } from 'class-validator';
// UserRole sera disponible après génération du client Prisma

export class CreateUserDto {
  @IsEmail({}, { message: 'Email invalide' })
  @IsNotEmpty({ message: 'Email requis' })
  email: string;

  @IsNotEmpty({ message: 'Mot de passe requis' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @IsNotEmpty({ message: 'Nom complet requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  fullName: string;

  @IsOptional()
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  phone?: string;

  @IsEnum(['FREELANCE', 'CLIENT', 'ADMIN'], { message: 'Rôle invalide' })
  role: 'FREELANCE' | 'CLIENT' | 'ADMIN';

  // Champs optionnels pour freelances
  @IsOptional()
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'La bio doit être une chaîne de caractères' })
  bio?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Le tarif horaire doit être un nombre' })
  hourlyRate?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Le tarif journalier doit être un nombre' })
  dailyRate?: number;

  @IsOptional()
  @IsArray({ message: 'Les compétences doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque compétence doit être une chaîne de caractères' })
  skills?: string[];

  @IsOptional()
  @IsString({ message: 'Le pays doit être une chaîne de caractères' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'La ville doit être une chaîne de caractères' })
  city?: string;

  // Champs optionnels pour clients
  @IsOptional()
  @IsString({ message: 'Le nom de l\'entreprise doit être une chaîne de caractères' })
  companyName?: string;

  @IsOptional()
  @IsString({ message: 'La taille de l\'entreprise doit être une chaîne de caractères' })
  companySize?: string;

  @IsOptional()
  @IsString({ message: 'Le secteur doit être une chaîne de caractères' })
  sector?: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL du site web invalide' })
  website?: string;
}
