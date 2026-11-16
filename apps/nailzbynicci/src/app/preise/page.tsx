'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { priceTiers, removalsAndAddons } from '@/data/prices'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export default function PricesPage() {
  const { locale, t } = useLanguage()

  // Interactive Estimator State
  const [selectedLength, setSelectedLength] = useState<'short' | 'medium' | 'long' | 'extreme'>('medium')
  const [selectedArt, setSelectedArt] = useState<'minimal' | 'aura' | 'full' | 'sculpt'>('aura')
  const [needsRemoval, setNeedsRemoval] = useState(false)

  const estimatedTier = () => {
    if (selectedArt === 'sculpt' || selectedLength === 'extreme') {
      return priceTiers.find((t) => t.id === 'insane')!
    }
    if (selectedArt === 'full' || selectedLength === 'long') {
      return priceTiers.find((t) => t.id === 'crazy')!
    }
    if (selectedArt === 'aura') {
      return priceTiers.find((t) => t.id === 'medium')!
    }
    return priceTiers.find((t) => t.id === 'basic')!
  }

  const est = estimatedTier()
  const removalCost = needsRemoval ? 5 : 0

  const tierImages: Record<string, string> = {
    basic: '/images/gallery/nicci-010-800.webp',
    medium: '/images/gallery/nicci-003-800.webp',
    crazy: '/images/gallery/nicci-002-800.webp',
    insane: '/images/gallery/nicci-001-800.webp',
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              [ 2026 OFFICIAL TARIFF · TRANSPARENT ]
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88]">
              {locale === 'de' ? (
                <>
                  Vier Handwerks-Stufen.<br />
                  <span className="text-magenta">Keine Überraschungen.</span>
                </>
              ) : (
                <>
                  Four Craft Tiers.<br />
                  <span className="text-magenta">Zero Surprises.</span>
                </>
              )}
            </h1>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                'Alle Preise basieren auf tatsächlicher Arbeitszeit, Detaildichte und 3D-Materialaufwand auf 100% Aprés Gel-X Architektur. Feste Tarife ohne versteckte Aufschläge.',
                'All rates reflect actual appointment duration, detail density, and 3D materials on 100% Aprés Gel-X architecture. Fixed rates with zero hidden fees.'
              )}
            </p>
          </div>
        </div>

        {/* 4 Neo-Brutalist Pricing Plates */}
        <div className="space-y-8 mb-16">
          {priceTiers.map((tier, idx) => {
            const imageSrc = tierImages[tier.id] || '/images/gallery/nicci-001-800.webp'

            return (
              <div
                key={tier.id}
                className="bg-white border-2 border-ink p-6 sm:p-10 shadow-[6px_6px_0px_#0E0D10] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Photo */}
                <div className="lg:col-span-4 relative aspect-[4/3] border-2 border-ink overflow-hidden bg-concrete">
                  <Image
                    src={imageSrc}
                    alt={tier.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[10px] font-mono uppercase font-black border border-ink">
                    TIER 0{idx + 1}
                  </div>
                </div>

                {/* Center Content */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono uppercase font-black text-magenta">
                        {tier.popular ? '[ MOST POPULAR ]' : '[ ATELIER SET ]'}
                      </span>
                    </div>

                    <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                      {tier.name}
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                      {tier.description[locale]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/20 flex flex-wrap gap-4 text-xs font-mono text-ink/80 font-bold">
                    <span>⏱ {tier.duration}</span>
                    <span>·</span>
                    <span>💅 100% Aprés Gel-X</span>
                    <span>·</span>
                    <span>✨ Inkl. Pflege &amp; Form</span>
                  </div>
                </div>

                {/* Right Price & Booking Action */}
                <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center border-t lg:border-t-0 lg:border-l border-ink/20 pt-6 lg:pt-0 lg:pl-8">
                  <span className="text-[10px] font-mono uppercase text-ink/60 font-bold">FESTPREIS</span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="font-sans font-black text-5xl tracking-tight text-magenta">
                      {tier.minPrice}€
                    </span>
                  </div>
                  <span className="text-xs font-mono text-ink/70 font-semibold mb-4">
                    Inkl. Maniküre &amp; Finish
                  </span>

                  <a
                    href={brand.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-black px-6 py-4 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
                  >
                    <span>{t('Diesen Tier anfragen', 'Book this tier')}</span>
                    <span className="ml-1.5">↗</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interactive Estimator */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] mb-16">
          <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-ink">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta">
              [ INTERACTIVE ESTIMATOR · REAL-TIME ]
            </span>
            <span className="text-xs font-mono uppercase font-bold text-ink">
              MÜNSTER ATELIER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Length Selector */}
              <div>
                <label className="text-xs font-mono uppercase font-black text-ink block mb-2">
                  {t('1. Wähle deine Wunschlänge:', '1. Choose your desired length:')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'short', label: t('Kurz', 'Short') },
                    { id: 'medium', label: t('Medium', 'Medium') },
                    { id: 'long', label: t('Lang', 'Long') },
                    { id: 'extreme', label: t('Extra Lang', 'Extra Long') },
                  ].map((len) => (
                    <button
                      key={len.id}
                      onClick={() => setSelectedLength(len.id as any)}
                      className={`p-3 font-mono text-xs uppercase font-bold border-2 border-ink transition-all ${
                        selectedLength === len.id
                          ? 'bg-magenta text-white shadow-[2px_2px_0px_#0E0D10]'
                          : 'bg-concrete text-ink hover:bg-white'
                      }`}
                    >
                      {len.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Art Complexity */}
              <div>
                <label className="text-xs font-mono uppercase font-black text-ink block mb-2">
                  {t('2. Wähle die Nail-Art Komplexität:', '2. Choose nail art complexity:')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'minimal', label: t('Einfarbig / Minimal (50€)', 'Plain / Minimal (50€)') },
                    { id: 'aura', label: t('Aura / Einfache Art (55€)', 'Aura / Simple Art (55€)') },
                    { id: 'full', label: t('Full Art / 3D Detail (60€)', 'Full Art / 3D Detail (60€)') },
                    { id: 'sculpt', label: t('Crazy / Skulptural (70€+)', 'Crazy / Sculpted (70€+)') },
                  ].map((art) => (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArt(art.id as any)}
                      className={`p-3 font-mono text-xs uppercase font-bold border-2 border-ink text-left transition-all ${
                        selectedArt === art.id
                          ? 'bg-magenta text-white shadow-[2px_2px_0px_#0E0D10]'
                          : 'bg-concrete text-ink hover:bg-white'
                      }`}
                    >
                      {art.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Addon Removal */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsRemoval}
                    onChange={(e) => setNeedsRemoval(e.target.checked)}
                    className="w-5 h-5 accent-magenta border-2 border-ink"
                  />
                  <span className="font-mono text-xs uppercase font-bold text-ink">
                    {t('Schonende Fremdmaterial-Ablösung gewünscht (+5€)', 'Gentle previous set removal needed (+5€)')}
                  </span>
                </label>
              </div>

            </div>

            {/* Total Summary Box */}
            <div className="lg:col-span-5 bg-concrete border-2 border-ink p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink/70 font-bold block mb-1">
                  DEINE SCHÄTZUNG:
                </span>
                <h3 className="font-sans font-black text-3xl uppercase tracking-tight text-ink">
                  {est.name}
                </h3>

                <div className="my-4 pb-4 border-b border-ink/20 space-y-1 text-xs font-mono text-ink/80">
                  <div className="flex justify-between">
                    <span>Basis Set:</span>
                    <span>{est.minPrice}€</span>
                  </div>
                  {needsRemoval && (
                    <div className="flex justify-between text-magenta">
                      <span>Fremdablösung:</span>
                      <span>+5€</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-ink/20 font-bold text-sm text-ink">
                    <span>Gesamtpreis ca.:</span>
                    <span className="text-magenta font-black">{est.minPrice + removalCost}€</span>
                  </div>
                </div>

                <p className="text-xs font-sans text-ink/70 leading-relaxed">
                  {t(
                    '15€ Anzahlung via PayPal zur Terminreservierung. Der Restbetrag wird nach dem Termin fällig.',
                    '15€ deposit via PayPal to secure your booking. Balance paid upon appointment completion.'
                  )}
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-black py-4 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
                >
                  <span>TERMIN AUF INSTAGRAM BUCHEN ↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
