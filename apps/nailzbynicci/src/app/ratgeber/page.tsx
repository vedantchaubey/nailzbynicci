'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { guideArticles } from '@/data/guides'
import { useLanguage } from '@/lib/languageContext'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'

export default function RatgeberIndexPage() {
  const { t, locale } = useLanguage()

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Ratgeber', 'Guides'), href: '/ratgeber' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-magenta" />
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta">
              {t('[ ATELIER WISSEN & EXPERTISE · MÜNSTER ]', '[ STUDIO KNOWLEDGE & EXPERTISE · MÜNSTER ]')}
            </span>
          </div>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-6">
            Nageldesign Ratgeber:<br />
            <span className="text-magenta">Wissen ohne Bullshit.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-ink/80 max-w-3xl leading-relaxed font-medium">
            {t(
              'Ausführliche Leitfäden zu Haltbarkeit, Nageldesign-Preisen in Münster, Nagelformen, Kanten-Versiegelung und warum Aprés Gel-X deinen Naturnagel schützt. Ehrlich geschrieben von Nicole (@nailzbynicci).',
              'Deep technical guides covering retention, Münster salon pricing, nail anatomy, chrome sealing, and why Aprés Gel-X protects natural nails. Honestly written by Nicole.'
            )}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {guideArticles.map((article) => {
            const title = locale === 'de' ? article.titleDe : article.titleEn
            const desc = locale === 'de' ? article.metaDescDe : article.metaDescEn
            const href = `/ratgeber/${article.slugDe}`

            return (
              <article
                key={article.slugDe}
                className="bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10] hover:shadow-[8px_8px_0px_#FF007A] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-ink">
                    <Image
                      src={article.heroImage}
                      alt={locale === 'de' ? article.heroAltDe : article.heroAltEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-ink font-bold flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-magenta" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-magenta font-black block mb-2">
                      {article.primaryKeywordDe}
                    </span>
                    <h2 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-ink mb-3 group-hover:text-magenta transition-colors">
                      <Link href={href}>{title}</Link>
                    </h2>
                    <p className="font-sans text-sm text-ink/80 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0 border-t border-ink/10 mt-auto">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-black text-magenta hover:text-ink transition-colors"
                  >
                    <span>{t('VOLLEN ARTIKEL LESEN', 'READ FULL GUIDE')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <InstagramCTA
          headline={t('BEREIT FÜR DEINEN TERMIN IN MÜNSTER?', 'READY TO BOOK YOUR MÜNSTER SESSION?')}
          subheadline={t(
            'Erlebe die Qualität im privaten Atelier selbst. Alle Termine werden direkt via Instagram DM vereinbart.',
            'Experience the artistry in person. All appointments arranged strictly via Instagram DM.'
          )}
        />
      </div>
    </div>
  )
}
