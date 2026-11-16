'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const DualSpectrum: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="signature-series" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Metadata Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              [ SIGNATURE SERIES · SERVING BOTH WAYS, BUT MAKE IT CUTE ]
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
              Moonblade Babe <br />
              <span className="text-magenta">&amp; Glindafied Miffy.</span>
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                'Niccis Arbeiten verbinden kompromisslose Cyber-Extravaganz mit zuckersüßem Kawaii-Glamour. Jedes Set ist ein maßgefertigtes Kunstwerk für deine Hände.',
                'Nicole blends razor-sharp cyber extravagance with sugar-sweet kawaii glamour. Every set is a custom piece of wearable art designed for your hands.'
              )}
            </p>
          </div>
        </div>

        {/* Brutalist Editorial Series Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Series 01: Glindafied Miffy */}
          <div className="bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-ink bg-concrete">
              <Image
                src="/images/readymag/rm_glindafied_miffy.jpg"
                alt="Glindafied Miffy - Sugar, spite & everything bright"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white border border-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-black">
                SERIES 01
              </div>
              <div className="absolute top-4 right-4 bg-magenta text-white border border-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold">
                GLAM WITCH
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-magenta block mb-1">
                  [ 3D SCULPTED KAWAII GOTH ]
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                  Glindafied Miffy
                </h3>

                <p className="mt-3 font-serif text-lg sm:text-xl italic text-ink/90 leading-snug">
                  "Sugar, spite &amp; everything bright. This ain't your childhood bunny – she's gone full glam witch."
                </p>

                <p className="mt-4 text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
                  {t(
                    'Dreidimensionale handmodellierte Häschen, schimmernde Perlenreihen, silberne Schleifen und holographische Gele. Ein unverkennbares Statement zwischen Niedlichkeit und rebellischer Eleganz.',
                    'Hand-sculpted 3D bunnies, iridescent pearls, silver ribbon detailing, and holographic gels. An unmistakable collision of innocent nostalgia and dark alternative glamour.'
                  )}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-ink/20">
                <div className="flex flex-wrap gap-2 mb-6">
                  {['3D Hand-Sculpted Bunnies', 'Pearl Arrays', 'Silver Ribbons', 'Glindafied Charm', 'Aprés Gel-X'].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-concrete border border-ink text-ink font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold py-3.5 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
                >
                  <span>{t('Diesen Stil anfragen', 'Inquire this style')}</span>
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Series 02: Moonblade Babe */}
          <div className="bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-ink bg-concrete">
              <Image
                src="/images/readymag/rm_chrome_daggers.jpg"
                alt="Moonblade Babe - Sailor Moon dreams and Sephiroth hands"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white border border-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-black">
                SERIES 02
              </div>
              <div className="absolute top-4 right-4 bg-ink text-white border border-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold">
                SEPHIROTH HANDS
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-ink block mb-1">
                  [ WEAPONIZED CYBER CHROME ]
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                  Moonblade Babe
                </h3>

                <p className="mt-3 font-serif text-lg sm:text-xl italic text-ink/90 leading-snug">
                  "She’s got Sailor Moon dreams and Sephiroth hands. Silver, sharp, and ready to slice through your excuses."
                </p>

                <p className="mt-4 text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
                  {t(
                    'Glasklare Stiletto-Tips mit flüssig aufmodellierten 3D-Chrom-Schwertern, Dolchen und messerscharfer Cyber-Ästhetik. Hochglänzendes Silber auf transparenter Basis.',
                    'Glass-clear stiletto tips with extruded 3D molten chrome swords, daggers, and razor-sharp cyber sigilism. High-shine liquid armor on transparent architecture.'
                  )}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-ink/20">
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Liquid Molten Chrome', '3D Daggers & Swords', 'Glass Stiletto', 'Cyber Sigilism', 'Sephiroth Hands'].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-concrete border border-ink text-ink font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold py-3.5 bg-ink text-white hover:bg-magenta transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
                >
                  <span>{t('Diesen Stil anfragen', 'Inquire this style')}</span>
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Diptych 03: Camo Baby & Bloody Mary Rosary */}
        <div className="mt-12 bg-white border-2 border-ink p-6 sm:p-10 shadow-[6px_6px_0px_#0E0D10]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta">
                [ CAMO BABY · BLOODY MARY ]
              </span>
              <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink leading-tight">
                "Don't be shy, i'd love to make your nails."
              </h3>
              <p className="font-serif text-lg italic text-ink/80">
                "serving both ways — but make it cute."
              </p>
              <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
                {t(
                  'Ob gotische Rosenkränze auf schwarzem Leder oder Camouflage mit zarten rosa Schleifen – bei Nicole gibt es keine Stangenware. Jedes Set wird für dich handgemalt.',
                  'Whether gothic rosary beads draped across black leather or camouflage paired with delicate pink bows – every set is custom hand-painted for your aesthetic.'
                )}
              </p>
              <div className="mt-2">
                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
                >
                  <span>{t('Termin auf Instagram anfragen', 'DM @nailzbynicci to book')}</span>
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] border border-ink overflow-hidden bg-concrete">
                <Image
                  src="/images/readymag/rm_camo_baby_bows.jpg"
                  alt="Camo Baby with Pink Bows and Pearls"
                  fill
                  sizes="300px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-bold border border-ink">
                  CAMO BABY
                </div>
              </div>

              <div className="relative aspect-[4/5] border border-ink overflow-hidden bg-concrete">
                <Image
                  src="/images/readymag/rm_bloody_mary_rosary.jpg"
                  alt="Bloody Mary Rosary and Cross Nails"
                  fill
                  sizes="300px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-0.5 text-[9px] font-mono uppercase font-bold border border-ink">
                  BLOODY MARY
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
