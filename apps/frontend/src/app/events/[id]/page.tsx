// apps/frontend/src/app/events/[id]/page.tsx
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { SegmentedControl } from '../../../components/ui/segmented-control';
import { StepperPill } from '../../../components/ui/stepper-pill';
import { ListingRow } from '../../../components/ui/listing-row';
import { VenueMap } from '../../../components/events/venue-map';
import { StickyCta } from '../../../components/ui/sticky-cta';
import { ListingRowSkeleton } from '../../../components/ui/shape-skeletons';
import {
  PinIcon,
  CalendarIcon,
  ShieldIcon,
  VerifiedSealGlyph,
  LockIcon,
  TransferArrowsIcon,
} from '../../../components/icons/index';

interface EventDetail {
  id: string;
  name: string;
  description: string;
  venue: string;
  city: string;
  date: string;
  imageUrl: string;
  category: string;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  listingCount: number;
  lowestPricePaise: number | null;
}

interface ListingItem {
  id: string;
  section: string;
  row: string;
  seats: string[];
  quantity: number;
  originalPricePaise: number;
  resalePricePaise: number;
  seller: {
    id: string;
    name: string;
    kycStatus: string;
    reputation?: {
      level: string;
      completedSales: number;
      score: number;
    };
  };
}

interface SectionStat {
  section: string;
  listingCount: number;
  lowestPricePaise: number;
  medianPricePaise: number;
  tier: 'value' | 'mid' | 'premium' | 'vip';
}

export default function NikeStyleEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [activeTab, setActiveTab] = React.useState<'TICKETS' | 'MAP' | 'DETAILS'>('TICKETS');
  const [selectedQty, setSelectedQty] = React.useState<number>(2);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<'price_asc' | 'price_desc'>('price_asc');

  // 1. Fetch Event Detail
  const { data: event, isLoading: isEventLoading } = useQuery<EventDetail>({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const res = await apiClient.get<EventDetail>(`/events/${eventId}`);
      return res.data;
    },
  });

  // 2. Fetch Listings
  const { data: listings, isLoading: isListingsLoading } = useQuery<ListingItem[]>({
    queryKey: ['event-listings', eventId, selectedQty, selectedSection, sortBy],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (selectedQty) p.append('quantity', selectedQty.toString());
      if (selectedSection) p.append('section', selectedSection);
      if (sortBy) p.append('sortBy', sortBy);

      const res = await apiClient.get<ListingItem[]>(`/events/${eventId}/listings?${p.toString()}`);
      return res.data;
    },
  });

  // 3. Fetch Venue Sections
  const { data: sections } = useQuery<SectionStat[]>({
    queryKey: ['event-sections', eventId],
    queryFn: async () => {
      const res = await apiClient.get<SectionStat[]>(`/events/${eventId}/sections`);
      return res.data;
    },
  });

  const formattedDate = event
    ? new Date(event.date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const handleCheckout = (listingId: string) => {
    router.push(`/checkout/${listingId}`);
  };

  const filteredListings = listings || [];
  const lowestPrice = event?.lowestPricePaise || (filteredListings[0]?.resalePricePaise ?? 0);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text select-none">
      {/* 1. 80svh ART-DIRECTED CINEMATIC HERO */}
      <section className="relative w-full h-[80svh] min-h-[520px] flex flex-col justify-end overflow-hidden pb-12 px-6 md:px-12">
        {event?.imageUrl && (
          <div className="absolute inset-0">
            <Image
              src={event.imageUrl}
              alt={event.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-100"
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="relative z-10 max-w-content mx-auto w-full flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <Chip variant="live" pulse>
              LIVE · {event?.listingCount || 0} SEATS AVAILABLE
            </Chip>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill bg-black/80 border border-line text-text-2">
              NATIVE {event?.platform} TRANSFER
            </span>
          </div>

          <h1 className="type-page-title text-white max-w-4xl tracking-tight leading-none">
            {event?.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[14px] text-text-2 font-medium">
            <span className="flex items-center gap-1.5 text-white">
              <PinIcon size={16} className="text-volt" />
              {event?.venue}, {event?.city}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon size={16} />
              {formattedDate}
            </span>
          </div>
        </div>
      </section>

      {/* 2. STICKY SEGMENTED CONTROL: TICKETS · MAP · DETAILS */}
      <section className="sticky top-[64px] z-30 w-full bg-bg/95 backdrop-blur-md border-y border-line py-3 px-6 md:px-12">
        <div className="max-w-content mx-auto flex items-center justify-between gap-4">
          <SegmentedControl
            options={[
              { value: 'TICKETS', label: 'TICKETS', badge: filteredListings.length },
              { value: 'MAP', label: 'VENUE MAP' },
              { value: 'DETAILS', label: 'DETAILS' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'TICKETS' && (
            <div className="hidden sm:flex items-center gap-3">
              <StepperPill
                value={selectedQty}
                onChange={setSelectedQty}
                min={1}
                max={6}
                label="TICKETS"
              />
              <Chip
                variant="filter"
                active={sortBy === 'price_asc'}
                onSelect={() => setSortBy(sortBy === 'price_asc' ? 'price_desc' : 'price_asc')}
              >
                {sortBy === 'price_asc' ? 'PRICE: LOW TO HIGH' : 'PRICE: HIGH TO LOW'}
              </Chip>
            </div>
          )}
        </div>
      </section>

      {/* 3. TAB VIEWS */}
      <section className="w-full max-w-content mx-auto py-10 px-6 md:px-12 flex-1 pb-32">
        {/* TAB 1: TICKETS */}
        {activeTab === 'TICKETS' && (
          <div className="flex flex-col gap-6">
            {selectedSection && (
              <div className="flex items-center justify-between p-3 rounded-[8px] bg-surface border border-line">
                <span className="text-[13px] font-bold uppercase tracking-wider text-white">
                  FILTERED BY SECTION: <span className="text-volt">{selectedSection}</span>
                </span>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-[12px] text-text-3 hover:text-white uppercase font-bold"
                >
                  CLEAR FILTER
                </button>
              </div>
            )}

            {isListingsLoading ? (
              <div className="flex flex-col border border-line rounded-[8px] overflow-hidden bg-surface">
                <ListingRowSkeleton />
                <ListingRowSkeleton />
                <ListingRowSkeleton />
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="flex flex-col border border-line rounded-[8px] overflow-hidden bg-surface">
                {filteredListings.map((l) => (
                  <ListingRow
                    key={l.id}
                    id={l.id}
                    section={l.section}
                    row={l.row}
                    seats={l.seats}
                    quantity={l.quantity}
                    originalPricePaise={l.originalPricePaise}
                    resalePricePaise={l.resalePricePaise}
                    sellerLevel={l.seller.reputation?.level || 'VERIFIED'}
                    sellerCompletedSales={l.seller.reputation?.completedSales || 10}
                    sellerKycVerified={l.seller.kycStatus === 'VERIFIED'}
                    onSelect={handleCheckout}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-surface border border-line rounded-[12px]">
                <span className="text-xl font-bold uppercase text-white font-display">No Available Seats</span>
                <span className="text-[14px] text-text-3">Try adjusting quantity or clearing section filters.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MAP */}
        {activeTab === 'MAP' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="sticky top-28">
              <VenueMap
                category={event?.category || 'Concert'}
                sections={sections || []}
                selectedSection={selectedSection}
                onSelectSection={(sec) => {
                  setSelectedSection(sec);
                  if (sec) setActiveTab('TICKETS');
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
                MAP SELECTION
              </span>
              <h3 className="type-h3 uppercase text-white">
                Tap Any Stand to Filter Seats
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                Sections are brightness-coded by tier. Hover or tap to view lowest available resale price and instant inventory count.
              </p>

              <div className="flex flex-col divide-y divide-line border border-line rounded-[12px] bg-surface overflow-hidden mt-4">
                {sections?.map((s) => (
                  <div
                    key={s.section}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedSection(s.section);
                      setActiveTab('TICKETS');
                    }}
                    className="p-4 flex items-center justify-between hover:bg-surface-2 cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-[15px] uppercase">{s.section}</span>
                      <span className="text-[12px] text-text-3 font-mono">{s.listingCount} seats available</span>
                    </div>

                    <span className="text-lg font-black font-display tabular-nums text-volt">
                      From {formatPaiseToInr(s.lowestPricePaise)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DETAILS */}
        {activeTab === 'DETAILS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-[16px] bg-surface border border-line flex flex-col gap-4">
              <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
                VENUE &amp; ENTRY PROTOCOL
              </span>
              <h3 className="type-h3 uppercase text-white">
                {event?.venue}
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                {event?.description}
              </p>

              <div className="flex flex-col gap-2 border-t border-line pt-4 text-[13px] text-text-2">
                <span>· Gates open 3 hours prior to kickoff.</span>
                <span>· Valid government photo ID matching your TicketPass verified name is required at gate turnstiles.</span>
                <span>· Re-entry strictly prohibited under venue ground safety regulations.</span>
              </div>
            </div>

            <div className="p-6 rounded-[16px] bg-surface border border-line flex flex-col gap-4">
              <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
                NATIVE TRANSFER PROTOCOL
              </span>
              <h3 className="type-h3 uppercase text-white">
                How Transfer Works for {event?.platform}
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                {event?.platform === 'BOOKMYSHOW'
                  ? 'The seller transfers the seat directly to your 10-digit mobile number in BookMyShow. You accept within 60 minutes in your BookMyShow app to generate your own personal M-Ticket.'
                  : 'Transfers occur natively in the District app. Once accepted, the digital pass transfers permanently to your District wallet and cannot be rescinded.'}
              </p>

              <div className="p-4 rounded-[12px] bg-surface-2 border border-line flex items-start gap-3 mt-2">
                <ShieldIcon size={20} className="text-volt shrink-0 mt-0.5" />
                <span className="text-[12px] text-text-2">
                  TicketPass never stores ticket PDFs or barcodes. All transfers take place strictly inside the primary ticketing applications with automated escrow protection.
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. STICKY TICKET STUB CTA BAR */}
      <StickyCta
        pricePaise={lowestPrice}
        buttonText="BROWSE SEATS"
        onAction={() => setActiveTab('TICKETS')}
        subtext={`Lowest verified resale price for ${event?.name || 'this drop'}`}
      />
    </div>
  );
}
