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
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div>
          <Reveal>
            <p className="kicker mb-2">{t.about.kicker}</p>
            <h2 id="about-title" className="text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl lg:leading-[1.1]">
              {t.about.title}
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted sm:mt-4 sm:text-base">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1} className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 text-fg-subtle">
              <Languages size={15} aria-hidden />
              <span className="sr-only">{t.about.languages}</span>
            </span>
            {personal.languages.map((l) => (
              <span key={l.name} className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-fg">
                {l.name}
                {l.level && <span className="text-fg-subtle"> · {l.level}</span>}
              </span>
            ))}
          </Reveal>
        </div>

        <RevealGroup as="ul" className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {about.focusAreas.map((f) => (
            <motion.li
              key={f.title}
              variants={fadeUp}
              onPointerMove={spotlightMove}
              className="card spotlight group flex flex-col gap-2 rounded-2xl p-3.5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-5"
            >
              <span className="grid size-8 place-items-center rounded-lg border border-line bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6 sm:size-9">
                <TechIcon name={f.icon} size={17} />
              </span>
              <h3 className="text-sm leading-snug font-semibold tracking-tight text-fg sm:text-[0.95rem]">{f.title}</h3>
              <p className="text-xs leading-snug text-fg-muted sm:text-[0.8rem]">{f.description}</p>
            </motion.li>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
