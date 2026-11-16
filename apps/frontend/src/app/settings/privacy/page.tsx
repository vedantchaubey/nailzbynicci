// apps/frontend/src/app/settings/privacy/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsNav } from '../../../components/settings/settings-nav';
import { Button } from '../../../components/ui/button';

export default function PrivacySettingsPage() {
  const [downloading, setDownloading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDownloadData = () => {
    setDownloading(true);
    setTimeout(() => {
      const data = {
        exportedAt: new Date().toISOString(),
        user: { name: 'Rahul Verma', email: 'user@ticketpass.dev', phone: '+91 98765 43210' },
        consents: [
          { policy: 'TERMS', version: '1.0.0', date: '2026-11-01' },
          { policy: 'PRIVACY', version: '1.0.0', date: '2026-11-01' },
          { policy: 'DIGILOCKER_KYC', version: '1.0.0', date: '2026-11-01' },
        ],
        auditNotice: 'Full Aadhaar and biometrics are never stored per DPDP Act 2023.',
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticketpass_data_export_${Date.now()}.json`;
      a.click();
      setDownloading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-3">
          DATA PROTECTION &amp; ERASURE
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
          SETTINGS
        </h1>
      </div>

      <SettingsNav />

      <div className="space-y-8">
        {/* Export Data */}
        <div className="p-8 border border-line bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <h3 className="text-xl font-bold uppercase tracking-tight font-display">
              DOWNLOAD PERSONAL DATA ARCHIVE
            </h3>
            <p className="text-xs text-text-2">
              Export an archive containing your profile attributes, consent records, order timelines, and payment receipts in standard JSON format.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadData}
            disabled={downloading}
          >
            {downloading ? 'GENERATING...' : 'DOWNLOAD DATA'}
          </Button>
        </div>

        {/* Delete Account */}
        <div className="p-8 border border-risk/40 bg-surface space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-risk">PERMANENT ACTION</span>
            <h3 className="text-xl font-bold uppercase tracking-tight font-display text-text">
              SAFE ACCOUNT DELETION &amp; ANONYMIZATION
            </h3>
            <p className="text-xs text-text-2 max-w-xl">
              In accordance with DPDP Act 2023, you may request complete erasure of your account. Deletion is automatically deferred if you have active ticket transfers, locked escrow payments, or pending bank disbursements.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDeleteModal(true)}
            className="text-risk border-risk/40 hover:bg-risk/10"
          >
            REQUEST ACCOUNT DELETION
          </Button>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-risk/60 p-6 space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-tight font-display text-text">
              CONFIRM ACCOUNT DELETION
            </h3>
            <p className="text-xs text-text-2">
              All personal identifiers will be permanently anonymized. You will lose access to active orders, warranty receipts, and seller reputation score.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeleteModal(false)}
                className="flex-1"
              >
                CANCEL
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert('Deletion request acknowledged. Account queued for DPDP anonymization.');
                  setDeleteModal(false);
                }}
                className="flex-1 bg-risk text-white hover:bg-risk/90"
              >
                PROCEED
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
