import { motion, useReducedMotion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

export function Education() {
  const { t, data, formatDate } = useLanguage();

  return (
    <Section id="education">
      <SectionHeading id="education" kicker={t.education.kicker} title={t.education.title} />
      {data.education.map((edu) => (
        <Reveal key={edu.id}>
          <article className="card flex items-start gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {edu.honors && (
                  <Tag tone="accent">
                    <Award size={12} aria-hidden />
                    {edu.honors}
                  </Tag>
                )}
                <Tag>
                  {formatDate(edu.start)} – {formatDate(edu.end)}
                </Tag>
              </div>
              <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-fg sm:text-xl">{edu.degree}</h3>
              <p className="mt-0.5 text-sm text-fg-muted">
                <span className="font-medium text-fg">{edu.institution}</span> · {edu.college}
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-1.5">
                <li aria-hidden className="text-fg-subtle">
                  <BookOpen size={14} />
                </li>
                {edu.coursework.map((c) => (
                  <li key={c} className="rounded-md border border-line bg-bg-elevated px-2 py-0.5 text-xs text-fg-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            {edu.gpa && <GpaRing value={edu.gpa.value} scale={edu.gpa.scale} label={t.education.gpa} outOf={t.education.outOf(edu.gpa.scale)} />}
          </article>
        </Reveal>
      ))}
    </Section>
  );
}

function GpaRing({ value, scale, label, outOf }: { value: number; scale: number; label: string; outOf: string }) {
  const reduce = useReducedMotion();
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = value / scale;
  return (
    <figure className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative size-[4.5rem] sm:size-24">
        <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden>
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
          <motion.circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: reduce ? c * (1 - pct) : c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-base font-semibold tracking-tight text-fg sm:text-xl">{value.toFixed(2)}</div>
      </div>
      <figcaption className="text-center text-[0.68rem] leading-tight text-fg-subtle">
        {label}
        <br />
        {outOf}
      </figcaption>
    </figure>
  );
}
