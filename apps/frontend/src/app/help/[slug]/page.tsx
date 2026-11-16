// apps/frontend/src/app/help/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { IconCheck, IconArrowUpRight } from '../../../components/icons';

const ARTICLE_CONTENT: Record<string, { title: string; category: string; content: string[] }> = {
  'how-bookmyshow-transfer-works': {
    title: 'HOW BOOKMYSHOW TICKET TRANSFERS WORK',
    category: 'BOOKMYSHOW TRANSFERS',
    content: [
      'BookMyShow natively supports transferring tickets between users for select stadium concerts and sporting events. However, BookMyShow requires the seller to select the recipient directly from their smartphone device contacts.',
      'Step 1: The seller must first save the buyer’s 10-digit mobile number into their phone’s address book.',
      'Step 2: The seller opens BookMyShow > Your Orders > taps "Transfer Tickets" > selects the buyer from contacts.',
      'Step 3: The buyer receives an SMS alert and opens their BookMyShow app to tap "Accept".',
      'Step 4: Once accepted, the tickets are irrevocably transferred into the buyer’s BookMyShow account with a fresh turnstile QR code.',
      'Important Escrow Safety Rule: In BookMyShow, the seller can cancel the request until the buyer accepts. Therefore, TicketPass never releases escrow funds until the buyer confirms in-app receipt.',
    ],
  },
  'how-district-transfer-works': {
    title: 'HOW DISTRICT BY ZOMATO TICKET TRANSFERS WORK',
    category: 'DISTRICT TRANSFERS',
    content: [
      'District (by Zomato Limited) provides an in-app ticket transfer system that allows direct transfer using the buyer’s 10-digit mobile number.',
      'Step 1: The seller opens District > My Bookings > taps "Transfer Ticket" > types the buyer’s 10-digit mobile number.',
      'Step 2: The buyer opens District > My Bookings > taps "Transferred Tickets" tab > taps "Accept".',
      'Anti-Scam Alert: Once accepted, only the buyer can transfer the ticket back. Never reverse-transfer tickets to anyone claiming it was sent in error. Our support team will never ask you to transfer tickets back.',
    ],
  },
  'buyer-escrow-guarantee-overview': {
    title: 'UNDERSTANDING THE 100% ESCROW GUARANTEE',
    category: 'SAFETY & ESCROW',
    content: [
      'TicketPass was architected from the ground up to eradicate ticket scalping fraud in India.',
      'When you purchase a ticket drop, 100% of your funds are locked in an institutional banking escrow vault.',
      'The seller receives zero payout until you confirm valid receipt inside BookMyShow or District.',
      'If the seller fails to transfer within 60 minutes or cancels the transfer request, your payment is refunded immediately in full without deductions.',
    ],
  },
};

export default function HelpArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLE_CONTENT[slug] || {
    title: 'HELP ARTICLE',
    category: 'GUIDE',
    content: [
      'This article provides step-by-step guidance on TicketPass escrow verification, transfer SLAs, and consumer safety guarantees.',
    ],
  };

  const [voted, setVoted] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Back link */}
      <div className="pb-6">
        <Link href="/help" className="text-xs font-mono text-text-3 hover:text-text transition-colors">
          ← BACK TO HELP CENTER
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-line pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-volt">
          {article.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display leading-tight">
          {article.title}
        </h1>
      </div>

      {/* Article Body */}
      <div className="mt-8 space-y-6 text-sm text-text-2 leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="p-4 border border-line bg-surface">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Feedback Widget */}
      <div className="mt-12 p-6 border border-line bg-surface-2 flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-text-3">WAS THIS GUIDE HELPFUL?</span>
        <div className="flex items-center gap-3">
          {voted !== null ? (
            <span className="text-xs font-mono text-volt">THANK YOU FOR YOUR FEEDBACK</span>
          ) : (
            <>
              <Button variant="secondary" size="sm" onClick={() => setVoted(true)}>
                YES
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setVoted(false)}>
                NO
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
