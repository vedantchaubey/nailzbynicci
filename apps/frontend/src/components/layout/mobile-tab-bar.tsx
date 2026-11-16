// apps/frontend/src/components/layout/mobile-tab-bar.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TicketIcon,
  SearchIcon,
  PlusIcon,
  ReceiptIcon,
  UserIcon,
} from '../icons/index';

const TABS = [
  { href: '/', label: 'HOME', icon: TicketIcon },
  { href: '/events/browse', label: 'DROPS', icon: SearchIcon },
  { href: '/sell', label: 'SELL', icon: PlusIcon },
  { href: '/dashboard/buyer', label: 'ORDERS', icon: ReceiptIcon },
  { href: '/dashboard/seller', label: 'PROFILE', icon: UserIcon },
];

export const MobileTabBar: React.FC = () => {
  const pathname = usePathname();

  // Hide on checkout or full-screen transfer room flows
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/transfer')) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[64px] bg-black/85 backdrop-blur-md border-t border-line flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] select-none"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          tab.href === '/' ? pathname === '/' : pathname?.startsWith(tab.href);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
              isActive ? 'text-white' : 'text-text-3 hover:text-text-2'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
              {tab.label}
            </span>

            {/* Active Volt Dot */}
            {isActive && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-volt" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
