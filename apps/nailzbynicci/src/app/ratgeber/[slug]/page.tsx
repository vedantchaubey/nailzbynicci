import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guideArticles, GuideArticle } from '@/data/guides'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { getSiteUrl } from '@/lib/siteUrl'
import { Clock, Calendar, User, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return guideArticles.map((article) => ({
    slug: article.slugDe,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = guideArticles.find((a) => a.slugDe === params.slug)
  if (!article) return {}

  const siteUrl = getSiteUrl()
  const url = `${siteUrl}/ratgeber/${article.slugDe}`

  return {
    title: `${article.metaTitleDe} | nailzbynicci`,
    description: article.metaDescDe,
    alternates: {
      canonical: `/ratgeber/${article.slugDe}`,
      languages: {
        'de': `/ratgeber/${article.slugDe}`,
        'en': `/en/guides/${article.slugEn}`,
        'de-DE': `/ratgeber/${article.slugDe}`,
        'en-US': `/en/guides/${article.slugEn}`,
        'x-default': `/ratgeber/${article.slugDe}`,
      },
    },
    openGraph: {
      title: `${article.titleDe} | nailzbynicci Münster`,
      description: article.metaDescDe,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['Nicole (@nailzbynicci)'],
      images: [
        {
          url: article.heroImage,
          width: 1440,
          height: 1728,
          alt: article.heroAltDe,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitleDe,
      description: article.metaDescDe,
      images: [article.heroImage],
    },
  }
}

export default function GuideArticlePage({ params }: PageProps) {
  const article = guideArticles.find((a) => a.slugDe === params.slug)
  if (!article) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: article.titleDe, href: `/ratgeber/${article.slugDe}` },
  ]

  const siteUrl = getSiteUrl()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titleDe,
    description: article.metaDescDe,
    image: `${siteUrl}${article.heroImage}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Nicole',
      url: 'https://www.instagram.com/nailzbynicci',
    },
    publisher: {
      '@type': 'Organization',
      name: 'nailzbynicci',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/ratgeber/${article.slugDe}`,
    },
  }

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Back link */}
        <Link
          href="/ratgeber"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest font-black text-magenta hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Alle Ratgeber & Guides</span>
        </Link>

        {/* Article Header */}
        <header className="pb-8 mb-10 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-black text-magenta block mb-3">
            [ {article.primaryKeywordDe.toUpperCase()} · RATGEBER ]
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-ink leading-[0.94] mb-6">
            {article.titleDe}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-ink/70 pb-4 border-t border-ink/20 pt-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-magenta" />
              <span>Nicole (@nailzbynicci)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-magenta" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-magenta" />
              <span>Aktualisiert: Nov 2026</span>
            </div>
          </div>
        </header>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-ink bg-white shadow-[6px_6px_0px_#0E0D10] mb-12">
          <Image
            src={article.heroImage}
            alt={article.heroAltDe}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Intro Paragraph */}
        <div className="font-sans text-lg md:text-xl font-medium text-ink leading-relaxed mb-10 pb-8 border-b border-ink/20">
          <p>{article.introDe}</p>
        </div>

        {/* Key Takeaways Box */}
        <div className="mb-12 p-6 md:p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
          <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-4">
            [ DAS WICHTIGSTE AUF EINEN BLICK ]
          </span>
          <ul className="space-y-3 font-sans text-sm md:text-base">
            {article.keyTakeawaysDe.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-magenta flex-shrink-0 mt-0.5" />
                <span className="text-ink/90 font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <article className="space-y-10 font-sans text-base md:text-lg text-ink/90 leading-relaxed">
          {article.contentDe.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-ink pt-4 border-t border-ink/20">
                {section.h2}
              </h2>
              {section.p.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
              {section.bullets && (
                <ul className="my-4 space-y-2 pl-6 list-disc text-sm md:text-base font-medium">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Article FAQ */}
        {article.faqDe && article.faqDe.length > 0 && (
          <section className="mt-16 pt-10 border-t-2 border-ink">
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              [ FRAGEN ZUM THEMA ]
            </span>
            <h3 className="font-sans font-black text-2xl uppercase mb-6">
              Häufig gestellte Fragen
            </h3>
            <div className="space-y-4">
              {article.faqDe.map((f, fIdx) => (
                <div key={fIdx} className="p-6 bg-white border-2 border-ink shadow-[4px_4px_0px_#0E0D10]">
                  <h4 className="font-sans font-black text-base uppercase text-ink mb-2">
                    {f.q}
                  </h4>
                  <p className="font-sans text-sm text-ink/80 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Service Banner */}
        <div className="mt-12 p-6 bg-ink text-white border-2 border-ink shadow-[6px_6px_0px_#FF007A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-1">
              PASSENDE DIENSTLEISTUNG
            </span>
            <p className="font-sans font-bold text-base text-white">
              {article.relatedServiceLinkDe.label}
            </p>
          </div>
          <Link
            href={article.relatedServiceLinkDe.href}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-black px-6 py-3 bg-magenta text-white hover:bg-white hover:text-ink transition-colors border border-white"
          >
            <span>ÖFFNEN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <InstagramCTA
          headline="TERMIN BEI NICOLE VEREINBAREN"
          subheadline="Möchtest du dein neues Set im Münsteraner Atelier oder als handgefertigte Press-Ons? Schreib mir direkt auf Instagram."
        />
      </div>
    </div>
  )
}
