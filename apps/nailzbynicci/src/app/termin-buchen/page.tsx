'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { studioRules, aftercareSteps } from '@/data/rules'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export default function HowToBookPage() {
  const { locale, t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const dmTemplate = locale === 'de' 
    ? `Hey Nicci! 🩶 Ich würde gerne einen Termin bei dir in Münster anfragen:
- Wunsch-Set: [z.B. Medium Set / Blood Velvet Aura / 3D Spikes]
- Länge & Form: [z.B. Long Stiletto / Medium Almond]
- Naturnägel: [Bereits bare / Benötige Gel-X Entfernung]
- Mögliche Tage: [z.B. Dienstag oder Freitag Nachmittag]
Inspo-Foto habe ich angehängt! 🐾`
    : `Hey Nicci! 🩶 I’d love to book an appointment with you in Münster:
- Desired Set: [e.g. Crazy Set / 3D Cyber Chrome / Kawaii Bears]
- Length & Shape: [e.g. Long Stiletto / Medium Almond]
- Current Nails: [Bare natural nails / Need Gel-X removal]
- Available Days: [e.g. Tuesday or Friday afternoons]
Inspo photo attached! 🐾`

  const handleCopy = () => {
    navigator.clipboard.writeText(dmTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const faqs = [
    {
      q: {
        de: 'Wie läuft die Terminvereinbarung genau ab?',
        en: 'How does the booking process work exactly?',
      },
      a: {
        de: 'Alle Termine werden ausschließlich über Instagram DM (@nailzbynicci) abgestimmt. Sende mir einfach deine Design-Inspiration, deine Wunschlänge und deine zeitliche Verfügbarkeit. Nach der Absprache reservierst du deinen Slot verbindlich mit 20 € via PayPal.',
        en: 'All appointments are scheduled exclusively via Instagram DM (@nailzbynicci). Simply send me your design inspiration, preferred length, and availability. Once agreed, secure your slot with a 20€ PayPal deposit.',
      },
    },
    {
      q: {
        de: 'Warum 100% Aprés Gel-X und keine Acryle?',
        en: 'Why 100% Aprés Gel-X and no acrylics?',
      },
      a: {
        de: 'Aprés Gel-X besteht aus reinem, elastischem Soft-Gel. Es erfordert kein aggressives Anfeilen des Naturnagels und keine giftigen Acryl-Monomere. Deine Naturnägel bleiben gesund, flexibel und wachsen unbeschadet darunter weiter.',
        en: 'Aprés Gel-X is made of pure, medical-grade soft gel. It requires zero damaging filing to your natural nail plate and uses no toxic acrylic monomers. Your natural nails remain healthy, flexible, and continue growing protected underneath.',
      },
    },
    {
      q: {
        de: 'Wo befindet sich das Studio in Münster?',
        en: 'Where is the studio located in Münster?',
      },
      a: {
        de: 'Ich führe ein privates, gemütliches Homestudio in Münster (NRW). Die genaue Adresse und Anfahrtsdetails erhältst du aus Sicherheits- und Diskretionsgründen direkt nach Bestätigung deines Termins in der DM.',
        en: 'I operate an intimate, private home atelier in Münster, NRW. For privacy and security, the exact address and arrival details are shared in DM upon confirmed booking and deposit.',
      },
    },
    {
      q: {
        de: 'Wie funktioniert die 20 € Anzahlung?',
        en: 'How does the 20€ deposit policy work?',
      },
      a: {
        de: 'Die Anzahlung in Höhe von 20 € wird via PayPal fällig und am Termintag vollständig mit dem Gesamtpreis deines Sets verrechnet. Sagst du mehr als 48 Stunden vorher ab, übertragen wir sie auf deinen neuen Termin. Bei Absagen unter 48h verfällt die Anzahlung.',
        en: 'The 20€ deposit is paid via PayPal and credited 100% toward the total price of your set on appointment day. Rescheduling with >48h advance notice transfers your deposit; cancellations under 48h forfeit it.',
      },
    },
    {
      q: {
        de: 'Kann ich Fremdmaterial auffüllen lassen?',
        en: 'Can I get a fill over acrylics from another salon?',
      },
      a: {
        de: 'Nein. Ich arbeite ausnahmslos nicht über Fremdmaterial aus anderen Studios, da Inhaltsstoffe und Vorarbeit oft unberechenbar sind. Bitte erscheine mit unlackierten Naturnägeln oder buche vorab eine sichere Gel-X Entfernung.',
        en: 'No. I strictly do not fill over foreign acrylics or unknown gels from other salons due to chemical incompatibilities. Please arrive with bare natural nails or book a safe removal in advance.',
      },
    },
  ]

  return (
    <div className="py-16 md:py-24 bg-concrete min-h-[100dvh] text-ink">
      <div className="max-w-site mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-12 md:mb-16 border-b-2 border-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
              {t('[ BUCHUNGSABLAUF · DIREKTE INSTAGRAM DM ]', '[ BOOKING BLUEPRINT · DIRECT INSTAGRAM DM ]')}
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-ink leading-[0.88]">
              {locale === 'de' ? (
                <>
                  Termin buchen.<br />
                  <span className="text-magenta">Vier einfache Schritte.</span>
                </>
              ) : (
                <>
                  How to Book.<br />
                  <span className="text-magenta">Four Simple Steps.</span>
                </>
              )}
            </h1>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
              {t(
                'Kein starres Buchungssystem, keine anonymen Formulare. Wir stimmen deinen Termin persönlich, unkompliziert und direkt auf Instagram DM ab.',
                'No rigid calendars or impersonal booking forms. Every appointment is arranged personally and directly via Instagram DM.'
              )}
            </p>
          </div>
        </div>

        {/* 4 Steps Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: '01',
              title: { de: 'Inspo Speichern', en: 'Save Your Inspo' },
              desc: {
                de: 'Wähle dein Lieblingsset aus meiner Galerie oder bringe ein eigenes Referenzfoto mit.',
                en: 'Pick your favorite set from my gallery or bring an external reference design.',
              },
            },
            {
              step: '02',
              title: { de: 'Details Notieren', en: 'Note Your Details' },
              desc: {
                de: 'Überlege dir deine gewünschte Länge (Short/Medium/Long) und ob du eine Entfernung brauchst.',
                en: 'Note your preferred length (Short/Medium/Long) and if you need an old set removed.',
              },
            },
            {
              step: '03',
              title: { de: 'Instagram DM Senden', en: 'Send Instagram DM' },
              desc: {
                de: 'Nutze die Vorlage unten und schreibe mir direkt auf @nailzbynicci.',
                en: 'Use the copyable template below and message me on Instagram @nailzbynicci.',
              },
            },
            {
              step: '04',
              title: { de: 'Slot Sichern (15 €)', en: 'Lock Slot (15€ Deposit)' },
              desc: {
                de: 'Sichere deinen Termin via PayPal Anzahlung (wird beim Termin voll verrechnet).',
                en: 'Secure your agreed slot via PayPal deposit (credited 100% toward your set).',
              },
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white border-2 border-ink p-6 shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl font-black text-magenta block mb-3">
                  #{s.step}
                </span>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink mb-2">
                  {s.title[locale]}
                </h3>
                <p className="text-xs font-sans text-ink/75 leading-relaxed">
                  {s.desc[locale]}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-ink/20 text-[10px] font-mono uppercase tracking-widest text-ink/60 font-bold">
                SCHRITT {s.step}
              </div>
            </div>
          ))}
        </div>

        {/* 1-Click Copyable DM Template */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-ink gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-magenta font-bold block">
                [ 1-CLICK INSTAGRAM DM TEMPLATE ]
              </span>
              <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-ink mt-1">
                {t('Kopieren & direkt auf Instagram senden', 'Copy & Paste into Instagram DM')}
              </h2>
            </div>
            
            <button
              onClick={handleCopy}
              className={`px-6 py-3 min-h-[44px] font-mono text-xs uppercase font-bold tracking-widest border-2 border-ink transition-all ${
                copied
                  ? 'bg-magenta text-white shadow-[2px_2px_0px_#0E0D10]'
                  : 'bg-concrete text-ink hover:bg-black hover:text-white shadow-[3px_3px_0px_#0E0D10]'
              }`}
            >
              {copied ? t('✓ Kopiert!', '✓ Copied!') : t('Vorlage kopieren', 'Copy Template')}
            </button>
          </div>

          <pre className="p-5 bg-concrete border-2 border-ink text-xs sm:text-sm font-mono text-ink whitespace-pre-wrap leading-relaxed select-all">
            {dmTemplate}
          </pre>

          <div className="mt-6 pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-ink/70 uppercase font-bold">
              {t('Öffnet direkt Niccis Instagram-Chat:', 'Opens Nicci’s Instagram chat directly:')}
            </span>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-black px-8 py-4 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
            >
              <span>{t('Jetzt Instagram DM öffnen ↗', 'Open Instagram DM Now ↗')}</span>
            </a>
          </div>
        </div>

        {/* Studio Rules */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-ink">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta">
              [ STUDIO RULES &amp; SANCTUARY PROTOCOL ]
            </span>
            <span className="text-xs font-mono uppercase font-bold text-ink">
              MÜNSTER HOMESTUDIO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-white border-2 border-ink p-6 shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-ink">
                    <span className="text-xs font-mono font-black text-magenta">{rule.number}</span>
                    {rule.badge && (
                      <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 bg-concrete border border-ink">
                        {rule.badge[locale]}
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink mb-2">
                    {rule.title[locale]}
                  </h3>
                  <p className="text-xs font-sans text-ink/75 leading-relaxed">
                    {rule.description[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white border-2 border-ink p-8 sm:p-12 shadow-[6px_6px_0px_#0E0D10] mb-16">
          <div className="pb-4 mb-8 border-b-2 border-ink">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-1">
              [ FAQ · FREQUENTLY ASKED QUESTIONS ]
            </span>
            <h2 className="font-sans font-black text-3xl uppercase tracking-tight text-ink">
              Häufige Fragen &amp; Antworten
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-2 border-ink bg-concrete p-5 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-black text-base uppercase tracking-tight text-ink">
                    {faq.q[locale]}
                  </h3>
                  <span className="font-mono font-black text-lg text-magenta">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p className="mt-4 pt-4 border-t border-ink/20 text-xs sm:text-sm font-sans text-ink/80 leading-relaxed">
                    {faq.a[locale]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
