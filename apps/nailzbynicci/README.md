# Nailz by Nicci — Haute Nail Architecture & Sanctuary

Award-level luxury editorial web platform for master nail artisan Nicole ([@nailzbynicci](https://www.instagram.com/nailzbynicci)), built with quiet-luxury aesthetics rivaling Chanel Beauté, Aesop, and Rhode Skin.

---

## Architecture & Technology Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with custom design tokens (`--color-primary-base`, `--color-primary-cream`, `--color-secondary-bordeaux`, `--color-accent-amber`, `--color-accent-chrome`)
- **Typography:** Cormorant Garamond (Editorial Serif headlines) + Plus Jakarta Sans (Clean humanistic grotesque body)
- **Smooth Scrolling:** Custom Lenis smooth scrolling engine with `prefers-reduced-motion` compliance
- **Motion & Interactions:** Custom cubic-bezier easing `cubic-bezier(0.16, 1, 0.3, 1)`, magnetic buttons, gold dot follower cursor, and 3% SVG film-grain overlay
- **Data Architecture:** Fully typed data architecture in `/data` (`gallery.ts`, `services.ts`, `testimonials.ts`, `brand.ts`, `faq.ts`)

---

## Pages & Key Features

1. **HOME (`/`)**
   - Full-screen editorial monograph hero with oversized serif typography, subline, and interactive featured work slideshow.
   - Clinical Philosophy: 3 pillars of Russian dry e-file prep, biocompatible BIAB apex alignment, and bespoke wearable sculpture.
   - Curated Archive Grid with hover zoom, technique tags, and fullscreen lightbox modal.
   - Signature Sets: 4 iconic sets with transparent starting investments.
   - Atelier Teaser: Nicole's intimate portrait and philosophy quote.
   - Verified Client Reviews: 4-to-5 week retention testimonials carousel.
   - Social Diary: Instagram feed grid linking directly to `@nailzbynicci`.
   - Concierge Booking Band: High-conversion final CTA with deposit transparency.

2. **GALLERY ARCHIVE (`/gallery`)**
   - Faceted category filtering: *All Works, Glazed & Chrome, Sculpted French, Botanical & 3D, Minimalist Natural, Bold Statement*.
   - Filterable by nail shape (*Almond, Square, Coffin, Stiletto*) and length (*Short, Medium, Long*).
   - Fullscreen Lightbox Modal with instant "Book This Specific Design" deep link.

3. **SERVICES & PRICING (`/services`)**
   - Foundation Menu: Signature BIAB Manicure, Gel-X Extensions, Safe Removal & Restoration.
   - Nail Artistry Tiers: Tier I (Minimalist Chic), Tier II (Elevated Detail), Tier III (Bespoke Masterpiece) with itemized technique examples.
   - **Interactive Visual Price Estimator:** Clients dynamically select foundation + art tier + removal to see an instant investment total.
   - Post-Appointment Care: The 4-Week Preservation Ritual guide.

4. **THE ATELIER (`/about`)**
   - Nicole’s story: From high-volume salon frustration to bespoke private studio excellence.
   - Clinical Sanitation Protocol: Medical-grade steam autoclave, single-use disposables, and SheMax dust extraction.

5. **CONCIERGE BOOKING (`/booking`)**
   - 4-Step Frictionless Booking Wizard:
     - Step 1: Foundation Treatment & Art Tier selection.
     - Step 2: Date & Available Slot selection.
     - Step 3: Client Details & Inspiration URL / design notes.
     - Step 4: Summary review and studio etiquette agreement ($35 deposit, 48-hr cancellation window, no foreign fills).
   - Fallback channels: Direct Instagram DM and WhatsApp links.

6. **STUDIO & FAQ (`/contact`)**
   - Sanctuary address & directions note.
   - Operating hours (Tue–Sat).
   - Stylized architectural map representation.
   - Expandable FAQ accordion addressing Russian prep, BIAB, aftercare, and etiquette.

7. **GIFT CARDS (`/gift-cards`)**
   - Visual luxury digital voucher preview with real-time price updates and personalized note input.

8. **BRANDED 404 (`/_not-found`)**
   - "Lost in the Archive" editorial recovery page.

---

## Local Development & Setup

```bash
# Navigate to the project folder
cd apps/nailzbynicci

# Run development server on port 3002
npm run dev

# Or build and test production static export
npm run build
npm run start
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## Deployment to Vercel

1. Push this repository to GitHub / GitLab.
2. In the Vercel Dashboard, click **New Project** and select the repository.
3. In **Root Directory**, select `apps/nailzbynicci`.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**. Zero environment variables required for basic launch!

---

## Replacing Placeholders with Client Originals

1. **High-Res Photos:** Place original camera photos into `/public/images/source/`. Run the image processing script to generate WebP assets in `/public/images/gallery/` as `nicci-001.webp` through `nicci-012.webp`.
2. **Nicole's Portrait:** Replace `/public/images/brand/portrait.svg` with her actual photo (`portrait.webp` or `portrait.jpg`).
3. **Studio Address:** Update `city` and `location` in `/data/brand.ts`.
4. **Final Menu Prices:** Adjust exact dollar amounts in `/data/services.ts`.
5. **Booking Platform:** Insert her booking URL (Square/Vagaro/Fresha) in `bookingUrl` in `/data/brand.ts`.
