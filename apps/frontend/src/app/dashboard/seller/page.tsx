// apps/frontend/src/app/dashboard/seller/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrderStatus, Platform, SellerLevel, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { useAuthStore } from '../../../stores/auth.store';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { Input } from '../../../components/ui/input';
import { SegmentedControl } from '../../../components/ui/segmented-control';
import { TableSkeleton } from '../../../components/ui/skeleton';
import {
  IconTicket,
  IconShield,
  IconClock,
  IconCheck,
  IconArrowUpRight,
  IconReceipt,
  IconLock,
  IconTransfer,
  IconPlus,
  IconClose,
  IconVerifiedSeal,
} from '../../../components/icons';

export default function SellerDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [sellerOrders, setSellerOrders] = useState<any[]>([]);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'transfers' | 'listings' | 'completed'>('transfers');

  // Bank Account Dialog State
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [savingBank, setSavingBank] = useState(false);
  const [bankSuccess, setBankSuccess] = useState(false);
  const [bankError, setBankError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [ordersRes, listingsRes, meRes] = await Promise.all([
        apiClient.get('/orders/me/selling'),
        apiClient.get('/listings/me'),
        apiClient.get('/users/me'),
      ]);

      setSellerOrders(ordersRes.data || []);
      setMyListings(listingsRes.data || []);
      setProfile(meRes.data || null);

      if (meRes.data?.bankAccount) {
        setAccountHolderName(meRes.data.bankAccount.accountHolderName || '');
        setIfscCode(meRes.data.bankAccount.ifscCode || '');
        setUpiId(meRes.data.bankAccount.upiId || '');
      }
    } catch (err: any) {
      console.error('Failed to load seller dashboard data:', err);
      setError(err?.message || 'Failed to load seller information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveBankAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBank(true);
    setBankError(null);

    try {
      await apiClient.put('/users/me/bank-account', {
        accountHolderName: accountHolderName.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
        upiId: upiId.trim() || undefined,
      });

      setBankSuccess(true);
      setTimeout(() => {
        setIsBankModalOpen(false);
        setBankSuccess(false);
        fetchData();
      }, 1200);
    } catch (err: any) {
      console.error('Failed to save bank account:', err);
      setBankError(err?.response?.data?.message || err?.message || 'Failed to update bank details.');
    } finally {
      setSavingBank(false);
    }
  };

  const handleCancelListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to cancel this listing?')) return;
    try {
      await apiClient.delete(`/listings/${listingId}`);
      fetchData();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to cancel listing');
    }
  };

  const pendingTransfers = sellerOrders.filter(
    (o) =>
      o.status === OrderStatus.ESCROW_LOCKED ||
      o.status === OrderStatus.TRANSFER_INITIATED ||
      o.status === OrderStatus.TRANSFER_AWAITING_ACCEPTANCE,
  );

  const activeMarketListings = myListings.filter(
    (l) => l.status === 'ACTIVE' || l.status === 'RESERVED',
  );

  const completedSales = sellerOrders.filter(
    (o) =>
      o.status === OrderStatus.PAYOUT_RELEASED ||
      o.status === OrderStatus.TRANSFER_VERIFIED,
  );

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              SELLER COMMAND
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            SALES &amp; PAYOUTS
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Manage your drops, execute ticket transfers within the 60-min window, and receive automated escrow payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchData}
            disabled={loading}
          >
            REFRESH
          </Button>
          <Link href="/sell">
            <Button variant="primary" size="sm" className="flex items-center gap-1.5">
              <IconPlus size={14} />
              <span>LIST A TICKET</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Seller Meta & Payout Account Strip */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier status */}
        <div className="p-5 border border-line bg-surface space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-3">
            SELLER RATING &amp; TIER
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold uppercase tracking-tight font-display text-text">
              {profile?.sellerLevel || SellerLevel.NEW}
            </span>
            <span className="text-xs font-mono text-volt border border-volt/30 px-2 py-0.5 rounded-full">
              {profile?.kycStatus === 'VERIFIED' ? 'KYC VERIFIED' : 'UNVERIFIED'}
            </span>
          </div>
          <p className="text-xs text-text-3 font-mono">
            {profile?.totalSalesCompleted || 0} COMPLETED TRANSFERS · 100% ESCROW ACCURACY
          </p>
        </div>

        {/* Security deposit rule */}
        <div className="p-5 border border-line bg-surface space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-3">
            SECURITY DEPOSIT
          </div>
          <div className="text-xl font-bold uppercase tracking-tight font-display text-text">
            20% REFUNDABLE HOLD
          </div>
          <p className="text-xs text-text-3 font-mono">
            REFUNDED INSTANTLY UPON SUCCESSFUL BUYER VERIFICATION
          </p>
        </div>

        {/* Bank / Payout Coordinate */}
        <div className="p-5 border border-line bg-surface flex flex-col justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-3">
              PAYOUT DESTINATION
            </div>
            {profile?.bankAccount ? (
              <div className="mt-1">
                <p className="text-sm font-bold font-mono text-text">
                  {profile.bankAccount.maskedAccountNumber || '••••••••'}
                </p>
                <p className="text-[10px] font-mono text-text-3 mt-0.5">
                  IFSC: {profile.bankAccount.ifscCode} · {profile.bankAccount.accountHolderName}
                </p>
              </div>
            ) : (
              <p className="text-xs text-risk font-mono mt-1">
                NO BANK REGISTERED · ADD ACCOUNT FOR PAYOUTS
              </p>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsBankModalOpen(true)}
            className="w-full text-xs"
          >
            {profile?.bankAccount ? 'UPDATE BANK / UPI' : 'REGISTER PAYOUT ACCOUNT'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center justify-between border-b border-line pb-4">
        <SegmentedControl
          value={activeTab}
          onChange={(val) => setActiveTab(val as any)}
          options={[
            { value: 'transfers', label: `TRANSFERS DUE (${pendingTransfers.length})` },
            { value: 'listings', label: `ACTIVE LISTINGS (${activeMarketListings.length})` },
            { value: 'completed', label: `COMPLETED (${completedSales.length})` },
          ]}
        />
      </div>

      {/* Main Tab Content */}
      <div className="mt-8">
        {loading ? (
          <TableSkeleton rows={4} />
        ) : error ? (
          <div className="p-8 border border-line bg-surface text-center space-y-4 max-w-md mx-auto">
            <p className="text-sm text-risk font-mono">{error}</p>
            <Button variant="secondary" size="sm" onClick={fetchData}>
              RETRY
            </Button>
          </div>
        ) : activeTab === 'transfers' ? (
          pendingTransfers.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-line bg-surface space-y-4">
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mx-auto text-volt">
                <IconCheck size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                  ALL TRANSFERS CURRENT
                </h3>
                <p className="text-xs text-text-3 font-mono">
                  NO PENDING TICKET TRANSFERS AWAITING ACTION
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-line border-t border-b border-line">
              {pendingTransfers.map((order) => {
                const platformName =
                  order.listing?.platform === Platform.BOOKMYSHOW
                    ? 'BOOKMYSHOW'
                    : 'DISTRICT';
                return (
                  <div
                    key={order.id}
                    className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-volt font-medium">
                          <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                          ACTION REQUIRED: INITIATE IN APP
                        </span>
                        <span className="text-[10px] font-mono tracking-wider text-text-3 uppercase border border-line px-1.5 py-0.5">
                          {platformName}
                        </span>
                        <span className="text-[10px] font-mono text-text-3">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight font-display truncate">
                        {order.listing?.event?.title || 'EXCLUSIVE DROP'}
                      </h3>

                      <div className="flex items-center gap-4 text-xs font-mono text-text-2 flex-wrap">
                        <span>
                          {order.listing?.section} · {order.listing?.quantity || 1} SEAT{(order.listing?.quantity || 1) > 1 ? 'S' : ''}
                        </span>
                        <span>·</span>
                        <span className="text-text font-bold">
                          BUYER: +91 {order.buyerAppPhone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 border-line pt-3 md:pt-0">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">
                          YOUR PAYOUT
                        </p>
                        <p className="text-lg md:text-xl font-bold font-mono tabular-nums text-volt">
                          {formatPaiseToInr(order.payoutPaise || order.resalePricePaise * 0.95)}
                        </p>
                      </div>

                      <Link href={`/transfer/${order.id}`}>
                        <Button variant="primary" size="sm" className="flex items-center gap-1.5">
                          <span>OPEN TRANSFER</span>
                          <IconArrowUpRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : activeTab === 'listings' ? (
          activeMarketListings.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-line bg-surface space-y-4">
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mx-auto text-text-3">
                <IconTicket size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                  NO ACTIVE LISTINGS
                </h3>
                <p className="text-xs text-text-3 font-mono">
                  CANNOT ATTEND AN EVENT? LIST SEATS WITH GUARANTEED ESCROW PAYOUT
                </p>
              </div>
              <div className="pt-2">
                <Link href="/sell">
                  <Button variant="primary" size="sm">
                    LIST A TICKET
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-line border-t border-b border-line">
              {activeMarketListings.map((listing) => (
                <div
                  key={listing.id}
                  className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-mono uppercase text-volt">
                        {listing.status === 'RESERVED' ? 'IN CHECKOUT' : 'ACTIVE ON MARKET'}
                      </span>
                      <span className="text-[10px] font-mono text-text-3 border border-line px-1.5 py-0.5">
                        {listing.platform}
                      </span>
                    </div>

                    <h4 className="text-base md:text-lg font-bold uppercase tracking-tight font-display truncate">
                      {listing.event?.title || 'EXCLUSIVE DROP'}
                    </h4>

                    <p className="text-xs font-mono text-text-2">
                      {listing.section} · SEATS: {listing.seats?.join(', ') || 'GENERAL'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">
                        ASK PRICE
                      </p>
                      <p className="text-lg md:text-xl font-bold font-mono tabular-nums text-text">
                        {formatPaiseToInr(listing.resalePricePaise)}
                      </p>
                    </div>

                    {listing.status === 'ACTIVE' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCancelListing(listing.id)}
                        className="text-risk border-risk/40 hover:bg-risk/10"
                      >
                        CANCEL
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          completedSales.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-line bg-surface space-y-4">
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mx-auto text-text-3">
                <IconReceipt size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                  NO CONCLUDED SALES YET
                </h3>
                <p className="text-xs text-text-3 font-mono">
                  PAYOUTS DISPATCHED AUTOMATICALLY ONCE BUYER CONFIRMS RECEIPT
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-line border-t border-b border-line">
              {completedSales.map((order) => (
                <div
                  key={order.id}
                  className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase text-volt">
                        PAYOUT RELEASED
                      </span>
                      <span className="text-[10px] font-mono text-text-3">
                        #{order.id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-base md:text-lg font-bold uppercase tracking-tight font-display truncate">
                      {order.listing?.event?.title || 'EXCLUSIVE DROP'}
                    </h4>

                    <p className="text-xs font-mono text-text-2">
                      {order.listing?.section} · SEATS: {order.listing?.seats?.join(', ') || 'GENERAL'}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">
                      NET DISPATCHED
                    </p>
                    <p className="text-lg md:text-xl font-bold font-mono tabular-nums text-volt">
                      {formatPaiseToInr(order.payoutPaise || order.resalePricePaise * 0.95)}
                    </p>
                    <p className="text-[10px] font-mono text-text-3 mt-0.5">
                      + 20% DEPOSIT RESTORED
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Payout Bank Coordinates Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface border border-line p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                  PAYOUT BANK ACCOUNT
                </h3>
                <p className="text-xs text-text-3 font-mono mt-1">
                  IMPS / NEFT DESTINATION FOR DIRECT ESCROW DISBURSEMENTS
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="text-text-3 hover:text-text"
              >
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBankAccount} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-text-3 mb-1">
                  ACCOUNT HOLDER NAME
                </label>
                <Input
                  type="text"
                  placeholder="NAME AS REGISTERED WITH BANK"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  required
                />
                <p className="text-[10px] text-text-3 font-mono mt-1">
                  Must match DigiLocker verified government identity (&gt;= 80% fuzzy match).
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-text-3 mb-1">
                  BANK ACCOUNT NUMBER
                </label>
                <Input
                  type="text"
                  placeholder="FULL BANK ACCOUNT NUMBER"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-text-3 mb-1">
                    IFSC CODE
                  </label>
                  <Input
                    type="text"
                    maxLength={11}
                    placeholder="HDFC0001234"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="font-mono uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-text-3 mb-1">
                    UPI ID (OPTIONAL)
                  </label>
                  <Input
                    type="text"
                    placeholder="NAME@OKBANK"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-3 bg-surface-2 border border-line text-xs font-mono text-text-3 flex items-start gap-2">
                <IconLock size={14} className="shrink-0 mt-0.5 text-text-2" />
                <span>
                  Encrypted at rest with AES-256-GCM. Penny-drop verified via Setu / Cashfree bank gateway.
                </span>
              </div>

              {bankError && (
                <div className="p-3 bg-risk/10 border border-risk/40 text-xs text-risk font-mono">
                  {bankError}
                </div>
              )}

              {bankSuccess && (
                <div className="p-3 bg-volt/10 border border-volt/40 text-xs text-volt font-mono">
                  ACCOUNT VERIFIED &amp; ENCRYPTED SUCCESSFULLY
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsBankModalOpen(false)}
                  className="flex-1"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={savingBank}
                >
                  {savingBank ? 'VERIFYING...' : 'SAVE & VERIFY'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
