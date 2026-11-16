// apps/backend/src/modules/payments/payments.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { PlatformHeldEscrowProvider } from './escrow/platform-held-escrow.provider.js';
import { RouteEscrowProvider } from './escrow/route-escrow.provider.js';
import { EscrowProvider } from './escrow/escrow-provider.interface.js';
import { VerifyPaymentDto } from './dto/verify-payment.dto.js';
import {
  OrderStatus,
  ListingStatus,
  Platform,
  BUSINESS_RULES,
} from '@ticketpass/shared';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private razorpayClient?: Razorpay;
  private escrowProvider: EscrowProvider;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly stateMachine: OrderStateMachine,
    private readonly platformHeldEscrow: PlatformHeldEscrowProvider,
    private readonly routeEscrow: RouteEscrowProvider,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (keyId && keySecret && !keyId.includes('rzp_test_...')) {
      this.razorpayClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }

    const mode = this.configService.get<string>('ESCROW_MODE') || 'platform_held';
    this.escrowProvider = mode === 'route' ? this.routeEscrow : this.platformHeldEscrow;
    this.logger.log(`PaymentsService using Escrow Mode: ${mode}`);
  }

  getEscrowProvider(): EscrowProvider {
    return this.escrowProvider;
  }

  async verifyPayment(dto: VerifyPaymentDto, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: {
        listing: { include: { event: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.buyerId !== userId) {
      throw new BadRequestException('Payment can only be verified by the purchasing buyer.');
    }

    if (order.status !== OrderStatus.PAYMENT_PENDING) {
      if (order.status === OrderStatus.ESCROW_LOCKED) {
        return {
          success: true,
          message: 'Payment already verified and locked in escrow.',
          orderId: order.id,
          status: order.status,
        };
      }

      // Section 23.1 Edge Case: Payment captured AFTER order expired or reservation lapsed
      if (order.status === OrderStatus.EXPIRED) {
        if (order.listing.status === ListingStatus.ACTIVE) {
          this.logger.log(`[Late Capture Recovery] Order ${order.id} was EXPIRED, but listing ${order.listingId} is still ACTIVE. Re-reserving and honoring purchase.`);
          await this.prisma.listing.update({
            where: { id: order.listingId },
            data: {
              status: ListingStatus.RESERVED,
              reservedByUserId: order.buyerId,
              reservedUntil: new Date(Date.now() + 5 * 60 * 1000),
            },
          });
          await this.prisma.order.update({
            where: { id: order.id },
            data: { status: OrderStatus.PAYMENT_PENDING },
          });
          order.status = OrderStatus.PAYMENT_PENDING;
        } else {
          // Race condition or sold to another buyer: Auto-refund in full
          this.logger.warn(`[Late Capture / Race Conflict] Listing ${order.listingId} is ${order.listing.status}. Auto-refunding payment ${dto.razorpayPaymentId}.`);
          if (this.razorpayClient) {
            try {
              await this.razorpayClient.payments.refund(dto.razorpayPaymentId, {
                amount: order.totalPaise,
                notes: { reason: 'Listing unavailable at capture' },
              });
            } catch (refErr) {
              this.logger.error(`Failed to trigger gateway refund: ${(refErr as Error).message}`);
            }
          }
          await this.prisma.refund.create({
            data: {
              orderId: order.id,
              userId: order.buyerId,
              amountPaise: order.totalPaise,
              reason: 'Ticket was sold or expired prior to payment arrival; full auto-refund executed',
              source: order.listing.status === ListingStatus.SOLD ? 'DOUBLE_PAYMENT' : 'LATE_CAPTURE',
              status: 'SUCCESS',
            },
          });
          throw new BadRequestException('This ticket drop is no longer available. Your payment has been automatically refunded in full.');
        }
      } else {
        throw new BadRequestException(`Order cannot be verified in current state: ${order.status}`);
      }
    }

    // 1. Timing-safe HMAC signature verification
    const secret = this.configService.get<string>('RAZORPAY_KEY_SECRET');
    if (secret && !secret.includes('your_')) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
        .digest('hex');

      const expectedBuffer = Buffer.from(generatedSignature);
      const actualBuffer = Buffer.from(dto.razorpaySignature);

      if (
        expectedBuffer.length !== actualBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
      ) {
        this.logger.error(`Signature mismatch for order ${order.id}`);
        throw new BadRequestException('Invalid payment signature verification failed.');
      }
    }

    // 2. Re-fetch payment from Razorpay API to assert amount & captured status
    if (this.razorpayClient) {
      try {
        const payment = await this.razorpayClient.payments.fetch(dto.razorpayPaymentId);
        if (payment.status !== 'captured') {
          throw new BadRequestException(`Payment not captured: status is ${payment.status}`);
        }
        if (payment.amount !== order.totalPaise) {
          this.logger.error(
            `Amount mismatch! Expected ${order.totalPaise} paise, received ${payment.amount} paise. Triggering refund.`,
          );
          await this.razorpayClient.payments.refund(dto.razorpayPaymentId, {
            amount: payment.amount,
            notes: { reason: 'Amount mismatch fraud protection' },
          });
          throw new BadRequestException('Payment amount mismatch. Order automatically refunded.');
        }
      } catch (apiErr) {
        if (apiErr instanceof BadRequestException) throw apiErr;
        this.logger.warn(`Razorpay API verification failed (continuing in test mode): ${(apiErr as Error).message}`);
      }
    }

    // 3. Atomically transition state to ESCROW_LOCKED
    const updatedOrder = await this.stateMachine.transition(
      order.id,
      OrderStatus.ESCROW_LOCKED,
      {
        actor: 'SYSTEM',
        reason: 'Razorpay payment verified and captured',
        actorId: userId,
        customMetadata: {
          razorpayPaymentId: dto.razorpayPaymentId,
          razorpayOrderId: dto.razorpayOrderId,
        },
      },
    );

    // 4. Update order with payment ID and lock escrow
    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        razorpayPaymentId: dto.razorpayPaymentId,
      },
    });

    await this.escrowProvider.lockEscrow(updatedOrder, dto.razorpayPaymentId);

    // 5. Update listing to SOLD
    await this.prisma.listing.update({
      where: { id: order.listingId },
      data: {
        status: ListingStatus.SOLD,
      },
    });

    // 6. Calculate Seller SLA Deadline
    const now = new Date();
    const event = order.listing.event;
    const isBMS = order.listing.platform === Platform.BOOKMYSHOW;
    const slaMinutes = isBMS
      ? BUSINESS_RULES.SELLER_SLA_MINUTES.BOOKMYSHOW
      : BUSINESS_RULES.SELLER_SLA_MINUTES.DISTRICT;

    let sellerSlaDeadline: Date;
    if (now >= order.listing.transferWindowOpensAt) {
      // Window is already open -> SLA starts immediately
      sellerSlaDeadline = new Date(now.getTime() + slaMinutes * 60 * 1000);
    } else {
      // Window opens in the future -> SLA starts when window opens
      sellerSlaDeadline = new Date(order.listing.transferWindowOpensAt.getTime() + slaMinutes * 60 * 1000);
    }

    // 7. Create TransferSession
    await this.prisma.transferSession.create({
      data: {
        orderId: order.id,
        platform: order.listing.platform,
        sellerSlaDeadline,
      },
    });

    // 8. Auto-generate GST Tax Invoice for platform fee
    try {
      const invoiceCount = await this.prisma.invoice.count();
      const currentYear = new Date().getFullYear();
      const financialYear = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
      const invoiceNumber = `TP/${financialYear}/${(invoiceCount + 1).toString().padStart(5, '0')}`;
      const taxableAmountPaise = order.buyerFeePaise;
      const cgstPaise = Math.round(taxableAmountPaise * 0.09);
      const sgstPaise = Math.round(taxableAmountPaise * 0.09);

      await this.prisma.invoice.create({
        data: {
          invoiceNumber,
          orderId: order.id,
          userId: order.buyerId,
          recipientType: 'BUYER',
          recipientName: (await this.prisma.user.findUnique({ where: { id: order.buyerId } }))?.name || 'Valued Buyer',
          taxableAmountPaise,
          cgstPaise,
          sgstPaise,
          totalAmountPaise: taxableAmountPaise + cgstPaise + sgstPaise,
          financialYear,
          lines: {
            create: [
              {
                description: 'TicketPass Escrow Custody & Verification Service Fee',
                ratePaise: taxableAmountPaise,
                amountPaise: taxableAmountPaise,
              },
            ],
          },
        },
      });
    } catch (invErr) {
      this.logger.warn(`Invoice auto-generation deferred: ${(invErr as Error).message}`);
    }

    this.logger.log(`[Order Secured] Order ${order.id} is now ESCROW_LOCKED. SLA deadline: ${sellerSlaDeadline.toISOString()}`);

    return {
      success: true,
      message: 'Payment verified and escrow locked successfully.',
      orderId: order.id,
      status: OrderStatus.ESCROW_LOCKED,
    };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET');

    // 1. Timing-safe verification of webhook signature
    if (webhookSecret && !webhookSecret.includes('your_')) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      const expectedBuffer = Buffer.from(expectedSignature);
      const actualBuffer = Buffer.from(signature);

      if (
        expectedBuffer.length !== actualBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
      ) {
        throw new BadRequestException('Invalid Razorpay webhook signature.');
      }
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody.toString('utf8'));
    } catch {
      throw new BadRequestException('Malformed webhook JSON payload.');
    }

    const eventId = (payload.event_id as string) || (payload.id as string) || `evt_${Date.now()}`;
    const eventType = payload.event as string;

    // 2. Idempotency check via WebhookEvent table
    const existingEvent = await this.prisma.webhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      this.logger.log(`[Webhook] Duplicate webhook event ${eventId} ignored.`);
      return { received: true, duplicate: true };
    }

    // 3. Process event types
    this.logger.log(`[Webhook] Processing Razorpay webhook: ${eventType} (ID: ${eventId})`);

    try {
      switch (eventType) {
        case 'payment.captured': {
          const paymentEntity = (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown>;
          const entity = paymentEntity?.entity as Record<string, unknown>;
          const orderId = entity?.notes ? (entity.notes as Record<string, string>)?.orderId : null;
          if (orderId) {
            const order = await this.prisma.order.findUnique({ where: { id: orderId } });
            if (order && order.status === OrderStatus.PAYMENT_PENDING) {
              await this.stateMachine.transition(order.id, OrderStatus.ESCROW_LOCKED, {
                actor: 'SYSTEM',
                reason: 'Payment captured confirmed via Razorpay webhook',
              });
            }
          }
          break;
        }

        case 'refund.processed': {
          this.logger.log(`[Webhook] Refund processed: ${eventId}`);
          break;
        }

        case 'payout.processed': {
          this.logger.log(`[Webhook] Payout processed: ${eventId}`);
          break;
        }

        case 'payout.failed': {
          this.logger.error(`[Webhook] Payout failed: ${eventId}`);
          break;
        }

        default:
          this.logger.log(`[Webhook] Unhandled event type: ${eventType}`);
          break;
      }

      // Persist processed webhook event for idempotency
      await this.prisma.webhookEvent.create({
        data: {
          provider: 'RAZORPAY',
          eventId,
          payload: payload as unknown as object,
          processedAt: new Date(),
        },
      });

      return { received: true };
    } catch (err) {
      this.logger.error(`Webhook processing error for ${eventId}: ${(err as Error).message}`, err);
      throw err;
    }
  }
}
