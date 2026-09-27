import { useLanguage } from '../i18n/LanguageProvider';

export function LanguageToggle() {
  const { t, toggleLocale, locale } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.a11y.language}
      title={t.a11y.language}
      lang={locale === 'en' ? 'ar' : 'en'}
      className="grid size-10 cursor-pointer place-items-center rounded-full font-mono text-[0.8rem] font-semibold text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg"
    >
      {t.langToggle}
    </button>
  );
}
