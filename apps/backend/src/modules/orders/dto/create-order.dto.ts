// apps/backend/src/modules/orders/dto/create-order.dto.ts
import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';
import { indianPhoneRegex } from '@ticketpass/shared';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Listing ID is required' })
  @IsString()
  listingId: string;

  @IsNotEmpty({ message: 'Buyer full name is required' })
  @IsString()
  buyerName: string;

  @IsNotEmpty({ message: 'Buyer email address is required' })
  @IsEmail({}, { message: 'Invalid buyer email format' })
  buyerEmail: string;

  @Matches(indianPhoneRegex, {
    message: 'Enter the 10-digit mobile number registered with your BookMyShow or District app',
  })
  buyerAppPhone: string;
}
