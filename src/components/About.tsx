import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp } from './ui/motion';

export function About() {
  const { t, data } = useLanguage();
  const { about, personal } = data;

  return (
    <Section id="about">
      <SectionHeading id="about" kicker={t.about.kicker} title={t.about.title} />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div>
          <Reveal>
            <p className="border-s-2 border-figure ps-4 text-xl leading-snug font-medium tracking-[-0.015em] text-fg sm:text-2xl">{t.about.lede}</p>
          </Reveal>
          <RevealGroup step={0.08} className="mt-6 space-y-4">
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className={`text-pretty leading-relaxed ${i === 0 ? 'text-base text-fg sm:text-[1.08rem]' : 'text-[0.95rem] text-fg-muted sm:text-base'}`}>
                {p}
              </motion.p>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-2 text-sm">
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

        {/* Analytics → BI → Data Science → AI, with emphasis decreasing down the chain */}
        <Reveal delay={0.1} className="card p-5 sm:p-6">
          <h3 className="kicker mb-5">{t.about.chain}</h3>
          <ol className="relative space-y-2.5">
            {about.chain.map((step, i) => (
              <li
                key={step.title}
                className={`flex items-start gap-3.5 rounded-2xl border p-3.5 transition-[border-color,translate] duration-300 hover:-translate-y-0.5 ${
                  i === 0 ? 'border-accent/40 bg-accent-soft' : 'border-line bg-bg-elevated/60 hover:border-line-strong'
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${i === 0 ? 'bg-accent text-accent-fg' : 'border border-line bg-surface text-fg-muted'}`}
                >
                  <TechIcon name={step.icon} size={17} />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2">
                    <span lang="en" className="font-mono text-[0.68rem] text-fg-subtle">
                      0{i + 1}
                    </span>
                    <span className={`font-semibold tracking-tight text-fg ${i === 0 ? 'text-[1.05rem]' : 'text-[0.95rem]'}`}>{step.title}</span>
                  </p>
                  <p className="mt-0.5 text-[0.82rem] leading-snug text-fg-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
