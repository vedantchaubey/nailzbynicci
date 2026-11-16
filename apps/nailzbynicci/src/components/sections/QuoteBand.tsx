'use client'

import React from 'react'
import { useLanguage } from '@/lib/languageContext'

export const QuoteBand: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink overflow-hidden select-none">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Top Tracking Metadata */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-ink text-xs font-mono uppercase tracking-[0.24em] font-bold text-ink">
          <span>{t('[ STATEMENT · 2026 ]', '[ STATEMENT · 2026 ]')}</span>
          <span className="text-magenta">{t('MASSGEFERTIGTE NAGELKUNST', 'BESPOKE WEARABLE ART')}</span>
        </div>

        {/* The Giant Statement: "ART FOR THE parts OF YOU THAT PUNCH, TEXT, AND TOUCH." */}
        <div className="py-8 sm:py-16">
          <div className="flex flex-col">
            <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.88] tracking-[-0.035em] text-magenta uppercase">
              "ART FOR THE<br />
              <div className="relative inline-block my-2 sm:my-4">
                <span className="font-script text-white text-6xl sm:text-8xl md:text-9xl lg:text-[130px] lowercase -rotate-6 block neon-pink-glow drop-shadow-[0_4px_14px_rgba(255,0,122,0.9)]">
                  parts
                </span>
              </div>
              <br />
              OF YOU THAT<br />
              PUNCH, TEXT, AND<br />
              TOUCH."
            </h2>
            {locale === 'de' && (
              <p className="mt-4 text-xs sm:text-sm font-mono text-ink/70 uppercase tracking-widest font-bold">
                [ "KUNST FÜR DIE TEILE VON DIR, DIE SCHLAGEN, TIPPEN UND BERÜHREN." ]
              </p>
            )}
          </div>
        </div>

        {/* Bottom Banner Details */}
        <div className="pt-8 border-t-2 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-ink/70 uppercase font-bold">
          <span>{t('MÜNSTER · NRW · DEUTSCHLAND', 'MÜNSTER · NRW · GERMANY')}</span>
          <span className="text-magenta">{t('100% HANDGEMALT · KEINE SALON-MONOTONIE', '100% HAND-PAINTED · ZERO SALON MONOTONY')}</span>
        </div>

      </div>
    </section>
  )
}
