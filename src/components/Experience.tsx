import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Experience as ExperienceItem } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { Section, SectionHeader } from './ui/Section';
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
  // Newest first for reading; the path chart shows the same roles oldest → newest.
  const items = [...data.experience].sort((a, b) => (b.end ?? '9999').localeCompare(a.end ?? '9999') || b.start.localeCompare(a.start));

  return (
    <Section id="experience" className="border-t border-line bg-bg-sunken/40">
      <SectionHeader id="experience" index="02" title={t.experience.title} lede={t.experience.lede} />
      <CareerPath items={[...items].reverse()} />
      <ol className="mt-10 border-t border-line sm:mt-14">
        {items.map((item) => (
          <Entry key={item.id} item={item} />
        ))}
      </ol>
    </Section>
  );
}

/** Rising step chart of the roles, oldest → newest. Purely illustrative. */
function CareerPath({ items }: { items: ExperienceItem[] }) {
  const { formatDate } = useLanguage();
  const reduce = useReducedMotion();
  const heights = ['h-10 sm:h-12', 'h-16 sm:h-20', 'h-24 sm:h-28'];

  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
      className="grid grid-cols-3 items-end gap-2 sm:gap-4"
    >
      {items.map((item, i) => {
        const current = item.end === null;
        return (
          <li key={item.id}>
            <a href={`#exp-${item.id}`} className="group block">
              <motion.span
                aria-hidden
                variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: reduce ? 0 : 0.8, ease } } }}
                className={`block origin-bottom rounded-t-md transition-colors ${heights[Math.min(i, 2)]} ${
                  current ? 'bg-accent' : i === 0 ? 'bg-accent/25 group-hover:bg-accent/40' : 'bg-accent/50 group-hover:bg-accent/65'
                }`}
              />
              <span className="mt-3 block border-t border-line-strong pt-2.5">
                <span className="block font-mono text-[0.66rem] text-fg-subtle">{formatDate(item.start)}</span>
                <span className="mt-0.5 block text-[0.82rem] leading-snug font-semibold text-fg group-hover:text-accent sm:text-[0.95rem]">{item.role}</span>
                <span className="block truncate text-[0.72rem] text-fg-muted sm:text-[0.8rem]">{item.company}</span>
              </span>
            </a>
          </li>
        );
      })}
    </motion.ol>
  );
}

function Entry({ item }: { item: ExperienceItem }) {
  const { t, formatDate } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const isCurrent = item.end === null;
  const panelId = `exp-${item.id}-panel`;

  return (
    <motion.li
      id={`exp-${item.id}`}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease }}
      className="border-b border-line py-8 sm:py-10 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10"
    >
      {/* Meta column */}
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 md:mb-0 md:flex-col md:items-start">
        {isCurrent && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[0.7rem] font-medium text-accent">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
            {t.experience.current}
          </span>
        )}
        <p className="font-mono text-[0.75rem] text-fg">
          {formatDate(item.start)} – {formatDate(item.end)}
        </p>
        <p className="text-[0.75rem] text-fg-subtle">
          {t.experience.duration(...monthsBetween(item.start, item.end))} · {item.location}
        </p>
        {item.employmentType && <p className="text-[0.75rem] text-fg-subtle">{item.employmentType}</p>}
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-[1.7rem]">{item.role}</h3>
        <p className="mt-1 text-[0.95rem]">
          <span className="font-medium text-accent">{item.company}</span>
          {item.via && (
            <span className="text-fg-subtle">
              {' '}
              · {t.experience.via} {item.via}
            </span>
          )}
        </p>
        <p className="mt-3 max-w-2xl text-[0.95rem] text-fg-muted">{item.summary}</p>

        <ul className="mt-4 max-w-2xl space-y-2.5 text-[0.95rem] leading-relaxed text-fg">
          {item.achievements.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
              <span>
                <Figures text={line} />
              </span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease }}
              className="overflow-hidden"
            >
              <ul className="mt-2.5 max-w-2xl space-y-2.5 text-[0.95rem] leading-relaxed text-fg-muted">
                {item.responsibilities.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-fg-subtle/60" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          {item.responsibilities.length > 0 && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1 text-[0.8rem] font-medium text-fg-muted transition-colors hover:text-accent"
            >
              {open ? t.experience.collapse : t.experience.expand}
              <span className="sr-only">
                : {item.role}, {item.company}
              </span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease }} className="grid">
                <ChevronDown size={15} aria-hidden />
              </motion.span>
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
}

/** Sets figures such as "10+" or "25+" in the figure colour. */
export function Figures({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d[\d,.]*\+?%?)/).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-mono font-medium text-figure">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
