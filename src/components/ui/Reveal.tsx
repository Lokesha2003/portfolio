import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { easeOutExpo } from '../../lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Render as a list item so it can sit directly inside <ul>/<ol>. */
  as?: 'div' | 'li';
}

/** Fades and lifts content in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 22, as = 'div' }: RevealProps) {
  const Component = as === 'li' ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.75, delay, ease: easeOutExpo }}
    >
      {children}
    </Component>
  );
}
