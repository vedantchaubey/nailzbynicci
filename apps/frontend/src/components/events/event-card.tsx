// apps/frontend/src/components/events/event-card.tsx
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { formatINR } from '@ticketpass/shared';

export interface EventItemData {
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

export function EventCard({ event }: { event: EventItemData }) {
  const formattedDate = dayjs(event.date).format('ddd, D MMM YYYY • h:mm A');

  return (
    <Link href={`/events/${event.id}`} className="group block focus:outline-none">
      <Card className="overflow-hidden border border-gray-200 transition-all duration-200 group-hover:border-gray-300 group-hover:shadow-hover">
        {/* Event Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Platform Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={event.platform === 'BOOKMYSHOW' ? 'bms' : 'district'}>
              {event.platform === 'BOOKMYSHOW' ? 'BookMyShow' : 'District by Zomato'}
            </Badge>
          </div>

          {/* Category Chip */}
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
              {event.category}
            </span>
          </div>

          {/* Active Listings Counter */}
          <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center space-x-1.5 drop-shadow-md">
            <Ticket className="h-3.5 w-3.5" />
            <span>
              {event.listingCount > 0
                ? `${event.listingCount} ${event.listingCount === 1 ? 'ticket' : 'tickets'} available`
                : 'Sold out'}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {event.name}
          </h3>

          <div className="mt-2.5 space-y-1.5 text-xs text-gray-500">
            <p className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>{formattedDate}</span>
            </p>
            <p className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="line-clamp-1">{event.venue}, {event.city}</span>
            </p>
          </div>

          {/* Price Footer */}
          <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">Resale from</p>
              <p className="text-base font-bold text-gray-900">
                {event.lowestPricePaise ? formatINR(event.lowestPricePaise) : 'N/A'}
              </p>
            </div>
            <span className="text-xs font-semibold text-brand-600 group-hover:underline">
              View Seats &rarr;
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
