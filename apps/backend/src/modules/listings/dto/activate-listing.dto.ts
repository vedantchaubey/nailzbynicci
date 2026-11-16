// apps/backend/src/modules/listings/dto/activate-listing.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateListingDto {
  @IsNotEmpty({ message: 'Razorpay payment ID is required' })
  @IsString()
  razorpayPaymentId: string;

  @IsNotEmpty({ message: 'Razorpay order ID is required' })
  @IsString()
  razorpayOrderId: string;

  @IsNotEmpty({ message: 'Razorpay payment signature is required' })
  @IsString()
  razorpaySignature: string;
}
