export interface FAQItem {
  id: string
  category: 'booking' | 'technique' | 'care' | 'policies'
  question: {
    de: string
    en: string
  }
  answer: {
    de: string
    en: string
  }
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'technique',
    question: {
      de: 'Was ist Aprés Gel-X und warum ist es gesünder als Acryl?',
      en: 'What is Aprés Gel-X and why is it healthier than acrylic?',
    },
    answer: {
      de: 'Aprés Gel-X ist das weltweit erste 100% Soft-Gel Verlängerungssystem. Im Gegensatz zu starrem Acryl oder Plastiktips bestehen die Tips aus reinem Gel. Sie werden mit Soft-Gel auf deinem Naturnagel gehärtet, federn Stöße elastisch ab und lassen sich ohne Fräsen in 15 Minuten schonend mit Aceton ablösen. Null Geruch, keine Dämpfe, keine Nagelschäden.',
      en: 'Aprés Gel-X is the world’s first 100% soft gel extension system. Unlike rigid acrylic or ABS plastic tips, Gel-X tips are crafted from formulated soft gel. They cure with extend gel, absorb everyday shocks, and soak off gently in 15 minutes with zero drilling down to the natural nail. Zero odor, no fumes, zero nail trauma.',
    },
  },
  {
    id: 'faq-2',
    category: 'technique',
    question: {
      de: 'Wie lange hält eine Neumodellage bei nailzbynicci?',
      en: 'How long does a full set by nailzbynicci last?',
    },
    answer: {
      de: 'Bei sachgemäßer Pflege hält ein Set garantiert 4 bis 6 Wochen ohne Liftings. Dank meiner gründlichen russischen E-File Trockenmaniküre wächst der Übergang zur Nagelhaut extrem sauber und flach heraus.',
      en: 'With proper aftercare, a full set reliably lasts 4 to 6 weeks with zero liftings. Thanks to meticulous dry Russian e-file prep, the grow-out line remains smooth, flat, and seamless.',
    },
  },
  {
    id: 'faq-3',
    category: 'policies',
    question: {
      de: 'Füllst du Altmodellagen aus anderen Studios auf (Fremdarbeit)?',
      en: 'Do you fill foreign sets from other salons?',
    },
    answer: {
      de: 'Nein, ausnahmslos nicht. Um die Gesundheit deiner Naturnägel und die Haltbarkeit meiner Kunst zu garantieren, fülle ich kein Fremdmaterial auf. Bitte erscheine mit sauberen Naturnägeln oder buche vorab eine sichere Entfernung bei mir.',
      en: 'No, strictly no foreign fills. To guarantee natural nail health and product chemistry, I do not fill over outside acrylics or gels. Please arrive with bare natural nails or book a safe removal.',
    },
  },
  {
    id: 'faq-4',
    category: 'booking',
    question: {
      de: 'Wie buche ich einen Termin bei Nicole in Münster?',
      en: 'How do I book an appointment with Nicole in Münster?',
    },
    answer: {
      de: 'Ausschließlich über Instagram DM (@nailzbynicci). Sende mir einfach dein Wunsch-Set, Inspo-Fotos, gewünschte Länge und mögliche Tage. Nach Bestätigung reservierst du deinen Slot mit einer Anzahlung von 20 € via PayPal.',
      en: 'Strictly via Instagram DM (@nailzbynicci). Send your preferred design, inspo photos, length, and available days. Upon agreeing on a date, secure your slot with a €20 PayPal deposit.',
    },
  },
  {
    id: 'faq-5',
    category: 'policies',
    question: {
      de: 'Wie lautet die Anzahlungs- und Stornierungsregelung?',
      en: 'What is the deposit and cancellation policy?',
    },
    answer: {
      de: 'Zur festen Reservierung ist eine Anzahlung von 20 € via PayPal erforderlich, die am Termintag 1:1 mit deinem Endpreis verrechnet wird. Verschiebungen mit mehr als 48 Stunden Vorlauf werden kostenfrei übertragen; Absagen unter 48 Stunden verfallen.',
      en: 'A €20 PayPal deposit is required to confirm your reservation, which is credited 100% toward your final bill. Rescheduling with >48h notice transfers your deposit; cancellations under 48h forfeit it.',
    },
  },
  {
    id: 'faq-6',
    category: 'booking',
    question: {
      de: 'Wie funktionieren die Custom Press-On Sets für ganz Deutschland?',
      en: 'How do custom press-on sets work across Germany?',
    },
    answer: {
      de: 'Du misst deine Nagelbreiten zu Hause in Millimetern aus und sendest mir deine Maße sowie Designwünsche per Instagram DM. Ich fertige dein Set aus 100% Aprés Gel-X handbemalt an und versende es per versichertem DHL-Paket inklusive vollständigem Prep-Kit.',
      en: 'Measure your nail widths in millimeters at home and message me your dimensions and design idea via Instagram DM. I hand-paint your custom set using 100% Aprés Gel-X tips and ship it nationwide with a complete prep kit.',
    },
  },
  {
    id: 'faq-7',
    category: 'care',
    question: {
      de: 'Wie pflege ich meine Nägel nach dem Termin richtig?',
      en: 'How do I care for my nails after the appointment?',
    },
    answer: {
      de: 'Vermeide in den ersten 24 Stunden langes Baden oder Saunagänge. Massiere täglich hochwertiges Jojoba-Nagelöl in die Nagelhaut ein und nutze deine Nägel niemals als Hebelwerkzeuge für Dosen oder Kartons.',
      en: 'Avoid scalding baths or saunas for the first 24 hours. Massage jojoba cuticle oil into sidewalls daily and treat your nails like wearable jewels, never as tools to pry cans or boxes.',
    },
  },
]
