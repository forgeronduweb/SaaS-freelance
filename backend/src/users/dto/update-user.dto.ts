import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean({ message: 'isEmailVerified doit être un booléen' })
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'isPhoneVerified doit être un booléen' })
  isPhoneVerified?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'isActive doit être un booléen' })
  isActive?: boolean;
}
