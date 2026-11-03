import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { FeaturedProject, ProjectCard } from '../projects/ProjectCards';
import { GitHubIcon } from '../ui/BrandIcons';
import { ButtonLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const lastIsWide = others.length % 2 === 1;

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        title={
          <>
            Things I’ve <Accent>designed</Accent>, <Accent>built</Accent> and <Accent>researched</Accent>.
          </>
        }
        description="From an AI-driven research project to full-stack, mobile and design work. Each card covers what the project does and the stack behind it."
      />

      <div className="space-y-6">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        <ul className="grid gap-6 md:grid-cols-2">
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} wide={lastIsWide && i === others.length - 1} />
          ))}
        </ul>
      </div>

      <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="text-muted">Find more of my code on GitHub.</p>
        <ButtonLink href={profile.socials.github} external variant="secondary">
          <GitHubIcon className="size-4" />
          github.com/{profile.socials.githubHandle}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
