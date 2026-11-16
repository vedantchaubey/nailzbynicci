// apps/backend/src/modules/orders/orders.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from './state-machine/order-state-machine.js';
import { FraudService } from '../fraud/fraud.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { calculateOrderFees } from '@ticketpass/shared';
import { OrderStatus, ListingStatus, UserRole, FraudSeverity } from '@ticketpass/shared';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private razorpayClient?: Razorpay;

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: OrderStateMachine,
    private readonly fraudService: FraudService,
    private readonly configService: ConfigService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (keyId && keySecret && !keyId.includes('rzp_test_...')) {
      this.razorpayClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }
  }

  async createOrder(
    buyerId: string,
    dto: CreateOrderDto,
    idempotencyKey: string,
    deviceFingerprint?: string,
  ) {
    // 1. Idempotency Check
    const existingOrder = await this.prisma.order.findUnique({
      where: { idempotencyKey },
      include: { listing: { include: { event: true } } },
    });

    if (existingOrder) {
      this.logger.log(`[Idempotency] Returning existing order ${existingOrder.id} for key ${idempotencyKey}`);
      return {
        order: existingOrder,
        razorpayOrder: {
          id: existingOrder.razorpayOrderId,
          amount: existingOrder.totalPaise,
          currency: 'INR',
          keyId: this.configService.get<string>('RAZORPAY_KEY_ID') || 'rzp_test_mock',
        },
      };
    }

    // 2. Validate Listing & Buyer Reservation
    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
      include: { event: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.sellerId === buyerId) {
      throw new BadRequestException('You cannot purchase your own ticket listing.');
    }

    // Section 21 rule: Buyer != seller on same order by identity fingerprint (blocks multi-account self-dealing)
    const buyerKyc = await this.prisma.kycVerification.findUnique({ where: { userId: buyerId } });
    const sellerKyc = await this.prisma.kycVerification.findUnique({ where: { userId: listing.sellerId } });

    if (buyerKyc?.identityFingerprint && sellerKyc?.identityFingerprint) {
      if (buyerKyc.identityFingerprint === sellerKyc.identityFingerprint) {
        await this.prisma.fraudFlag.create({
          data: {
            userId: buyerId,
            listingId: listing.id,
            severity: FraudSeverity.CRITICAL,
            rule: 'BUYER_SELLER_SAME_IDENTITY_SELF_DEALING',
            metadata: { buyerId, sellerId: listing.sellerId },
          },
        });
        throw new ForbiddenException('Self-dealing detected. Buyer and seller share the same verified identity.');
      }
    }

    const now = new Date();
    const isReservedByBuyer =
      listing.status === ListingStatus.RESERVED &&
      listing.reservedByUserId === buyerId &&
      listing.reservedUntil &&
      listing.reservedUntil > now;

    if (!isReservedByBuyer && listing.status !== ListingStatus.ACTIVE) {
      throw new ConflictException(
        'This listing is not available for purchase or your reservation has expired.',
      );
    }

    // 3. Integer-Paise Fee Calculations
    const fees = calculateOrderFees(listing.resalePricePaise);

    // 4. Create Razorpay Order
    let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    if (this.razorpayClient) {
      try {
        const rzpOrder = await this.razorpayClient.orders.create({
          amount: fees.totalBuyerPaysPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`.substring(0, 40),
          notes: {
            listingId: listing.id,
            eventId: listing.eventId,
            buyerId,
            sellerId: listing.sellerId,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (err) {
        this.logger.error('Failed to create Razorpay checkout order:', err);
      }
    }

    // 5. Persist Order in PAYMENT_PENDING state
    const order = await this.prisma.order.create({
      data: {
        buyerId,
        sellerId: listing.sellerId,
        listingId: listing.id,
        status: OrderStatus.PAYMENT_PENDING,
        ticketPricePaise: fees.resalePricePaise,
        buyerFeePaise: fees.buyerFeePaise,
        sellerFeePaise: fees.sellerFeePaise,
        totalPaise: fees.totalBuyerPaysPaise,
        payoutPaise: fees.sellerReceivesPaise,
        buyerAppPhone: dto.buyerAppPhone,
        razorpayOrderId,
        idempotencyKey,
      },
      include: {
        listing: { include: { event: true } },
      },
    });

    // 6. Scan for buyer/seller collusion or risk flags
    await this.fraudService.scanOrder(order.id, deviceFingerprint);

    return {
      order,
      razorpayOrder: {
        id: razorpayOrderId,
        amount: fees.totalBuyerPaysPaise,
        currency: 'INR',
        keyId: this.configService.get<string>('RAZORPAY_KEY_ID') || 'rzp_test_mock',
      },
    };
  }

  async getOrderById(orderId: string, userId: string, userRole: UserRole) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        listing: { include: { event: true } },
        transferSession: { include: { logs: true } },
        escrowTransaction: true,
        payout: true,
        dispute: true,
        buyer: { select: { id: true, name: true, phone: true } },
        seller: { select: { id: true, name: true, phone: true, reputation: true } },
      },
    });

    // Return 404 rather than 403 for unauthorized users as required by Section 13
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    const isAuthorized =
      order.buyerId === userId ||
      order.sellerId === userId ||
      userRole === UserRole.ADMIN ||
      userRole === UserRole.SUPER_ADMIN;

    if (!isAuthorized) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }

  async getBuyerOrders(buyerId: string) {
    return this.prisma.order.findMany({
      where: { buyerId },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { include: { event: true } },
        transferSession: true,
        escrowTransaction: true,
        dispute: true,
      },
    });
  }

  async getSellerOrders(sellerId: string) {
    return this.prisma.order.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { include: { event: true } },
        transferSession: true,
        escrowTransaction: true,
        payout: true,
        dispute: true,
      },
    });
  }

  async cancelOrder(orderId: string, buyerId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.buyerId !== buyerId) {
      throw new NotFoundException('Order not found.');
    }

    if (order.status !== OrderStatus.PAYMENT_PENDING) {
      throw new BadRequestException('Only orders awaiting payment can be cancelled.');
    }

    // Cancel order and return listing to ACTIVE
    await this.stateMachine.transition(orderId, OrderStatus.EXPIRED, {
      actor: 'BUYER',
      reason: 'Buyer cancelled checkout before payment capture',
      actorId: buyerId,
    });

    await this.prisma.listing.update({
      where: { id: order.listingId },
      data: {
        status: ListingStatus.ACTIVE,
        reservedByUserId: null,
        reservedUntil: null,
      },
    });

    return { success: true, message: 'Order cancelled successfully.' };
  }

  async handleWrongRecipient(orderId: string, sellerId: string, details?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: { include: { event: true } }, transferSession: true },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.sellerId !== sellerId) throw new ForbiddenException('Only the seller can report wrong recipient');

    if (order.listing.platform === 'BOOKMYSHOW') {
      return {
        platform: 'BOOKMYSHOW',
        instruction: `In BookMyShow, tap Your Orders > find this transfer > tap "Cancel Request" immediately before acceptance. Then re-initiate with buyer contact +91 ${order.buyerAppPhone}`,
        extendedSlaMinutes: 0,
      };
    } else {
      let newDeadline: Date | null = null;
      if (order.transferSession) {
        newDeadline = new Date(order.transferSession.sellerSlaDeadline.getTime() + 30 * 60 * 1000);
        await this.prisma.transferSession.update({
          where: { orderId },
          data: { sellerSlaDeadline: newDeadline },
        });
      }
      return {
        platform: 'DISTRICT',
        instruction: 'Request the recipient in District to return tickets. Your transfer SLA deadline has been extended by 30 minutes.',
        extendedSlaDeadline: newDeadline,
      };
    }
  }
}
