import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { useLanguage } from '../i18n/LanguageProvider';
import { scrollToSection } from '../lib/scroll';

/** Reading-progress bar and back-to-top button. */
export function ScrollChrome() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const show = useScrolled(900);

  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent rtl:origin-right" />
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            onClick={() => scrollToSection('home')}
            aria-label={t.a11y.backToTop}
            className="glass fixed end-4 bottom-4 z-40 grid size-11 cursor-pointer place-items-center rounded-lg border border-line text-fg shadow-card transition-colors hover:text-accent sm:end-6 sm:bottom-6"
          >
            <ArrowUp size={18} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
