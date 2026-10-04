import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from './motion';

interface HeaderProps {
  id: string;
  /** Report-style section number, e.g. "02" (matches the nav). */
  index?: string;
  title: string;
  lede?: string;
  /** `quote` renders the lede as a serif pull-quote. */
  ledeStyle?: 'text' | 'quote';
  size?: 'lg' | 'md';
  className?: string;
}

/** Numbered section heading: index + drawn rule, serif title, optional lede. */
export function SectionHeader({ id, index, title, lede, ledeStyle = 'text', size = 'lg', className = '' }: HeaderProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className={`grid gap-4 ${lede ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-12' : ''} ${size === 'lg' ? 'mb-9 sm:mb-12' : 'mb-6'} ${className}`}
    >
      <div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
          className="mb-3 flex h-4 items-center gap-3 font-mono text-xs text-accent"
          aria-hidden
          lang="en"
        >
          {index}
          <motion.span
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease } } }}
            className="h-px w-12 origin-left bg-accent/50 rtl:origin-right"
          />
        </motion.div>
        <motion.h2
          id={`${id}-title`}
          variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          className={`text-balance font-serif leading-[0.98] tracking-[-0.015em] text-fg ${
            size === 'lg' ? 'text-[2.6rem] min-[400px]:text-5xl sm:text-6xl lg:text-[4.4rem]' : 'text-[2.1rem] sm:text-[2.6rem]'
          }`}
        >
          {title}
        </motion.h2>
      </div>
      {lede && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          className={
            ledeStyle === 'quote'
              ? 'text-pretty font-serif text-2xl leading-snug text-fg italic sm:text-[1.75rem] lg:pb-1'
              : 'max-w-md text-pretty text-[0.95rem] leading-relaxed text-fg-muted sm:text-base lg:pb-2'
          }
        >
          {lede}
        </motion.p>
      )}
    </motion.header>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Labelled by the header's title (`${id}-title`) unless overridden. */
  labelledBy?: string;
}

export function Section({ id, children, className = '', labelledBy }: SectionProps) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={labelledBy ?? `${id}-title`} className={`relative py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
