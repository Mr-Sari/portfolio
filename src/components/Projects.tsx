import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectCard } from './ProjectCard';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'all' | ProjectCategory;

export function Projects() {
  const { t, data } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.projects.length };
    for (const p of data.projects) for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, [data.projects]);

  const visible = useMemo(
    () => (filter === 'all' ? data.projects : data.projects.filter((p) => p.categories.includes(filter))),
    [filter, data.projects],
  );

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: t.projects.all },
    ...data.projectCategories.map((c) => ({ id: c.id, label: c.shortLabel })),
  ];

  const close = () => {
    setSelected(null);
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => trigger.current?.focus());
  };

  return (
    <Section id="projects">
      <SectionHeading id="projects" kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />

      <LayoutGroup id="project-filters">
        <div className="-mx-5 mb-8 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="group" aria-label="Filter projects" className="inline-flex gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`relative isolate inline-flex min-h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-accent-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {tab.label}
                  <span className={`font-mono text-[0.68rem] ${isActive ? 'opacity-80' : 'text-fg-subtle'}`}>{counts[tab.id] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {t.projects.count(visible.length)}
        </p>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={(p, el) => {
                  trigger.current = el;
                  setSelected(p);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        {visible.length === 0 && <p className="py-12 text-center text-fg-muted">{t.projects.empty}</p>}
      </LayoutGroup>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  );
}
