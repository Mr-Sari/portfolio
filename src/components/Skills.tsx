import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { spotlightMove } from '../hooks/useSpotlight';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp } from './ui/motion';

/**
 * Data Analytics is the large, emphasised tile; BI, Data Science & AI and
 * Data Engineering sit beside it at a smaller scale.
 */
export function Skills() {
  const { t, data } = useLanguage();
  const [primary, ...rest] = data.skillCategories;
  const skillsOf = (id: string) => data.skills.filter((s) => s.category === id);

  return (
    <Section id="skills">
      <SectionHeading id="skills" kicker={t.skills.kicker} title={t.skills.title} intro={t.skills.intro} />

      <RevealGroup step={0.06} className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Primary: Data Analytics */}
        <motion.section
          variants={fadeUp}
          aria-labelledby={`skills-${primary.id}`}
          className="card relative overflow-hidden border-accent/40 p-5 sm:p-6 md:row-span-2"
        >
          <div aria-hidden className="absolute -top-20 -end-20 size-56 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]" />
          <p className="relative inline-flex rounded-full bg-accent px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-fg">{t.skills.core}</p>
          <h3 id={`skills-${primary.id}`} className="relative mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg">
            {primary.label}
          </h3>
          <p className="relative mt-1 text-sm text-fg-muted">{primary.description}</p>
          <ul className="relative mt-5 grid grid-cols-2 gap-2.5">
            {skillsOf(primary.id).map((skill) => (
              <li
                key={skill.name}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-line bg-bg-elevated p-4 transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <TechIcon name={skill.icon} size={20} />
                </span>
                <span className="text-base font-semibold text-fg">{skill.name}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {rest.map((cat) => (
          <motion.section
            key={cat.id}
            variants={fadeUp}
            onPointerMove={spotlightMove}
            aria-labelledby={`skills-${cat.id}`}
            className="card spotlight p-4 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift sm:p-5"
          >
            <h3 id={`skills-${cat.id}`} className="text-[1.02rem] font-semibold tracking-tight text-fg">
              {cat.label}
            </h3>
            <p className="mt-0.5 mb-3 text-xs text-fg-subtle">{cat.description}</p>
            <ul className="flex flex-wrap gap-1.5">
              {skillsOf(cat.id).map((skill) => (
                <li
                  key={skill.name}
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg-elevated px-2 py-1 text-[0.8rem] text-fg transition-[border-color,color] duration-200 hover:border-accent/40"
                >
                  <TechIcon name={skill.icon} size={14} className="text-fg-muted transition-colors group-hover:text-accent" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        <motion.section variants={fadeUp} aria-labelledby="skills-tools" className="rounded-[1.25rem] border border-dashed border-line-strong p-4 sm:p-5">
          <h3 id="skills-tools" className="mb-3 text-[0.85rem] font-medium text-fg-muted">
            {t.skills.also}
          </h3>
          <ul className="flex flex-wrap gap-1">
            {data.tools.map((tool) => (
              <li key={tool} className="rounded-md px-1.5 py-0.5 font-mono text-[0.72rem] text-fg-subtle">
                {tool}
              </li>
            ))}
          </ul>
        </motion.section>
      </RevealGroup>

      <Reveal className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-line p-3.5 sm:p-4">
        <h3 className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg">
          <Users size={15} className="text-accent" aria-hidden />
          {t.skills.soft}
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {data.softSkills.map((s) => (
            <li key={s} className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-fg-muted">
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
