import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateEscrowDto {
  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  amount: number;

  @IsNotEmpty({ message: 'L\'ID de mission est requis' })
  @IsString({ message: 'L\'ID de mission doit être une chaîne de caractères' })
  missionId: string;

  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'autoReleaseEnabled doit être un booléen' })
  autoReleaseEnabled?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'Format de date invalide pour autoReleaseDate' })
  autoReleaseDate?: string;

  @IsOptional()
  @IsString({ message: 'Les conditions de libération doivent être une chaîne de caractères' })
  releaseConditions?: string;
}
