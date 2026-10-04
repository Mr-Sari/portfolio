import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { asset } from '../lib/assets';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { scrollToSection } from '../lib/scroll';
import { Button, LinkButton } from './ui/Button';
import { ease } from './ui/motion';

/** Tools shown in the impact panel — the analytics core only. */
const toolkit = ['Power BI', 'DAX', 'Power Query', 'Excel', 'SQL', 'Python'];

/**
 * Hierarchy: name → profession → value → action. The name is the largest
 * element on the page; "Data Analyst" is the strongest title beneath it.
 */
export function Hero() {
  const { t, data, locale } = useLanguage();
  const reduce = useReducedMotion();
  const { personal } = data;
  const ar = locale === 'ar';

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  const social =
    'grid size-10 place-items-center rounded-full text-fg-muted transition-[color,background-color] hover:bg-accent-soft hover:text-accent';

  return (
    <section id="home" tabIndex={-1} aria-labelledby="home-title" className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]" />
      </div>

      <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}>
          <motion.p variants={item} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-fg-muted backdrop-blur">
            <MapPin size={12} aria-hidden className="text-accent" />
            {personal.location}
          </motion.p>

          <h1 id="home-title" className="mt-5">
            {/* Person */}
            <motion.span
              variants={item}
              className={`block font-bold text-fg ${
                ar
                  ? 'whitespace-nowrap text-[clamp(1.85rem,10vw,2.9rem)] leading-[1.3] sm:text-6xl lg:text-[4.5rem]'
                  : 'text-[2.7rem] leading-[1.02] tracking-[-0.045em] min-[400px]:text-[3.1rem] sm:text-[4rem] lg:text-[5rem]'
              }`}
            >
              {personal.name}
            </motion.span>
            <motion.span variants={item} className="mt-3 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-figure" />
              <span
                lang={ar ? 'en' : 'ar'}
                dir={ar ? 'ltr' : 'rtl'}
                className="text-base font-medium text-fg-subtle sm:text-lg"
                style={ar ? undefined : { fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
              >
                {personal.altName}
              </span>
            </motion.span>
            {/* Profession */}
            <motion.span variants={item} className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-accent sm:text-[2.1rem]">{personal.title}</span>
              <span className="text-sm text-fg-muted">{t.hero.disciplines}</span>
            </motion.span>
          </h1>

          {/* Value */}
          <motion.p variants={item} className="mt-5 text-xl font-medium tracking-[-0.015em] text-fg sm:text-2xl">
            {personal.headline}
          </motion.p>
          <motion.p variants={item} className="mt-2 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-fg-muted sm:text-base">
            {personal.summary}
          </motion.p>

          {/* Action */}
          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8">
            <Button
              onClick={() => scrollToSection('projects')}
              icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />}
            >
              {t.hero.viewProjects}
            </Button>
            <LinkButton
              variant="secondary"
              href={asset(personal.resume)}
              download="Sari-Owaid-Alsulami-Resume.pdf"
              icon={<Download size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden />}
            >
              {t.hero.downloadResume}
            </LinkButton>
            <Button variant="ghost" onClick={() => scrollToSection('contact')} icon={<Send size={15} aria-hidden className="rtl:-scale-x-100" />}>
              {t.hero.contact}
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-5 flex gap-1" aria-label={t.a11y.social}>
            <li>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${t.a11y.opensNewTab}`} className={social}>
                <LinkedInIcon size={18} />
              </a>
            </li>
            <li>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${t.a11y.opensNewTab}`} className={social}>
                <GitHubIcon size={18} />
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <ImpactPanel />
      </div>
    </section>
  );
}

/** Dashboard-style card of real, sourced figures — what a Data Analyst ships. */
function ImpactPanel() {
  const { t, data } = useLanguage();
  const reduce = useReducedMotion();
  const gpa = data.education[0].gpa;

  return (
    <motion.aside
      aria-label={t.hero.panelTitle}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease, delay: 0.35 }}
      className="card overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h2 className="text-sm font-semibold text-fg">{t.hero.panelTitle}</h2>
        <p className="font-mono text-[0.68rem] text-fg-subtle">{t.hero.panelNote}</p>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-line">
        {data.heroStats.map((s) => (
          <div key={s.label} className="flex flex-col bg-bg-elevated px-5 py-4">
            <dt className="order-2 mt-1.5 text-[0.82rem] leading-snug font-medium text-fg">{s.label}</dt>
            <dd className="order-1 font-mono text-[2rem] leading-none font-semibold tracking-tight text-figure">
              <span dir="ltr" className="inline-block">
                {s.value}
              </span>
            </dd>
            <dd className="order-3 mt-0.5 text-[0.7rem] text-fg-subtle">{s.source}</dd>
          </div>
        ))}
      </dl>
      {gpa && (
        <div className="border-t border-line px-5 py-4">
          <div className="flex items-baseline justify-between gap-3 text-[0.8rem]">
            <span className="text-fg-muted">{t.hero.gpa}</span>
            <span dir="ltr" className="font-mono font-medium text-fg">
              <span className="text-figure">{gpa.value.toFixed(2)}</span> / {gpa.scale}
            </span>
          </div>
          <div aria-hidden className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: gpa.value / gpa.scale }}
              transition={{ duration: reduce ? 0 : 1.1, ease, delay: 0.8 }}
              className="h-full origin-left rounded-full bg-figure rtl:origin-right"
            />
          </div>
        </div>
      )}
      <ul className="flex flex-wrap gap-1.5 border-t border-line px-5 py-4" aria-label={t.a11y.coreTech}>
        {toolkit.map((tool) => (
          <li key={tool} className="rounded-md border border-line px-2 py-1 font-mono text-[0.7rem] text-fg-muted">
            {tool}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
