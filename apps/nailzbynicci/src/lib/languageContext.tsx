'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Locale = 'de' | 'en'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (deText: string, enText: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'de',
  setLocale: () => {},
  toggleLocale: () => {},
  t: (deText) => deText,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('de')

  useEffect(() => {
    const saved = localStorage.getItem('nailzbynicci_locale') as Locale
    if (saved === 'de' || saved === 'en') {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem('nailzbynicci_locale', l)
    } catch {}
  }

  const toggleLocale = () => {
    setLocale(locale === 'de' ? 'en' : 'de')
  }

  const t = (deText: string, enText: string) => {
    return locale === 'de' ? deText : enText
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
