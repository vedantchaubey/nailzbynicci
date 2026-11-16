// apps/backend/src/modules/payouts/payouts.service.ts
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RedisService } from '../redis/redis.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { PlatformHeldEscrowProvider } from '../payments/escrow/platform-held-escrow.provider.js';
import { RouteEscrowProvider } from '../payments/escrow/route-escrow.provider.js';
import { ReputationService } from '../reputation/reputation.service.js';
import { ConfigService } from '@nestjs/config';
import { EscrowProvider } from '../payments/escrow/escrow-provider.interface.js';
import { OrderStatus, DepositStatus, EscrowStatus } from '@ticketpass/shared';

@Injectable()
export class PayoutsService {
  private readonly logger = new Logger(PayoutsService.name);
  private escrowProvider: EscrowProvider;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly stateMachine: OrderStateMachine,
    private readonly platformHeldEscrow: PlatformHeldEscrowProvider,
    private readonly routeEscrow: RouteEscrowProvider,
    private readonly reputationService: ReputationService,
    private readonly configService: ConfigService,
  ) {
    const mode = this.configService.get<string>('ESCROW_MODE') || 'platform_held';
    this.escrowProvider = mode === 'route' ? this.routeEscrow : this.platformHeldEscrow;
  }

  /**
   * Processes the payout to the seller with Redis distributed lock guarding against duplicate runs.
   */
  async processPayout(orderId: string): Promise<boolean> {
    const lockKey = `payout:${orderId}`;
    const token = await this.redis.acquireLock(lockKey, 600); // 10 min lock TTL

    if (!token) {
      this.logger.warn(`[Payout] Payout lock already held for order ${orderId}. Skipping redundant execution.`);
      return false;
    }

    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          listing: true,
          escrowTransaction: true,
          transferSession: true,
        },
      });

      if (!order) {
        throw new BadRequestException(`Order ${orderId} not found.`);
      }

      if (order.status !== OrderStatus.TRANSFER_VERIFIED) {
        this.logger.warn(
          `[Payout] Order ${orderId} is in status ${order.status}, not TRANSFER_VERIFIED. Cannot release payout.`,
        );
        return false;
      }

      if (order.escrowTransaction?.status !== EscrowStatus.HOLDING) {
        this.logger.warn(
          `[Payout] Escrow for order ${orderId} is ${order.escrowTransaction?.status}, not HOLDING. Skipping.`,
        );
        return false;
      }

      this.logger.log(`[Payout] Releasing ₹${order.payoutPaise / 100} payout for order ${orderId}`);

      // 1. Release escrow via provider
      await this.escrowProvider.releaseEscrow(order);

      // 2. Transition state machine to PAYOUT_RELEASED
      await this.stateMachine.transition(order.id, OrderStatus.PAYOUT_RELEASED, {
        actor: 'SYSTEM',
        reason: 'Escrow released automatically following verified ownership transfer',
      });

      // 3. Refund seller's security deposit
      await this.prisma.sellerDeposit.updateMany({
        where: {
          listingId: order.listingId,
          status: DepositStatus.HELD,
        },
        data: {
          status: DepositStatus.REFUNDED,
        },
      });

      // 4. Update seller reputation metrics
      const session = order.transferSession;
      let durationSeconds = 0;
      let onTime = true;

      if (session?.sellerInitiatedAt && session?.buyerConfirmedAt) {
        durationSeconds = Math.round(
          (session.buyerConfirmedAt.getTime() - session.sellerInitiatedAt.getTime()) / 1000,
        );
        if (session.sellerSlaDeadline && session.sellerInitiatedAt > session.sellerSlaDeadline) {
          onTime = false;
        }
      }

      await this.reputationService.recordSaleCompletion(order.sellerId, durationSeconds, onTime);

      this.logger.log(`[Payout Complete] Order ${orderId} successfully completed and seller deposit refunded.`);
      return true;
    } finally {
      await this.redis.releaseLock(lockKey, token);
    }
  }
}
