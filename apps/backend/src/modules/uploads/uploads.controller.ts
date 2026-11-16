// apps/backend/src/modules/uploads/uploads.controller.ts
import {
  Controller,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadsService } from './uploads.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UploadPurpose } from '@ticketpass/shared';

@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get('signature')
  @ApiOperation({ summary: 'Obtain signed parameters for direct Cloudinary upload' })
  @ApiResponse({ status: 200, description: 'Signed upload parameters' })
  getSignature(
    @CurrentUser('userId') userId: string,
    @Query('purpose') purpose: UploadPurpose = UploadPurpose.LISTING_PROOF,
  ) {
    return this.uploadsService.getSignedUploadParams(userId, purpose);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } })) // 5 MB max
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload and process ticket screenshot (Sharp normalization, dHash, OCR)' })
  @ApiResponse({ status: 201, description: 'Upload processed and persisted' })
  async uploadFile(
    @CurrentUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose: UploadPurpose = UploadPurpose.LISTING_PROOF,
    @Body('orderId') orderId?: string,
  ) {
    if (!file || !file.buffer) {
      throw new BadRequestException('Image file is required.');
    }

    return this.uploadsService.processUploadedImage(userId, file.buffer, purpose, orderId);
  }
}
