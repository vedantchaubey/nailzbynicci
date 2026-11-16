// apps/frontend/src/app/admin/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@ticketpass/shared';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'KPI OVERVIEW' },
  { href: '/admin/events', label: 'EVENTS & VENUES' },
  { href: '/admin/finance', label: 'FINANCE & TAX' },
  { href: '/admin/reserve', label: 'RESERVE FUND' },
  { href: '/admin/fees', label: 'PLATFORM FEES' },
  { href: '/admin/disputes', label: 'DISPUTES & CLAIMS' },
  { href: '/admin/support', label: 'SUPPORT TRIAGE' },
  { href: '/admin/flags', label: 'FEATURE FLAGS' },
  { href: '/admin/escrow', label: 'ESCROW VAULT' },
  { href: '/admin/transfers', label: 'TRANSFERS' },
  { href: '/admin/kyc', label: 'KYC & IDENTITY' },
  { href: '/admin/cms', label: 'CMS & POLICIES' },
  { href: '/admin/queues', label: 'QUEUES & WORKERS' },
  { href: '/admin/audit-logs', label: 'SYSTEM AUDIT' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const loginWithDevAccount = useAuthStore((state) => state.loginWithDevAccount);

  const isAdmin =
    user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="bg-surface border-b border-line sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-text-3 hover:text-white transition-colors" title="Exit to Marketplace">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-volt" />
              <span className="font-bold text-xs uppercase tracking-wider font-mono text-white">
                TICKETPASS BACK-OFFICE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 border border-line text-volt">
                SUPERADMIN VAULT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => loginWithDevAccount('admin@ticketpass.dev', 'SUPER_ADMIN')}
                className="text-xs"
              >
                AUTH AS SUPERADMIN
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-text-3 font-mono">
                <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
                <span className="text-text-2">{user.email}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Admin Navigation Pills */}
      <div className="bg-surface-2 border-b border-line px-4 py-2 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-text text-black font-bold'
                      : 'text-text-3 hover:text-white hover:bg-surface'
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
