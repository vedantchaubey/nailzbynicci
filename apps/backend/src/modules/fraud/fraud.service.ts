// apps/backend/src/modules/fraud/fraud.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { FraudSeverity, ListingStatus } from '@ticketpass/shared';
import { BUSINESS_RULES } from '@ticketpass/shared';

export interface FraudEvaluationResult {
  rule: string;
  severity: FraudSeverity;
  metadata: Record<string, unknown>;
}

@Injectable()
export class FraudService {
  private readonly logger = new Logger(FraudService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Scans a listing against all risk rules:
   * 1. Duplicate seats for the same event
   * 2. Duplicate booking reference hash
   * 3. Velocity anomaly (>8 listings in past hour)
   * 4. Extreme price anomalies (>5x or >10x original, or <20% original)
   * 5. Unverified accounts attempting high-value sales (> ₹50,000)
   * 6. Seller dispute rate > 15%
   */
  async scanListing(listingId: string): Promise<FraudEvaluationResult[]> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        seller: {
          include: {
            reputation: true,
            bankAccount: true,
          },
        },
        event: true,
      },
    });

    if (!listing) return [];

    const flags: FraudEvaluationResult[] = [];

    // Rule 1: Duplicate seats for the same event across active listings
    const existingSameSeats = await this.prisma.listing.findFirst({
      where: {
        id: { not: listingId },
        eventId: listing.eventId,
        section: listing.section,
        row: listing.row,
        status: { in: [ListingStatus.ACTIVE, ListingStatus.RESERVED, ListingStatus.SOLD] },
        seats: { hasSome: listing.seats },
      },
    });

    if (existingSameSeats) {
      flags.push({
        rule: 'DUPLICATE_SEATS_EVENT',
        severity: FraudSeverity.CRITICAL,
        metadata: {
          conflictingListingId: existingSameSeats.id,
          section: listing.section,
          row: listing.row,
          seats: listing.seats,
        },
      });
    }

    // Rule 2: Duplicate bookingRefHash for the same event
    const duplicateBooking = await this.prisma.listing.findFirst({
      where: {
        id: { not: listingId },
        eventId: listing.eventId,
        bookingRefHash: listing.bookingRefHash,
      },
    });

    if (duplicateBooking) {
      flags.push({
        rule: 'DUPLICATE_BOOKING_REF',
        severity: FraudSeverity.CRITICAL,
        metadata: {
          conflictingListingId: duplicateBooking.id,
          bookingRefHash: listing.bookingRefHash,
        },
      });
    }

    // Rule 3: Velocity anomaly (>8 listings created in the past 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const hourlyListingsCount = await this.prisma.listing.count({
      where: {
        sellerId: listing.sellerId,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (hourlyListingsCount > BUSINESS_RULES.MAX_LISTINGS_PER_HOUR) {
      flags.push({
        rule: 'LISTING_VELOCITY_EXCEEDED',
        severity: FraudSeverity.HIGH,
        metadata: {
          hourlyCount: hourlyListingsCount,
          maxAllowed: BUSINESS_RULES.MAX_LISTINGS_PER_HOUR,
        },
      });
    }

    // Rule 4: Price anomalies
    const multiplier = listing.resalePricePaise / listing.originalPricePaise;
    if (multiplier >= BUSINESS_RULES.PRICE_ANOMALY_HIGH_MULTIPLIER) {
      flags.push({
        rule: 'PRICE_ANOMALY_EXTREME_SCALPING',
        severity: FraudSeverity.HIGH,
        metadata: {
          originalPricePaise: listing.originalPricePaise,
          resalePricePaise: listing.resalePricePaise,
          multiplier,
        },
      });
    } else if (multiplier >= BUSINESS_RULES.PRICE_ANOMALY_MEDIUM_MULTIPLIER) {
      flags.push({
        rule: 'PRICE_ANOMALY_HIGH_MARKUP',
        severity: FraudSeverity.MEDIUM,
        metadata: {
          originalPricePaise: listing.originalPricePaise,
          resalePricePaise: listing.resalePricePaise,
          multiplier,
        },
      });
    } else if (multiplier < BUSINESS_RULES.PRICE_ANOMALY_LOW_FLOOR) {
      flags.push({
        rule: 'PRICE_ANOMALY_SUSPICIOUS_UNDERPRICING',
        severity: FraudSeverity.MEDIUM,
        metadata: {
          originalPricePaise: listing.originalPricePaise,
          resalePricePaise: listing.resalePricePaise,
          multiplier,
        },
      });
    }

    // Rule 5: Unverified account attempting high-value sale (> ₹50,000)
    if (
      listing.resalePricePaise >= BUSINESS_RULES.UNVERIFIED_ACCOUNT_HIGH_VALUE_THRESHOLD_PAISE &&
      (!listing.seller.isPhoneVerified || !listing.seller.bankAccount)
    ) {
      flags.push({
        rule: 'UNVERIFIED_HIGH_VALUE_SALE',
        severity: FraudSeverity.HIGH,
        metadata: {
          resalePricePaise: listing.resalePricePaise,
          isPhoneVerified: listing.seller.isPhoneVerified,
          hasBankAccount: !!listing.seller.bankAccount,
        },
      });
    }

    // Rule 6: Seller with dispute rate > 15%
    if (listing.seller.reputation && listing.seller.reputation.completedSales >= 5) {
      const disputeRate =
        listing.seller.reputation.disputeCount / listing.seller.reputation.completedSales;
      if (disputeRate > 0.15) {
        flags.push({
          rule: 'HIGH_SELLER_DISPUTE_RATE',
          severity: FraudSeverity.HIGH,
          metadata: {
            disputeRate,
            disputeCount: listing.seller.reputation.disputeCount,
            completedSales: listing.seller.reputation.completedSales,
          },
        });
      }
    }

    // Persist all generated fraud flags
    for (const flag of flags) {
      await this.prisma.fraudFlag.create({
        data: {
          userId: listing.sellerId,
          listingId,
          severity: flag.severity,
          rule: flag.rule,
          metadata: flag.metadata as any,
        },
      });
      this.logger.warn(
        `[FraudFlag Created] Listing: ${listingId} | Rule: ${flag.rule} | Severity: ${flag.severity}`,
      );
    }

    return flags;
  }

  /**
   * Scans an order against risk and collusion rules:
   * 1. Same device fingerprint tied to buyer and seller (CRITICAL - collusion)
   * 2. Buyer and seller sharing the same mobile phone number
   * 3. Velocity anomaly on buyer (>3 orders in 10 minutes)
   * 4. Repeated refunds on buyer account
   */
  async scanOrder(
    orderId: string,
    buyerFingerprint?: string,
  ): Promise<FraudEvaluationResult[]> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
      },
    });

    if (!order) return [];

    const flags: FraudEvaluationResult[] = [];

    // Rule 1: Same device fingerprint collusion
    if (
      buyerFingerprint &&
      order.seller.deviceFingerprints.includes(buyerFingerprint)
    ) {
      flags.push({
        rule: 'COLLUSION_SHARED_DEVICE_FINGERPRINT',
        severity: FraudSeverity.CRITICAL,
        metadata: {
          sharedFingerprint: buyerFingerprint,
          buyerId: order.buyerId,
          sellerId: order.sellerId,
        },
      });
    }

    // Rule 2: Shared phone number / identity collusion
    if (
      order.buyer.phone &&
      order.seller.phone &&
      order.buyer.phone === order.seller.phone
    ) {
      flags.push({
        rule: 'COLLUSION_SHARED_PHONE_NUMBER',
        severity: FraudSeverity.CRITICAL,
        metadata: {
          phone: order.buyer.phone,
          buyerId: order.buyerId,
          sellerId: order.sellerId,
        },
      });
    }

    // Rule 3: Velocity anomaly on buyer (>3 orders in 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentOrdersCount = await this.prisma.order.count({
      where: {
        buyerId: order.buyerId,
        createdAt: { gte: tenMinutesAgo },
      },
    });

    if (recentOrdersCount > BUSINESS_RULES.MAX_ORDERS_PER_TEN_MINUTES) {
      flags.push({
        rule: 'BUYER_ORDER_VELOCITY_EXCEEDED',
        severity: FraudSeverity.HIGH,
        metadata: {
          recentOrdersCount,
          maxAllowed: BUSINESS_RULES.MAX_ORDERS_PER_TEN_MINUTES,
        },
      });
    }

    // Rule 4: Repeated refunds on buyer account
    const refundedOrdersCount = await this.prisma.order.count({
      where: {
        buyerId: order.buyerId,
        status: 'REFUNDED',
      },
    });

    if (refundedOrdersCount >= 3) {
      flags.push({
        rule: 'BUYER_FREQUENT_REFUNDS',
        severity: FraudSeverity.HIGH,
        metadata: {
          refundedOrdersCount,
        },
      });
    }

    for (const flag of flags) {
      await this.prisma.fraudFlag.create({
        data: {
          userId: order.buyerId,
          orderId,
          severity: flag.severity,
          rule: flag.rule,
          metadata: flag.metadata as any,
        },
      });
      this.logger.warn(
        `[FraudFlag Created] Order: ${orderId} | Rule: ${flag.rule} | Severity: ${flag.severity}`,
      );
    }

    return flags;
  }

  async getUnresolvedFlags() {
    return this.prisma.fraudFlag.findMany({
      where: { resolved: false },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        listing: { select: { id: true, section: true, resalePricePaise: true } },
        order: { select: { id: true, status: true, totalPaise: true } },
      },
    });
  }

  async resolveFlag(flagId: string, resolvedBy: string) {
    return this.prisma.fraudFlag.update({
      where: { id: flagId },
      data: {
        resolved: true,
        resolvedBy,
      },
    });
  }
}
