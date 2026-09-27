import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { portfolioData } from '../data/portfolioData';
import { portfolioDataAr } from '../data/portfolioData.ar';
import type { PortfolioData } from '../data/types';
import { strings, type Locale, type Strings } from './strings';

const STORAGE_KEY = 'portfolio-locale';

export const DEFAULT_LOCALE: Locale = 'ar';

function getPortfolioData(locale: Locale): PortfolioData {
  return locale === 'ar' ? portfolioDataAr : portfolioData;
}

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: Strings;
  data: PortfolioData;
  toggleLocale: () => void;
  formatDate: (ym: string | null) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readStoredLocale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage unavailable */
    }
  }, [locale, dir]);

  const toggleLocale = useCallback(() => setLocale((l) => (l === 'en' ? 'ar' : 'en')), []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = strings[locale];
    return {
      locale,
      dir,
      t,
      data: getPortfolioData(locale),
      toggleLocale,
      formatDate: (ym) => {
        if (!ym) return t.experience.present;
        const [y, m] = ym.split('-').map(Number);
        return `${t.dates.months[m - 1]} ${y}`;
      },
    };
  }, [locale, dir, toggleLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
