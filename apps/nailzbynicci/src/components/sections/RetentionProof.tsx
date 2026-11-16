'use client'

import React from 'react'
import { testimonials } from '@/data/testimonials'
import { useLanguage } from '@/lib/languageContext'

export const RetentionProof: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              [ RETENTION PROOF · 4–6 WEEKS WEAR ]
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
              Rock-Solid Hold.<br />
              <span className="text-magenta">Zero Natural Damage.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                '100% schonendes Aprés Gel-X System. Kein Fräsen auf dem Naturnagel, kein schädliches Acryl. Maximale Haltbarkeit von 4 bis 6 Wochen.',
                '100% gentle Aprés Gel-X architecture. No aggressive e-filing into natural nail beds, zero damaging acrylics. 4 to 6 weeks resilient retention.'
              )}
            </p>
          </div>
        </div>

        {/* 3 Brutalist Retention Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-ink text-xs font-mono uppercase tracking-widest font-black">
                  <span>{item.clientName} ({item.handle})</span>
                  <span className="text-magenta bg-magenta/10 px-2 py-0.5 border border-magenta">
                    {item.duration}
                  </span>
                </div>

                <p className="font-serif text-lg sm:text-xl italic text-ink/90 leading-snug">
                  "{item.quote[locale]}"
                </p>

                <p className="mt-4 text-xs font-sans text-ink/70 leading-relaxed">
                  {item.setDetails[locale]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold">
                <span className="text-ink/60">APPOINTMENT VERIFIED</span>
                <span className="text-magenta">MÜNSTER · 🩶</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
