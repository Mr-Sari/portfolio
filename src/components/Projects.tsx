import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectCard } from './ProjectCard';
import { BigTitle } from './ui/BigTitle';
import { Reveal } from './ui/Reveal';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'all' | ProjectCategory;

export function Projects() {
  const { t, data, dir } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLUListElement>(null);

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

  const cards = () => Array.from(track.current?.querySelectorAll<HTMLElement>('[data-card]') ?? []);

  const goTo = useCallback((i: number) => {
    const list = Array.from(track.current?.querySelectorAll<HTMLElement>('[data-card]') ?? []);
    const target = list[Math.max(0, Math.min(list.length - 1, i))];
    if (!target || !track.current) return;
    // Centre the card inside the track only (scrollIntoView would also scroll the page).
    const tr = track.current.getBoundingClientRect();
    const cr = target.getBoundingClientRect();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.current.scrollBy({ left: cr.left + cr.width / 2 - (tr.left + tr.width / 2), behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  // Track which card is centred.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards().forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [visible]);

  // Reset to the first card when the filter or language changes.
  useEffect(() => {
    setActive(0);
    requestAnimationFrame(() => goTo(0));
  }, [filter, dir, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === forward) {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === back) {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  const Prev = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="relative scroll-mt-20 overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="container-page">
        <BigTitle id="projects" lead={t.projects.title.lead} accent={t.projects.title.accent} sub={t.projects.sub} className="mb-6 sm:mb-8" />

        <LayoutGroup id="project-filters">
          <Reveal className="-mx-5 mb-5 flex overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:justify-center sm:px-0">
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
      </div>

      <p className="sr-only" aria-live="polite">
        {t.projects.count(visible.length)}. {visible.length ? t.projects.position(active + 1, visible.length) : ''}
      </p>

      {/* Full-bleed snap carousel; side padding centres the first and last cards. */}
      <ul
        ref={track}
        onKeyDown={onKeyDown}
        aria-roledescription="carousel"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7%] pt-2 pb-6 sm:gap-5 sm:px-[20%] lg:px-[calc(50%-13.5rem)]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <li
              key={`${filter}-${project.id}`}
              data-card
              className="w-[86%] shrink-0 snap-center sm:w-[60%] lg:w-[27rem]"
              aria-roledescription="slide"
              aria-label={t.projects.position(i + 1, visible.length)}
              onFocusCapture={() => i !== active && goTo(i)}
            >
              <ProjectCard
                project={project}
                index={data.projects.indexOf(project) + 1}
                active={i === active}
                onActivate={() => goTo(i)}
                onOpen={(p, el) => {
                  trigger.current = el;
                  setSelected(p);
                }}
              />
            </li>
          ))}
        </AnimatePresence>
      </ul>
      {visible.length === 0 && <p className="py-12 text-center text-fg-muted">{t.projects.empty}</p>}

      {/* Controls: prev / scrubber / next */}
      {visible.length > 1 && (
        <div className="container-page flex items-center justify-center gap-2">
          <ArrowButton label={t.a11y.prev} disabled={active === 0} onClick={() => goTo(active - 1)}>
            <Prev size={17} aria-hidden />
          </ArrowButton>
          <ol className="flex items-center gap-0.5 rounded-full border border-line bg-surface px-1.5 py-1 backdrop-blur">
            {visible.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t.a11y.goTo(i + 1)}: ${p.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`relative flex h-8 cursor-pointer flex-col items-center justify-center rounded-full px-1.5 font-mono text-[0.66rem] transition-colors sm:px-2 ${
                    i === active ? 'text-accent' : 'text-fg-subtle hover:text-fg'
                  }`}
                >
                  {String(data.projects.indexOf(p) + 1).padStart(2, '0')}
                  {i === active && <motion.span layoutId="scrub-dot" className="absolute -bottom-0.5 size-1 rounded-full bg-accent" />}
                </button>
              </li>
            ))}
          </ol>
          <ArrowButton label={t.a11y.next} disabled={active >= visible.length - 1} onClick={() => goTo(active + 1)}>
            <Next size={17} aria-hidden />
          </ArrowButton>
        </div>
      )}

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
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface text-fg backdrop-blur transition-[color,border-color,opacity] hover:border-accent/50 hover:text-accent disabled:cursor-default disabled:opacity-35"
    >
      {children}
    </button>
  );
}
