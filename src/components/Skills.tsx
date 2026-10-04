import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { Section, SectionHeader } from './ui/Section';
import { ease } from './ui/motion';

export function Skills() {
  const { t, data } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <Section id="skills" className="border-t border-line">
      <SectionHeader id="skills" index="04" title={t.skills.title} lede={t.skills.lede} />

      <div className="border-t border-line">
        {data.skillCategories.map((cat, i) => {
          const skills = data.skills.filter((s) => s.category === cat.id);
          return (
            <motion.section
              key={cat.id}
              aria-labelledby={`skills-${cat.id}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
              className="grid gap-4 border-b border-line py-6 sm:py-8 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.68rem] text-fg-subtle">
                  <span lang="en">0{i + 1}</span>
                  {cat.primary && <span className="rounded bg-accent px-1.5 py-0.5 text-[0.62rem] text-accent-fg">{t.skills.core}</span>}
                </p>
                <h3 id={`skills-${cat.id}`} className={`mt-1.5 font-semibold tracking-tight text-fg ${cat.primary ? 'text-2xl' : 'text-lg'}`}>
                  {cat.label}
                </h3>
                <p className="mt-1 text-[0.85rem] text-fg-muted">{cat.description}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                    }}
                    className={`group inline-flex items-center gap-2 rounded-lg border transition-[border-color,color,translate] duration-200 hover:-translate-y-0.5 ${
                      cat.primary
                        ? 'border-accent/40 bg-accent-soft px-4 py-2.5 text-base font-semibold text-fg'
                        : 'border-line bg-bg-elevated px-2.5 py-1.5 text-[0.85rem] text-fg hover:border-accent/40'
                    }`}
                  >
                    <TechIcon
                      name={skill.icon}
                      size={cat.primary ? 18 : 14}
                      className={`transition-colors ${cat.primary ? 'text-accent' : 'text-fg-subtle group-hover:text-accent'}`}
                    />
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
        <h3 className="shrink-0 font-mono text-[0.72rem] text-fg-subtle">{t.skills.soft}</h3>
        <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[0.95rem] text-fg-muted">
          {data.softSkills.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-fg-subtle">
                  ·
                </span>
              )}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
