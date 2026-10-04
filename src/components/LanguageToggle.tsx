import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

/** Visible language switch; its label is the language you switch *to*. */
export function LanguageToggle() {
  const { t, toggleLocale, locale } = useLanguage();
  const target = locale === 'en' ? 'ar' : 'en';
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.a11y.language}
      title={t.a11y.language}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-surface px-2.5 text-[0.8rem] font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Languages size={15} aria-hidden />
      <span lang={target} className="hidden sm:inline">
        {t.langToggle}
      </span>
      <span lang={target} className="sm:hidden">
        {t.langToggleShort}
      </span>
    </button>
  );
}
