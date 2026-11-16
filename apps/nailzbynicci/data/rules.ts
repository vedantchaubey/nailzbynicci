// Studio Rules, Etiquette & Aftercare for @nailzbynicci (Münster, NRW)

export interface StudioRule {
  id: string
  number: string
  title: {
    de: string
    en: string
  }
  description: {
    de: string
    en: string
  }
  badge?: {
    de: string
    en: string
  }
}

export const studioRules: StudioRule[] = [
  {
    id: 'bare-nails',
    number: '01',
    title: {
      de: 'Ausnahmslos mit Naturnägeln erscheinen',
      en: 'Arrive Strictly with Bare Natural Nails',
    },
    badge: {
      de: 'Wichtig',
      en: 'Mandatory',
    },
    description: {
      de: 'Ich arbeite ausnahmslos mit dem originalen Aprés Gel-X System und fülle kein Fremdmaterial (Fremdacryl oder unbekannte Gele) auf. Bitte erscheine mit sauberen Naturnägeln oder buche vorab eine professionelle Gel-X Entfernung.',
      en: 'I work exclusively with the genuine Aprés Gel-X system and never fill over foreign acrylics or unknown gel formulas from other salons. Please arrive with bare natural nails or book a safe removal in advance.',
    },
  },
  {
    id: 'clothing-lint',
    number: '02',
    title: {
      de: 'Keine fusselnden Pullover oder Wollkleidung',
      en: 'No Fluffy or Lint-Shedding Knitwear',
    },
    badge: {
      de: 'Studio-Etikette',
      en: 'Etiquette',
    },
    description: {
      de: 'Bitte trage am Termintag keine fusselnden Mohair-, Angora- oder Grobstrickpullover. Schwebende Fasern setzen sich unbemerkt im feuchten Gel fest und zerstören den spiegelglatten Glass-Topcoat.',
      en: 'Avoid wearing mohair, angora, or loose-knit fuzzy sweaters to your appointment. Airborne lint settles into wet gel layers and compromises mirror-smooth glass topcoats.',
    },
  },
  {
    id: 'punctuality',
    number: '03',
    title: {
      de: 'Pünktlichkeit & 15-Minuten-Regelung',
      en: 'Punctuality & 15-Minute Policy',
    },
    description: {
      de: 'Um jedem Set die volle künstlerische Zeit zu widmen, gilt: Ab 15 Minuten Verspätung fällt eine Gebühr von 5 € an oder das Design muss zeitlich vereinfacht werden. Ab 25 Minuten wird der Termin storniert und die Anzahlung verfällt.',
      en: 'To give every set full artistic dedication: 15+ minutes delay incurs a €5 fee or requires simplifying the design. Beyond 25 minutes, the slot is cancelled and deposit forfeited.',
    },
  },
  {
    id: 'deposit-terms',
    number: '04',
    title: {
      de: '20 € Anzahlung via PayPal',
      en: '€20 PayPal Deposit',
    },
    badge: {
      de: 'Buchungsbedingung',
      en: 'Booking Policy',
    },
    description: {
      de: 'Zur festen Reservierung deines Termins ist innerhalb von 24 Stunden nach Terminabsprache eine Anzahlung von 20 € via PayPal erforderlich. Terminverschiebungen mit mehr als 48h Vorlauf werden übertragen; Absagen unter 48h verfallen.',
      en: 'To secure your appointment slot, a €20 PayPal deposit is required within 24 hours of agreeing on a date. Rescheduling with >48h notice transfers your deposit; cancellations under 48h forfeit it.',
    },
  },
  {
    id: 'comfort-entertainment',
    number: '05',
    title: {
      de: 'iPad Streaming & Snack-Pausen',
      en: 'Dedicated iPad Streaming & Comfort',
    },
    badge: {
      de: 'Wohlfühlatmosphäre',
      en: 'Sanctuary Perk',
    },
    description: {
      de: 'Ein Termin dauert zwischen 1 und 2,5 Stunden. Für deine Entspannung steht ein eigenes iPad mit Netflix, YouTube und Spotify bereit. Getränke- und Snackpausen sind jederzeit willkommen.',
      en: 'Appointments take between 1 and 2.5 hours. A dedicated studio iPad is provided with Netflix, YouTube, and Spotify for your entertainment. Drink and snack pauses are always welcomed.',
    },
  },
  {
    id: 'content-release',
    number: '06',
    title: {
      de: 'Foto- & Content-Aufnahme',
      en: 'Photo & Video Content Session',
    },
    description: {
      de: 'Nach Fertigstellung nehmen wir uns ca. 3–5 Minuten Zeit für professionelle Fotos und Videos deines neuen Sets für mein Instagram-Portfolio (@nailzbynicci).',
      en: 'Upon set completion, we take 3–5 minutes for high-resolution photography and video captures of your new set for the Instagram portfolio (@nailzbynicci).',
    },
  },
]

export const aftercareSteps = [
  {
    number: '01',
    title: {
      de: '24h Heißwasser-Schutz',
      en: '24h Water & Heat Protection',
    },
    description: {
      de: 'Vermeide in den ersten 24 Stunden langes Baden, Saunabesuche oder heißes Spülen, damit die molekulare Bindung des Gels vollständig aushärtet.',
      en: 'Avoid prolonged hot baths, steam saunas, or washing dishes with scalding water for the first 24h to allow the soft-gel bond to fully cure.',
    },
  },
  {
    number: '02',
    title: {
      de: 'Tägliches Nagelöl',
      en: 'Daily Cuticle Hydration',
    },
    description: {
      de: 'Massiere täglich hochwertiges Jojoba- oder Mandelöl in die Nagelhaut ein. Das verhindert Verhornungen und hält die Gel-Kanten geschmeidig.',
      en: 'Massage premium jojoba or almond oil into your cuticles daily. Hydrated skin prevents lifting and keeps sidewalls supple.',
    },
  },
  {
    number: '03',
    title: {
      de: 'Nägel sind Juwelen, keine Werkzeuge',
      en: 'Nails Are Jewels, Not Tools',
    },
    description: {
      de: 'Öffne Dosen oder Pakete niemals mit der Nagelspitze. Verwende stattdessen Hilfswerkzeuge, um Hebelkräfte auf den Naturnagel zu vermeiden.',
      en: 'Never use your nail tips to pry open cans, peel tape, or scrape surfaces. Treat your set like wearable fine jewelry.',
    },
  },
]
