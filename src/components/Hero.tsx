import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { asset } from '../lib/assets';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { scrollToSection } from '../lib/scroll';
import { Button, LinkButton } from './ui/Button';
import { ease } from './ui/motion';

export function Hero() {
  const { t, data, locale } = useLanguage();
  const reduce = useReducedMotion();
  const { personal, statements } = data;
  const section = useRef<HTMLElement>(null);
  // Content drifts up and fades slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
  };

  const parts = personal.name.split(' ');
  const first = parts.shift();

  return (
    <section
      ref={section}
      id="home"
      tabIndex={-1}
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-24 pb-14 sm:min-h-[92svh] sm:pt-28"
    >
      <HeroBackdrop />
      <motion.div style={{ y, opacity: fade }} className="container-page">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="mb-5 rounded-full border border-line bg-surface px-3.5 py-1 font-mono text-[0.66rem] tracking-[0.18em] text-accent uppercase backdrop-blur sm:text-[0.7rem]"
          >
            {t.hero.role}
          </motion.p>

          <motion.h1
            id="home-title"
            variants={item}
            className={`font-semibold text-fg ${
              locale === 'ar'
                ? 'text-[2.4rem] leading-[1.3] min-[390px]:text-[2.7rem] sm:text-6xl lg:text-7xl'
                : 'text-[2.5rem] leading-[1.02] tracking-[-0.045em] min-[390px]:text-[2.8rem] sm:text-6xl lg:text-[5.2rem]'
            }`}
          >
            <span className="text-gradient">{first}</span> {parts.join(' ')}
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-balance text-xl font-medium tracking-[-0.02em] text-fg sm:mt-5 sm:text-3xl">
            {statements.hero}
          </motion.p>
          <motion.p variants={item} className="mt-2 max-w-xl text-balance text-[0.95rem] text-fg-muted sm:text-lg">
            {statements.heroSub}
          </motion.p>

          <motion.div variants={item} className="mt-5" dir="ltr">
            <TypingStack items={data.heroStack} />
          </motion.div>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
            <Button
              onClick={() => scrollToSection('projects')}
              icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />}
            >
              {t.hero.explore}
            </Button>
            <LinkButton
              variant="secondary"
              href={asset(personal.resume)}
              download="Sari-Owaid-Alsulami-Resume.pdf"
              icon={<Download size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden />}
            >
              {t.hero.downloadResume}
            </LinkButton>
          </motion.div>

          <motion.ul variants={item} aria-label={t.a11y.social} className="mt-6 flex items-center gap-2">
            {[
              { href: personal.linkedin, label: 'LinkedIn', icon: <LinkedInIcon size={15} /> },
              { href: personal.github, label: 'GitHub', icon: <GitHubIcon size={15} /> },
              { href: `mailto:${personal.email}`, label: t.contact.email, icon: <Mail size={15} aria-hidden /> },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.href.startsWith('http') ? `${s.label} ${t.a11y.opensNewTab}` : s.label}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface text-fg-muted backdrop-blur transition-[color,border-color,translate] hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 font-mono text-[0.64rem] tracking-[0.2em] text-fg-subtle uppercase transition-colors hover:text-fg sm:flex"
      >
        {t.hero.scroll}
        <motion.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={14} aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  );
}

/** Terminal line that types each stack in turn; static under reduced motion. */
function TypingStack({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? items[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = items[index];
    const done = !deleting && text === full;
    const cleared = deleting && text === '';
    const delay = done ? 1600 : cleared ? 250 : deleting ? 35 : 70;
    const timer = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % items.length);
      } else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, items, reduce]);

  return (
    <p className="font-mono text-[0.8rem] text-fg-muted sm:text-sm" aria-label={items.join(', ')}>
      <span aria-hidden>
        <span className="text-accent">$</span> {text}
        <span className="animate-caret ms-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.18em] bg-accent" />
      </span>
    </p>
  );
}

function HeroBackdrop() {
  const reduce = useReducedMotion();
  // A few faint analytics glyphs scattered in the background (static, no looping motion).
  const glyphs = [
    { t: 'SUM()', c: 'top-[22%] start-[8%]' },
    { t: 'SELECT', c: 'top-[64%] start-[6%]' },
    { t: 'KPI', c: 'top-[18%] end-[10%]' },
    { t: 'Σ', c: 'top-[70%] end-[9%]' },
    { t: 'AVG()', c: 'top-[44%] end-[4%]' },
    { t: '{ }', c: 'top-[40%] start-[3%]' },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid mask-fade absolute inset-0" />
      <div className="absolute -top-48 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(56_189_248/0.10),transparent)]" />
      {glyphs.map((g, i) => (
        <motion.span
          key={g.t}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.8 + i * 0.15, duration: 1.2 }}
          className={`absolute hidden font-mono text-sm text-fg-subtle/40 md:block ${g.c}`}
          dir="ltr"
        >
          {g.t}
        </motion.span>
      ))}
    </div>
  );
}
