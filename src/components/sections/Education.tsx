import { education } from '../../data/education';
import { cn } from '../../lib/utils';
import { LiveBadge } from '../ui/Badge';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function Education() {
  return (
    <Section id="education">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-32">
          <SectionHeading
            id="education"
            className="mb-0 sm:mb-0"
            title={
              <>
                The path that <Accent>got me here</Accent>.
              </>
            }
            description="I completed my A/Levels in the Arts stream before moving into Information Technology at SLIIT."
          />
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute top-3 bottom-3 left-[11px] w-px bg-linear-to-b from-accent/80 via-line-strong to-transparent"
          />
          {education.map((item, i) => {
            const content = (
              <>
                <p className={cn('font-mono text-xs', item.current ? 'text-accent' : 'text-faint')}>{item.period}</p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] sm:text-2xl">{item.qualification}</h3>
                {item.detail && <p className="mt-1 text-ink/80">{item.detail}</p>}
                {item.institution && (
                  <p className="mt-1.5 text-muted">
                    {item.institution}
                    {item.location && <span className="text-faint">, {item.location}</span>}
                  </p>
                )}
                {item.current && (
                  <div className="mt-5">
                    <LiveBadge tone="accent">In progress</LiveBadge>
                  </div>
                )}
              </>
            );

            return (
              <Reveal as="li" key={item.id} delay={0.08 * i} className="relative pb-10 pl-12 last:pb-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-1 left-0 grid size-6 place-items-center rounded-full border bg-canvas',
                    item.current ? 'border-accent' : 'border-line-strong',
                  )}
                >
                  <span className={cn('size-2 rounded-full', item.current ? 'bg-accent shadow-[0_0_12px_var(--accent)]' : 'bg-line-strong')} />
                </span>
                {item.current ? <SpotlightCard className="-mt-2 p-6 sm:p-7">{content}</SpotlightCard> : <div className="pt-0.5">{content}</div>}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
