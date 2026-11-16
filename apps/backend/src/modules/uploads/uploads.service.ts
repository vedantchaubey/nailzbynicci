// apps/backend/src/modules/uploads/uploads.service.ts
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UploadPurpose, FraudSeverity } from '@ticketpass/shared';
import { BUSINESS_RULES } from '@ticketpass/shared';
import {
  computeSha256,
  computePerceptualHash,
  computeHammingDistance,
} from './utils/image-hash.util.js';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private isCloudinaryConfigured = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (cloudName && apiKey && apiSecret && !cloudName.includes('your_')) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      this.isCloudinaryConfigured = true;
      this.logger.log('Cloudinary SDK configured successfully.');
    } else {
      this.logger.warn('Cloudinary credentials not set or using defaults. Using local simulated storage.');
    }
  }

  getSignedUploadParams(userId: string, purpose: UploadPurpose) {
    if (!this.isCloudinaryConfigured) {
      return {
        uploadUrl: '/api/v1/uploads',
        isDirectLocal: true,
        params: { userId, purpose },
      };
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = `ticketpass/${purpose.toLowerCase()}`;
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET') || '';

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      apiSecret,
    );

    return {
      uploadUrl: `https://api.cloudinary.com/v1_1/${this.configService.get<string>('CLOUDINARY_CLOUD_NAME')}/image/upload`,
      isDirectLocal: false,
      params: {
        timestamp,
        folder,
        signature,
        apiKey: this.configService.get<string>('CLOUDINARY_API_KEY'),
      },
    };
  }

  async processUploadedImage(
    userId: string,
    fileBuffer: Buffer,
    purpose: UploadPurpose,
    orderId?: string,
  ) {
    // 1. Image validation & Sharp metadata/EXIF extraction
    let metadata: sharp.Metadata;
    try {
      metadata = await sharp(fileBuffer).metadata();
      if (!metadata.format || !['jpeg', 'png', 'webp'].includes(metadata.format)) {
        throw new BadRequestException('Invalid image format. Only JPEG, PNG, and WebP are permitted.');
      }
    } catch (err) {
      throw new BadRequestException(`Image decoding failed: ${(err as Error).message}`);
    }

    const exifJson = (metadata.exif ? { format: metadata.format, width: metadata.width, height: metadata.height } : {}) as Record<string, unknown>;

    // 2. Normalize image (max 1600px width/height, high quality)
    const normalizedBuffer = await sharp(fileBuffer)
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat('jpeg', { quality: 85 })
      .toBuffer();

    // 3. Compute Hashes
    const sha256 = computeSha256(normalizedBuffer);
    const perceptualHash = await computePerceptualHash(normalizedBuffer);

    // 4. Duplicate / Collusion detection across different users
    const existingUploads = await this.prisma.upload.findMany({
      where: {
        userId: { not: userId },
      },
      select: {
        id: true,
        userId: true,
        sha256: true,
        perceptualHash: true,
        orderId: true,
      },
      take: 100,
      orderBy: { createdAt: 'desc' },
    });

    for (const existing of existingUploads) {
      let isDuplicate = false;
      if (existing.sha256 === sha256) {
        isDuplicate = true;
      } else if (existing.perceptualHash && perceptualHash) {
        const distance = computeHammingDistance(existing.perceptualHash, perceptualHash);
        if (distance <= BUSINESS_RULES.HAMMING_DISTANCE_DUPLICATE_THRESHOLD) {
          isDuplicate = true;
        }
      }

      if (isDuplicate) {
        await this.prisma.fraudFlag.create({
          data: {
            userId,
            orderId: orderId || null,
            severity: FraudSeverity.HIGH,
            rule: 'DUPLICATE_SCREENSHOT_HASH',
            metadata: {
              conflictingUploadId: existing.id,
              conflictingUserId: existing.userId,
              conflictingOrderId: existing.orderId,
            },
          },
        });
        this.logger.warn(`[FraudFlag] Near-duplicate screenshot detected! User: ${userId}, Existing: ${existing.id}`);
        break;
      }
    }

    // 5. Cloudinary upload or local mock URL
    let uploadedUrl = '';
    let publicId = `upload_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    if (this.isCloudinaryConfigured) {
      try {
        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `ticketpass/${purpose.toLowerCase()}`,
                resource_type: 'image',
              },
              (error, result) => {
                if (error || !result) return reject(error);
                resolve({ secure_url: result.secure_url, public_id: result.public_id });
              },
            )
            .end(normalizedBuffer);
        });
        uploadedUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (err) {
        this.logger.error('Failed to upload image to Cloudinary, falling back to simulated storage:', err);
        uploadedUrl = `https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&mock=${publicId}`;
      }
    } else {
      uploadedUrl = `https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&mock=${publicId}`;
    }

    // 6. OCR Extraction via Tesseract.js
    let ocrText = '';
    try {
      const worker = await createWorker('eng');
      const ret = await worker.recognize(normalizedBuffer);
      ocrText = ret.data.text;
      await worker.terminate();
    } catch (ocrErr) {
      this.logger.warn(`Tesseract OCR processing failed (continuing without OCR text): ${(ocrErr as Error).message}`);
    }

    // 7. Persist Upload Record
    const uploadRecord = await this.prisma.upload.create({
      data: {
        userId,
        orderId: orderId || null,
        purpose,
        url: uploadedUrl,
        publicId,
        sha256,
        perceptualHash,
        ocrText,
        exifJson: exifJson as any,
      },
    });

    return uploadRecord;
  }
}
