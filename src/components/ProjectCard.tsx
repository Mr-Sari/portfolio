import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';

/** GitHub / Live Demo buttons, rendered only for URLs that actually exist. */
export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { t } = useLanguage();
  const links = [
    project.githubUrl && { href: project.githubUrl, label: t.projects.github, icon: <GitHubIcon size={14} /> },
    project.demoUrl && { href: project.demoUrl, label: t.projects.demo, icon: <ExternalLink size={14} aria-hidden /> },
  ].filter((l): l is { href: string; label: string; icon: React.ReactElement } => Boolean(l));
  if (!links.length) return null;

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-1.5">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={compact ? `${l.label}: ${project.title} ${t.a11y.opensNewTab}` : undefined}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-[0.82rem] font-medium text-fg transition-[color,border-color,translate] hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
        >
          {l.icon}
          {l.label}
          {!compact && <span className="sr-only">{t.a11y.opensNewTab}</span>}
          <ArrowUpRight size={12} aria-hidden className="opacity-60 rtl:-scale-x-100" />
        </a>
      ))}
    </div>
  );
}
