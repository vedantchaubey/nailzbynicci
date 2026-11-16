'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  magnetic?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      href,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      magnetic = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group relative inline-flex items-center justify-center font-sans tracking-[0.14em] uppercase font-medium rounded-pill transition-all duration-450 ease-luxury focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-amber disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden'

    const sizeStyles = {
      sm: 'text-[10px] px-5 py-2.5 gap-2',
      md: 'text-[11px] px-8 py-3.5 gap-2.5',
      lg: 'text-[12px] px-10 py-4.5 gap-3',
    }[size]

    const variantStyles = {
      primary:
        'bg-primary-base text-primary-cream hover:bg-secondary-bordeaux hover:shadow-lg shadow-black/10 active:scale-[0.98]',
      secondary:
        'bg-secondary-taupe text-primary-base hover:bg-secondary-sand active:scale-[0.98]',
      outline:
        'border border-neutral-border text-primary-base hover:border-primary-base hover:bg-primary-base hover:text-primary-cream active:scale-[0.98]',
      gold:
        'bg-accent-amber text-primary-base hover:bg-[#b8956b] shadow-md shadow-accent-amber/20 active:scale-[0.98]',
      ghost:
        'text-primary-base hover:text-secondary-bordeaux hover:bg-secondary-taupe/40',
    }[variant]

    const content = (
      <>
        {isLoading && (
          <span className="inline-block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin mr-1" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* Subtle shimmer sheen */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transition-transform ease-out" />
      </>
    )

    if (href) {
      return (
        <Link
          href={href}
          className={cn(baseStyles, sizeStyles, variantStyles, className)}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(baseStyles, sizeStyles, variantStyles, className)}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
