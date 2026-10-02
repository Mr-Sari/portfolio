import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { TechIcon } from '../lib/icons';
import { RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { BigTitle } from './ui/BigTitle';
import { fadeUp } from './ui/motion';

export function Certifications() {
  const { t, data, formatDate } = useLanguage();
  const certs = [...data.certifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section id="certifications">
      <BigTitle id="certifications" lead={t.certifications.title.lead} accent={t.certifications.title.accent} sub={t.certifications.sub} className="mb-8 sm:mb-10" />
      <RevealGroup as="ul" className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {certs.map((cert) => (
          <motion.li
            key={cert.id}
            variants={fadeUp}
            onPointerMove={spotlightMove}
            className="card spotlight group flex items-start gap-3 rounded-2xl p-3.5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-elevated text-fg transition-[transform,color] duration-300 group-hover:-rotate-6 group-hover:text-accent">
              <TechIcon name={cert.issuerIcon} size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm leading-snug font-semibold tracking-tight text-fg">{cert.name}</h3>
              <p className="mt-0.5 text-xs text-fg-muted">
                {cert.issuer} · <time dateTime={cert.date}>{formatDate(cert.date)}</time>
              </p>
              <p className="mt-1.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-[0.64rem] tracking-wide text-accent uppercase">
                  <BadgeCheck size={12} aria-hidden />
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
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                )}
              </p>
            </div>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  );
}
