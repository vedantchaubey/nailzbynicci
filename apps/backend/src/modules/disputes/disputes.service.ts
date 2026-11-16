// apps/backend/src/modules/disputes/disputes.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { ReputationService } from '../reputation/reputation.service.js';
import { OpenDisputeDto } from './dto/open-dispute.dto.js';
import {
  OrderStatus,
  DisputeStatus,
  TransferStatus,
  EscrowStatus,
} from '@ticketpass/shared';

@Injectable()
export class DisputesService {
  private readonly logger = new Logger(DisputesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: OrderStateMachine,
    private readonly reputationService: ReputationService,
  ) {}

  async openDispute(orderId: string, userId: string, dto: OpenDisputeDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        transferSession: true,
        escrowTransaction: true,
        dispute: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    const isBuyer = order.buyerId === userId;
    const isSeller = order.sellerId === userId;

    if (!isBuyer && !isSeller) {
      throw new ForbiddenException('Only the buyer or seller of this order can raise a dispute.');
    }

    if (order.dispute) {
      throw new BadRequestException('A dispute is already active for this order.');
    }

    // Payout cannot be released if dispute is opened
    if (order.status === OrderStatus.PAYOUT_RELEASED || order.status === OrderStatus.REFUNDED) {
      throw new BadRequestException('Cannot dispute an order that has already concluded.');
    }

    const actor = isBuyer ? 'BUYER' : 'SELLER';

    // 1. Transition state machine to DISPUTED (Freezes payout immediately)
    await this.stateMachine.transition(orderId, OrderStatus.DISPUTED, {
      actor,
      reason: `Dispute opened by ${actor}: ${dto.reason}`,
      actorId: userId,
    });

    // 2. Mark transfer session as DISPUTED
    await this.prisma.transferSession.updateMany({
      where: { orderId },
      data: { status: TransferStatus.DISPUTED },
    });

    // 3. Mark escrow transaction as DISPUTED
    await this.prisma.escrowTransaction.updateMany({
      where: { orderId },
      data: { status: EscrowStatus.DISPUTED },
    });

    // 4. Create Dispute entry
    const dispute = await this.prisma.dispute.create({
      data: {
        orderId,
        raisedById: userId,
        status: DisputeStatus.OPEN,
        reason: dto.reason,
        description: dto.description,
        evidence: dto.evidenceUploadIds || [],
      },
    });

    // 5. Update seller reputation metrics if dispute opened by buyer
    if (isBuyer) {
      await this.reputationService.recordDispute(order.sellerId);
    }

    this.logger.warn(`[Dispute Raised] Order ${orderId} placed into DISPUTED state by user ${userId}. Reason: ${dto.reason}`);

    return dispute;
  }

  async getMyDisputes(userId: string) {
    return this.prisma.dispute.findMany({
      where: {
        OR: [
          { raisedById: userId },
          { order: { sellerId: userId } },
          { order: { buyerId: userId } },
        ],
      },
      include: {
        order: {
          include: {
            listing: { include: { event: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addEvidence(disputeId: string, userId: string, evidenceData: Record<string, unknown>) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { order: true },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found.');
    }

    if (dispute.order.buyerId !== userId && dispute.order.sellerId !== userId) {
      throw new ForbiddenException('Not authorized to append evidence to this dispute.');
    }

    const currentEvidence = Array.isArray(dispute.evidence) ? dispute.evidence : [];
    currentEvidence.push({
      submittedBy: userId,
      submittedAt: new Date().toISOString(),
      ...evidenceData,
    });

    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        evidence: currentEvidence,
      },
    });
  }
}
