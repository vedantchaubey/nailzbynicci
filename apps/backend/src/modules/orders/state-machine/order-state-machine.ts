// apps/backend/src/modules/orders/state-machine/order-state-machine.ts
import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { OrderStatus } from '@ticketpass/shared';
import { isOrderTransitionAllowed } from '@ticketpass/shared';
import { Prisma, Order } from '@prisma/client';

export type StateMachineActor = 'SYSTEM' | 'BUYER' | 'SELLER' | 'ADMIN';

export interface TransitionOptions {
  actor: StateMachineActor;
  reason: string;
  actorId?: string;
  ip?: string;
  userAgent?: string;
  tx?: Prisma.TransactionClient;
  customMetadata?: Record<string, unknown>;
}

@Injectable()
export class OrderStateMachine {
  private readonly logger = new Logger(OrderStateMachine.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Executes a legally validated state transition on an Order in ONE atomic transaction:
   * 1. Validates legal transition rules from ORDER_TRANSITION_RULES.
   * 2. Employs optimistic locking on the order version column.
   * 3. Sets state-specific timestamps (escrowLockedAt, transferInitiatedAt, etc.).
   * 4. Appends an immutable AuditLog row with previous and next states.
   * 5. Returns the updated order.
   */
  async transition(
    orderId: string,
    to: OrderStatus,
    options: TransitionOptions,
  ): Promise<Order> {
    const { actor, reason, actorId, ip, userAgent, tx: providedTx, customMetadata } = options;

    const executeInTx = async (tx: Prisma.TransactionClient): Promise<Order> => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new ConflictException(`Order ${orderId} not found for state transition.`);
      }

      const from = order.status;

      // Verify legal transition
      const isAllowed = isOrderTransitionAllowed(from as any, to as any, actor);
      if (!isAllowed) {
        this.logger.error(
          `Illegal transition attempted on Order ${orderId}: ${from} -> ${to} by ${actor}`,
        );
        throw new ConflictException(
          `Illegal order transition from ${from} to ${to} by actor ${actor}.`,
        );
      }

      // Precondition check: Section 21 KYC rules
      if (
        (from === OrderStatus.ESCROW_LOCKED && to === OrderStatus.TRANSFER_INITIATED) ||
        (from === OrderStatus.TRANSFER_VERIFIED && to === OrderStatus.PAYOUT_RELEASED)
      ) {
        const buyer = await tx.user.findUnique({ where: { id: order.buyerId }, select: { kycStatus: true } });
        const seller = await tx.user.findUnique({ where: { id: order.sellerId }, select: { kycStatus: true } });

        if (buyer?.kycStatus !== 'VERIFIED' || seller?.kycStatus !== 'VERIFIED') {
          this.logger.error(
            `KYC assertion failed for Order ${orderId}: Buyer KYC=${buyer?.kycStatus}, Seller KYC=${seller?.kycStatus}`,
          );
          throw new ConflictException(
            `Both buyer and seller must have VERIFIED identity via DigiLocker before order transition to ${to}.`,
          );
        }
      }

      // Prepare status-specific timestamp updates
      const timestampsToUpdate: Partial<Prisma.OrderUpdateInput> = {};
      const now = new Date();

      switch (to) {
        case OrderStatus.ESCROW_LOCKED:
          timestampsToUpdate.escrowLockedAt = now;
          break;
        case OrderStatus.TRANSFER_INITIATED:
          timestampsToUpdate.transferInitiatedAt = now;
          break;
        case OrderStatus.TRANSFER_AWAITING_ACCEPTANCE:
          // 60-minute buyer acceptance SLA begins
          timestampsToUpdate.acceptanceDeadline = new Date(now.getTime() + 60 * 60 * 1000);
          break;
        case OrderStatus.TRANSFER_VERIFIED:
          timestampsToUpdate.transferVerifiedAt = now;
          break;
        case OrderStatus.PAYOUT_RELEASED:
          timestampsToUpdate.payoutReleasedAt = now;
          break;
        case OrderStatus.REFUNDED:
          timestampsToUpdate.refundedAt = now;
          timestampsToUpdate.refundReason = reason;
          break;
        default:
          break;
      }

      // Optimistic lock update: requires version match
      const updatedOrder = await tx.order.update({
        where: {
          id: orderId,
          version: order.version,
        },
        data: {
          status: to,
          version: { increment: 1 },
          ...timestampsToUpdate,
        },
      });

      // Write immutable AuditLog entry
      await tx.auditLog.create({
        data: {
          actorId: actorId || null,
          orderId,
          action: 'ORDER_STATE_TRANSITION',
          entity: 'Order',
          entityId: orderId,
          before: { status: from, version: order.version },
          after: { status: to, version: updatedOrder.version, reason, ...customMetadata },
          ip: ip || null,
          userAgent: userAgent || null,
        },
      });

      this.logger.log(
        `[Order Transition] ${orderId}: ${from} -> ${to} | Actor: ${actor} | Reason: ${reason}`,
      );

      return updatedOrder;
    };

    if (providedTx) {
      return executeInTx(providedTx);
    } else {
      return this.prisma.$transaction(async (tx) => executeInTx(tx));
    }
  }
}
