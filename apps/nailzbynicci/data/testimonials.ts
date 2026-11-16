// Verified Client Testimonials & Retention Records from @nailzbynicci Story Archives

export interface Testimonial {
  id: string
  clientName: string
  handle: string
  duration: string
  quote: {
    de: string
    en: string
  }
  setDetails: {
    de: string
    en: string
  }
}

export const testimonials: Testimonial[] = [
  {
    id: 'marie',
    clientName: 'Marie',
    handle: '@blxxdy.marie',
    duration: '5 Wochen Haltbarkeit',
    quote: {
      de: 'Einfach 5 Wochen ohne ein einziges Lifting überstanden! Nicci ist die absolute Meisterin für Aprés Gel-X in Münster. Ich gehe nie wieder woanders hin 🩶',
      en: 'Literally lasted 5 full weeks without a single lift! Nicci is the undisputed Aprés Gel-X master in Münster. Never going anywhere else 🩶',
    },
    setDetails: {
      de: 'Cyber Dagger Stiletto mit flüssigem Silberchrom',
      en: 'Cyber Dagger Stiletto with liquid silver chrome',
    },
  },
  {
    id: 'sophia',
    clientName: 'Sophia',
    handle: '@sxphia1807',
    duration: '4 Wochen Haltbarkeit',
    quote: {
      de: 'Meine Naturnägel sind dank ihr so gesund geblieben. Die 3D-Bärchen haben jeden Tag gehalten und ich wurde ständig darauf angesprochen! 🐾',
      en: 'My natural nails stayed so healthy thanks to her gentle prep. The 3D bears stayed intact every day and I got stopped constantly! 🐾',
    },
    setDetails: {
      de: 'Soft Kawaii 3D Teddy Bear & Cherry Gel-X',
      en: 'Soft Kawaii 3D Teddy Bear & Cherry Gel-X',
    },
  },
  {
    id: 'lucia',
    clientName: 'Lucia',
    handle: '@lucia.020210',
    duration: '6 Wochen Haltbarkeit',
    quote: {
      de: 'Unglaubliche 6 Wochen rausgewachsen und bombensicher. Niccis Studio ist wie ein kleiner Zufluchtsort – Musik, iPad, einfach pure Entspannung.',
      en: 'Incredible 6-week grow-out and still bombproof. Nicci’s studio feels like an intimate sanctuary—music, iPad, pure relaxation.',
    },
    setDetails: {
      de: 'Blood Velvet Flame Aura Almond',
      en: 'Blood Velvet Flame Aura Almond',
    },
  },
  {
    id: 'lara',
    clientName: 'Lara',
    handle: '@lara.grenzi',
    duration: '4,5 Wochen Haltbarkeit',
    quote: {
      de: 'Der Glanz und die C-Kurve sind absolute Perfektion. Wer echte Nagelkunst und Qualität schätzt, muss zu Nicci nach Münster!',
      en: 'The mirror gloss and C-curve apex are sheer perfection. Anyone who values real nail architecture needs to visit Nicci in Münster!',
    },
    setDetails: {
      de: 'Glazed Opal Chrome & 3D Spine Inlay',
      en: 'Glazed Opal Chrome & 3D Spine Inlay',
    },
  },
]
