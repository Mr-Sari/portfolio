import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { spotlightMove } from '../hooks/useSpotlight';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp } from './ui/motion';

export function Skills() {
  const { t, data } = useLanguage();

  return (
    <Section id="skills">
      <SectionHeading id="skills" kicker={t.skills.kicker} title={t.skills.title} />

      <RevealGroup step={0.05} className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {data.skillCategories.map((cat, i) => {
          const skills = data.skills.filter((s) => s.category === cat.id);
          const primary = i === 0;
          return (
            <motion.section
              key={cat.id}
              variants={fadeUp}
              onPointerMove={spotlightMove}
              aria-labelledby={`skills-${cat.id}`}
              className={`card spotlight rounded-2xl p-3.5 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift sm:p-4 ${
                primary ? 'border-accent/35' : ''
              }`}
            >
              <h3 id={`skills-${cat.id}`} className="mb-2.5 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.06em] text-fg-subtle uppercase">
                <span className={primary ? 'text-accent' : ''}>{cat.label}</span>
                <span>{skills.length}</span>
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
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
          );
        })}
      </RevealGroup>

      <Reveal className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-dashed border-line-strong p-3.5 sm:p-4">
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
