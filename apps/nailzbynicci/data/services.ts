// Services & pricing data
// ⚠️ PLACEHOLDER PRICES — client to supply real menu

export type ServiceTier = 'foundation' | 'addon'

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  priceFrom: number
  priceTo?: number
  tier: ServiceTier
  popular?: boolean
  includes?: string[]
}

export interface ArtTier {
  id: string
  level: 'I' | 'II' | 'III'
  name: string
  description: string
  examples: string[]
  priceFrom: number
  priceTo?: number
}

export const services: Service[] = [
  {
    id: 'biab-manicure',
    name: 'Signature BIAB Structured Manicure',
    description: 'The studio foundation. A full dry Russian e-file manicure followed by structured Builder-in-a-Bottle gel — reinforcing your natural nail plate for 4+ week flawless retention.',
    duration: '90 min',
    priceFrom: 85,
    priceTo: 105,
    tier: 'foundation',
    popular: true,
    includes: [
      'Dry diamond e-file cuticle prep',
      'Apex alignment & C-curve balancing',
      'Two-layer structured BIAB application',
      'Single colour or sheer tinted gel',
      'High-gloss or matte top coat',
      'Jojoba cuticle oil finish',
    ],
  },
  {
    id: 'gelx-extensions',
    name: 'Gel-X Sculpted Extensions',
    description: 'Custom-fitted soft gel extensions applied over a full dry manicure prep. Perfect for adding length while maintaining natural flex, light weight, and long-term nail plate health.',
    duration: '105 min',
    priceFrom: 115,
    priceTo: 140,
    tier: 'foundation',
    includes: [
      'Dry diamond e-file cuticle prep',
      'Custom Gel-X size fitting',
      'Gel-X extension application',
      'Apex build & structural gel layer',
      'Single colour or sheer base',
      'High-gloss or matte top coat',
    ],
  },
  {
    id: 'safe-removal',
    name: 'Safe Removal & Restoration',
    description: 'Gentle soak-off or precision e-file removal with zero damage to the natural nail plate. Includes a nourishing base treatment to restore moisture and flexibility.',
    duration: '45 min',
    priceFrom: 30,
    priceTo: 40,
    tier: 'foundation',
    includes: [
      'Precision e-file or soak-off removal',
      'Natural nail assessment',
      'Nourishing restoration treatment',
      'Complimentary with same-day new set',
    ],
  },
]

export const artTiers: ArtTier[] = [
  {
    id: 'tier-1',
    level: 'I',
    name: 'Minimalist Chic',
    description: 'Refined, understated art that elevates without overwhelming. Perfect for the clean-girl aesthetic.',
    examples: [
      'Chrome burnishing (all 10)',
      'Micro-French line (all 10)',
      'Minimal negative space accents',
      'Tonal dot or linear work',
      'Sheer tinted jelly finish',
    ],
    priceFrom: 20,
    priceTo: 30,
  },
  {
    id: 'tier-2',
    level: 'II',
    name: 'Elevated Detail',
    description: 'Sophisticated techniques that create depth, dimension, and seasonal relevance across the full set.',
    examples: [
      'Aura blooming (all 10)',
      'Tortoiseshell or marble',
      'Double French / V-cut tips',
      'Chrome linework (all 10)',
      'Ombre gradient all 10',
    ],
    priceFrom: 35,
    priceTo: 55,
  },
  {
    id: 'tier-3',
    level: 'III',
    name: 'Bespoke Masterpiece',
    description: 'Multi-technique, fully bespoke artistry. Statement sets designed for the client who wants a conversation piece on their hands.',
    examples: [
      '3D gel sculpting (bows, droplets)',
      'Encapsulation (botanicals, foils)',
      'Fluid liquid chrome 3D swirls',
      'Mixed technique mismatched sets',
      'Bridal editorial custom concepts',
    ],
    priceFrom: 60,
    priceTo: 90,
  },
]

export const addons = [
  { name: 'Gel polish removal (existing)', price: 15 },
  { name: 'Nail repair (per nail)', price: 10 },
  { name: 'Nail art on accent nails only (2 nails)', price: 15 },
  { name: 'Gift card', price: null, note: 'Available in any amount' },
]
