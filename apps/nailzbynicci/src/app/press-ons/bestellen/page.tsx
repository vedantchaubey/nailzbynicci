'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'
import { Copy, Check, Ruler, PackageCheck, Send, Sparkles } from 'lucide-react'

export default function BestellenPage() {
  const { t, locale } = useLanguage()
  const [copied, setCopied] = useState(false)

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Press-Ons', 'Press-ons'), href: '/press-ons' },
    { name: t('Bestellen', 'Order'), href: '/press-ons/bestellen' },
  ]

  const dmOrderTemplate = locale === 'de'
    ? `Hey Nicci! 🩶 Ich möchte ein handgefertigtes Custom Press-On Set bestellen:
- Maße in mm (Daumen bis kleiner Finger):
  Links: [z.B. 16, 12, 13, 11, 9 mm]
  Rechts: [z.B. 16, 12, 13, 11, 9 mm]
- Wunschform & Länge: [z.B. Medium Almond / Long Stiletto]
- Design / Stil: [z.B. Dark Chrome Cyber / Soft Kawaii 3D]
- Lieferadresse in DE: [Wird nach Preisabstimmung übermittelt]
Inspo-Fotos habe ich angehängt! 🐾`
    : `Hey Nicci! 🩶 I would love to order a bespoke custom press-on set:
- Dimensions in mm (Thumb to Pinky):
  Left: [e.g. 16, 12, 13, 11, 9 mm]
  Right: [e.g. 16, 12, 13, 11, 9 mm]
- Desired Shape & Length: [e.g. Medium Almond / Long Stiletto]
- Style / Theme: [e.g. Dark Chrome Cyber / Soft Kawaii 3D]
- Shipping within Germany: [Will provide after price confirmation]
Attached my inspiration images! 🐾`

  const copyTemplate = () => {
    navigator.clipboard.writeText(dmOrderTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ BESTELL-LEITFADEN · VERSAND DEUTSCHLANDWEIT ]', '[ ORDER GUIDE · TRACKED GERMANY SHIPPING ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.9] mb-4">
            Custom Press-on Nägel bestellen:<br />
            <span className="text-magenta">Größen messen & Instagram DM.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            {t(
              'Jedes Set wird von Nicole persönlich auf 100% originalen Aprés Gel-X Soft-Gelen handgefertigt und millimetergenau auf deine Naturnägel angepasst. Hier erfährst du, wie du deine Größen in 2 Minuten ausmisst und dein Wunschdesign anfragst.',
              'Every set is hand-sculpted by Nicole on 100% genuine Aprés Gel-X architecture, measured down to the millimeter. Here is how to measure your nail widths in 2 minutes and submit your order.'
            )}
          </p>
        </div>

        {/* 3-Step Order Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-magenta text-white flex items-center justify-center font-mono font-black text-xl border-2 border-ink mb-6">
                <Ruler className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
                {t('SCHRITT 01', 'STEP 01')}
              </span>
              <h2 className="font-sans font-black text-xl uppercase tracking-tight mb-4">
                {t('Nagelbreiten messen', 'Measure Nail Widths')}
              </h2>
              <p className="font-sans text-sm text-ink/80 leading-relaxed mb-4">
                {t(
                  'Klebe ein Stück Tesafilm quer über die breiteste Stelle deines Nagels, markiere die beiden Seitenkanten mit einem Kugelschreiber und lies die Millimeter auf einem Lineal ab.',
                  'Place clear adhesive tape across the widest zone of your nail bed, mark both sidewalls with a pen, and read the millimeter span against a metric ruler.'
                )}
              </p>
            </div>
            <div className="pt-4 border-t border-ink/20 text-xs font-mono font-bold text-magenta">
              {t('Tipp: Beide Hände messen!', 'Tip: Measure both hands!')}
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-ink text-white flex items-center justify-center font-mono font-black text-xl border-2 border-ink mb-6">
                <Send className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
                {t('SCHRITT 02', 'STEP 02')}
              </span>
              <h2 className="font-sans font-black text-xl uppercase tracking-tight mb-4">
                {t('Instagram DM senden', 'Send Instagram DM')}
              </h2>
              <p className="font-sans text-sm text-ink/80 leading-relaxed mb-4">
                {t(
                  'Kopiere unten unsere Vorlage und sende sie zusammen mit deinen Inspo-Fotos an @nailzbynicci. Nicole bestätigt die Umsetzbarkeit und den Festpreis (60 € bis 95 €).',
                  'Copy the template below and message it alongside your inspiration photos to @nailzbynicci. Nicole confirms feasibility and a firm quote (€60 to €95).'
                )}
              </p>
            </div>
            <div className="pt-4 border-t border-ink/20 text-xs font-mono font-bold text-ink">
              {t('Zahlung bequem via PayPal', 'Secure payment via PayPal')}
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white text-ink flex items-center justify-center font-mono font-black text-xl border-2 border-ink mb-6">
                <PackageCheck className="w-6 h-6 text-magenta" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
                {t('SCHRITT 03', 'STEP 03')}
              </span>
              <h2 className="font-sans font-black text-xl uppercase tracking-tight mb-4">
                {t('Handfertigung & DHL Versand', 'Crafting & Tracked Delivery')}
              </h2>
              <p className="font-sans text-sm text-ink/80 leading-relaxed mb-4">
                {t(
                  'Nach 5 bis 10 Werktagen feiner Handarbeit geht dein Set in einer edlen Aufbewahrungsbox inklusive vollständigem Prep-Kit per versichertem DHL-Paket auf die Reise.',
                  'Within 5 to 10 business days of artisanal sculpting, your set is dispatched in a collector keepsake box with a full prep kit via tracked DHL.'
                )}
              </p>
            </div>
            <div className="pt-4 border-t border-ink/20 text-xs font-mono font-bold text-magenta">
              {t('Deutschlandweiter Versand', 'Tracked Germany Shipping')}
            </div>
          </div>
        </div>

        {/* Copyable DM Template Box */}
        <div className="mb-16 p-8 md:p-12 bg-white border-2 border-ink shadow-[8px_8px_0px_#0E0D10]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b-2 border-ink gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-magenta font-black block mb-1">
                {t('[ 1-KLICK INSTAGRAM VORLAGE ]', '[ 1-CLICK INSTAGRAM TEMPLATE ]')}
              </span>
              <h2 className="font-sans font-black text-2xl uppercase">
                {t('Kopieren & per Instagram DM senden', 'Copy & Message to Nicole')}
              </h2>
            </div>
            <button
              onClick={copyTemplate}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-black px-6 py-3 bg-magenta text-white hover:bg-black transition-colors border-2 border-ink shadow-[3px_3px_0px_#0E0D10]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('KOPIERT!', 'COPIED!')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t('VORLAGE KOPIEREN', 'COPY TEMPLATE')}</span>
                </>
              )}
            </button>
          </div>

          <pre className="font-mono text-xs md:text-sm bg-concrete p-6 border-2 border-ink whitespace-pre-wrap leading-relaxed select-all">
            {dmOrderTemplate}
          </pre>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-ink/70">
              {t(
                'Klicke auf den Button, um den Text direkt in deine Zwischenablage zu laden.',
                'Click the button to load the text directly onto your clipboard.'
              )}
            </span>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-mono text-xs uppercase tracking-widest font-black text-magenta hover:underline"
            >
              {t('Direkt zu @nailzbynicci auf Instagram öffnen ↗', 'Open @nailzbynicci on Instagram ↗')}
            </a>
          </div>
        </div>

        {/* What’s Inside The Prep Kit */}
        <div className="mb-16 p-8 bg-concrete border-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-widest text-magenta font-black block mb-2">
            {t('[ JEDEM SET BEILIEGEND ]', '[ INCLUDED WITH EVERY SET ]')}
          </span>
          <h2 className="font-sans font-black text-2xl md:text-3xl uppercase mb-6">
            {t('Dein vollständiges Studio Prep-Kit', 'Your Studio Prep & Application Kit')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-white border border-ink">
              <span className="font-mono text-xs font-bold block mb-1">01 · Buffer</span>
              <p className="text-xs text-ink/70">
                {t('Zum sanften Anrauen deines Naturnagels für maximale Haftung.', 'Gently buffs the natural plate for maximum adhesion.')}
              </p>
            </div>
            <div className="p-4 bg-white border border-ink">
              <span className="font-mono text-xs font-bold block mb-1">02 · Klebetabs</span>
              <p className="text-xs text-ink/70">
                {t('24x wiederverwendbare Klebestreifen für 1–3 Tage Halt ohne Rückstände.', '24x reusable adhesive tabs for 1-3 days wear.')}
              </p>
            </div>
            <div className="p-4 bg-white border border-ink">
              <span className="font-mono text-xs font-bold block mb-1">03 · Flüssigkleber</span>
              <p className="text-xs text-ink/70">
                {t('Präzisions-Nagelkleber für dauerhaften Halt von bis zu 2–3 Wochen.', 'Precision nail glue for up to 2-3 weeks wear.')}
              </p>
            </div>
            <div className="p-4 bg-white border border-ink">
              <span className="font-mono text-xs font-bold block mb-1">04 · Holzstäbchen & Pads</span>
              <p className="text-xs text-ink/70">
                {t('Rosenholzstäbchen zum Zurückschieben der Haut & 2x Alkohol-Prep-Pads.', 'Cuticle pusher & 2x isopropyl alcohol prep pads.')}
              </p>
            </div>
          </div>
        </div>

        <InstagramCTA
          headline={t('JETZT DEIN WUNSCHDESIGN ANFRAGEN', 'ORDER YOUR BESPOKE PRESS-ON SET')}
          subheadline={t(
            'Lass uns dein persönliches Set kreieren. Handgefertigt aus 100% Aprés Gel-X für ganz Deutschland.',
            'Let us sculpt your personalized set. Handcrafted on 100% Aprés Gel-X for all of Germany.'
          )}
        />
      </div>
    </div>
  )
}
