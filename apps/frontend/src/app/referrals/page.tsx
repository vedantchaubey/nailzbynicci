// apps/frontend/src/app/referrals/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

interface ReferralReward {
  id: string;
  friendName: string;
  friendPhone: string;
  date: string;
  event: string;
  creditPaise: number;
  status: 'CREDITED' | 'PENDING_FIRST_PURCHASE';
}

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'PASS-ARJUN99';
  const referralUrl = `https://ticketpass.in/ref/${referralCode}`;

  const rewards: ReferralReward[] = [
    {
      id: 'ref-1',
      friendName: 'Rohan K.',
      friendPhone: '+91 98765 •••••',
      date: '2026-10-25',
      event: 'Coldplay: Music of the Spheres (Ahmedabad)',
      creditPaise: 25000,
      status: 'CREDITED',
    },
    {
      id: 'ref-2',
      friendName: 'Pooja S.',
      friendPhone: '+91 91234 •••••',
      date: '2026-10-29',
      event: 'Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)',
      creditPaise: 25000,
      status: 'CREDITED',
    },
    {
      id: 'ref-3',
      friendName: 'Vikram N.',
      friendPhone: '+91 99887 •••••',
      date: '2026-11-01',
      event: 'Account Created',
      creditPaise: 25000,
      status: 'PENDING_FIRST_PURCHASE',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              COMMUNITY GROWTH &bull; MUTUAL REWARDS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            REFER &amp; EARN
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Give ₹250 booking credit, get ₹250 wallet credit. Both parties receive credits automatically upon completion of the friend's first verified ticket transfer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/buyer-guarantee">
            <Button variant="secondary" size="sm">
              BUYER GUARANTEE
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="primary" size="sm">
              BOOK WITH CREDIT
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <div className="p-5 bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            AVAILABLE WALLET CREDIT
          </div>
          <div className="text-3xl font-black font-display text-volt tabular-nums">
            ₹500
          </div>
          <div className="text-xs text-text-3 mt-1">Applies at checkout</div>
        </div>

        <div className="p-5 bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            FRIENDS REFERRED
          </div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            3
          </div>
          <div className="text-xs text-text-3 mt-1">Total network joins</div>
        </div>

        <div className="p-5 bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            QUALIFIED FIRST ORDERS
          </div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            2
          </div>
          <div className="text-xs text-text-3 mt-1">67% conversion rate</div>
        </div>

        <div className="p-5 bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            LIFETIME CREDITS WON
          </div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            ₹750
          </div>
          <div className="text-xs text-text-3 mt-1">Non-expiring cash credits</div>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="p-8 bg-surface-2 border border-line mb-10 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-volt">
            YOUR EXCLUSIVE INVITE COORDINATE
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tight font-display text-text">
            SHARE YOUR PRIVATE LINK
          </h2>
          <p className="text-xs text-text-2">
            Anyone creating an account with this link gets an instant ₹250 voucher applied to their first stadium drop.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 bg-surface border border-line px-4 py-3 rounded-xl font-mono text-sm text-text select-all">
            {referralUrl}
          </div>
          <Button variant="primary" size="sm" onClick={handleCopyLink} className="py-3 px-6 whitespace-nowrap">
            {copied ? 'COPIED TO CLIPBOARD' : 'COPY INVITE LINK'}
          </Button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Get ₹250 off real tickets for Coldplay, IPL & Diljit on TicketPass: ${referralUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="sm" className="w-full sm:w-auto py-3 px-6 whitespace-nowrap">
              SHARE ON WHATSAPP
            </Button>
          </a>
        </div>
      </div>

      {/* Rewards Ledger */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          REFERRAL REWARDS LEDGER
        </h2>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">FRIEND</th>
                <th className="py-3 px-4">DATE JOINED</th>
                <th className="py-3 px-4">QUALIFYING ACTIVITY</th>
                <th className="py-3 px-4 text-right">CREDIT WON</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rewards.map((r) => (
                <tr key={r.id} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-bold text-text">
                    {r.friendName}
                    <div className="text-xs font-mono text-text-3 font-normal">{r.friendPhone}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3">
                    {r.date}
                  </td>
                  <td className="py-4 px-4 text-xs text-text-2">
                    {r.event}
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-volt">
                    +{formatPaise(r.creditPaise)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                        r.status === 'CREDITED'
                          ? 'bg-volt text-black'
                          : 'bg-surface-2 text-text-3 border border-line'
                      }`}
                    >
                      {r.status === 'CREDITED' ? 'CREDITED TO WALLET' : 'AWAITING BOOKING'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
