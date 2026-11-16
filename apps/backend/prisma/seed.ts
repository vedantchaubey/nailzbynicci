// apps/backend/prisma/seed.ts
import { PrismaClient, Platform, ListingStatus, OrderStatus, TransferStatus, EscrowStatus, PayoutStatus, DisputeStatus, UserRole, SellerLevel, DepositStatus } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

const DEFAULT_ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function encryptAccount(plainText: string, hexKey: string): string {
  const keyBuffer = Buffer.from(hexKey, 'hex');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv, { authTagLength: 16 });
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

function hashBooking(bookingId: string): string {
  return crypto.createHash('sha256').update(bookingId).digest('hex');
}

async function main() {
  console.log('Seeding TicketPass database with realistic production-grade data...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.fraudFlag.deleteMany();
  await prisma.transferVerificationLog.deleteMany();
  await prisma.transferSession.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.escrowTransaction.deleteMany();
  await prisma.order.deleteMany();
  await prisma.sellerDeposit.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.event.deleteMany();
  await prisma.sellerBankAccount.deleteMany();
  await prisma.sellerReputation.deleteMany();
  await prisma.kycSession.deleteMany();
  await prisma.kycVerification.deleteMany();
  await prisma.blockedIdentity.deleteMany();
  await prisma.user.deleteMany();

  // 1. Super Admin
  const adminUser = await prisma.user.create({
    data: {
      clerkId: 'user_admin_super_01',
      email: 'admin@ticketpass.dev',
      name: 'TicketPass SuperAdmin',
      phone: '+919999900001',
      role: UserRole.SUPER_ADMIN,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  // 2. Sellers with Reputations & Bank Accounts
  const sellerNew = await prisma.user.create({
    data: {
      clerkId: 'user_seller_new_01',
      email: 'seller.new@ticketpass.dev',
      name: 'Rohan Sharma',
      phone: '+919876543210',
      role: UserRole.USER,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      reputation: {
        create: {
          level: SellerLevel.NEW,
          score: 55.0,
          totalListings: 2,
          completedSales: 1,
          disputeCount: 0,
          failedTransfers: 0,
          onTimeTransfers: 1,
          avgTransferSeconds: 1200,
        },
      },
      bankAccount: {
        create: {
          accountHolder: 'Rohan Sharma',
          accountNumberEncrypted: encryptAccount('50100234567890', DEFAULT_ENCRYPTION_KEY),
          ifsc: 'HDFC0001234',
          upiId: 'rohan@okhdfcbank',
          isVerified: true,
        },
      },
    },
  });

  const sellerTrusted = await prisma.user.create({
    data: {
      clerkId: 'user_seller_trusted_02',
      email: 'seller.trusted@ticketpass.dev',
      name: 'Priya Patel',
      phone: '+919876543211',
      role: UserRole.USER,
      isPhoneVerified: true,
      kycStatus: 'VERIFIED',
      kycVerifiedAt: new Date(Date.now() - 30 * 86400000),
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      reputation: {
        create: {
          level: SellerLevel.TRUSTED,
          score: 78.5,
          totalListings: 8,
          completedSales: 7,
          disputeCount: 0,
          failedTransfers: 0,
          onTimeTransfers: 7,
          avgTransferSeconds: 450,
        },
      },
      bankAccount: {
        create: {
          accountHolder: 'Priya Patel',
          holderNameFromBank: 'Priya Patel',
          nameMatchScore: 1.0,
          nameMatchVerified: true,
          accountNumberEncrypted: encryptAccount('91802003456789', DEFAULT_ENCRYPTION_KEY),
          ifsc: 'ICIC0000104',
          upiId: 'priya@icici',
          isVerified: true,
        },
      },
      kyc: {
        create: {
          status: 'VERIFIED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Priya Patel',
          dateOfBirth: new Date('1994-03-15'),
          gender: 'F',
          state: 'Gujarat',
          aadhaarLast4: '3819',
          identityFingerprint: crypto.createHash('sha256').update('priya patel|1994-03-15|3819').digest('hex'),
          consentId: 'consent_priya_01',
          consentAt: new Date(Date.now() - 30 * 86400000),
          verifiedAt: new Date(Date.now() - 30 * 86400000),
          expiresAt: new Date(Date.now() + 335 * 86400000),
        },
      },
    },
  });

  const sellerVerified = await prisma.user.create({
    data: {
      clerkId: 'user_seller_verified_03',
      email: 'seller.verified@ticketpass.dev',
      name: 'Aditya Verma',
      phone: '+919876543212',
      role: UserRole.USER,
      isPhoneVerified: true,
      kycStatus: 'VERIFIED',
      kycVerifiedAt: new Date(Date.now() - 45 * 86400000),
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      reputation: {
        create: {
          level: SellerLevel.VERIFIED,
          score: 94.0,
          totalListings: 22,
          completedSales: 21,
          disputeCount: 0,
          failedTransfers: 0,
          onTimeTransfers: 21,
          avgTransferSeconds: 210,
        },
      },
      bankAccount: {
        create: {
          accountHolder: 'Aditya Verma',
          holderNameFromBank: 'Aditya Verma',
          nameMatchScore: 1.0,
          nameMatchVerified: true,
          accountNumberEncrypted: encryptAccount('32001010045678', DEFAULT_ENCRYPTION_KEY),
          ifsc: 'SBIN0000691',
          upiId: 'aditya@oksbi',
          isVerified: true,
        },
      },
      kyc: {
        create: {
          status: 'VERIFIED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Aditya Verma',
          dateOfBirth: new Date('1991-08-20'),
          gender: 'M',
          state: 'Maharashtra',
          aadhaarLast4: '7721',
          identityFingerprint: crypto.createHash('sha256').update('aditya verma|1991-08-20|7721').digest('hex'),
          consentId: 'consent_aditya_02',
          consentAt: new Date(Date.now() - 45 * 86400000),
          verifiedAt: new Date(Date.now() - 45 * 86400000),
          expiresAt: new Date(Date.now() + 320 * 86400000),
        },
      },
    },
  });

  // 3. Buyers
  const buyerOne = await prisma.user.create({
    data: {
      clerkId: 'user_buyer_01',
      email: 'buyer.one@ticketpass.dev',
      name: 'Kavita Nair',
      phone: '+919811122233',
      role: UserRole.USER,
      isPhoneVerified: true,
      kycStatus: 'VERIFIED',
      kycVerifiedAt: new Date(Date.now() - 15 * 86400000),
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      kyc: {
        create: {
          status: 'VERIFIED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Kavita Nair',
          dateOfBirth: new Date('1996-12-04'),
          gender: 'F',
          state: 'Kerala',
          aadhaarLast4: '5544',
          identityFingerprint: crypto.createHash('sha256').update('kavita nair|1996-12-04|5544').digest('hex'),
          consentId: 'consent_kavita_01',
          consentAt: new Date(Date.now() - 15 * 86400000),
          verifiedAt: new Date(Date.now() - 15 * 86400000),
          expiresAt: new Date(Date.now() + 350 * 86400000),
        },
      },
    },
  });

  const buyerTwo = await prisma.user.create({
    data: {
      clerkId: 'user_buyer_02',
      email: 'buyer.two@ticketpass.dev',
      name: 'Vikram Malhotra',
      phone: '+919822233344',
      role: UserRole.USER,
      isPhoneVerified: true,
      kycStatus: 'VERIFIED',
      kycVerifiedAt: new Date(Date.now() - 10 * 86400000),
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      kyc: {
        create: {
          status: 'VERIFIED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Vikram Malhotra',
          dateOfBirth: new Date('1992-11-05'),
          gender: 'M',
          state: 'Karnataka',
          aadhaarLast4: '7740',
          identityFingerprint: crypto.createHash('sha256').update('vikram malhotra|1992-11-05|7740').digest('hex'),
          consentId: 'consent_vikram_01',
          consentAt: new Date(Date.now() - 10 * 86400000),
          verifiedAt: new Date(Date.now() - 10 * 86400000),
          expiresAt: new Date(Date.now() + 355 * 86400000),
        },
      },
    },
  });

  // Section 21: Users in each other KYC status (IN_PROGRESS, REJECTED, EXPIRED, WITHDRAWN, NOT_STARTED)
  await prisma.user.create({
    data: {
      clerkId: 'user_kyc_in_progress',
      email: 'kyc.progress@ticketpass.dev',
      name: 'Suresh Raina',
      phone: '+919855566677',
      role: UserRole.USER,
      kycStatus: 'IN_PROGRESS',
      kyc: {
        create: {
          status: 'IN_PROGRESS',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Suresh Raina',
          identityFingerprint: 'temp_progress_fingerprint',
          attemptCount: 1,
          lastAttemptAt: new Date(),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      clerkId: 'user_kyc_rejected',
      email: 'kyc.rejected@ticketpass.dev',
      name: 'Aryan Kid Mehra',
      phone: '+919866677788',
      role: UserRole.USER,
      kycStatus: 'REJECTED',
      kyc: {
        create: {
          status: 'REJECTED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Aryan Kid Mehra',
          dateOfBirth: new Date('2012-05-10'),
          gender: 'M',
          state: 'Maharashtra',
          aadhaarLast4: '1122',
          identityFingerprint: crypto.createHash('sha256').update('aryan kid mehra|2012-05-10|1122').digest('hex'),
          rejectionReason: 'UNDERAGE',
          attemptCount: 1,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      clerkId: 'user_kyc_expired',
      email: 'kyc.expired@ticketpass.dev',
      name: 'Sunil Gavaskar',
      phone: '+919877788899',
      role: UserRole.USER,
      kycStatus: 'EXPIRED',
      kyc: {
        create: {
          status: 'EXPIRED',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Sunil Gavaskar',
          dateOfBirth: new Date('1970-07-10'),
          gender: 'M',
          state: 'Maharashtra',
          aadhaarLast4: '9988',
          identityFingerprint: crypto.createHash('sha256').update('sunil gavaskar|1970-07-10|9988').digest('hex'),
          verifiedAt: new Date(Date.now() - 400 * 86400000),
          expiresAt: new Date(Date.now() - 35 * 86400000), // Expired 35 days ago
          attemptCount: 1,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      clerkId: 'user_kyc_withdrawn',
      email: 'kyc.withdrawn@ticketpass.dev',
      name: 'Meena Kumari',
      phone: '+919888899900',
      role: UserRole.USER,
      kycStatus: 'WITHDRAWN',
      kyc: {
        create: {
          status: 'WITHDRAWN',
          provider: 'MOCK_DIGILOCKER',
          verifiedName: 'Meena Kumari',
          identityFingerprint: crypto.createHash('sha256').update('meena kumari|1988-02-14|3322').digest('hex'),
          attemptCount: 1,
        },
      },
    },
  });

  // Section 21: Blocked identity
  const bannedFingerprint = crypto.createHash('sha256').update('banned fraudster identity|1985-01-01|6666').digest('hex');
  await prisma.blockedIdentity.create({
    data: {
      identityFingerprint: bannedFingerprint,
      reason: 'Banned for synthetic screenshot forgery and chargeback fraud syndicate',
    },
  });

  const buyerThree = await prisma.user.create({
    data: {
      clerkId: 'user_buyer_03',
      email: 'buyer.three@ticketpass.dev',
      name: 'Ananya Gupta',
      phone: '+919833344455',
      role: UserRole.USER,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
  });

  // 4. Events (All dates in the future relative to current execution time)
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const eventsData = [
    {
      name: 'IPL 2026: Sunrisers Hyderabad vs Punjab Kings',
      description: 'High-octane T20 clash under lights at Hyderabad. Sold-out league fixture.',
      venue: 'Rajiv Gandhi International Cricket Stadium',
      city: 'Hyderabad',
      date: new Date(now + 4 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
      category: 'Cricket',
      platform: Platform.DISTRICT,
    },
    {
      name: 'ICC T20 World Cup: India vs Netherlands',
      description: 'Super 12 Group Stage encounter with full capacity home support.',
      venue: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      date: new Date(now + 6 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800',
      category: 'Cricket',
      platform: Platform.BOOKMYSHOW,
    },
    {
      name: 'Super 8 Match 11: India vs Australia',
      description: 'High-stakes clash at the capital with semifinal qualification on the line.',
      venue: 'Arun Jaitley Stadium',
      city: 'Delhi',
      date: new Date(now + 8 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      category: 'Cricket',
      platform: Platform.DISTRICT,
    },
    {
      name: 'Coldplay: Music of the Spheres World Tour',
      description: 'Global pop icons live in Mumbai for an extraordinary sensory spectacle.',
      venue: 'DY Patil Sports Stadium',
      city: 'Mumbai',
      date: new Date(now + 12 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      category: 'Concert',
      platform: Platform.BOOKMYSHOW,
    },
    {
      name: 'Diljit Dosanjh: Dil-Luminati Tour 2026',
      description: 'The global Punjabi music powerhouse performing his historic stadium tour in Delhi.',
      venue: 'Jawaharlal Nehru Stadium',
      city: 'Delhi',
      date: new Date(now + 15 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      category: 'Concert',
      platform: Platform.BOOKMYSHOW,
    },
    {
      name: 'IPL 2026: Mumbai Indians vs Royal Challengers Bengaluru',
      description: 'The biggest rivalry in Indian franchise cricket returns to the iconic Wankhede cauldron.',
      venue: 'Wankhede Stadium',
      city: 'Mumbai',
      date: new Date(now + 5 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      category: 'Cricket',
      platform: Platform.DISTRICT,
    },
    {
      name: 'Zakir Khan Live: Tathastu Special',
      description: 'India’s most beloved storyteller with his brand new arena standup comedy special.',
      venue: 'Siri Fort Auditorium',
      city: 'Delhi',
      date: new Date(now + 9 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
      category: 'Comedy',
      platform: Platform.BOOKMYSHOW,
    },
    {
      name: 'Sunburn Goa Electronic Music Festival',
      description: 'Asia’s premier multi-stage dance music festival along the sandy shores of Vagator.',
      venue: 'Vagator Beach Arena',
      city: 'Goa',
      date: new Date(now + 20 * dayMs),
      imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
      category: 'Festival',
      platform: Platform.DISTRICT,
    },
  ];

  const createdEvents = [];
  for (const e of eventsData) {
    const created = await prisma.event.create({ data: e });
    createdEvents.push(created);
  }

  // 5. Create 25+ Active Listings
  console.log('Generating active listings across events...');
  const sampleSections = [
    { section: 'North Stand Bay 2', row: 'C', basePrice: 250000, resalePrice: 350000 },
    { section: 'AirAsia East Stand First Floor Bay 1', row: 'A', basePrice: 450000, resalePrice: 650000 },
    { section: 'Block K Bay 8 Upper', row: 'E', basePrice: 150000, resalePrice: 220000 },
    { section: 'Pavilion Terrace Club Lounge', row: 'B', basePrice: 850000, resalePrice: 1200000 },
    { section: 'Garware Stand Lower Tier', row: 'H', basePrice: 300000, resalePrice: 420000 },
    { section: 'Grand Lounge VIP Box 4', row: 'A', basePrice: 1500000, resalePrice: 2000000 },
    { section: 'South West Bay 12', row: 'D', basePrice: 200000, resalePrice: 275000 },
  ];

  const sellers = [sellerNew, sellerTrusted, sellerVerified];
  let listingIdx = 1;
  const createdListings = [];

  for (const event of createdEvents) {
    const transferHours = event.platform === Platform.BOOKMYSHOW ? 48 : 6;
    const transferWindowOpensAt = new Date(event.date.getTime() - transferHours * 60 * 60 * 1000);
    const expiresAt = new Date(event.date.getTime() - 30 * 60 * 1000); // 30 min before kickoff

    for (let i = 0; i < 4; i++) {
      const secDef = sampleSections[(listingIdx + i) % sampleSections.length];
      const assignedSeller = sellers[(listingIdx + i) % sellers.length];
      const qty = (i % 3) + 1; // 1, 2, or 3 seats
      const seats = Array.from({ length: qty }, (_, sIdx) => `${secDef.row}${101 + sIdx}`);

      const listing = await prisma.listing.create({
        data: {
          sellerId: assignedSeller.id,
          eventId: event.date > new Date() ? event.id : createdEvents[0].id,
          platform: event.platform,
          status: ListingStatus.ACTIVE,
          section: secDef.section,
          row: secDef.row,
          seats,
          quantity: qty,
          originalPricePaise: secDef.basePrice * qty,
          resalePricePaise: secDef.resalePrice * qty,
          sellerAppPhone: assignedSeller.phone || '+919876543210',
          bookingRefHash: hashBooking(`BKG_${event.id}_${listingIdx}`),
          proofImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
          proofImageHash: `hash_sample_proof_${listingIdx}`,
          transferWindowOpensAt,
          expiresAt,
          deposit: {
            create: {
              sellerId: assignedSeller.id,
              amountPaise: Math.round(secDef.resalePrice * qty * 0.20),
              status: DepositStatus.HELD,
              razorpayPaymentId: `pay_dep_${listingIdx}`,
            },
          },
        },
      });

      createdListings.push(listing);
      listingIdx++;
    }
  }

  // 6. Create Demonstrable Orders in Every State
  console.log('Creating sample orders for each state machine phase...');
  const orderDemoEvent = createdEvents[0];
  const demoListingsData = [
    { status: OrderStatus.PAYMENT_PENDING, desc: 'Payment awaiting checkout' },
    { status: OrderStatus.ESCROW_LOCKED, desc: 'Payment held in escrow, awaiting seller initiation' },
    { status: OrderStatus.TRANSFER_INITIATED, desc: 'Seller sent transfer in BMS/District' },
    { status: OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, desc: 'Buyer notified, acceptance countdown active' },
    { status: OrderStatus.TRANSFER_VERIFIED, desc: 'Transfer confirmed, dispute hold buffer active' },
    { status: OrderStatus.PAYOUT_RELEASED, desc: 'Ownership complete, seller received payout' },
    { status: OrderStatus.DISPUTED, desc: 'Dispute opened by buyer for review' },
    { status: OrderStatus.REFUNDED, desc: 'Order refunded to buyer' },
  ];

  for (let oIdx = 0; oIdx < demoListingsData.length; oIdx++) {
    const demo = demoListingsData[oIdx];
    const ticketPrice = 350000;
    const buyerFee = Math.round(ticketPrice * 0.05);
    const sellerFee = Math.round(ticketPrice * 0.05);
    const totalPaise = ticketPrice + buyerFee;
    const payoutPaise = ticketPrice - sellerFee;

    const demoListing = await prisma.listing.create({
      data: {
        sellerId: sellerVerified.id,
        eventId: orderDemoEvent.id,
        platform: orderDemoEvent.platform,
        status: demo.status === OrderStatus.PAYMENT_PENDING ? ListingStatus.RESERVED : ListingStatus.SOLD,
        section: 'AirAsia East Stand First Floor Bay 1',
        row: 'F',
        seats: [`F${200 + oIdx}`, `F${201 + oIdx}`],
        quantity: 2,
        originalPricePaise: 500000,
        resalePricePaise: ticketPrice,
        sellerAppPhone: sellerVerified.phone!,
        bookingRefHash: hashBooking(`DEMO_BKG_${oIdx}`),
        proofImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
        transferWindowOpensAt: new Date(now - 2 * 60 * 60 * 1000), // Opened 2 hours ago
        expiresAt: new Date(now + 48 * 60 * 60 * 1000),
        reservedByUserId: demo.status === OrderStatus.PAYMENT_PENDING ? buyerOne.id : null,
        reservedUntil: demo.status === OrderStatus.PAYMENT_PENDING ? new Date(now + 5 * 60 * 1000) : null,
      },
    });

    const order = await prisma.order.create({
      data: {
        id: `ord_demo_${demo.status.toLowerCase()}`,
        buyerId: buyerOne.id,
        sellerId: sellerVerified.id,
        listingId: demoListing.id,
        status: demo.status,
        ticketPricePaise: ticketPrice,
        buyerFeePaise: buyerFee,
        sellerFeePaise: sellerFee,
        totalPaise,
        payoutPaise,
        buyerAppPhone: buyerOne.phone!,
        razorpayOrderId: `order_rzp_${demo.status}_${oIdx}`,
        razorpayPaymentId: demo.status !== OrderStatus.PAYMENT_PENDING ? `pay_rzp_${demo.status}_${oIdx}` : null,
        idempotencyKey: `idem_${demo.status}_${oIdx}`,
        escrowLockedAt: demo.status !== OrderStatus.PAYMENT_PENDING ? new Date(now - 3600000) : null,
        transferInitiatedAt: [
          OrderStatus.TRANSFER_INITIATED,
          OrderStatus.TRANSFER_AWAITING_ACCEPTANCE,
          OrderStatus.TRANSFER_VERIFIED,
          OrderStatus.PAYOUT_RELEASED,
        ].includes(demo.status as any)
          ? new Date(now - 2400000)
          : null,
        acceptanceDeadline: [
          OrderStatus.TRANSFER_AWAITING_ACCEPTANCE,
          OrderStatus.TRANSFER_VERIFIED,
          OrderStatus.PAYOUT_RELEASED,
        ].includes(demo.status as any)
          ? new Date(now + 1800000)
          : null,
        transferVerifiedAt: [OrderStatus.TRANSFER_VERIFIED, OrderStatus.PAYOUT_RELEASED].includes(demo.status as any)
          ? new Date(now - 600000)
          : null,
        payoutReleasedAt: demo.status === OrderStatus.PAYOUT_RELEASED ? new Date(now - 120000) : null,
        refundedAt: demo.status === OrderStatus.REFUNDED ? new Date(now - 180000) : null,
        refundReason: demo.status === OrderStatus.REFUNDED ? 'Seller transfer SLA expired' : null,
        transferSession: {
          create: {
            platform: orderDemoEvent.platform,
            status:
              demo.status === OrderStatus.TRANSFER_VERIFIED || demo.status === OrderStatus.PAYOUT_RELEASED
                ? TransferStatus.VERIFIED
                : demo.status === OrderStatus.DISPUTED
                ? TransferStatus.DISPUTED
                : demo.status === OrderStatus.REFUNDED
                ? TransferStatus.FAILED
                : TransferStatus.IN_PROGRESS,
            sellerSlaDeadline: new Date(now + 3600000),
            buyerSlaDeadline: new Date(now + 1800000),
            confidenceScore: [OrderStatus.TRANSFER_VERIFIED, OrderStatus.PAYOUT_RELEASED].includes(demo.status as any) ? 90.0 : 45.0,
            confidenceBreakdown: {
              signals: [
                { key: 'A_BUYER_CONFIRMATION', passed: true, scoreAwarded: 35 },
                { key: 'B_BUYER_OCR_CHECK', passed: true, scoreAwarded: 25 },
                { key: 'C_SELLER_INITIATED_OCR', passed: true, scoreAwarded: 10 },
                { key: 'D_TIMING_CONSISTENCY', passed: true, scoreAwarded: 10 },
                { key: 'E_SELLER_REPUTATION', passed: true, scoreAwarded: 10 },
              ],
              totalScore: 90.0,
              meetsAutoReleaseThreshold: true,
              buyerConfirmed: true,
            },
            buyerConfirmedAt: [OrderStatus.TRANSFER_VERIFIED, OrderStatus.PAYOUT_RELEASED].includes(demo.status as any)
              ? new Date(now - 600000)
              : null,
            sellerInitiatedAt: new Date(now - 2400000),
          },
        },
        escrowTransaction:
          demo.status !== OrderStatus.PAYMENT_PENDING
            ? {
                create: {
                  status:
                    demo.status === OrderStatus.PAYOUT_RELEASED
                      ? EscrowStatus.RELEASED
                      : demo.status === OrderStatus.REFUNDED
                      ? EscrowStatus.REFUNDED
                      : EscrowStatus.HOLDING,
                  amountPaise: totalPaise,
                  razorpayPaymentId: `pay_rzp_${demo.status}_${oIdx}`,
                  releasedAt: demo.status === OrderStatus.PAYOUT_RELEASED ? new Date() : null,
                  refundedAt: demo.status === OrderStatus.REFUNDED ? new Date() : null,
                },
              }
            : undefined,
      },
    });

    if (demo.status === OrderStatus.PAYOUT_RELEASED) {
      await prisma.payout.create({
        data: {
          orderId: order.id,
          sellerId: sellerVerified.id,
          amountPaise: payoutPaise,
          status: PayoutStatus.SUCCESS,
          razorpayPayoutId: `pout_mock_${oIdx}`,
          processedAt: new Date(),
        },
      });

      // Seed GST Tax Invoices
      const invoiceNum = `TP/2026-27/0000${oIdx + 1}`;
      const taxablePaise = buyerFee;
      const cgst = Math.round(taxablePaise * 0.09);
      const sgst = Math.round(taxablePaise * 0.09);
      await prisma.invoice.create({
        data: {
          invoiceNumber: invoiceNum,
          orderId: order.id,
          userId: buyerOne.id,
          recipientType: 'BUYER',
          recipientName: buyerOne.name,
          recipientState: 'MH',
          taxableAmountPaise: taxablePaise,
          cgstPaise: cgst,
          sgstPaise: sgst,
          totalAmountPaise: taxablePaise + cgst + sgst,
          lines: {
            create: [
              {
                description: 'TicketPass Platform Escrow & Verification Service Fee',
                ratePaise: taxablePaise,
                amountPaise: taxablePaise,
              },
            ],
          },
        },
      });

      // Seed Buyer Review
      await prisma.review.create({
        data: {
          orderId: order.id,
          reviewerId: buyerOne.id,
          targetUserId: sellerVerified.id,
          rating: 5,
          speedRating: 5,
          accuracyRating: 5,
          comment: 'Instant transfer via BookMyShow within 15 minutes. Perfectly verified seat!',
          canEditUntil: new Date(now + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    if (demo.status === OrderStatus.DISPUTED) {
      await prisma.dispute.create({
        data: {
          orderId: order.id,
          raisedById: buyerOne.id,
          status: DisputeStatus.OPEN,
          reason: 'Seller initiated request was cancelled in BookMyShow',
          description: 'The seller tapped Transfer in BookMyShow but subsequently pressed Cancel Request before acceptance.',
          evidence: [{ type: 'BUYER_STATEMENT', note: 'Checked BookMyShow booking history; ticket shows request cancelled by sender.' }],
        },
      });
    }
  }

  // ==========================================
  // SECTION 23 SEEDS: POLICIES, FEES, HELP & CONFIG
  // ==========================================
  console.log('Seeding Section 23 Config, Policies, Help Center, and Flags...');

  // 1. FeeConfig
  await prisma.feeConfig.deleteMany();
  await prisma.feeConfig.create({
    data: {
      buyerFeePercent: 5.0,
      sellerFeePercent: 5.0,
      sellerDepositPercent: 20.0,
      minFeePaise: 5000,
      maxMarkupPercent: 100.0,
      isActive: true,
    },
  });

  // 2. Reserve Fund
  await prisma.reserveLedger.deleteMany();
  await prisma.reserveFund.deleteMany();
  const reserve = await prisma.reserveFund.create({
    data: {
      balancePaise: BigInt(50000000), // ₹5,00,000 baseline reserve
      targetBalancePaise: BigInt(100000000),
      totalClaimsPaidPaise: BigInt(0),
    },
  });

  await prisma.reserveLedger.create({
    data: {
      reserveFundId: reserve.id,
      type: 'CREDIT_PLATFORM_PROFIT',
      amountPaise: 50000000,
      runningBalancePaise: BigInt(50000000),
      description: 'Initial TicketPass Buyer Guarantee platform reserve capital',
    },
  });

  // 3. Policy Documents
  await prisma.policyDocument.deleteMany();
  const policies = [
    {
      type: 'TERMS',
      version: '1.0.0',
      title: 'Terms of Service',
      contentMarkdown: `# Terms of Service (DRAFT)

*Important: This is a draft policy subject to final review by legal counsel prior to commercial launch.*

## 1. The TicketPass Escrow Protocol
TicketPass is a technology protocol providing escrow custody, identity verification, and ownership transfer coordination for secondary live event ticket transfers in India. 

**TicketPass does not host, generate, print, or issue tickets.** All actual ticket ownership reassignments occur natively and exclusively within the official BookMyShow or District mobile applications.

## 2. Escrow & Non-Custody
When you purchase tickets on TicketPass, 100% of your funds are held in secure bank escrow. The funds are disbursed to the seller only upon mathematical verification of valid in-app transfer receipt or refunded in full under our Buyer Guarantee.

## 3. Platform Fees
Platform service fees are 5% for buyers and 5% for sellers, subject to applicable Indian Goods & Services Tax (GST SAC 998599).
`,
    },
    {
      type: 'PRIVACY',
      version: '1.0.0',
      title: 'Privacy Policy & DPDP Act 2023 Compliance',
      contentMarkdown: `# Privacy Policy & DPDP Act 2023 Compliance (DRAFT)

## 1. Zero Aadhaar / Biometric Storage Guarantee
TicketPass complies strictly with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Aadhaar Act, 2016.

**We never store full 12-digit Aadhaar numbers, biometric data, or original identity document files.**
- Identity verification is conducted via user consent through DigiLocker OAuth 2.0 PKCE.
- Only a salted irreversible SHA-256 identity fingerprint and masked last-4 digits are retained to prevent multi-accounting and fraud.

## 2. Data Retention & Erasure
Users may request immediate data anonymization and account deletion via their account privacy settings, subject only to statutory accounting and fraud prevention retention requirements.
`,
    },
    {
      type: 'BUYER_GUARANTEE',
      version: '1.0.0',
      title: 'TicketPass 100% Buyer Guarantee',
      contentMarkdown: `# TicketPass 100% Buyer Guarantee

Every ticket purchase on TicketPass is protected by our legally binding Buyer Guarantee, backed by seller security deposits and our segregated Platform Reserve Fund.

## You are guaranteed a 100% full refund if:
1. **Seller SLA Breach:** The seller fails to initiate ticket transfer in BookMyShow or District within the specified deadline.
2. **Cancelled Transfer:** The seller recalls or cancels the pending transfer request in BookMyShow.
3. **Invalid or Revoked Ticket:** The transferred ticket is duplicate, invalid, or revoked by the event organizer.
4. **Turnstile Denial of Entry:** You are denied stadium/arena entry due to ticket invalidity through no fault of your own (reportable via the Day-of-Event "Entry Problem" button within 3 hours of event start).
`,
    },
    {
      type: 'REFUND',
      version: '1.0.0',
      title: 'Refund & Cancellation Policy',
      contentMarkdown: `# Refund & Cancellation Policy

## Buyer Refunds
- Orders cancelled due to seller SLA breaches or failed verification are refunded automatically within 2 business hours back to the original source payment method.
- Event cancellations: If an event is officially cancelled by the organizer, all open orders are refunded in full, and seller deposits are restored without penalty.
- Rescheduled events: Buyers receive a 48-hour window from the announcement to request a 100% refund.
`,
    },
    {
      type: 'SELLER_AGREEMENT',
      version: '1.0.0',
      title: 'Seller Resale Agreement',
      contentMarkdown: `# Seller Resale Agreement

## 1. 20% Refundable Security Deposit
To list tickets on TicketPass, sellers place a 20% refundable security deposit via Razorpay. The deposit is refunded automatically in full upon verified buyer acceptance.

## 2. In-App Transfer Commitment
Sellers agree to transfer the exact seats described natively via BookMyShow or District within 60 minutes of purchase. No-shows or fraudulent claims result in permanent forfeiture of the security deposit and blacklisting.
`,
    },
    {
      type: 'GRIEVANCE',
      version: '1.0.0',
      title: 'Grievance Redressal Mechanism',
      contentMarkdown: `# Grievance Redressal & Legal Officer Contact

In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020:

- **Grievance Officer:** Legal & Compliance Desk, TicketPass India
- **Designation:** Head of Regulatory Compliance
- **Address:** Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051
- **Email:** grievance@ticketpass.dev
- **Acknowledgement Timeline:** Within 48 hours of receipt
- **Resolution Timeline:** Within 15 business days
`,
    },
  ];

  for (const pol of policies) {
    await prisma.policyDocument.create({ data: pol });
  }

  // 4. Help Articles
  await prisma.helpArticle.deleteMany();
  const articles = [
    {
      slug: 'how-bookmyshow-transfer-works',
      category: 'BMS_TRANSFERS',
      title: 'How BookMyShow Ticket Transfers Work',
      summary: 'Step-by-step instructions for sending and receiving tickets on BookMyShow.',
      contentMarkdown: `### BookMyShow Transfer Mechanics

1. **Add to Phone Contacts:** In BookMyShow, ticket transfers require the seller to pick the recipient from their device address book. Save the buyer's 10-digit mobile number first.
2. **Initiate Transfer:** Open BookMyShow > Your Orders > Tap "Transfer Tickets". Select the buyer's contact.
3. **Buyer Acceptance:** The buyer receives an SMS and notification. Once they tap "Accept", ownership is transferred irrevocably to the buyer's BookMyShow account.
4. **Escrow Release:** Once verified, escrow funds are instantly released to the seller.
`,
      orderIndex: 1,
    },
    {
      slug: 'how-district-transfer-works',
      category: 'DISTRICT_TRANSFERS',
      title: 'How District by Zomato Ticket Transfers Work',
      summary: 'Complete guide to receiving and verifying tickets on District.',
      contentMarkdown: `### District by Zomato Transfer Mechanics

1. **Direct Mobile Transfer:** Sellers enter the buyer's 10-digit mobile number directly inside District.
2. **My Bookings Inbox:** The buyer opens District > My Bookings > Transferred Tickets and taps "Accept".
3. **Anti-Scam Notice:** Once accepted, only the buyer can transfer back. Never reverse-transfer tickets, even if someone claims it was sent in error.
`,
      orderIndex: 2,
    },
    {
      slug: 'buyer-escrow-guarantee-overview',
      category: 'SAFETY',
      title: 'Understanding the 100% Escrow Guarantee',
      summary: 'How TicketPass protects your money until tickets are verified.',
      contentMarkdown: `### 100% Escrow Guarantee
Your money never goes directly to the seller upon checkout. It is held in bank-grade escrow until you confirm ticket receipt or our autonomous confidence engine verifies delivery. If anything goes wrong, you receive a full 100% refund.
`,
      orderIndex: 3,
    },
  ];

  for (const art of articles) {
    await prisma.helpArticle.create({ data: art });
  }

  // 5. Feature Flags
  await prisma.featureFlag.deleteMany();
  const flags = [
    { key: 'HOT_EVENT_WAITING_ROOM', description: 'Fair queue waiting room for high-demand drops', isEnabled: true, percentageRollout: 100 },
    { key: 'WHATSAPP_NOTIFICATIONS', description: 'WhatsApp Business API alerts for critical transfer milestones', isEnabled: true, percentageRollout: 100 },
    { key: 'PAN_COLLECTION_THRESHOLD', description: 'Require PAN for sellers exceeding ₹5,00,000 annual payouts', isEnabled: true, percentageRollout: 100 },
  ];
  for (const flag of flags) {
    await prisma.featureFlag.create({ data: flag });
  }

  // 6. Venue Map for Coldplay Ahmedabad
  const coldplayEvent = createdEvents.find((e) => (e.name || '').includes('Coldplay')) || createdEvents[0];
  if (coldplayEvent) {
    await prisma.venueSection.deleteMany();
    await prisma.venueMap.deleteMany();
    const map = await prisma.venueMap.create({
      data: {
        eventId: coldplayEvent.id,
        svgViewBox: '0 0 1000 700',
        mapConfigJson: { venueName: 'Narendra Modi Stadium', totalCapacity: 132000 },
      },
    });

    const sections = [
      { name: 'VIP LOUNGE', tierLevel: 5, svgPathData: 'M 400 150 L 600 150 L 620 230 L 380 230 Z', minPricePaise: 3500000, capacity: 500, availableListingsCount: 4 },
      { name: 'LEVEL 1 EAST', tierLevel: 4, svgPathData: 'M 640 240 L 780 260 L 760 440 L 630 420 Z', minPricePaise: 1250000, capacity: 12000, availableListingsCount: 18 },
      { name: 'LEVEL 1 WEST', tierLevel: 4, svgPathData: 'M 360 240 L 220 260 L 240 440 L 370 420 Z', minPricePaise: 1250000, capacity: 12000, availableListingsCount: 14 },
      { name: 'SOUTH STAND GROUND', tierLevel: 3, svgPathData: 'M 380 440 L 620 440 L 600 560 L 400 560 Z', minPricePaise: 650000, capacity: 25000, availableListingsCount: 32 },
      { name: 'UPPER TIER NORTH', tierLevel: 2, svgPathData: 'M 350 80 L 650 80 L 680 140 L 320 140 Z', minPricePaise: 450000, capacity: 35000, availableListingsCount: 22 },
      { name: 'UPPER TIER SOUTH', tierLevel: 1, svgPathData: 'M 350 580 L 650 580 L 680 650 L 320 650 Z', minPricePaise: 250000, capacity: 40000, availableListingsCount: 45 },
    ];

    for (const sec of sections) {
      await prisma.venueSection.create({
        data: {
          venueMapId: map.id,
          ...sec,
        },
      });
    }
  }

  // 7. Seed Support Tickets
  await prisma.supportMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.supportTicket.create({
    data: {
      ticketNumber: 'TK-10024',
      userId: buyerOne.id,
      category: 'DAY_OF_EVENT_ENTRY',
      subject: 'Turnstile scanner assistance for Gate 4 entry',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      messages: {
        create: [
          {
            senderId: buyerOne.id,
            senderType: 'USER',
            content: 'At Gate 4 of Narendra Modi Stadium. Security requested physical identity cross-verification with BookMyShow app name.',
          },
          {
            senderId: adminUser.id,
            senderType: 'ADMIN',
            content: 'Identity verified. Your verified DigiLocker name matches your BookMyShow transfer record. Please present the in-app transferred ticket QR.',
          },
        ],
      },
    },
  });

  console.log(`Database seed completed successfully!`);
  console.log(`- 1 Super Admin: ${adminUser.email}`);
  console.log(`- 3 Sellers: ${sellerNew.email}, ${sellerTrusted.email}, ${sellerVerified.email}`);
  console.log(`- 3 Buyers: ${buyerOne.email}, ${buyerTwo.email}, ${buyerThree.email}`);
  console.log(`- ${createdEvents.length} Events`);
  console.log(`- ${createdListings.length} Active Listings`);
  console.log(`- 8 Demonstrable Orders (one in every state of the state machine)`);
}

main()
  .catch((e) => {
    console.error('Seed execution failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
