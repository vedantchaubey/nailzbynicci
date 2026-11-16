// apps/frontend/src/components/transfer/confirm-acceptance-form.tsx
import React, { useState } from 'react';
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { UploadPurpose, Platform } from '@ticketpass/shared';
import { apiClient } from '../../lib/api-client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardContent } from '../ui/card';
import { ScreenshotDropzone } from './screenshot-dropzone';

interface ConfirmAcceptanceFormProps {
  orderId: string;
  platform: Platform;
  sellerAppPhoneHint?: string;
  onConfirmed: () => void;
}

export function ConfirmAcceptanceForm({
  orderId,
  platform,
  sellerAppPhoneHint,
  onConfirmed,
}: ConfirmAcceptanceFormProps) {
  const [last4Digits, setLast4Digits] = useState('');
  const [proofUploadId, setProofUploadId] = useState<string | undefined>(undefined);
  const [hasAcceptedInApp, setHasAcceptedInApp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const platformName = platform === Platform.BOOKMYSHOW ? 'BookMyShow' : 'District by Zomato';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (last4Digits.trim().length !== 4) {
      setError('Please enter exactly 4 digits for the verification friction check.');
      return;
    }

    if (!hasAcceptedInApp) {
      setError(`You must confirm that you have accepted the tickets inside your ${platformName} app first.`);
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post(`/orders/${orderId}/buyer/confirm-acceptance`, {
        last4Digits: last4Digits.trim(),
        proofUploadId,
      });

      setSuccess(true);
      onConfirmed();
    } catch (err: any) {
      console.error('Failed to confirm ticket acceptance:', err);
      setError(err?.message || 'Verification friction check failed. Please check the digits and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="border-emerald-300 bg-emerald-50/50 p-6 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Acceptance Confirmed!</h3>
        <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
          Your confirmation has been submitted to the TicketPass verification engine. Signal A has been passed and confidence evaluation is underway.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-brand-200 bg-white shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brand-50 to-white pb-3 border-b border-brand-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          <div>
            <h3 className="text-sm font-bold text-gray-900">Buyer Transfer Receipt Confirmation</h3>
            <p className="text-[11px] text-gray-500">Signal A Friction Security Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
          <Lock className="w-3 h-3 text-emerald-600" />
          Escrow Active
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-xs text-gray-600 leading-relaxed">
            Before TicketPass releases the seller&apos;s payout, you must verify that the ticket is securely
            sitting in your {platformName} account. To prevent accidental clicks, enter the last 4 digits
            of the seller&apos;s phone number or transfer reference shown in your {platformName} transfer notification.
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Friction Check: Last 4 digits of sender phone / booking ID
              {sellerAppPhoneHint && (
                <span className="text-gray-400 font-normal ml-1">
                  (Sender phone ends in ...{sellerAppPhoneHint.slice(-4)})
                </span>
              )}
            </label>
            <Input
              type="text"
              maxLength={4}
              value={last4Digits}
              onChange={(e) => setLast4Digits(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 5432"
              className="font-mono text-center text-lg tracking-widest w-40"
              required
            />
          </div>

          {/* Optional In-app screenshot dropzone */}
          <div>
            <ScreenshotDropzone
              orderId={orderId}
              purpose={UploadPurpose.BUYER_ACCEPT_PROOF}
              title={`Optional: Upload ${platformName} Acceptance Screenshot`}
              description="Taking a screenshot of your accepted ticket in BookMyShow/District gives you +20 bonus confidence points and accelerates immediate escrow release."
              onUploadSuccess={(upload) => setProofUploadId(upload.id)}
            />
          </div>

          {/* Checkbox acknowledgement */}
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-700 select-none">
              <input
                type="checkbox"
                checked={hasAcceptedInApp}
                onChange={(e) => setHasAcceptedInApp(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="leading-snug">
                I confirm that I opened my <strong>{platformName}</strong> app, tapped{' '}
                <strong>Accept</strong>, and the live ticket / M-Ticket is now active in my personal booking history.
              </span>
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-md text-sm font-bold"
            disabled={submitting || !hasAcceptedInApp || last4Digits.length !== 4}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validating Friction Check &amp; Scoring...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Confirm Ticket Accepted in {platformName}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
