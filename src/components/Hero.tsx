import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { asset } from '../lib/assets';
import { TechIcon } from '../lib/icons';
import { scrollToSection } from '../lib/scroll';
import { Button, LinkButton } from './ui/Button';
import { ease } from './ui/motion';

const heroSkills = ['Python', 'SQL', 'Power BI', 'LLMs', 'RAG Systems', 'Computer Vision', 'DuckDB', 'Docker'];

export function Hero() {
  const { t, data } = useLanguage();
  const reduce = useReducedMotion();
  const { personal } = data;
  const highlights = heroSkills
    .map((name) => data.skills.find((s) => s.name === name))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22, filter: reduce ? 'none' : 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  };

  const nameParts = personal.name.split(' ');
  const last = nameParts.pop();

  return (
    <section id="home" tabIndex={-1} aria-labelledby="home-title" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:min-h-[100svh] lg:pt-40">
      <HeroBackdrop />
      <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}>
          <motion.div variants={item} className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 ps-1 pe-3 text-xs text-fg-muted backdrop-blur">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.68rem] font-medium text-accent">{personal.title}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden />
              {personal.location}
            </span>
          </motion.div>

          <motion.h1 id="home-title" variants={item} className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg min-[400px]:text-5xl sm:text-6xl lg:text-[4.6rem]">
            <span className="block">{nameParts.join(' ')}</span>
            <span className="block text-fg-subtle">{last}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-xl font-medium tracking-[-0.015em] text-fg sm:text-2xl">
            {personal.headline}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted sm:text-[1.05rem]">
            {personal.summary}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button onClick={() => scrollToSection('projects')} icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />}>
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
            <Button variant="ghost" onClick={() => scrollToSection('contact')} icon={<Send size={15} aria-hidden />}>
              {t.hero.contact}
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-2" aria-label="Core technologies">
            {highlights.map((s) => (
              <li key={s.name} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-fg-muted backdrop-blur transition-colors hover:border-accent/40 hover:text-fg">
                <TechIcon name={s.icon} size={13} />
                {s.name}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <ProfileCard />
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-fg-subtle uppercase transition-colors hover:text-fg lg:flex"
      >
        {t.hero.scroll}
        <motion.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={14} aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid mask-fade absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-80" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(56_189_248/0.10),transparent)]" />
    </div>
  );
}

/** A code-editor style card that renders the profile straight from the data object. */
function ProfileCard() {
  const { data } = useLanguage();
  const reduce = useReducedMotion();
  const { personal, experience, education } = data;
  const current = experience.find((e) => e.end === null) ?? experience[0];
  const degree = education[0];

  const lines: { k: string; v: string | string[] }[] = [
    { k: 'name', v: personal.shortName },
    { k: 'role', v: personal.title },
    { k: 'current', v: `${current.role} @ ${current.company}` },
    { k: 'focus', v: ['Machine Learning', 'NLP', 'LLMs', 'RAG'] },
    { k: 'stack', v: ['Python', 'SQL', 'Power BI', 'Docker'] },
    { k: 'education', v: `${degree.degree}, ${degree.institution}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 30, rotate: reduce ? 0 : 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, ease, delay: 0.45 }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      dir="ltr"
      aria-hidden
    >
      <div className="absolute -inset-px -z-10 rounded-[1.4rem] bg-gradient-to-b from-accent/30 via-transparent to-transparent opacity-60 blur-[1px]" />
      <div className="card overflow-hidden rounded-[1.35rem] bg-surface-strong/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
          <span className="ms-3 font-mono text-[0.7rem] text-fg-subtle">profile.py</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono whitespace-pre-wrap break-words sm:whitespace-pre text-[0.74rem] leading-[1.85] sm:p-6 sm:text-[0.8rem]">
          <code>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="block">
              <span className="text-fg-subtle">sari</span> <span className="text-accent">=</span> <span className="text-fg">Profile</span>(
            </motion.span>
            {lines.map((line, i) => (
              <motion.span
                key={line.k}
                className="block ps-4"
                initial={{ opacity: 0, x: reduce ? 0 : -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.09, duration: 0.4 }}
              >
                <span className="text-fg-muted">{line.k}</span>
                <span className="text-accent">=</span>
                {Array.isArray(line.v) ? (
                  <span className="text-fg">
                    [{line.v.map((v, j) => (
                      <span key={v}>
                        <span className="text-[color:var(--accent)] opacity-90">"{v}"</span>
                        {j < line.v.length - 1 && ', '}
                      </span>
                    ))}]
                  </span>
                ) : (
                  <span className="text-[color:var(--accent)] opacity-90">"{line.v}"</span>
                )}
                ,
              </motion.span>
            ))}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="block">
              )
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65 }} className="mt-3 block text-fg-subtle">
              <span className="text-accent">&gt;&gt;&gt;</span> sari.turn(data).into(<span className="text-fg">insight</span>)
              <motion.span
                className="ms-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.18em] bg-accent"
                animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
              />
            </motion.span>
          </code>
        </pre>
        <div className="grid grid-cols-3 border-t border-line">
          {data.about.stats.slice(1, 4).map((s, i) => (
            <div key={s.label} className={`px-4 py-4 ${i > 0 ? 'border-s border-line' : ''}`}>
              <div className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{s.value}</div>
              <div className="mt-0.5 text-[0.68rem] leading-snug text-fg-subtle">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
