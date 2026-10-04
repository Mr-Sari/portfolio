import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';
import { ProjectVisual } from './ProjectVisual';

interface Props {
  project: Project;
  index: number;
  total: number;
  active: boolean;
}

/**
 * Coverflow card face: project illustration on top, then index, category,
 * title and — when the CV has one — the headline figure. The case-study
 * strip under the carousel carries the detail for the active card.
 */
export function ProjectCard({ project, index, total, active }: Props) {
  const { t, data } = useLanguage();
  const category = data.projectCategories.find((c) => c.id === project.categories[0])?.label;
  const lead = project.metrics[0];

  return (
    <article
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-bg-elevated transition-[border-color,box-shadow] duration-500 ${
        active ? 'border-accent/70 shadow-[0_0_0_1px_var(--accent),0_30px_70px_-30px_var(--accent-glow)]' : 'border-line-strong'
      }`}
    >
      <ProjectVisual visual={project.visual} className="h-[55%] shrink-0 border-b border-line" />
      <div className="absolute top-3 start-3 flex gap-1.5">
        <span className="rounded-md border border-line bg-bg-elevated/90 px-2 py-1 font-mono text-[0.66rem] text-fg">{project.start.slice(0, 4)}</span>
        <span className="rounded-md border border-line bg-bg-elevated/90 px-2 py-1 text-[0.66rem] text-fg-muted">{t.kinds[project.kind]}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem]">
          {category && <span className="text-accent">{category}</span>}
          <span className="text-fg-subtle" lang="en" dir="ltr">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <h3 className="mt-2 text-balance text-xl leading-tight font-semibold tracking-tight text-fg sm:text-[1.45rem]">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-[0.85rem] leading-snug text-fg-muted">{project.shortDescription}</p>
        {lead && (
          <p className="mt-auto flex items-baseline gap-2 pt-3">
            <span className="font-mono text-2xl font-medium text-figure">{lead.value}</span>
            <span className="text-[0.78rem] text-fg-muted">{lead.label}</span>
          </p>
        )}
      </div>
    </article>
  );
}

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
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-bg-elevated px-3 text-[0.8rem] font-medium text-fg transition-[color,border-color,translate] hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
        >
          {l.icon}
          {l.label}
          {!compact && <span className="sr-only">{t.a11y.opensNewTab}</span>}
          <ArrowUpRight size={13} aria-hidden className="opacity-60 rtl:-scale-x-100" />
        </a>
      ))}
    </div>
  );
}
