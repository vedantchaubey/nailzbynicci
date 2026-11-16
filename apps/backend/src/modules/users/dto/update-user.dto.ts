// apps/backend/src/modules/users/dto/update-user.dto.ts
import { IsOptional, IsString, Matches } from 'class-validator';
import { indianPhoneRegex } from '@ticketpass/shared';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(indianPhoneRegex, { message: 'Phone must be a valid 10-digit Indian mobile number' })
  phone?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  deviceFingerprint?: string;
}
