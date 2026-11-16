// apps/frontend/src/app/privacy/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            DPDP ACT 2023 COMPLIANCE
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          PRIVACY POLICY
        </h1>
        <p className="text-xs font-mono text-text-3">
          VERSION 1.0.0 · DIGITAL PERSONAL DATA PROTECTION COMPLIANT
        </p>
      </div>

      {/* Content */}
      <div className="mt-12 space-y-12 text-text-2 text-sm leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            1. ZERO AADHAAR &amp; BIOMETRIC STORAGE COMMITMENT
          </h2>
          <p>
            TicketPass adheres strictly to Section 8 of the Digital Personal Data Protection Act, 2023 and the Aadhaar Act, 2016.
          </p>
          <div className="p-4 border border-line bg-surface text-text font-mono text-xs space-y-1">
            <p>• FULL 12-DIGIT AADHAAR NUMBERS ARE NEVER STORED IN OUR DATABASE.</p>
            <p>• BIOMETRIC DATA (FINGERPRINTS, IRIS SCANS) IS NEVER REQUESTED OR PROCESSED.</p>
            <p>• ORIGINAL GOVT XML / PDF FILES ARE EPHEMERALLY PARSED AND DISCARDED.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            2. DATA WE PROCESS &amp; WHY
          </h2>
          <div className="divide-y divide-line border border-line bg-surface">
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <span className="font-mono text-xs text-text">Salted Identity Fingerprint</span>
              <span className="text-xs text-text-3">Anti-fraud multi-account &amp; self-dealing prevention</span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <span className="font-mono text-xs text-text">Masked Aadhaar (Last 4 digits)</span>
              <span className="text-xs text-text-3">Buyer/seller friction confirmation during ticket handover</span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <span className="font-mono text-xs text-text">Bank Account Coordinates</span>
              <span className="text-xs text-text-3">AES-256-GCM encrypted; used solely for IMPS/NEFT payouts</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            3. YOUR RIGHTS &amp; DATA ERASURE
          </h2>
          <p>
            You have the right to review, update, export, or withdraw consent and delete your personal data at any time via your Account Settings.
          </p>
        </section>
      </div>
    </div>
  );
}
