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
    <footer className="bg-ink text-white border-t-2 border-ink pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/20">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-magenta font-mono font-bold block mb-3">
                Münster · North Rhine-Westphalia · Germany
              </span>
              <h3 className="font-script text-4xl sm:text-5xl text-white">
                nailzbynicci
              </h3>
              <p className="mt-4 text-xs font-mono text-white/70 leading-[1.8] max-w-sm uppercase">
                {t(
                  'Deine Alternative Nail Artistin in Münster. 100% Aprés Gel-X Architektur, Gothic Cyber-Chrome, Liquid Metal & handgefertigte Luxury Press-Ons.',
                  'Your Alternative Nail Artist in Münster. 100% Aprés Gel-X architecture, gothic cyber-chrome, liquid metal & handcrafted luxury press-ons.'
                )}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-xs font-mono text-white/60">
              <p className="text-white font-bold">{t('Privates Atelier in Münster', 'Private Sanctuary in Münster')}</p>
              <p className="mt-1">
                {t(
                  'Termine & Press-On Aufträge ausschließlich via Instagram DM.',
                  'Appointments & press-on orders strictly via Instagram DM.'
                )}
              </p>
            </div>
          </div>

          {/* Navigation Column 1: Services & Galleries */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-magenta font-mono font-black block mb-4">
              {t('[ ATELIER & LEISTUNGEN ]', '[ ATELIER & SERVICES ]')}
            </span>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/80">
              <li>
                <Link href="/galerie" className="hover:text-magenta transition-colors">
                  {t('Alle Arbeiten (Galerie)', 'Master Portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/galerie/chrome-naegel" className="hover:text-magenta transition-colors">
                  {t('Chrome & Cyber Sigilism', 'Chrome & Cyber Sigilism')}
                </Link>
              </li>
              <li>
                <Link href="/galerie/kawaii-naegel" className="hover:text-magenta transition-colors">
                  {t('Soft Kawaii 3D Nails', 'Soft Kawaii 3D Nails')}
                </Link>
              </li>
              <li>
                <Link href="/galerie/stiletto-naegel" className="hover:text-magenta transition-colors">
                  {t('Stiletto Claws & Längen', 'Stiletto Claws & Lengths')}
                </Link>
              </li>
              <li>
                <Link href="/apres-gel-x-muenster" className="hover:text-magenta transition-colors">
                  {t('Aprés Gel-X Münster', 'Aprés Gel-X Münster')}
                </Link>
              </li>
              <li>
                <Link href="/preise" className="hover:text-magenta transition-colors">
                  {t('Preise & 4 Art Tiers', 'Pricing & 4 Art Tiers')}
                </Link>
              </li>
              <li>
                <Link href="/termin-buchen" className="hover:text-magenta transition-colors">
                  {t('Termin buchen & Regeln', 'Book Session & Policies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Guides & Press-Ons */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-magenta font-mono font-black block mb-4">
              {t('[ RATGEBER & PRESS-ONS ]', '[ GUIDES & PRESS-ONS ]')}
            </span>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/80">
              <li>
                <Link href="/ratgeber" className="hover:text-magenta transition-colors">
                  {t('Ratgeber Übersicht', 'Guide Library')}
                </Link>
              </li>
              <li>
                <Link href="/ratgeber/wie-lange-haelt-apres-gel-x" className="hover:text-magenta transition-colors">
                  {t('Wie lange hält Gel-X?', 'How Long Does Gel-X Last?')}
                </Link>
              </li>
              <li>
                <Link href="/ratgeber/was-kostet-nageldesign-in-muenster" className="hover:text-magenta transition-colors">
                  {t('Was kostet Nageldesign in MS?', 'Münster Nail Costs Guide')}
                </Link>
              </li>
              <li>
                <Link href="/ratgeber/chrome-naegel-pflege-haltbarkeit" className="hover:text-magenta transition-colors">
                  {t('Chrome-Pflege & Versiegelung', 'Chrome Sealing & Care')}
                </Link>
              </li>
              <li>
                <Link href="/press-ons" className="hover:text-magenta transition-colors">
                  {t('Custom Press-Ons Übersicht', 'Custom Press-Ons')}
                </Link>
              </li>
              <li>
                <Link href="/press-ons/bestellen" className="hover:text-magenta transition-colors">
                  {t('Press-Ons Bestellanleitung', 'How to Order Press-Ons')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-magenta transition-colors">
                  {t('Häufige Fragen (FAQ)', 'FAQ')}
                </Link>
              </li>
              <li>
                <Link href="/pflege-tipps" className="hover:text-magenta transition-colors">
                  {t('Pflege-Tipps (Aftercare)', 'Aftercare Tips')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Social & DM Booking */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-magenta font-mono font-black block mb-4">
                {t('[ INSTAGRAM DM ]', '[ INSTAGRAM DM ]')}
              </span>
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center font-mono tracking-widest uppercase text-xs font-black px-4 py-3 bg-magenta text-white hover:bg-white hover:text-ink transition-all border border-white"
              >
                <span>{t('IG DM ÖFFNEN ↗', 'OPEN IG DM ↗')}</span>
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 text-xs font-mono text-white/70">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-magenta transition-colors"
              >
                @nailzbynicci
              </a>
              <a
                href={brand.personalInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-magenta transition-colors"
              >
                @niccicatt
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Nicole · nailzbynicci (nailsbynicci) · Offizielle Website · Münster, Germany.</p>

          <div className="flex items-center gap-6">
            <Link href="/sitemap" className="hover:text-magenta transition-colors">
              Sitemap
            </Link>
            <Link href="/impressum" className="hover:text-magenta transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-magenta transition-colors">
              Datenschutz
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-magenta transition-colors flex items-center gap-1 ml-4"
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
