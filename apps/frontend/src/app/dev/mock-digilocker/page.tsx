// apps/frontend/src/app/dev/mock-digilocker/page.tsx
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { ShieldIcon, CheckIcon, LockIcon } from '../../../components/icons/index';

const MOCK_PROFILES = [
  {
    id: 'mock_id_rahul',
    name: 'Rahul Kumar Verma',
    dob: '1995-04-12',
    gender: 'Male',
    state: 'Maharashtra',
    aadhaarLast4: '4821',
    badge: 'Standard Adult Verified',
  },
  {
    id: 'mock_id_priya',
    name: 'Priya Sharma',
    dob: '1998-08-23',
    gender: 'Female',
    state: 'Delhi',
    aadhaarLast4: '9134',
    badge: 'Standard Adult Verified',
  },
  {
    id: 'mock_id_vikram',
    name: 'Vikram Malhotra',
    dob: '1992-11-05',
    gender: 'Male',
    state: 'Karnataka',
    aadhaarLast4: '7740',
    badge: 'Adult Verified',
  },
  {
    id: 'mock_id_underage',
    name: 'Aryan Kid Mehra',
    dob: '2012-05-10',
    gender: 'Male',
    state: 'Maharashtra',
    aadhaarLast4: '1122',
    badge: 'UNDERAGE (<18) TEST',
  },
  {
    id: 'mock_id_banned',
    name: 'Banned Fraudster identity',
    dob: '1985-01-01',
    gender: 'Male',
    state: 'Haryana',
    aadhaarLast4: '6666',
    badge: 'BANNED IDENTITY TEST',
  },
];

export default function MockDigiLockerPage() {
  const searchParams = useSearchParams();
  const state = searchParams?.get('state') || '';
  const nonce = searchParams?.get('nonce') || '';

  const [selectedId, setSelectedId] = React.useState(MOCK_PROFILES[0].id);

  const handleApprove = () => {
    const callbackUrl = `http://localhost:4000/api/v1/kyc/callback?state=${state}&code=identity:${selectedId}`;
    window.location.href = callbackUrl;
  };

  const handleCancel = () => {
    const callbackUrl = `http://localhost:4000/api/v1/kyc/callback?state=${state}&error=user_cancelled`;
    window.location.href = callbackUrl;
  };

  return (
    <div className="min-h-screen bg-[#0E1525] text-white p-6 md:p-12 flex flex-col items-center justify-center select-none font-sans">
      <div className="w-full max-w-xl bg-[#1B2438] border border-[#2B3856] rounded-[20px] p-8 shadow-2xl flex flex-col gap-6">
        {/* DigiLocker Header Simulation */}
        <div className="flex items-center justify-between border-b border-[#2B3856] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0052CC] flex items-center justify-center font-bold text-white text-lg">
              DL
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white text-lg">DigiLocker Consent</span>
              <span className="text-[12px] text-gray-400">Government of India · API Setu Sandbox</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold">
            DEV ENVIRONMENT
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">TicketPass is requesting access</h2>
          <p className="text-sm text-gray-300 mt-1">
            Select a simulated government identity below to approve and return verified credentials:
          </p>
        </div>

        {/* Identity Radio Cards */}
        <div className="flex flex-col gap-3">
          {MOCK_PROFILES.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`p-4 rounded-[12px] border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0052CC] bg-[#0052CC]/10'
                    : 'border-[#2B3856] bg-[#141C2E] hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="mock-profile"
                      checked={isSelected}
                      onChange={() => setSelectedId(p.id)}
                      className="w-4 h-4 text-[#0052CC]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-[15px]">{p.name}</span>
                      <span className="text-[12px] text-gray-400 font-mono">
                        DOB: {p.dob} · State: {p.state} · Aadhaar: XXXX-XXXX-{p.aadhaarLast4}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.badge.includes('UNDERAGE') || p.badge.includes('BANNED')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#2B3856]">
          <Button
            size="lg"
            variant="primary"
            onClick={handleApprove}
            className="flex-1 bg-[#0052CC] text-white hover:bg-[#0747A6] font-bold"
          >
            APPROVE &amp; SHARE
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={handleCancel}
            className="flex-1 text-gray-300 border-[#2B3856]"
          >
            DENY
          </Button>
        </div>
      </div>
    </div>
  );
}
