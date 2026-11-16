'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { galleryItems, GalleryItem } from '@/data/gallery'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { useLanguage } from '@/lib/languageContext'

const GalleryLightbox = dynamic(
  () => import('@/components/gallery/GalleryLightbox'),
  { ssr: false }
)

export default function KawaiiNaegelPage() {
  const { t, locale } = useLanguage()
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const kawaiiItems = galleryItems.filter((i) => i.category === 'kawaii')

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Galerie', 'Gallery'), href: '/galerie' },
    { name: t('Kawaii Nägel', 'Kawaii Nails'), href: '/galerie/kawaii-naegel' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ STIL-FOKUS: SOFT KAWAII & 3D CHARMS ]', '[ STYLE FOCUS: SOFT KAWAII & 3D CHARMS ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.9] mb-4">
            Kawaii Nägel Münster:<br />
            <span className="text-magenta">3D Charms, Jelly Aura & Coquette.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            {t(
              'Auf der Suche nach echten Kawaii Nägeln in Münster? Im privaten Atelier verbinde ich japanische 3D-Nailart mit zarten Jelly-Lackierungen, handmodellierten Schleifen, Herzen und zuckersüßen Charms auf 100% schonendem Aprés Gel-X.',
              'Seeking genuine soft kawaii nail art in Münster? At my private studio, I combine Japanese 3D sculpting with sheer jelly colors, hand-sculpted bows, hearts, and pastel charms on 100% gentle Aprés Gel-X.'
            )}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('01 · BOMBENFEST VERANKERT', '01 · ANCHORED STRENGTH')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Alle 3D-Charms und Kristalle werden mit hochfestem Builder-Gel formschlüssig versiegelt – kein Hängenbleiben in Kleidung oder Haaren.',
                'Every charm is encapsulated in high-viscosity structural gel — zero snagging in knitwear or hair.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('02 · JELLY & AURA BLUSH', '02 · JELLY & AURA BLUSH')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Sanft verlaufende Farbkerne wie bei koreanischem Blush-Naildesign, transparent überzogen für glasartigen Glanz.',
                'Softly diffused blush cores inspired by Korean nail aesthetics, glazed with translucent jelly finishes.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('03 · INDIVIDUELL ANGEFERTIGT', '03 · BESPOKE SCULPTING')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Keine vorgefertigten Plastikteile von der Stange: Viele Akzente werden während des Termins frisch auf deinem Nagel geformt.',
                'Never generic bulk plastic: key focal accents are hand-sculpted live at your appointment.'
              )}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {kawaiiItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="group cursor-pointer bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src={`/images/gallery/${item.id}-800.webp`}
                  alt={`Kawaii Nägel Münster - ${item.title}`}
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

        <InstagramCTA
          headline={t('DEIN KAWAII-SET IN MÜNSTER ANFRAGEN', 'ORDER YOUR BESPOKE KAWAII SET')}
          subheadline={t(
            'Bring deine Lieblings-Inspo mit oder lass Nicole ein ganz persönliches 3D-Set kreieren. Im Münsteraner Atelier oder als handgefertigte Press-Ons.',
            'Bring your favorite references or let Nicole create an original 3D set. At the Münster studio or as custom press-on nails.'
          )}
        />

        {selected && (
          <GalleryLightbox
            item={selected}
            items={kawaiiItems}
            onClose={() => setSelected(null)}
            onSelect={(item) => setSelected(item)}
          />
        )}
      </div>
    </div>
  )
}
