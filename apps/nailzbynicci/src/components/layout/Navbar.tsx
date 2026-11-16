'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { locale, toggleLocale, t } = useLanguage()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { name: t('Über Nicci', 'About'), href: '/#about' },
    { name: t('Arbeiten', 'Work'), href: '/#work' },
    { name: t('Press-Ons', 'Press-ons'), href: '/#press-ons' },
    { name: t('Preise', 'Prices'), href: '/#prices' },
    { name: t('Buchung & Regeln', 'Book / Policies'), href: '/#book' },
  ]

  return (
    <>
      {/* 
        Readymag Neo-Brutalist Fixed Header (Figma 1:1):
        Solid concrete background (#EFEFEF), 2px crisp black bottom border, z-50.
        Completely opaque so text underneath NEVER merges.
      */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-concrete border-b-2 border-ink py-3 sm:py-3.5 shadow-sm">
        <div className="max-w-site mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark & Script (Figma 1:1) */}
          <Link
            href="/"
            className="group flex flex-col items-start transition-opacity hover:opacity-90"
          >
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl sm:text-3xl text-ink group-hover:text-magenta transition-colors -rotate-2">
                nailzbynicci
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] uppercase px-1.5 py-0.5 bg-magenta text-white font-bold tracking-widest">
                2026
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ink/70 font-mono -mt-1 whitespace-nowrap">
              {t('Deine Alternative Nail Artistin · Münster', 'Your Alternative Nail Artist · Münster')}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-xs font-mono uppercase tracking-[0.16em] transition-colors duration-200 py-1 font-semibold',
                    isActive
                      ? 'text-magenta border-b-2 border-magenta'
                      : 'text-ink hover:text-magenta'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions: Language Toggle & Figma Master Button "Book ↗" */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Pill */}
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-none bg-white border border-ink text-[11px] font-mono tracking-widest text-ink hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_#0E0D10]"
              aria-label="Toggle language"
            >
              <span className={cn(locale === 'de' ? 'font-bold text-magenta' : 'opacity-40')}>DE</span>
              <span className="mx-1 opacity-40">/</span>
              <span className={cn(locale === 'en' ? 'font-bold text-magenta' : 'opacity-40')}>EN</span>
            </button>

            {/* Direct Booking CTA Button (Figma Master Component: Stark black pill button with pink hover) */}
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-5 py-2 min-h-[40px] rounded-full bg-black text-white hover:bg-magenta transition-all duration-200 shadow-[2px_2px_0px_#0E0D10] border border-ink"
            >
              <span>{t('Buchen ↗', 'Book ↗')}</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink hover:text-magenta transition-colors focus:outline-none"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-concrete pt-24 pb-12 px-8 flex flex-col justify-between md:hidden animate-fade-in border-b-2 border-ink">
          <nav className="flex flex-col gap-6 mt-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-sans font-black text-3xl uppercase tracking-tight transition-colors min-h-[44px] flex items-center',
                    isActive ? 'text-magenta' : 'text-ink hover:text-magenta'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <div className="pt-8 border-t-2 border-ink flex flex-col gap-4">
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold py-4 min-h-[48px] bg-magenta text-white hover:bg-black transition-all shadow-[4px_4px_0px_#0E0D10] border border-ink"
            >
              <span>{t('Auf Instagram buchen', 'Book on Instagram')}</span>
              <span className="ml-2">↗</span>
            </a>
            
            <div className="text-center text-[10px] uppercase tracking-widest text-ink/70 font-mono mt-2 font-bold">
              [ Münster, Germany · 100% Aprés Gel-X ]
            </div>
          </div>
        </div>
      )}
    </>
  )
}
