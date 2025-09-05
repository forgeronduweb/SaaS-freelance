import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { PaymentMethod, PaymentType } from '../enums/payment-status.enum';

export class CreatePaymentDto {
  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  amount: number;

  @IsEnum(PaymentMethod, { message: 'Méthode de paiement invalide' })
  method: PaymentMethod;

  @IsEnum(PaymentType, { message: 'Type de paiement invalide' })
  type: PaymentType;

  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Le numéro de téléphone doit être une chaîne de caractères' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'L\'ID de mission doit être une chaîne de caractères' })
  missionId?: string;

  @IsOptional()
  @IsString({ message: 'L\'URL de callback doit être une chaîne de caractères' })
  callbackUrl?: string;
}
