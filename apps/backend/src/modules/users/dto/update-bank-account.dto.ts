// apps/backend/src/modules/users/dto/update-bank-account.dto.ts
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ifscRegex } from '@ticketpass/shared';

export class UpdateBankAccountDto {
  @IsNotEmpty({ message: 'Account holder name is required' })
  @IsString()
  accountHolder: string;

  @IsNotEmpty({ message: 'Account number is required' })
  @IsString()
  @Length(9, 18, { message: 'Account number must be between 9 and 18 digits' })
  accountNumber: string;

  @IsNotEmpty({ message: 'IFSC code is required' })
  @Matches(ifscRegex, { message: 'Invalid IFSC format (e.g. HDFC0001234)' })
  ifsc: string;

  @IsOptional()
  @IsString()
  upiId?: string;
}
