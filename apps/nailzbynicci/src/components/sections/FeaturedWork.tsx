'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { galleryItems, GalleryItem } from '@/data/gallery'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

const GalleryLightbox = dynamic(
  () => import('@/components/gallery/GalleryLightbox'),
  { ssr: false }
)

export const FeaturedWork: React.FC = () => {
  const { locale, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const filterOptions = [
    { id: 'all', label: t('ALLE', 'ALL') },
    { id: 'dark-chrome', label: t('DARK & CHROM', 'DARK & CHROME') },
    { id: 'kawaii', label: t('KAWAII', 'KAWAII') },
    { id: 'glam-luxe', label: t('3D & CHARMS', '3D & CHARMS') },
    { id: 'press-on', label: t('PRESS-ONS', 'PRESS-ONS') },
  ]

  const filteredItems = galleryItems
    .filter((item) => activeCategory === 'all' || item.category === activeCategory)
    .slice(0, 8)

  return (
    <section id="work" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (Figma 1:1) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-8 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              {t('[ INDIVIDUELLE DESIGNS #01 · AUSGEWÄHLTE ARBEITEN · 2026 ]', '[ CUSTOM DESIGNS #01 · 11 SETS / SELECTED WORK · 2026 ]')}
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.92]">
              {locale === 'de' ? (
                <>
                  Handgemachte tragbare <br />
                  <span className="text-magenta">Nagelarchitektur.</span>
                </>
              ) : (
                <>
                  Custom Wearable <br />
                  <span className="text-magenta">Nail Architecture.</span>
                </>
              )}
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-6 py-3.5 bg-white text-ink hover:bg-black hover:text-white transition-all border border-ink shadow-[3px_3px_0px_#0E0D10] shrink-0"
          >
            <span>{t('Gesamtes Archiv ansehen (28 Sets)', 'View Full Archive (28 Sets)')}</span>
            <span className="ml-2 font-black">→</span>
          </Link>
        </div>

        {/* Filter Pills (Figma Master Component: Filter pill) */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-ink/20">
          {filterOptions.map((filter) => {
            const isActive = activeCategory === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-wider transition-all duration-150 border border-ink ${
                  isActive
                    ? 'bg-magenta text-white shadow-[2px_2px_0px_#0E0D10] scale-[1.02]'
                    : 'bg-white text-ink hover:bg-ink hover:text-white shadow-[2px_2px_0px_rgba(14,13,16,0.3)]'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Brutalist 4:5 Photo Grid (Figma 1:1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="group cursor-pointer bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-concrete">
                <Image
                  src={`/images/gallery/${item.id}-800.webp`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                />
                
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink">
                  #0{idx + 1}
                </div>

                <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink">
                  {item.categoryLabel[locale]}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-ink/60 font-bold mb-1">
                    <span>{item.length}</span>
                    <span className="text-magenta font-black">{item.tier} Tier</span>
                  </div>
                  <h3 className="font-sans font-black text-base uppercase tracking-tight text-ink group-hover:text-magenta transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-sans text-ink/75 line-clamp-2 leading-relaxed">
                    {item.description[locale]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold">
                  <span className="text-ink">APRÉS GEL-X</span>
                  <span className="text-magenta group-hover:underline">{t('VERGRÖSSERN ↗', 'ENLARGE ↗')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Editorial Statement */}
        <div className="mt-12 pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink/70 uppercase font-bold">
          <span>{t('EINZELSTÜCKE / DESIGNED VON NICOLE', 'ONE-OF-A-KIND SETS / DESIGNED BY NICOLE')}</span>
          <span className="text-magenta">100% APRÉS GEL-X SYSTEM · MÜNSTER</span>
        </div>

      </div>

      {selected && (
        <GalleryLightbox
          item={selected}
          items={filteredItems}
          onClose={() => setSelected(null)}
          onSelect={(item) => setSelected(item)}
        />
      )}
    </section>
  )
}
