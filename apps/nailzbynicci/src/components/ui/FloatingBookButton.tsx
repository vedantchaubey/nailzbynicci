'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const FloatingBookButton: React.FC = () => {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    let ticking = false
    let lastShow = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 400
          if (isOver !== lastShow) {
            lastShow = isOver
            setShow(isOver)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300 transform',
        show
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-8 opacity-0 pointer-events-none'
      )}
    >
      <a
        href={brand.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 rounded-full bg-black text-white hover:bg-magenta px-5 py-3 min-h-[44px] shadow-[3px_3px_0px_#0E0D10] border-2 border-ink transition-all duration-200 text-xs font-mono font-black uppercase tracking-widest"
      >
        <span className="w-2 h-2 rounded-full bg-magenta group-hover:bg-white animate-pulse" />
        <span>{t('Buchen ↗', 'Book ↗')}</span>
      </a>
    </div>
  )
}
