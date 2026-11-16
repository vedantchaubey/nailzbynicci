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

export default function ChromeNaegelPage() {
  const { t, locale } = useLanguage()
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const chromeItems = galleryItems.filter((i) => i.category === 'dark-chrome')

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Galerie', 'Gallery'), href: '/galerie' },
    { name: t('Chrome Nägel', 'Chrome Nails'), href: '/galerie/chrome-naegel' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ STIL-FOKUS: DARK & CHROME ]', '[ STYLE FOCUS: DARK & CHROME ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.9] mb-4">
            Chrome Nägel Münster:<br />
            <span className="text-magenta">Liquid Metal & Cyber Sigilism.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            {t(
              'Auf der Suche nach echten Chrome Nägeln in Münster? Im privaten Atelier kombiniere ich hochglänzenden Spiegelchrom, flüssiges Quecksilber (Liquid Metal), gotische Cyber-Sigilism Linien und 3D-Stacheln auf 100% schonendem Aprés Gel-X.',
              'Searching for authentic bespoke chrome nails in Münster? In my private studio, I fuse mirror silver chrome, molten liquid metal, gothic cyber-sigilism linework, and 3D spikes on 100% pure Aprés Gel-X architecture.'
            )}
          </p>
        </div>

        {/* Technical Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('01 · KEIN ABBLÄTTERN', '01 · ZERO PEELING')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Durch mikroskopische Kanten-Präparation und meine Double-Seal Versiegelung bleibt der Chromspiegel bis zu 6 Wochen geschlossen.',
                'Microscopic free-edge prepping and double-seal encapsulation guarantee chrome retention for up to 6 weeks.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('02 · ECHTES 3D LIQUID METAL', '02 · TRUE 3D LIQUID METAL')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Keine flachen Folien: Organische Wassertropfen, Rüstungs-Reliefs und gotische Kreuze werden von Hand skulpturiert.',
                'Never flat stickers: Organic dew drops, armor reliefs, and gothic filigree sculpted entirely by hand.'
              )}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('03 · 100% APRÉS GEL-X', '03 · 100% APRÉS GEL-X')}
            </span>
            <p className="text-xs font-sans text-ink/80">
              {t(
                'Sanft zu Naturnägeln, unzerbrechlich im Alltag und vollkommen frei von giftigen Acryldämpfen.',
                'Gentle on natural nail beds, impact-resistant for everyday wear, and completely free of toxic acrylic fumes.'
              )}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chromeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="group cursor-pointer bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src={`/images/gallery/${item.id}-800.webp`}
                  alt={`Chrome Nägel Münster - ${item.title}`}
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
              {t('RATGEBER & WISSEN', 'GUIDE & EXPERTISE')}
            </span>
            <p className="font-sans font-bold text-sm">
              {t(
                'Warum platzt Chrome in manchen Studios ab und wie pflegt man ihn zu Hause?',
                'Why does chrome chip in some salons and how do you care for it at home?'
              )}
            </p>
          </div>
          <Link
            href="/ratgeber/chrome-naegel-pflege-haltbarkeit"
            className="font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 bg-ink text-white hover:bg-magenta transition-colors whitespace-nowrap"
          >
            {t('ZUM CHROME GUIDE ↗', 'READ CHROME GUIDE ↗')}
          </Link>
        </div>

        <InstagramCTA
          headline={t('DEIN CHROME-SET IN MÜNSTER ANFRAGEN', 'ORDER YOUR BESPOKE CHROME SET')}
          subheadline={t(
            'Sende mir einfach deine Design-Ideen via Instagram DM. Termine im Münsteraner Atelier oder als handgefertigte Custom Press-Ons für ganz Deutschland.',
            'Send your design ideas directly via Instagram DM. Studio appointments in Münster or custom-sized press-ons across Germany.'
          )}
        />

        {selected && (
          <GalleryLightbox
            item={selected}
            items={chromeItems}
            onClose={() => setSelected(null)}
            onSelect={(item) => setSelected(item)}
          />
        )}
      </div>
    </div>
  )
}
