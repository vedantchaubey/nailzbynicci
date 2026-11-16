import React from 'react'
import Link from 'next/link'

export default function ImpressumPage() {
  return (
    <div className="py-24 bg-ink min-h-[100dvh] text-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <span className="text-[10px] uppercase tracking-[0.24em] text-blossom font-sans block mb-3">
          Rechtliche Angaben
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-white mb-8">
          Impressum
        </h1>

        <div className="space-y-8 text-sm font-sans text-fog-light leading-relaxed">
          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="text-white font-medium">Nicole ("Nicci")</p>
            <p>Nailz by Nicci · Privates Nagelatelier</p>
            <p className="text-chrome text-xs mt-1">[Privatadresse in Münster, NRW – auf Anfrage]</p>
            <p>Münster, Deutschland</p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">Kontakt</h2>
            <p>Instagram: <a href="https://www.instagram.com/nailzbynicci" target="_blank" rel="noopener noreferrer" className="text-blossom hover:underline">@nailzbynicci</a></p>
            <p>Direct Message: <a href="https://ig.me/m/nailzbynicci" target="_blank" rel="noopener noreferrer" className="text-blossom hover:underline">ig.me/m/nailzbynicci</a></p>
            <p className="text-xs text-chrome mt-1">E-Mail: hello@nailzbynicci.de [Platzhalter für offizielle Korrespondenz]</p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">Gewerbliche Tätigkeit</h2>
            <p>
              Freiberufliche / kleingewerbliche Dienstleistungen im Bereich Nageldesign und individuelle Nagelarchitektur gemäß § 19 UStG (Kleinunternehmerregelung – keine Ausweisung der Umsatzsteuer).
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-fog border border-fog">
            <h2 className="font-serif text-xl text-white mb-2">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten (insbesondere Fotos und Videos der Nagelsets) unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung und Verbreitung bedürfen der schriftlichen Zustimmung von Nicole (@nailzbynicci).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-fog flex items-center justify-between text-xs text-fog-light">
          <Link href="/" className="hover:text-white transition-colors">
            ← Zurück zur Startseite
          </Link>
          <Link href="/legal/datenschutz" className="hover:text-white transition-colors">
            Zur Datenschutzerklärung →
          </Link>
        </div>
      </div>
    </div>
  )
}
