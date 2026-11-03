import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Cloud, GraduationCap, Terminal } from 'lucide-react';
import { Fragment, type MouseEvent, type ReactNode } from 'react';
import { profile } from '../../data/profile';
import { cn, easeOutExpo, scrollToSection } from '../../lib/utils';
import { LiveBadge } from '../ui/Badge';
import { ButtonLink } from '../ui/Button';
import { ProfilePhoto } from '../ui/ProfilePhoto';
import { Accent } from '../ui/Section';
import { SocialLinks } from '../ui/SocialLinks';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Renders the headline, wrapping accent words in the serif italic style. */
function Headline({ text, accents }: { text: string; accents: string[] }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {accents.includes(word) ? <Accent>{word}</Accent> : word}
        </Fragment>
      ))}
    </>
  );
}

function jumpTo(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(id);
  };
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

      <div className="container-x grid flex-1 items-center gap-12 pb-10 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item} className="flex items-center gap-3.5">
            <ProfilePhoto priority className="size-14 shrink-0 ring-1 ring-line-strong ring-offset-2 ring-offset-canvas lg:hidden" />
            <div className="min-w-0">
              <p className="flex items-center gap-2.5 text-lg font-medium tracking-[-0.01em]">
                <span aria-hidden className="hidden h-px w-8 bg-linear-to-r from-accent to-violet lg:block" />
                {profile.name}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted lg:pl-[2.6rem]">{profile.title}</p>
            </div>
          </motion.div>

          {profile.availability && (
            <motion.div variants={item} className="mt-6">
              <LiveBadge>{profile.availability}</LiveBadge>
            </motion.div>
          )}

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 text-balance text-[clamp(2.4rem,6.4vw,4.9rem)] leading-[1] font-medium tracking-[-0.045em]"
          >
            <Headline text={profile.headline} accents={profile.headlineAccents} />
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.ul variants={item} className="mt-5 flex flex-wrap gap-2" aria-label="Roles">
            {profile.roles.map((role) => (
              <li key={role} className="rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[0.72rem] text-muted">
                {role}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-7">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="#projects" onClick={jumpTo('projects')}>
                Explore My Work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" onClick={jumpTo('contact')}>
                Let’s Connect
              </ButtonLink>
            </div>
            <SocialLinks />
          </motion.div>
        </motion.div>

        <PortraitStage />
      </div>

      <ScrollCue />
    </section>
  );
}

function FloatingChip({
  icon,
  label,
  value,
  className,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 }}
        className="liquid-glass flex items-center gap-3 rounded-2xl py-2.5 pr-4 pl-2.5"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-glass-strong text-accent">{icon}</span>
        <span className="leading-tight">
          <span className="block font-mono text-[0.65rem] tracking-wider text-faint uppercase">{label}</span>
          <span className="block text-sm font-medium whitespace-nowrap">{value}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function PortraitStage() {
  return (
    <div className="relative hidden lg:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
        className="relative mx-auto aspect-square w-full max-w-[27rem]"
      >
        {/* glow */}
        <div aria-hidden className="absolute inset-[14%] rounded-full bg-linear-to-br from-accent/40 to-violet/40 blur-3xl" />
        {/* orbit rings */}
        <div aria-hidden className="absolute inset-0 rounded-full border border-line" />
        <div aria-hidden className="portrait-orbit absolute inset-0 rounded-full" />
        <div aria-hidden className="absolute inset-[7%] rounded-full border border-dashed border-line" />
        {/* portrait */}
        <div className="liquid-glass absolute inset-[13%] rounded-full p-2">
          <ProfilePhoto priority className="size-full" sizes="(min-width: 1024px) 22rem, 0px" />
        </div>

        <FloatingChip
          icon={<Terminal className="size-4" />}
          label="Currently"
          value="TechOps Intern · Virtusa"
          className="top-[6%] -left-[10%]"
          delay={0.9}
        />
        <FloatingChip
          icon={<GraduationCap className="size-4" />}
          label="Studying"
          value="BSc (Hons) IT · SLIIT"
          className="top-[48%] -right-[3%] xl:-right-[11%]"
          delay={1.05}
        />
        <FloatingChip
          icon={<Cloud className="size-4" />}
          label="Focus"
          value="DevOps · Cloud · Automation"
          className="bottom-[4%] -left-[4%]"
          delay={1.2}
        />
      </motion.div>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.a
      href="#about"
      onClick={jumpTo('about')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="group mx-auto mb-6 flex flex-col items-center gap-3 rounded-full px-3 py-2 text-faint transition-colors hover:text-ink"
      aria-label="Scroll to About section"
    >
      <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase">Scroll</span>
      <span className="relative flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
        <span className="scroll-cue block size-1 rounded-full bg-current" />
      </span>
    </motion.a>
  );
}
