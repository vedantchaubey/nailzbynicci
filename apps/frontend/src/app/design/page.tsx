// apps/frontend/src/app/design/page.tsx
'use client';

import * as React from 'react';
import { Button } from '../../components/ui/button';
import { IconButton } from '../../components/ui/icon-button';
import { Chip } from '../../components/ui/chip';
import { SegmentedControl } from '../../components/ui/segmented-control';
import { StepperPill } from '../../components/ui/stepper-pill';
import { Input } from '../../components/ui/input';
import { CountdownBlock } from '../../components/ui/countdown-block';
import { ConfidenceGauge } from '../../components/ui/gauge';
import { Timeline } from '../../components/ui/timeline';
import { Dropzone } from '../../components/ui/dropzone';
import { EventCard } from '../../components/ui/event-card';
import { ListingRow } from '../../components/ui/listing-row';
import { EventCardSkeleton, ListingRowSkeleton, TableSkeleton } from '../../components/ui/shape-skeletons';
import {
  TicketIcon,
  ShieldIcon,
  LockIcon,
  SearchIcon,
  VerifiedSealGlyph,
  ShareIcon,
} from '../../components/icons/index';

export default function DesignSystemShowcasePage() {
  const [stepperVal, setStepperVal] = React.useState(2);
  const [segmentedVal, setSegmentedVal] = React.useState('TICKETS');
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const sampleSignals = [
    { key: 'A', label: 'Buyer confirmed acceptance in-app', passed: true, scoreAwarded: 30 },
    { key: 'B', label: 'Buyer screenshot OCR keyword & event match', passed: true, scoreAwarded: 20 },
    { key: 'C', label: 'Seller transfer-initiated screenshot verified', passed: true, scoreAwarded: 10 },
    { key: 'D', label: 'Human SLA timing consistency passed', passed: true, scoreAwarded: 10 },
    { key: 'E', label: 'Seller trust score >= 70', passed: true, scoreAwarded: 10 },
    { key: 'F', label: 'Zero unresolved fraud flags', passed: true, scoreAwarded: 10 },
    { key: 'G', label: 'DigiLocker KYC verified & bank account matched', passed: true, scoreAwarded: 10 },
  ];

  const sampleTimeline = [
    { id: '1', title: 'ESCROW LOCKED', description: '₹14,500 held safely in automated escrow.', timestamp: '14:02 IST', status: 'COMPLETED' as const },
    { id: '2', title: 'SELLER INITIATED TRANSFER', description: 'Transferred to buyer phone via BookMyShow.', timestamp: '14:15 IST', status: 'COMPLETED' as const },
    { id: '3', title: 'AWAITING BUYER ACCEPTANCE', description: '60-minute in-app acceptance countdown active.', timestamp: '14:16 IST', status: 'ACTIVE' as const },
    { id: '4', title: 'VERIFIED & PAYOUT RELEASED', description: 'Instant payout released to seller bank account.', timestamp: null, status: 'PENDING' as const },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-12 max-w-content mx-auto flex flex-col gap-16 select-none">
      {/* Header with Theme Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-line">
        <div className="flex flex-col">
          <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
            SECTION 22 DESIGN SYSTEM
          </span>
          <h1 className="type-section-title text-white mt-1">
            NIKE-GRADE ART DIRECTION
          </h1>
          <p className="text-text-2 text-[15px] mt-1">
            Flat surfaces, 1px lines, zero drop shadows, single VOLT accent, fluid typography scale.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            variant="secondary"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            <span>MODE: {isDark ? 'DARK (DEFAULT)' : 'LIGHT'}</span>
          </Button>
        </div>
      </div>

      {/* 1. BUTTONS */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="type-h3 uppercase text-white">01. Buttons (Pill 40 / 48 / 56)</h2>
          <span className="text-[12px] font-mono text-text-3">NO GRADIENTS · NO SHADOWS</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" variant="primary">PRIMARY LG 56</Button>
          <Button size="md" variant="primary">PRIMARY MD 48</Button>
          <Button size="sm" variant="primary">PRIMARY SM 40</Button>
          <Button size="md" variant="secondary">SECONDARY MD</Button>
          <Button size="md" variant="ghost">GHOST MD</Button>
          <Button size="md" variant="destructive">DESTRUCTIVE</Button>
          <Button size="md" variant="volt">VOLT (LIVE MOMENTS)</Button>
          <Button size="md" variant="primary" isLoading>LOADING</Button>
          <Button size="md" variant="primary" disabled>DISABLED</Button>
        </div>

        <div className="flex items-center gap-3">
          <IconButton ariaLabel="Ticket" variant="primary"><TicketIcon size={20} /></IconButton>
          <IconButton ariaLabel="Shield" variant="secondary"><ShieldIcon size={20} /></IconButton>
          <IconButton ariaLabel="Share" variant="ghost"><ShareIcon size={20} /></IconButton>
        </div>
      </section>

      {/* 2. CHIPS & STATUS PILLS */}
      <section className="flex flex-col gap-6">
        <h2 className="type-h3 uppercase text-white">02. Live Chips & Status Pills</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Chip variant="live" pulse>LIVE · 14 SEATS</Chip>
          <Chip variant="status" active>SELLING FAST</Chip>
          <Chip variant="filter" active>MUMBAI</Chip>
          <Chip variant="filter">DELHI</Chip>
          <Chip variant="filter">BENGALURU</Chip>
          <Chip variant="sold">DROP COMPLETED</Chip>
          <Chip variant="tag" className="flex items-center gap-1">
            <VerifiedSealGlyph size={14} className="text-volt" />
            <span>IDENTITY VERIFIED</span>
          </Chip>
        </div>
      </section>

      {/* 3. SEGMENTED CONTROL & STEPPERS */}
      <section className="flex flex-col gap-6">
        <h2 className="type-h3 uppercase text-white">03. Segmented Control & Stepper Pill</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <SegmentedControl
            options={[
              { value: 'TICKETS', label: 'TICKETS', badge: 14 },
              { value: 'MAP', label: 'STADIUM MAP' },
              { value: 'DETAILS', label: 'DETAILS' },
            ]}
            value={segmentedVal}
            onChange={setSegmentedVal}
          />

          <StepperPill
            value={stepperVal}
            onChange={setStepperVal}
            min={1}
            max={6}
            label="TICKETS"
          />
        </div>
      </section>

      {/* 4. INPUTS (56px Tall, 12px Radius, Top Micro Caps) */}
      <section className="flex flex-col gap-6 max-w-xl">
        <h2 className="type-h3 uppercase text-white">04. Inputs with Micro Caps Label</h2>
        <Input
          label="TRANSFER PHONE NUMBER"
          placeholder="Enter 10-digit mobile number"
          hint="Must match your BookMyShow or District registered mobile."
          defaultValue="+91 98765 43210"
        />
        <Input
          label="BOOKING REFERENCE"
          placeholder="e.g. WXYZ1234"
          error="Booking reference not found in selected event's inventory."
        />
      </section>

      {/* 5. COUNTDOWN BLOCK */}
      <section className="flex flex-col gap-6">
        <h2 className="type-h3 uppercase text-white">05. Countdown Block (Tabular Numerals)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-surface border border-line rounded-[16px]">
          <div>
            <CountdownBlock
              targetDate={new Date(Date.now() + 48 * 3600000)}
              label="TRANSFER WINDOW OPENS IN"
              size="lg"
            />
          </div>
          <div>
            <CountdownBlock
              targetDate={new Date(Date.now() + 300000)}
              label="CHECKOUT RESERVATION TIMER"
              size="hero"
            />
          </div>
        </div>
      </section>

      {/* 6. CONFIDENCE GAUGE (Half-Ring Sweep & Signal Rows) */}
      <section className="flex flex-col gap-6 max-w-lg">
        <h2 className="type-h3 uppercase text-white">06. Confidence Gauge (100-Point Engine)</h2>
        <ConfidenceGauge score={90} signals={sampleSignals} />
      </section>

      {/* 7. TIMELINE */}
      <section className="flex flex-col gap-6 max-w-lg">
        <h2 className="type-h3 uppercase text-white">07. Vertical Activity Timeline</h2>
        <div className="p-6 bg-surface border border-line rounded-[16px]">
          <Timeline steps={sampleTimeline} />
        </div>
      </section>

      {/* 8. LISTING ROW (88px) */}
      <section className="flex flex-col gap-6">
        <h2 className="type-h3 uppercase text-white">08. Listing Row (88px Flat Separators)</h2>
        <div className="border-t border-line bg-surface rounded-[8px] overflow-hidden">
          <ListingRow
            id="list_demo_1"
            section="EAST STAND LEVEL 2"
            row="F"
            seats={['14', '15']}
            quantity={2}
            originalPricePaise={450000}
            resalePricePaise={420000}
            sellerLevel="ELITE"
            sellerCompletedSales={28}
            onSelect={(id) => alert(`Selected listing: ${id}`)}
          />
          <ListingRow
            id="list_demo_2"
            section="VIP LOUNGE WEST"
            row="A"
            seats={['01']}
            quantity={1}
            originalPricePaise={1200000}
            resalePricePaise={1150000}
            sellerLevel="VERIFIED"
            sellerCompletedSales={14}
            onSelect={(id) => alert(`Selected listing: ${id}`)}
          />
        </div>
      </section>

      {/* 9. CARDS (4:5 & 16:9) */}
      <section className="flex flex-col gap-6">
        <h2 className="type-h3 uppercase text-white">09. Event Cards (4:5 & 16:9 Aspect Ratios)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventCard
            id="coldplay"
            name="Coldplay: Music of the Spheres World Tour"
            venue="DY Patil Sports Stadium"
            city="Mumbai"
            date="2026-11-03"
            imageUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"
            platform="BOOKMYSHOW"
            listingCount={4}
            lowestPricePaise={275000}
            aspectRatio="4:5"
          />
          <EventCard
            id="diljit"
            name="Diljit Dosanjh: Dil-Luminati Tour 2026"
            venue="Jawaharlal Nehru Stadium"
            city="Delhi"
            date="2026-11-06"
            imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800"
            platform="BOOKMYSHOW"
            listingCount={2}
            lowestPricePaise={220000}
            aspectRatio="4:5"
          />
          <EventCard
            id="sunburn"
            name="Sunburn Goa Electronic Music Festival"
            venue="Vagator Beach Arena"
            city="Goa"
            date="2026-11-11"
            imageUrl="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800"
            platform="DISTRICT"
            listingCount={6}
            lowestPricePaise={350000}
            aspectRatio="4:5"
          />
        </div>
      </section>

      {/* 10. SKELETONS */}
      <section className="flex flex-col gap-6 pb-20">
        <h2 className="type-h3 uppercase text-white">10. Shape-Matched Skeletons (No Spinners)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventCardSkeleton aspectRatio="4:5" />
          <div className="col-span-2">
            <ListingRowSkeleton />
            <ListingRowSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}
