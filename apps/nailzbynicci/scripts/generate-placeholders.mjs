import fs from 'node:fs';
import path from 'node:path';

const galleryDir = path.resolve('./public/images/gallery');
const brandDir = path.resolve('./public/images/brand');

fs.mkdirSync(galleryDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

const sets = [
  { id: 'nicci-001', title: 'GLAZED OPAL ALMOND', subtitle: 'Pearl Chrome · BIAB Foundation', base: '#F8F5F0', accent: '#E8D5CC', detail: '#D4D8DC' },
  { id: 'nicci-002', title: 'MICRO-ARCH FRENCH', subtitle: 'Noir Cherry Tips · Soft Square', base: '#F2DFDB', accent: '#3D1018', detail: '#C9A982' },
  { id: 'nicci-003', title: 'ETHEREAL AURA CAPSULE', subtitle: 'Sage Bloom · Silver Linework', base: '#BFCCB0', accent: '#D2C7DF', detail: '#D7DBDF' },
  { id: 'nicci-004', title: 'BOTANICAL TERRARIUM', subtitle: 'Encapsulated Florals · Gold Flecks', base: '#FBF8F5', accent: '#D8C5A8', detail: '#9E4936' },
  { id: 'nicci-005', title: 'MOLTEN PLATINUM', subtitle: '3D Chrome Fluid Swirls', base: '#141211', accent: '#D4D8DC', detail: '#FFFFFF' },
  { id: 'nicci-006', title: 'WARM CASHMERE BIAB', subtitle: 'Quiet Luxury · Natural Polish', base: '#D9CCC1', accent: '#A28F81', detail: '#FBF8F5' },
  { id: 'nicci-007', title: 'OBSIDIAN NOIR ARCH', subtitle: 'Negative Space Geometric Linework', base: '#161617', accent: '#3B0E17', detail: '#C9A982' },
  { id: 'nicci-008', title: 'CHAMPAGNE AURUM', subtitle: 'Burnished Gold Leaf · Almond Set', base: '#EBE4DD', accent: '#C9A982', detail: '#141211' },
  { id: 'nicci-009', title: 'ICED LILAC AURA', subtitle: 'Diffused Lavender · Sheer Base', base: '#D2C7DF', accent: '#F8F5F0', detail: '#C9A982' },
  { id: 'nicci-010', title: 'VELVET EMERALD', subtitle: 'Half-Moon Negative Space Architecture', base: '#1A2F25', accent: '#D5C7B8', detail: '#C9A982' },
  { id: 'nicci-011', title: '3D SCULPTED BOWS', subtitle: 'Low-Relief Dimensional Gel Art', base: '#F2DFDB', accent: '#EBE4DD', detail: '#D4D8DC' },
  { id: 'nicci-012', title: 'DOUBLE SMILE FRENCH', subtitle: 'Bordeaux & Alabaster Contrast', base: '#EBE4DD', accent: '#3D1018', detail: '#FBF8F5' },
];

function createEditorialSvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1067" width="800" height="1067">
  <defs>
    <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.base}" />
      <stop offset="60%" stop-color="${item.accent}" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#141211" stop-opacity="0.9" />
    </linearGradient>
    <radialGradient id="glow-${item.id}" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${item.detail}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="${item.base}" stop-opacity="0" />
    </radialGradient>
    <filter id="grain-${item.id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
      <feBlend mode="multiply" />
    </filter>
  </defs>

  <!-- Editorial Background Canvas -->
  <rect width="100%" height="100%" fill="url(#grad-${item.id})" />
  <circle cx="400" cy="420" r="320" fill="url(#glow-${item.id})" />
  
  <!-- Subtle Architectural Framing Lines -->
  <rect x="30" y="30" width="740" height="1007" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
  <rect x="42" y="42" width="716" height="983" fill="none" stroke="rgba(201,169,130,0.22)" stroke-width="0.5" />

  <!-- Abstract Hand & Nail Sculptural Silhouette -->
  <g transform="translate(400, 480)" text-anchor="middle">
    <!-- Stylized Nail Tip Curves -->
    <path d="M -90,-160 C -90,-250 -40,-310 0,-330 C 40,-310 90,-250 90,-160 C 90,-60 60,60 0,70 C -60,60 -90,-60 -90,-160 Z" 
          fill="none" stroke="${item.detail}" stroke-width="2" opacity="0.75" />
    <path d="M -60,-150 C -60,-220 -25,-260 0,-280 C 25,-260 60,-220 60,-150 C 60,-70 40,30 0,40 C -40,30 -60,-70 -60,-150 Z" 
          fill="${item.base}" fill-opacity="0.25" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
    
    <!-- Luminous Apex Glaze Line -->
    <path d="M -15,-270 Q 0,-285 15,-270 Q 0,-150 0,30" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.6" stroke-linecap="round" />
    
    <!-- Fine Ring Accent -->
    <circle cx="0" cy="120" r="18" fill="none" stroke="#C9A982" stroke-width="2.5" />
  </g>

  <!-- Editorial Top Metadata -->
  <text x="60" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.7)" text-transform="uppercase">NAILZ BY NICCI · STUDIO ARCHIVE</text>
  <text x="740" y="80" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" letter-spacing="3" fill="rgba(255,255,255,0.7)">${item.id.toUpperCase()}</text>

  <!-- Editorial Bottom Typography Block -->
  <g transform="translate(60, 930)">
    <text x="0" y="0" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" font-weight="500" fill="#FFFFFF" letter-spacing="-0.5">${item.title}</text>
    <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" letter-spacing="2" fill="rgba(255,255,255,0.75)" text-transform="uppercase">${item.subtitle}</text>
  </g>

  <line x1="60" y1="980" x2="740" y2="980" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
  <text x="60" y="1005" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" letter-spacing="3" fill="#C9A982">RUSSIAN MANICURE · BIAB APEX ARCHITECTURE</text>
  <text x="740" y="1005" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.5)">PRIVATE SUITE</text>
</svg>`;
}

function createPortraitSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1067" width="800" height="1067">
  <defs>
    <linearGradient id="pgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EBE4DD" />
      <stop offset="50%" stop-color="#D5C7B8" />
      <stop offset="100%" stop-color="#141211" />
    </linearGradient>
    <radialGradient id="pglow" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#EBE4DD" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#pgrad)" />
  <circle cx="400" cy="380" r="300" fill="url(#pglow)" />
  <rect x="30" y="30" width="740" height="1007" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1" />

  <!-- Stylized Artisan Portrait Silhouette -->
  <g transform="translate(400, 430)" text-anchor="middle">
    <!-- Head / Hair Aura -->
    <ellipse cx="0" cy="-120" rx="90" ry="115" fill="#141211" opacity="0.85" />
    <path d="M -85,-110 C -110,-40 -120,80 -130,220 L 130,220 C 120,80 110,-40 85,-110 Z" fill="#141211" opacity="0.9" />
    <!-- Fine gold necklace accent -->
    <path d="M -35,5 C -15,35 15,35 35,5" fill="none" stroke="#C9A982" stroke-width="2.5" />
    <!-- Hands holding precision tool -->
    <ellipse cx="0" cy="90" rx="35" ry="12" fill="none" stroke="#D4D8DC" stroke-width="1.5" />
  </g>

  <!-- Framing Typography -->
  <text x="60" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.7)">NICOLE · MASTER NAIL ARTISAN</text>
  <text x="740" y="80" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" letter-spacing="3" fill="#C9A982">THE ATELIER</text>

  <g transform="translate(60, 940)">
    <text x="0" y="0" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-style="italic" fill="#FFFFFF">"Healthy natural nails will always be the standard."</text>
    <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" letter-spacing="2" fill="rgba(255,255,255,0.7)">FOUNDER &amp; LEAD ARTISAN · @NAILZBYNICCI</text>
  </g>
</svg>`;
}

// Write gallery SVG files
for (const item of sets) {
  const svgContent = createEditorialSvg(item);
  fs.writeFileSync(path.join(galleryDir, `${item.id}.svg`), svgContent, 'utf8');
}

// Write portrait SVG
fs.writeFileSync(path.join(brandDir, 'portrait.svg'), createPortraitSvg(), 'utf8');

console.log('Successfully generated high-end editorial gallery and brand assets!');
