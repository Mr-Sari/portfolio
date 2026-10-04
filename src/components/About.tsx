import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageProvider';
import { Section, SectionHeader } from './ui/Section';
import { ease, fadeUp } from './ui/motion';
import { RevealGroup } from './ui/Reveal';

export function About() {
  const { t, data } = useLanguage();
  const { about, personal, statements } = data;
  const edu = data.education[0];

  return (
    <Section id="about" className="border-t border-line">
      <SectionHeader id="about" index="01" title={t.about.title} lede={statements.philosophy} ledeStyle="quote" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <RevealGroup step={0.1} className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={i === 0 ? 'text-pretty text-xl leading-relaxed text-fg sm:text-[1.4rem] sm:leading-[1.55]' : 'text-pretty text-base leading-relaxed text-fg-muted sm:text-[1.05rem]'}
              >
                {p}
              </motion.p>
            ))}
          </RevealGroup>

          <RevealGroup as="dl" step={0.06} className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {[
              { k: t.about.facts.based, v: personal.location },
              { k: t.about.facts.languages, v: personal.languages.map((l) => l.name).join(' · ') },
              { k: t.about.facts.education, v: `${edu.degree} · ${edu.institution}` },
            ].map((f) => (
              <motion.div key={f.k} variants={fadeUp} className="bg-bg-elevated p-4">
                <dt className="font-mono text-[0.68rem] text-fg-subtle">{f.k}</dt>
                <dd className="mt-1 text-[0.9rem] leading-snug font-medium text-fg">{f.v}</dd>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        <Chain title={t.about.chainTitle} steps={about.chain} />
      </div>
    </Section>
  );
}

/** Analytics → BI → Data Science → AI, drawn as a connected sequence. */
function Chain({ title, steps }: { title: string; steps: { title: string; description: string }[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
      className="card p-5 sm:p-7"
    >
      <h3 className="mb-6 font-mono text-[0.72rem] text-fg-subtle">{title}</h3>
      <ol className="relative">
        {/* Connector drawn top → bottom */}
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: reduce ? 0 : 1.2, ease } } }}
          className="absolute start-[0.9375rem] top-4 bottom-4 w-px origin-top bg-gradient-to-b from-accent via-accent/50 to-line"
        />
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            variants={{ hidden: { opacity: 0, x: reduce ? 0 : -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <span
              aria-hidden
              lang="en"
              className={`relative z-10 grid size-[1.875rem] shrink-0 place-items-center rounded-full border font-mono text-[0.68rem] ${
                i === 0 ? 'border-accent bg-accent text-accent-fg' : 'border-line-strong bg-bg-elevated text-fg-muted'
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className={`font-semibold ${i === 0 ? 'text-lg text-fg' : 'text-[1.02rem] text-fg'}`}>{step.title}</p>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-fg-muted">{step.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
