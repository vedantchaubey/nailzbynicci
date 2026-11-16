'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const Footer: React.FC = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink text-white border-t border-fog pt-20 pb-12 relative overflow-hidden">
      {/* Background Mist Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] aura-blossom pointer-events-none opacity-40" />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-fog">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-blossom font-sans block mb-3">
                Münster · North Rhine-Westphalia
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
                Nailz by Nicci
              </h3>
              <p className="mt-4 text-sm font-sans text-fog-light leading-[1.7] max-w-sm">
                {t(
                  'Skulpturale Aprés Gel-X Architektur und individuelle Nagelkunst im privaten Homestudio in Münster. Wo gotische Eleganz auf zarte Kawaii-Träume trifft.',
                  'Sculptural Aprés Gel-X architecture and bespoke wearable nail art in a private Münster home studio. Where dark romanticism meets delicate kawaii dreams.'
                )}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-fog text-xs text-fog-light">
              <p className="text-white font-medium">Münster, NRW · Germany</p>
              <p className="mt-1">
                {t(
                  'Ausschließlich nach vorheriger Terminabstimmung via Instagram DM.',
                  'Exclusively by prior appointment arranged via Instagram DM.'
                )}
              </p>
            </div>
          </div>

          {/* Quick Navigation Index */}
          <div className="md:col-span-3 md:col-start-7">
            <span className="text-[10px] uppercase tracking-[0.2em] text-chrome font-sans block mb-6">
              {t('Navigation', 'Index')}
            </span>
            <ul className="space-y-3.5 text-xs font-sans tracking-[0.08em] text-fog-light">
              <li>
                <Link href="/gallery" className="hover:text-blossom transition-colors">
                  {t('Galerie & Portfolio', 'Gallery & Portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-blossom transition-colors">
                  {t('Preise & Tiers (2026)', 'Prices & Tiers (2026)')}
                </Link>
              </li>
              <li>
                <Link href="/how-to-book" className="hover:text-blossom transition-colors">
                  {t('Buchungsablauf & Regeln', 'How to Book & Rules')}
                </Link>
              </li>
              <li>
                <Link href="/press-ons" className="hover:text-blossom transition-colors">
                  {t('Press-On Kollektion', 'Press-On Collection')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blossom transition-colors">
                  {t('Über Nicole & Studio', 'About Nicole & Studio')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Social & DM Booking */}
          <div className="md:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-chrome font-sans block mb-6">
              {t('Direktkontakt & Instagram', 'Direct Contact & Booking')}
            </span>
            <p className="text-xs text-fog-light leading-[1.65] mb-5">
              {t(
                'Alle Terminanfragen und individuellen Beratungswünsche erfolgen direkt über Instagram DM.',
                'All appointment requests and custom inquiries are handled directly through Instagram DM.'
              )}
            </p>

            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] px-6 py-3.5 rounded-full bg-white text-ink hover:bg-blossom hover:text-ink transition-all duration-300 font-medium shadow-lg"
            >
              <span>{t('Instagram DM öffnen', 'Open Instagram DM')}</span>
              <span className="text-sm">↗</span>
            </a>

            <div className="mt-6 flex items-center gap-4 text-xs text-fog-light">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @nailzbynicci
              </a>
              <span>·</span>
              <a
                href={brand.personalInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @niccicatt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-fog-light gap-4">
          <p>© {new Date().getFullYear()} Nicole · Nailz by Nicci. Münster, NRW. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/legal/impressum" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
              Impressum
            </Link>
            <Link href="/legal/datenschutz" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
              Datenschutz
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 ml-4 min-h-[44px] px-2"
              aria-label="Scroll to top"
            >
              <span>{t('Nach oben', 'Top')}</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
