// apps/backend/src/modules/reputation/reputation.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SellerLevel } from '@ticketpass/shared';

@Injectable()
export class ReputationService {
  private readonly logger = new Logger(ReputationService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recalculates trust score and tier for a seller using the exact formula:
   * Score = 50 + min(completedSales * 3, 30) + onTimeTransfers * 1
   *         - disputeCount * 10 - failedTransfers * 15 - unresolvedFlags * 5
   * Clamped strictly between 0 and 100.
   *
   * Tier Thresholds:
   * - NEW: < 3 sales
   * - TRUSTED: 3–9 sales
   * - VERIFIED: 10–24 sales with dispute rate < 5%
   * - ELITE: 25+ sales with dispute rate < 2%
   */
  async recalculateSellerReputation(userId: string) {
    const existing = await this.prisma.sellerReputation.findUnique({
      where: { userId },
    });

    const unresolvedFlags = await this.prisma.fraudFlag.count({
      where: { userId, resolved: false },
    });

    const completedSales = existing?.completedSales ?? 0;
    const onTimeTransfers = existing?.onTimeTransfers ?? 0;
    const disputeCount = existing?.disputeCount ?? 0;
    const failedTransfers = existing?.failedTransfers ?? 0;
    const lateTransfers = existing?.lateTransfers ?? 0;
    const totalListings = existing?.totalListings ?? 0;
    const avgTransferSeconds = existing?.avgTransferSeconds ?? 0;

    // Reputation Formula
    const base = 50.0;
    const salesBonus = Math.min(completedSales * 3, 30);
    const onTimeBonus = onTimeTransfers * 1;
    const disputePenalty = disputeCount * 10;
    const failedPenalty = failedTransfers * 15;
    const fraudPenalty = unresolvedFlags * 5;

    let computedScore = base + salesBonus + onTimeBonus - disputePenalty - failedPenalty - fraudPenalty;
    computedScore = Math.max(0, Math.min(100, Math.round(computedScore * 10) / 10));

    // Determine Seller Level
    const disputeRate = completedSales > 0 ? disputeCount / completedSales : 0;
    let level: SellerLevel = SellerLevel.NEW;

    if (completedSales >= 25 && disputeRate < 0.02) {
      level = SellerLevel.ELITE;
    } else if (completedSales >= 10 && disputeRate < 0.05) {
      level = SellerLevel.VERIFIED;
    } else if (completedSales >= 3) {
      level = SellerLevel.TRUSTED;
    }

    const updated = await this.prisma.sellerReputation.upsert({
      where: { userId },
      update: {
        score: computedScore,
        level,
      },
      create: {
        userId,
        score: computedScore,
        level,
        totalListings,
        completedSales,
        disputeCount,
        failedTransfers,
        onTimeTransfers,
        lateTransfers,
        avgTransferSeconds,
      },
    });

    this.logger.log(`[Reputation Recalculated] User ${userId}: Score=${computedScore}, Level=${level}`);
    return updated;
  }

  async recordSaleCompletion(sellerId: string, durationSeconds: number, onTime: boolean) {
    const rep = await this.prisma.sellerReputation.findUnique({ where: { userId: sellerId } });
    const currentCompleted = rep?.completedSales ?? 0;
    const currentAvg = rep?.avgTransferSeconds ?? 0;
    const newAvg = currentCompleted > 0
      ? Math.round((currentAvg * currentCompleted + durationSeconds) / (currentCompleted + 1))
      : durationSeconds;

    await this.prisma.sellerReputation.upsert({
      where: { userId: sellerId },
      update: {
        completedSales: { increment: 1 },
        onTimeTransfers: onTime ? { increment: 1 } : undefined,
        lateTransfers: !onTime ? { increment: 1 } : undefined,
        avgTransferSeconds: newAvg,
      },
      create: {
        userId: sellerId,
        completedSales: 1,
        onTimeTransfers: onTime ? 1 : 0,
        lateTransfers: !onTime ? 1 : 0,
        avgTransferSeconds: newAvg,
      },
    });

    return this.recalculateSellerReputation(sellerId);
  }

  async recordTransferFailure(sellerId: string) {
    await this.prisma.sellerReputation.upsert({
      where: { userId: sellerId },
      update: {
        failedTransfers: { increment: 1 },
      },
      create: {
        userId: sellerId,
        failedTransfers: 1,
      },
    });

    return this.recalculateSellerReputation(sellerId);
  }

  async recordDispute(sellerId: string) {
    await this.prisma.sellerReputation.upsert({
      where: { userId: sellerId },
      update: {
        disputeCount: { increment: 1 },
      },
      create: {
        userId: sellerId,
        disputeCount: 1,
      },
    });

    return this.recalculateSellerReputation(sellerId);
  }
}
