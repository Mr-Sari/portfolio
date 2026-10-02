import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Experience as ExperienceItem } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { BigTitle } from './ui/BigTitle';
import { Section } from './ui/Section';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

function monthsBetween(start: string, end: string | null) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  return [Math.floor(months / 12), months % 12] as const;
}

export function Experience() {
  const { t, data } = useLanguage();
  const list = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const items = [...data.experience].sort((a, b) => (b.end ?? '9999').localeCompare(a.end ?? '9999') || b.start.localeCompare(a.start));

  return (
    <Section id="experience" className="overflow-x-clip">
      <BigTitle id="experience" lead={t.experience.title.lead} accent={t.experience.title.accent} sub={t.experience.sub} className="mb-8 sm:mb-14" />

      <div ref={list} className="relative mx-auto max-w-5xl">
        {/* Track + growing progress line (start edge on mobile, centre on desktop) */}
        <div aria-hidden className="absolute top-2 bottom-2 start-[11px] w-px bg-line md:start-1/2" />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute top-2 bottom-2 start-[11px] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/10 md:start-1/2"
        />
        <ol className="relative space-y-5 sm:space-y-8">
          {items.map((item, i) => (
            <TimelineItem key={item.id} item={item} side={i % 2 === 0 ? 'start' : 'end'} isOpen={open.has(item.id)} onToggle={() => toggle(item.id)} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TimelineItem({ item, side, isOpen, onToggle }: { item: ExperienceItem; side: 'start' | 'end'; isOpen: boolean; onToggle: () => void }) {
  const { t, formatDate, dir } = useLanguage();
  const reduce = useReducedMotion();
  const isCurrent = item.end === null;
  const panelId = `exp-${item.id}-panel`;
  const year = item.start.slice(0, 4);
  // Cards slide in from their own side of the line.
  const fromX = reduce ? 0 : (side === 'start' ? -1 : 1) * (dir === 'rtl' ? -1 : 1) * 28;

  return (
    <li className="relative ps-9 md:grid md:grid-cols-2 md:gap-12 md:ps-0">
      {/* Year pill on the line */}
      <motion.span
        initial={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.5, ease }}
        className={`absolute top-4 start-0 z-10 grid h-6 min-w-6 place-items-center rounded-full border px-1.5 font-mono text-[0.62rem] font-semibold md:start-1/2 md:-translate-x-1/2 md:px-2.5 md:text-[0.68rem] rtl:md:translate-x-1/2 ${
          isCurrent ? 'border-accent bg-accent text-accent-fg' : 'border-line-strong bg-bg-elevated text-fg-muted'
        }`}
      >
        <span className="hidden md:inline">{year}</span>
        <span className="size-1.5 rounded-full bg-current md:hidden" aria-hidden />
      </motion.span>

      <motion.article
        initial={{ opacity: 0, x: fromX, filter: reduce ? 'none' : 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.7, ease }}
        onPointerMove={spotlightMove}
        className={`card spotlight p-4 transition-[border-color,box-shadow] duration-300 hover:shadow-lift sm:p-5 ${
          side === 'end' ? 'md:col-start-2' : ''
        } ${isCurrent ? 'border-accent/40' : 'hover:border-line-strong'}`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {isCurrent && <Tag tone="accent">● {t.experience.current}</Tag>}
          {item.employmentType && <Tag>{item.employmentType}</Tag>}
          <span className="font-mono text-[0.68rem] text-fg-subtle">
            {formatDate(item.start)} – {formatDate(item.end)} · {t.experience.duration(...monthsBetween(item.start, item.end))}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg sm:text-xl">{item.role}</h3>
        <p className="mt-0.5 text-sm text-fg-muted">
          <span className="font-medium text-accent">{item.company}</span>
          {item.via && (
            <span className="text-fg-subtle">
              {' '}
              ({t.experience.via} {item.via})
            </span>
          )}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-fg-subtle">
          <MapPin size={12} aria-hidden />
          {item.location}
        </p>

        <ul className="mt-3 space-y-1.5 text-start text-sm leading-relaxed text-fg-muted">
          {item.achievements.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>
                <Highlight text={line} />
              </span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease }}
              className="overflow-hidden text-start"
            >
              <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-fg-muted">
                {item.responsibilities.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-fg-subtle/50" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-1" aria-label={t.projects.technologies}>
                {item.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="mt-2 inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full text-xs font-medium text-fg-muted transition-colors hover:text-accent"
        >
          {isOpen ? t.experience.collapse : t.experience.expand}
          <span className="sr-only">: {item.role}, {item.company}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease }} className="grid">
            <ChevronDown size={14} aria-hidden />
          </motion.span>
        </button>
      </motion.article>
    </li>
  );
}

/** Emphasises figures such as "10+", "25+" or "81%" inside a sentence. */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d[\d,.]*\+?%?)/).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-fg">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
