// apps/backend/src/modules/finance/finance.service.ts
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { calculateGst } from '@ticketpass/shared';

@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates official GST Tax Invoices for an order (buyer platform fee and/or seller platform fee)
   */
  async generateInvoicesForOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        invoices: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    // If buyer invoice already generated, return existing
    const existingBuyerInvoice = order.invoices.find((inv) => inv.recipientType === 'BUYER');
    if (existingBuyerInvoice) {
      return { buyerInvoice: existingBuyerInvoice };
    }

    const currentYear = new Date().getFullYear();
    const nextYearShort = (currentYear + 1).toString().slice(-2);
    const financialYear = `${currentYear}-${nextYearShort}`;

    const invoiceCount = await this.prisma.invoice.count();
    const invoiceSeq = (invoiceCount + 1).toString().padStart(5, '0');
    const invoiceNumber = `TP/${financialYear}/${invoiceSeq}`;

    // GST calculation: 18% on platform fee
    // Platform state is Maharashtra (MH)
    const isInterState = false; // default intra-state for demo or buyer state check
    const gst = calculateGst(order.buyerFeePaise, isInterState);

    const invoice = await this.prisma.invoice.create({
      data: {
        invoiceNumber,
        orderId: order.id,
        userId: order.buyerId,
        recipientType: 'BUYER',
        recipientName: order.buyer.name,
        recipientState: 'MH',
        taxableAmountPaise: gst.taxableAmountPaise,
        cgstPaise: gst.cgstPaise,
        sgstPaise: gst.sgstPaise,
        igstPaise: gst.igstPaise,
        totalAmountPaise: gst.totalWithGstPaise,
        financialYear,
        lines: {
          create: [
            {
              description: 'TicketPass Escrow Custody & Verification Service Fee',
              quantity: 1,
              ratePaise: gst.taxableAmountPaise,
              amountPaise: gst.taxableAmountPaise,
            },
          ],
        },
      },
      include: { lines: true },
    });

    this.logger.log(`Generated Tax Invoice ${invoice.invoiceNumber} for order ${order.id}`);
    return { buyerInvoice: invoice };
  }

  /**
   * Retrieves an invoice by Order ID
   */
  async getInvoiceByOrderId(orderId: string, userId: string, isAdmin = false) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { orderId },
      include: {
        lines: true,
        order: {
          include: {
            listing: { include: { event: true } },
          },
        },
      },
    });

    if (!invoice) throw new NotFoundException('Invoice not found for this order.');
    if (!isAdmin && invoice.userId !== userId) {
      throw new NotFoundException('Invoice not found.');
    }

    return invoice;
  }

  /**
   * Retrieves user's invoices
   */
  async getUserInvoices(userId: string) {
    return this.prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        lines: true,
        order: {
          include: { listing: { include: { event: true } } },
        },
      },
    });
  }

  /**
   * Financial Reconciliation Dashboard for Admins & Accountants
   */
  async getReconciliationSummary() {
    const orders = await this.prisma.order.findMany({
      select: {
        id: true,
        status: true,
        totalPaise: true,
        ticketPricePaise: true,
        buyerFeePaise: true,
        sellerFeePaise: true,
        payoutPaise: true,
      },
    });

    let totalCapturedPaise = 0;
    let totalInEscrowPaise = 0;
    let totalReleasedPaise = 0;
    let totalRefundedPaise = 0;
    let totalBuyerFeesPaise = 0;
    let totalSellerFeesPaise = 0;

    for (const ord of orders) {
      if (ord.status !== 'PAYMENT_PENDING' && ord.status !== 'EXPIRED') {
        totalCapturedPaise += ord.totalPaise;
      }
      if (
        ord.status === 'ESCROW_LOCKED' ||
        ord.status === 'TRANSFER_INITIATED' ||
        ord.status === 'TRANSFER_AWAITING_ACCEPTANCE' ||
        ord.status === 'TRANSFER_VERIFIED' ||
        ord.status === 'DISPUTED'
      ) {
        totalInEscrowPaise += ord.totalPaise;
      }
      if (ord.status === 'PAYOUT_RELEASED') {
        totalReleasedPaise += ord.payoutPaise;
        totalBuyerFeesPaise += ord.buyerFeePaise;
        totalSellerFeesPaise += ord.sellerFeePaise;
      }
      if (ord.status === 'REFUNDED') {
        totalRefundedPaise += ord.totalPaise;
      }
    }

    const totalPlatformRevenuePaise = totalBuyerFeesPaise + totalSellerFeesPaise;
    const totalGstCollectedPaise = Math.round(totalPlatformRevenuePaise * 0.18);

    // Reserve fund
    const reserveFund = await this.prisma.reserveFund.findFirst({
      include: { entries: { take: 10, orderBy: { createdAt: 'desc' } } },
    });

    const activeFeeConfig = await this.prisma.feeConfig.findFirst({
      where: { isActive: true },
      orderBy: { effectiveFrom: 'desc' },
    });

    return {
      financialYear: '2026-27',
      currency: 'INR',
      summary: {
        totalCapturedPaise,
        totalInEscrowPaise,
        totalReleasedPaise,
        totalRefundedPaise,
        totalBuyerFeesPaise,
        totalSellerFeesPaise,
        totalPlatformRevenuePaise,
        totalGstCollectedPaise,
        reconciliationBalanced:
          totalCapturedPaise ===
          totalInEscrowPaise + totalReleasedPaise + totalRefundedPaise + totalBuyerFeesPaise,
      },
      reserveFund: {
        balancePaise: reserveFund ? Number(reserveFund.balancePaise) : 0,
        targetBalancePaise: reserveFund ? Number(reserveFund.targetBalancePaise) : 0,
        totalClaimsPaidPaise: reserveFund ? Number(reserveFund.totalClaimsPaidPaise) : 0,
        recentEntries: reserveFund?.entries || [],
      },
      activeFeeConfig,
    };
  }

  /**
   * Update or Create Fee Config (Admin only)
   */
  async updateFeeConfig(dto: {
    buyerFeePercent: number;
    sellerFeePercent: number;
    sellerDepositPercent: number;
    minFeePaise: number;
    maxMarkupPercent?: number;
    category?: string;
  }) {
    // Deactivate previous active configs
    await this.prisma.feeConfig.updateMany({
      where: { category: dto.category || null },
      data: { isActive: false },
    });

    return this.prisma.feeConfig.create({
      data: {
        category: dto.category || null,
        buyerFeePercent: dto.buyerFeePercent,
        sellerFeePercent: dto.sellerFeePercent,
        sellerDepositPercent: dto.sellerDepositPercent,
        minFeePaise: dto.minFeePaise,
        maxMarkupPercent: dto.maxMarkupPercent,
        isActive: true,
      },
    });
  }

  /**
   * Get Active Fee Config
   */
  async getActiveFeeConfig(category?: string) {
    const config = await this.prisma.feeConfig.findFirst({
      where: {
        isActive: true,
        category: category || null,
      },
      orderBy: { effectiveFrom: 'desc' },
    });

    if (config) return config;

    // Fallback default
    return {
      buyerFeePercent: 5.0,
      sellerFeePercent: 5.0,
      sellerDepositPercent: 20.0,
      minFeePaise: 5000,
      maxMarkupPercent: 100.0,
      isActive: true,
    };
  }

  /**
   * Validate coupon code for checkout
   */
  async validateCoupon(code: string, userId: string, orderAmountPaise: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
      include: { redemptions: { where: { userId } } },
    });

    if (!coupon || !coupon.isActive) {
      throw new BadRequestException('Invalid or expired coupon code.');
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new BadRequestException('Coupon code has expired.');
    }

    if (coupon.minOrderPaise && orderAmountPaise < coupon.minOrderPaise) {
      throw new BadRequestException(`Order minimum ₹${coupon.minOrderPaise / 100} required for this coupon.`);
    }

    if (coupon.redemptions.length >= coupon.perUserLimit) {
      throw new BadRequestException('You have already redeemed this coupon code.');
    }

    let discountPaise = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountPaise = Math.round((orderAmountPaise * coupon.discountValue) / 100);
      if (coupon.maxDiscountPaise) {
        discountPaise = Math.min(discountPaise, coupon.maxDiscountPaise);
      }
    } else {
      discountPaise = coupon.discountValue;
    }

    return {
      isValid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountPaise,
      appliesToFeeOnly: coupon.appliesToFeeOnly,
    };
  }
}
