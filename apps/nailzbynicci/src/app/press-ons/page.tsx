'use client'

import React from 'react'
import Link from 'next/link'
import { pressOnItems } from '@/data/pressons'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'
import { LazyVideoCard } from '@/components/ui/LazyVideoCard'

export default function PressOnsPage() {
  const { locale, t } = useLanguage()

  const allVideos = [
    { id: '1', title: 'Molten Chrome Cyber Spikes', file: '/images/source/press-on/Video-14378.mp4', poster: '/images/posters/Video-14378.webp', style: 'Dark & Chrome' },
    { id: '2', title: 'Kawaii 3D Ribbon & Blossom', file: '/images/source/press-on/Video-2046.mp4', poster: '/images/posters/Video-2046.webp', style: 'Soft Kawaii' },
    { id: '3', title: 'Noir Cherry Glass Aura', file: '/images/source/press-on/Video-26701.mp4', poster: '/images/posters/Video-26701.webp', style: 'Dark Velvet' },
    { id: '4', title: 'Haute Pearl Glazed Chrome', file: '/images/source/press-on/Video-26925.mp4', poster: '/images/posters/Video-26925.webp', style: 'High Glam' },
    { id: '5', title: 'Obsidian Spiderweb & Sigils', file: '/images/source/press-on/Video-30564.mp4', poster: '/images/posters/Video-30564.webp', style: 'Cyber Gothic' },
    { id: '6', title: 'Emerald Snake Scale 3D', file: '/images/source/press-on/Video-30962.mp4', poster: '/images/posters/Video-30962.webp', style: 'Gothic Green' },
    { id: '7', title: '3D Bear & Peach Jelly Dew', file: '/images/source/press-on/Video-43166.mp4', poster: '/images/posters/Video-43166.webp', style: 'Kawaii Charm' },
    { id: '8', title: 'Liquid Platinum Sculpted Stiletto', file: '/images/source/press-on/Video-44921.mp4', poster: '/images/posters/Video-44921.webp', style: 'Liquid Chrome' },
    { id: '9', title: 'Double Smile Arch French', file: '/images/source/press-on/Video-56462.mp4', poster: '/images/posters/Video-56462.webp', style: 'Clean Luxe' },
    { id: '10', title: 'Vampy Blood Drop Stiletto', file: '/images/source/press-on/Video-74836.mp4', poster: '/images/posters/Video-74836.webp', style: 'Blood Velvet' },
    { id: '11', title: 'Coquette Angel Wings & Pearls', file: '/images/source/press-on/Video-75889.mp4', poster: '/images/posters/Video-75889.webp', style: 'Soft Kawaii' },
    { id: '12', title: 'Silver Thorn Edge Armor', file: '/images/source/press-on/Video-82701.mp4', poster: '/images/posters/Video-82701.webp', style: 'Cyber Armor' },
  ]

  const sizeChart = [
    { size: 'XS', thumb: '14mm', index: '11mm', middle: '12mm', ring: '10mm', pinky: '8mm' },
    { size: 'S', thumb: '15mm', index: '12mm', middle: '13mm', ring: '11mm', pinky: '9mm' },
    { size: 'M', thumb: '16mm', index: '13mm', middle: '14mm', ring: '12mm', pinky: '10mm' },
    { size: 'L', thumb: '18mm', index: '14mm', middle: '15mm', ring: '13mm', pinky: '11mm' },
    { size: 'Custom', thumb: 'Individuell', index: 'Individuell', middle: 'Individuell', ring: 'Individuell', pinky: 'Individuell' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              {t('[ MASSGEFERTIGTE PRESS-ONS · VERSAND NUR INNERHALB DEUTSCHLANDS ]', '[ CUSTOM PRESS-ONS · SHIPPING GERMANY ONLY ]')}
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88]">
              {locale === 'de' ? (
                <>
                  Wiederverwendbare <br />
                  <span className="text-magenta">Press-On Sets.</span>
                </>
              ) : (
                <>
                  Custom Reusable<br />
                  <span className="text-magenta">Press-On Sets.</span>
                </>
              )}
            </h1>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                'Für alle, die nicht ins Homestudio nach Münster kommen können: Jedes Set wird auf originalen Aprés Gel-X Spitzen handbemalt, mehrfach versiegelt und per Post geliefert.',
                'For clients across Germany: Each set is hand-painted on genuine Aprés Gel-X tips, fortified with high-gloss coats, and delivered with tracked shipping.'
              )}
            </p>
          </div>
        </div>

        {/* 12 Video Master Showcases Grid */}
        <div id="press-on-showcase-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 items-stretch">
          {allVideos.map((item) => (
            <LazyVideoCard
              key={item.id}
              id={item.id}
              title={item.title}
              file={item.file}
              poster={item.poster}
              style={item.style}
              bookingUrl={brand.bookingUrl}
              inquireLabel={t('Anfragen ↗', 'Inquire ↗')}
            />
          ))}
        </div>

        {/* Sizing Guide */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-1">
              {t('[ GRÖSSEN-LEITFADEN · MILLIMETER ]', '[ SIZING BLUEPRINT · MILLIMETERS ]')}
            </span>
            <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-ink">
              {t('Wie messe ich meine Naturnägel?', 'How do I measure my natural nails?')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans">
              {t(
                'Klebeband flach über die breiteste Stelle deines Nagels kleben, beide Seitenränder mit einem feinen Stift markieren, abziehen und auf einem Lineal in Millimetern ablesen.',
                'Place clear tape across the widest part of your natural nail bed, mark the sidewalls with a fine-tip pen, remove the tape, and measure the distance on a ruler in millimeters.'
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse border-2 border-ink">
              <thead>
                <tr className="bg-ink text-white font-black">
                  <th className="py-3 px-4 border border-ink">{t('Größe', 'Size')}</th>
                  <th className="py-3 px-4 border border-ink">{t('Daumen', 'Thumb')}</th>
                  <th className="py-3 px-4 border border-ink">{t('Zeige', 'Index')}</th>
                  <th className="py-3 px-4 border border-ink">{t('Mittel', 'Middle')}</th>
                  <th className="py-3 px-4 border border-ink">{t('Ring', 'Ring')}</th>
                  <th className="py-3 px-4 border border-ink">{t('Kleiner', 'Pinky')}</th>
                </tr>
              </thead>
              <tbody className="bg-concrete font-bold text-ink">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-white border-t border-ink/30">
                    <td className="py-3 px-4 font-black border border-ink text-magenta">{row.size}</td>
                    <td className="py-3 px-4 border border-ink">{row.thumb}</td>
                    <td className="py-3 px-4 border border-ink">{row.index}</td>
                    <td className="py-3 px-4 border border-ink">{row.middle}</td>
                    <td className="py-3 px-4 border border-ink">{row.ring}</td>
                    <td className="py-3 px-4 border border-ink">{row.pinky}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ordering Notice Banner */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-magenta font-black block mb-2">
            [ HOW TO ORDER ]
          </span>
          <h3 className="font-sans font-black text-3xl uppercase tracking-tight text-ink">
            {t('Individuelle Press-On Bestellung', 'Order Your Custom Press-On Set')}
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-ink/80 mb-6 font-sans">
            {t(
              'Sende Nicole deine Nagelmaße und dein Wunschdesign auf Instagram DM. Bezahlung via PayPal. Versand nur innerhalb Deutschlands.',
              'Send Nicole your millimeter measurements and inspiration photo via Instagram DM. Payment via PayPal. Shipping Germany only.'
            )}
          </p>
          <a
            href={brand.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono uppercase tracking-[0.16em] text-xs font-black px-8 py-4 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
          >
            <span>{t('Press-Ons via DM anfragen ↗', 'Inquire Press-Ons via DM ↗')}</span>
          </a>
        </div>

      </div>
    </div>
  )
}
