// apps/frontend/src/components/layout/footer.tsx
import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { LEGAL_TERMS } from '@ticketpass/shared';

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-white text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-serif text-lg font-bold text-gray-900">TicketPass</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              India’s verified ownership transfer marketplace for sold-out sports matches, concerts, and live entertainment. Escrow-protected account-to-account transfers.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-xs text-gray-500">
              <span className="flex items-center space-x-1.5">
                <Lock className="h-3.5 w-3.5 text-brand-600" />
                <span>100% Escrow Protected</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                <span>No PDF / Barcode Scams</span>
              </span>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Marketplace</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-gray-900 transition-colors">
                  Sell My Ticket
                </Link>
              </li>
              <li>
                <Link href="/dashboard/buyer" className="hover:text-gray-900 transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/dashboard/seller" className="hover:text-gray-900 transition-colors">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Trust & Legal</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-gray-900 transition-colors">
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Non-Hosting Notice & Legal Disclaimer */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 text-xs text-gray-500 leading-relaxed space-y-1.5">
            <p>
              <strong className="text-gray-700">Legal Notice: </strong>
              {LEGAL_TERMS.FOOTER_DISCLAIMER}
            </p>
            <p>
              <strong className="text-gray-700">In-App Transfer Architecture: </strong>
              {LEGAL_TERMS.TICKET_NON_HOSTING_NOTICE}
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} TicketPass Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
