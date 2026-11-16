// apps/frontend/src/app/admin/flags/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface FlagRow {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  environment: string;
}

export default function AdminFlagsPage() {
  const [flags, setFlags] = useState<FlagRow[]>([
    {
      key: 'enable_dynamic_fees',
      name: 'Dynamic Demand-Tiered Platform Fees',
      description: 'Calculates 3% to 8% platform service fee depending on event face value and demand.',
      enabled: true,
      rolloutPercentage: 100,
      environment: 'PRODUCTION',
    },
    {
      key: 'enable_bulk_seller_csv',
      name: 'Bulk CSV Listing Ingestion',
      description: 'Allows verified sellers to upload multi-seat spreadsheets with automatic +20% markup guardrails.',
      enabled: true,
      rolloutPercentage: 100,
      environment: 'PRODUCTION',
    },
    {
      key: 'enable_waiting_room',
      name: 'Virtual Queue & Concurrency Gate',
      description: 'Redirects traffic to fair token-bucket queue room when active concurrent requests exceed 5,000.',
      enabled: true,
      rolloutPercentage: 50,
      environment: 'PRODUCTION',
    },
    {
      key: 'enable_instant_whatsapp_alerts',
      name: 'WhatsApp Dispatch via DLT Gateway',
      description: 'Sends real-time price alerts and turnstile entry QR confirmations via WhatsApp Business API.',
      enabled: true,
      rolloutPercentage: 100,
      environment: 'PRODUCTION',
    },
    {
      key: 'require_strict_aadhaar_kyc',
      name: 'Mandatory DigiLocker KYC for Sellers > ₹50,000',
      description: 'Enforces PAN verification and DigiLocker XML Aadhaar KYC before listing high-tier stadium passes.',
      enabled: true,
      rolloutPercentage: 100,
      environment: 'PRODUCTION',
    },
  ]);

  const toggleFlag = (key: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const updateRollout = (key: string, pct: number) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, rolloutPercentage: pct } : f))
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              RUNTIME CONTROL &bull; ZERO-DOWNTIME TOGGLES
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            FEATURE FLAGS
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Control dynamic fee engines, queue concurrency gates, and compliance triggers in real time without redeploying code.
          </p>
        </div>

        <Button variant="primary" size="sm">
          CREATE NEW FLAG
        </Button>
      </div>

      {/* Flag Cards Grid */}
      <div className="space-y-4">
        {flags.map((flag) => (
          <div
            key={flag.key}
            className="p-6 bg-surface border border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-volt font-bold">{flag.key}</span>
                <span className="text-[10px] font-mono text-text-3 px-2 py-0.5 rounded-full bg-surface-2 border border-line">
                  {flag.environment}
                </span>
              </div>
              <div className="text-lg font-bold font-display uppercase tracking-tight text-text">
                {flag.name}
              </div>
              <p className="text-xs text-text-2 leading-relaxed">{flag.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto justify-end">
              {/* Rollout slider */}
              <div className="space-y-1 text-left sm:text-right">
                <div className="text-[11px] font-mono uppercase text-text-3">
                  ROLLOUT: <strong className="text-text tabular-nums">{flag.rolloutPercentage}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={flag.rolloutPercentage}
                  onChange={(e) => updateRollout(flag.key, parseInt(e.target.value, 10))}
                  disabled={!flag.enabled}
                  className="w-32 accent-volt"
                />
              </div>

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => toggleFlag(flag.key)}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-colors ${
                  flag.enabled
                    ? 'bg-volt text-black'
                    : 'bg-surface-2 text-text-3 border border-line'
                }`}
              >
                {flag.enabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
