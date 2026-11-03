import { AnimatePresence, motion } from 'framer-motion';
import { MousePointerClick, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects } from '../../data/projects';
import { skillCategories } from '../../data/skills';
import type { Project } from '../../data/types';
import { cn, scrollToSection } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

const spanClass: Record<number, string> = {
  1: '',
  2: 'lg:col-span-2',
  3: 'md:col-span-2 lg:col-span-3',
};

/** Map of lower-cased tech name → projects that use it. */
function useSkillUsage() {
  return useMemo(() => {
    const usage = new Map<string, Project[]>();
    for (const project of projects) {
      for (const tech of project.tech) {
        const key = tech.toLowerCase();
        usage.set(key, [...(usage.get(key) ?? []), project]);
      }
    }
    return usage;
  }, []);
}

export default function Skills() {
  const usage = useSkillUsage();
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const current = hovered ?? selected;
  const currentProjects = current ? (usage.get(current.toLowerCase()) ?? []) : [];

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        title={
          <>
            A toolkit shaped by <Accent>real projects</Accent>.
          </>
        }
        description="The languages, frameworks and tools I’ve worked with across coursework and projects. Select any skill to see where it shows up in my work."
      />

      <div className="flex flex-col gap-6">
        <div className="sticky top-20 z-20 lg:top-auto lg:bottom-6 lg:order-last">
          <div aria-live="polite" className="liquid-glass flex min-h-16 items-center gap-3 rounded-2xl px-4 py-3 sm:px-5">
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2"
                >
                  <span className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs text-ink">{current}</span>
                  {currentProjects.length > 0 ? (
                    <>
                      <span className="text-sm text-muted">used in</span>
                      {currentProjects.map((p, i) => (
                        <span key={p.id} className="flex items-center gap-x-3">
                        {i > 0 && (
                          <span aria-hidden className="text-faint">
                            ·
                          </span>
                        )}
                        <a
                          href={`#project-${p.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(`project-${p.id}`);
                          }}
                          className="text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {p.title}
                        </a>
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="text-sm text-muted">Not used in the featured projects below.</span>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 items-center gap-3 text-sm text-muted"
                >
                  <MousePointerClick className="size-4 shrink-0 text-accent" aria-hidden />
                  <span>
                    Select a skill to see which projects use it.
                    <span className="hidden sm:inline">
                      {' '}
                      <span aria-hidden className="mx-1 inline-block size-1.5 -translate-y-px rounded-full bg-accent" /> marks skills
                      used in a featured project.
                    </span>
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Clear selected skill"
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-glass-strong hover:text-ink"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map(({ id, title, icon: Icon, skills, span = 1 }, i) => (
            <Reveal as="li" key={id} delay={0.04 * i} className={spanClass[span]}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-line bg-glass-strong text-accent">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <h3 className="font-medium tracking-[-0.01em]">{title}</h3>
                  </div>
                  <span className="pt-1 font-mono text-xs text-faint" aria-label={`${skills.length} skills`}>
                    {String(skills.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const isCurrent = current?.toLowerCase() === skill.toLowerCase();
                    const isUsed = usage.has(skill.toLowerCase());
                    return (
                      <li key={skill}>
                        <button
                          type="button"
                          aria-pressed={selected === skill}
                          onClick={() => setSelected((s) => (s === skill ? null : skill))}
                          onMouseEnter={() => setHovered(skill)}
                          onMouseLeave={() => setHovered(null)}
                          className={cn(
                            'inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-[color,background-color,border-color,box-shadow,transform] duration-300',
                            isCurrent
                              ? 'border-accent/50 bg-accent/12 text-ink shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_14%,transparent)]'
                              : 'border-line bg-glass text-muted hover:-translate-y-0.5 hover:border-line-strong hover:text-ink',
                          )}
                        >
                          {skill}
                          {isUsed && (
                            <>
                              <span aria-hidden className="size-1.5 rounded-full bg-accent/80" />
                              <span className="sr-only">(used in a featured project)</span>
                            </>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
