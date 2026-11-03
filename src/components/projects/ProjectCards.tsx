import { ArrowUpRight, Check, Circle, CircleCheck, CircleDashed } from 'lucide-react';
import type { Project, WorkStatus } from '../../data/types';
import { cn } from '../../lib/utils';
import { LiveBadge, TechBadge } from '../ui/Badge';
import { GitHubIcon } from '../ui/BrandIcons';
import { ButtonLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SpotlightCard } from '../ui/SpotlightCard';
import { ProjectVisual } from './ProjectVisual';

const statusMeta: Record<WorkStatus, { label: string; icon: typeof Circle; className: string }> = {
  implemented: { label: 'Implemented', icon: CircleCheck, className: 'text-success' },
  'in-progress': { label: 'In progress', icon: CircleDashed, className: 'text-accent' },
  planned: { label: 'Planned', icon: Circle, className: 'text-faint' },
};

function TechList({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="Technologies">
      {tech.map((t) => (
        <li key={t}>
          <TechBadge>{t}</TechBadge>
        </li>
      ))}
    </ul>
  );
}

/** Source/demo buttons. Renders nothing unless real links exist in the project data. */
function ProjectLinks({ project }: { project: Project }) {
  const { github, demo } = project.links ?? {};
  if (!github && !demo) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {demo && (
        <ButtonLink href={demo} external size="sm" aria-label={`${project.title} live demo (opens in a new tab)`}>
          Live demo
          <ArrowUpRight className="size-3.5" aria-hidden />
        </ButtonLink>
      )}
      {github && (
        <ButtonLink href={github} external size="sm" variant="secondary" aria-label={`${project.title} source code on GitHub (opens in a new tab)`}>
          <GitHubIcon className="size-3.5" />
          Source
        </ButtonLink>
      )}
    </div>
  );
}

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article id={`project-${project.id}`} aria-labelledby={`project-${project.id}-title`} className="group scroll-mt-28">
        <SpotlightCard className="overflow-hidden">
          <div className="grid lg:grid-cols-[1.08fr_1fr]">
            <div className="border-b border-line bg-canvas-2/30 p-3 sm:p-5 lg:border-r lg:border-b-0 lg:p-6">
              <div className="lg:sticky lg:top-28">
                <ProjectVisual project={project} />
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs tracking-[0.16em] text-faint uppercase">Featured · {project.category}</span>
                {project.status && <LiveBadge tone="accent">{project.status}</LiveBadge>}
              </div>

              <h3 id={`project-${project.id}-title`} className="mt-5 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                {project.title}
              </h3>
              {project.subtitle && <p className="mt-1.5 text-lg text-muted">{project.subtitle}</p>}
              <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

              {project.contribution && (
                <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.06] p-4 sm:p-5">
                  <p className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">My research component</p>
                  <p className="mt-2 font-medium tracking-[-0.01em]">{project.contribution.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.contribution.text}</p>
                </div>
              )}

              <h4 className="mt-8 font-mono text-xs tracking-[0.16em] text-faint uppercase">Research scope & progress</h4>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {project.features.map((feature) => {
                  const meta = statusMeta[feature.status ?? 'implemented'];
                  const Icon = meta.icon;
                  return (
                    <li key={feature.label} className="flex items-center gap-3 py-2.5 text-sm">
                      <Icon className={cn('size-4 shrink-0', meta.className)} aria-hidden />
                      <span className="flex-1 text-ink/90">{feature.label}</span>
                      <span className={cn('shrink-0 font-mono text-[0.65rem] tracking-wide uppercase', meta.className)}>{meta.label}</span>
                    </li>
                  );
                })}
              </ul>

              <TechList tech={project.tech} className="mt-7" />
              <ProjectLinks project={project} />
            </div>
          </div>
        </SpotlightCard>
      </article>
    </Reveal>
  );
}

export function ProjectCard({ project, index, wide }: { project: Project; index: number; wide?: boolean }) {
  return (
    <Reveal as="li" delay={0.06 * (index % 2)} className={cn(wide && 'md:col-span-2')}>
      <article id={`project-${project.id}`} aria-labelledby={`project-${project.id}-title`} className="group h-full scroll-mt-28">
        <SpotlightCard
          className={cn(
            'flex h-full flex-col overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1',
            wide && 'lg:flex-row',
          )}
        >
          <div className={cn('border-b border-line bg-canvas-2/30 p-3 sm:p-4', wide && 'lg:w-1/2 lg:shrink-0 lg:border-r lg:border-b-0 lg:p-5')}>
            <ProjectVisual project={project} />
          </div>

          <div className={cn('flex flex-1 flex-col p-6 sm:p-7', wide && 'lg:justify-center lg:p-10')}>
            <p className="font-mono text-xs tracking-[0.16em] text-faint uppercase">{project.category}</p>
            <h3 id={`project-${project.id}-title`} className="mt-3 text-xl font-medium tracking-[-0.025em] sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-5 grid gap-2 text-sm">
              {project.features.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-ink/85">{feature.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <TechList tech={project.tech} />
              <ProjectLinks project={project} />
            </div>
          </div>
        </SpotlightCard>
      </article>
    </Reveal>
  );
}
