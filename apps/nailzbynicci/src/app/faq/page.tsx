'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { faqs } from '@/data/faq'
import { useLanguage } from '@/lib/languageContext'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const { t, locale } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Häufige Fragen (FAQ)', 'FAQ'), href: '/faq' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer[locale],
      },
    })),
  }

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ TRANSPARENZ & ANTWORTEN · ATELIER MÜNSTER ]', '[ TRANSPARENCY & ANSWERS · MÜNSTER STUDIO ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-6">
            Häufige Fragen:<br />
            <span className="text-magenta">Alles zu Gel-X & Ablauf.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-ink/80 max-w-3xl leading-relaxed font-medium">
            {t(
              'Hier findest du ehrliche und detaillierte Antworten zu Aprés Gel-X, Haltbarkeit, den vier Art-Tiers, der 20 € Anzahlung und der Vorbereitung auf deinen Termin im Münsteraner Atelier.',
              'Detailed, honest answers regarding Aprés Gel-X chemistry, retention, our four distinct art tiers, the €20 PayPal deposit, and preparing for your session.'
            )}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.id}
                className="bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10] transition-all"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans font-black text-lg md:text-xl uppercase tracking-tight hover:text-magenta transition-colors"
                >
                  <span>{faq.question[locale]}</span>
                  <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-magenta' : 'text-ink'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-ink/10 font-sans text-sm md:text-base text-ink/80 leading-relaxed">
                    <p>{faq.answer[locale]}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Guides Banner */}
        <div className="mb-12 p-8 bg-white border-2 border-ink flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              {t('NOCH MEHR DETAILS?', 'LOOKING FOR DEEPER INSIGHTS?')}
            </span>
            <h3 className="font-sans font-black text-xl uppercase">
              {t('Entdecke unsere ausführlichen Ratgeber-Artikel', 'Explore Our Comprehensive Guide Library')}
            </h3>
            <p className="font-sans text-sm text-ink/70 mt-1">
              {t(
                'Lerne alles über Stiletto vs. Almond, Chrome-Versiegelung und warum Gel-X gesünder ist als Acryl.',
                'Learn about Stiletto vs. Almond ergonomics, chrome double-seal care, and Gel-X retention.'
              )}
            </p>
          </div>
          <Link
            href="/ratgeber"
            className="font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 bg-ink text-white hover:bg-magenta transition-colors whitespace-nowrap"
          >
            {t('ALLE RATGEBER LESEN ↗', 'BROWSE ALL GUIDES ↗')}
          </Link>
        </div>

        <InstagramCTA
          headline={t('DEINE FRAGE WAR NICHT DABEI?', 'HAVE AN UNANSWERED QUESTION?')}
          subheadline={t(
            'Schreib mir einfach direkt auf Instagram (@nailzbynicci). Ich berate dich gerne persönlich zu deinem Wunsch-Set.',
            'Message me directly on Instagram (@nailzbynicci). I am always happy to answer your questions personally.'
          )}
        />
      </div>
    </div>
  )
}
