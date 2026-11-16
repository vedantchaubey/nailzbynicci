// apps/frontend/src/app/fonts.ts
import { Archivo, Inter_Tight } from 'next/font/google';

export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});
