import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const base =
  'group/btn relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_10px_30px_-10px_var(--accent)] hover:bg-accent-strong hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_14px_40px_-10px_var(--accent)]',
  secondary: 'glass text-ink hover:border-line-strong hover:bg-glass-strong',
  ghost: 'text-muted hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  external?: boolean;
};

export function ButtonLink({ variant, size, className, children, external, ...rest }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
