// apps/frontend/src/components/layout/navbar.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../providers/auth-provider';
import { SearchIcon, ShieldIcon, VerifiedSealGlyph } from '../icons/index';
import { Button } from '../ui/button';
import { Chip } from '../ui/chip';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, loginAs, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cmd+K hotkey for search command palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full h-[64px] transition-colors duration-200 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-6">
        {/* Left: Bold Display Wordmark */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          <span className="text-2xl font-black font-display uppercase tracking-tight text-white group-hover:text-volt transition-colors">
            TICKETPASS
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-volt" />
        </Link>

        {/* Centred Command-Search (Cmd/Ctrl-K) */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full h-10 px-4 bg-surface border border-line rounded-pill flex items-center justify-between text-text-3 hover:border-line-strong hover:text-text-2 transition-all"
          >
            <div className="flex items-center gap-2 text-[13px]">
              <SearchIcon size={16} />
              <span>Search artists, venues, sports drops...</span>
            </div>
            <kbd className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 border border-line text-text-3">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Navigation, KYC Status Chip & Persona Switcher */}
        <div className="flex items-center gap-3">
          {/* KYC Status Chip */}
          {user && (
            <Link href="/verify-identity">
              {user.kycStatus === 'VERIFIED' ? (
                <Chip variant="tag" className="bg-volt/10 text-volt border-volt/30 flex items-center gap-1">
                  <VerifiedSealGlyph size={12} className="text-volt" />
                  <span>VERIFIED</span>
                </Chip>
              ) : (
                <Chip variant="filter" className="text-pending border-pending/40">
                  VERIFY ID
                </Chip>
              )}
            </Link>
          )}

          <Link href="/sell" className="hidden sm:block">
            <Button size="sm" variant="secondary">
              SELL
            </Button>
          </Link>

          <Link href="/dashboard/buyer" className="hidden sm:block">
            <span className="text-[14px] font-bold uppercase tracking-wider text-text-2 hover:text-white px-2">
              ORDERS
            </span>
          </Link>

          {/* Quick Persona Switcher */}
          <div className="flex items-center gap-1 p-1 bg-surface border border-line rounded-pill">
            <button
              onClick={() => loginAs('buyer')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-pill uppercase transition-colors ${
                user?.role === 'USER' && user?.name.includes('Kavita')
                  ? 'bg-white text-black'
                  : 'text-text-3 hover:text-white'
              }`}
            >
              BUYER
            </button>
            <button
              onClick={() => loginAs('seller')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-pill uppercase transition-colors ${
                user?.role === 'USER' && user?.name.includes('Aditya')
                  ? 'bg-white text-black'
                  : 'text-text-3 hover:text-white'
              }`}
            >
              SELLER
            </button>
            <button
              onClick={() => loginAs('admin')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-pill uppercase transition-colors ${
                user?.role === 'SUPER_ADMIN'
                  ? 'bg-volt text-black'
                  : 'text-text-3 hover:text-white'
              }`}
            >
              ADMIN
            </button>
          </div>
        </div>
      </div>

      {/* Modal Command Palette when searchOpen */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-surface border border-line-strong rounded-[16px] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-line">
              <SearchIcon size={20} className="text-text-3 mr-3" />
              <input
                autoFocus
                placeholder="Type an event, stadium, or artist..."
                className="w-full h-14 bg-transparent text-white text-[16px] placeholder:text-text-3 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[11px] font-mono px-2 py-1 rounded bg-surface-2 text-text-3 border border-line"
              >
                ESC
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-3">
                Trending Drops
              </span>
              <Link
                href="/events/cmvjrqxgv000gcydvmb3k16sl"
                onClick={() => setSearchOpen(false)}
                className="p-3 rounded-[8px] hover:bg-surface-2 flex items-center justify-between transition-colors"
              >
                <span className="font-bold text-white text-[15px]">Coldplay: Music of the Spheres World Tour</span>
                <span className="text-[12px] font-mono text-volt">MUMBAI</span>
              </Link>
              <Link
                href="/events/cmvjrqxnz000hcydvcg5zgslm"
                onClick={() => setSearchOpen(false)}
                className="p-3 rounded-[8px] hover:bg-surface-2 flex items-center justify-between transition-colors"
              >
                <span className="font-bold text-white text-[15px]">Diljit Dosanjh: Dil-Luminati Tour 2026</span>
                <span className="text-[12px] font-mono text-volt">DELHI</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
