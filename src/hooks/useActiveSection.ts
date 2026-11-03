import { useEffect, useState } from 'react';

/**
 * Returns the id of the last section (in page order) whose top has passed ~40% of the viewport.
 * Uses element lookups on scroll rather than IntersectionObserver because sections are lazy-loaded.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|');
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      if (atBottom && document.getElementById(sectionIds[sectionIds.length - 1])) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key]);

  return active;
}
