// apps/frontend/src/app/sell/page.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Platform, calculateOrderFees, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../lib/api-client';
import { openRazorpayCheckout } from '../../lib/razorpay';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Chip } from '../../components/ui/chip';
import { Dropzone } from '../../components/ui/dropzone';
import {
  ShieldIcon,
  VerifiedSealGlyph,
  CheckIcon,
  ChevronLeftIcon,
  ArrowUpRightIcon,
  LockIcon,
} from '../../components/icons/index';

export default function NikeStyleSellPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const isKycVerified = user?.kycStatus === 'VERIFIED';

  // Steps: 0: KYC Check -> 1: Platform & Event -> 2: Seats -> 3: Pricing & Earnings -> 4: Bank & Activation
  const [currentStep, setCurrentStep] = React.useState<number>(isKycVerified ? 1 : 0);
  const [events, setEvents] = React.useState<any[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(true);

  // Form Fields
  const [platform, setPlatform] = React.useState<Platform>(Platform.BOOKMYSHOW);
  const [selectedEventId, setSelectedEventId] = React.useState<string>('');
  const [section, setSection] = React.useState('');
  const [row, setRow] = React.useState('');
  const [seats, setSeats] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [originalPriceRupees, setOriginalPriceRupees] = React.useState('2500');
  const [resalePriceRupees, setResalePriceRupees] = React.useState('2500');
  const [sellerAppPhone, setSellerAppPhone] = React.useState(user?.phone || '');
  const [bookingRef, setBookingRef] = React.useState('');
  const [proofUploadId, setProofUploadId] = React.useState<string | null>(null);

  // Bank verification fields
  const [bankAccount, setBankAccount] = React.useState('');
  const [bankIfsc, setBankIfsc] = React.useState('');
  const [bankHolder, setBankHolder] = React.useState(user?.name || '');
  const [isBankVerified, setIsBankVerified] = React.useState(false);
  const [isVerifyingBank, setIsVerifyingBank] = React.useState(false);
  const [isActivating, setIsActivating] = React.useState(false);

  // Fetch events
  React.useEffect(() => {
    apiClient
      .get('/events')
      .then((res) => {
        setEvents(res.data.items || []);
        if (res.data.items?.length > 0) {
          setSelectedEventId(res.data.items[0].id);
        }
      })
      .finally(() => setIsLoadingEvents(false));
  }, []);

  const resalePaise = Math.round((Number(resalePriceRupees) || 0) * 100);
  const originalPaise = Math.round((Number(originalPriceRupees) || 0) * 100);
  const fees = calculateOrderFees(resalePaise);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const handleVerifyBank = async () => {
    if (!bankAccount || !bankIfsc || !bankHolder) {
      alert('Please fill in bank account number, IFSC code, and account holder name.');
      return;
    }

    setIsVerifyingBank(true);
    try {
      const res = await apiClient.post('/kyc/bank-account/verify', {
        accountNumber: bankAccount,
        ifsc: bankIfsc,
        accountHolder: bankHolder,
      });

      if (res.data.nameMatchVerified) {
        setIsBankVerified(true);
      } else {
        alert(`Bank account holder name mismatch. Score: ${res.data.nameMatchScore}. Must match your verified KYC name.`);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Bank verification failed.');
    } finally {
      setIsVerifyingBank(false);
    }
  };

  const handleCreateAndActivate = async () => {
    if (!bookingRef) {
      alert('Please provide the original booking reference.');
      return;
    }

    setIsActivating(true);
    try {
      // 1. Create draft listing
      const createRes = await apiClient.post('/listings', {
        eventId: selectedEventId,
        platform,
        section,
        row,
        seats: seats.split(',').map((s) => s.trim()).filter(Boolean),
        quantity: Number(quantity),
        originalPricePaise: originalPaise,
        resalePricePaise: resalePaise,
        sellerAppPhone,
        bookingRef,
        proofImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
      });

      const { listing, depositOrder } = createRes.data;

      // 2. Pay 20% security deposit
      await openRazorpayCheckout(
        {
          key: depositOrder.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
          order_id: depositOrder.id,
          amount: depositOrder.amount,
          currency: 'INR',
          name: 'TicketPass Security Deposit',
          description: '20% refundable seller security deposit',
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: sellerAppPhone,
          },
        },
        {
          onSuccess: async (rzpRes) => {
            // 3. Activate listing
            await apiClient.post(`/listings/${listing.id}/activate`, {
              razorpayPaymentId: rzpRes.razorpay_payment_id,
              razorpayOrderId: rzpRes.razorpay_order_id,
              razorpaySignature: rzpRes.razorpay_signature,
            });

            router.push('/dashboard/seller');
          },
          onDismiss: () => {
            setIsActivating(false);
          },
        },
      );
    } catch (err: any) {
      setIsActivating(false);
      alert(err?.response?.data?.message || 'Listing creation failed.');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text py-12 px-6 md:px-12 max-w-3xl mx-auto flex flex-col gap-10 select-none">
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
            SELLER PROTOCOL · STEP 0{currentStep}
          </span>
          <h1 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight text-white">
            {currentStep === 0 && 'VERIFY IDENTITY'}
            {currentStep === 1 && 'SELECT DROP & PLATFORM'}
            {currentStep === 2 && 'SEAT SPECIFICATIONS'}
            {currentStep === 3 && 'PRICING & EARNINGS'}
            {currentStep === 4 && 'BANK ACCOUNT & SECURITY BOND'}
          </h1>
        </div>

        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-text-3 hover:text-white"
          >
            <ChevronLeftIcon size={16} />
            <span>BACK</span>
          </button>
        )}
      </div>

      {/* STEP 0: KYC CHECK */}
      {currentStep === 0 && (
        <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
          <div className="flex items-center gap-2 text-volt text-[12px] font-mono uppercase tracking-widest">
            <ShieldIcon size={16} />
            <span>GOVERNMENT IDENTITY REQUIRED</span>
          </div>

          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            Sellers Must Verify via DigiLocker
          </h2>

          <p className="text-text-2 text-[14px] leading-relaxed">
            To prevent fraud syndicates and guarantee buyers receive legitimate in-app tickets, all sellers must complete annual DigiLocker verification before activating a listing or receiving payouts.
          </p>

          <Link href="/verify-identity">
            <Button size="lg" variant="primary" className="w-full flex items-center justify-center gap-2 font-bold">
              <span>COMPLETE DIGILOCKER KYC</span>
              <ArrowUpRightIcon size={18} />
            </Button>
          </Link>
        </div>
      )}

      {/* STEP 1: PLATFORM & EVENT */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-8">
          {/* Large Tappable Platform Tiles (Monochrome wordmark chips per Section 22) */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-text-2">
              SELECT PRIMARY TICKETING PLATFORM
            </span>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPlatform(Platform.BOOKMYSHOW)}
                className={`h-24 p-5 rounded-[12px] border text-left flex flex-col justify-between transition-all ${
                  platform === Platform.BOOKMYSHOW
                    ? 'border-white bg-surface-2 text-white'
                    : 'border-line bg-surface text-text-3 hover:border-line-strong'
                }`}
              >
                <span className="text-xl font-black font-display uppercase tracking-tight">BOOKMYSHOW</span>
                <span className="text-[11px] font-mono">48HR TRANSFER WINDOW</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform(Platform.DISTRICT)}
                className={`h-24 p-5 rounded-[12px] border text-left flex flex-col justify-between transition-all ${
                  platform === Platform.DISTRICT
                    ? 'border-white bg-surface-2 text-white'
                    : 'border-line bg-surface text-text-3 hover:border-line-strong'
                }`}
              >
                <span className="text-xl font-black font-display uppercase tracking-tight">DISTRICT</span>
                <span className="text-[11px] font-mono">6HR TRANSFER WINDOW</span>
              </button>
            </div>
          </div>

          {/* Event Picker */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-text-2">
              SELECT SOLD-OUT EVENT
            </span>

            <div className="flex flex-col divide-y divide-line border border-line rounded-[12px] bg-surface overflow-hidden">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    selectedEventId === evt.id ? 'bg-surface-2' : 'hover:bg-surface-2/40'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-[15px]">{evt.name}</span>
                    <span className="text-[12px] text-text-3">{evt.venue}, {evt.city}</span>
                  </div>

                  {selectedEventId === evt.id && (
                    <span className="w-5 h-5 rounded-full bg-volt text-black flex items-center justify-center font-bold text-[11px]">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => setCurrentStep(2)}
            disabled={!selectedEventId}
            className="w-full font-bold"
          >
            CONTINUE TO SEAT DETAILS
          </Button>
        </div>
      )}

      {/* STEP 2: SEATS & SECTION */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-6">
          <Input
            label="STAND / SECTION NAME"
            placeholder="e.g. East Stand Level 2, VIP Box 4"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ROW"
              placeholder="e.g. F"
              value={row}
              onChange={(e) => setRow(e.target.value)}
            />
            <Input
              label="SEAT NUMBERS (COMMA SEPARATED)"
              placeholder="e.g. 14, 15"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>

          <Input
            label="QUANTITY OF SEATS"
            type="number"
            min={1}
            max={6}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <Input
            label="YOUR PRIMARY APP PHONE NUMBER"
            placeholder="Mobile linked to BookMyShow/District"
            value={sellerAppPhone}
            onChange={(e) => setSellerAppPhone(e.target.value)}
            hint="You must be logged into this account to initiate the in-app transfer when sold."
          />

          <Button
            size="lg"
            variant="primary"
            onClick={() => setCurrentStep(3)}
            disabled={!section || !row}
            className="w-full font-bold"
          >
            CONTINUE TO PRICING
          </Button>
        </div>
      )}

      {/* STEP 3: PRICING & EARNINGS PREVIEW */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ORIGINAL FACE VALUE (₹)"
              type="number"
              value={originalPriceRupees}
              onChange={(e) => setOriginalPriceRupees(e.target.value)}
            />
            <Input
              label="RESALE ASKING PRICE (₹)"
              type="number"
              value={resalePriceRupees}
              onChange={(e) => setResalePriceRupees(e.target.value)}
            />
          </div>

          {/* Live Earnings Preview in Huge Numerals (Section 22 signature) */}
          <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-3">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              NET SELLER PAYOUT
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black font-display tabular-nums text-white">
                YOU GET {formatPaiseToInr(fees.sellerReceivesPaise)}
              </span>
            </div>

            <p className="text-[13px] text-text-2 mt-1">
              After 5% platform transfer fee ({formatPaiseToInr(fees.sellerFeePaise)}). Deposited straight into your bank account via instant UPI.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => setCurrentStep(4)}
            className="w-full font-bold"
          >
            CONTINUE TO BANK &amp; ACTIVATION
          </Button>
        </div>
      )}

      {/* STEP 4: BANK ACCOUNT & ACTIVATION */}
      {currentStep === 4 && (
        <div className="flex flex-col gap-8">
          {/* Bank Account Verification (Section 21) */}
          <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              PAYOUT BANK ACCOUNT VERIFICATION
            </span>

            <h3 className="text-xl font-black font-display uppercase tracking-tight text-white">
              Penny-Drop Bank Account Match
            </h3>

            <p className="text-text-2 text-[14px]">
              The bank account holder name must match your verified DigiLocker name (<strong className="text-white">{user?.name}</strong>).
            </p>

            <Input
              label="ACCOUNT NUMBER"
              placeholder="Enter bank account number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="IFSC CODE"
                placeholder="e.g. HDFC0001234"
                value={bankIfsc}
                onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
              />
              <Input
                label="REGISTERED ACCOUNT HOLDER NAME"
                placeholder="Name on bank passbook"
                value={bankHolder}
                onChange={(e) => setBankHolder(e.target.value)}
              />
            </div>

            <Button
              size="md"
              variant={isBankVerified ? 'volt' : 'secondary'}
              onClick={handleVerifyBank}
              isLoading={isVerifyingBank}
              disabled={isBankVerified}
            >
              {isBankVerified ? '✓ BANK ACCOUNT MATCH VERIFIED' : 'VERIFY BANK ACCOUNT'}
            </Button>
          </div>

          {/* Booking Reference Hash */}
          <Input
            label="PRIMARY BOOKING REFERENCE ID"
            placeholder="e.g. BMS12345678"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            hint="Hashed cryptographically to prevent duplicate cross-platform listings."
          />

          {/* 20% Refundable Security Deposit Box */}
          <div className="p-6 rounded-[16px] bg-surface-2 border border-line flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-tight text-white">
                20% Refundable Security Bond
              </span>
              <span className="text-xl font-black font-display tabular-nums text-volt">
                {formatPaiseToInr(fees.securityDepositPaise)}
              </span>
            </div>
            <p className="text-[13px] text-text-3">
              Held as an anti-flake bond. 100% refunded immediately once the buyer accepts the transferred ticket in their app.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleCreateAndActivate}
            isLoading={isActivating}
            disabled={!bookingRef}
            className="w-full font-bold"
          >
            PAY BOND &amp; ACTIVATE LISTING · {formatPaiseToInr(fees.securityDepositPaise)}
          </Button>
        </div>
      )}
    </div>
  );
}
