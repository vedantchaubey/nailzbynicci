// apps/backend/src/modules/payments/dto/verify-payment.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsNotEmpty({ message: 'Order ID is required' })
  @IsString()
  orderId: string;

  @IsNotEmpty({ message: 'Razorpay Order ID is required' })
  @IsString()
  razorpayOrderId: string;

  @IsNotEmpty({ message: 'Razorpay Payment ID is required' })
  @IsString()
  razorpayPaymentId: string;

  @IsNotEmpty({ message: 'Razorpay Signature is required' })
  @IsString()
  razorpaySignature: string;
}
