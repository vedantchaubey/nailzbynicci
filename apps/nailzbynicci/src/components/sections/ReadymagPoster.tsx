'use client'

import React from 'react'
import Image from 'next/image'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const ReadymagPoster: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Top Order & Shipping Directives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pb-12 mb-12 border-b-2 border-ink">
          
          {/* How to Place an Order */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-1 border-b-2 border-ink font-black">
              <span>HOW TO</span>
              <span className="text-magenta">PLACE AN ORDER</span>
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm sm:text-base font-bold uppercase tracking-wide text-ink">
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>DIRECT MESSAGE @NAILZBYNICCI ON INSTAGRAM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>PAY VIA PAYPAL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>WAIT UNTIL YOUR CUSTOM PRESS ONS ARE DESIGNED</span>
              </li>
            </ul>
          </div>

          {/* Shipping Directive */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-1 border-b-2 border-ink font-black">
              <span>SHIPPING</span>
              <span>#02</span>
            </div>
            <div className="mt-4">
              <p className="font-mono text-xl sm:text-2xl font-black uppercase tracking-tight text-ink">
                SHIPPING GERMANY ONLY
              </p>
              <p className="mt-2 text-xs font-mono text-ink/70 uppercase tracking-wider">
                {t(
                  'Sicherer Versand innerhalb Deutschlands mit Tracking. Jedes Set enthält Klebepads, Feile und Holzstäbchen.',
                  'Secure tracked shipping across Germany. Each bespoke set includes prep kit, buffer, and adhesive tabs.'
                )}
              </p>
            </div>
          </div>

        </div>

        {/* The Giant Poster Headline: "ART FOR THE parts OF YOU THAT PUNCH, TEXT, AND TOUCH." */}
        <div className="relative py-12 sm:py-20 select-none">
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
          </div>
        </div>

        {/* Bottom Booking Appointment Directives */}
        <div className="pt-12 border-t-2 border-ink grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-1 border-b-2 border-ink font-black">
              <span>HOW TO</span>
              <span className="text-magenta">BOOK AN APPOINTMENT</span>
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm sm:text-base font-bold uppercase tracking-wide text-ink">
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>DIRECT MESSAGE @NAILZBYNICCI ON INSTAGRAM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>DISCUSS TIME AND DATE</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta font-black">-</span>
                <span>CURRENTLY LOCATED IN MÜNSTER, GERMANY</span>
              </li>
            </ul>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col items-start md:items-end justify-center">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-ink mb-3">
              [ 15€ ANZAHLUNG VIA PAYPAL · NUR INSTAGRAM DM ]
            </span>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-sm font-black px-8 py-5 bg-magenta text-white hover:bg-black transition-all border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
            >
              <span>{t('AUF INSTAGRAM SCHREIBEN', 'MESSAGE @NAILZBYNICCI')}</span>
              <span className="ml-2 text-base">↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
