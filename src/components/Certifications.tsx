import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp } from './ui/motion';

export function Certifications() {
  const { t, data, formatDate } = useLanguage();
  const certs = [...data.certifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section id="certifications">
      <SectionHeading id="certifications" kicker={t.certifications.kicker} title={t.certifications.title} intro={t.certifications.intro} />
      <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => (
          <motion.li
            key={cert.id}
            variants={fadeUp}
            onPointerMove={spotlightMove}
            className="card spotlight group flex flex-col p-5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-2xl border border-line bg-bg-elevated text-fg transition-[transform,color] duration-300 group-hover:-rotate-6 group-hover:text-accent">
                <TechIcon name={cert.issuerIcon} size={22} />
              </span>
              <time dateTime={cert.date} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] text-fg-subtle">
                {formatDate(cert.date)}
              </time>
            </div>
            <h3 className="mt-5 text-[0.98rem] leading-snug font-semibold tracking-tight text-fg">{cert.name}</h3>
            <p className="mt-1.5 text-sm text-fg-muted">{cert.issuer}</p>
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-wide text-accent uppercase">
                <BadgeCheck size={13} aria-hidden />
                {cert.category}
              </span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-fg-muted hover:text-accent"
                >
                  {t.certifications.credential}
                  <span className="sr-only">{t.a11y.opensNewTab}</span>
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  );
}
