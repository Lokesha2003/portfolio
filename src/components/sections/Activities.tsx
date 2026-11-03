import { useState } from 'react';
import { activities, activityThemes } from '../../data/activities';
import type { ActivityTheme } from '../../data/types';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';

const filterButton =
  'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-[color,background-color,border-color] duration-300';

export default function Activities() {
  const [theme, setTheme] = useState<ActivityTheme | null>(null);
  const labelFor = (id: ActivityTheme) => activityThemes.find((t) => t.id === id)?.label ?? id;

  return (
    <Section id="activities">
      <SectionHeading
        id="activities"
        title={
          <>
            Leadership beyond the <Accent>keyboard</Accent>.
          </>
        }
        description="Roles outside the classroom, from leading clubs and representing SLIIT to singing with the university choir, where I’ve practised leadership, communication and working as part of a team."
      />

      <Reveal>
        <div role="group" aria-label="Highlight activities by quality" className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={theme === null}
            onClick={() => setTheme(null)}
            className={cn(filterButton, theme === null ? 'border-line-strong bg-glass-strong text-ink' : 'border-line text-muted hover:text-ink')}
          >
            All
          </button>
          {activityThemes.map(({ id, label }) => {
            const count = activities.filter((a) => a.themes.includes(id)).length;
            const active = theme === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setTheme(active ? null : id)}
                className={cn(filterButton, active ? 'border-accent/50 bg-accent/10 text-ink' : 'border-line text-muted hover:text-ink')}
              >
                {label}
                <span className="font-mono text-[0.7rem] text-faint">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <ul className="border-t border-line">
        {activities.map(({ id, role, organization, period, current, icon: Icon, themes }, i) => {
          const dimmed = theme !== null && !themes.includes(theme);
          return (
            <Reveal as="li" key={id} delay={0.04 * i}>
              <div
                className={cn(
                  'group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border-b border-line py-6 transition-opacity duration-500 sm:grid-cols-[8.5rem_auto_1fr_auto] sm:gap-x-6',
                  dimmed && 'opacity-30',
                )}
              >
                <p className="col-span-2 flex items-center gap-2 font-mono text-xs text-faint sm:col-span-1">
                  {current && <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-success text-success" />}
                  {period}
                </p>
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-glass text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-medium tracking-[-0.015em]">{role}</h3>
                  {organization && <p className="text-sm text-muted">{organization}</p>}
                </div>
                <ul className="col-span-2 flex flex-wrap gap-1.5 sm:col-span-1 sm:justify-end" aria-label="Qualities">
                  {themes.map((t) => (
                    <li
                      key={t}
                      className={cn(
                        'rounded-md border px-2 py-1 font-mono text-[0.68rem] transition-colors duration-300',
                        theme === t ? 'border-accent/50 bg-accent/10 text-ink' : 'border-line text-faint',
                      )}
                    >
                      {labelFor(t)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
