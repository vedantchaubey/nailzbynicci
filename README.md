# 🖤 nailzbynicci — Alternative Nail Architecture & Atelier

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Production-000000?style=for-the-badge&logo=vercel)](https://nailzbynicci.vercel.app)
[![SEO Ready](https://img.shields.io/badge/SEO-10--Phase_Optimized-FF007A?style=for-the-badge)](SEO-REPORT.md)

> **Bespoke Alternative Nail Architecture & Handcrafted Custom Press-On Sets.**  
> Crafted by Nicole ([@nailzbynicci](https://instagram.com/nailzbynicci)) in Münster, Germany.  
> **100% Aprés Gel-X.** Zero acrylics, zero aggressive drills, 4–6 weeks retention.

---

## 🔗 Live Atelier & Deployment

* **Production URL:** [https://nailzbynicci.vercel.app](https://nailzbynicci.vercel.app)
* **Instagram Atelier:** [@nailzbynicci](https://instagram.com/nailzbynicci)
* **Direct Booking DM:** [https://ig.me/m/nailzbynicci](https://ig.me/m/nailzbynicci)
* **Sitemap:** [https://nailzbynicci.vercel.app/sitemap.xml](https://nailzbynicci.vercel.app/sitemap.xml)
* **Robots Directives:** [https://nailzbynicci.vercel.app/robots.txt](https://nailzbynicci.vercel.app/robots.txt)

---

## 🌐 Dynamic URL & Domain Architecture

* **Zero Hardcoded Domains:** There is no custom domain yet. The application does not hardcode, assume, or depend on any custom domain or country-code TLD.
* **Single Source of Truth (`NEXT_PUBLIC_SITE_URL`):**
  * All canonical URLs, XML sitemaps, robots.txt, Open Graph metadata, JSON-LD structured data schemas, and hreflang tags derive dynamically from `NEXT_PUBLIC_SITE_URL`.
* **Automatic Fallbacks:**
  * **Production:** Automatically resolves to `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` (falling back to `https://nailzbynicci.vercel.app`).
  * **Development:** Automatically resolves to `http://localhost:3000`.
* **Future Domain Connection:**
  * When a custom domain is acquired later, **updating `NEXT_PUBLIC_SITE_URL` in environment variables is the ONLY edit needed** across the entire project.
* **Path-Based Localization:**
  * Languages are path-based on the exact same host (`/` and `/de` for German, `/en` for English), so SEO and hreflang operate smoothly without separate country domains.

---

## 💅 Brand Philosophy & Visual Aesthetic

`nailzbynicci` challenges the generic, sterile nail salon experience with an uncompromising brutalist editorial aesthetic and alternative nail artistry:

* **Dual-Spectrum Artistry:**
  * **Edgy / Cyberpunk / Grunge:** Gunmetal chrome, 3D textured molten metal, sculpted daggers, spikes, distressed textures, cross motifs, and subcultural darkness.
  * **Kawaii / Playful:** Sanrio-inspired charms, 3D candy hearts, Miffy character art, pastel airbrush gradients, bows, and iridescent finishes.
* **100% Aprés Gel-X System:**
  * Pure medical-grade soft gel full-cover extensions.
  * No toxic MMA acrylic powder, no chemical fumes, no thinning of natural nail plates.
  * Flawless 4 to 6 weeks retention without liftings.
* **Luxury Custom Press-On Sets:**
  * 100% reusable, salon-grade bespoke press-on nails.
  * Built with 10 coats of structured gel for durability matching in-studio extensions.
  * Shipped across Germany with personalized sizing and glue/adhesive prep kits.
* **Brutalist Visual Design System:**
  * Concrete grey base (`#EFEFEF`) paired with high-voltage electric magenta (`#FF007A`) and raw deep black (`#0A0A0A`).
  * High-contrast 2px solid black architectural borders, tactile neo-brutalist buttons, and smooth kinetic inertia via Lenis scroll.
  * High accessibility, crystal-clear readability, and fluid responsive design on mobile and desktop.

---

## 🗺️ Bilingual Information Architecture (56 Static Routes)

The site is built with a German-first architecture (`ae/oe/ue` slugs with zero URL umlauts), paired with complete 1:1 English mirror routes (`/en/...`):

### 🇩🇪 German Routes (Default Root)
* `/` — **Startseite / Home** (Nageldesign & Alternative Nail Art Münster)
* `/galerie` — **Design Galerie** (All Works Showcase with Interactive Lightbox)
  * `/galerie/chrome-naegel` — Chrome & Metallic 3D Nailart
  * `/galerie/kawaii-naegel` — Kawaii, Sanrio & 3D Charms
  * `/galerie/stiletto-naegel` — Stiletto, Coffin & Almond Shapes
* `/preise` — **Transparente Preisübersicht** (Tier 1: 50–60€, Tier 2: 65–75€, Tier 3: 80–95€, Tier 4: 100–115€)
* `/termin-buchen` — **Termin buchen** (Studio-Regeln, 15€ Anzahlung, Ablauf & Instagram DM Buchung)
* `/press-ons` — **Custom Press-On Nägel** (Handgefertigte Sets mit 12 Video-Showcases)
  * `/press-ons/bestellen` — Press-On Bestellablauf, Sizing-Guide & Versand
* `/apres-gel-x-muenster` — **Aprés Gel-X Münster Spezialseite** (Warum Gel-X? Haltbarkeit, Hygiene & Vorteile)
* `/ueber-mich` — **Über Nicole** (Story, Tattoo- & Kunst-Hintergrund, Hygiene- & Studiostandards)
* `/faq` — **Häufig gestellte Fragen** (Haltbarkeit, Naturnägel, Allergien, Bezahlung)
* `/pflege-tipps` — **Aftercare & Pflege-Guide** (Öl-Routine, Handschuhe, No-Go's)
* `/ratgeber` — **SEO Ratgeber-Magazin** (8 umfassende Expertenartikel, je 600–1.000 Wörter):
  * `/ratgeber/wie-lange-haelt-apres-gel-x`
  * `/ratgeber/was-kostet-nageldesign-muenster`
  * `/ratgeber/vorbereitung-nageltermin`
  * `/ratgeber/wie-funktionieren-custom-press-ons`
  * `/ratgeber/chrome-naegel-pflege-haltbarkeit`
  * `/ratgeber/stiletto-vs-almond-nagelform`
  * `/ratgeber/nagelpflege-nach-dem-termin`
  * `/ratgeber/gel-x-vs-acryl-vergleich`
* `/sitemap` — **HTML Sitemap** (Vollständige Navigationsübersicht)
* `/impressum` & `/datenschutz` — **Rechtliches** (DSGVO & § 5 TMG konform)

### 🇬🇧 English Mirror Routes (`/en/...`)
* `/en` — **Home** (Alternative Nail Art Atelier Münster)
* `/en/gallery` (+ `/chrome-nails`, `/kawaii-nails`, `/stiletto-nails`)
* `/en/prices` — **Pricing Tiers**
* `/en/book-appointment` — **Appointment Booking & Policies**
* `/en/press-ons` (+ `/en/press-ons/order`) — **Handcrafted Custom Press-Ons**
* `/en/apres-gel-x-muenster` — **Aprés Gel-X Münster Guide**
* `/en/about-me` — **About Nicole**
* `/en/faq` — **Frequently Asked Questions**
* `/en/aftercare` — **Aftercare & Maintenance Tips**
* `/en/guides` (+ 8 individual English guide articles)
* `/en/sitemap`, `/en/imprint`, `/en/privacy`

---

## ⚡ Technical & SEO Features

1. **Next.js 14 App Router:**
   * 100% Static Site Generation (`SSG`) across all 56 pages for sub-second page loads.
   * Native Next.js Metadata API providing bespoke titles (50–60 chars) and meta descriptions (140–160 chars) per route and locale.
   * Automated bidirectional `hreflang` tags (`de-DE`, `en-US`, `x-default`) and canonical URLs.
2. **Rich Structured Data (JSON-LD):**
   * `LocalBusiness` (`NailSalon`) Schema with Münster geo-coordinates, price range `€50–€115`, and verified social channels.
   * `Product` & `VideoObject` Schema across all press-on set showcases.
   * `Article` Schema across all 8 guide posts.
   * `FAQPage` Schema on `/faq`.
   * `BreadcrumbList` Schema on all subpages.
   * *Strict ethical SEO standard:* Zero fake reviews and zero fabricated `AggregateRating` markup.
3. **High-Performance Media:**
   * WebP imagery with explicit responsive sizing and descriptive German keywords in file names and `alt` attributes.
   * Lazy-loaded video cards with native poster frames for press-on demonstrations.
4. **Permanent 301/308 Redirects:**
   * Legacy routes (`/gallery`, `/prices`, `/how-to-book`, `/about`) permanently redirected to modern German canonical slugs (`/galerie`, `/preise`, `/termin-buchen`, `/ueber-mich`).
5. **AI Search Readiness:**
   * Clean semantic HTML5 structure with unambiguous pricing tables, bulleted booking steps, and concise 1–3 sentence answers optimized for AI engines (Perplexity, ChatGPT Search, Google AI Overviews).

---

## 📚 Master SEO Documentation

Detailed documentation generated for ongoing organic growth:

* **[SEO-RESEARCH.md](SEO-RESEARCH.md):**  
  Deep competitor audit across 15 search queries in Münster & Germany, SERP analysis, PAA (People Also Ask) findings, and 10 competitor content gaps.
* **[SEO-CHECKLIST.md](SEO-CHECKLIST.md):**  
  Actionable step-by-step off-site guide for Nicole covering Google Business Profile (Service-Area Business with hidden address), Apple Business Connect, review acquisition DM templates in German, and local Münster link building.
* **[SEO-REPORT.md](SEO-REPORT.md):**  
  Technical crawl report verifying status codes, schema validity, meta tags, and the 30 / 60 / 90-day organic growth roadmap.

---

## 💻 Tech Stack & Dependencies

| Category | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (React 18, App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) with custom brutalist design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Smooth Scroll**| [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) |
| **Hosting & CI/CD**| [Vercel](https://vercel.com/) |

---

## 🛠️ Local Development & Scripts

### Prerequisites
* **Node.js**: `v18.17.0` or higher
* **npm**: `v9.0.0` or higher

### Getting Started

```bash
# Clone the repository
git clone https://github.com/vedantchaubey/nailzbynicci.git
cd nailzbynicci

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

* `npm run dev`: Starts the Next.js development server for `apps/nailzbynicci`.
* `npm run build`: Compiles and statically generates all 56 pages for production.
* `npm run start`: Starts the Next.js production server locally.

---

## ⚖️ Privacy & German Legal Compliance

* **Privacy-First:** Cookie-free architecture. No third-party tracking pixels or Google Analytics cookies; no intrusive consent banner required.
* **Legal Notice (§ 5 TMG):** Accessible at `/impressum` and `/en/imprint`.
* **Privacy Policy (DSGVO):** Accessible at `/datenschutz` and `/en/privacy`.

---

## 🖤 Credits & License

* **Artistry & Direction:** Nicole ([@nailzbynicci](https://instagram.com/nailzbynicci))
* **Location:** Münster, North Rhine-Westphalia, Germany
* **Copyright:** © 2026 nailzbynicci. All rights reserved.
