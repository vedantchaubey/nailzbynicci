'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'
import { ShieldCheck, Sparkles, Feather, Clock, HeartHandshake, CheckCircle2 } from 'lucide-react'

export default function ApresGelXMuensterPage() {
  const { t } = useLanguage()

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Aprés Gel-X Münster', 'Aprés Gel-X Münster'), href: '/apres-gel-x-muenster' },
  ]

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Aprés Gel-X Nail Extensions',
    provider: {
      '@type': 'NailSalon',
      name: 'nailzbynicci',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Münster',
        addressRegion: 'NW',
        addressCountry: 'DE',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Münster',
    },
    description:
      '100% originale Aprés Gel-X Soft-Gel Neumodellagen in Münster. Sanfte Verlängerung ohne Acryl und Fräsen, 4 bis 6 Wochen Haltbarkeit.',
    offers: {
      '@type': 'Offer',
      price: '50.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
    },
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ 100% REINES SOFT-GEL ATELIER · MÜNSTER ]', '[ 100% PURE SOFT GEL STUDIO · MÜNSTER ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-6">
            Aprés Gel-X Münster:<br />
            <span className="text-magenta">Die gesunde Nagelarchitektur.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-ink/80 max-w-3xl leading-relaxed font-medium">
            {t(
              'Du suchst nach echten Aprés Gel-X Nägeln in Münster? Nicole (@nailzbynicci) ist deine spezialisierte Artistin für 100% originale Aprés Gel-X Soft-Gel Modellagen. Keine giftigen Acryldämpfe, kein aggressives Abfräsen bis auf den Naturnagel und garantierte 4 bis 6 Wochen Haltbarkeit ohne Liftings.',
              'Searching for genuine Aprés Gel-X in Münster? Nicole (@nailzbynicci) is your dedicated specialist for 100% authentic soft gel extensions. Zero toxic acrylic monomer fumes, zero aggressive drill trauma, and 4 to 6 weeks of pristine retention.'
            )}
          </p>
        </div>

        {/* Feature Grid: 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
            <Feather className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              01 · 100% Soft Gel
            </span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">
              {t('Kein starres Plastik', 'Zero Rigid Plastic')}
            </h3>
            <p className="text-xs font-sans text-ink/80 leading-relaxed">
              {t(
                'Gel-X Tips bestehen vollständig aus hochreinem Gel. Sie besitzen die gleiche molekulare Flexibilität wie dein Naturnagel.',
                'Gel-X tips are molded from pure soft gel formulation, mirroring the natural flexibility of your nail bed.'
              )}
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
            <Clock className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              02 · 4–6 Wochen Halt
            </span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">
              {t('Null Liftings', 'Zero Liftings')}
            </h3>
            <p className="text-xs font-sans text-ink/80 leading-relaxed">
              {t(
                'Dank gründlicher russischer E-File Trockenmaniküre wächst der Übergang zur Nagelhaut extrem sauber und flach heraus.',
                'Microscopic dry e-file preparation ensures that the cuticle transition grows out smoothly without catching.'
              )}
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
            <ShieldCheck className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              03 · Schont Naturnägel
            </span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">
              {t('15 Min. Soak-Off', '15 Min. Soak-Off')}
            </h3>
            <p className="text-xs font-sans text-ink/80 leading-relaxed">
              {t(
                'Vollständig in Aceton löslich. Kein schmerzhaftes Abfeilen bis auf das Nagelbett – dein Naturnagel bleibt unversehrt.',
                '100% dissolvable in pure acetone. Zero electric filing down to your natural plate keeps nails thick and healthy.'
              )}
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
            <HeartHandshake className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              04 · Geruchlos & Sicher
            </span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">
              {t('Keine Acryldämpfe', 'Zero Chemical Fumes')}
            </h3>
            <p className="text-xs font-sans text-ink/80 leading-relaxed">
              {t(
                'Entspanne in einem privaten Atelier ohne stechenden Monomer-Gestank, Staubwolken oder Kopfschmerzen.',
                'Relax in a private sanctuary free from pungent liquid monomer stench, dust clouds, or headaches.'
              )}
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table: Gel-X vs Traditional Acrylic */}
        <div className="mb-16 p-8 md:p-12 bg-white border-2 border-ink shadow-[8px_8px_0px_#0E0D10]">
          <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
            {t('[ DER CHEMISCHE VERGLEICH ]', '[ THE CHEMICAL COMPARISON ]')}
          </span>
          <h2 className="font-sans font-black text-2xl md:text-4xl uppercase tracking-tight mb-8">
            {t('Aprés Gel-X vs. Traditionelles Acryl', 'Aprés Gel-X vs. Traditional Acrylic')}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-ink bg-concrete text-ink font-mono uppercase text-xs">
                  <th className="p-4">{t('Eigenschaft', 'Feature')}</th>
                  <th className="p-4 text-magenta font-bold">Aprés Gel-X (nailzbynicci)</th>
                  <th className="p-4 text-ink/60">{t('Klassisches Acryl (Standard)', 'Traditional Acrylic')}</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-ink">
                <tr>
                  <td className="p-4 font-bold">{t('Material', 'Material')}</td>
                  <td className="p-4 font-medium text-magenta">100% Reines Soft Gel</td>
                  <td className="p-4 text-ink/70">Monomer-Flüssigkeit + Polymer-Pulver</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">{t('Geruch & Dämpfe', 'Odor & Fumes')}</td>
                  <td className="p-4 font-medium text-magenta">{t('Vollkommen geruchlos', 'Completely odorless')}</td>
                  <td className="p-4 text-ink/70">{t('Stechende chemische Dämpfe', 'Pungent chemical fumes')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">{t('Flexibilität & Stoßdämpfung', 'Flexibility & Shock Absorption')}</td>
                  <td className="p-4 font-medium text-magenta">{t('Biegt sich elastisch mit dem Naturnagel', 'Flexes elastically with natural plate')}</td>
                  <td className="p-4 text-ink/70">{t('Starr; bricht schmerzhaft mit dem Naturnagel', 'Rigid; snaps taking natural nail with it')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">{t('Entfernung', 'Removal Method')}</td>
                  <td className="p-4 font-medium text-magenta">{t('Sanftes Aceton-Bad in 15 Min.', 'Gentle acetone soak-off in 15 min')}</td>
                  <td className="p-4 text-ink/70">{t('Aggressives Abfräsen mit Fräser', 'Aggressive carbide drilling')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">{t('Naturnagel-Zustand danach', 'Natural Nail Plate Post-Removal')}</td>
                  <td className="p-4 font-medium text-magenta">{t('Kräftig, glatt, gesund', 'Thick, smooth, healthy')}</td>
                  <td className="p-4 text-ink/70">{t('Oft ausgedünnt, weich und brüchig', 'Frequently thinned, brittle, damaged')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">{t('Haltbarkeit', 'Retention')}</td>
                  <td className="p-4 font-medium text-magenta">4 bis 6 Wochen</td>
                  <td className="p-4 text-ink/70">2 bis 3 Wochen (Liftings)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shapes & Lengths Available */}
        <div className="mb-16 p-8 bg-concrete border-2 border-ink">
          <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
            {t('[ INDIVIDUELLE SILHOUETTE ]', '[ BESPOKE SILHOUETTE ]')}
          </span>
          <h2 className="font-sans font-black text-2xl md:text-3xl uppercase mb-6">
            {t('Verfügbare Formen & Längen im Münsteraner Atelier', 'Available Shapes & Lengths at the Münster Studio')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-ink text-center">
              <span className="font-mono text-xs font-bold block text-magenta mb-1">STILETTO</span>
              <p className="text-xs text-ink/70">{t('Short bis Extreme Long', 'Short to Extreme Long')}</p>
            </div>
            <div className="p-4 bg-white border border-ink text-center">
              <span className="font-mono text-xs font-bold block text-magenta mb-1">ALMOND</span>
              <p className="text-xs text-ink/70">{t('Short bis Long', 'Short to Long')}</p>
            </div>
            <div className="p-4 bg-white border border-ink text-center">
              <span className="font-mono text-xs font-bold block text-magenta mb-1">SQUARE</span>
              <p className="text-xs text-ink/70">{t('Short bis Medium', 'Short to Medium')}</p>
            </div>
            <div className="p-4 bg-white border border-ink text-center">
              <span className="font-mono text-xs font-bold block text-magenta mb-1">COFFIN</span>
              <p className="text-xs text-ink/70">{t('Medium bis Long', 'Medium to Long')}</p>
            </div>
          </div>
        </div>

        {/* Pricing Link */}
        <div className="mb-16 p-6 bg-white border-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-magenta block mb-1">
              {t('TRANSPARENTE PREISE', 'TRANSPARENT PRICING')}
            </span>
            <p className="font-sans font-bold text-sm">
              {t(
                'Aprés Gel-X Neumodellage ab 50 € inklusive Vorbereitung und Pflege.',
                'Full Aprés Gel-X extension starting at €50 including complete prep and oil.'
              )}
            </p>
          </div>
          <Link
            href="/preise"
            className="font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 bg-ink text-white hover:bg-magenta transition-colors whitespace-nowrap"
          >
            {t('ZUR PREISÜBERSICHT ↗', 'VIEW PRICE TIERS ↗')}
          </Link>
        </div>

        <InstagramCTA
          headline={t('TERMIN FÜR APRÉS GEL-X IN MÜNSTER BUCHEN', 'BOOK YOUR APRÉS GEL-X SESSION IN MÜNSTER')}
          subheadline={t(
            'Sichere dir deinen Termin im privaten Atelier über Instagram DM. 20 € Anzahlung via PayPal.',
            'Reserve your slot at the private sanctuary via Instagram DM. €20 PayPal deposit.'
          )}
        />
      </div>
    </div>
  )
}
