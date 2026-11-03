import { Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

const iconButton =
  'grid size-11 place-items-center rounded-full border border-line bg-glass text-muted transition-[color,border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-glass-strong hover:text-ink';

/** Icon-only social links. LinkedIn renders as a non-link until a URL is added in data/profile.ts. */
export function SocialLinks({ className }: { className?: string }) {
  const { github, linkedin } = profile.socials;
  return (
    <ul className={cn('flex items-center gap-2.5', className)} aria-label="Social links">
      <li>
        <a href={github} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="GitHub profile (opens in a new tab)">
          <GitHubIcon className="size-[18px]" />
        </a>
      </li>
      <li>
        {linkedin ? (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="LinkedIn profile (opens in a new tab)">
            <LinkedInIcon className="size-[17px]" />
          </a>
        ) : (
          <span
            className="flex h-11 items-center gap-2 rounded-full border border-dashed border-line px-3.5 text-faint"
            title="LinkedIn profile coming soon"
          >
            <LinkedInIcon className="size-[15px]" />
            <span className="font-mono text-[0.68rem] uppercase tracking-wider">
              <span className="sr-only">LinkedIn profile </span>soon
            </span>
          </span>
        )}
      </li>
      <li>
        <a href={`mailto:${profile.email}`} className={iconButton} aria-label={`Email ${profile.email}`}>
          <Mail className="size-[18px]" />
        </a>
      </li>
    </ul>
  );
}
