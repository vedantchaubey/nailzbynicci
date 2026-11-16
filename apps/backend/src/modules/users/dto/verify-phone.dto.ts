// apps/backend/src/modules/users/dto/verify-phone.dto.ts
import { IsNotEmpty, Matches, Length } from 'class-validator';
import { indianPhoneRegex } from '@ticketpass/shared';

export class SendPhoneOtpDto {
  @IsNotEmpty()
  @Matches(indianPhoneRegex, { message: 'Must be a valid 10-digit Indian mobile number' })
  phone: string;
}

export class VerifyPhoneOtpDto {
  @IsNotEmpty()
  @Matches(indianPhoneRegex, { message: 'Must be a valid 10-digit Indian mobile number' })
  phone: string;

  @IsNotEmpty()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}
