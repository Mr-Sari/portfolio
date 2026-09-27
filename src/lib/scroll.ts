/** Smooth-scrolls to a section and moves keyboard focus there. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
  history.replaceState(null, '', id === 'home' ? '#top' : `#${id}`);
}
