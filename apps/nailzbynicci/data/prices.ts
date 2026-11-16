// Verified 2026 Price List for @nailzbynicci
export interface PriceTier {
  id: string
  tierNumber: string
  name: string
  priceRange: string
  minPrice: number
  maxPrice: number
  duration: string
  badge: {
    de: string
    en: string
  }
  description: {
    de: string
    en: string
  }
  examples: {
    de: string[]
    en: string[]
  }
  recommendedFor: {
    de: string
    en: string
  }
  popular?: boolean
}

export const priceTiers: PriceTier[] = [
  {
    id: 'basic',
    tierNumber: 'TIER 01',
    name: 'Basic Set',
    priceRange: '50 – 60 €',
    minPrice: 50,
    maxPrice: 60,
    duration: '60 – 75 Min',
    badge: {
      de: 'Minimalistisch & Elegant',
      en: 'Minimalist & Refined',
    },
    description: {
      de: 'Perfekt für zeitlose Ästhetik. Natürliche Gel-X Verlängerung mit einfarbigem Lack, dezentem Chrom-Schimmer oder feinen Micro-French Spitzen.',
      en: 'Timeless luxury. Full Aprés Gel-X extension with single-color coat, glazed chrome sheen, or crisp micro-French lines.',
    },
    examples: {
      de: [
        'Einfarbiges Gel-Finish (Schwarz, Dunkelrot, Nude)',
        'Glazed Donut / Perlen-Chrom Schimmer',
        'Klassische oder Micro-French Spitzen',
        'Katzenaugen / Velvet Magnet-Effekt',
      ],
      en: [
        'Solid luxury gel coat (Obsidian, Oxblood, Nude)',
        'Glazed pearl chrome sheen',
        'Classic or micro-French tips',
        'Velvet magnetic cat-eye effect',
      ],
    },
    recommendedFor: {
      de: 'Alltagsluxus & dezente Clean-Girl Ästhetik',
      en: 'Everyday understated luxury & clean nail aesthetics',
    },
  },
  {
    id: 'medium',
    tierNumber: 'TIER 02',
    name: 'Medium Set',
    priceRange: '65 – 80 €',
    minPrice: 65,
    maxPrice: 80,
    duration: '75 – 90 Min',
    badge: {
      de: 'Mehrfinger-Kunst',
      en: 'Multi-Finger Art',
    },
    popular: true,
    description: {
      de: 'Der beliebteste Studio-Favorit. Kunstvolles Design auf 4 bis 10 Fingern mit Aura-Verläufen, flüssigen 3D-Geltropfen oder feinen Chrom-Elementen.',
      en: 'The studio favorite. Artistic nail design on 4 to 10 fingers featuring diffused aura gradients, fluid 3D gel dew drops, or chrome linework.',
    },
    examples: {
      de: [
        'Sanfte Aura-Blush Kerne (Sakura-Pink, Vampir-Rot)',
        'Organische 3D-Wassertropfen & flüssige Texturen',
        'Chromierte Linienmuster & Metall-Swirls',
        'Akzent-Charms (Kleine Schleifen, Sterne, Herzen 🩶)',
      ],
      en: [
        'Diffused aura blush centers (Sakura pink, vampire red)',
        'Organic 3D dew droplets & fluid gel textures',
        'Molten chrome linework & metallic swirls',
        'Accent charms (miniature bows, stars, hearts 🩶)',
      ],
    },
    recommendedFor: {
      de: 'Auffällige Eleganz mit spürbarem Detailgrad',
      en: 'Statement elegance with delicate dimensional depth',
    },
  },
  {
    id: 'crazy',
    tierNumber: 'TIER 03',
    name: 'Crazy Set',
    priceRange: '85 – 100 €',
    minPrice: 85,
    maxPrice: 100,
    duration: '90 – 120 Min',
    badge: {
      de: 'Volles Handpainted Art',
      en: 'Full 10-Finger High Art',
    },
    description: {
      de: 'Kompromisslose Kunst auf allen 10 Fingern. Aufwändige handgemalte Motive, Cyber-Sigilism, Spinnenweben, 3D-Verzierungen und Kreuz-Inlays.',
      en: 'Uncompromising artistry across all 10 fingers. Intricate hand-painted illustrations, cyber-sigilism, spiderwebs, 3D gel sculpting, and cross inlays.',
    },
    examples: {
      de: [
        'Handgemalte gotische Spinnenweben & Sigils',
        '3D-Relief-Elemente (Dornen, Kreuz-Inlays, Barock-Details)',
        'Extrudierte Cyber-Tribal Chrom-Linien',
        'Echte Süßwasserperlen & metallische Charms',
      ],
      en: [
        'Hand-painted gothic spiderwebs & cyber sigils',
        '3D relief elements (thorns, cross inlays, baroque details)',
        'Extruded cyber-tribal liquid chrome linework',
        'Freshwater micro-pearls & metallic pierced hardware',
      ],
    },
    recommendedFor: {
      de: 'Detailverliebte Fashion-Sets & kreative Eyecatcher',
      en: 'High-concept creative statement sets & fashion editorials',
    },
  },
  {
    id: 'insane',
    tierNumber: 'TIER 04',
    name: 'Insane Set',
    priceRange: '105 – 115 €',
    minPrice: 105,
    maxPrice: 115,
    duration: '120 – 150 Min',
    badge: {
      de: 'Magnum Opus Skulptur',
      en: 'Magnum Opus Sculpture',
    },
    description: {
      de: 'Niccis Meisterwerke der Nagelarchitektur. Extreme Längen, vollwertige 3D-Figuren (Bärchen, Pandas, Wirbelsäulen), Piercings und maximale Detaildichte.',
      en: 'Nicci’s pinnacle wearable masterpieces. Extreme lengths, fully sculpted 3D figures (bears, pandas, spinal columns), piercings, and maximum density.',
    },
    examples: {
      de: [
        'Handgeformte 3D-Bärchen, Pandas oder Skelett-Wirbelsäulen',
        'Durchbohrte Freikanten mit echten Silber-Piercings & Ketten',
        'Mehrschichtige Cyber-Armor Metall-Rüstungen',
        'Extremer Stiletto / XL Balerina Skulptur-Formen',
      ],
      en: [
        'Hand-formed 3D bears, pandas, or sculpted spinal columns',
        'Pierced free edges with genuine silver hardware & chains',
        'Multi-layered cyber armor metallic extrusions',
        'Extreme stiletto or XL ballerina structural silhouettes',
      ],
    },
    recommendedFor: {
      de: 'Absolute Statement-Pieces für Events, Shoots & Sammler',
      en: 'Supreme statement sets for events, photoshoots & collectors',
    },
  },
]

export const removalsAndAddons = [
  {
    name: {
      de: 'Gel-X Entfernung (Vor Neuset)',
      en: 'Gel-X Safe Removal (With New Set)',
    },
    price: '+ 5 €',
    description: {
      de: 'Schonendes Ablösen des alten Aprés Gel-X Materials in Verbindung mit einem gebuchten Neuset.',
      en: 'Gentle soak-off of previous Aprés Gel-X architecture when booked with a new full set.',
    },
  },
  {
    name: {
      de: 'Reine Entfernung (Fremd- oder Eigenmaterial)',
      en: 'Standalone Removal (Foreign or In-House)',
    },
    price: '10 €',
    description: {
      de: 'Vollständiges, schonendes Entfernen von Altmaterial inklusive russischer Maniküre-Pflege zur Schonung des Naturnagels.',
      en: 'Complete safe removal of old material followed by nourishing cuticle care to restore natural nail plates.',
    },
  },
]
