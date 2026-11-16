// apps/frontend/src/components/transfer/warnings-banner.tsx
import React from 'react';
import { Platform } from '@ticketpass/shared';
import { AlertTriangle, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

interface WarningsBannerProps {
  platform: Platform;
  type: 'pre-transfer' | 'bms-urgency' | 'district-reverse' | 'verified-ownership' | 'refunded';
}

export function WarningsBanner({ platform, type }: WarningsBannerProps) {
  const platformName = platform === Platform.BOOKMYSHOW ? 'BookMyShow' : 'District by Zomato';

  if (type === 'verified-ownership') {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 shadow-sm text-emerald-950">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-emerald-950 mb-1">
              Ticket Ownership Confirmed In Your Official App!
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Your tickets now live directly inside your <strong>{platformName}</strong> account.
              Remember: <strong>TicketPass NEVER issues PDF/QR tickets or download links</strong>.
              Static screenshots and printouts are strictly rejected at the stadium gates. When arriving
              at the event, simply open your {platformName} mobile app to display the live dynamic M-Ticket.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'district-reverse') {
    return (
      <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-950">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block text-red-950 font-bold mb-0.5">
              CRITICAL DISTRICT ANTI-SCAM RULE: NEVER TRANSFER TICKETS BACK!
            </strong>
            Under District (by Zomato) terms, only the receiver can initiate a reverse transfer. If
            anyone contacts you via SMS, WhatsApp, or Instagram claiming they transferred in error or
            asking you to &quot;Send back&quot;, <strong>IGNORE &amp; REPORT THEM</strong>. Reverse-transferring
            permanently surrenders your tickets.
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bms-urgency') {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block text-amber-950 font-bold mb-0.5">
              BookMyShow Acceptance Timer Active (60 Minutes)
            </strong>
            Under BookMyShow rules, the seller retains the ability to tap &quot;Cancel request&quot;
            until you accept. Please open your BookMyShow app now, navigate to your booking notifications,
            and accept the transfer immediately.
          </div>
        </div>
      </div>
    );
  }

  if (type === 'refunded') {
    return (
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-300 text-gray-800">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block text-gray-900 font-bold mb-0.5">
              Escrow Funds Successfully Reconciled &amp; Refunded
            </strong>
            Due to an SLA expiration or cancellation, the full escrow amount has been returned to
            the original payment method. Payouts for this session are permanently closed.
          </div>
        </div>
      </div>
    );
  }

  // Pre-transfer notice
  return (
    <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <strong>TicketPass Escrow Architecture:</strong> Tickets move exclusively within official
        organizer apps ({platformName}). TicketPass never hosts, downloads, or generates barcodes.
      </div>
    </div>
  );
}
