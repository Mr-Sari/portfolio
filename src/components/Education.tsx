import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { fadeUp } from './ui/motion';

/** Compact degree card: degree and institution beside GPA, honours and coursework. */
export function Education() {
  const { t, data, formatDate } = useLanguage();
  const edu = data.education[0];

  return (
    <Section id="education" className="border-t border-line bg-bg-sunken/40">
      <SectionHeader id="education" index="05" title={t.education.title} />
      <Reveal className="card grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <p className="font-mono text-[0.72rem] text-fg-subtle">
            {formatDate(edu.start)} – {formatDate(edu.end)} · {edu.location}
          </p>
          <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-fg sm:text-[2.3rem]">{edu.degree}</h3>
          <p className="mt-1 text-[0.95rem] font-medium text-accent">{edu.institution}</p>
          <p className="text-[0.85rem] text-fg-muted">{edu.college}</p>
        </div>
        <div className="md:border-s md:border-line md:ps-10">
          {edu.gpa && (
            <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
              <p className="flex items-baseline gap-2">
                <span className="text-[0.8rem] text-fg-muted">{t.education.gpa}</span>
                <span dir="ltr" className="inline-block font-mono">
                  <span className="text-[2rem] leading-none font-medium text-figure">{edu.gpa.value.toFixed(2)}</span>
                  <span className="text-sm text-fg-muted"> / {edu.gpa.scale}</span>
                </span>
              </p>
              {edu.honors && (
                <p className="inline-flex items-center gap-1.5 rounded-md bg-figure-soft px-2.5 py-1.5 text-[0.8rem] font-medium text-figure">
                  <Award size={14} aria-hidden />
                  {edu.honors}
                </p>
              )}
            </div>
          )}
          <h4 className="mt-5 mb-2 font-mono text-[0.68rem] text-fg-subtle">{t.education.coursework}</h4>
          <ul className="flex flex-wrap gap-1.5">
            {edu.coursework.map((c) => (
              <li key={c} className="rounded-md border border-line px-2 py-1 text-[0.8rem] text-fg-muted">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/** Certificate · issuer · date, as a compact two-column grid. */
export function Certifications() {
  const { t, data, formatDate } = useLanguage();

  return (
    <Section id="certifications" className="border-t border-line">
      <SectionHeader id="certifications" index="06" title={t.certifications.title} lede={t.certifications.lede} />
      <RevealGroup as="ol" step={0.06} className="grid gap-3 md:grid-cols-2">
        {data.certifications.map((cert) => (
          <motion.li
            key={cert.id}
            variants={fadeUp}
            className="card flex items-start gap-4 p-4 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent/40 sm:p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-bg-sunken/60 text-fg">
              <TechIcon name={cert.issuerIcon} size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.98rem] leading-snug font-semibold text-fg">{cert.name}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.82rem] text-fg-muted">
                <span>{cert.issuer}</span>
                <span aria-hidden className="text-fg-subtle">
                  ·
                </span>
                <span className="font-mono text-[0.78rem]">{formatDate(cert.date)}</span>
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-1 inline-flex items-center gap-1 text-[0.8rem] font-medium text-accent"
                >
                  {t.certifications.credential}
                  <span className="sr-only">{t.a11y.opensNewTab}</span>
                  <ArrowUpRight size={12} aria-hidden className="rtl:-scale-x-100" />
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  );
}
