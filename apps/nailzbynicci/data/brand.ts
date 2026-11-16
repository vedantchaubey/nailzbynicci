// Verified Brand Identity for Nicole "Nicci" (@nailzbynicci)
export const brand = {
  artistName: 'Nicole "Nicci"',
  handle: '@nailzbynicci',
  personalHandle: '@niccicatt',
  tagline: {
    de: 'Haute Nail Artistry & Skulpturale Aprés Gel-X Architektur',
    en: 'Bespoke Nail Artistry & Sculptural Aprés Gel-X Architecture',
  },
  subTagline: {
    de: 'Wo düstere Romantik auf verspielte Kawaii-Ästhetik trifft · Münster, NRW',
    en: 'Where dark romanticism meets playful kawaii whimsy · Münster, Germany',
  },
  bio: {
    de: 'In meinem privaten Homestudio in Münster erschaffe ich individuelle Kunstwerke auf Aprés Gel-X Basis. Keine Massenabfertigung, keine aggressiven Acryle – nur reine Hingabe zur Gesundheit deiner Naturnägel und kompromisslose Detailverliebtheit.',
    en: 'In my private home atelier in Münster, I sculpt bespoke wearable art on Aprés Gel-X foundations. No rushed assembly lines, no damaging acrylics—only devoted natural nail care and uncompromising craftsmanship.',
  },
  location: {
    city: 'Münster',
    region: 'North Rhine-Westphalia (NRW)',
    country: 'Germany',
    type: 'Private Home Studio',
    addressNote: {
      de: 'Genaue Adresse wird nach bestätigter Terminanfrage und Anzahlung per DM mitgeteilt.',
      en: 'Exact studio address is disclosed via Instagram DM upon confirmed booking and deposit.',
    },
  },
  // 100% Instagram Direct Message Booking
  bookingUrl: 'https://ig.me/m/nailzbynicci',
  instagramUrl: 'https://www.instagram.com/nailzbynicci',
  personalInstagramUrl: 'https://www.instagram.com/niccicatt',
  
  // Placeholders for legal / direct contact
  email: '', // ⚠️ Managed via Instagram DM / disclosed upon booking
  whatsappNumber: '', // ⚠️ Managed in DM
  
  // Final Verified Policies (from Nicci's Official Announcements)
  policies: {
    depositAmount: 20,
    depositCurrency: '€',
    depositPaymentMethod: 'PayPal',
    depositNote: {
      de: '20 € Anzahlung via PayPal innerhalb von 24h nach Terminabstimmung zur festen Reservierung erforderlich.',
      en: '€20 PayPal deposit required within 24 hours of agreeing on a slot to secure your reservation.',
    },
    reschedulePolicy: {
      de: 'Terminverschiebungen mit mehr als 48h Vorlauf werden auf den Folgetermin übertragen. Absagen unter 48h vor dem Termin verfallen.',
      en: 'Rescheduling with >48h advance notice transfers your deposit. Cancellations with <48h notice forfeit the deposit.',
    },
    bareNailsRule: {
      de: 'Bitte ausnahmslos mit Naturnägeln erscheinen (kein Fremdmaterial von anderen Studios, es sei denn, eine Entfernung wurde vorab gebucht).',
      en: 'Arrive strictly with bare natural nails (no foreign fills from other salons, unless removal was pre-booked).',
    },
    clothingRule: {
      de: 'Keine fusselnden Pullover (z.B. Mohair oder Grobstrick). Fussel ruinieren nasse Gel-Schichten.',
      en: 'No lint-shedding knitwear (mohair, fuzzy sweaters). Loose fibers contaminate wet gel layers.',
    },
    lateFee: {
      de: 'Ab 15 Minuten Verspätung fällt eine Gebühr von 5 € an oder das Design muss zeitlich vereinfacht werden.',
      en: '15+ minutes late incurs a €5 fee or requires downsizing the set complexity.',
    },
    studioPerks: {
      de: 'Eigenes iPad für Netflix, YouTube oder Spotify während des Termins. Getränke- und Snackpausen jederzeit willkommen.',
      en: 'Dedicated iPad for streaming Netflix, YouTube, or Spotify during your set. Drink and snack breaks welcomed.',
    },
    retentionGuarantee: {
      de: '4 bis 6 Wochen garantierte Haltbarkeit ohne Liftings.',
      en: 'Proven 4 to 6 weeks durability without lifting.',
    },
  },
  
  pillars: [
    {
      number: '01',
      title: {
        de: '100% Aprés Gel-X System',
        en: '100% Aprés Gel-X Architecture',
      },
      description: {
        de: 'Reine Soft-Gel Extensions ohne giftige Monomere oder aggressive Feilarbeiten. Deine Naturnägel bleiben intakt, gesund und kräftig.',
        en: 'Pure soft-gel extensions without toxic MMA monomers or aggressive drilling. Preserves natural nail plate health.',
      },
    },
    {
      number: '02',
      title: {
        de: 'Duale Kunstästhetik',
        en: 'Dual Aesthetic Artistry',
      },
      description: {
        de: 'Meisterhafte Symbiose aus Cyber-Gothic (Spikes, Chrom-Wirbelsäulen, Dagger) und Soft-Kawaii (3D-Bärchen, Pandas, Kirschblüten).',
        en: 'Masterful balance of Cyber-Gothic (spikes, chrome spines, daggers) and Soft Kawaii (3D bears, pandas, sakura blossoms).',
      },
    },
    {
      number: '03',
      title: {
        de: 'Münster Homestudio Sanctuary',
        en: 'Münster Studio Sanctuary',
      },
      description: {
        de: 'Keine Hektik, kein Salon-Stress. Ein privater, gemütlicher Raum mit eigenem Entertainment-iPad und individueller Betreuung.',
        en: 'Zero salon rush or conveyor-belt stress. An intimate sanctuary with personal streaming entertainment and tailored care.',
      },
    },
  ],
} as const
