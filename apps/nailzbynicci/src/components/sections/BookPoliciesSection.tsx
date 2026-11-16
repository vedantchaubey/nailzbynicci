'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { useLanguage } from '@/lib/languageContext'

export const BookPoliciesSection: React.FC = () => {
  const { locale, t } = useLanguage()

  const ruleCards = [
    {
      title: t('ANZAHLUNG', 'DEPOSIT'),
      desc: t(
        '20€ Anzahlung via PayPal zur Reservierung erforderlich. Bei Absage mehr als 48 Std. vor dem Termin wird die Anzahlung gutgeschrieben. Unter 48 Std. verfällt sie als Aufwandsentschädigung.',
        '€20 PayPal deposit required to secure your appointment. Cancel more than 48 hours in advance to reschedule your deposit. Within 48 hours, deposit is non-refundable.'
      ),
      badge: '20€ DEPOSIT',
    },
    {
      title: t('VERSPÄTUNG', 'LATENESS'),
      desc: t(
        '15 Minuten Kulanzzeit. Bei mehr als 15 Minuten Verspätung muss das Design verkürzt oder der Termin neu vereinbart werden, um nachfolgende Kundinnen nicht zu verzögern.',
        '15-minute grace period. Beyond 15 minutes, nail art complexity may be shortened or the appointment rescheduled to avoid delays for following appointments.'
      ),
      badge: '15-MIN RULE',
    },
    {
      title: t('NICHTERSCHEINEN', 'NO SHOW'),
      desc: t(
        'Bei Nichterscheinen ohne rechtzeitige Absage verfällt die Anzahlung vollständig und zukünftige Terminanfragen werden dauerhaft blockiert.',
        'No-shows without timely cancellation forfeit the deposit entirely and are permanently restricted from future bookings.'
      ),
      badge: 'ZERO TOLERANCE',
    },
    {
      title: t('BEGLEITPERSON', 'BRING SOMEONE'),
      desc: t(
        'Privates Homestudio in ruhiger 1-zu-1 Atmosphäre. Maximal eine Begleitperson nach vorheriger Absprache erlaubt.',
        'Intimate private home studio. Maximum one guest/companion allowed, strictly by prior agreement only.'
      ),
      badge: '1 GUEST MAX',
    },
    {
      title: t('VOR DEM TERMIN', 'BEFORE YOU COME'),
      desc: t(
        'Bitte erscheine ausnahmslos mit sauberen Naturnägeln ohne Fremdmaterial (Fremdacryl/unbekannte Gele), es sei denn, ein Soak-Off wurde vorab gebucht. Keine fusselnde Kleidung.',
        'Arrive strictly with bare natural nails free of foreign salon acrylics/gels, unless an Aprés removal was pre-booked. Avoid lint-shedding knitwear.'
      ),
      badge: 'BARE NAILS',
    },
    {
      title: t('IM HOMESTUDIO', 'IN THE STUDIO'),
      desc: t(
        'Zahlung bar oder via PayPal. Ruhige, wertschätzende Atmosphäre. Silent Appointment auf Wunsch jederzeit möglich.',
        'Payment via Cash or PayPal. Calm, respectful space. Silent appointments are always welcome without questions.'
      ),
      badge: 'CASH / PAYPAL',
    },
  ]

  return (
    <section id="book" className="py-20 md:py-32 bg-concrete text-ink border-b-2 border-ink relative overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (Figma 1:1: LET'S MAKE SOMETHING LOUD.) */}
        <div className="pb-8 mb-10 border-b-2 border-ink">
          <span className="text-xs font-mono uppercase tracking-[0.24em] font-bold text-magenta block mb-2">
            {t('[ BUCHUNGSABLAUF & STUDIO-REGELN · MÜNSTER ]', '[ BOOKING WORKFLOW & STUDIO POLICIES · MÜNSTER ]')}
          </span>
          <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-magenta leading-[0.88]">
            {locale === 'de' ? (
              <>
                LASS UNS WAS<br />
                LAUTES ERSCHAFFEN.
              </>
            ) : (
              <>
                LET'S MAKE<br />
                SOMETHING LOUD.
              </>
            )}
          </h2>
        </div>

        {/* 4-Step Direct Booking Workflow (Figma Master Component: List item · Desktop) */}
        <div className="bg-white border-2 border-ink p-6 sm:p-10 shadow-[6px_6px_0px_#0E0D10] mb-12">
          <div className="text-xs font-mono uppercase font-black tracking-widest text-ink/70 pb-3 mb-6 border-b border-ink/20">
            {t('WIE DU DEINEN TERMIN BUCHST', 'HOW TO BOOK AN APPOINTMENT')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-ink">
            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <span>{t('DM AN @NAILZBYNICCI AUF INSTAGRAM SCHREIBEN', 'DIRECT MESSAGE @NAILZBYNICCI ON INSTAGRAM')}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <span>{t('WUNSCHTERMIN & DESIGN-IDEE BESPRECHEN', 'DISCUSS TIME AND DATE')}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <span>{t('20€ ANZAHLUNG VIA PAYPAL (WIRD VOLL VERRECHNET)', 'PAY A €20 DEPOSIT VIA PAYPAL, DEDUCTED FROM YOUR TOTAL')}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-magenta font-black text-lg leading-none">—</span>
              <span>{t('STUDIO-STANDORT IN MÜNSTER, DEUTSCHLAND', 'CURRENTLY LOCATED IN MÜNSTER, GERMANY')}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center font-mono tracking-[0.16em] uppercase text-xs font-bold px-8 py-3.5 bg-magenta text-white hover:bg-black transition-all border border-ink shadow-[3px_3px_0px_#0E0D10]"
            >
              <span>{t('Auf Instagram anfragen', 'DM on Instagram to Book')}</span>
              <span className="ml-2 font-black">↗</span>
            </a>

            <span className="text-[11px] font-mono text-ink/60 uppercase font-semibold">
              {t('Schnelle Rückmeldung · Keine Buchungskalender-Widgets', 'Fast Response · No Calendar Widgets')}
            </span>
          </div>
        </div>

        {/* 6 Studio Rule Cards Grid (Figma Master Component: Rule card) */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-ink text-xs font-mono uppercase tracking-widest font-bold text-ink">
            <span>{t('[ STUDIO-PROTOKOLL & REGELN ]', '[ STUDIO PROTOCOL & RULES ]')}</span>
            <span className="text-magenta">{t('6 VERBINDLICHE REGELN', '6 MANDATORY POLICIES')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ruleCards.map((rule, idx) => (
              <div
                key={rule.title}
                className="bg-white border-2 border-ink p-6 shadow-[5px_5px_0px_#0E0D10] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-ink/20 text-[10px] font-mono uppercase tracking-widest font-black">
                    <span>#0{idx + 1}</span>
                    <span className="text-magenta font-bold">{rule.badge}</span>
                  </div>

                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-ink mb-2">
                    {rule.title}
                  </h3>

                  <p className="text-xs font-sans text-ink/75 leading-relaxed font-medium">
                    {rule.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold text-ink/60">
                  <span>ATELIER MÜNSTER</span>
                  <span>🐾 NICCI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
