import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/types';
import { spotlightMove } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

interface Props {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, onOpen }: Props) {
  const { t, data, formatDate } = useLanguage();
  const categoryLabels = project.categories.map((c) => data.projectCategories.find((pc) => pc.id === c)?.shortLabel ?? c);
  const end = project.end === 'Present' ? t.experience.present : formatDate(project.end);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.45, ease }}
      onPointerMove={spotlightMove}
      className="card spotlight group flex flex-col overflow-hidden transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift"
    >
      <div className="relative">
        <ProjectVisual visual={project.visual} className="aspect-[2/1] border-b border-line transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute top-3 start-3 rounded-full border border-line bg-bg-elevated/85 px-2.5 py-1 font-mono text-[0.66rem] text-fg-muted backdrop-blur">
          {t.kinds[project.kind]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] text-fg-subtle">
          <span className="text-accent">{categoryLabels.join(' · ')}</span>
          <span aria-hidden>/</span>
          <span>
            {formatDate(project.start)} – {end}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-fg">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.shortDescription}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-5 grid grid-cols-3 gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="flex flex-col rounded-xl border border-line bg-accent-soft/60 px-3 py-2.5">
                <dt className="order-2 text-[0.66rem] leading-tight text-fg-subtle">{m.label}</dt>
                <dd className="text-base font-semibold tracking-tight text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.projects.technologies}>
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.technologies.length > 5 && (
            <li>
              <Tag>+{project.technologies.length - 5}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full text-sm font-medium text-fg transition-colors hover:text-accent after:absolute after:inset-0 after:content-['']"
            aria-haspopup="dialog"
          >
            {t.projects.details}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
