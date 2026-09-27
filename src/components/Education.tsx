import { motion, useReducedMotion } from 'framer-motion';
import { Award, BookOpen, CalendarDays, MapPin } from 'lucide-react';
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
      <div className="grid gap-5">
        {data.education.map((edu) => (
          <Reveal key={edu.id}>
            <article className="card relative overflow-hidden">
              <div className="grid gap-8 p-6 sm:p-8 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {edu.honors && (
                      <Tag tone="accent">
                        <Award size={12} aria-hidden />
                        {edu.honors}
                      </Tag>
                    )}
                    <Tag>
                      <CalendarDays size={12} aria-hidden />
                      {formatDate(edu.start)} – {formatDate(edu.end)}
                    </Tag>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">{edu.degree}</h3>
                  <p className="mt-2 text-base font-medium text-fg">{edu.institution}</p>
                  <p className="mt-1 text-sm text-fg-muted">{edu.college}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-fg-subtle">
                    <MapPin size={13} aria-hidden />
                    {edu.location}
                  </p>

                  <h4 className="mt-7 mb-3 flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">
                    <BookOpen size={13} aria-hidden />
                    {t.education.coursework}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <li key={c} className="rounded-lg border border-line bg-bg-elevated px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                {edu.gpa && <GpaRing value={edu.gpa.value} scale={edu.gpa.scale} label={t.education.gpa} />}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function GpaRing({ value, scale, label }: { value: number; scale: number; label: string }) {
  const reduce = useReducedMotion();
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = value / scale;
  return (
    <figure className="flex items-center gap-5 md:flex-col md:justify-center">
      <div className="relative size-36 shrink-0">
        <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden>
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
          <motion.circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: reduce ? c * (1 - pct) : c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-3xl font-semibold tracking-tight text-fg">{value.toFixed(2)}</div>
            <div className="font-mono text-[0.68rem] text-fg-subtle">/ {scale.toFixed(1)}</div>
          </div>
        </div>
      </div>
      <figcaption className="text-sm text-fg-muted">
        {label} <span className="sr-only">{value} out of {scale}</span>
      </figcaption>
    </figure>
  );
}
