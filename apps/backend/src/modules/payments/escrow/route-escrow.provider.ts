// apps/backend/src/modules/payments/escrow/route-escrow.provider.ts
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
export class RouteEscrowProvider implements EscrowProvider {
  private readonly logger = new Logger(RouteEscrowProvider.name);
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
    this.logger.log(`[RouteEscrow] Creating Route transfer with on_hold=1 for order ${order.id}`);

    let razorpayTransferId = `trf_sim_${Date.now()}`;

    // If Razorpay Route is active, capture and hold transfer to linked account
    if (this.razorpayClient && paymentId) {
      try {
        const transferResponse = await (this.razorpayClient.payments as unknown as {
          transfer: (
            id: string,
            data: { transfers: Array<{ amount: number; currency: string; on_hold: number; notes: Record<string, string> }> },
          ) => Promise<{ items: Array<{ id: string }> }>;
        }).transfer(paymentId, {
          transfers: [
            {
              amount: order.payoutPaise,
              currency: 'INR',
              on_hold: 1, // Hold funds until transfer verification
              notes: {
                orderId: order.id,
                sellerId: order.sellerId,
              },
            },
          ],
        });

        if (transferResponse.items && transferResponse.items[0]) {
          razorpayTransferId = transferResponse.items[0].id;
        }
      } catch (err) {
        this.logger.warn(`Razorpay Route transfer API call failed: ${(err as Error).message}. Using simulated transfer ID.`);
      }
    }

    const escrowTx = await this.prisma.escrowTransaction.upsert({
      where: { orderId: order.id },
      update: {
        status: EscrowStatus.HOLDING,
        amountPaise: order.totalPaise,
        razorpayPaymentId: paymentId,
        razorpayTransferId,
        lockedAt: new Date(),
      },
      create: {
        orderId: order.id,
        status: EscrowStatus.HOLDING,
        amountPaise: order.totalPaise,
        razorpayPaymentId: paymentId,
        razorpayTransferId,
        lockedAt: new Date(),
      },
    });

    return {
      escrowTransaction: escrowTx,
      platformMode: 'route',
    };
  }

  async releaseEscrow(order: Order): Promise<ReleaseEscrowResult> {
    this.logger.log(`[RouteEscrow] Modifying Route transfer on_hold=0 for order ${order.id}`);

    const existingEscrow = await this.prisma.escrowTransaction.findUnique({
      where: { orderId: order.id },
    });

    if (!existingEscrow || existingEscrow.status !== EscrowStatus.HOLDING) {
      throw new BadRequestException(
        `Cannot release escrow for order ${order.id}: status is ${existingEscrow?.status}`,
      );
    }

    // Release hold via Razorpay Route API
    if (this.razorpayClient && existingEscrow.razorpayTransferId && !existingEscrow.razorpayTransferId.startsWith('trf_sim')) {
      try {
        await (this.razorpayClient as unknown as {
          transfers: {
            edit: (id: string, data: { on_hold: number }) => Promise<unknown>;
          };
        }).transfers.edit(existingEscrow.razorpayTransferId, { on_hold: 0 });
      } catch (err) {
        this.logger.error(`Failed to release hold on Route transfer: ${(err as Error).message}`);
      }
    }

    const { payout, escrowTx } = await this.prisma.$transaction(async (tx) => {
      const payoutRecord = await tx.payout.create({
        data: {
          orderId: order.id,
          sellerId: order.sellerId,
          amountPaise: order.payoutPaise,
          status: PayoutStatus.SUCCESS,
          razorpayPayoutId: existingEscrow.razorpayTransferId || `trf_sim_${Date.now()}`,
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
      platformMode: 'route',
    };
  }

  async refundEscrow(order: Order, reason: string): Promise<RefundEscrowResult> {
    this.logger.log(`[RouteEscrow] Refunding payment for order ${order.id}`);

    let refundId = `rfnd_route_sim_${Date.now()}`;

    if (this.razorpayClient && order.razorpayPaymentId) {
      try {
        const refundResponse = await this.razorpayClient.payments.refund(
          order.razorpayPaymentId,
          {
            amount: order.totalPaise,
            reverse_all: 1, // Reverses transfers to linked account
            notes: { orderId: order.id, reason },
          },
        );
        refundId = refundResponse.id;
      } catch (err) {
        this.logger.error(`Razorpay Route refund failed: ${(err as Error).message}`);
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
