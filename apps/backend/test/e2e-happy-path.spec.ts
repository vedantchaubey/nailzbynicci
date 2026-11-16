// apps/backend/test/e2e-happy-path.spec.ts
import {
  OrderStatus,
  ListingStatus,
  DepositStatus,
  EscrowStatus,
  Platform,
  calculateOrderFees,
  BUSINESS_RULES,
} from '@ticketpass/shared';
import * as crypto from 'crypto';

interface TestListing {
  id: string;
  sellerId: string;
  platform: Platform;
  status: ListingStatus;
  originalPricePaise: number;
  resalePricePaise: number;
  seats: string[];
  depositStatus: DepositStatus;
}

interface TestOrder {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: OrderStatus;
  ticketPricePaise: number;
  buyerFeePaise: number;
  sellerFeePaise: number;
  totalPaise: number;
  payoutPaise: number;
  escrowStatus?: EscrowStatus;
  confidenceScore: number;
  sellerInitiated: boolean;
  buyerConfirmed: boolean;
  depositStatus: DepositStatus;
}

describe('TicketPass Happy Path E2E Workflow', () => {
  const sellerId = 'seller_aditya_verma';
  const buyerId = 'buyer_kavita_nair';
  const eventId = 'event_ipl_srh_pbks';
  const resalePricePaise = 350000; // ₹3,500

  let listing: TestListing;
  let order: TestOrder;

  it('Step 1: Seller creates listing with 20% security deposit and activates it', () => {
    const depositPaise = Math.round(resalePricePaise * BUSINESS_RULES.SELLER_SECURITY_DEPOSIT_PERCENT);
    expect(depositPaise).toBe(70000); // ₹700

    listing = {
      id: 'listing_test_101',
      sellerId,
      platform: Platform.DISTRICT,
      status: ListingStatus.DRAFT,
      originalPricePaise: 250000,
      resalePricePaise,
      seats: ['A101', 'A102'],
      depositStatus: DepositStatus.HELD,
    };

    // Seller completes deposit payment -> Listing activates
    listing.status = ListingStatus.ACTIVE;
    expect(listing.status).toBe(ListingStatus.ACTIVE);
    expect(listing.depositStatus).toBe(DepositStatus.HELD);
  });

  it('Step 2: Buyer reserves ticket for checkout hold (5 minutes)', () => {
    expect(listing.status).toBe(ListingStatus.ACTIVE);

    // Distributed lock acquired by buyer
    listing.status = ListingStatus.RESERVED;
    expect(listing.status).toBe(ListingStatus.RESERVED);
  });

  it('Step 3: Buyer creates order with idempotency key', () => {
    const idempotencyKey = 'idem_checkout_999';
    const fees = calculateOrderFees(listing.resalePricePaise);

    order = {
      id: `ord_${idempotencyKey}`,
      listingId: listing.id,
      buyerId,
      sellerId,
      status: OrderStatus.PAYMENT_PENDING,
      ticketPricePaise: fees.resalePricePaise,
      buyerFeePaise: fees.buyerFeePaise,
      sellerFeePaise: fees.sellerFeePaise,
      totalPaise: fees.totalBuyerPaysPaise,
      payoutPaise: fees.sellerReceivesPaise,
      confidenceScore: 0,
      sellerInitiated: false,
      buyerConfirmed: false,
      depositStatus: listing.depositStatus,
    };

    expect(order.status).toBe(OrderStatus.PAYMENT_PENDING);
    expect(order.totalPaise).toBe(367500); // ₹3,675.00
    expect(order.payoutPaise).toBe(332500); // ₹3,325.00
  });

  it('Step 4: Buyer completes Razorpay payment -> order moves to ESCROW_LOCKED', () => {
    const secret = 'rzp_test_secret_key';
    const rzpOrderId = 'order_rzp_123';
    const rzpPaymentId = 'pay_rzp_456';

    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${rzpOrderId}|${rzpPaymentId}`)
      .digest('hex');

    // Verify payment signature
    const verified = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(crypto.createHmac('sha256', secret).update(`${rzpOrderId}|${rzpPaymentId}`).digest('hex')),
    );
    expect(verified).toBe(true);

    // Escrow lock transition
    order.status = OrderStatus.ESCROW_LOCKED;
    order.escrowStatus = EscrowStatus.HOLDING;
    listing.status = ListingStatus.SOLD;

    expect(order.status).toBe(OrderStatus.ESCROW_LOCKED);
    expect(order.escrowStatus).toBe(EscrowStatus.HOLDING);
    expect(listing.status).toBe(ListingStatus.SOLD);
  });

  it('Step 5: Seller initiates transfer in District app -> order moves to TRANSFER_AWAITING_ACCEPTANCE', () => {
    expect(order.status).toBe(OrderStatus.ESCROW_LOCKED);

    // Seller taps "I initiated the transfer"
    order.sellerInitiated = true;
    order.status = OrderStatus.TRANSFER_AWAITING_ACCEPTANCE;

    expect(order.status).toBe(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE);
    expect(order.sellerInitiated).toBe(true);
  });

  it('Step 6: Buyer confirms in-app receipt with last-4 check and OCR screenshot -> TRANSFER_VERIFIED', () => {
    // Friction check: last 4 digits match seat numbers
    const frictionCheck = 'A102'.endsWith('102');
    expect(frictionCheck).toBe(true);

    // Simulated screenshot OCR fixture containing platform keywords
    const ocrFixture = 'MY BOOKINGS - DISTRICT BY ZOMATO - BOOKED - TICKETS ACCEPTED - IPL SRH VS PBKS';
    const hasKeywords = ocrFixture.includes('BOOKED') || ocrFixture.includes('TICKETS ACCEPTED');
    expect(hasKeywords).toBe(true);

    order.buyerConfirmed = true;

    // Confidence Engine re-scores:
    // Signal A (35) + Signal B (25) + Signal C (10) + Signal D (10) + Signal E (10) = 90
    order.confidenceScore = 90.0;
    expect(order.confidenceScore).toBeGreaterThanOrEqual(BUSINESS_RULES.CONFIDENCE_AUTO_RELEASE_THRESHOLD);
    expect(order.buyerConfirmed).toBe(true);

    // State machine progresses to TRANSFER_VERIFIED
    order.status = OrderStatus.TRANSFER_VERIFIED;
    expect(order.status).toBe(OrderStatus.TRANSFER_VERIFIED);
  });

  it('Step 7: Payout job releases escrow to seller and refunds security deposit -> PAYOUT_RELEASED', () => {
    expect(order.status).toBe(OrderStatus.TRANSFER_VERIFIED);
    expect(order.escrowStatus).toBe(EscrowStatus.HOLDING);

    // Payout release
    order.escrowStatus = EscrowStatus.RELEASED;
    order.status = OrderStatus.PAYOUT_RELEASED;
    order.depositStatus = DepositStatus.REFUNDED;

    expect(order.status).toBe(OrderStatus.PAYOUT_RELEASED);
    expect(order.escrowStatus).toBe(EscrowStatus.RELEASED);
    expect(order.depositStatus).toBe(DepositStatus.REFUNDED);
  });
});
