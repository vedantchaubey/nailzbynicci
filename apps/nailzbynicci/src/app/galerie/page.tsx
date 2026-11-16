'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { galleryItems, GalleryItem } from '@/data/gallery'
import { useLanguage } from '@/lib/languageContext'

const GalleryLightbox = dynamic(
  () => import('@/components/gallery/GalleryLightbox'),
  { ssr: false }
)

type FilterKey = 'all' | 'dark-chrome' | 'kawaii' | 'glam-luxe'

export default function GalleryPage() {
  const { locale, t } = useLanguage()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [visibleCount, setVisibleCount] = useState(12)

  const filters: { key: FilterKey; label: { de: string; en: string }; count: number }[] = [
    { key: 'all', label: { de: 'Alle Arbeiten', en: 'All Sets' }, count: galleryItems.length },
    { key: 'dark-chrome', label: { de: 'Dark & Chrome', en: 'Dark & Chrome' }, count: galleryItems.filter(i => i.category === 'dark-chrome').length },
    { key: 'kawaii', label: { de: 'Soft Kawaii', en: 'Soft Kawaii' }, count: galleryItems.filter(i => i.category === 'kawaii').length },
    { key: 'glam-luxe', label: { de: 'High Glam', en: 'High Glam' }, count: galleryItems.filter(i => i.category === 'glam-luxe').length },
  ]

  const filteredItems = useMemo(() => {
    if (filter === 'all') return galleryItems
    return galleryItems.filter((i) => i.category === filter)
  }, [filter])

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = (newFilter: FilterKey) => {
    setFilter(newFilter)
    setVisibleCount(12)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length))
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              [ MONOGRAPH ARCHIVE · 28 BESPOKE SETS ]
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88]">
              The Atelier<br />
              <span className="text-magenta">Archive.</span>
            </h1>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                'Alle Sets wurden im privaten Homestudio in Münster auf 100% reinem Aprés Gel-X handgefertigt. Klicke auf ein Set für hochauflösende 1600px Detailaufnahmen.',
                'Every set was hand-sculpted in the private Münster home sanctuary on 100% pure Aprés Gel-X architecture. Click any set for 1600px high-resolution detail views.'
              )}
            </p>
          </div>
        </div>

        {/* Brutalist Filter Navigation */}
        <div className="flex flex-wrap items-center gap-3 mb-12 pb-6 border-b-2 border-ink">
          {filters.map((f) => {
            const isActive = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`min-h-[44px] px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider border-2 border-ink transition-all ${
                  isActive
                    ? 'bg-magenta text-white shadow-[3px_3px_0px_#0E0D10]'
                    : 'bg-white text-ink hover:bg-black hover:text-white shadow-[2px_2px_0px_#0E0D10]'
                }`}
              >
                <span>{f.label[locale]}</span>
                <span className="ml-2 font-mono text-[10px]">({f.count})</span>
              </button>
            )
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
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
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                />
                
                {/* Top Corner Badges */}
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black border border-ink">
                  {item.tier} Tier
                </div>

                <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-0.5 text-[9px] font-mono uppercase font-black border border-ink">
                  {item.categoryLabel[locale]}
                </div>
              </div>

              {/* Caption */}
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

                <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold">
                  <span className="text-ink">100% APRÉS GEL-X</span>
                  <span className="text-magenta group-hover:underline">VERGRÖSSERN ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={handleLoadMore}
              className="min-h-[48px] px-8 py-4 font-mono text-xs uppercase font-black tracking-widest bg-white text-ink hover:bg-black hover:text-white transition-all border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
            >
              {t(
                `Weitere Arbeiten laden (${filteredItems.length - visibleCount} verbleibend)`,
                `Load More Archive Plates (${filteredItems.length - visibleCount} remaining)`
              )}
            </button>
          </div>
        )}

      </div>

      {selected && (
        <GalleryLightbox
          item={selected}
          items={filteredItems}
          onClose={() => setSelected(null)}
          onSelect={(item) => setSelected(item)}
        />
      )}
    </div>
  )
}
