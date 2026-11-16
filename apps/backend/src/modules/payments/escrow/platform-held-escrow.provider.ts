// apps/backend/src/modules/payments/escrow/platform-held-escrow.provider.ts
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  EscrowProvider,
  LockEscrowResult,
  ReleaseEscrowResult,
  RefundEscrowResult,
} from './escrow-provider.interface.js';
import { Order, EscrowStatus, PayoutStatus } from '@prisma/client';

@Injectable()
export class PlatformHeldEscrowProvider implements EscrowProvider {
  private readonly logger = new Logger(PlatformHeldEscrowProvider.name);
  private razorpayClient?: Razorpay;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (keyId && keySecret && !keyId.includes('rzp_test_...')) {
      this.razorpayClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }
  }

  async lockEscrow(order: Order, paymentId: string): Promise<LockEscrowResult> {
    this.logger.log(`[PlatformHeldEscrow] Locking escrow for order ${order.id}. Amount: ₹${order.totalPaise / 100}`);

    const escrowTx = await this.prisma.escrowTransaction.upsert({
      where: { orderId: order.id },
      update: {
        status: EscrowStatus.HOLDING,
        amountPaise: order.totalPaise,
        razorpayPaymentId: paymentId,
        lockedAt: new Date(),
      },
      create: {
        orderId: order.id,
        status: EscrowStatus.HOLDING,
        amountPaise: order.totalPaise,
        razorpayPaymentId: paymentId,
        lockedAt: new Date(),
      },
    });

    return {
      escrowTransaction: escrowTx,
      platformMode: 'platform_held',
    };
  }

  async releaseEscrow(order: Order): Promise<ReleaseEscrowResult> {
    this.logger.log(`[PlatformHeldEscrow] Releasing payout ₹${order.payoutPaise / 100} to seller ${order.sellerId}`);

    const existingEscrow = await this.prisma.escrowTransaction.findUnique({
      where: { orderId: order.id },
    });

    if (!existingEscrow || existingEscrow.status !== EscrowStatus.HOLDING) {
      throw new BadRequestException(
        `Cannot release escrow for order ${order.id}: current status is ${existingEscrow?.status}`,
      );
    }

    // Execute release in atomic transaction
    const { payout, escrowTx } = await this.prisma.$transaction(async (tx) => {
      const payoutRecord = await tx.payout.create({
        data: {
          orderId: order.id,
          sellerId: order.sellerId,
          amountPaise: order.payoutPaise,
          status: PayoutStatus.SUCCESS,
          razorpayPayoutId: `pout_sim_${Date.now()}_${order.id.slice(-6)}`,
          processedAt: new Date(),
        },
      });

      const updatedEscrow = await tx.escrowTransaction.update({
        where: { orderId: order.id },
        data: {
          status: EscrowStatus.RELEASED,
          releasedAt: new Date(),
        },
      });

      return { payout: payoutRecord, escrowTx: updatedEscrow };
    });

    return {
      payout,
      escrowTransaction: escrowTx,
      platformMode: 'platform_held',
    };
  }

  async refundEscrow(order: Order, reason: string): Promise<RefundEscrowResult> {
    this.logger.log(`[PlatformHeldEscrow] Initiating full refund for order ${order.id}. Reason: ${reason}`);

    let refundId = `rfnd_sim_${Date.now()}_${order.id.slice(-6)}`;

    if (this.razorpayClient && order.razorpayPaymentId) {
      try {
        const refundResponse = await this.razorpayClient.payments.refund(
          order.razorpayPaymentId,
          {
            amount: order.totalPaise,
            speed: 'normal',
            notes: {
              orderId: order.id,
              reason,
            },
            receipt: `rcpt_rfnd_${order.id.slice(0, 16)}`,
          },
        );
        refundId = refundResponse.id;
      } catch (err) {
        this.logger.error(`Razorpay API refund call failed: ${(err as Error).message}`, err);
      }
    }

    const updatedEscrow = await this.prisma.escrowTransaction.update({
      where: { orderId: order.id },
      data: {
        status: EscrowStatus.REFUNDED,
        refundedAt: new Date(),
        refundId,
      },
    });

    return {
      escrowTransaction: updatedEscrow,
      refundId,
    };
  }
}
