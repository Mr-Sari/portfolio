import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import type { Project } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

interface Props {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, onOpen }: Props) {
  const { t, data } = useLanguage();
  const categoryLabels = project.categories.map((c) => data.projectCategories.find((pc) => pc.id === c)?.label ?? c);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease }}
      onPointerMove={spotlightMove}
      className="card spotlight group flex flex-col overflow-hidden transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
    >
      <div className="relative">
        <ProjectVisual visual={project.visual} className="h-24 border-b border-line transition-transform duration-500 group-hover:scale-[1.02] sm:h-32" />
        <span className="absolute top-2.5 start-2.5 rounded-full border border-line bg-bg-elevated/85 px-2 py-0.5 font-mono text-[0.64rem] text-fg-muted backdrop-blur">
          {t.kinds[project.kind]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-1.5 font-mono text-[0.66rem] text-accent">{categoryLabels.join(' · ')}</p>
        <h3 className="text-base leading-snug font-semibold tracking-tight text-fg sm:text-[1.05rem]">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{project.shortDescription}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="inline-flex items-center gap-1">
                <Check size={12} className="text-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        )}

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
            className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full text-sm font-medium text-fg transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent"
            aria-haspopup="dialog"
          >
            {t.projects.details}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </motion.article>
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
