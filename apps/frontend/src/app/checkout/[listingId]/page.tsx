// apps/frontend/src/app/checkout/[listingId]/page.tsx
'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { calculateOrderFees, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { openRazorpayCheckout } from '../../../lib/razorpay';
import { useAuthStore } from '../../../stores/auth.store';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Chip } from '../../../components/ui/chip';
import {
  ShieldIcon,
  VerifiedSealGlyph,
  ClockIcon,
  LockIcon,
  CheckIcon,
  ChevronLeftIcon,
  ArrowUpRightIcon,
} from '../../../components/icons/index';

export default function NikeStyleCheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params?.listingId as string;

  const { user } = useAuthStore();

  const [listing, setListing] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Steps: 1 Verify Identity -> 2 Details -> 3 Pay
  const isKycVerified = user?.kycStatus === 'VERIFIED';
  const [currentStep, setCurrentStep] = React.useState<number>(isKycVerified ? 2 : 1);

  // Form State
  const [appPhone, setAppPhone] = React.useState(user?.phone || '');
  const [isProcessing, setIsProcessing] = React.useState(false);

  // 5-minute reservation timer (300s)
  const [secondsRemaining, setSecondsRemaining] = React.useState(300);

  // Fetch listing & reserve
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    const init = async () => {
      try {
        const res = await apiClient.get(`/listings/${listingId}`);
        setListing(res.data);

        // Attempt reservation
        await apiClient.post(`/listings/${listingId}/reserve`);

        // Start countdown
        timer = setInterval(() => {
          setSecondsRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err: any) {
        setErrorMsg(
          err?.response?.data?.message || 'Listing is unavailable or currently reserved by another buyer.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (listingId) init();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [listingId]);

  const handlePay = async () => {
    if (!appPhone || appPhone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number for ticket transfer.');
      return;
    }

    setIsProcessing(true);
    try {
      const idempotencyKey = `tp_order_${listingId}_${Date.now()}`;
      const orderRes = await apiClient.post(
        '/orders',
        {
          listingId,
          buyerAppPhone: appPhone,
        },
        {
          headers: {
            'x-idempotency-key': idempotencyKey,
          },
        },
      );

      const { order, razorpayOrder } = orderRes.data;

      // Launch Razorpay Modal
      await openRazorpayCheckout(
        {
          key: razorpayOrder.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
          order_id: razorpayOrder.id,
          amount: order.totalPaise,
          currency: 'INR',
          name: 'TicketPass Escrow',
          description: `Escrow hold for ${listing.event?.name || 'ticket'}`,
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: appPhone,
          },
        },
        {
          onSuccess: async (rzpResponse) => {
            // Verify payment
            await apiClient.post('/payments/verify', {
              orderId: order.id,
              razorpayPaymentId: rzpResponse.razorpay_payment_id,
              razorpayOrderId: rzpResponse.razorpay_order_id,
              razorpaySignature: rzpResponse.razorpay_signature,
            });

            // Navigate to live transfer tracking room
            router.push(`/transfer/${order.id}`);
          },
          onDismiss: () => {
            setIsProcessing(false);
          },
        },
      );
    } catch (err: any) {
      setIsProcessing(false);
      alert(err?.response?.data?.message || 'Payment initiation failed. Please try again.');
    }
  };

  const fees = listing ? calculateOrderFees(listing.resalePricePaise) : null;
  const isUrgentTimer = secondsRemaining <= 60;
  const timerPercentage = Math.max(0, (secondsRemaining / 300) * 100);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg text-white flex items-center justify-center">
        <span className="text-[14px] font-mono text-volt animate-pulse">SECURING RESERVATION...</span>
      </div>
    );
  }

  if (errorMsg || secondsRemaining === 0) {
    return (
      <div className="min-h-screen bg-bg text-white p-8 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-2xl font-black font-display uppercase">Reservation Expired</span>
        <p className="text-text-2 text-[14px] max-w-md">
          {errorMsg || 'Your 5-minute reservation timer has elapsed. The ticket has been returned to the marketplace.'}
        </p>
        <Link href="/">
          <Button size="md" variant="primary">BROWSE AVAILABLE DROPS</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col select-none">
      {/* 5-minute Reservation Line Draining along Top Edge */}
      <div className="w-full h-1 bg-surface-2 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            isUrgentTimer ? 'bg-amber-400' : 'bg-volt'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Top Header */}
      <div className="w-full border-b border-line bg-surface/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <Link href={`/events/${listing?.eventId}`} className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-text-2 hover:text-white">
            <ChevronLeftIcon size={16} />
            <span>BACK TO EVENT</span>
          </Link>

          <div className="flex items-center gap-2">
            <ClockIcon size={16} className={isUrgentTimer ? 'text-amber-400' : 'text-volt'} />
            <span className={`text-[13px] font-mono font-bold tabular-nums ${isUrgentTimer ? 'text-amber-400 animate-pulse' : 'text-white'}`}>
              RESERVED: {formatTimer(secondsRemaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Flow Grid */}
      <div className="max-w-content mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 md:p-12">
        {/* Left Column: 3-Step Flow */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Step Indicators */}
          <div className="flex items-center gap-4 border-b border-line pb-4 text-[12px] font-bold uppercase tracking-wider">
            <span className={currentStep === 1 ? 'text-volt' : isKycVerified ? 'text-white' : 'text-text-3'}>
              01 VERIFY IDENTITY
            </span>
            <span className="text-line">/</span>
            <span className={currentStep === 2 ? 'text-volt' : 'text-text-3'}>
              02 DETAILS
            </span>
            <span className="text-line">/</span>
            <span className={currentStep === 3 ? 'text-volt' : 'text-text-3'}>
              03 SECURE PAY
            </span>
          </div>

          {/* STEP 1: VERIFY IDENTITY (If not verified) */}
          {!isKycVerified ? (
            <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
              <div className="flex items-center gap-2 text-volt text-[12px] font-mono uppercase tracking-widest">
                <ShieldIcon size={16} />
                <span>STEP 01: IDENTITY VERIFICATION</span>
              </div>

              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                Verify with DigiLocker to Purchase
              </h2>

              <p className="text-text-2 text-[14px] leading-relaxed">
                To guarantee ticket transfers reach legitimate attendees and stop syndicates, buyers must verify their identity. Your 5-minute reservation timer is paused while you verify.
              </p>

              <div className="p-4 rounded-[12px] bg-surface-2 border border-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <VerifiedSealGlyph size={18} className="text-volt" />
                  <span className="text-[14px] font-bold text-white">Government-Approved Verification</span>
                </div>
                <span className="text-[12px] text-text-3">1-Minute Setup</span>
              </div>

              <Link href="/verify-identity">
                <Button size="lg" variant="primary" className="w-full flex items-center justify-center gap-2 font-bold">
                  <span>VERIFY IDENTITY ON DIGILOCKER</span>
                  <ArrowUpRightIcon size={18} />
                </Button>
              </Link>
            </div>
          ) : (
            /* STEP 2: YOUR DETAILS */
            <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-volt text-[12px] font-mono uppercase tracking-widest">
                  <CheckIcon size={16} />
                  <span>IDENTITY VERIFIED</span>
                </div>
                <Chip variant="tag" className="bg-volt/10 text-volt border-volt/30 flex items-center gap-1">
                  <VerifiedSealGlyph size={12} className="text-volt" />
                  <span>{user?.name}</span>
                </Chip>
              </div>

              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                Transfer Delivery Phone Number
              </h2>

              <p className="text-text-2 text-[14px] leading-relaxed">
                The seller will transfer the ticket to this exact mobile number in their primary ticketing app ({listing?.platform}).
              </p>

              <Input
                label="TRANSFER MOBILE NUMBER"
                placeholder="10-digit mobile number"
                value={appPhone}
                onChange={(e) => setAppPhone(e.target.value)}
                hint={`Must match your ${listing?.platform} account phone number.`}
              />

              <div className="p-4 rounded-[12px] bg-surface-2 border border-line flex items-start gap-3">
                <LockIcon size={18} className="text-volt shrink-0 mt-0.5" />
                <span className="text-[13px] text-text-2">
                  Your ticket lands in your {listing?.platform} app. TicketPass only holds the payment until it is verified.
                </span>
              </div>

              <Button
                size="lg"
                variant="primary"
                onClick={handlePay}
                isLoading={isProcessing}
                className="w-full font-bold"
              >
                PAY &amp; LOCK IN ESCROW · {fees ? formatPaiseToInr(fees.totalBuyerPaysPaise) : ''}
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (Desktop Sticky) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
            <span className="text-[12px] font-mono uppercase tracking-widest text-text-3">
              ESCROW BREAKDOWN
            </span>

            <div>
              <h3 className="text-xl font-black font-display uppercase tracking-tight text-white">
                {listing?.event?.name}
              </h3>
              <span className="text-[13px] text-text-2 mt-1 block">
                {listing?.section} · Row {listing?.row} · {listing?.quantity} {listing?.quantity === 1 ? 'Seat' : 'Seats'}
              </span>
            </div>

            {fees && (
              <div className="flex flex-col divide-y divide-line border-y border-line text-[14px]">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-text-2">Ticket Price ({listing.quantity}x)</span>
                  <span className="font-mono tabular-nums text-white">{formatPaiseToInr(fees.resalePricePaise)}</span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-text-2">Buyer Escrow Protection Fee (5%)</span>
                  <span className="font-mono tabular-nums text-white">{formatPaiseToInr(fees.buyerFeePaise)}</span>
                </div>

                <div className="py-4 flex items-baseline justify-between">
                  <span className="text-base font-bold uppercase tracking-tight text-white">Total Amount</span>
                  <span className="text-3xl font-black font-display tabular-nums text-volt">
                    {formatPaiseToInr(fees.totalBuyerPaysPaise)}
                  </span>
                </div>
              </div>
            )}

            <div className="text-[12px] text-text-3 flex items-center gap-2">
              <ShieldIcon size={16} className="text-volt shrink-0" />
              <span>Full refund guaranteed if seller SLA is breached or ticket is invalid.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
