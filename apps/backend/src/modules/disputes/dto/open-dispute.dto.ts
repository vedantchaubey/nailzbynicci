// apps/backend/src/modules/disputes/dto/open-dispute.dto.ts
import { IsNotEmpty, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class OpenDisputeDto {
  @IsNotEmpty({ message: 'Dispute reason is required' })
  @IsString()
  reason: string;

  @IsNotEmpty({ message: 'Detailed description is required' })
  @IsString()
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  evidenceUploadIds?: string[];
}
