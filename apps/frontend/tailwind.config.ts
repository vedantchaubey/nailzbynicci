// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          raised: 'var(--bg-raised)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        text: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        volt: {
          DEFAULT: '#C8FF00',
          dark: '#B0E000',
        },
        pending: '#FFB020',
        risk: '#FF4D3D',
        info: '#4DA3FF',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'var(--font-inter-tight)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        input: '12px',
        sheet: '24px',
        media: '4px',
      },
      transitionTimingFunction: {
        nike: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      transitionDuration: {
        press: '120ms',
        state: '200ms',
        enter: '350ms',
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
