// apps/backend/src/modules/auth/dto/session-exchange.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class SessionExchangeDto {
  @IsOptional()
  @IsString()
  clerkToken?: string;

  // Development login bypass parameters (only active when ENABLE_DEV_LOGIN="true")
  @IsOptional()
  @IsString()
  devEmail?: string;

  @IsOptional()
  @IsString()
  devRole?: string;
}
