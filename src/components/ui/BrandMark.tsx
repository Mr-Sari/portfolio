/** Rising-bars monogram, matching the favicon. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="8" className="fill-fg" />
      <rect x="7" y="18" width="4" height="7" rx="1" className="fill-accent" opacity=".5" />
      <rect x="14" y="13" width="4" height="12" rx="1" className="fill-accent" opacity=".75" />
      <rect x="21" y="7" width="4" height="18" rx="1" className="fill-accent" />
    </svg>
  );
}
