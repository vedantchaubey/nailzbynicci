// apps/frontend/src/components/settings/settings-nav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SettingsNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/settings/profile', label: 'PROFILE' },
    { href: '/settings/security', label: 'SECURITY & 2FA' },
    { href: '/settings/notifications', label: 'NOTIFICATIONS' },
    { href: '/settings/payouts', label: 'PAYOUT DESTINATION' },
    { href: '/settings/privacy', label: 'PRIVACY & DATA' },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-line pb-4 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-colors shrink-0 ${
              active
                ? 'bg-text text-bg font-bold'
                : 'text-text-3 hover:text-text hover:bg-surface'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
