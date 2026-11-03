import { useEffect } from 'react';

/**
 * Sections below the hero are lazy-loaded, so the browser can't jump to /#projects on first load.
 * Wait until the target exists and no section skeletons remain, then scroll to it.
 */
export function useInitialHashScroll(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let frame = 0;
    let attempts = 0;
    const tryScroll = () => {
      const target = document.getElementById(id);
      const stillLoading = document.querySelector('[data-section-skeleton]');
      if (target && !stillLoading) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
      if (attempts++ < 240) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, []);
}
