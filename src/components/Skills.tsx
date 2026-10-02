import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { BigTitle } from './ui/BigTitle';
import { Section } from './ui/Section';
import { ease } from './ui/motion';

export function Skills() {
  const { t, data } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <Section id="skills" className="overflow-hidden">
      <BigTitle id="skills" lead={t.skills.title.lead} accent={t.skills.title.accent} sub={t.skills.sub} className="mb-6 sm:mb-8" />

      <div className="mx-auto grid max-w-5xl gap-x-8 gap-y-4 sm:gap-y-5 md:grid-cols-2">
        {data.skillCategories.map((cat) => {
          const skills = data.skills.filter((s) => s.category === cat.id);
          return (
            <motion.section
              key={cat.id}
              aria-labelledby={`skills-${cat.id}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
              className={cat.primary ? 'md:col-span-2' : ''}
            >
              <div className="mb-1.5 flex items-center gap-2.5">
                <h3 id={`skills-${cat.id}`} className={`shrink-0 font-mono text-[0.7rem] tracking-[0.1em] uppercase ${cat.primary ? 'text-accent' : 'text-fg-subtle'}`}>
                  {'// '}
                  {cat.label}
                </h3>
                {/* Line draws itself across as the row enters */}
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: reduce ? 0 : 0.9, ease } } }}
                  className={`h-px flex-1 origin-left rtl:origin-right ${cat.primary ? 'bg-gradient-to-r from-accent/60 to-transparent rtl:bg-gradient-to-l' : 'bg-line'}`}
                />
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    variants={{
                      hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
                    }}
                    className={`group inline-flex items-center gap-1.5 rounded-lg border transition-[border-color,color,translate] duration-200 hover:-translate-y-0.5 ${
                      cat.primary
                        ? 'border-accent/35 bg-accent-soft px-3 py-1.5 text-[0.92rem] font-semibold text-fg sm:text-[0.95rem]'
                        : 'border-line bg-surface px-2 py-0.5 text-[0.8rem] text-fg hover:border-accent/40'
                    }`}
                  >
                    <TechIcon
                      name={skill.icon}
                      size={cat.primary ? 16 : 13}
                      className={`transition-colors ${cat.primary ? 'text-accent' : 'text-fg-muted group-hover:text-accent'}`}
                    />
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          );
        })}
      </div>

      <SoftSkillsMarquee label={t.skills.soft} items={data.softSkills} />
    </Section>
  );
}

/** Endless strip of soft skills; static (wrapped) under reduced motion, pauses on hover. */
function SoftSkillsMarquee({ label, items }: { label: string; items: string[] }) {
  const reduce = useReducedMotion();
  const pill = 'shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-[0.82rem] text-fg-muted';
  return (
    <div className="mt-6 sm:mt-8">
      <h3 className="sr-only">{label}</h3>
      {reduce ? (
        <ul className="flex flex-wrap justify-center gap-2">
          {items.map((s) => (
            <li key={s} className={pill}>
              {s}
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative -mx-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:mx-0">
          <ul className="animate-marquee flex w-max gap-2 hover:[animation-play-state:paused]" aria-label={label}>
            {[...items, ...items, ...items, ...items].map((s, i) => (
              <li key={i} className={`${pill} ${i % items.length === 0 ? 'border-accent/40 text-accent' : ''}`} aria-hidden={i >= items.length}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
