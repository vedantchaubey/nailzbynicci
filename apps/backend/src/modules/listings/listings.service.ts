// apps/backend/src/modules/listings/listings.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { RedisService } from '../redis/redis.service.js';
import { FraudService } from '../fraud/fraud.service.js';
import { ReputationService } from '../reputation/reputation.service.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { ActivateListingDto } from './dto/activate-listing.dto.js';
import {
  ListingStatus,
  Platform,
  DepositStatus,
  BUSINESS_RULES,
} from '@ticketpass/shared';

@Injectable()
export class ListingsService {
  private readonly logger = new Logger(ListingsService.name);
  private razorpayClient?: Razorpay;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly fraudService: FraudService,
    private readonly reputationService: ReputationService,
    private readonly configService: ConfigService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (keyId && keySecret && !keyId.includes('rzp_test_...')) {
      this.razorpayClient = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
      this.logger.log('Razorpay client initialized for listing deposits.');
    }
  }

  private hashBookingRef(bookingId: string): string {
    return crypto.createHash('sha256').update(bookingId.trim()).digest('hex');
  }

  async createListing(userId: string, dto: CreateListingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { bankAccount: true },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.isBanned) {
      throw new ForbiddenException('Banned accounts cannot create listings.');
    }

    const event = await this.prisma.event.findUnique({
      where: { id: dto.eventId },
    });

    if (!event) {
      throw new NotFoundException('Target event not found.');
    }

    if (event.date <= new Date()) {
      throw new BadRequestException('Cannot list tickets for past events.');
    }

    // Hash booking ID to block double-listing
    const bookingRefHash = this.hashBookingRef(dto.bookingId);

    // Check if this exact booking has already been listed for this event
    const existingListing = await this.prisma.listing.findUnique({
      where: {
        eventId_bookingRefHash: {
          eventId: dto.eventId,
          bookingRefHash,
        },
      },
    });

    if (existingListing) {
      throw new ConflictException(
        'This booking reference is already listed for this event. Duplicate listings are strictly prohibited.',
      );
    }

    // Calculate transfer window opens and expiry
    const transferWindowHours =
      dto.platform === Platform.BOOKMYSHOW
        ? BUSINESS_RULES.TRANSFER_WINDOW_OPENS_HOURS.BOOKMYSHOW
        : BUSINESS_RULES.TRANSFER_WINDOW_OPENS_HOURS.DISTRICT;

    const transferWindowOpensAt = new Date(
      event.date.getTime() - transferHoursToMs(transferWindowHours),
    );
    const expiresAt = new Date(
      event.date.getTime() - BUSINESS_RULES.HARD_STOP_BEFORE_EVENT_MINUTES * 60 * 1000,
    );

    // 20% Seller security deposit
    const depositAmountPaise = Math.round(
      dto.resalePricePaise * BUSINESS_RULES.SELLER_SECURITY_DEPOSIT_PERCENT,
    );

    // Create DRAFT listing
    const listing = await this.prisma.listing.create({
      data: {
        sellerId: userId,
        eventId: dto.eventId,
        platform: dto.platform,
        status: ListingStatus.DRAFT,
        section: dto.section,
        row: dto.row,
        seats: dto.seats,
        quantity: dto.seats.length,
        originalPricePaise: dto.originalPricePaise,
        resalePricePaise: dto.resalePricePaise,
        sellerAppPhone: dto.sellerAppPhone,
        bookingRefHash,
        proofImageUrl: dto.proofImageUrl,
        transferWindowOpensAt,
        expiresAt,
      },
    });

    // Run fraud engine checks
    await this.fraudService.scanListing(listing.id);

    // Create Razorpay order for deposit
    let razorpayOrderId = `dep_order_${Date.now()}`;
    if (this.razorpayClient) {
      try {
        const order = await this.razorpayClient.orders.create({
          amount: depositAmountPaise,
          currency: 'INR',
          receipt: `rcpt_dep_${listing.id.substring(0, 20)}`,
          notes: {
            listingId: listing.id,
            sellerId: userId,
            purpose: 'SELLER_SECURITY_DEPOSIT',
          },
        });
        razorpayOrderId = order.id;
      } catch (err) {
        this.logger.error('Failed to create Razorpay deposit order:', err);
      }
    }

    return {
      listing,
      securityDeposit: {
        amountPaise: depositAmountPaise,
        razorpayOrderId,
        keyId: this.configService.get<string>('RAZORPAY_KEY_ID') || 'rzp_test_mock',
      },
    };
  }

  async activateListing(userId: string, listingId: string, dto: ActivateListingDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.sellerId !== userId) {
      throw new ForbiddenException('You do not have permission to activate this listing.');
    }

    if (listing.status !== ListingStatus.DRAFT) {
      throw new BadRequestException(`Listing is in status ${listing.status} and cannot be activated.`);
    }

    // Verify Razorpay signature if client configured
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');
    if (keySecret && !keySecret.includes('your_')) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
        .digest('hex');

      if (generatedSignature !== dto.razorpaySignature) {
        throw new BadRequestException('Invalid deposit payment signature.');
      }
    }

    const depositAmountPaise = Math.round(
      listing.resalePricePaise * BUSINESS_RULES.SELLER_SECURITY_DEPOSIT_PERCENT,
    );

    // Create Deposit and activate listing in atomic transaction
    const activatedListing = await this.prisma.$transaction(async (tx) => {
      await tx.sellerDeposit.create({
        data: {
          listingId: listing.id,
          sellerId: userId,
          amountPaise: depositAmountPaise,
          status: DepositStatus.HELD,
          razorpayPaymentId: dto.razorpayPaymentId,
        },
      });

      return tx.listing.update({
        where: { id: listingId },
        data: {
          status: ListingStatus.ACTIVE,
        },
      });
    });

    // Update seller reputation listing count
    await this.prisma.sellerReputation.upsert({
      where: { userId },
      update: { totalListings: { increment: 1 } },
      create: { userId, totalListings: 1 },
    });

    return activatedListing;
  }

  async reserveListing(listingId: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.sellerId === userId) {
      throw new BadRequestException('You cannot reserve your own listing.');
    }

    const now = new Date();

    // If currently reserved by another buyer and reservation has not expired
    if (
      listing.status === ListingStatus.RESERVED &&
      listing.reservedByUserId &&
      listing.reservedByUserId !== userId &&
      listing.reservedUntil &&
      listing.reservedUntil > now
    ) {
      throw new ConflictException('This ticket is currently reserved by another buyer.');
    }

    if (listing.status !== ListingStatus.ACTIVE && listing.status !== ListingStatus.RESERVED) {
      throw new BadRequestException(`Listing is not available for reservation (status: ${listing.status}).`);
    }

    // Atomic Redis distributed lock
    const lockKey = `reservation:${listingId}`;
    const token = await this.redis.acquireLock(lockKey, BUSINESS_RULES.RESERVATION_LOCK_SECONDS);

    if (!token && listing.reservedByUserId !== userId) {
      throw new ConflictException('This ticket is currently being checked out by another buyer.');
    }

    const reservedUntil = new Date(Date.now() + BUSINESS_RULES.RESERVATION_LOCK_SECONDS * 1000);

    const updated = await this.prisma.listing.update({
      where: { id: listingId, version: listing.version },
      data: {
        status: ListingStatus.RESERVED,
        reservedByUserId: userId,
        reservedUntil,
        version: { increment: 1 },
      },
    });

    return {
      success: true,
      listingId: updated.id,
      reservedUntil,
      reservationExpiresInSeconds: BUSINESS_RULES.RESERVATION_LOCK_SECONDS,
    };
  }

  async releaseReservation(listingId: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.reservedByUserId !== userId) {
      return { success: false, message: 'Reservation not owned by requesting user' };
    }

    await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        status: ListingStatus.ACTIVE,
        reservedByUserId: null,
        reservedUntil: null,
      },
    });

    await this.redis.del(`lock:reservation:${listingId}`);

    return { success: true, message: 'Reservation released successfully' };
  }

  async getMyListings(userId: string) {
    return this.prisma.listing.findMany({
      where: { sellerId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            venue: true,
            city: true,
            date: true,
            platform: true,
          },
        },
        deposit: true,
        order: {
          select: {
            id: true,
            status: true,
            totalPaise: true,
            payoutPaise: true,
          },
        },
      },
    });
  }

  async getListingById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        event: true,
        seller: {
          select: {
            id: true,
            name: true,
            reputation: true,
          },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    return listing;
  }

  async deleteListing(userId: string, listingId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.sellerId !== userId) {
      throw new ForbiddenException('Cannot delete listings owned by another seller.');
    }

    if (listing.status === ListingStatus.RESERVED || listing.status === ListingStatus.SOLD) {
      throw new BadRequestException('Cannot remove a listing that is currently reserved or sold.');
    }

    await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.REMOVED },
    });

    return { success: true, message: 'Listing removed successfully.' };
  }
}

function transferHoursToMs(hours: number): number {
  return hours * 60 * 60 * 1000;
}
