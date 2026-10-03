import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';
import { ProjectVisual } from './ProjectVisual';

interface Props {
  project: Project;
  index: number;
  active: boolean;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

/**
 * Coverflow card face: full-bleed project visual with the title overlaid at
 * the bottom and a "view full details" link. The active card gets the glowing
 * accent frame; the summary for it is shown below the carousel.
 */
export function ProjectCard({ project, index, active, onOpen }: Props) {
  const { t, data } = useLanguage();
  const category = data.projectCategories.find((c) => c.id === project.categories[0])?.label;

  return (
    <article
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[1.4rem] border bg-bg-elevated transition-[border-color,box-shadow] duration-500 ${active ? '' : 'pointer-events-none'} ${
        active ? 'border-accent shadow-[0_0_0_1px_var(--accent),0_18px_60px_-12px_var(--accent-glow),0_0_42px_-10px_var(--accent)]' : 'border-line-strong'
      }`}
    >
      {/* Visual fills the card */}
      <ProjectVisual visual={project.visual} className="absolute inset-x-0 top-0 h-[68%]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg-elevated from-30% via-bg-elevated/70 via-55% to-transparent" />
      <span aria-hidden className="pointer-events-none absolute -top-2 end-3 font-mono text-[4.5rem] leading-none font-bold text-fg/[0.07] sm:text-[5.5rem]">
        {String(index).padStart(2, '0')}
      </span>
      <div className="absolute top-3 start-3 flex gap-1.5">
        <span className="rounded-full border border-line bg-bg-elevated/85 px-2 py-0.5 font-mono text-[0.62rem] text-fg-muted backdrop-blur">{project.start.slice(0, 4)}</span>
        <span className="rounded-full border border-line bg-bg-elevated/85 px-2 py-0.5 font-mono text-[0.62rem] text-fg-muted backdrop-blur">{t.kinds[project.kind]}</span>
      </div>

      <div className="relative mt-auto p-5 sm:p-6">
        {category && <p className="mb-1.5 font-mono text-[0.64rem] tracking-[0.12em] text-accent uppercase">{category}</p>}
        <h3 className="text-balance text-xl leading-tight font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
        <button
          type="button"
          tabIndex={active ? 0 : -1}
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-haspopup="dialog"
          className="group mt-3 inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full text-[0.8rem] font-medium text-accent transition-colors hover:text-fg"
        >
          {t.projects.viewFull}
          <span className="sr-only">: {project.title}</span>
          <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </button>
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
