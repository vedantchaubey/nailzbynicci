'use client'

import React from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { guideArticles } from '@/data/guides'
import { useLanguage } from '@/lib/languageContext'
import { Map, ArrowRight } from 'lucide-react'

export default function HTMLSitemapPage() {
  const { t } = useLanguage()

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Sitemap', 'Sitemap'), href: '/sitemap' },
  ]

  const sections = [
    {
      title: t('Hauptseiten & Atelier', 'Main Pages & Atelier'),
      links: [
        { name: t('Startseite (Nageldesign Münster)', 'Home (Nail Design Münster)'), href: '/' },
        { name: t('Über Nicole (@nailzbynicci)', 'About Nicole'), href: '/ueber-mich' },
        { name: t('Aprés Gel-X Münster Spezialseite', 'Aprés Gel-X Münster Landing Page'), href: '/apres-gel-x-muenster' },
        { name: t('Preise & 4 Nail Art Tiers', 'Prices & 4 Art Tiers'), href: '/preise' },
        { name: t('Termin buchen & Studio-Regeln', 'Book Appointment & Rules'), href: '/termin-buchen' },
        { name: t('Häufige Fragen (FAQ)', 'Frequently Asked Questions (FAQ)'), href: '/faq' },
        { name: t('Pflege-Tipps nach dem Termin', 'Aftercare Tips'), href: '/pflege-tipps' },
      ],
    },
    {
      title: t('Galerien & Stil-Archive', 'Galleries & Style Archives'),
      links: [
        { name: t('Hauptgalerie (Alle Arbeiten)', 'Master Portfolio (All Sets)'), href: '/galerie' },
        { name: t('Chrome Nägel & Cyber Sigilism', 'Chrome Nails & Cyber Sigilism'), href: '/galerie/chrome-naegel' },
        { name: t('Kawaii Nägel & 3D Charms', 'Kawaii Nails & 3D Charms'), href: '/galerie/kawaii-naegel' },
        { name: t('Stiletto Nägel & Gothic Claws', 'Stiletto Nails & Gothic Claws'), href: '/galerie/stiletto-naegel' },
      ],
    },
    {
      title: t('Custom Press-On Nägel (Versand DE)', 'Custom Press-On Nails (DE Shipping)'),
      links: [
        { name: t('Press-On Übersicht & Video-Showcase', 'Press-On Showcase & Videos'), href: '/press-ons' },
        { name: t('Bestellanleitung & Größen ausmessen', 'How to Order & Sizing Guide'), href: '/press-ons/bestellen' },
      ],
    },
    {
      title: t('Ratgeber & Leitfäden', 'Guides & Articles'),
      links: guideArticles.map((a) => ({
        name: a.titleDe,
        href: `/ratgeber/${a.slugDe}`,
      })),
    },
    {
      title: t('Rechtliches', 'Legal & Privacy'),
      links: [
        { name: t('Impressum', 'Imprint'), href: '/impressum' },
        { name: t('Datenschutzerklärung', 'Privacy Policy'), href: '/datenschutz' },
      ],
    },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <div className="flex items-center gap-2 mb-2">
            <Map className="w-5 h-5 text-magenta" />
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta">
              {t('[ SEITENÜBERSICHT & INDEXIERUNG ]', '[ SITE INDEX & CRAWL STRUCTURE ]')}
            </span>
          </div>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-6">
            HTML Sitemap:<br />
            <span className="text-magenta">Alle Seiten im Überblick.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-ink/80 max-w-3xl leading-relaxed font-medium">
            {t(
              'Hier findest du eine vollständige Übersicht aller Seiten, Leistungen, Portfolios und Fachartikel von nailzbynicci. Jeder Link führt direkt zum entsprechenden Inhalt.',
              'A complete crawlable index of every page, service, portfolio, and guide published by nailzbynicci.'
            )}
          </p>
        </div>

        {/* Section Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]"
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-magenta font-black pb-3 mb-4 border-b-2 border-ink">
                {section.title}
              </h2>
              <ul className="space-y-3 font-sans text-sm font-bold">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="group flex items-start justify-between gap-2 text-ink hover:text-magenta transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 text-magenta" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
