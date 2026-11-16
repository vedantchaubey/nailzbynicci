'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const BookingCTA: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-concrete text-ink relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-xs tracking-[0.24em] uppercase text-magenta font-mono font-bold">
            [ PRIVATE HOME ATELIER · MÜNSTER, GERMANY ]
          </span>
        </div>

        <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
          Ready For Nails Like <br />
          <span className="text-magenta">Wearable Art?</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg font-sans text-ink/80 leading-relaxed max-w-2xl mx-auto font-medium">
          {t(
            'Termine finden in ruhiger 1-zu-1 Atmosphäre in meinem privaten Studio in Münster statt. Kein Stress, keine Hektik – nur Hingabe zu deinen Nägeln. Schreibe mir einfach direkt auf Instagram.',
            'Appointments take place in an intimate 1-on-1 atmosphere at my Münster private home studio. Zero rush, zero salon stress. Message me directly on Instagram to book your set.'
          )}
        </p>

        {/* 100% Instagram DM CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={brand.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center font-mono uppercase tracking-[0.16em] text-sm font-black px-10 py-5 min-h-[48px] bg-magenta text-white hover:bg-black transition-all border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
          >
            <span>{t('Auf Instagram buchen', 'Book on Instagram')}</span>
            <span className="ml-2.5 text-base">↗</span>
          </a>

          <Link
            href="/how-to-book"
            className="w-full sm:w-auto inline-flex items-center justify-center font-mono uppercase tracking-[0.16em] text-sm font-bold px-8 py-5 min-h-[48px] bg-white text-ink hover:bg-ink hover:text-white transition-all border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
          >
            {t('Ablauf & Regeln', 'Booking Guide & Rules')}
          </Link>
        </div>

        {/* Studio Info Row */}
        <div className="mt-10 pt-6 border-t-2 border-ink/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-ink/70 uppercase font-semibold">
          <span>15€ Anzahlung via PayPal</span>
          <span>·</span>
          <span>100% Aprés Gel-X</span>
          <span>·</span>
          <span>Privates Homestudio Münster</span>
          <span>·</span>
          <span>Silent Option möglich</span>
        </div>

      </div>
    </section>
  )
}
