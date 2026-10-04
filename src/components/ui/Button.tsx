import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg shadow-[0_8px_24px_-10px_var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_var(--accent)]',
  secondary: 'border border-line-strong bg-surface text-fg backdrop-blur hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent',
  ghost: 'text-fg-muted hover:bg-accent-soft hover:text-fg',
};

interface Common {
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & Common>(function Button(
  { variant = 'primary', icon, className = '', children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon}
    </button>
  );
});

export function LinkButton({ variant = 'primary', icon, className = '', children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & Common) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon}
    </a>
  );
}
