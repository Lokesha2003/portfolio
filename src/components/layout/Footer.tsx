import { ArrowUpRight, Mail } from 'lucide-react';
import { sections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { LogoMark } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { github, githubHandle, linkedin } = profile.socials;

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-medium">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            IT undergraduate at SLIIT, working towards a career where software development meets DevOps and cloud engineering.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Sections</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted transition-colors hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Elsewhere</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
                <GitHubIcon className="size-4" />
                github.com/{githubHandle}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 break-all text-muted transition-colors hover:text-ink">
                <Mail className="size-4 shrink-0" aria-hidden />
                {profile.email}
              </a>
            </li>
            <li>
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-faint">
                  <LinkedInIcon className="size-4" />
                  LinkedIn, coming soon
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden className="container-x select-none">
        <p className="bg-linear-to-b from-ink/15 to-transparent bg-clip-text text-center text-[clamp(3rem,12.5vw,10.5rem)] leading-[0.8] font-medium tracking-[-0.05em] whitespace-nowrap text-transparent">
          {profile.name}
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 pr-20 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:pr-6 lg:pr-8">
          <p>
            © {year} {profile.name}
          </p>
          <p>Built with React, TypeScript, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
