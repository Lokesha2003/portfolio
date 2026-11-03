import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import { ContactForm } from '../contact/ContactForm';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { Reveal } from '../ui/Reveal';
import { Accent, Eyebrow, Section } from '../ui/Section';

function CopyEmailButton() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 2200);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-colors duration-300 sm:px-3',
        state === 'copied' ? 'border-success/40 text-success' : 'border-line text-muted hover:border-line-strong hover:text-ink',
      )}
    >
      {state === 'copied' ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite" className="max-sm:sr-only">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy'}
      </span>
      <span className="sr-only">email address</span>
    </button>
  );
}

function ContactRow({
  icon,
  label,
  children,
  action,
  muted,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  action?: ReactNode;
  muted?: boolean;
}) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 rounded-2xl border bg-glass p-3 pl-4 sm:gap-4 sm:pl-3 sm:pr-3.5',
        muted ? 'border-dashed border-line' : 'border-line',
      )}
    >
      <span
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-glass-strong max-sm:hidden',
          muted ? 'text-faint' : 'text-accent',
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.65rem] tracking-[0.16em] text-faint uppercase">{label}</p>
        <div className="mt-0.5 text-[0.85rem] [overflow-wrap:anywhere] sm:text-[0.95rem]">{children}</div>
      </div>
      {action}
    </li>
  );
}

export default function Contact() {
  const { github, githubHandle, linkedin } = profile.socials;

  return (
    <Section id="contact" className="pb-12 sm:pb-20">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-10 lg:p-14">
          <div aria-hidden className="pointer-events-none absolute -top-48 -right-40 size-[30rem] rounded-full bg-accent/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-56 -left-40 size-[30rem] rounded-full bg-violet/15 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow id="contact" />
              <h2
                id="contact-title"
                className="mt-5 text-balance text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.04] font-medium tracking-[-0.04em]"
              >
                Have an Idea? Let’s Build <Accent>Something Amazing.</Accent>
              </h2>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted sm:text-lg">
                Whether it’s a role, a collaboration or a question about my work, I’d be glad to hear from you. Email is the
                quickest way to reach me.
              </p>

              <ul className="mt-10 space-y-3">
                <ContactRow icon={<Mail className="size-[18px]" aria-hidden />} label="Email" action={<CopyEmailButton />}>
                  <a href={`mailto:${profile.email}`} className="font-medium transition-colors hover:text-accent">
                    {profile.email}
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<GitHubIcon className="size-[18px]" />}
                  label="GitHub"
                  action={<ArrowUpRight className="mr-1 size-4 text-faint" aria-hidden />}
                >
                  <a href={github} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-accent">
                    github.com/{githubHandle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </ContactRow>
                {linkedin ? (
                  <ContactRow
                    icon={<LinkedInIcon className="size-[17px]" />}
                    label="LinkedIn"
                    action={<ArrowUpRight className="mr-1 size-4 text-faint" aria-hidden />}
                  >
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-accent">
                      LinkedIn profile
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </ContactRow>
                ) : (
                  <ContactRow icon={<LinkedInIcon className="size-[17px]" />} label="LinkedIn" muted>
                    <span className="text-faint">Profile link coming soon</span>
                  </ContactRow>
                )}
              </ul>
            </div>

            <div className="self-start rounded-2xl border border-line bg-canvas/30 p-5 sm:p-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
