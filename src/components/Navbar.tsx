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
import { ease } from './ui/motion';

const linkIds = sectionIds.filter((id) => id !== 'home');

export function Navbar() {
  const { t, data } = useLanguage();
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled();
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

  // Close the mobile menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full ps-4 pe-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open ? 'glass shadow-card' : 'border border-transparent'
        }`}
      >
        <a
          href="#top"
          onClick={go('home')}
          className="group flex items-center gap-2.5 rounded-full font-semibold tracking-tight text-fg"
          aria-label={`${data.personal.name} — ${t.nav.home}`}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-[0.72rem] font-bold text-bg transition-transform duration-300 group-hover:rotate-[-6deg]">
            {data.personal.initials}
          </span>
          <span className="hidden text-sm sm:inline">{data.personal.shortName}</span>
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {linkIds.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative isolate block rounded-full px-2.5 py-2 text-[0.8rem] font-medium xl:px-3 transition-colors duration-200 ${
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent/20"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {t.nav[id]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={asset(data.personal.resume)}
            download="Sari-Owaid-Alsulami-Resume.pdf"
            className="ms-1 hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[0.8rem] font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            <Download size={14} aria-hidden />
            {t.cv}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-fg transition-colors hover:bg-accent-soft lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.a11y.mainNav}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease }}
            className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl shadow-lift lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
              className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-4"
            >
              {linkIds.map((id, i) => (
                <motion.li key={id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[0.95rem] font-medium transition-colors ${
                      active === id ? 'bg-accent-soft text-fg' : 'text-fg-muted hover:bg-accent-soft hover:text-fg'
                    }`}
                  >
                    <span lang="en" className="font-mono text-[0.7rem] text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="border-t border-line p-2 sm:hidden">
              <a
                href={asset(data.personal.resume)}
                download="Sari-Owaid-Alsulami-Resume.pdf"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-accent text-[0.95rem] font-medium text-accent-fg"
              >
                <Download size={16} aria-hidden />
                {t.hero.downloadResume}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-bg/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
