import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type CursorState = 'hidden' | 'default' | 'interactive';

const INTERACTIVE = 'a, button, [role="button"], summary, label, select';
const TEXT_ENTRY = 'input, textarea, [contenteditable="true"]';

/**
 * A soft ring that trails the pointer and grows over interactive elements.
 * Desktop only (fine pointer + hover) and off when reduced motion is preferred.
 * The native cursor is never hidden, so precision and usability are unaffected.
 */
export function CustomCursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  return enabled ? <CursorRing /> : null;
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });
  const [state, setState] = useState<CursorState>('hidden');

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(TEXT_ENTRY)) setState('hidden');
      else if (target?.closest(INTERACTIVE)) setState('interactive');
      else setState('default');
    };
    const onLeave = () => setState('hidden');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] size-8 rounded-full border border-accent/60"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        opacity: state === 'hidden' ? 0 : 1,
        scale: state === 'interactive' ? 1.6 : 1,
        backgroundColor: state === 'interactive' ? 'rgb(91 140 255 / 0.1)' : 'rgb(91 140 255 / 0)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  );
}
