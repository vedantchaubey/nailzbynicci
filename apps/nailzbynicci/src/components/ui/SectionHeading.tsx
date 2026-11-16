import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  italicPart?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  light?: boolean
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicPart,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 md:mb-18',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-4 text-blossom">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.015em] leading-[1.15] text-white">
        {title}{' '}
        {italicPart && (
          <span className="font-serif italic font-normal text-chrome">
            {italicPart}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-sm sm:text-base font-sans leading-[1.7] text-fog-light">
          {description}
        </p>
      )}
    </div>
  )
}
