import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { useLanguage } from '../i18n/LanguageProvider';
import { sectionIds, type SectionId } from '../i18n/strings';
import { asset } from '../lib/assets';
import { scrollToSection } from '../lib/scroll';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { BrandMark } from './ui/BrandMark';
import { ease } from './ui/motion';

const linkIds = sectionIds.filter((id) => id !== 'home');
const indexOf = (id: SectionId) => String(sectionIds.indexOf(id)).padStart(2, '0');

export function Navbar() {
  const { t, data } = useLanguage();
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled(12);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={`border-b transition-[background-color,border-color] duration-300 ${
          scrolled || open ? 'glass border-line' : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <a href="#top" onClick={go('home')} className="group flex min-w-0 items-center gap-2.5" aria-label={`${data.personal.name} — ${t.nav.home}`}>
            <BrandMark className="size-8 shrink-0" />
            <span className="truncate text-[0.95rem] font-semibold tracking-tight text-fg lg:hidden xl:inline">{data.personal.shortName}</span>
          </a>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center">
              {linkIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`relative flex h-16 items-center gap-1.5 px-2.5 text-[0.84rem] font-medium xl:px-3 transition-colors duration-200 ${
                      active === id ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <span aria-hidden lang="en" className={`hidden font-mono text-[0.65rem] xl:inline ${active === id ? 'text-accent' : 'text-fg-subtle'}`}>
                      {indexOf(id)}
                    </span>
                    {t.nav[id]}
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-accent xl:inset-x-3"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={asset(data.personal.resume)}
              download
              className="ms-1 hidden h-9 items-center gap-1.5 rounded-lg bg-fg px-3.5 text-[0.8rem] font-medium text-bg transition-[transform,opacity] hover:opacity-90 active:scale-[0.97] sm:inline-flex"
            >
              <Download size={14} aria-hidden />
              {t.resume}
            </a>
            <button
              ref={menuButton}
              type="button"
              className="grid size-10 cursor-pointer place-items-center rounded-lg text-fg transition-colors hover:bg-accent-soft lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile: full-height sheet under the bar */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.a11y.mainNav}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-bg lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col py-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                className="divide-y divide-line border-y border-line"
              >
                {linkIds.map((id) => (
                  <motion.li key={id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }}>
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      aria-current={active === id ? 'true' : undefined}
                      className={`flex min-h-14 items-baseline gap-4 py-3 transition-colors ${active === id ? 'text-accent' : 'text-fg hover:text-accent'}`}
                    >
                      <span aria-hidden lang="en" className="w-6 font-mono text-xs text-fg-subtle">
                        {indexOf(id)}
                      </span>
                      <span className="font-serif text-[1.9rem] leading-tight">{t.nav[id]}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <a
                href={asset(data.personal.resume)}
                download
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-medium text-bg"
              >
                <Download size={16} aria-hidden />
                {t.hero.downloadResume}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
