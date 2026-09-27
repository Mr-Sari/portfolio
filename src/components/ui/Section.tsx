import type { ReactNode } from 'react';

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={`relative scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
