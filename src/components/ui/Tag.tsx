import type { ReactNode } from 'react';

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  const tones = {
    default: 'border-line bg-surface text-fg-muted',
    accent: 'border-transparent bg-accent-soft text-accent',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.72rem] leading-none ${tones[tone]}`}>
      {children}
    </span>
  );
}
