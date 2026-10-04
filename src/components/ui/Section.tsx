import type { ReactNode } from 'react';

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={`relative scroll-mt-20 py-10 sm:py-14 lg:py-16 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
