'use client'

import React from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InstagramCTA } from '@/components/ui/InstagramCTA'
import { aftercareSteps } from '@/data/rules'
import { useLanguage } from '@/lib/languageContext'
import { Droplets, Sparkles, ShieldAlert, Heart, Flame } from 'lucide-react'

export default function PflegeTippsPage() {
  const { t, locale } = useLanguage()

  const breadcrumbs = [
    { name: t('Home', 'Home'), href: '/' },
    { name: t('Pflege-Tipps', 'Aftercare'), href: '/pflege-tipps' },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Masthead */}
        <div className="pb-8 mb-12 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ AFTERCARE ROUTINE · 5+ WOCHEN HALT ]', '[ AFTERCARE ROUTINE · 5+ WEEKS RETENTION ]')}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88] mb-6">
            Nagelpflege:<br />
            <span className="text-magenta">Die 5 goldenen Regeln.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-ink/80 max-w-3xl leading-relaxed font-medium">
            {t(
              'Dein neues Set sitzt perfekt, der Glanz ist makellos. Damit deine Nägel auch nach vier Wochen noch wie frisch aus dem Münsteraner Atelier aussehen, teile ich hier die wichtigsten Pflegehinweise für zu Hause.',
              'Your new set is flawless. To ensure your nails look salon-fresh even after four weeks of daily life, here are my non-negotiable home aftercare principles.'
            )}
          </p>
        </div>

        {/* The 5 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
            <Flame className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              REGEL 01
            </span>
            <h2 className="font-sans font-black text-xl uppercase mb-3">
              {t('24h Heißwasser-Schutz', '24h Heat & Water Buffer')}
            </h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Obwohl das Gel unter der LED-Lampe aushärtet, stabilisiert sich die molekulare Bindung über 24 Stunden. Vermeide am ersten Tag heiße Saunagänge, Vollbäder oder kochendes Spülwasser.',
                'While LED curing is instant, the molecular polymer lock settles over the initial 24 hours. Avoid scalding saunas, hot baths, or boiling dishwater on day one.'
              )}
            </p>
          </div>

          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
            <Droplets className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              REGEL 02
            </span>
            <h2 className="font-sans font-black text-xl uppercase mb-3">
              {t('Tägliches Jojoba-Nagelöl', 'Daily Cuticle Hydration')}
            </h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Massiere täglich hochwertiges Jojobaöl in die Nagelhaut ein. Geschmeidige Haut verhindert Verhornungen und versiegelt die Ränder gegen Mikroliftings.',
                'Massage jojoba oil into cuticles daily. Supple skin prevents shrinking and locks the sidewall seals against micro-liftings.'
              )}
            </p>
          </div>

          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
            <Sparkles className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              REGEL 03
            </span>
            <h2 className="font-sans font-black text-xl uppercase mb-3">
              {t('Juwelen, keine Werkzeuge', 'Nails Are Jewels, Not Tools')}
            </h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Öffne Dosen, Pakete oder Schlüsselfächer niemals mit deinen Nagelspitzen. Hebelkräfte an der Spitze führen zu schmerzhaftem Druck auf dein Naturnagelbett.',
                'Never use nail tips to pop soda tabs, scrape labels, or open key rings. Use a spoon edge or key to avoid severe mechanical lever trauma.'
              )}
            </p>
          </div>

          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
            <ShieldAlert className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              REGEL 04
            </span>
            <h2 className="font-sans font-black text-xl uppercase mb-3">
              {t('Handschuhe bei Putzmitteln', 'Gloves with Household Chemicals')}
            </h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Scharfe Haushaltsreiniger, Bleichmittel oder acetonhaltige Lösungsmittel greifen den Hochglanz-Topcoat an. Schütze deine Nägel einfach mit Gummihandschuhen.',
                'Harsh cleaning agents, bleach, and solvents compromise glassy topcoats. Protect your hands with standard rubber gloves during cleaning.'
              )}
            </p>
          </div>

          <div className="p-8 bg-white border-2 border-ink shadow-[6px_6px_0px_#0E0D10]">
            <Heart className="w-8 h-8 text-magenta mb-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
              REGEL 05
            </span>
            <h2 className="font-sans font-black text-xl uppercase mb-3">
              {t('Niemals gewaltsam abreißen', 'Never Peel or Pry Off')}
            </h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {t(
                'Sollte sich wider Erwarten ein Tip lockern, ziehe oder beiße niemals daran! Du würdest Keratinschichten deines Naturnagels mit abreißen. Schreib mir kurz auf Instagram.',
                'If a tip feels loose, never bite or peel it! You risk tearing layers of natural keratin. Message me promptly on Instagram for a safe fix.'
              )}
            </p>
          </div>

          <div className="p-8 bg-ink text-white border-2 border-ink shadow-[6px_6px_0px_#FF007A] flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-magenta font-black block mb-2">
                STUDIO REFILL
              </span>
              <h2 className="font-sans font-black text-xl uppercase mb-3 text-white">
                {t('Neues Set nach 4–5 Wochen', 'Fresh Set After 4–5 Weeks')}
              </h2>
              <p className="font-sans text-sm text-white/80 leading-relaxed">
                {t(
                  'Um die Statik und den perfekten Schwerpunkt deines Nagels zu erhalten, vereinbare nach 4 bis 5 Wochen deinen nächsten Atelier-Termin.',
                  'To maintain structural balance and optimal apex leverage, reserve your next session after 4 to 5 weeks of pristine wear.'
                )}
              </p>
            </div>
            <Link
              href="/termin-buchen"
              className="mt-4 inline-flex items-center text-xs font-mono font-black uppercase text-magenta hover:underline"
            >
              {t('Termin-Ablauf ansehen ↗', 'View Booking Etiquette ↗')}
            </Link>
          </div>
        </div>

        <InstagramCTA
          headline={t('FRAGEN ZUR PFLEGE ODER REPARATUR?', 'HAVE AN AFTERCARE OR REPAIR QUESTION?')}
          subheadline={t(
            'Schreib Nicole jederzeit unkompliziert per Instagram DM. Wir finden für jedes Nagelproblem eine schnelle Lösung.',
            'Message Nicole anytime directly on Instagram DM. Quick support for any nail emergency.'
          )}
        />
      </div>
    </div>
  )
}
