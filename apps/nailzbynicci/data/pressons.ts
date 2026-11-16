// Verified Press-On Collection Data for @nailzbynicci

export interface PressOnItem {
  id: string
  title: string
  videoFile: string
  poster: string
  shape: string
  length: string
  style: 'dark-chrome' | 'kawaii' | 'glam-luxe'
  description: {
    de: string
    en: string
  }
}

export const pressOnItems: PressOnItem[] = [
  {
    id: 'presson-01',
    title: 'Noir Cherry Glass Aura',
    videoFile: '/images/source/press-on/Video-14378.mp4',
    poster: '/images/posters/Video-14378.webp',
    shape: 'Stiletto',
    length: 'Long',
    style: 'dark-chrome',
    description: {
      de: 'Dunkelroter Vampir-Aura Farbverlauf mit hochglänzender, kratzfester Schutzversiegelung auf wiederverwendbaren Aprés Gel-X Spitzen.',
      en: 'Deep oxblood vampire aura gradient sealed beneath high-gloss scratch-resistant topcoat on reusable Aprés Gel-X tips.',
    },
  },
  {
    id: 'presson-02',
    title: 'Kawaii 3D Blossom & Ribbon Bow',
    videoFile: '/images/source/press-on/Video-2046.mp4',
    poster: '/images/posters/Video-2046.webp',
    shape: 'Almond',
    length: 'Medium',
    style: 'kawaii',
    description: {
      de: 'Handmodellierte 3D-Schleifen und zarter Kirschblüten-Schimmer in maßgefertigter Sammlerbox.',
      en: 'Hand-sculpted 3D ribbon bows and sakura blossom blush in bespoke collector box packaging.',
    },
  },
  {
    id: 'presson-03',
    title: 'Cyberpunk Toxic & Gothic Cross',
    videoFile: '/images/source/press-on/Video-26701.mp4',
    poster: '/images/posters/Video-26701.webp',
    shape: 'Ballerina',
    length: 'Long',
    style: 'dark-chrome',
    description: {
      de: 'Neongrünes Cyberpunk-Lettering (\'TOXIC\', \'MOTEL\') und handmodelliertes schwarzes Gothic-Kreuz in Sammlerbox.',
      en: 'Neon green cyberpunk lettering (\'TOXIC\', \'MOTEL\') and hand-sculpted black gothic crucifix in custom collector case.',
    },
  },
  {
    id: 'presson-04',
    title: '3D Flora & Glazed Pearl Chrome',
    videoFile: '/images/source/press-on/Video-26925.mp4',
    poster: '/images/posters/Video-26925.webp',
    shape: 'Almond',
    length: 'Medium',
    style: 'glam-luxe',
    description: {
      de: 'Handgeformte 3D-Blütenblätter, Perlen-Einschlüsse und irisierender Perlenchrom-Schimmer.',
      en: 'Hand-sculpted 3D floral petals, pearl encapsulations, and glazed chrome sheen.',
    },
  },
]
