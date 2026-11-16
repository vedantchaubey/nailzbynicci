'use client'

import React, { useEffect, useState, useRef } from 'react'

interface PetalConfig {
  id: number
  left: string
  width: number
  height: number
  duration: string
  delay: string
  opacity: number
}

const DESKTOP_PETALS: PetalConfig[] = [
  { id: 1, left: '8%', width: 14, height: 18, duration: '9.5s', delay: '0s', opacity: 0.6 },
  { id: 2, left: '22%', width: 12, height: 15, duration: '12s', delay: '2.5s', opacity: 0.5 },
  { id: 3, left: '36%', width: 16, height: 20, duration: '10.8s', delay: '5.2s', opacity: 0.65 },
  { id: 4, left: '48%', width: 13, height: 16, duration: '11.5s', delay: '1.2s', opacity: 0.55 },
  { id: 5, left: '62%', width: 15, height: 19, duration: '13s', delay: '3.8s', opacity: 0.6 },
  { id: 6, left: '75%', width: 12, height: 15, duration: '10.2s', delay: '6.5s', opacity: 0.5 },
  { id: 7, left: '86%', width: 14, height: 17, duration: '11.8s', delay: '0.8s', opacity: 0.65 },
  { id: 8, left: '94%', width: 11, height: 14, duration: '12.5s', delay: '4.2s', opacity: 0.5 },
]

const MOBILE_PETALS: PetalConfig[] = [
  { id: 1, left: '15%', width: 12, height: 15, duration: '10s', delay: '0s', opacity: 0.55 },
  { id: 2, left: '42%', width: 13, height: 16, duration: '12s', delay: '2.8s', opacity: 0.6 },
  { id: 3, left: '70%', width: 11, height: 14, duration: '11s', delay: '1.4s', opacity: 0.5 },
  { id: 4, left: '88%', width: 13, height: 16, duration: '13s', delay: '4.5s', opacity: 0.55 },
]

export const PetalAtmosphere: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Check low-concurrency or low-power hardware
    const isLowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4
    // Check save data
    const nav = navigator as unknown as { connection?: { saveData?: boolean } }
    const isSaveData = Boolean(nav.connection?.saveData)

    if (prefersReducedMotion || isLowPower || isSaveData) {
      setDisabled(true)
      return
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    setMounted(true)

    // Pause petals when the parent or container is off-screen
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (disabled || !mounted) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
  }

  const petals = isMobile ? MOBILE_PETALS : DESKTOP_PETALS

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        // Hardware accelerated layer and automatic pause when off-screen
        contain: 'strict',
        visibility: isIntersecting ? 'visible' : 'hidden',
      }}
    >
      {isIntersecting &&
        petals.map((petal) => (
          <div
            key={petal.id}
            className="petal animate-petal-fall"
            style={{
              left: petal.left,
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              opacity: petal.opacity,
              willChange: 'transform, opacity',
            }}
          />
        ))}
    </div>
  )
}
