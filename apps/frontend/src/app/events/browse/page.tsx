// apps/frontend/src/app/events/browse/page.tsx
'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { Chip } from '../../../components/ui/chip';
import { EventCard } from '../../../components/ui/event-card';
import { EventCardSkeleton } from '../../../components/ui/shape-skeletons';

interface EventItem {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  imageUrl: string;
  category: string;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  listingCount: number;
  lowestPricePaise: number | null;
}

interface EventsResponse {
  items: EventItem[];
  total: number;
}

const CITIES = ['ALL CITIES', 'MUMBAI', 'DELHI', 'BENGALURU', 'HYDERABAD', 'GOA'];
const CATEGORIES = ['ALL', 'CONCERT', 'CRICKET', 'FESTIVAL', 'COMEDY'];
const PLATFORMS = ['ALL PLATFORMS', 'BOOKMYSHOW', 'DISTRICT'];

export default function EventsBrowsePage() {
  const [city, setCity] = React.useState('ALL CITIES');
  const [category, setCategory] = React.useState('ALL');
  const [platform, setPlatform] = React.useState('ALL PLATFORMS');

  const { data, isLoading } = useQuery<EventsResponse>({
    queryKey: ['events-browse', city, category, platform],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (city !== 'ALL CITIES') params.append('city', city);
      if (category !== 'ALL') params.append('category', category);
      if (platform !== 'ALL PLATFORMS') params.append('platform', platform);

      const res = await apiClient.get<EventsResponse>(`/events?${params.toString()}`);
      return res.data;
    },
  });

  const events = data?.items || [];

  return (
    <div className="min-h-screen bg-bg text-text py-10 px-4 md:px-8 max-w-content mx-auto flex flex-col gap-8 select-none">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
          UPCOMING DROPS
        </span>
        <h1 className="type-section-title text-white">
          BROWSE EVENTS ({events.length})
        </h1>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[64px] z-30 bg-bg/95 backdrop-blur-md py-4 border-y border-line flex flex-col gap-3">
        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CITIES.map((c) => (
            <Chip
              key={c}
              variant="filter"
              active={city === c}
              onSelect={() => setCity(c)}
              className="shrink-0"
            >
              {c}
            </Chip>
          ))}
        </div>

        {/* Category & Platform Secondary Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              variant="tag"
              active={category === cat}
              onSelect={() => setCategory(cat)}
              className="shrink-0 text-[11px]"
            >
              {cat}
            </Chip>
          ))}
          <span className="text-text-3 px-1">·</span>
          {PLATFORMS.map((p) => (
            <Chip
              key={p}
              variant="tag"
              active={platform === p}
              onSelect={() => setPlatform(p)}
              className="shrink-0 text-[11px]"
            >
              {p}
            </Chip>
          ))}
        </div>
      </div>

      {/* Grid mixing 4:5 and 16:9 */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <EventCardSkeleton aspectRatio="4:5" />
          <EventCardSkeleton aspectRatio="16:9" />
          <EventCardSkeleton aspectRatio="4:5" />
          <EventCardSkeleton aspectRatio="4:5" />
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((evt, idx) => {
            // Deliberately mix 4:5 and 16:9 aspect ratios per Section 22 guidelines
            const isWide = idx % 5 === 1;
            return (
              <div key={evt.id} className={isWide ? 'sm:col-span-2' : ''}>
                <EventCard
                  id={evt.id}
                  name={evt.name}
                  venue={evt.venue}
                  city={evt.city}
                  date={evt.date}
                  imageUrl={evt.imageUrl}
                  platform={evt.platform}
                  listingCount={evt.listingCount}
                  lowestPricePaise={evt.lowestPricePaise}
                  aspectRatio={isWide ? '16:9' : '4:5'}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
          <span className="text-xl font-bold uppercase text-white font-display">No Drops Found</span>
          <span className="text-[14px] text-text-3">Try clearing filters or search another city.</span>
        </div>
      )}
    </div>
  );
}
