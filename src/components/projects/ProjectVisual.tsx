import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { Project } from '../../data/types';
import { asset, cn } from '../../lib/utils';
import { PharmaTwinVisual } from './PharmaTwinVisual';

/**
 * Illustrated stand-ins for project screenshots. Set `image` on a project in data/projects.ts
 * to show a real screenshot instead.
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={asset(project.image.src)}
        alt={project.image.alt}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full rounded-xl border border-line object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
      />
    );
  }

  switch (project.visual) {
    case 'pharmatwin':
      return <PharmaTwinVisual />;
    case 'events':
      return <EventsVisual />;
    case 'hospital':
      return <HospitalVisual />;
    case 'finance':
      return <FinanceVisual />;
    case 'career':
      return <CareerVisual />;
    case 'advertising':
      return <AdvertisingVisual />;
  }
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Frame({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-canvas transition-transform duration-700 ease-out select-none group-hover:scale-[1.015]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-1/2 -right-1/4 size-[80%] rounded-full bg-accent/10 blur-3xl" />
      {children}
    </div>
  );
}

function WindowBar() {
  return (
    <div className="relative flex h-7 items-center gap-1.5 border-b border-line px-3">
      <span className="size-2 rounded-full bg-line-strong" />
      <span className="size-2 rounded-full bg-line-strong" />
      <span className="size-2 rounded-full bg-line-strong" />
      <span className="ml-3 h-1.5 w-20 rounded-full bg-line" />
    </div>
  );
}

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn('block h-1.5 rounded-full bg-line-strong', className)} style={{ width: w }} />;
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-line bg-glass-strong', className)}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Per-project illustrations                                           */
/* ------------------------------------------------------------------ */

const highlighted: Record<number, string> = { 9: 'bg-accent', 17: 'bg-violet', 18: 'bg-violet/60', 24: 'bg-accent/70' };

function EventsVisual() {
  return (
    <Frame>
      <WindowBar />
      <div className="relative grid h-[calc(100%-1.75rem)] grid-cols-[1.25fr_1fr] gap-3 p-3 sm:p-4">
        <Panel className="flex flex-col p-2.5 sm:p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <Bar w="38%" className="h-2 bg-ink/30" />
            <CalendarDays className="size-3.5 text-faint" />
          </div>
          <div className="grid flex-1 grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => (
              <span key={i} className={cn('rounded-[3px]', highlighted[i] ?? 'bg-line')} />
            ))}
          </div>
        </Panel>
        <div className="flex flex-col gap-2.5">
          {[
            { tone: 'bg-accent', stars: 5 },
            { tone: 'bg-violet', stars: 4 },
          ].map(({ tone, stars }, i) => (
            <Panel key={i} className="relative flex-1 overflow-hidden p-2.5 pl-3.5 sm:p-3 sm:pl-4">
              <span className={cn('absolute inset-y-0 left-0 w-1', tone)} />
              <Bar w="70%" className="h-2 bg-ink/30" />
              <Bar w="45%" className="mt-1.5" />
              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {['bg-accent/70', 'bg-violet/70', 'bg-sky/70'].map((c) => (
                    <span key={c} className={cn('size-3.5 rounded-full border border-canvas', c)} />
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className={cn('size-2.5', s < stars ? 'fill-accent text-accent' : 'text-line-strong')} />
                  ))}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const statusTones = ['bg-success/70', 'bg-accent/70', 'bg-violet/70', 'bg-success/70'];

function HospitalVisual() {
  return (
    <Frame>
      <WindowBar />
      <div className="relative flex h-[calc(100%-1.75rem)]">
        <div className="flex w-10 flex-col items-center gap-3 border-r border-line py-3 text-faint">
          <LayoutDashboard className="size-3.5 text-accent" />
          <UserRound className="size-3.5" />
          <CalendarDays className="size-3.5" />
          <Stethoscope className="size-3.5" />
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            {['from-accent/25', 'from-violet/25', 'from-sky/20'].map((g) => (
              <Panel key={g} className={cn('bg-linear-to-br to-transparent p-2', g)}>
                <Bar w="50%" />
                <Bar w="30%" className="mt-2 h-2.5 bg-ink/35" />
              </Panel>
            ))}
          </div>
          <Panel className="flex flex-1 flex-col justify-around px-2.5 py-1.5">
            {statusTones.map((tone, i) => (
              <div key={i} className="flex items-center gap-2.5 border-b border-line py-1 last:border-0">
                <span className="size-4 shrink-0 rounded-full bg-line-strong" />
                <div className="flex-1">
                  <Bar w={`${55 - i * 6}%`} className="bg-ink/25" />
                  <Bar w={`${35 + i * 4}%`} className="mt-1" />
                </div>
                <span className={cn('h-2 w-8 rounded-full', tone)} />
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </Frame>
  );
}

function FinanceVisual() {
  const r = 15.9155; // circumference = 100, so dash lengths read as percentages
  const segments = [
    { pct: 42, color: 'var(--accent)', offset: 25 },
    { pct: 28, color: 'var(--violet)', offset: 83 },
    { pct: 18, color: 'var(--sky)', offset: 55 },
  ];
  return (
    <Frame>
      <div className="absolute top-[6%] bottom-[6%] left-1/2 flex aspect-[9/17] -translate-x-1/2 flex-col rounded-[1.25rem] border border-line-strong bg-canvas-2 p-2.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-line-strong" />
        <Bar w="40%" />
        <Bar w="65%" className="mt-1.5 h-2.5 bg-ink/40" />
        <svg viewBox="0 0 42 42" className="mx-auto my-2.5 w-[62%]">
          <circle cx="21" cy="21" r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
          {segments.map((s) => (
            <circle
              key={s.color}
              cx="21"
              cy="21"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="5"
              strokeDasharray={`${s.pct} ${100 - s.pct}`}
              strokeDashoffset={s.offset}
            />
          ))}
        </svg>
        <div className="mt-auto space-y-1.5">
          {['bg-accent', 'bg-violet', 'bg-sky'].map((c, i) => (
            <div key={c} className="flex items-center gap-1.5">
              <span className={cn('size-1.5 rounded-full', c)} />
              <Bar w={`${60 - i * 12}%`} />
            </div>
          ))}
        </div>
      </div>
      <div className="liquid-glass absolute top-[16%] left-[7%] flex items-center gap-1.5 rounded-lg px-2 py-1.5 sm:left-[12%]">
        <Bell className="size-3 text-violet" />
        <span className="font-mono text-[0.6rem] text-ink">Budget alert</span>
      </div>
      <div className="liquid-glass absolute right-[7%] bottom-[16%] flex items-center gap-1.5 rounded-lg px-2 py-1.5 sm:right-[12%]">
        <TrendingUp className="size-3 text-success" />
        <span className="font-mono text-[0.6rem] text-ink">Income</span>
      </div>
    </Frame>
  );
}

function CareerVisual() {
  return (
    <Frame
      style={{ backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
    >
      {/* colour swatches */}
      <div className="absolute top-1/2 left-[7%] flex -translate-y-1/2 flex-col gap-1.5">
        {['bg-accent', 'bg-violet', 'bg-sky', 'bg-ink'].map((c) => (
          <span key={c} className={cn('size-3 rounded-full ring-1 ring-line-strong', c)} />
        ))}
      </div>

      {/* selected frame */}
      <div className="absolute top-[14%] bottom-[8%] left-[27%] aspect-[9/17]">
        <span className="absolute -top-4 left-0 font-mono text-[0.55rem] whitespace-nowrap text-accent">Career Guide / Home</span>
        <div className="relative h-full rounded-[1rem] border border-line-strong bg-canvas-2 p-2 outline outline-1 outline-offset-[3px] outline-accent">
          {['-top-[6px] -left-[6px]', '-top-[6px] -right-[6px]', '-bottom-[6px] -left-[6px]', '-right-[6px] -bottom-[6px]'].map((pos) => (
            <span key={pos} className={cn('absolute size-1.5 border border-accent bg-canvas', pos)} />
          ))}
          <Bar w="45%" />
          <Bar w="70%" className="mt-1 h-2 bg-ink/40" />
          <div className="mt-2 flex items-start gap-1 rounded-lg bg-accent/15 p-1.5">
            <Sparkles className="size-2.5 shrink-0 text-accent" />
            <div className="flex-1 space-y-1">
              <Bar w="90%" className="bg-accent/40" />
              <Bar w="60%" className="bg-accent/40" />
            </div>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="mt-1.5 flex items-center gap-1.5 rounded-md border border-line p-1">
              <span className={cn('size-3 shrink-0 rounded', i ? 'bg-violet/60' : 'bg-sky/60')} />
              <Bar w="60%" />
            </div>
          ))}
          <div className="absolute inset-x-2 bottom-2 flex justify-around border-t border-line pt-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn('size-1.5 rounded-full', i === 0 ? 'bg-accent' : 'bg-line-strong')} />
            ))}
          </div>
        </div>
      </div>

      {/* layers panel */}
      <Panel className="absolute top-[14%] right-[6%] w-[30%] p-2">
        <Bar w="40%" className="mb-2 bg-ink/30" />
        {['85%', '70%', '75%', '60%', '80%'].map((w, i) => (
          <div key={i} className={cn('flex items-center gap-1.5 rounded px-1 py-1', i === 1 && 'bg-accent/15')}>
            <span className={cn('size-2 shrink-0 rounded-sm border', i === 1 ? 'border-accent' : 'border-line-strong')} />
            <Bar w={w} className={i === 1 ? 'bg-accent/50' : undefined} />
          </div>
        ))}
      </Panel>
    </Frame>
  );
}

const barHeights = [34, 52, 44, 66, 58, 72, 61, 84, 70, 90, 76, 88];

function AdvertisingVisual() {
  const points = barHeights.map((h, i) => `${(i + 0.5) * (100 / barHeights.length)},${100 - h + 6}`).join(' ');
  return (
    <Frame>
      <WindowBar />
      <div className="relative grid h-[calc(100%-1.75rem)] grid-rows-[1fr_auto] gap-2.5 p-3 sm:p-4">
        <Panel className="relative p-2.5 sm:p-3">
          <div className="flex h-full items-end gap-1 sm:gap-1.5">
            {barHeights.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[3px] bg-linear-to-t from-accent/25 to-accent/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)]">
            <polyline points={points} fill="none" stroke="var(--violet)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </Panel>
        <div className="space-y-1.5">
          {[true, true, false].map((on, i) => (
            <Panel key={i} className="flex items-center gap-2.5 px-2.5 py-1.5">
              <span className={cn('size-2 rounded-full', ['bg-accent', 'bg-violet', 'bg-sky'][i])} />
              <Bar w={`${40 - i * 6}%`} className="bg-ink/25" />
              <span className={cn('ml-auto flex h-3 w-6 items-center rounded-full p-0.5', on ? 'justify-end bg-accent/70' : 'bg-line-strong')}>
                <span className="size-2 rounded-full bg-white" />
              </span>
            </Panel>
          ))}
        </div>
      </div>
    </Frame>
  );
}
