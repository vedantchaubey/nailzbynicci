'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ImageCardProps {
  src: string
  alt: string
  caption?: string
  subtitle?: string
  aspectRatio?: '3/4' | '1/1' | '16/9'
  onClick?: () => void
  className?: string
  priority?: boolean
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  caption,
  subtitle,
  aspectRatio = '3/4',
  onClick,
  className,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const aspectClass = {
    '3/4': 'aspect-[3/4]',
    '1/1': 'aspect-square',
    '16/9': 'aspect-[16/9]',
  }[aspectRatio]

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-image bg-secondary-taupe/30 border border-neutral-border cursor-pointer select-none transition-all duration-650 ease-luxury hover:border-accent-amber/40 hover:shadow-xl hover:shadow-black/5',
        aspectClass,
        className
      )}
    >
      {/* Underlying Image */}
      <div className="absolute inset-0 transition-transform duration-750 ease-luxury group-hover:scale-[1.03]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-opacity duration-700 ease-luxury',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 mix-blend-overlay" />

      {/* Frosted Hover Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-base/80 via-primary-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-450 ease-luxury flex flex-col justify-end p-6 md:p-8">
        {caption && (
          <p className="font-serif text-xl sm:text-2xl text-primary-cream font-normal leading-tight">
            {caption}
          </p>
        )}
        {subtitle && (
          <p className="text-[10px] font-sans uppercase tracking-[0.18em] text-accent-amber mt-2">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase text-primary-cream/80">
          <span>View Archive Details</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  )
}
