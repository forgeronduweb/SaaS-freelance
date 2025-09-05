import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token requis' })
  @IsString({ message: 'Token invalide' })
  token: string;

  @IsNotEmpty({ message: 'Nouveau mot de passe requis' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  newPassword: string;
}
