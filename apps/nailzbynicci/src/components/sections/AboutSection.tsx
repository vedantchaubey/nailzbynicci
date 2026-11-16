'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const AboutSection: React.FC = () => {
  const { locale, t } = useLanguage()

  return (
    <section id="about" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (Figma 1:1: [ ABOUT THE ARTIST ] ... MÜNSTER · NRW) */}
        <div className="flex items-center justify-between pb-4 mb-10 md:mb-14 border-b-2 border-ink text-xs font-mono uppercase tracking-[0.24em] font-bold text-ink">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-magenta inline-block animate-pulse" />
            <span className="text-magenta">{t('[ ÜBER DIE KÜNSTLERIN ]', '[ ABOUT THE ARTIST ]')}</span>
          </div>
          <span className="text-ink/70">{t('MÜNSTER · DEUTSCHLAND', 'MÜNSTER · GERMANY')}</span>
        </div>

        {/* 2-Column Editorial Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Authentic Bio & Statement */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-magenta block mb-3">
                {t('[ DÜSTER IM HERZEN · NIEDLICH IM DETAIL ]', '[ EDGY BY NATURE · CUTE IN THE DETAILS ]')}
              </span>
              
              <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-ink leading-[0.95] mb-8">
                {locale === 'de' ? (
                  <>
                    Nicole ist eine autodidaktische <br />
                    <span className="text-magenta">Nail Artistin</span> aus Deutschland.
                  </>
                ) : (
                  <>
                    Nicole is a self-taught <br />
                    <span className="text-magenta">nail artist</span> based in Germany.
                  </>
                )}
              </h2>

              <div className="space-y-5 text-sm sm:text-base font-sans text-ink/85 leading-relaxed font-medium">
                <p>
                  {t(
                    'Seit ihrer Kindheit ist Kunst in jeder erdenklichen Form fester Bestandteil ihres Lebens. Sie zeichnet, malt und entwirft auf unterschiedlichste Weise – von individuellem Tattoo-Design bis hin zu skulpturaler Nail Architecture.',
                    'Since childhood, art in every form has been an essential part of her life. She enjoys drawing, painting and designing in many different ways, tattoo design included.'
                  )}
                </p>
                <p>
                  {t(
                    'Ihr Stil bewegt sich kompromisslos zwischen düsterer Grunge-Ästhetik, biomorpher Cyber-Extravaganz und zuckersüßen Kawaii-Details. In ihrem privaten Homestudio in Münster entsteht jedes Set als maßgefertigtes, tragbares Unikat auf originalen Aprés Gel-X Spitzen.',
                    'Her style is edgy, grunge and alternative with cute details. In her private Münster home atelier, every set is treated as an individual, one-of-a-kind piece of wearable art created with authentic Aprés Gel-X architecture.'
                  )}
                </p>
              </div>

              {/* Core Pillars (Figma Master List Items) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t-2 border-ink/20">
                {[
                  { tag: '100% APRÉS GEL-X', desc: t('Kein MMA · Keine Schäden am Naturnagel', 'No MMA · Zero Damage') },
                  { tag: t('HANDGEMALT', 'HAND-PAINTED'), desc: t('Freihand gezeichnet · Keine Sticker', 'Zero Stamping or Decals') },
                  { tag: t('1-ZU-1 ATELIER', '1-ON-1 ATELIER'), desc: t('Ruhig & angstfreie Atmosphäre', 'Calm & Anxiety-Free') },
                ].map((item) => (
                  <div key={item.tag} className="p-3 bg-white border border-ink shadow-[2px_2px_0px_#0E0D10]">
                    <span className="block text-[10px] font-mono font-black text-magenta uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="block text-[11px] font-sans font-semibold text-ink mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-ink flex flex-wrap items-center gap-4">
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-black text-white hover:bg-magenta transition-all duration-200 shadow-[3px_3px_0px_#0E0D10] border border-ink"
              >
                <span>{t('Auf Instagram folgen', 'Follow @nailzbynicci')}</span>
                <span className="ml-2 font-black">↗</span>
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-5 py-3.5 bg-white text-ink hover:bg-black hover:text-white transition-all duration-200 border border-ink shadow-[2px_2px_0px_#0E0D10]"
              >
                <span>{t('Ganze Story lesen', 'Read Full Bio')}</span>
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Diptych (Figma Photo card · 4:5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Photo 1: Nicole with Kawaii Set */}
            <div className="bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src="/images/readymag/rm_kawaii_face_hands.jpg"
                  alt="Nicole - Nailz by Nicci Studio Münster"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink">
                  {t('KÜNSTLERIN · MÜNSTER', 'ARTIST · MÜNSTER')}
                </div>
                <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink">
                  @NAILZBYNICCI
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-[11px] font-mono uppercase font-bold text-ink">
                <span>{t('HOMESTUDIO ATELIER', 'HOMESTUDIO ATELIER')}</span>
                <span className="text-magenta">EST. 2023</span>
              </div>
            </div>

            {/* Photo 2: Camo Baby Bows & Broadsword Detail */}
            <div className="hidden sm:flex lg:flex bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex-col justify-between">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src="/images/readymag/rm_camo_baby_bows.jpg"
                  alt="Camo Baby Bows & 3D Charms - Nailz by Nicci"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink">
                  {t('SIGNATURE NAGELKUNST', 'SIGNATURE CRAFT')}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-[11px] font-mono uppercase font-bold text-ink">
                <span>{t('DÜSTER × ZUCKERSÜSS', 'DARK EDGY × SOFT KAWAII')}</span>
                <span className="text-ink/60">{t('MÜNSTER, NRW', 'NRW, GERMANY')}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
