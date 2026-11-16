'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const Hero: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section id="hero" className="relative bg-concrete text-ink pt-6 pb-20 md:pt-10 md:pb-28 border-b-2 border-ink overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 w-full">
        
        {/* Top Readymag Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 mb-8 sm:mb-12 border-b border-ink/20 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-ink">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-magenta inline-block animate-pulse" />
            <span>{t('STANDORT: ', 'CURRENTLY LOCATED IN ')}<strong className="font-bold">{t('Münster, Deutschland', 'Münster, Germany')}</strong></span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 mt-2 sm:mt-0">
            <span>{t('[INHABERINNENGEFÜHRT]', '[FEMALE OWNED]')}</span>
            <span>{t('[ALTERNATIV]', '[ALTERNATIVE]')}</span>
            <span>{t('[KLEINUNTERNEHMEN]', '[SMALL BUSINESS]')}</span>
          </div>
        </div>

        {/* Massive Typographic Composition with Glowing Neon Script */}
        <div className="relative mb-12 sm:mb-16 select-none">
          <div className="flex flex-col">
            <h1 className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] leading-[0.84] tracking-[-0.04em] text-magenta uppercase">
              {locale === 'de' ? (
                <>
                  DEINE<br />
                  ALTERNATIVE<br />
                  NAIL<br />
                  ARTISTIN
                </>
              ) : (
                <>
                  YOUR<br />
                  ALTERNATIVE<br />
                  NAIL<br />
                  ARTIST
                </>
              )}
            </h1>
          </div>

          {/* Floating Neon Script Overlay "nailzbynicci" */}
          <div className="absolute right-0 bottom-2 sm:bottom-6 md:bottom-10 lg:bottom-12 z-20 pointer-events-none">
            <span className="font-script text-white text-5xl sm:text-7xl md:text-8xl lg:text-[120px] -rotate-6 block neon-pink-glow drop-shadow-[0_4px_12px_rgba(255,0,122,0.8)]">
              nailzbynicci
            </span>
          </div>
        </div>

        {/* Readymag Diptych Photo Blocks (Figma Master Component: Photo card · 4:5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
          
          {/* Card 1: Nana Manga Quote Nail Art */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-white shadow-[4px_4px_0px_#0E0D10]">
              <Image
                src="/images/readymag/rm_nana_quote_nails.jpg"
                alt="Nailz by Nicci - Nana Manga Quote Punk Plaid & Chrome Nails"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-ink font-bold">
                {t('SERIE: NANA', 'SERIES: NANA')}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-1 border-b border-ink/40 font-bold">
              <span>{t('TERMINE', 'BOOKINGS')}</span>
              <span className="text-magenta">{t('OFFEN', 'OPEN')}</span>
            </div>
            <p className="mt-2 text-xs font-mono text-ink/70 uppercase tracking-wider">
              {t(
                'Maßgefertigte Aprés Gel-X Architektur · Handgemalte Vivienne Westwood & Cyber-Details',
                'Bespoke Aprés Gel-X architecture · Hand-painted Vivienne Westwood & cyber detail'
              )}
            </p>
          </div>

          {/* Card 2: Angel Wings & Medieval Broadsword */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-white shadow-[4px_4px_0px_#0E0D10]">
              <Image
                src="/images/readymag/rm_angel_wings_sword.jpg"
                alt="Nailz by Nicci - Angel Wings Broadsword Aesthetic"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-ink font-bold">
                EST. 2023
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-1 border-b border-ink/40 font-bold">
              <span>{t('INDIVIDUELLE', 'CUSTOM')}</span>
              <span>{t('DESIGNS', 'DESIGNS')}</span>
            </div>
            <p className="mt-2 text-xs font-mono text-ink font-bold tracking-wider">
              {t(
                '"Jedes Nail-Set ist ein einzigartiges Kunstwerk für deine Hände."',
                '"Every Nail-Set is a unique one of a kind piece of art."'
              )}
            </p>
          </div>

        </div>

        {/* Readymag Brutalist Action Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t-2 border-ink flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-magenta block mb-1">
              {t('[ BUCHUNG DIREKT ÜBER INSTAGRAM DM ]', '[ DIRECT INSTAGRAM BOOKINGS ONLY ]')}
            </span>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Alle Termine und Press-On Bestellungen werden direkt über Instagram DM vereinbart. Keine Formulare, keine automatischen Buchungskalender.',
                'All appointments and custom press-on orders are booked directly via Instagram DM. No forms, no automated booking calendars.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-sm font-black px-8 py-4 bg-magenta text-white hover:bg-black transition-all duration-200 border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
            >
              <span>{t('AUF INSTAGRAM ANFRAGEN', 'ORDER NOW / BOOK ON IG')}</span>
              <span className="ml-2 text-base">↗</span>
            </a>

            <Link
              href="#work"
              className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-sm font-bold px-6 py-4 bg-white text-ink hover:bg-ink hover:text-white transition-all duration-200 border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
            >
              <span>{t('ARBEITEN ANSEHEN', 'VIEW PORTFOLIO')}</span>
              <span className="ml-2">↓</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
