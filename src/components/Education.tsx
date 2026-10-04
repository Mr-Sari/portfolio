import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { Reveal, RevealGroup } from './ui/Reveal';
import { SectionHeader } from './ui/Section';
import { fadeUp } from './ui/motion';

/** Education and certifications side by side, each under its own heading. */
export function Education() {
  const { t, data, formatDate } = useLanguage();
  const edu = data.education[0];

  return (
    <section id="education" tabIndex={-1} aria-labelledby="education-title" className="relative border-t border-line bg-bg-sunken/40 py-16 sm:py-20 lg:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeader id="education" index="05" title={t.education.title} size="md" />
          <Reveal className="card p-5 sm:p-7">
            <p className="font-mono text-[0.72rem] text-fg-subtle">
              {formatDate(edu.start)} – {formatDate(edu.end)} · {edu.location}
            </p>
            <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-fg sm:text-[2.2rem]">{edu.degree}</h3>
            <p className="mt-1 text-[0.95rem] font-medium text-accent">{edu.institution}</p>
            <p className="text-[0.85rem] text-fg-muted">{edu.college}</p>

            {edu.gpa && (
              <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-3 border-y border-line py-4">
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
          </Reveal>
        </div>

        <section id="certifications" aria-labelledby="certifications-title">
          <SectionHeader id="certifications" title={t.certifications.title} size="md" />
          <RevealGroup as="ol" step={0.07} className="card divide-y divide-line overflow-hidden">
            {data.certifications.map((cert) => (
              <motion.li key={cert.id} variants={fadeUp} className="flex items-start gap-4 p-4 sm:p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-bg-sunken/60 text-fg">
                  <TechIcon name={cert.issuerIcon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.95rem] leading-snug font-semibold text-fg">{cert.name}</p>
                  <p className="mt-0.5 text-[0.8rem] text-fg-muted">
                    {cert.issuer} · <span className="font-mono">{cert.date.slice(0, 4)}</span>
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
                <span className="hidden shrink-0 rounded-md bg-accent-soft px-2 py-1 text-[0.7rem] text-accent sm:inline">{cert.category}</span>
              </motion.li>
            ))}
          </RevealGroup>
        </section>
      </div>
    </section>
  );
}
