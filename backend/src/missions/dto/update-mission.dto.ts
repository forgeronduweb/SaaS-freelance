import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionDto } from './create-mission.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { MissionStatus } from '../enums/mission-status.enum';

export class UpdateMissionDto extends PartialType(CreateMissionDto) {
  @IsOptional()
  @IsEnum(MissionStatus, { message: 'Statut de mission invalide' })
  status?: MissionStatus;
}
