'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { priceTiers } from '@/data/prices'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const PriceTeaser: React.FC = () => {
  const { locale, t } = useLanguage()

  const tierImages: Record<string, string> = {
    basic: '/images/gallery/nicci-010-400.webp',
    medium: '/images/gallery/nicci-003-400.webp',
    crazy: '/images/gallery/nicci-002-400.webp',
    insane: '/images/gallery/nicci-001-400.webp',
  }

  return (
    <section id="prices" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (Figma 1:1: [ PRICES · FROM JANUARY 2026 #02 ]) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              {t('[ PREISE · AB JANUAR 2026 #02 ]', '[ PRICES · FROM JANUARY 2026 #02 ]')}
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
              {locale === 'de' ? (
                <>
                  Vier Handwerks-Stufen.<br />
                  <span className="text-magenta">Null Überraschungen.</span>
                </>
              ) : (
                <>
                  Four Craft Tiers.<br />
                  <span className="text-magenta">Zero Surprises.</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <Link
              href="/prices"
              className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-white text-ink hover:bg-black hover:text-white transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
            >
              <span>{t('Preisrechner öffnen', 'Open Price Calculator')}</span>
              <span className="ml-2 font-black">→</span>
            </Link>
          </div>
        </div>

        {/* Figma Master Component: Editorial Price Tier Strip */}
        <div className="bg-white border-2 border-ink p-6 sm:p-10 shadow-[6px_6px_0px_#0E0D10] mb-12">
          <div className="divide-y-2 divide-ink">
            {[
              {
                name: 'BASIC',
                range: '€50–60',
                desc: t('Einfarbig, Full Matte oder Full Chrom, dezent ein paar Steinchen', 'one colour, all matte/chrome, a few stones'),
                time: t('ca. 1,5 Std.', 'approx. 1.5 hrs'),
              },
              {
                name: 'MEDIUM',
                range: '€65–80',
                desc: t('Micro-French, Aura-Farbverläufe, Chrom-Akzente, leichte Kunst auf 2–4 Nägeln', 'french, aura, chrome details, simple art on 2–4 nails'),
                time: t('ca. 2 Std.', 'approx. 2 hrs'),
                popular: true,
              },
              {
                name: 'CRAZY',
                range: '€85–100',
                desc: t('Aufwändige Nailart auf allen Nägeln, 3D-Gel-Elemente, Charms & Airbrush', 'complex art on all nails, 3D elements, charms, airbrush'),
                time: t('ca. 2,5 Std.', 'approx. 2.5 hrs'),
              },
              {
                name: 'INSANE',
                range: '€105–115',
                desc: t('Komplette handgemalte Charakter-Kunst, extreme 3D-Skulpturen, höchste Detaildichte', 'full hand-painted character art, extensive 3D sculpting, extreme detail'),
                time: t('ca. 3 Std.', 'approx. 3 hrs'),
              },
            ].map((tier) => (
              <div key={tier.name} className="py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-ink">
                    {tier.name}
                  </span>
                  {tier.popular && (
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-magenta text-white font-bold tracking-widest border border-ink">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="max-w-md text-xs sm:text-sm font-sans text-ink/75 font-medium">
                  {tier.desc}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  <span className="text-xs font-mono uppercase text-ink/50 font-bold hidden sm:inline">
                    {tier.time}
                  </span>
                  <span className="font-sans font-black text-3xl sm:text-4xl text-magenta tracking-tight whitespace-nowrap">
                    {tier.range}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Brutalist Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceTiers.map((tier) => {
            const imageSrc = tierImages[tier.id] || '/images/gallery/nicci-001-400.webp'

            return (
              <div
                key={tier.id}
                className={`bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between p-6 ${
                  tier.popular ? 'ring-2 ring-magenta' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-ink">
                    <span className="text-[10px] font-mono uppercase font-black tracking-widest text-ink">
                      {tier.name}
                    </span>
                    {tier.popular && (
                      <span className="text-[9px] font-mono uppercase font-black bg-magenta text-white px-2 py-0.5 border border-ink">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-video w-full overflow-hidden border border-ink mb-4 bg-concrete">
                    <Image
                      src={imageSrc}
                      alt={tier.name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-baseline gap-1 my-3">
                    <span className="font-sans font-black text-4xl tracking-tight text-ink">
                      {tier.minPrice}€
                    </span>
                    <span className="text-xs font-mono uppercase text-ink/60 font-bold">
                      / SET
                    </span>
                  </div>

                  <p className="text-xs font-sans text-ink/80 leading-relaxed min-h-[48px]">
                    {tier.description[locale]}
                  </p>

                  <div className="mt-4 pt-3 border-t border-ink/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink/70 block mb-2 font-bold">
                      {t('Dauer & Inklusivleistungen:', 'Duration & Inclusions:')}
                    </span>
                    <div className="text-[11px] font-mono text-ink font-semibold flex items-center justify-between">
                      <span>{tier.duration}</span>
                      <span className="text-magenta font-bold">100% Gel-X</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-ink">
                  <a
                    href={brand.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold py-3 bg-ink text-white hover:bg-magenta transition-all border border-ink shadow-[2px_2px_0px_#0E0D10]"
                  >
                    <span>{t('Anfragen', 'Book on IG')}</span>
                    <span className="ml-1.5">↗</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Deposit Note Banner */}
        <div className="mt-8 bg-white border-2 border-ink p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#0E0D10]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-magenta shrink-0" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wide font-bold text-ink">
              {t(
                '20€ ANZAHLUNG VIA PAYPAL ZUR TERMINBESTÄTIGUNG (WIRD VOLL VERRECHNET)',
                '20€ PAYPAL DEPOSIT TO CONFIRM APPOINTMENT (DEDUCTED FROM TOTAL)'
              )}
            </span>
          </div>

          <span className="text-xs font-mono text-ink/70 uppercase tracking-widest font-semibold shrink-0">
            {t('MÜNSTER HOMESTUDIO · NUR VIA INSTAGRAM DM', 'MÜNSTER HOMESTUDIO · INSTAGRAM DM ONLY')}
          </span>
        </div>

      </div>
    </section>
  )
}
