import { AnimatePresence, LayoutGroup, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectCard, ProjectLinks } from './ProjectCard';
import { BigTitle } from './ui/BigTitle';
import { Reveal } from './ui/Reveal';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'all' | ProjectCategory;

/** How far side cards sit from the centre, as a fraction of the card width. */
const SPREAD = 0.62;

export function Projects() {
  const { t, data, dir } = useLanguage();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLElement | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(360);

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
    ...data.projectCategories.map((c) => ({ id: c.id, label: c.label })),
  ];

  // Card width follows the stage (square-ish cards like the reference).
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardWidth(Math.min(400, Math.round(el.clientWidth * 0.78))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setActive(0), [filter]);

  const go = (i: number) => setActive(Math.max(0, Math.min(visible.length - 1, i)));
  // In RTL the "next" card sits to the left, so screen directions flip.
  const sign = dir === 'rtl' ? -1 : 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      go(active + (e.key === 'ArrowRight' ? sign : -sign));
    }
  };

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
    go(active + (info.offset.x < 0 ? sign : -sign));
  };

  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  const current = visible[active];
  const cardHeight = Math.round(cardWidth * 1.02);

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="relative scroll-mt-20 overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="container-page">
        <BigTitle id="projects" lead={t.projects.title.lead} accent={t.projects.title.accent} sub={t.projects.sub} className="mb-6 sm:mb-8" />

        <LayoutGroup id="project-filters">
          <Reveal className="-mx-5 mb-4 flex overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:justify-center sm:px-0">
            <div role="group" aria-label={t.a11y.filterProjects} className="inline-flex gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur">
              {tabs.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(tab.id)}
                    className={`relative isolate inline-flex min-h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[0.8rem] font-medium transition-colors duration-200 sm:px-4 ${
                      isActive ? 'text-accent-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="project-filter" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                    )}
                    {tab.label}
                    <span className={`font-mono text-[0.66rem] ${isActive ? 'opacity-80' : 'text-fg-subtle'}`}>{counts[tab.id] ?? 0}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </LayoutGroup>

        <p className="sr-only" aria-live="polite">
          {t.projects.count(visible.length)}. {current ? `${t.projects.position(active + 1, visible.length)}: ${current.title}` : ''}
        </p>

        {/* Coverflow stage */}
        <motion.div
          ref={stage}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.projects.title.lead + ' ' + t.projects.title.accent}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPanEnd={onPanEnd}
          style={{ height: cardHeight + 24, perspective: 1400, touchAction: 'pan-y' }}
          className="relative mx-auto max-w-5xl rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-3/4 max-w-xl -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]" />
          <ul className="absolute inset-0">
            {visible.map((project, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              const hidden = abs > 2;
              return (
                <motion.li
                  key={`${filter}-${project.id}`}
                  aria-hidden={offset !== 0}
                  initial={false}
                  animate={{
                    x: offset * cardWidth * SPREAD * sign,
                    rotateY: reduce ? 0 : -offset * 32 * sign,
                    scale: offset === 0 ? 1 : 0.84 - (abs - 1) * 0.08,
                    opacity: hidden ? 0 : offset === 0 ? 1 : 0.55 - (abs - 1) * 0.25,
                    filter: offset === 0 || reduce ? 'brightness(1)' : 'brightness(0.7)',
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 0.65, ease }}
                  style={{ width: cardWidth, height: cardHeight, zIndex: 10 - abs, marginInlineStart: -cardWidth / 2, transformStyle: 'preserve-3d' }}
                  className={`absolute top-3 left-1/2 rtl:right-1/2 rtl:left-auto ${hidden ? 'pointer-events-none' : ''} ${offset !== 0 ? 'cursor-pointer' : ''}`}
                  onClick={() => offset !== 0 && go(i)}
                >
                  <ProjectCard
                    project={project}
                    index={data.projects.indexOf(project) + 1}
                    active={offset === 0}
                    onOpen={(p, el) => {
                      trigger.current = el;
                      setSelected(p);
                    }}
                  />
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
        {visible.length === 0 && <p className="py-12 text-center text-fg-muted">{t.projects.empty}</p>}

        {/* Controls: arrows + pill dots */}
        {visible.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <ArrowButton label={t.a11y.prev} disabled={active === 0} onClick={() => go(active - 1)}>
              <ArrowLeft size={17} aria-hidden className="rtl:-scale-x-100" />
            </ArrowButton>
            <ol className="flex items-center gap-1.5">
              {visible.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${t.a11y.goTo(i + 1)}: ${p.title}`}
                    aria-current={i === active ? 'true' : undefined}
                    className="grid h-6 cursor-pointer place-items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-accent shadow-[0_0_12px_var(--accent)]' : 'w-1.5 bg-fg-subtle/40 hover:bg-fg-subtle'}`}
                    />
                  </button>
                </li>
              ))}
            </ol>
            <ArrowButton label={t.a11y.next} disabled={active >= visible.length - 1} onClick={() => go(active + 1)}>
              <ArrowRight size={17} aria-hidden className="rtl:-scale-x-100" />
            </ArrowButton>
          </div>
        )}

        {/* Active project summary: Problem → Solution → Result */}
        <div className="mx-auto mt-5 max-w-xl">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                exit={{ opacity: 0, y: reduce ? 0 : -6, transition: { duration: 0.15 } }}
                className="card p-4 sm:p-5"
              >
                <dl className="space-y-1.5">
                  {[
                    current.brief.problem && { label: t.projects.problem, text: current.brief.problem },
                    { label: t.projects.solution, text: current.brief.solution },
                    current.brief.result && { label: t.projects.result, text: current.brief.result },
                  ]
                    .filter((r): r is { label: string; text: string } => Boolean(r))
                    .map((r) => (
                      <div key={r.label} className="grid grid-cols-[4.75rem_1fr] gap-2 text-[0.85rem] leading-snug">
                        <dt className="pt-px font-mono text-[0.62rem] tracking-[0.08em] text-accent uppercase">{r.label}</dt>
                        <dd className="text-fg-muted">{r.text}</dd>
                      </div>
                    ))}
                </dl>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <ul className="flex flex-wrap gap-1" aria-label={t.projects.technologies}>
                    {current.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                  <ProjectLinks project={current} compact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </section>
  );
}

function ArrowButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface text-fg backdrop-blur transition-[color,border-color,opacity,translate] hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  );
}
