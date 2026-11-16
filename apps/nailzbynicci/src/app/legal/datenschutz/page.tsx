import React from 'react'
import Link from 'next/link'

export default function DatenschutzPage() {
  return (
    <div className="py-24 bg-ink min-h-[100dvh] text-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <span className="text-[10px] uppercase tracking-[0.24em] text-blossom font-sans block mb-3">
          DSGVO Compliance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-white mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-sm font-sans text-fog-light leading-relaxed">
          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Der Schutz deiner persönlichen Daten hat für mich höchste Priorität. Diese Website dient ausschließlich der Information über meine Dienstleistungen und verarbeitet keinerlei Tracking-Cookies, Analysedienste Dritter oder Werbenetzwerke.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">2. Verantwortliche Stelle</h2>
            <p className="text-white font-medium">Nicole ("Nicci")</p>
            <p>Nailz by Nicci</p>
            <p>Münster, NRW · Deutschland</p>
            <p className="text-xs text-chrome mt-1">Kontakt via Instagram DM: @nailzbynicci</p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">3. Keine Formulare &amp; Keine Online-Zahlungen auf der Website</h2>
            <p>
              Auf dieser Website sind bewusst **keine Kontaktformulare, keine Registrierungssysteme und keine Online-Zahlungsabwicklungen** eingebunden. Alle Buchungsanfragen erfolgen extern über Instagram Direct Message (Meta Platforms Ireland Limited).
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">4. Externe Links zu Instagram</h2>
            <p>
              Unsere Website enthält direkte Verlinkungen zu unserem Instagram-Profil (@nailzbynicci). Beim Klicken auf diese Links wirst du auf die Server von Instagram weitergeleitet. Es gelten die Datenschutzrichtlinien der Meta Platforms Ireland Ltd.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">5. Lokale Speicherung (Language Preference)</h2>
            <p>
              Diese Website speichert lediglich deine Sprachauswahl (Deutsch / Englisch) lokal in deinem Browser (localStorage). Hierbei werden keine personenbezogenen Daten an externe Server übertragen.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">6. Deine Rechte</h2>
            <p>
              Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-fog flex items-center justify-between text-xs text-fog-light">
          <Link href="/" className="hover:text-white transition-colors">
            ← Zurück zur Startseite
          </Link>
          <Link href="/legal/impressum" className="hover:text-white transition-colors">
            Zum Impressum →
          </Link>
        </div>
      </div>
    </div>
  )
}
