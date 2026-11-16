// apps/frontend/src/app/grievance/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function GrievancePage() {
  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            STATUTORY COMPLIANCE
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          GRIEVANCE REDRESSAL
        </h1>
        <p className="text-xs font-mono text-text-3">
          IN COMPLIANCE WITH IT ACT 2000 &amp; CONSUMER PROTECTION (E-COMMERCE) RULES 2020
        </p>
      </div>

      {/* Grievance Officer Card */}
      <div className="mt-12 p-8 border border-line bg-surface space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-volt">
            NODAL GRIEVANCE OFFICER
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight font-display text-text mt-1">
            REGULATORY &amp; LEGAL COMPLIANCE DESK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line text-sm font-mono">
          <div>
            <span className="text-[10px] text-text-3 uppercase">DESIGNATION</span>
            <p className="text-text font-bold mt-1">Head of Regulatory Compliance</p>
          </div>
          <div>
            <span className="text-[10px] text-text-3 uppercase">EMAIL</span>
            <p className="text-text font-bold mt-1">grievance@ticketpass.dev</p>
          </div>
          <div>
            <span className="text-[10px] text-text-3 uppercase">REGISTERED OFFICE</span>
            <p className="text-text font-bold mt-1">Bandra-Kurla Complex (BKC), Mumbai, MH 400051</p>
          </div>
          <div>
            <span className="text-[10px] text-text-3 uppercase">ACKNOWLEDGEMENT TIMELINE</span>
            <p className="text-volt font-bold mt-1">Within 48 hours of receipt</p>
          </div>
        </div>

        <div className="p-4 bg-surface-2 border border-line text-xs text-text-2 space-y-2">
          <p>
            • Every grievance is assigned a unique reference tracking number.
          </p>
          <p>
            • The Grievance Officer shall investigate and resolve user complaints within a maximum of 15 business days from the date of receipt.
          </p>
        </div>
      </div>
    </div>
  );
}
