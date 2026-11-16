// apps/frontend/src/app/seller/listings/bulk/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../../components/ui/button';

interface ParsedSeatListing {
  section: string;
  row: string;
  seat: string;
  faceValuePaise: number;
  listingPricePaise: number;
  valid: boolean;
  error?: string;
}

export default function BulkListingUploadPage() {
  const [selectedEvent, setSelectedEvent] = useState('evt-coldplay-amd-2026');
  const [isUploading, setIsUploading] = useState(false);
  const [listings, setListings] = useState<ParsedSeatListing[]>([
    {
      section: 'South Premium West Tier 2',
      row: 'F',
      seat: '101',
      faceValuePaise: 1250000,
      listingPricePaise: 1400000,
      valid: true,
    },
    {
      section: 'South Premium West Tier 2',
      row: 'F',
      seat: '102',
      faceValuePaise: 1250000,
      listingPricePaise: 1400000,
      valid: true,
    },
    {
      section: 'South Premium West Tier 2',
      row: 'F',
      seat: '103',
      faceValuePaise: 1250000,
      listingPricePaise: 1400000,
      valid: true,
    },
    {
      section: 'South Premium West Tier 2',
      row: 'F',
      seat: '104',
      faceValuePaise: 1250000,
      listingPricePaise: 1400000,
      valid: true,
    },
  ]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sampleCsvContent =
    'section,row,seat,face_value_inr,listing_price_inr\n' +
    'South Premium West Tier 2,F,101,12500,14000\n' +
    'South Premium West Tier 2,F,102,12500,14000\n' +
    'South Premium West Tier 2,F,103,12500,14000\n' +
    'South Premium West Tier 2,F,104,12500,14000\n';

  const downloadSampleCsv = () => {
    const blob = new Blob([sampleCsvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticketpass_bulk_listings_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
      if (lines.length > 1) {
        const rows = lines.slice(1);
        const parsed: ParsedSeatListing[] = rows.map((line) => {
          const parts = line.split(',');
          const section = parts[0] || 'General';
          const row = parts[1] || 'A';
          const seat = parts[2] || '1';
          const faceValue = (parseFloat(parts[3]) || 0) * 100;
          const listingPrice = (parseFloat(parts[4]) || 0) * 100;
          const markupPct = faceValue > 0 ? ((listingPrice - faceValue) / faceValue) * 100 : 0;
          const valid = markupPct <= 20;

          return {
            section,
            row,
            seat,
            faceValuePaise: faceValue,
            listingPricePaise: listingPrice,
            valid,
            error: markupPct > 20 ? 'Exceeds +20% maximum markup cap' : undefined,
          };
        });
        setListings(parsed);
      }
      setIsUploading(false);
    };
    reader.readAsText(file);
  };

  const totalPayoutPaise = listings
    .filter((l) => l.valid)
    .reduce((sum, l) => sum + Math.round(l.listingPricePaise * 0.95), 0);

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  const handlePublishAll = () => {
    setSubmitSuccess(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              SELLER OPERATIONS &bull; BULK INGESTION
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            BULK LISTINGS
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Upload adjacent seats or season block passes in a single batch. Listings are verified against the venue layout and the +20% markup cap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={downloadSampleCsv}>
            DOWNLOAD CSV TEMPLATE
          </Button>
          <Link href="/sell">
            <Button variant="secondary" size="sm">
              SINGLE TICKET
            </Button>
          </Link>
        </div>
      </div>

      {submitSuccess && (
        <div className="my-6 p-4 bg-volt text-black flex items-center justify-between">
          <div className="text-sm font-bold uppercase tracking-wider font-mono">
            {listings.length} LISTINGS PUBLISHED LIVE TO MARKETPLACE ESCROW
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-neutral-900 border-none">
              VIEW ACTIVE LISTINGS
            </Button>
          </Link>
        </div>
      )}

      {/* Event Selection & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="md:col-span-2 p-6 bg-surface border border-line space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-text-3">
            SELECT VERIFIED EVENT DROP
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-surface-2 border border-line text-text px-4 py-3 rounded-xl font-medium focus:outline-none focus:border-volt"
          >
            <option value="evt-coldplay-amd-2026">
              Coldplay: Music of the Spheres World Tour &mdash; Narendra Modi Stadium, Ahmedabad
            </option>
            <option value="evt-diljit-del-2026">
              Diljit Dosanjh: Dil-Luminati Tour &mdash; JLN Stadium, New Delhi
            </option>
            <option value="evt-ipl-srh-pbks-2026">
              IPL 2026: Sunrisers Hyderabad vs Punjab Kings &mdash; Rajiv Gandhi Stadium
            </option>
          </select>

          <div className="p-4 bg-surface-2 rounded-xl text-xs space-y-1.5 border border-line">
            <div className="text-text font-bold">FAIR RESALE PRICING GUARDRAIL</div>
            <p className="text-text-3">
              Per Section 23 Anti-Scalping Rules, all listed seats are capped at maximum <span className="text-volt font-bold">+20% over original box office face value</span>. Listings exceeding this limit are automatically rejected at ingest.
            </p>
          </div>
        </div>

        {/* Upload Drop Zone */}
        <div className="p-6 bg-surface border border-dashed border-line-strong flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3">
            UPLOAD SPREADSHEET
          </div>
          <p className="text-xs text-text-2">
            Drag &amp; drop .CSV with columns: section, row, seat, face_value_inr, listing_price_inr
          </p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="inline-block px-4 py-2 bg-text text-black font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors">
              {isUploading ? 'PARSING CSV...' : 'BROWSE FILES'}
            </span>
          </label>
        </div>
      </div>

      {/* Batch Preview Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold uppercase tracking-tight font-display">
              PARSED BATCH ({listings.length} SEATS)
            </h2>
            <span className="text-xs font-mono text-text-3">
              ESTIMATED NET PAYOUT: <strong className="text-volt">{formatPaise(totalPayoutPaise)}</strong>
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            disabled={listings.some((l) => !l.valid) || listings.length === 0}
            onClick={handlePublishAll}
          >
            CONFIRM &amp; PUBLISH BATCH
          </Button>
        </div>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">SECTION</th>
                <th className="py-3 px-4">ROW</th>
                <th className="py-3 px-4">SEAT</th>
                <th className="py-3 px-4 text-right">FACE VALUE</th>
                <th className="py-3 px-4 text-right">LIST PRICE</th>
                <th className="py-3 px-4 text-right">SELLER NET (95%)</th>
                <th className="py-3 px-4 text-center">VALIDATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {listings.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-2 transition-colors">
                  <td className="py-3 px-4 font-bold text-text">{item.section}</td>
                  <td className="py-3 px-4 font-mono text-text">{item.row}</td>
                  <td className="py-3 px-4 font-mono text-text">{item.seat}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-text-3">
                    {formatPaise(item.faceValuePaise)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-text">
                    {formatPaise(item.listingPricePaise)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-volt font-bold">
                    {formatPaise(Math.round(item.listingPricePaise * 0.95))}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.valid ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-volt text-black uppercase">
                        READY
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white uppercase" title={item.error}>
                        {item.error || 'INVALID'}
                      </span>
                    )}
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
