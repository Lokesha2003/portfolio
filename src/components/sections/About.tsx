import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { about, infoCards, interests, profile } from '../../data/profile';
import { easeOutExpo } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function About() {
  const [lead, ...rest] = about.statement;

  return (
    <Section id="about">
      <SectionHeading
        id="about"
        title={
          <>
            Two sides of software: <Accent>building</Accent> it and <Accent>running</Accent> it.
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-pretty text-xl leading-[1.55] tracking-[-0.01em] text-ink sm:text-2xl">{lead}</p>
          </Reveal>
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              <Languages className="size-4 text-faint" aria-hidden />
              <span className="font-mono text-xs tracking-wider text-faint uppercase">Languages</span>
              {profile.languages.join(' · ')}
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="font-mono text-xs tracking-[0.18em] text-faint uppercase">What I’m drawn to</h3>
          </Reveal>
          <ul className="mt-5 border-t border-line">
            {interests.map(({ icon: Icon, title, description }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -5% 0px' }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: easeOutExpo }}
                className="group flex items-center gap-4 border-b border-line py-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-glass text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium tracking-[-0.01em]">{title}</span>
                  <span className="block text-sm text-muted">{description}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {infoCards.map(({ icon: Icon, label, value, detail }, i) => (
          <Reveal as="li" key={label} delay={0.06 * i} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] tracking-[0.16em] text-faint uppercase">{label}</span>
                <Icon className="size-[18px] text-accent" aria-hidden />
              </div>
              <p className="mt-10 text-2xl font-medium tracking-[-0.03em]">{value}</p>
              <p className="mt-1.5 text-sm text-muted">{detail}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
