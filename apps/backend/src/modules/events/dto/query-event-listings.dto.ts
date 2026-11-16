// apps/backend/src/modules/events/dto/query-event-listings.dto.ts
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Platform } from '@ticketpass/shared';

export class QueryEventListingsDto {
  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minQty?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  @IsOptional()
  @IsString()
  sort?: 'price_asc' | 'price_desc' | 'best_deal';
}
