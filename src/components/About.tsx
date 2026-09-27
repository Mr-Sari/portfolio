import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { spotlightMove } from '../hooks/useSpotlight';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { fadeUp } from './ui/motion';

export function About() {
  const { t, data } = useLanguage();
  const { about, personal } = data;

  return (
    <Section id="about">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="kicker mb-3">{t.about.kicker}</p>
            <h2 id="about-title" className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
              {t.about.title}
            </h2>
          </Reveal>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-fg-muted sm:text-[1.05rem]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 text-fg-subtle">
              <Languages size={16} aria-hidden />
              {t.about.languages}
            </span>
            {personal.languages.map((l) => (
              <span key={l.name} className="rounded-full border border-line bg-surface px-3 py-1 text-fg">
                {l.name}
                {l.level && <span className="text-fg-subtle"> · {l.level}</span>}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="sr-only">{t.about.focus}</h3>
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
            {about.focusAreas.map((f) => (
              <motion.li
                key={f.title}
                variants={fadeUp}
                onPointerMove={spotlightMove}
                className="card spotlight group p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-6"
              >
                <span className="mb-5 grid size-10 place-items-center rounded-xl border border-line bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <TechIcon name={f.icon} size={19} />
                </span>
                <h4 className="font-semibold tracking-tight text-fg">{f.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{f.description}</p>
              </motion.li>
            ))}
          </RevealGroup>

          <RevealGroup as="dl" className="card grid grid-cols-2 overflow-hidden sm:grid-cols-4">
            {about.stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                title={s.source}
                className={`flex flex-col p-5 ${i % 2 === 1 ? 'border-s border-line' : ''} ${i >= 2 ? 'border-t border-line sm:border-t-0' : ''} ${i === 2 ? 'sm:border-s' : ''}`}
              >
                <dt className="order-2 mt-1 text-xs leading-snug text-fg-subtle">{s.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-[1.7rem]">{s.value}</dd>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
