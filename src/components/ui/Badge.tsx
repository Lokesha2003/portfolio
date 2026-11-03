import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function TechBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-glass px-2 py-1 font-mono text-[0.7rem] leading-none text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small pill with a pulsing dot, for "current" / "ongoing" states. */
export function LiveBadge({ children, tone = 'success' }: { children: ReactNode; tone?: 'success' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] leading-none',
        tone === 'success'
          ? 'border-success/25 bg-success/10 text-success'
          : 'border-accent/25 bg-accent/10 text-accent',
      )}
    >
      <span aria-hidden className={cn('pulse-dot size-1.5 rounded-full', tone === 'success' ? 'bg-success' : 'bg-accent')} />
      {children}
    </span>
  );
}
