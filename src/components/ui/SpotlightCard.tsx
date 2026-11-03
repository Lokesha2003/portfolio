import { useRef, type HTMLAttributes, type PointerEvent } from 'react';
import { cn } from '../../lib/utils';

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Use the translucent glass surface (default true). */
  glass?: boolean;
};

/** A card with a soft glow and border highlight that follow the pointer. */
export function SpotlightCard({ className, glass = true, onPointerMove, children, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && event.pointerType === 'mouse') {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }
    onPointerMove?.(event);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn('spotlight rounded-2xl', glass && 'glass', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
