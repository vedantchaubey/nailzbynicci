// apps/backend/src/modules/listings/dto/create-listing.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsInt,
  Min,
  Matches,
  IsUrl,
} from 'class-validator';
import { Platform, indianPhoneRegex } from '@ticketpass/shared';

export class CreateListingDto {
  @IsNotEmpty({ message: 'Event ID is required' })
  @IsString()
  eventId: string;

  @IsEnum(Platform, { message: 'Platform must be BOOKMYSHOW or DISTRICT' })
  platform: Platform;

  @IsNotEmpty({ message: 'Section is required' })
  @IsString()
  section: string;

  @IsNotEmpty({ message: 'Row is required' })
  @IsString()
  row: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least 1 seat is required' })
  @ArrayMaxSize(6, { message: 'Maximum 6 seats permitted per listing' })
  @IsString({ each: true })
  seats: string[];

  @IsInt()
  @Min(100, { message: 'Original price must be at least ₹1 (100 paise)' })
  originalPricePaise: number;

  @IsInt()
  @Min(100, { message: 'Resale price must be at least ₹1 (100 paise)' })
  resalePricePaise: number;

  @Matches(indianPhoneRegex, {
    message: 'Must be a valid 10-digit Indian mobile number registered with BookMyShow or District',
  })
  sellerAppPhone: string;

  @IsNotEmpty({ message: 'Booking ID from your BookMyShow or District app is required' })
  @IsString()
  bookingId: string;

  @IsUrl({}, { message: 'Valid proof screenshot URL is required' })
  proofImageUrl: string;
}
