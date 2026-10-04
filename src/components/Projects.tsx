import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectLinks } from './ProjectCard';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'all' | ProjectCategory;

/**
 * Case-study viewer: an indexed list of all projects (newest first) beside a
 * Problem → Approach → Technology → Result panel. On small screens the panel
 * opens inline under the selected project.
 */
export function Projects() {
  const { t, data } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [activeId, setActiveId] = useState(data.projects[0].id);
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
  const active = visible.find((p) => p.id === activeId) ?? visible[0];

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: t.projects.all },
    ...data.projectCategories.map((c) => ({ id: c.id, label: c.label })),
  ];

  const open = (project: Project, el: HTMLElement) => {
    trigger.current = el;
    setSelected(project);
  };
  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  return (
    <Section id="projects">
      <SectionHeading id="projects" kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />

      <LayoutGroup id="project-filters">
        <Reveal className="-mx-5 mb-6 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="group" aria-label={t.a11y.filterProjects} className="inline-flex gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`relative isolate inline-flex min-h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[0.8rem] font-medium transition-colors duration-200 sm:min-h-10 sm:px-4 sm:text-sm ${
                    isActive ? 'text-accent-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="project-filter" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  {tab.label}
                  <span className={`font-mono text-[0.68rem] ${isActive ? 'opacity-80' : 'text-fg-subtle'}`}>{counts[tab.id] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </LayoutGroup>

      <p className="sr-only" aria-live="polite">
        {t.projects.count(visible.length)}
      </p>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start">
        <Reveal as="ol" aria-label={t.projects.list} className="card divide-y divide-line overflow-hidden lg:sticky lg:top-24">
          <LayoutGroup id="project-list">
            {visible.map((project) => {
              const isActive = active?.id === project.id;
              const n = data.projects.indexOf(project) + 1;
              const category = data.projectCategories.find((c) => c.id === project.categories[0])?.label;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(project.id)}
                    aria-expanded={isActive}
                    aria-controls="project-panel"
                    className={`relative flex w-full cursor-pointer items-start gap-3.5 px-4 py-3.5 text-start transition-colors sm:px-5 ${
                      isActive ? 'bg-accent-soft' : 'hover:bg-accent-soft/50'
                    }`}
                  >
                    {isActive && <motion.span layoutId="project-marker" className="absolute inset-y-0 start-0 w-0.5 bg-accent" transition={{ duration: 0.3, ease }} />}
                    <span lang="en" className={`mt-0.5 font-mono text-[0.7rem] ${isActive ? 'text-accent' : 'text-fg-subtle'}`}>
                      {String(n).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[0.95rem] leading-snug font-semibold ${isActive ? 'text-fg' : 'text-fg-muted'}`}>{project.title}</span>
                      <span className="mt-0.5 block text-xs text-fg-subtle">
                        <span className="font-mono">{project.start.slice(0, 4)}</span> · {category}
                      </span>
                    </span>
                  </button>
                  {/* Mobile: the case study opens under its row */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="inline"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden lg:hidden"
                      >
                        <CaseStudy project={project} onOpen={open} compact />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </LayoutGroup>
        </Reveal>

        {/* Desktop: the case study panel */}
        <div id="project-panel" className="hidden lg:block">
          <AnimatePresence mode="wait" initial={false}>
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                className="card overflow-hidden"
              >
                <CaseStudy project={active} onOpen={open} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {visible.length === 0 && <p className="py-12 text-center text-fg-muted">{t.projects.empty}</p>}

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  );
}

function CaseStudy({ project, onOpen, compact = false }: { project: Project; onOpen: (p: Project, el: HTMLElement) => void; compact?: boolean }) {
  const { t, formatDate } = useLanguage();
  const reduce = useReducedMotion();
  const end = project.end === 'Present' ? t.experience.present : formatDate(project.end);

  const steps = [
    { label: t.projects.problem, body: <p>{project.brief.problem}</p> },
    { label: t.projects.approach, body: <p>{project.brief.approach}</p> },
    {
      label: t.projects.technologies,
      body: (
        <ul className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      ),
    },
    { label: t.projects.result, body: <p className="font-medium text-fg">{project.brief.result}</p> },
  ];

  return (
    <article className={compact ? 'border-t border-line bg-bg-elevated/40' : ''}>
      {!compact && (
        <div className="relative">
          <ProjectVisual visual={project.visual} className="h-36 border-b border-line xl:h-44" />
          <div className="absolute top-3 start-3 flex gap-1.5">
            <span className="rounded-full border border-line bg-bg-elevated/90 px-2.5 py-0.5 font-mono text-[0.68rem] text-fg">{project.start.slice(0, 4)}</span>
            <span className="rounded-full border border-line bg-bg-elevated/90 px-2.5 py-0.5 text-[0.68rem] text-fg-muted">{t.kinds[project.kind]}</span>
          </div>
        </div>
      )}
      <div className={compact ? 'p-4 sm:p-5' : 'p-6 xl:p-7'}>
        {!compact && (
          <>
            <p className="font-mono text-[0.7rem] text-fg-subtle">
              {project.context} · {formatDate(project.start)} – {end}
            </p>
            <h3 className="mt-1.5 text-balance text-2xl font-semibold tracking-[-0.025em] text-fg">{project.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">{project.shortDescription}</p>
          </>
        )}
        {compact && <p className="mb-3 font-mono text-[0.7rem] text-fg-subtle">{project.context}</p>}

        <motion.ol
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
          className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${compact ? '' : 'mt-5 sm:grid-cols-2'}`}
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.label}
              variants={{ hidden: { opacity: 0, y: reduce ? 0 : 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }}
              className="bg-bg-elevated p-4"
            >
              <p className="mb-1.5 flex items-center gap-2 font-mono text-[0.68rem] text-accent">
                <span lang="en" className="text-fg-subtle">
                  0{i + 1}
                </span>
                {step.label}
              </p>
              <div className="text-[0.88rem] leading-relaxed text-fg-muted">{step.body}</div>
            </motion.li>
          ))}
        </motion.ol>

        {project.metrics.length > 0 && (
          <dl className={`mt-4 grid gap-2 ${project.metrics.length > 3 ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2'}`}>
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col rounded-xl border border-line bg-figure-soft px-3 py-2.5">
                <dt className="order-2 mt-1 text-[0.72rem] leading-tight text-fg-muted">{m.label}</dt>
                <dd className="order-1 font-mono text-xl leading-none font-semibold text-figure">
                  <span dir="ltr" className="inline-block">
                    {m.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="group inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full bg-fg px-4 text-[0.82rem] font-medium text-bg transition-[opacity,transform] hover:opacity-90 active:scale-[0.97]"
          >
            {t.projects.caseStudy}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}
