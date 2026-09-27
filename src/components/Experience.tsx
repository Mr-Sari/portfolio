import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, ChevronDown, MapPin } from 'lucide-react';
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
  const [open, setOpen] = useState<Set<string>>(() => new Set([data.experience[0]?.id]));

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
      <SectionHeading id="experience" kicker={t.experience.kicker} title={t.experience.title} intro={t.experience.intro} />

      <div ref={list} className="relative">
        <div aria-hidden className="absolute top-2 bottom-2 start-[15px] w-px bg-line sm:start-[19px]" />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute top-2 bottom-2 start-[15px] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0 sm:start-[19px]"
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

  return (
    <motion.li
      initial={{ opacity: 0, x: reduce ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
      className="relative ps-12 pb-8 last:pb-0 sm:ps-16"
    >
      {/* Marker */}
      <span aria-hidden className="absolute start-0 top-5 grid size-8 place-items-center sm:size-10">
        {isCurrent && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-accent/25 [animation-duration:2.4s]" />}
        <span
          className={`relative grid size-8 place-items-center rounded-full border sm:size-10 ${
            isCurrent ? 'border-accent bg-accent text-accent-fg' : 'border-line-strong bg-bg-elevated text-fg-muted'
          }`}
        >
          <Briefcase size={15} />
        </span>
      </span>

      <article
        onPointerMove={spotlightMove}
        className={`card spotlight overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-lift ${
          isCurrent ? 'border-accent/35' : 'hover:border-line-strong'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full cursor-pointer flex-col gap-4 p-5 text-start sm:p-6 md:flex-row md:items-start md:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isCurrent && <Tag tone="accent">● {t.experience.current}</Tag>}
              {item.employmentType && <Tag>{item.employmentType}</Tag>}
              <Tag>{item.sector}</Tag>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{item.role}</h3>
            <p className="mt-1 text-[0.95rem] text-fg-muted">
              <span className="font-medium text-fg">{item.company}</span>
              {item.via && (
                <span className="text-fg-subtle">
                  {' '}
                  ({t.experience.via} {item.via})
                </span>
              )}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{item.summary}</p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-end">
            <div className="font-mono text-xs text-fg-subtle md:text-end">
              <div className="text-fg-muted">
                {formatDate(item.start)} – {formatDate(item.end)}
              </div>
              <div className="mt-1">{t.experience.duration(...monthsBetween(item.start, item.end))}</div>
              <div className="mt-1 inline-flex items-center gap-1">
                <MapPin size={11} aria-hidden />
                {item.location}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted">
              <span className="hidden sm:inline">{isOpen ? t.experience.collapse : t.experience.expand}</span>
              <span className="sr-only sm:hidden">{isOpen ? t.experience.collapse : t.experience.expand}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease }} className="grid size-8 place-items-center rounded-full border border-line">
                <ChevronDown size={15} aria-hidden />
              </motion.span>
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease }}
              className="overflow-hidden"
            >
              <div className="grid gap-6 border-t border-line p-5 sm:p-6 lg:grid-cols-[1fr_1fr_auto]">
                {item.metrics.length > 0 && (
                  <dl className="flex gap-3 lg:order-3 lg:flex-col">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="flex min-w-28 flex-col rounded-xl border border-line bg-accent-soft/60 px-4 py-3">
                        <dt className="order-2 text-[0.7rem] text-fg-subtle">{m.label}</dt>
                        <dd className="text-xl font-semibold tracking-tight text-fg">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <BulletList title={t.experience.achievements} items={item.achievements} accent />
                <BulletList title={t.experience.responsibilities} items={item.responsibilities} />
                <div className="lg:col-span-3 lg:order-4">
                  <h4 className="mb-2.5 font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">{t.experience.technologies}</h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.li>
  );
}

function BulletList({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="mb-2.5 font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">{title}</h4>
      <ul className="space-y-2.5 text-sm leading-relaxed text-fg-muted">
        {items.map((line) => (
          <li key={line} className="flex gap-3">
            <span className={`mt-2 size-1.5 shrink-0 rounded-full ${accent ? 'bg-accent' : 'bg-fg-subtle/50'}`} aria-hidden />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
