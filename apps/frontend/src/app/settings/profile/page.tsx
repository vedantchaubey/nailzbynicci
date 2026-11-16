// apps/frontend/src/app/settings/profile/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../../stores/auth.store';
import { SettingsNav } from '../../../components/settings/settings-nav';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { IconVerifiedSeal, IconCheck } from '../../../components/icons';

export default function ProfileSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user?.name || 'Rahul Verma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-3">
          ACCOUNT PREFERENCES
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
          SETTINGS
        </h1>
      </div>

      <SettingsNav />

      {/* Profile Form */}
      <div className="space-y-8">
        {/* DigiLocker Status Callout */}
        <div className="p-6 border border-line bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-volt">
              <IconVerifiedSeal size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-text-3">GOVERNMENT IDENTITY</span>
              <p className="text-base font-bold font-display uppercase tracking-tight text-text">
                {user?.kycStatus === 'VERIFIED' ? 'DIGILOCKER VERIFIED' : 'KYC PENDING'}
              </p>
              <p className="text-xs text-text-3 font-mono">
                Aadhaar verified via MeitY DigiLocker protocol (DPDP Act 2023 compliant)
              </p>
            </div>
          </div>

          <Link href="/verify-identity">
            <Button variant="secondary" size="sm">
              {user?.kycStatus === 'VERIFIED' ? 'VIEW VERIFICATION' : 'COMPLETE KYC'}
            </Button>
          </Link>
        </div>

        {/* Basic Info Form */}
        <form onSubmit={handleSave} className="p-8 border border-line bg-surface space-y-6">
          <h3 className="text-lg font-bold uppercase tracking-tight font-display">
            PERSONAL DETAILS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">FULL LEGAL NAME</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="text-[10px] font-mono text-text-3">
                Must match your bank account and BookMyShow app name
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">EMAIL ADDRESS</label>
              <Input
                type="email"
                value={user?.email || 'user@ticketpass.dev'}
                disabled
                className="opacity-60 cursor-not-allowed"
              />
              <span className="text-[10px] font-mono text-text-3">
                Managed via authentication provider
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-text-3">IN-APP MOBILE NUMBER</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <span className="text-[10px] font-mono text-text-3">
                The mobile number registered in your BookMyShow and District apps
              </span>
            </div>
          </div>

          {saved && (
            <div className="p-3 bg-volt/10 border border-volt/40 text-xs font-mono text-volt">
              PROFILE CHANGES SAVED SUCCESSFULLY
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-line">
            <Button type="submit" variant="primary" size="sm">
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
