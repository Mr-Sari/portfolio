import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { scrollToSection } from '../lib/scroll';

/** One-line footer: attribution · back to top · copyright. */
export function Footer() {
  const { t, data } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center gap-3 py-5 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <p className="order-3 font-mono text-[0.68rem] sm:order-1">{t.footer.built}</p>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="order-1 inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 text-fg-muted transition-colors hover:border-accent/50 hover:text-accent sm:order-2"
        >
          <ArrowUp size={13} aria-hidden />
          {t.footer.top}
        </button>
        <p className="order-2 sm:order-3">
          © {year} {data.personal.name} · {data.personal.title}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
