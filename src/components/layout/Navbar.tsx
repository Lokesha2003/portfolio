import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { primaryNav, sectionIndex, sections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTheme } from '../../hooks/useTheme';
import { cn, easeOutExpo, prefersReducedMotion, scrollToSection } from '../../lib/utils';
import { buttonClasses } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LogoMark } from './Logo';

const primaryIds = primaryNav.map((s) => s.id);

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(primaryIds);
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // The mobile menu doesn't exist on desktop widths.
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // While the menu is open: lock page scroll, close on Escape, move focus into the menu.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
  };

  const goToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    window.history.pushState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-500 ease-out sm:px-6',
        scrolled ? 'pt-3' : 'pt-4 sm:pt-6',
      )}
    >
      <motion.nav
        aria-label="Primary"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
        className="liquid-glass mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full pr-2 pl-2.5"
      >
        <a href="#top" onClick={goToTop} className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${profile.name}, back to top`}>
          <LogoMark />
          <span className="text-[0.95rem] font-medium tracking-[-0.01em] whitespace-nowrap">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {primaryNav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={goTo(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-glass-strong"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a href="#contact" onClick={goTo('contact')} className={buttonClasses('primary', 'sm', 'max-sm:hidden')}>
            Let’s talk
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-glass-strong lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -z-10 bg-canvas/70 backdrop-blur-sm"
            />
            <motion.div
              key="menu"
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
              className="liquid-glass mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-5xl origin-top overflow-y-auto rounded-3xl p-2"
            >
              <nav aria-label="Sections">
                <ul>
                  {sections.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease: easeOutExpo }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={goTo(item.id)}
                        aria-current={active === item.id ? 'location' : undefined}
                        className="group flex min-h-12 items-center gap-4 rounded-2xl px-4 py-3 text-lg tracking-[-0.01em] transition-colors hover:bg-glass-strong"
                      >
                        <span className="font-mono text-xs text-faint">{sectionIndex(item.id)}</span>
                        <span className="flex-1">{item.label}</span>
                        <ArrowUpRight className="size-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-2 pt-3 pb-1">
                <SocialLinks />
                <a href="#contact" onClick={goTo('contact')} className={buttonClasses('primary', 'sm', 'sm:hidden')}>
                  Let’s talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
