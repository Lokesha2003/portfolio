import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { prefersReducedMotion } from '../../lib/utils';

export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 700));

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    if (window.location.hash) window.history.pushState(null, '', window.location.pathname + window.location.search);
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="liquid-glass group fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full text-ink sm:right-6 sm:bottom-6"
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--line)" strokeWidth="1.5" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
