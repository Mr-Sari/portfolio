import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { scrollToSection } from '../lib/scroll';
import { BrandMark } from './ui/BrandMark';

export function Footer() {
  const { t, data } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-sunken/40">
      <div className="container-page py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark className="size-9 shrink-0" />
            <div>
              <p className="font-semibold text-fg">{data.personal.name}</p>
              <p className="font-serif text-lg text-fg-muted italic">{data.statements.signature}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="inline-flex min-h-10 w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-line-strong px-3.5 text-[0.8rem] text-fg-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp size={14} aria-hidden />
            {t.footer.top}
          </button>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-xs text-fg-subtle">
          © {year} {data.personal.name} · {data.personal.title}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
