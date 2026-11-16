'use client'

import React, { useRef, useState } from 'react'
import { useLanguage } from '@/lib/languageContext'

interface LazyVideoCardProps {
  id: string
  title: string
  file: string
  poster: string
  style: string
  bookingUrl: string
  inquireLabel: string
}

export const LazyVideoCard: React.FC<LazyVideoCardProps> = ({
  title,
  file,
  poster,
  style,
  bookingUrl,
  inquireLabel,
}) => {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  const handleMouseLeave = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    setIsPlaying(false)
  }

  const handleTogglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white border-2 border-ink shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between h-full hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Video Container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-ink bg-concrete cursor-pointer"
        onClick={handleTogglePlay}
      >
        <video
          ref={videoRef}
          src={file}
          poster={poster}
          muted
          playsInline
          loop
          preload="none"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Style Tag Badge (Readymag Brutalist) */}
        <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink text-ink pointer-events-none shadow-[2px_2px_0px_#0E0D10]">
          {style}
        </div>

        {/* 100% Gel-X Badge */}
        <div className="absolute top-3 right-3 bg-magenta text-white px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest border border-ink pointer-events-none">
          100% GEL-X
        </div>

        {/* Play State Pill if Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 pointer-events-none transition-opacity">
            <div className="px-3 py-1.5 bg-white text-ink border-2 border-ink font-mono font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_#0E0D10] group-hover:scale-105 transition-transform flex items-center gap-1.5">
              <span>▶</span>
              <span>{t('VORSCHAU', 'PREVIEW')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60 font-bold block mb-1">
            {t('MASSGEFERTIGTES LUXUS-SET', 'CUSTOM LUXURY SET')}
          </span>
          <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink group-hover:text-magenta transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </div>

        <div className="mt-5 pt-3 border-t border-ink/20 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase font-bold text-ink/70 tracking-wider">
            {t('SAMMLERBOX', 'COLLECTOR BOX')}
          </span>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono tracking-wider uppercase text-xs font-black px-4 py-2 min-h-[44px] bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[2px_2px_0px_#0E0D10]"
          >
            <span>{inquireLabel}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
