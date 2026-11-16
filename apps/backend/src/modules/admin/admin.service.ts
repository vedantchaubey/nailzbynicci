// apps/backend/src/modules/admin/admin.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { PaymentsService } from '../payments/payments.service.js';
import { PayoutsService } from '../payouts/payouts.service.js';
import {
  OrderStatus,
  DisputeStatus,
  ListingStatus,
  EscrowStatus,
  TransferStatus,
} from '@ticketpass/shared';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: OrderStateMachine,
    private readonly paymentsService: PaymentsService,
    private readonly payoutsService: PayoutsService,
  ) {}

  async getOverview() {
    const [
      totalUsers,
      activeListings,
      totalOrders,
      openDisputes,
      unresolvedFraudFlags,
      escrowHoldingAgg,
      pendingPayoutsCount,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count({ where: { status: ListingStatus.ACTIVE } }),
      this.prisma.order.count(),
      this.prisma.dispute.count({ where: { status: DisputeStatus.OPEN } }),
      this.prisma.fraudFlag.count({ where: { resolved: false } }),
      this.prisma.escrowTransaction.aggregate({
        where: { status: EscrowStatus.HOLDING },
        _sum: { amountPaise: true },
      }),
      this.prisma.payout.count({ where: { status: 'PENDING' } }),
    ]);

    return {
      totalUsers,
      activeListings,
      totalOrders,
      openDisputes,
      unresolvedFraudFlags,
      totalEscrowHeldPaise: escrowHoldingAgg._sum.amountPaise || 0,
      pendingPayoutsCount,
    };
  }

  async getOrders(page = 1, limit = 20, status?: OrderStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [total, orders] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
          listing: { include: { event: true } },
          escrowTransaction: true,
          transferSession: true,
          dispute: true,
        },
      }),
    ]);

    return { items: orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getDisputes() {
    return this.prisma.dispute.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: {
          include: {
            buyer: { select: { id: true, name: true, email: true } },
            seller: { select: { id: true, name: true, email: true } },
            listing: { include: { event: true } },
            escrowTransaction: true,
          },
        },
        raisedBy: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async resolveDispute(
    disputeId: string,
    adminId: string,
    resolution: DisputeStatus,
    adminNote: string,
  ) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { order: true },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found.');
    }

    if (dispute.status !== DisputeStatus.OPEN && dispute.status !== DisputeStatus.UNDER_REVIEW) {
      throw new BadRequestException('Dispute is already resolved.');
    }

    const orderId = dispute.orderId;
    const order = dispute.order;

    if (resolution === DisputeStatus.RESOLVED_BUYER) {
      // 1. Refund buyer via Escrow
      await this.paymentsService.getEscrowProvider().refundEscrow(order, `Dispute resolved in favor of buyer: ${adminNote}`);

      // 2. Transition state machine to REFUNDED
      await this.stateMachine.transition(orderId, OrderStatus.REFUNDED, {
        actor: 'ADMIN',
        reason: `Dispute resolved by Admin: ${adminNote}`,
        actorId: adminId,
      });
    } else if (resolution === DisputeStatus.RESOLVED_SELLER) {
      // 1. Transition state machine to TRANSFER_VERIFIED
      await this.stateMachine.transition(orderId, OrderStatus.TRANSFER_VERIFIED, {
        actor: 'ADMIN',
        reason: `Dispute resolved in favor of seller by Admin: ${adminNote}`,
        actorId: adminId,
      });

      // 2. Trigger payout release
      await this.payoutsService.processPayout(orderId);
    }

    const updatedDispute = await this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: resolution,
        resolvedBy: adminId,
        resolution: resolution === DisputeStatus.RESOLVED_BUYER ? 'RESOLVED_BUYER' : 'RESOLVED_SELLER',
        adminNote,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        orderId,
        action: 'ADMIN_RESOLVE_DISPUTE',
        entity: 'Dispute',
        entityId: disputeId,
        after: { resolution, adminNote },
      },
    });

    return updatedDispute;
  }

  async overrideTransfer(transferId: string, adminId: string, action: 'APPROVE' | 'REJECT', reason: string) {
    const session = await this.prisma.transferSession.findUnique({
      where: { id: transferId },
      include: { order: true },
    });

    if (!session) {
      throw new NotFoundException('Transfer session not found.');
    }

    const order = session.order;

    if (action === 'APPROVE') {
      await this.stateMachine.transition(order.id, OrderStatus.TRANSFER_VERIFIED, {
        actor: 'ADMIN',
        reason: `Admin manual override approval: ${reason}`,
        actorId: adminId,
      });

      await this.prisma.transferSession.update({
        where: { id: transferId },
        data: { status: TransferStatus.VERIFIED },
      });

      await this.payoutsService.processPayout(order.id);
    } else {
      await this.paymentsService.getEscrowProvider().refundEscrow(order, `Admin rejected transfer: ${reason}`);

      await this.stateMachine.transition(order.id, OrderStatus.REFUNDED, {
        actor: 'ADMIN',
        reason: `Admin manual override rejection: ${reason}`,
        actorId: adminId,
      });

      await this.prisma.transferSession.update({
        where: { id: transferId },
        data: { status: TransferStatus.FAILED },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        orderId: order.id,
        action: 'ADMIN_TRANSFER_OVERRIDE',
        entity: 'TransferSession',
        entityId: transferId,
        after: { action, reason },
      },
    });

    return { success: true, message: `Transfer override executed: ${action}` };
  }

  async setUserBanStatus(userId: string, adminId: string, isBanned: boolean, banReason?: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isBanned,
        banReason: isBanned ? banReason || 'Administrative suspension' : null,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: isBanned ? 'ADMIN_BAN_USER' : 'ADMIN_UNBAN_USER',
        entity: 'User',
        entityId: userId,
        after: { isBanned, banReason },
      },
    });

    return user;
  }

  async forceRefundOrder(orderId: string, adminId: string, reason: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    await this.paymentsService.getEscrowProvider().refundEscrow(order, `Force refund: ${reason}`);

    await this.stateMachine.transition(order.id, OrderStatus.REFUNDED, {
      actor: 'ADMIN',
      reason: `Force refund initiated by admin: ${reason}`,
      actorId: adminId,
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        orderId,
        action: 'ADMIN_FORCE_REFUND',
        entity: 'Order',
        entityId: orderId,
        after: { reason },
      },
    });

    return { success: true, message: 'Order force-refunded successfully.' };
  }

  async getAuditLogs(page = 1, limit = 50, entity?: string) {
    const skip = (page - 1) * limit;
    const where = entity ? { entity } : {};

    const [total, logs] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { items: logs, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getPayouts() {
    return this.prisma.payout.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        seller: { select: { id: true, name: true, email: true } },
        order: { select: { id: true, totalPaise: true, payoutPaise: true } },
      },
    });
  }

  async removeListing(listingId: string, adminId: string, reason: string) {
    const listing = await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.REMOVED },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'ADMIN_REMOVE_LISTING',
        entity: 'Listing',
        entityId: listingId,
        after: { reason },
      },
    });

    return listing;
  }

  async getEscrowBalances() {
    const transactions = await this.prisma.escrowTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: {
          select: {
            id: true,
            buyer: { select: { name: true, email: true } },
            seller: { select: { name: true, email: true } },
          },
        },
      },
    });

    const activeTotal = await this.prisma.escrowTransaction.aggregate({
      where: { status: EscrowStatus.HOLDING },
      _sum: { amountPaise: true },
    });

    return {
      totalHeldPaise: activeTotal._sum.amountPaise || 0,
      transactions,
    };
  }

  // --- Section 21: Admin KYC Oversight ---
  async getKycRecords(status?: string, provider?: string, rejectionReason?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (provider) where.provider = provider;
    if (rejectionReason) where.rejectionReason = rejectionReason;

    return this.prisma.kycVerification.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, role: true } },
      },
    });
  }

  async getKycRecordByUserId(userId: string) {
    return this.prisma.kycVerification.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            bankAccount: true,
          },
        },
      },
    });
  }

  async forceReverify(userId: string, adminId: string) {
    await this.prisma.kycVerification.update({
      where: { userId },
      data: {
        status: 'EXPIRED',
        expiresAt: new Date(),
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'EXPIRED' },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'KYC_ADMIN_FORCE_REVERIFY',
        entity: 'User',
        entityId: userId,
      },
    });

    return { success: true, message: 'User KYC status set to EXPIRED. Re-verification required.' };
  }

  async manualApproveKyc(userId: string, adminId: string, reason: string) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found.');

    await this.prisma.kycVerification.upsert({
      where: { userId },
      create: {
        userId,
        status: 'VERIFIED',
        provider: 'ADMIN_MANUAL_OVERRIDE',
        verifiedName: user.name,
        identityFingerprint: `manual_${userId}_${Date.now()}`,
        verifiedAt: now,
        expiresAt,
        rejectionReason: null,
      },
      update: {
        status: 'VERIFIED',
        provider: 'ADMIN_MANUAL_OVERRIDE',
        verifiedAt: now,
        expiresAt,
        rejectionReason: null,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'VERIFIED', kycVerifiedAt: now },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'KYC_ADMIN_OVERRIDE',
        entity: 'User',
        entityId: userId,
        after: { reason, expiresAt: expiresAt.toISOString() },
      },
    });

    return { success: true, message: `User KYC manually approved. Reason: ${reason}` };
  }

  async getBlockedIdentities() {
    return this.prisma.blockedIdentity.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
