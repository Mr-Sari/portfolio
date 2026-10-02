import { motion, useReducedMotion } from 'framer-motion';
import { Award, Download, MapPin, Quote } from 'lucide-react';
import type { ReactNode } from 'react';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { asset } from '../lib/assets';
import { TechIcon } from '../lib/icons';
import { BigTitle } from './ui/BigTitle';
import { RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { ease, fadeUp } from './ui/motion';

export function About() {
  const { t, data, formatDate } = useLanguage();
  const { about, personal, statements } = data;
  const edu = data.education[0];

  return (
    <Section id="about">
      <BigTitle id="about" lead={t.about.title.lead} accent={t.about.title.accent} className="mb-8 sm:mb-12" />

      <RevealGroup step={0.08} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {/* Who I am */}
        <Bento className="sm:col-span-2" label={t.about.who}>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-[0.95rem] leading-relaxed text-fg-muted sm:text-[1.05rem]">
              <Keywords text={p} words={about.keywords} />
            </p>
          ))}
        </Bento>

        {/* Education */}
        <Bento label={t.about.education} className="lg:row-span-2">
          <div className="flex items-start justify-between gap-3 lg:flex-col lg:items-center lg:text-center">
            <div className="lg:order-2">
              <p className="font-mono text-[0.68rem] text-fg-subtle">
                {formatDate(edu.start)} – {formatDate(edu.end)}
              </p>
              <h3 className="mt-1 text-base leading-snug font-semibold text-fg sm:text-lg">{edu.degree}</h3>
              <p className="mt-0.5 text-sm text-fg-muted">{edu.institution}</p>
              <p className="text-xs text-fg-subtle">{edu.college}</p>
              {edu.honors && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  <Award size={13} aria-hidden />
                  {edu.honors}
                </p>
              )}
            </div>
            {edu.gpa && <GpaRing value={edu.gpa.value} scale={edu.gpa.scale} label={t.about.gpa} outOf={t.about.outOf(edu.gpa.scale)} />}
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5 lg:justify-center">
            {edu.coursework.map((c) => (
              <li key={c} className="rounded-md border border-line bg-bg-elevated px-2 py-0.5 text-[0.7rem] text-fg-muted">
                {c}
              </li>
            ))}
          </ul>
        </Bento>

        {/* Philosophy */}
        <Bento label={t.about.philosophy}>
          <Quote size={26} aria-hidden className="mb-2 text-accent/50 rtl:-scale-x-100" />
          <p className="text-lg leading-snug font-medium tracking-[-0.01em] text-fg sm:text-xl">{statements.philosophy}</p>
        </Bento>

        {/* Based in + languages */}
        <Bento label={t.about.based}>
          <p className="flex items-center gap-2 text-base font-semibold text-fg">
            <MapPin size={17} className="text-accent" aria-hidden />
            {personal.location}
          </p>
          <p className="mt-4 mb-1.5 font-mono text-[0.64rem] tracking-[0.12em] text-fg-subtle uppercase">{t.about.languages}</p>
          <ul className="flex flex-wrap gap-1.5">
            {personal.languages.map((l) => (
              <li key={l.name} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg">
                {l.name}
                {l.level && <span className="text-fg-subtle"> · {l.level}</span>}
              </li>
            ))}
          </ul>
        </Bento>

        {/* Focus + resume */}
        <Bento label={t.about.focus} className="sm:col-span-2 lg:col-span-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {about.focusAreas.map((f, i) => (
                <li
                  key={f.title}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                    i === 0 ? 'border-accent/40 bg-accent-soft font-semibold text-fg' : 'border-line text-fg-muted'
                  }`}
                >
                  <TechIcon name={f.icon} size={16} className={i === 0 ? 'text-accent' : ''} />
                  {f.title}
                </li>
              ))}
            </ul>
            <a
              href={asset(personal.resume)}
              download="Sari-Owaid-Alsulami-Resume.pdf"
              className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-accent/50 px-4 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
            >
              <Download size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
              {t.hero.downloadResume}
            </a>
          </div>
        </Bento>
      </RevealGroup>
    </Section>
  );
}

function Bento({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <motion.article
      variants={fadeUp}
      onPointerMove={spotlightMove}
      className={`card spotlight group flex flex-col p-4 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-6 ${className}`}
    >
      <h3 className="mb-3 font-mono text-[0.66rem] tracking-[0.14em] text-accent uppercase">{label}</h3>
      {children}
    </motion.article>
  );
}

/** Highlights the given phrases inside a paragraph. */
function Keywords({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return (
    <>
      {text.split(re).map((part, i) =>
        words.includes(part) ? (
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

function GpaRing({ value, scale, label, outOf }: { value: number; scale: number; label: string; outOf: string }) {
  const reduce = useReducedMotion();
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = value / scale;
  return (
    <figure className="flex shrink-0 flex-col items-center gap-1 lg:order-1 lg:mb-1">
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
            transition={{ duration: 1.3, ease, delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-base font-semibold tracking-tight text-fg sm:text-xl">{value.toFixed(2)}</div>
      </div>
      <figcaption className="text-center text-[0.66rem] leading-tight text-fg-subtle">
        {label} {outOf}
      </figcaption>
    </figure>
  );
}
