import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Tag';

interface Props {
  project: Project;
  index: number;
  active: boolean;
  onActivate: () => void;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, index, active, onActivate, onOpen }: Props) {
  const { t } = useLanguage();
  const rows = [
    project.brief.problem && { label: t.projects.problem, text: project.brief.problem },
    { label: t.projects.solution, text: project.brief.solution },
    project.brief.result && { label: t.projects.result, text: project.brief.result },
  ].filter((r): r is { label: string; text: string } => Boolean(r));

  return (
    <article
      onPointerMove={spotlightMove}
      onClick={(e) => {
        // Tapping a side card brings it to the centre first.
        if (!active && !(e.target as HTMLElement).closest('a,button')) onActivate();
      }}
      className={`card spotlight group relative flex h-full flex-col overflow-hidden transition-[transform,opacity,border-color,box-shadow] duration-500 ease-out ${
        active ? 'scale-100 border-line-strong opacity-100 shadow-lift' : 'scale-[0.94] cursor-pointer opacity-50 hover:opacity-75'
      }`}
    >
      <div className="relative">
        <ProjectVisual visual={project.visual} className="h-28 border-b border-line transition-transform duration-700 group-hover:scale-[1.03] sm:h-36" />
        <span aria-hidden className="pointer-events-none absolute -top-3 end-3 font-mono text-[4.5rem] leading-none font-bold text-fg/[0.06] sm:text-[5.5rem]">
          {String(index).padStart(2, '0')}
        </span>
        <div className="absolute top-2.5 start-2.5 flex gap-1.5">
          <span className="rounded-full border border-line bg-bg-elevated/85 px-2 py-0.5 font-mono text-[0.62rem] text-fg-muted backdrop-blur">{project.start.slice(0, 4)}</span>
          <span className="rounded-full border border-line bg-bg-elevated/85 px-2 py-0.5 font-mono text-[0.62rem] text-fg-muted backdrop-blur">{t.kinds[project.kind]}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[1.05rem] leading-snug font-semibold tracking-tight text-fg sm:text-lg">{project.title}</h3>

        <dl className="mt-3 space-y-1.5">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[4.75rem_1fr] gap-2 text-[0.82rem] leading-snug">
              <dt className="pt-px font-mono text-[0.62rem] tracking-[0.08em] text-accent uppercase">{r.label}</dt>
              <dd className="text-fg-muted">{r.text}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-3 flex flex-wrap gap-1" aria-label={t.projects.technologies}>
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li>
              <Tag>+{project.technologies.length - 4}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full text-sm font-medium text-fg transition-colors hover:text-accent"
            aria-haspopup="dialog"
          >
            {t.projects.details}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
          <ProjectLinks project={project} compact />
        </div>
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
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 text-xs font-medium text-fg transition-[color,border-color,translate] hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
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
