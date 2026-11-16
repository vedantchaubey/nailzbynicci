// apps/frontend/src/app/status/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function StatusPage() {
  const services = [
    { name: 'Escrow Custody Vault (PostgreSQL / BullMQ)', status: 'OPERATIONAL', latency: '24ms' },
    { name: 'DigiLocker Govt KYC Identity Gateway', status: 'OPERATIONAL', latency: '120ms' },
    { name: 'Razorpay Payment & Refund Webhooks', status: 'OPERATIONAL', latency: '85ms' },
    { name: 'Autonomous Verification OCR Engine', status: 'OPERATIONAL', latency: '240ms' },
    { name: 'WebSocket Realtime Drop Activity Feed', status: 'OPERATIONAL', latency: '12ms' },
    { name: 'IMPS / NEFT Direct Bank Payout Dispatch', status: 'OPERATIONAL', latency: '110ms' },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-volt animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            SYSTEM HEALTH MONITOR
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          ALL SYSTEMS OPERATIONAL
        </h1>
        <p className="text-xs font-mono text-text-3">
          99.98% UPTIME OVER PAST 90 DAYS · REAL-TIME INFRASTRUCTURE STATUS
        </p>
      </div>

      {/* Services List */}
      <div className="mt-12 divide-y divide-line border-t border-b border-line">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-base font-bold font-display uppercase tracking-tight text-text">
                {svc.name}
              </p>
              <span className="text-xs font-mono text-text-3">
                p95 response: {svc.latency}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-volt" />
              <span className="text-xs font-mono uppercase text-volt">
                {svc.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SLA Commitment */}
      <div className="mt-16 p-6 border border-line bg-surface-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-tight font-display">
            HIGH AVAILABILITY COMMITMENT
          </h4>
          <p className="text-xs text-text-3 font-mono mt-0.5">
            Distributed Redis memory cache + Neon PostgreSQL read replicas.
          </p>
        </div>
        <Link href="/contact" className="text-xs font-mono text-volt underline">
          REPORT AN OUTAGE
        </Link>
      </div>
    </div>
  );
}
