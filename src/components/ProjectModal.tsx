import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Info, X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/types';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon } from '../lib/icons';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Tag';
import { ease } from './ui/motion';

interface Props {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: Props) {
  const { t, data, formatDate, dir } = useLanguage();
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const titleId = `project-${project.id}-title`;

  useEffect(() => {
    closeBtn.current?.focus();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialog.current) return;
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [onClose]);

  const categories = project.categories.map((c) => data.projectCategories.find((pc) => pc.id === c)?.label ?? c);
  const end = project.end === 'Present' ? t.experience.present : formatDate(project.end);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" dir={dir}>
      <motion.div
        className="absolute inset-0 bg-[rgb(3_6_10/0.55)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } }}
        exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98, transition: { duration: 0.2 } }}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] border border-line bg-bg-elevated shadow-lift sm:rounded-[1.75rem]"
      >
        <div className="relative shrink-0">
          <ProjectVisual visual={project.visual} className="h-36 border-b border-line sm:h-48" />
          <div className="absolute top-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-fg-subtle/40 sm:hidden" aria-hidden />
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label={t.a11y.closeDialog}
            className="absolute top-3 end-3 grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-bg-elevated/85 text-fg backdrop-blur transition-[transform,color] hover:rotate-90 hover:text-accent"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pt-6 pb-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-fg-subtle">
            <Tag tone="accent">{t.kinds[project.kind]}</Tag>
            {categories.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
            <span className="ms-1">
              {formatDate(project.start)} – {end}
            </span>
          </div>
          <h2 id={titleId} className="mt-4 text-balance text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-1.5 text-sm text-fg-subtle">{project.context}</p>

          {project.metrics.length > 0 && (
            <Block title={t.projects.metrics}>
              <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col rounded-2xl border border-line bg-accent-soft/60 p-4">
                    <dt className="order-2 mt-0.5 text-xs text-fg-subtle">{m.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight text-fg">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          <Block title={t.projects.overview}>
            <p>{project.overview}</p>
          </Block>

          <div className="grid gap-x-8 sm:grid-cols-2">
            <Block title={t.projects.problem}>
              {project.problem ? <p>{project.problem}</p> : <Note>{t.projects.problemMissing}</Note>}
            </Block>
            <Block title={t.projects.solution}>
              <p>{project.solution}</p>
            </Block>
          </div>

          <Block title={t.projects.methodology}>
            <ol className="space-y-2.5">
              {project.methodology.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-line font-mono text-[0.62rem] text-accent">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title={t.projects.impact}>
            {project.impact?.length ? (
              <ul className="space-y-2">
                {project.impact.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <Note>{t.projects.impactMissing}</Note>
            )}
          </Block>

          <Block title={t.projects.technologies}>
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={t.projects.links}>
            {project.links.length ? (
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <ExternalLink key={l.href} href={l.href}>
                    {l.label}
                  </ExternalLink>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-3">
                <Note>{t.projects.noLinks}</Note>
                <ExternalLink href={data.personal.github} icon={<GitHubIcon size={15} />}>
                  {t.projects.githubProfile}
                </ExternalLink>
              </div>
            )}
          </Block>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="mb-2.5 font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">{title}</h3>
      <div className="text-[0.95rem] leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 text-sm text-fg-subtle italic">
      <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

function ExternalLink({ href, children, icon }: { href: string; children: ReactNode; icon?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent"
    >
      {icon}
      {children}
      <span className="sr-only">{t.a11y.opensNewTab}</span>
      <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
