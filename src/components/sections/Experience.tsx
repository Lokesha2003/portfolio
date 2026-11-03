import { experience } from '../../data/experience';
import type { Experience as ExperienceEntry } from '../../data/types';
import { asset } from '../../lib/utils';
import { LiveBadge, TechBadge } from '../ui/Badge';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        title={
          <>
            Keeping systems <Accent>healthy</Accent>, one ticket at a time.
          </>
        }
        description="My internship in Technology Operations: the L2 support work behind access, monitoring and incident response."
      />
      <ol className="space-y-12">
        {experience.map((job) => (
          <ExperienceItem key={job.id} job={job} />
        ))}
      </ol>
    </Section>
  );
}

function CompanyLogo({ job }: { job: ExperienceEntry }) {
  if (job.logo) {
    return (
      <img
        src={asset(job.logo)}
        alt={`${job.company} logo`}
        loading="lazy"
        className="size-14 shrink-0 rounded-2xl border border-line bg-white object-contain p-2"
      />
    );
  }
  return (
    <span
      aria-hidden
      title={`${job.company} logo placeholder`}
      className="grid size-14 shrink-0 place-items-center rounded-2xl border border-dashed border-line-strong bg-glass font-serif text-3xl text-ink italic"
    >
      {job.company.charAt(0)}
    </span>
  );
}

function ExperienceItem({ job }: { job: ExperienceEntry }) {
  return (
    <li className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <Reveal className="self-start lg:sticky lg:top-28">
        <p className="font-mono text-sm text-ink">
          {job.start} — {job.end}
        </p>
        <p className="mt-1 text-sm text-muted">{job.employmentType}</p>
        {job.current && (
          <div className="mt-4">
            <LiveBadge>Current role</LiveBadge>
          </div>
        )}
      </Reveal>

      <div className="relative pl-8 sm:pl-10">
        <span aria-hidden className="absolute top-3 bottom-0 left-[7px] w-px bg-linear-to-b from-accent via-line-strong to-transparent" />
        <span
          aria-hidden
          className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-canvas shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent),0_0_18px_var(--accent)]"
        />

        <Reveal delay={0.08}>
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <CompanyLogo job={job} />
              <div className="min-w-0">
                <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                  {job.role} <span className="text-faint">—</span> {job.team}
                </h3>
                <p className="mt-1 text-muted">{job.company}</p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{job.summary}</p>

            <h4 className="mt-8 font-mono text-xs tracking-[0.16em] text-faint uppercase">Key responsibilities</h4>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {job.responsibilities.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-glass px-3.5 py-3 text-sm transition-colors duration-300 hover:border-line-strong"
                >
                  <Icon className="size-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-ink/90">{text}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Areas">
              {job.tags.map((tag) => (
                <li key={tag}>
                  <TechBadge>{tag}</TechBadge>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </li>
  );
}
