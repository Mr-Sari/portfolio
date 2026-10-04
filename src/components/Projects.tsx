import { AnimatePresence, LayoutGroup, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectCard, ProjectLinks } from './ProjectCard';
import { Reveal } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'all' | ProjectCategory;

/** How far side cards sit from the centre, as a fraction of the card width. */
const SPREAD = 0.64;

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

  // Card width follows the stage.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardWidth(Math.min(380, Math.round(el.clientWidth * 0.8))));
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

  const open = (project: Project, el: HTMLElement) => {
    trigger.current = el;
    setSelected(project);
  };

  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  const current = visible[active];
  const cardHeight = Math.round(cardWidth * 1.08);

  return (
    <Section id="projects" className="overflow-hidden border-t border-line">
      <SectionHeader id="projects" index="03" title={t.projects.title} lede={t.projects.lede} />

      {/* Slicers */}
      <LayoutGroup id="project-filters">
        <Reveal className="-mx-4 mb-6 flex overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          <div role="group" aria-label={t.a11y.filterProjects} className="inline-flex gap-1 rounded-xl border border-line bg-bg-elevated p-1">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`relative isolate inline-flex min-h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-3 text-[0.82rem] font-medium transition-colors duration-200 sm:px-4 ${
                    isActive ? 'text-bg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="project-filter" className="absolute inset-0 -z-10 rounded-lg bg-fg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  {tab.label}
                  <span className={`font-mono text-[0.68rem] ${isActive ? 'opacity-70' : 'text-fg-subtle'}`}>{counts[tab.id] ?? 0}</span>
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
        aria-label={t.projects.title}
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
                  rotateY: reduce ? 0 : -offset * 30 * sign,
                  scale: offset === 0 ? 1 : 0.85 - (abs - 1) * 0.08,
                  opacity: hidden ? 0 : offset === 0 ? 1 : 0.55 - (abs - 1) * 0.25,
                  filter: offset === 0 || reduce ? 'brightness(1)' : 'brightness(0.72)',
                }}
                transition={reduce ? { duration: 0 } : { duration: 0.65, ease }}
                style={{ width: cardWidth, height: cardHeight, zIndex: 10 - abs, marginInlineStart: -cardWidth / 2, transformStyle: 'preserve-3d' }}
                className={`absolute top-3 left-1/2 cursor-pointer rtl:right-1/2 rtl:left-auto ${hidden ? 'pointer-events-none' : ''}`}
                onClick={(e) => (offset === 0 ? open(project, e.currentTarget) : go(i))}
              >
                <ProjectCard project={project} index={data.projects.indexOf(project) + 1} total={data.projects.length} active={offset === 0} />
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
      {visible.length === 0 && <p className="py-12 text-center text-fg-muted">{t.projects.empty}</p>}

      {/* Controls */}
      {visible.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
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
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-accent' : 'w-1.5 bg-fg-subtle/40 hover:bg-fg-subtle'}`} />
                </button>
              </li>
            ))}
          </ol>
          <ArrowButton label={t.a11y.next} disabled={active >= visible.length - 1} onClick={() => go(active + 1)}>
            <ArrowRight size={17} aria-hidden className="rtl:-scale-x-100" />
          </ArrowButton>
        </div>
      )}

      {/* Case strip for the active project: Problem → Approach → Technology → Result */}
      <div className="mx-auto mt-8 max-w-5xl">
        <AnimatePresence mode="wait" initial={false}>
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
              exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.15 } }}
            >
              <CaseStrip project={current} onOpen={open} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  );
}

function CaseStrip({ project, onOpen }: { project: Project; onOpen: (p: Project, el: HTMLElement) => void }) {
  const { t, formatDate } = useLanguage();
  const end = project.end === 'Present' ? t.experience.present : formatDate(project.end);

  const cells = [
    { label: t.projects.problem, body: <p>{project.brief.problem}</p> },
    { label: t.projects.approach, body: <p>{project.brief.approach}</p> },
    {
      label: t.projects.technology,
      body: (
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: t.projects.result,
      body: (
        <>
          {project.brief.result && <p className="text-fg">{project.brief.result}</p>}
          {project.metrics.length > 0 && (
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-[0.72rem] leading-tight text-fg-subtle">{m.label}</dt>
                  <dd className="order-1 font-mono text-lg leading-none font-medium text-figure">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line p-5 sm:p-6">
        <div className="min-w-0">
          <p className="font-mono text-[0.7rem] text-fg-subtle">
            {project.context} · {formatDate(project.start)} – {end}
          </p>
          <h3 className="mt-1 text-balance text-xl font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <ProjectLinks project={project} compact />
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="group inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg bg-fg px-3.5 text-[0.8rem] font-medium text-bg transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
          >
            {t.projects.viewFull}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
      <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {cells.map((cell, i) => (
          <li key={cell.label} className="bg-bg-elevated p-5 sm:p-6">
            <p className="mb-2.5 flex items-center gap-2 font-mono text-[0.68rem] text-accent">
              <span lang="en" className="text-fg-subtle">
                0{i + 1}
              </span>
              {cell.label}
            </p>
            <div className="text-[0.9rem] leading-relaxed text-fg-muted">{cell.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ArrowButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-line-strong bg-bg-elevated text-fg transition-[color,border-color,opacity,translate] hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  );
}
