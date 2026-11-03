import type { ReactNode } from 'react';
import { sectionIndex, sections } from '../../data/navigation';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative py-24 sm:py-32', className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Serif italic accent used for emphasised words in headings. */
export function Accent({ children, gradient = true }: { children: ReactNode; gradient?: boolean }) {
  return (
    <em
      className={cn(
        'font-serif text-[1.08em] font-normal italic tracking-[-0.01em]',
        gradient ? 'text-gradient pr-[0.06em]' : 'text-ink',
      )}
    >
      {children}
    </em>
  );
}

export function Eyebrow({ id, className }: { id: string; className?: string }) {
  const label = sections.find((s) => s.id === id)?.label ?? id;
  return (
    <p className={cn('flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted', className)}>
      <span className="text-accent">{sectionIndex(id)}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      {label}
    </p>
  );
}

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-14 max-w-3xl sm:mb-20', className)}>
      <Reveal>
        <Eyebrow id={id} />
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={`${id}-title`}
          className="mt-5 text-balance text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em]"
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
