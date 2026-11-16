// apps/frontend/src/app/settings/payouts/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsNav } from '../../../components/settings/settings-nav';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { IconLock, IconVerifiedSeal } from '../../../components/icons';

export default function PayoutsSettingsPage() {
  const [accountName, setAccountName] = useState('Rahul Kumar Verma');
  const [accountNumber, setAccountNumber] = useState('••••••••5492');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [upi, setUpi] = useState('rahul@okhdfcbank');
  const [pan, setPan] = useState('ABCDE1234F');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-3">
          DISBURSEMENT COORDINATES
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
          SETTINGS
        </h1>
      </div>

      <SettingsNav />

      <div className="space-y-8">
        {/* Verification Status */}
        <div className="p-6 border border-line bg-surface flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-volt">
              <IconVerifiedSeal size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-text-3">BANK NAME-MATCH ACCURACY</span>
              <p className="text-base font-bold font-display uppercase tracking-tight text-text">
                100% MATCH WITH DIGILOCKER IDENTITY
              </p>
              <p className="text-xs text-text-3 font-mono">
                Penny-drop verified via Setu / Cashfree Banking API
              </p>
            </div>
          </div>
        </div>

        {/* Bank Form */}
        <form onSubmit={handleSave} className="p-8 border border-line bg-surface space-y-6">
          <h3 className="text-lg font-bold uppercase tracking-tight font-display">
            PRIMARY BANK ACCOUNT (IMPS / NEFT)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">ACCOUNT HOLDER NAME</label>
              <Input
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">ACCOUNT NUMBER</label>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">IFSC CODE</label>
              <Input
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                className="font-mono uppercase"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">VIRTUAL PAYMENT ADDRESS (UPI)</label>
              <Input
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-line space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-tight font-display">
                TAX &amp; PAN PROFILE
              </h4>
              <p className="text-xs text-text-3 font-mono mt-0.5">
                Required under Section 194-O for annual secondary ticket payouts exceeding ₹5,00,000.
              </p>
            </div>

            <div className="max-w-xs space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">PERMANENT ACCOUNT NUMBER (PAN)</label>
              <Input
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="font-mono uppercase"
              />
            </div>
          </div>

          <div className="p-3 bg-surface-2 border border-line text-xs font-mono text-text-3 flex items-start gap-2">
            <IconLock size={14} className="shrink-0 mt-0.5 text-text-2" />
            <span>
              Bank coordinates and PAN are encrypted at rest with hardware-backed AES-256-GCM. Payouts are dispatched within 2 business hours of ticket verification.
            </span>
          </div>

          {saved && (
            <div className="p-3 bg-volt/10 border border-volt/40 text-xs font-mono text-volt">
              PAYOUT COORDINATES SAVED AND VERIFIED
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-line">
            <Button type="submit" variant="primary" size="sm">
              UPDATE PAYOUT DETAILS
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
