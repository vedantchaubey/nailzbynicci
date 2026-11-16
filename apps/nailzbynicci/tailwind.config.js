const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, 'data/**/*.{js,ts}'),
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
    './apps/nailzbynicci/src/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/nailzbynicci/data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E0D10',
        fog: '#2A2B30',
        'fog-light': '#9A9CA3',
        blossom: '#E9B7C6',
        magenta: '#FF007A',
        concrete: '#EFEFEF',
        'concrete-dark': '#E5E5E5',
        emerald: '#1F5A45',
        blood: '#7A1020',
        chrome: '#C4C8CE',
        'story-white': '#FFFFFF',
        'story-ink': '#0E0D10',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Alex Brush', 'cursive'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-sm': ['44px', { lineHeight: '1.10', letterSpacing: '-0.02em' }],
        h2: ['48px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2-sm': ['32px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        lead: ['18px', { lineHeight: '1.60' }],
        'lead-sm': ['16px', { lineHeight: '1.55' }],
        body: ['15px', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'body-sm': ['14px', { lineHeight: '1.60', letterSpacing: '0.01em' }],
        label: ['11px', { lineHeight: '1.20', letterSpacing: '0.18em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
        '36': '9rem',
        '112': '7rem',
        section: '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        site: '1280px',
      },
      borderRadius: {
        image: '16px',
        pill: '100px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        micro: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        450: '450ms',
        650: '650ms',
        750: '750ms',
        1200: '1200ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'petal-fall': {
          '0%': { transform: 'translate3d(0, -10%, 0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.7' },
          '85%': { opacity: '0.6' },
          '100%': { transform: 'translate3d(50px, 110vh, 0) rotate(360deg)', opacity: '0' },
        },
        'fog-drift': {
          '0%': { transform: 'translate3d(-5%, 0, 0)' },
          '50%': { transform: 'translate3d(5%, 0, 0)' },
          '100%': { transform: 'translate3d(-5%, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.75s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fade-in 0.75s cubic-bezier(0.16,1,0.3,1) forwards',
        'petal-fall': 'petal-fall 10s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
        'fog-drift': 'fog-drift 24s ease-in-out infinite',
      },
      backgroundImage: {
        grain: "url('/images/grain.png')",
      },
    },
  },
  plugins: [],
}
