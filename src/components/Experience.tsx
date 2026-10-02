import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Experience as ExperienceItem } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
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
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Most recent first.
  const items = [...data.experience].sort((a, b) => (b.end ?? '9999').localeCompare(a.end ?? '9999') || b.start.localeCompare(a.start));

  return (
    <Section id="experience" className="bg-[linear-gradient(to_bottom,transparent,var(--accent-soft)_50%,transparent)]">
      <SectionHeading id="experience" kicker={t.experience.kicker} title={t.experience.title} />

      <div ref={list} className="relative">
        <div aria-hidden className="absolute top-4 bottom-4 start-[15px] w-px bg-line sm:start-[19px]" />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute top-4 bottom-4 start-[15px] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0 sm:start-[19px]"
        />
        <ol className="relative">
          {items.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isOpen={open.has(item.id)} onToggle={() => toggle(item.id)} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TimelineItem({ item, index, isOpen, onToggle }: { item: ExperienceItem; index: number; isOpen: boolean; onToggle: () => void }) {
  const { t, formatDate } = useLanguage();
  const reduce = useReducedMotion();
  const isCurrent = item.end === null;
  const panelId = `exp-${item.id}-panel`;
  const meta = [`${formatDate(item.start)} – ${formatDate(item.end)}`, t.experience.duration(...monthsBetween(item.start, item.end)), item.location];

  return (
    <motion.li
      initial={{ opacity: 0, x: reduce ? 0 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className="relative ps-10 pb-4 last:pb-0 sm:ps-14 sm:pb-5"
    >
      <span aria-hidden className="absolute start-0 top-4 grid size-8 place-items-center sm:size-10">
        {isCurrent && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-accent/25 [animation-duration:2.4s]" />}
        <span
          className={`relative grid size-8 place-items-center rounded-full border sm:size-10 ${
            isCurrent ? 'border-accent bg-accent text-accent-fg' : 'border-line-strong bg-bg-elevated text-fg-muted'
          }`}
        >
          <Briefcase size={14} />
        </span>
      </span>

      <article
        onPointerMove={spotlightMove}
        className={`card spotlight p-4 transition-[border-color,box-shadow] duration-300 hover:shadow-lift sm:p-5 ${
          isCurrent ? 'border-accent/35' : 'hover:border-line-strong'
        }`}
      >
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold tracking-tight text-fg sm:text-lg">
              {item.role}
              {isCurrent && <Tag tone="accent">● {t.experience.current}</Tag>}
              {item.employmentType && <Tag>{item.employmentType}</Tag>}
            </h3>
            <p className="mt-0.5 text-sm text-fg-muted">
              <span className="font-medium text-fg">{item.company}</span>
              {item.via && (
                <span className="text-fg-subtle">
                  {' '}
                  ({t.experience.via} {item.via})
                </span>
              )}
            </p>
          </div>
          <p className="font-mono text-[0.7rem] leading-relaxed text-fg-subtle">{meta.join(' · ')}</p>
        </header>

        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg-muted">
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
              className="overflow-hidden"
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
          className="mt-2.5 inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full text-xs font-medium text-fg-muted transition-colors hover:text-accent"
        >
          {isOpen ? t.experience.collapse : t.experience.expand}
          <span className="sr-only">: {item.role}, {item.company}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease }} className="grid">
            <ChevronDown size={14} aria-hidden />
          </motion.span>
        </button>
      </article>
    </motion.li>
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
