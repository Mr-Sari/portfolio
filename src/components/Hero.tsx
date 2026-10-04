import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { HeroStat } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { asset } from '../lib/assets';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { scrollToSection } from '../lib/scroll';
import { ease } from './ui/motion';

export function Hero() {
  const { t, data, locale } = useLanguage();
  const reduce = useReducedMotion();
  const { personal, statements } = data;
  const ar = locale === 'ar';

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  const jump = (id: 'projects' | 'contact') => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const iconLink =
    'grid size-10 place-items-center rounded-lg text-fg-muted transition-[color,background-color] hover:bg-accent-soft hover:text-accent';

  return (
    <section id="home" tabIndex={-1} aria-labelledby="home-title" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      {/* Chart gridlines fading out, and a soft signal glow */}
      <div aria-hidden className="bg-rules absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <div aria-hidden className="absolute -top-40 end-[-10%] -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}>
          <motion.p variants={item} className="flex items-center gap-2 font-mono text-[0.72rem] text-fg-muted">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
            {t.hero.location}
          </motion.p>

          {/* Person → profession */}
          <h1 id="home-title" className="mt-5">
            <motion.span
              variants={item}
              className={`block text-balance font-serif text-fg ${
                ar ? 'text-[2.7rem] min-[400px]:text-[3rem] sm:text-6xl lg:text-[4.4rem]' : 'text-[3.1rem] leading-[0.95] tracking-[-0.02em] min-[400px]:text-[3.5rem] sm:text-7xl lg:text-[5.4rem]'
              }`}
            >
              {personal.name}
            </motion.span>
            <motion.span
              variants={item}
              lang={ar ? 'en' : 'ar'}
              className={`mt-2 block text-fg-subtle ${ar ? 'font-serif text-xl' : 'text-lg font-medium sm:text-xl'}`}
              style={ar ? undefined : { fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
            >
              <span dir={ar ? 'ltr' : 'rtl'} className="inline-block">
                {personal.altName}
              </span>
            </motion.span>
            <motion.span variants={item} className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[1.6rem] leading-tight font-semibold tracking-tight text-accent sm:text-[2rem]">{personal.title}</span>
              <span className="text-[0.85rem] text-fg-muted sm:text-[0.95rem]">{t.hero.disciplines}</span>
            </motion.span>
          </h1>

          {/* Value */}
          <motion.div variants={item} className="mt-8 max-w-xl border-s-2 border-accent/60 ps-4">
            <p className="font-serif text-[1.6rem] leading-snug text-fg italic sm:text-[1.85rem]">{statements.tagline}</p>
            <p className="mt-2 text-pretty text-base leading-relaxed text-fg-muted sm:text-[1.05rem]">{statements.intro}</p>
          </motion.div>

          {/* Action */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href="#projects"
              onClick={jump('projects')}
              className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-fg shadow-[0_10px_30px_-14px_var(--accent)] transition-[transform,box-shadow] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t.hero.explore}
              <ArrowDown size={16} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={asset(personal.resume)}
              download
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line-strong bg-bg-elevated px-5 text-sm font-medium text-fg transition-[color,border-color,translate] hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
            >
              <Download size={16} aria-hidden />
              {t.hero.downloadResume}
            </a>
            <a
              href="#contact"
              onClick={jump('contact')}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              <Mail size={16} aria-hidden />
              {t.hero.contact}
            </a>
          </motion.div>
          <motion.ul variants={item} className="mt-5 flex gap-1" aria-label={t.a11y.social}>
            <li>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${t.a11y.opensNewTab}`} className={iconLink}>
                <LinkedInIcon size={18} />
              </a>
            </li>
            <li>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${t.a11y.opensNewTab}`} className={iconLink}>
                <GitHubIcon size={18} />
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <HeroPanel />
      </div>
    </section>
  );
}

/** Dashboard-style card of real, sourced figures. */
function HeroPanel() {
  const { t, data } = useLanguage();
  const reduce = useReducedMotion();
  const edu = data.education[0];
  const gpa = edu.gpa;

  return (
    <motion.aside
      aria-label={t.hero.panelTitle}
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.45 }}
      className="card relative overflow-hidden p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
        <h2 className="text-sm font-semibold text-fg">{t.hero.panelTitle}</h2>
        <p className="font-mono text-[0.68rem] text-fg-subtle">{t.hero.panelNote}</p>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden border-b border-line bg-line">
        {data.heroStats.map((stat, i) => (
          <StatTile key={stat.label} stat={stat} delay={0.55 + i * 0.08} />
        ))}
      </dl>

      {gpa && (
        <div className="border-b border-line py-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[0.8rem] text-fg-muted">{t.hero.gpa}</p>
            <p className="font-mono text-sm font-medium text-fg" dir="ltr">
              <span className="text-figure">{gpa.value.toFixed(2)}</span> / {gpa.scale}
            </p>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-bg-sunken" aria-hidden>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: gpa.value / gpa.scale }}
              transition={{ duration: reduce ? 0 : 1.2, ease, delay: 0.9 }}
              className="h-full origin-left rounded-full bg-figure rtl:origin-right"
            />
          </div>
        </div>
      )}

      <div className="pt-4">
        <p className="mb-2 font-mono text-[0.68rem] text-fg-subtle">{t.hero.toolkit}</p>
        <ul className="flex flex-wrap gap-1.5">
          {data.heroStack.map((tool) => (
            <li key={tool} className="rounded-md border border-line bg-bg-sunken/60 px-2 py-1 font-mono text-[0.72rem] text-fg">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}

function StatTile({ stat, delay }: { stat: HeroStat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(stat.value);
      return;
    }
    const controls = animate(0, stat.value, { duration: 1.4, ease, delay, onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, stat.value, delay]);

  return (
    <div ref={ref} className="flex flex-col bg-bg-elevated px-1 py-4 even:ps-4 odd:pe-4">
      <dt className="order-2 mt-1 text-[0.8rem] leading-snug text-fg">{stat.label}</dt>
      <dd className="order-1 font-mono text-[2rem] leading-none font-medium tracking-tight text-figure tabular-nums sm:text-[2.3rem]">
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
        <span aria-hidden dir="ltr" className="inline-block">
          {shown}
          {stat.suffix}
        </span>
      </dd>
      <dd className="order-3 mt-0.5 text-[0.7rem] text-fg-subtle">{stat.source}</dd>
    </div>
  );
}
