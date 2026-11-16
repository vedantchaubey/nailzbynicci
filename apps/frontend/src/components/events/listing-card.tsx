// apps/frontend/src/components/events/listing-card.tsx
import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { formatINR } from '@ticketpass/shared';

export interface ListingCardItem {
  id: string;
  section: string;
  row: string;
  seats: string[];
  quantity: number;
  originalPricePaise: number;
  resalePricePaise: number;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  tags: string[];
  seller: {
    id: string;
    name: string;
    level: string;
    score: number;
    completedSales: number;
  };
}

export function ListingCard({
  listing,
  onSelect,
}: {
  listing: ListingCardItem;
  onSelect?: () => void;
}) {
  return (
    <Card className="p-5 border border-gray-200 transition-all hover:border-brand-500 hover:shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Side: Seat Information & Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" className="text-[11px]">
              {listing.quantity} {listing.quantity === 1 ? 'Seat' : 'Seats together'}
            </Badge>

            {listing.tags.map((tag) => (
              <Badge key={tag} variant="pending" className="text-[11px]">
                {tag}
              </Badge>
            ))}

            <Badge
              variant={listing.platform === 'BOOKMYSHOW' ? 'bms' : 'district'}
              className="text-[11px]"
            >
              {listing.platform === 'BOOKMYSHOW' ? 'BookMyShow Transfer' : 'District Transfer'}
            </Badge>
          </div>

          <div>
            <h4 className="text-base font-bold text-gray-900">{listing.section}</h4>
            <p className="text-xs text-gray-500">
              Row <strong className="text-gray-800">{listing.row}</strong> &bull; Seats{' '}
              <strong className="text-gray-800">{listing.seats.join(', ')}</strong>
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-500">
            <span className="flex items-center space-x-1 text-emerald-700 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Escrow Protected</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-600">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>Seller: {listing.seller.level} ({listing.seller.completedSales} sales)</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Direct In-App Delivery</span>
            </span>
          </div>
        </div>

        {/* Right Side: Price & Checkout CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
          <div className="text-left sm:text-right">
            {listing.resalePricePaise < listing.originalPricePaise && (
              <span className="text-xs line-through text-gray-400 block -mb-1">
                {formatINR(listing.originalPricePaise)}
              </span>
            )}
            <p className="text-xl font-bold text-gray-900">
              {formatINR(listing.resalePricePaise)}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">Includes 5% buyer escrow fee</p>
          </div>

          <Link href={`/checkout/${listing.id}`} className="sm:mt-3">
            <Button
              size="sm"
              onClick={onSelect}
              className="inline-flex items-center space-x-1.5 font-bold shadow-sm"
            >
              <Zap className="h-4 w-4" />
              <span>Buy Now</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
