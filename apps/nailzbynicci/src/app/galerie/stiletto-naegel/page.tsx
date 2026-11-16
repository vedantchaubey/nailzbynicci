'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { galleryItems, GalleryItem } from '@/data/gallery'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { useLanguage } from '@/lib/languageContext'

const GalleryLightbox = dynamic(
  () => import('@/components/gallery/GalleryLightbox'),
  { ssr: false }
)

export default function StilettoNaegelPage() {
  const { t, locale } = useLanguage()
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const stilettoItems = galleryItems.filter((i) => i.category === 'glam-luxe')

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Galerie', 'Gallery'), href: '/galerie' },
    { name: t('Stiletto Nägel', 'Stiletto Nails'), href: '/galerie/stiletto-naegel' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ STIL-FOKUS: STILETTO CLAWS & EXTREME LÄNGEN ]', '[ STYLE FOCUS: STILETTO CLAWS & EXTREME LENGTH ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.9] mb-4">
            Stiletto Nägel Münster:<br />
            <span className="text-magenta">Gothic Claws & High Glamour.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            {t(
              'Auf der Suche nach dramatischen Stiletto Nägeln in Münster? Im privaten Atelier modelliere ich messerscharfe Krallen, extreme Längen (Long bis Extreme) und Gothic-Architektur auf 100% originalem Aprés Gel-X für maximale Stoßfestigkeit.',
              'Looking for dramatic stiletto nails in Münster? In my studio, I sculpt razor-sharp claws, extreme lengths, and gothic architectural statements on 100% genuine Aprés Gel-X for maximum structural impact tolerance.'
            )}
          </p>
        </div>

        {/* Technical Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('01 · STATISCH VERSTÄRKTER APEX', '01 · REINFORCED APEX')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Lange Nägel brauchen präzise Statik: Der verstärkte Stresspunkt fängt Hebelkräfte beim Greifen und Tippen zuverlässig ab.',
                'Long sets require flawless physics: an anatomically reinforced apex absorbs leverage stress effortlessly.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('02 · KEIN ACRYL-SPLITTERN', '02 · ZERO BRITTLE SHATTERING')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Soft Gel besitzt eine natürliche Elastizität – stößt du an, federt der Nagel elastisch mit, anstatt schmerzhaft zu splittern.',
                'Soft gel has natural tensile flex — accidental impacts bounce harmlessly rather than shattering natural nail beds.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('03 · ALLTAGSTAUGLICHE TIPPS', '03 · ERGONOMIC ADAPTATION')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Im Termin zeige ich dir genau, wie du mit Stilettos mühelos auf Smartphones und Tastaturen tippst, ohne die Spitzen zu belasten.',
                'During your appointment, I demonstrate finger-pad typing ergonomics for smartphones and keyboards.'
              )}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stilettoItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="group cursor-pointer bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src={`/images/gallery/${item.id}-800.webp`}
                  alt={`Stiletto Nägel Münster - ${item.title}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black border border-ink">
                  {item.tier} Tier
                </div>
                <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-0.5 text-[9px] font-mono uppercase font-black border border-ink">
                  {item.categoryLabel[locale]}
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-ink/60 font-semibold">
                    <span>{item.length}</span>
                    <span className="text-magenta font-black">{item.price}</span>
                  </div>
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink mt-1 group-hover:text-magenta transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs font-sans text-ink/75 line-clamp-2 leading-relaxed">
                    {item.description[locale]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related Guide Link */}
        <div className="mt-12 p-6 bg-white border-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-magenta block mb-1">
              {t('FORMEN-GUIDE & ALLTAGSTAUGLICHKEIT', 'SHAPE GUIDE & ERGONOMICS')}
            </span>
            <p className="font-sans font-bold text-sm">
              {t(
                'Stiletto vs. Almond: Welche Nagelform passt wirklich zu deiner Arbeit und deinem Alltag?',
                'Stiletto vs. Almond: Which nail silhouette truly fits your work and lifestyle?'
              )}
            </p>
          </div>
          <Link
            href="/ratgeber/stiletto-vs-almond-welche-form"
            className="font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 bg-ink text-white hover:bg-magenta transition-colors whitespace-nowrap"
          >
            {t('ZUM FORMEN-VERGLEICH ↗', 'READ SHAPE GUIDE ↗')}
          </Link>
        </div>

        <InstagramCTA
          headline={t('DEIN STILETTO-SET IN MÜNSTER ANFRAGEN', 'ORDER YOUR BESPOKE STILETTO SET')}
          subheadline={t(
            'Ob Long Stiletto oder Custom Claws: Sende deine Inspo direkt via Instagram DM an Nicole. Auch als handgefertigte Press-Ons für ganz Deutschland.',
            'Whether Long Stiletto or dramatic Claws: send your ideas directly via Instagram DM. Available in Münster or as custom press-ons.'
          )}
        />

        {selected && (
          <GalleryLightbox
            item={selected}
            items={stilettoItems}
            onClose={() => setSelected(null)}
            onSelect={(item) => setSelected(item)}
          />
        )}
      </div>
    </div>
  )
}
