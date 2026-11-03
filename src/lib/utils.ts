/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Resolve a file in /public against Vite's base URL, so the site also works under a sub-path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Smooth-scroll to a section (respecting reduced motion) and record it in the URL. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
}

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
