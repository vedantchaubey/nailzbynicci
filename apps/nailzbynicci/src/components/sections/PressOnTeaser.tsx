'use client'

import React from 'react'
import Link from 'next/link'
import { pressOnItems } from '@/data/pressons'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'
import { LazyVideoCard } from '@/components/ui/LazyVideoCard'

export const PressOnTeaser: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section id="press-ons" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (Figma 1:1: ART TO GO.) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-10 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              {t('[ BESTELLABLAUF · VERSAND NUR INNERHALB DEUTSCHLANDS ]', '[ HOW TO · PLACE AN ORDER · 01 ONLY / SHIPPING GERMANY ONLY ]')}
            </span>
            <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-magenta leading-[0.88]">
              ART TO GO.
            </h2>
          </div>

          <Link
            href="/press-ons"
            className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-white text-ink hover:bg-black hover:text-white transition-all border border-ink shadow-[3px_3px_0px_#0E0D10] shrink-0"
          >
            <span>{t('Alle Sets & Video-Lookbook', 'Explore Video Lookbook')}</span>
            <span className="ml-2 font-black">→</span>
          </Link>
        </div>

        {/* 3-Step Process List (Figma Master Component: List item · Desktop) */}
        <div className="bg-white border-2 border-ink p-6 sm:p-8 shadow-[5px_5px_0px_#0E0D10] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-ink">
            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <div>
                <span className="text-ink/60 text-[10px] block mb-1">{t('SCHRITT 01', 'STEP 01')}</span>
                <span>{t('DM @NAILZBYNICCI AUF INSTAGRAM SCHREIBEN', 'DIRECT MESSAGE @NAILZBYNICCI ON INSTAGRAM')}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <div>
                <span className="text-ink/60 text-[10px] block mb-1">{t('SCHRITT 02', 'STEP 02')}</span>
                <span>{t('ZAHLUNG BEQUEM VIA PAYPAL', 'PAY VIA PAYPAL')}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <div>
                <span className="text-ink/60 text-[10px] block mb-1">{t('SCHRITT 03', 'STEP 03')}</span>
                <span>{t('DEINE MASSGEFERTIGTEN PRESS-ONS WERDEN GESTALTET', 'WAIT UNTIL YOUR CUSTOM PRESS-ONS ARE DESIGNED')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Press-On Video / Cards Grid */}
        <div id="press-on-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pressOnItems.map((item) => (
            <LazyVideoCard
              key={item.id}
              id={item.id}
              title={item.title}
              file={item.videoFile}
              poster={item.poster}
              style={`${item.shape} · ${item.length}`}
              bookingUrl={brand.bookingUrl}
              inquireLabel={t('Anfragen ↗', 'Inquire ↗')}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
