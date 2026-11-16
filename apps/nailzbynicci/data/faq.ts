export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'booking' | 'technique' | 'care' | 'policies'
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'technique',
    question: 'What is a Dry Russian E-File Manicure, and how is it different?',
    answer: 'A Russian manicure is a specialized dry technique utilizing microscopic diamond e-file bits to gently exfoliate dead cuticle tissue and clean the nail pocket without water soaking. Because water swells the nail plate (causing subsequent gel lifting upon dehydration), dry prep allows gel to be laid flush against the proximal fold, granting you an additional 7–10 days of grow-out grace.',
  },
  {
    id: 'faq-2',
    category: 'technique',
    question: 'What is BIAB (Builder in a Bottle) structured gel?',
    answer: 'BIAB is a premium, flexible European builder gel formulated to fortify natural nails. Rather than dipping powder or harsh acrylics, structured gel provides an anatomically balanced apex that absorbs daily shock, protecting natural nails while encouraging healthy, breakage-free growth.',
  },
  {
    id: 'faq-3',
    category: 'policies',
    question: 'Why do you not perform foreign fills from other salons?',
    answer: 'To ensure structural integrity, chemical compatibility, and natural nail health, I do not fill over work from outside establishments. Unfamiliar products may lift or conceal plate trauma. New clients must arrive with bare nails or schedule a Safe Removal alongside their new set.',
  },
  {
    id: 'faq-4',
    category: 'booking',
    question: 'How do I know which Art Tier to choose when booking?',
    answer: 'Tier I covers subtle minimalism (single-shade chrome glaze, micro-French, minimal dots). Tier II includes multi-dimensional art across all 10 fingers (blooming aura, tortoiseshell, chrome linework). Tier III is reserved for multi-technique masterpieces, 3D gel sculpting, and encapsulation. If unsure, book Tier II and send an inspiration image during checkout!',
  },
  {
    id: 'faq-5',
    category: 'care',
    question: 'How should I care for my set between appointments?',
    answer: 'Hydration is the foundation of longevity. Apply high-grade jojoba cuticle oil twice daily to keep the gel flexible and the e-file perimeter sealed. Wear gloves when using household cleaning chemicals, and never use your nails as tools to pry or scrape.',
  },
  {
    id: 'faq-6',
    category: 'policies',
    question: 'What is the deposit and cancellation policy?',
    answer: 'A $35 non-refundable deposit is required at booking, which is credited toward your service total. We require at least 48 hours notice for cancellations or rescheduling. Cancellations within 48 hours forfeit the deposit; cancellations within 24 hours or no-shows are charged 100% of the scheduled service.',
  },
]
