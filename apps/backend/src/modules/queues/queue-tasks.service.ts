// apps/backend/src/modules/queues/queue-tasks.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { PaymentsService } from '../payments/payments.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { ReputationService } from '../reputation/reputation.service.js';
import {
  OrderStatus,
  ListingStatus,
  DepositStatus,
  TransferStatus,
  NotificationType,
} from '@ticketpass/shared';

@Injectable()
export class QueueTasksService {
  private readonly logger = new Logger(QueueTasksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: OrderStateMachine,
    private readonly paymentsService: PaymentsService,
    private readonly notificationsService: NotificationsService,
    private readonly reputationService: ReputationService,
  ) {}

  /**
   * Cron 1: Sweeps expired listing reservations every minute.
   * Safety net for distributed Redis lock expiration.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async sweepExpiredReservations(): Promise<void> {
    const now = new Date();
    const expiredListings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.RESERVED,
        reservedUntil: { lt: now },
      },
      select: { id: true },
    });

    if (expiredListings.length > 0) {
      await this.prisma.listing.updateMany({
        where: {
          id: { in: expiredListings.map((l) => l.id) },
        },
        data: {
          status: ListingStatus.ACTIVE,
          reservedByUserId: null,
          reservedUntil: null,
        },
      });
      this.logger.log(`[Cron Sweep] Released ${expiredListings.length} expired checkout reservations.`);
    }
  }

  /**
   * Cron 2: Expires unpaid orders (15-minute timer) every minute.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async sweepUnpaidOrders(): Promise<void> {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const unpaidOrders = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.PAYMENT_PENDING,
        createdAt: { lt: fifteenMinutesAgo },
      },
      include: { listing: true },
    });

    for (const order of unpaidOrders) {
      try {
        await this.stateMachine.transition(order.id, OrderStatus.EXPIRED, {
          actor: 'SYSTEM',
          reason: '15-minute unpaid order payment window expired',
        });

        await this.prisma.listing.update({
          where: { id: order.listingId },
          data: {
            status: ListingStatus.ACTIVE,
            reservedByUserId: null,
            reservedUntil: null,
          },
        });
        this.logger.log(`[Unpaid Expired] Order ${order.id} expired; listing ${order.listingId} returned to ACTIVE.`);
      } catch (err) {
        this.logger.error(`Error expiring unpaid order ${order.id}: ${(err as Error).message}`);
      }
    }
  }

  /**
   * Cron 3: SLA Breach & Hard Stop monitor (checks every 2 minutes).
   * - 30 minutes before event: Hard stop auto-refund.
   * - Seller SLA breach: auto-refund, deposit forfeited.
   * - Buyer acceptance SLA breach: auto-refund.
   */
  @Cron('*/2 * * * *')
  async monitorSlaBreachesAndHardStop(): Promise<void> {
    const now = new Date();

    // 1. Seller SLA Breaches
    const breachedSellerTransfers = await this.prisma.transferSession.findMany({
      where: {
        status: TransferStatus.PENDING,
        sellerInitiatedAt: null,
        sellerSlaDeadline: { lt: now },
      },
      include: { order: { include: { listing: true } } },
    });

    for (const session of breachedSellerTransfers) {
      const order = session.order;
      if (order.status === OrderStatus.ESCROW_LOCKED) {
        try {
          this.logger.warn(`[SLA Breach] Seller breached SLA for order ${order.id}. Forfeiting deposit and refunding buyer.`);

          // Forfeit seller security deposit
          await this.prisma.sellerDeposit.updateMany({
            where: {
              listingId: order.listingId,
              status: DepositStatus.HELD,
            },
            data: { status: DepositStatus.FORFEITED },
          });

          // Record transfer failure on seller
          await this.reputationService.recordTransferFailure(order.sellerId);

          // Refund buyer from escrow
          await this.paymentsService.getEscrowProvider().refundEscrow(order, 'Seller SLA breached');

          // Transition to REFUNDED
          await this.stateMachine.transition(order.id, OrderStatus.REFUNDED, {
            actor: 'SYSTEM',
            reason: 'Seller SLA deadline expired without transfer initiation',
          });

          // Notify buyer and seller
          await this.notificationsService.sendNotification(
            order.buyerId,
            NotificationType.SLA_WARNING,
            'Full Refund Processed',
            'The seller did not initiate your ticket transfer within their deadline. Your payment has been refunded in full.',
            {},
            order.id,
          );
        } catch (err) {
          this.logger.error(`Error processing seller SLA breach for order ${order.id}: ${(err as Error).message}`);
        }
      }
    }

    // 2. Buyer Acceptance SLA Breaches (60 minutes without confirmation)
    const breachedBuyerTransfers = await this.prisma.transferSession.findMany({
      where: {
        status: TransferStatus.IN_PROGRESS,
        buyerConfirmedAt: null,
        buyerSlaDeadline: { not: null, lt: now },
      },
      include: { order: true },
    });

    for (const session of breachedBuyerTransfers) {
      const order = session.order;
      if (order.status === OrderStatus.TRANSFER_AWAITING_ACCEPTANCE) {
        try {
          this.logger.warn(`[Buyer SLA Breach] Buyer failed to accept ticket in-app for order ${order.id}. Refunding.`);

          await this.paymentsService.getEscrowProvider().refundEscrow(order, 'Buyer acceptance SLA expired');

          await this.stateMachine.transition(order.id, OrderStatus.REFUNDED, {
            actor: 'SYSTEM',
            reason: 'Buyer 60-minute acceptance SLA expired without confirmation',
          });

          await this.notificationsService.sendNotification(
            order.sellerId,
            NotificationType.SLA_WARNING,
            'Transfer Cancelled - Cancel In-App Request',
            'The buyer did not accept the ticket within 60 minutes. Please cancel the pending transfer request in your BookMyShow or District app.',
            {},
            order.id,
          );
        } catch (err) {
          this.logger.error(`Error processing buyer SLA breach for order ${order.id}: ${(err as Error).message}`);
        }
      }
    }

    // 3. Event 30-Minute Hard Stop Auto-Refund
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    const impendingHardStopOrders = await this.prisma.order.findMany({
      where: {
        status: { in: [OrderStatus.ESCROW_LOCKED, OrderStatus.TRANSFER_INITIATED, OrderStatus.TRANSFER_AWAITING_ACCEPTANCE] },
        listing: { event: { date: { lte: thirtyMinutesFromNow } } },
      },
      include: { listing: { include: { event: true } } },
    });

    for (const order of impendingHardStopOrders) {
      try {
        this.logger.warn(`[Hard Stop] Event ${order.listing.event.name} starts in < 30 minutes! Auto-refunding incomplete order ${order.id}.`);

        await this.paymentsService.getEscrowProvider().refundEscrow(order, 'Event 30-minute hard stop reached');

        await this.stateMachine.transition(order.id, OrderStatus.REFUNDED, {
          actor: 'SYSTEM',
          reason: 'Hard stop: order incomplete 30 minutes before event kickoff',
        });
      } catch (err) {
        this.logger.error(`Error in hard stop refund for order ${order.id}: ${(err as Error).message}`);
      }
    }
  }

  /**
   * Cron 4: Nightly Escrow Reconciliation job.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async reconcileEscrowBalances(): Promise<void> {
    this.logger.log('[Nightly Escrow Reconciliation] Starting reconciliation sweep...');
    const activeHolding = await this.prisma.escrowTransaction.aggregate({
      where: { status: 'HOLDING' },
      _sum: { amountPaise: true },
      _count: { id: true },
    });

    const activeDeposits = await this.prisma.sellerDeposit.aggregate({
      where: { status: 'HELD' },
      _sum: { amountPaise: true },
      _count: { id: true },
    });

    this.logger.log(
      `[Reconciliation Report] Escrow Holding: ₹${(activeHolding._sum.amountPaise || 0) / 100} (${activeHolding._count.id} orders) | Seller Deposits Held: ₹${(activeDeposits._sum.amountPaise || 0) / 100} (${activeDeposits._count.id} listings)`,
    );
  }
}
