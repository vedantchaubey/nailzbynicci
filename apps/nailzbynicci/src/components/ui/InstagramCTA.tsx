'use client'

import React from 'react'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

interface InstagramCTAProps {
  headline?: string
  subheadline?: string
  buttonText?: string
}

export const InstagramCTA: React.FC<InstagramCTAProps> = ({
  headline,
  subheadline,
  buttonText,
}) => {
  const { t } = useLanguage()

  const defaultHeadline = t(
    'BEREIT FÜR DEIN MASSGESCHNEIDERTES SET?',
    'READY FOR YOUR BESPOKE NAIL ARCHITECTURE?'
  )
  const defaultSub = t(
    'Alle Termine in Münster & Custom Press-On Aufträge werden direkt über Instagram DM besprochen. 100% Aprés Gel-X, kein Acryl, private Atelier-Atmosphäre.',
    'All appointments in Münster & custom press-on orders are managed strictly via Instagram DM. 100% Aprés Gel-X, zero acrylic, private 1-on-1 sanctuary.'
  )
  const defaultBtn = t('AUF INSTAGRAM BUCHEN ↗', 'BOOK ON INSTAGRAM ↗')

  return (
    <section className="my-12 p-8 md:p-12 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest font-black text-magenta block mb-2">
            {t('[ DIREKTE TERMINVEREINBARUNG ]', '[ DIRECT INSTAGRAM BOOKINGS ]')}
          </span>
          <h3 className="font-sans font-black text-2xl md:text-3xl text-ink uppercase tracking-tight mb-2">
            {headline || defaultHeadline}
          </h3>
          <p className="font-sans text-sm text-ink/80 leading-relaxed">
            {subheadline || defaultSub}
          </p>
        </div>
        <div className="w-full md:w-auto flex-shrink-0">
          <a
            href={brand.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-sm font-black px-8 py-4 bg-magenta text-white hover:bg-black transition-all duration-200 border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
          >
            {buttonText || defaultBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
