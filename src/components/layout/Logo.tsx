import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative grid size-9 place-items-center rounded-full bg-linear-to-br from-accent to-violet text-[0.78rem] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_20px_-6px_var(--accent)]',
        className,
      )}
    >
      {profile.initials}
    </span>
  );
}
