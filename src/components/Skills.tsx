import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SkillCategoryId } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { ease } from './ui/motion';

type Filter = 'all' | SkillCategoryId;

export function Skills() {
  const { t, data } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');

  const categoryLabel = (id: SkillCategoryId) => data.skillCategories.find((c) => c.id === id)?.shortLabel ?? id;
  const visible = useMemo(() => (filter === 'all' ? data.skills : data.skills.filter((s) => s.category === filter)), [filter, data.skills]);
  const activeCategory = data.skillCategories.find((c) => c.id === filter);

  return (
    <Section id="skills">
      <SectionHeading id="skills" kicker={t.skills.kicker} title={t.skills.title} intro={t.skills.intro} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
        <LayoutGroup id="skill-filters">
          <Reveal>
            <div role="group" aria-label={t.a11y.filterSkills} className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {[{ id: 'all' as const, label: t.skills.all }, ...data.skillCategories].map((c) => {
                const isActive = filter === c.id;
                const count = c.id === 'all' ? data.skills.length : data.skills.filter((s) => s.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(c.id)}
                    className={`relative isolate flex min-h-10 shrink-0 cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 text-start text-sm transition-colors ${
                      isActive ? 'font-medium text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="skill-filter" className="absolute inset-0 -z-10 rounded-xl border border-line bg-surface-strong shadow-card" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                    )}
                    <span className="whitespace-nowrap">{c.label}</span>
                    <span className={`font-mono text-[0.68rem] ${isActive ? 'text-accent' : 'text-fg-subtle'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </LayoutGroup>

        <div>
          <AnimatePresence mode="wait" initial={false}>
            {activeCategory && (
              <motion.p key={activeCategory.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 text-sm text-fg-muted">
                {activeCategory.description}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.ul layout className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((skill, i) => (
                <motion.li
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease, delay: Math.min(i, 12) * 0.02 } }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                  onPointerMove={spotlightMove}
                  className="card spotlight group flex gap-3.5 rounded-2xl p-4 transition-[border-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-elevated text-fg-muted transition-[color,transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-accent-soft group-hover:text-accent">
                    <TechIcon name={skill.icon} size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-fg">{skill.name}</h3>
                    <p className="font-mono text-[0.64rem] tracking-wide text-fg-subtle uppercase">{categoryLabel(skill.category)}</p>
                    <p className="mt-1.5 text-[0.8rem] leading-snug text-fg-muted">{skill.description}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <Reveal className="mt-8 flex flex-col gap-3 rounded-2xl border border-dashed border-line-strong p-5 sm:flex-row sm:items-center sm:gap-5">
            <h3 className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-fg">
              <Users size={16} className="text-accent" aria-hidden />
              {t.skills.soft}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {data.softSkills.map((s) => (
                <li key={s} className="rounded-full bg-accent-soft px-3 py-1 text-xs text-fg-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
