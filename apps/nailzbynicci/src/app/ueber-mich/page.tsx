'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Top Metadata Header */}
        <div className="flex items-center justify-between pb-4 mb-10 border-b-2 border-ink text-xs font-mono uppercase tracking-widest font-black">
          <span>{t('[ ÜBER DIE KÜNSTLERIN ]', '[ ABOUT THE ARTIST ]')}</span>
          <span className="text-magenta">{t('MÜNSTER, DEUTSCHLAND', 'MÜNSTER, GERMANY')}</span>
        </div>

        {/* Verbatim Readymag Manifesto */}
        <div className="mb-16">
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-8">
            Nicole · <span className="text-magenta">Nailz by Nicci.</span>
          </h1>

          <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-magenta block mb-4">
              {t('[ OFFIZIELLES STATEMENT ]', '[ OFFICIAL STATEMENT ]')}
            </span>
            <p className="font-sans font-extrabold text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight text-ink lowercase">
              {t(
                'nicole ist eine autodidaktische nagelkünstlerin aus deutschland; seit ihrer kindheit ist jede form von kunst teil ihres lebens. sie liebt es zu zeichnen, zu malen und auf vielfältige weise zu gestalten, tattoo-design inklusive. ihr stil lässt sich als edgy, grunge und alternativ mit süßen details beschreiben.',
                'nicole is a self taught nail artist, based in germany; since her childhood any form of art is a part of her life. she enjoys drawing, painting and designing in various different ways, tattoo design as well. her art style can be described as edgy, grunge and alternative with cute details.'
              )}
            </p>
            <div className="mt-6 pt-4 border-t border-ink/20 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-ink/70">
              <span>@NAILZBYNICCI · @NICCICATT</span>
              <span>100% APRÉS GEL-X</span>
            </div>
          </div>
        </div>

        {/* Visual Monograph Split: Standing Sword & Kawaii Hands */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* Card 1: Standing Sword */}
          <div className="bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
              <Image
                src="/images/readymag/rm_moonblade_sword_standing.jpg"
                alt="Nicole - Moonblade Babe with Medieval Sword"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-mono uppercase font-black border border-ink">
                MOONBLADE BABE
              </div>
            </div>

            <div className="p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-magenta font-black block mb-1">
                SEPHIROTH HANDS
              </span>
              <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-ink">
                "Silver, sharp, and ready to slice through your excuses."
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                {t(
                  'Extrudierte 3D-Chrom-Schwerter, gotische Dornen, Piercings und messerscharfe Stiletto-Formen. Keine Kompromisse beim Design.',
                  'Extruded 3D liquid chrome swords, gothic sigilism, pierced edges, and razor stiletto silhouettes. Zero compromises on detail.'
                )}
              </p>
            </div>
          </div>

          {/* Card 2: Kawaii Hands & Face */}
          <div className="bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
              <Image
                src="/images/readymag/rm_kawaii_face_hands.jpg"
                alt="Kawaii Stiletto Nails Hands Face"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-mono uppercase font-black border border-ink">
                GLINDAFIED MIFFY
              </div>
            </div>

            <div className="p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink font-black block mb-1">
                GLAM WITCH
              </span>
              <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-ink">
                "Sugar, spite &amp; everything bright."
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                {t(
                  '3D-geformte Häschen, glänzende Perlenketten, silberne Bänder und rosa Schleifen. Süß, verspielt und voller Persönlichkeit.',
                  '3D sculpted bunnies, glowing pearl chains, silver ribbon arrays, and delicate pink bows. Sweet, nostalgic, and filled with craft.'
                )}
              </p>
            </div>
          </div>

        </div>

        {/* Philosophy & Homestudio Sanctuary */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-magenta">
                [ HOMESTUDIO PHILOSOPHY ]
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink">
                Warum 100% Aprés Gel-X?
              </h2>
              <p className="text-sm font-sans text-ink/80 leading-relaxed">
                {t(
                  'Herkömmliche Nagelstudios arbeiten oft nach einem Prinzip: Massenabfertigung unter Zeitdruck. Aggressive Fräser dünnen das Nagelbett aus, giftige Acryl-Dämpfe belasten die Luft und Nägel brechen nach kurzer Zeit ab.',
                  'Conventional nail salons often operate on quick turnarounds: aggressive e-filing that strips the natural nail, harsh chemicals, and premature lifting.'
                )}
              </p>
              <p className="text-sm font-sans text-ink/80 leading-relaxed">
                {t(
                  'In meinem privaten Homestudio in Münster arbeite ich ausschließlich mit reinem Aprés Gel-X. Vollverlängerungen aus gegossenem Soft-Gel, die sich flexibel mit deinem Naturnagel bewegen. Kein Geruch, kein Feilen auf dem Nagelbett, schmerzfreies Ablösen und 4–6 Wochen makelloser Halt.',
                  'At my private Münster home atelier, I work exclusively with authentic Aprés Gel-X. Pure soft-gel extensions that move naturally with your nails. Zero fumes, zero harsh e-filing into your nail bed, and 4–6 weeks of rock-solid retention.'
                )}
              </p>
            </div>

            <div className="md:col-span-5 bg-concrete border-2 border-ink p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-ink/20 text-xs font-mono uppercase font-bold">
                <span>SYSTEM</span>
                <span className="text-magenta">APRÉS GEL-X</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-ink/20 text-xs font-mono uppercase font-bold">
                <span>ORT</span>
                <span>MÜNSTER, GERMANY</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-ink/20 text-xs font-mono uppercase font-bold">
                <span>TERMINART</span>
                <span>1-ZU-1 HOMESTUDIO</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-ink/20 text-xs font-mono uppercase font-bold">
                <span>BUCHUNG</span>
                <span className="text-magenta">NUR INSTAGRAM DM</span>
              </div>

              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-black py-4 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
              >
                <span>AUF INSTAGRAM BUCHEN ↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
