import { AnimatePresence, motion } from 'framer-motion';
import { House, Menu, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { useLanguage } from '../i18n/LanguageProvider';
import { sectionIds, type SectionId } from '../i18n/strings';
import { scrollToSection } from '../lib/scroll';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { ease } from './ui/motion';

const linkIds = sectionIds.filter((id) => id !== 'home' && id !== 'contact');

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

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <motion.div
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className={`glass pointer-events-auto mx-auto flex h-12 w-full max-w-md items-center justify-between gap-1 rounded-full px-1.5 transition-shadow duration-300 lg:w-fit lg:max-w-none lg:justify-center ${
          scrolled || open ? 'shadow-card' : ''
        }`}
      >
        {/* Mobile: monogram */}
        <a
          href="#top"
          onClick={go('home')}
          className="grid size-9 place-items-center rounded-full bg-fg font-mono text-[0.68rem] font-bold text-bg lg:hidden"
          aria-label={`${data.personal.name} — ${t.nav.home}`}
        >
          {data.personal.initials}
        </a>

        {/* Desktop: centred links */}
        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <NavLink id="home" active={active === 'home'} onClick={go('home')} label={t.nav.home}>
                <House size={15} aria-hidden />
              </NavLink>
            </li>
            {linkIds.map((id) => (
              <li key={id}>
                <NavLink id={id} active={active === id} onClick={go(id)} label={t.nav[id]}>
                  {t.nav[id]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="#contact"
            onClick={go('contact')}
            aria-current={active === 'contact' ? 'true' : undefined}
            className="hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.8rem] font-medium text-accent-fg shadow-[0_6px_20px_-8px_var(--accent)] transition-transform hover:-translate-y-px active:scale-[0.97] lg:inline-flex"
          >
            {t.nav.contact}
            <Send size={13} aria-hidden className="rtl:-scale-x-100" />
          </a>
          <span aria-hidden className="mx-1 hidden h-5 w-px bg-line lg:block" />
          <LanguageToggle />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="grid size-9 cursor-pointer place-items-center rounded-full text-fg transition-colors hover:bg-accent-soft lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
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
            className="glass pointer-events-auto mx-auto mt-2 max-w-md overflow-hidden rounded-3xl shadow-lift lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
              className="grid grid-cols-2 gap-1 p-2"
            >
              {sectionIds.map((id, i) => (
                <motion.li key={id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[0.95rem] font-medium transition-colors ${
                      active === id ? 'bg-accent-soft text-accent' : 'text-fg-muted hover:bg-accent-soft hover:text-fg'
                    }`}
                  >
                    <span className="font-mono text-[0.68rem] text-fg-subtle">{String(i).padStart(2, '0')}</span>
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
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
            className="pointer-events-auto fixed inset-0 -z-10 bg-bg/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ id, active, onClick, label, children }: { id: string; active: boolean; onClick: (e: React.MouseEvent) => void; label: string; children: React.ReactNode }) {
  return (
    <a
      href={id === 'home' ? '#top' : `#${id}`}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      aria-label={id === 'home' ? label : undefined}
      className={`relative isolate flex h-9 items-center rounded-full px-3 text-[0.8rem] font-medium transition-colors duration-200 ${
        active ? 'text-accent' : 'text-fg-muted hover:text-fg'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      )}
      {children}
    </a>
  );
}
