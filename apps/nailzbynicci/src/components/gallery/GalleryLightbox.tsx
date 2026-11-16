'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { GalleryItem } from '@/data/gallery'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

interface GalleryLightboxProps {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onSelect: (item: GalleryItem) => void
}

export default function GalleryLightbox({
  item,
  items,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  const { locale, t } = useLanguage()
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const currentIndex = items.findIndex((i) => i.id === item.id)
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1]
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onSelect(prevItem)
      if (e.key === 'ArrowRight') onSelect(nextItem)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [prevItem, nextItem, onClose, onSelect])

  // Touch Swipe Handlers (iOS / Android gesture navigation)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      onSelect(nextItem)
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      onSelect(prevItem)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  // 1600px high-resolution retina asset for lightbox
  const highResSrc = `/images/gallery/${item.id}-1600.webp`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('Bild-Detailansicht', 'Image Details')}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative max-w-4xl w-full bg-[#18181B] text-white border-2 border-white shadow-[8px_8px_0px_#FF007A] p-5 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(prevItem)
          }}
          aria-label="Previous image"
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 min-w-[44px] min-h-[44px] items-center justify-center bg-black text-white hover:bg-magenta hover:text-white border-2 border-white transition-all shadow-[2px_2px_0px_#000] text-lg font-black"
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(nextItem)
          }}
          aria-label="Next image"
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 min-w-[44px] min-h-[44px] items-center justify-center bg-black text-white hover:bg-magenta hover:text-white border-2 border-white transition-all shadow-[2px_2px_0px_#000] text-lg font-black"
        >
          ›
        </button>

        {/* 1600px Retina Image Display Frame */}
        <div className="relative aspect-[4/5] w-full md:w-1/2 border-2 border-white overflow-hidden bg-black flex-shrink-0 shadow-[4px_4px_0px_#0E0D10]">
          <Image
            src={highResSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={item.image.blurDataURL}
          />

          {/* Swipe Hint on Mobile */}
          <div className="md:hidden absolute bottom-2 inset-x-0 text-center pointer-events-none">
            <span className="text-[9px] font-mono uppercase tracking-widest text-white bg-black/80 px-2.5 py-1 border border-white">
              {t('← Wischen für mehr →', '← Swipe for more →')}
            </span>
          </div>
        </div>

        {/* Right Editorial Info Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/20">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-magenta font-black">
                {item.categoryLabel[locale]} · {item.tier} TIER
              </span>
              {/* Close Button with 44x44px Minimum Touch Target */}
              <button
                onClick={onClose}
                aria-label="Close lightbox"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-sm font-mono uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block font-bold">
                {item.id.toUpperCase()} · 100% APRÉS GEL-X
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                {item.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 font-mono">
                <span className="text-2xl text-magenta font-black">{item.price}</span>
                <span className="text-xs text-white/70">· {item.length}</span>
              </div>
            </div>

            <p className="mt-5 text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {item.description[locale]}
            </p>

            <div className="mt-6 p-4 bg-black/60 border border-white/20 text-xs font-mono space-y-2">
              <div className="flex justify-between text-white/60">
                <span>{t('SYSTEM', 'SYSTEM')}</span>
                <span className="text-white font-bold">Aprés Gel-X</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>{t('MATERIAL', 'MATERIAL')}</span>
                <span className="text-white font-bold">{t('100% Soft-Gel Architektur', '100% Soft-Gel Architecture')}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>{t('HALTBARKEIT', 'RETENTION')}</span>
                <span className="text-white font-bold">{t('4–6 Wochen', '4–6 Weeks')}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] inline-flex items-center justify-center font-mono tracking-wider uppercase text-xs font-black px-6 py-3.5 bg-magenta text-white hover:bg-white hover:text-black transition-all border border-white shadow-[3px_3px_0px_#000] text-center"
            >
              <span>{t('Set auf Instagram anfragen ↗', 'Inquire Set on Instagram ↗')}</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="min-h-[44px] px-6 py-3.5 border border-white/40 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            >
              {t('Schließen', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
