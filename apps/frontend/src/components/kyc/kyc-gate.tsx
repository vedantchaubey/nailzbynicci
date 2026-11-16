// apps/frontend/src/components/kyc/kyc-gate.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '../providers/auth-provider';
import { ShieldIcon, VerifiedSealGlyph, ArrowUpRightIcon } from '../icons/index';
import { Button } from '../ui/button';

export interface KycGateProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  actionTitle?: string;
}

export const KycGate: React.FC<KycGateProps> = ({
  children,
  fallbackMessage = 'To protect buyers and sellers against fraud, identity verification via DigiLocker is required before completing this action.',
  actionTitle = 'IDENTITY VERIFICATION REQUIRED',
}) => {
  const { user } = useAuth();

  const isVerified = user?.kycStatus === 'VERIFIED';

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="w-full p-6 md:p-8 rounded-[16px] border border-line bg-surface flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 text-volt text-[12px] font-bold tracking-wider uppercase">
        <ShieldIcon size={16} />
        <span>{actionTitle}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight text-white">
        Verify Your Identity to Continue
      </h3>

      <p className="text-text-2 text-[14px] max-w-xl leading-relaxed">
        {fallbackMessage}
      </p>

      <div className="flex items-center gap-3 mt-2">
        <Link href="/verify-identity">
          <Button size="md" variant="primary" className="flex items-center gap-2">
            <span>VERIFY WITH DIGILOCKER</span>
            <ArrowUpRightIcon size={16} />
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-[12px] text-text-3 border-t border-line/60 pt-4 mt-2 w-full">
        <span className="flex items-center gap-1.5">
          <VerifiedSealGlyph size={14} className="text-volt" />
          <span>Government-verified</span>
        </span>
        <span>·</span>
        <span>Zero document storage</span>
        <span>·</span>
        <span>DPDP Act 2023 Compliant</span>
      </div>
    </div>
  );
};
