import type { PointerEvent } from 'react';

/** Pointer handler that feeds the `.spotlight` utility its --mx/--my position. */
export function spotlightMove(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
