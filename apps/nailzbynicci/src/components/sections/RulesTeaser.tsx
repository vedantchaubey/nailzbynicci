'use client'

import React from 'react'
import Link from 'next/link'
import { studioRules } from '@/data/rules'
import { useLanguage } from '@/lib/languageContext'

export const RulesTeaser: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              [ STUDIO PROTOCOL · SAFE SPACE ]
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
              Studio Etiquette &amp;<br />
              <span className="text-magenta">Anxiety-Free Space.</span>
            </h2>
          </div>

          <Link
            href="/how-to-book"
            className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-white text-ink hover:bg-black hover:text-white transition-all border border-ink shadow-[3px_3px_0px_#0E0D10] shrink-0"
          >
            <span>{t('Alle Regeln & FAQ lesen', 'Read All Rules & FAQ')}</span>
            <span className="ml-2 font-black">→</span>
          </Link>
        </div>

        {/* 4 Brutalist Rule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioRules.slice(0, 4).map((rule, idx) => (
            <div
              key={rule.id}
              className="bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-ink text-xs font-mono uppercase tracking-widest font-black">
                  <span>#0{idx + 1}</span>
                  <span className="text-magenta font-bold">PROTOCOL</span>
                </div>

                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink">
                  {rule.title[locale]}
                </h3>

                <p className="mt-3 text-xs font-sans text-ink/75 leading-relaxed">
                  {rule.description[locale]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold text-ink/60">
                <span>MÜNSTER ATELIER</span>
                <span>🐾 NICCI</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
