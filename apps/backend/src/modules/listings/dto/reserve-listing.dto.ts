// apps/backend/src/modules/listings/dto/reserve-listing.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ReserveListingDto {
  @IsNotEmpty({ message: 'Listing ID is required' })
  @IsString()
  listingId: string;
}
