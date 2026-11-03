import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import { prefersReducedMotion } from '../lib/utils';

export type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#05060c', light: '#f5f6fa' };

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/** Dark by default; the initial value is set before first paint by the inline script in index.html. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    const commit = () => {
      applyTheme(next);
      flushSync(() => setTheme(next));
    };
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  }, []);

  return { theme, toggleTheme };
}
