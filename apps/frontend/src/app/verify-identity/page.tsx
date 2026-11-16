// apps/frontend/src/app/verify-identity/page.tsx
'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../components/providers/auth-provider';
import { apiClient } from '../../lib/api-client';
import { Button } from '../../components/ui/button';
import { Chip } from '../../components/ui/chip';
import {
  ShieldIcon,
  VerifiedSealGlyph,
  CheckIcon,
  CloseIcon,
  LockIcon,
  ArrowUpRightIcon,
} from '../../components/icons/index';

export default function VerifyIdentityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, fetchMe } = useAuth();

  const [hasConsented, setHasConsented] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const kycResult = searchParams?.get('kyc');
  const failureReason = searchParams?.get('reason');

  React.useEffect(() => {
    if (kycResult === 'success') {
      fetchMe();
    }
  }, [kycResult, fetchMe]);

  const handleStartKyc = async () => {
    if (!hasConsented) {
      setErrorMessage('Please accept the consent terms to proceed with government identity verification.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.post<{ authorizationUrl: string; sessionId: string }>(
        '/kyc/start',
        { redirectTo: '/verify-identity' },
      );

      if (response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(
        err?.response?.data?.message || 'Failed to start DigiLocker session. Please try again shortly.',
      );
    }
  };

  const handleWithdrawConsent = async () => {
    if (!confirm('Are you sure you want to withdraw your identity consent? This will soft-delete your verified status and restrict future purchases and sales until you re-verify.')) {
      return;
    }

    setIsWithdrawing(true);
    try {
      await apiClient.post('/kyc/withdraw');
      await fetchMe();
      alert('Your identity verification consent has been withdrawn and personal data removed.');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to withdraw consent.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const isVerified = user?.kycStatus === 'VERIFIED';

  return (
    <div className="min-h-screen bg-bg text-text py-12 px-4 md:px-8 max-w-3xl mx-auto flex flex-col gap-8 select-none">
      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ShieldIcon size={18} className="text-volt" />
          <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
            GOVERNMENT IDENTITY VERIFICATION
          </span>
        </div>

        <h1 className="type-section-title text-white">
          DIGILOCKER KYC
        </h1>

        <p className="text-text-2 text-[15px] leading-relaxed">
          To maintain an authentic marketplace free of scalpers, counterfeit tickets, and multiple dummy accounts, every TicketPass buyer and seller verifies their identity once per year through DigiLocker.
        </p>
      </div>

      {/* Result Banners */}
      {kycResult === 'success' && (
        <div className="p-6 rounded-[12px] bg-volt/10 border border-volt/30 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-volt text-black flex items-center justify-center shrink-0 mt-0.5">
            <CheckIcon size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold uppercase tracking-tight text-white">
              Identity Verified
            </span>
            <span className="text-[14px] text-text-2">
              Your identity has been authenticated through DigiLocker. You can now purchase tickets, create listings, and receive escrow payouts.
            </span>
          </div>
        </div>
      )}

      {kycResult === 'failed' && (
        <div className="p-6 rounded-[12px] bg-risk/10 border border-risk/30 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-risk text-white flex items-center justify-center shrink-0 mt-0.5">
            <CloseIcon size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold uppercase tracking-tight text-white">
              Verification Failed
            </span>
            <span className="text-[14px] text-text-2">
              {failureReason === 'UNDERAGE'
                ? 'You must be at least 18 years old to transact on TicketPass.'
                : failureReason === 'DUPLICATE_IDENTITY'
                ? 'This government identity is already linked to another active TicketPass account.'
                : failureReason === 'BANNED_IDENTITY'
                ? 'This identity is restricted due to prior marketplace violations.'
                : 'DigiLocker consent was cancelled or could not be validated. Please try again.'}
            </span>
          </div>
        </div>
      )}

      {/* Already Verified Status Card */}
      {isVerified ? (
        <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VerifiedSealGlyph size={20} className="text-volt" />
              <span className="text-xl font-bold uppercase tracking-tight text-white">
                Status: Verified
              </span>
            </div>
            <Chip variant="live" pulse>ACTIVE</Chip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] border-t border-line pt-4">
            <div>
              <span className="text-text-3 block text-[12px] uppercase">Verified Name</span>
              <span className="font-bold text-white text-[16px]">{user?.name}</span>
            </div>
            <div>
              <span className="text-text-3 block text-[12px] uppercase">Validity</span>
              <span className="font-mono text-text-2">365 Days (Annual Re-verification)</span>
            </div>
          </div>

          <div className="border-t border-line pt-4 flex items-center justify-between">
            <span className="text-[12px] text-text-3">
              Right to Erasure under DPDP Act 2023:
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleWithdrawConsent}
              isLoading={isWithdrawing}
            >
              WITHDRAW CONSENT
            </Button>
          </div>
        </div>
      ) : (
        /* Unverified Onboarding Flow */
        <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
          <h2 className="text-xl font-black font-display uppercase tracking-tight text-white">
            What Data We Receive vs Never Store
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-[12px] bg-surface-2 border border-line flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-volt flex items-center gap-1.5">
                <CheckIcon size={14} />
                <span>WHAT WE RECEIVE</span>
              </span>
              <ul className="text-[13px] text-text-2 space-y-1.5 list-disc pl-4">
                <li>Your legal full name</li>
                <li>Date of birth (age check &gt;= 18)</li>
                <li>State of residence</li>
                <li>Masked last 4 digits of Aadhaar (e.g. XXXX-XXXX-4821)</li>
              </ul>
            </div>

            <div className="p-4 rounded-[12px] bg-surface-2 border border-line flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-risk flex items-center gap-1.5">
                <LockIcon size={14} />
                <span>WHAT WE NEVER SEE OR STORE</span>
              </span>
              <ul className="text-[13px] text-text-2 space-y-1.5 list-disc pl-4">
                <li>Full 12-digit Aadhaar number</li>
                <li>Aadhaar XML or biometric data</li>
                <li>Your DigiLocker password, PIN, or OTP</li>
                <li>Your original government documents or photos</li>
              </ul>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-surface-2 rounded-[12px] border border-line">
            <input
              id="consent-checkbox"
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-line text-volt focus:ring-volt cursor-pointer"
            />
            <label htmlFor="consent-checkbox" className="text-[13px] text-text-2 leading-relaxed cursor-pointer">
              I give explicit, user-initiated consent to verify my identity via DigiLocker. I understand TicketPass only stores my verified name, masked last-4 digits, and a salted hash to prevent multi-account scalping in accordance with India’s Digital Personal Data Protection (DPDP) Act 2023.
            </label>
          </div>

          {errorMessage && (
            <span className="text-[13px] text-risk font-medium">{errorMessage}</span>
          )}

          <Button
            size="lg"
            variant="primary"
            onClick={handleStartKyc}
            isLoading={isLoading}
            className="w-full flex items-center justify-center gap-2 font-bold"
          >
            <span>PROCEED TO DIGILOCKER CONSENT</span>
            <ArrowUpRightIcon size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
