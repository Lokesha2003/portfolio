import { Droplets, MapPin, Thermometer, type LucideIcon } from 'lucide-react';

const sensors: { y: number; label: string; icon: LucideIcon }[] = [
  { y: 100, label: 'TEMPERATURE', icon: Thermometer },
  { y: 200, label: 'HUMIDITY', icon: Droplets },
  { y: 300, label: 'GPS', icon: MapPin },
];

const sensorPaths = ['M106 100 C150 100 150 200 196 200', 'M106 200 L196 200', 'M106 300 C150 300 150 200 196 200'];
const streamPath = 'M308 200 L352 200';
const outputPaths = ['M464 200 C484 200 480 112 500 112', 'M464 200 C484 200 480 288 500 288'];

function Flow({ d, duration }: { d: string; duration: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="url(#pt-flow)" strokeWidth="1.5" className="flow-dash" />
      <circle r="3" fill="var(--accent)" className="motion-dot">
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
}

function Node({ x, y, w, h, title, sub, tone = 'line' }: { x: number; y: number; w: number; h: number; title: string; sub: string; tone?: 'line' | 'accent' | 'violet' }) {
  const stroke = tone === 'accent' ? 'var(--accent)' : tone === 'violet' ? 'var(--violet)' : 'var(--line-strong)';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="var(--canvas-2)" stroke={stroke} strokeOpacity={tone === 'line' ? 1 : 0.7} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" className="fill-ink" style={{ font: '500 14px var(--font-sans)' }}>
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="fill-faint" style={{ font: '400 10px var(--font-mono)' }}>
        {sub}
      </text>
    </g>
  );
}

function RiskNode({ y, title, level }: { y: number; title: string; level: number }) {
  return (
    <g>
      <rect x="500" y={y} width="108" height="64" rx="14" fill="var(--canvas-2)" stroke="var(--line-strong)" />
      <text x="514" y={y + 24} className="fill-ink" style={{ font: '500 12px var(--font-sans)' }}>
        {title}
      </text>
      <rect x="514" y={y + 38} width="80" height="5" rx="2.5" fill="var(--line)" />
      <rect x="514" y={y + 38} width={80 * level} height="5" rx="2.5" fill="url(#pt-risk)" />
    </g>
  );
}

/** Concept diagram of the cold-chain risk pipeline: sensors → stream → model → risk outputs. */
export function PharmaTwinVisual() {
  return (
    <div aria-hidden className="relative overflow-hidden rounded-xl border border-line bg-canvas">
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:none]" />
      <svg viewBox="0 0 620 400" className="relative block h-auto w-full">
        <defs>
          <linearGradient id="pt-flow" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
          <linearGradient id="pt-risk" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
          <radialGradient id="pt-glow">
            <stop offset="0" stopColor="var(--violet)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <text x="24" y="36" className="fill-faint" style={{ font: '500 10px var(--font-mono)', letterSpacing: '0.16em' }}>
          CONCEPT · COLD-CHAIN RISK PIPELINE
        </text>

        {sensorPaths.map((d, i) => (
          <Flow key={d} d={d} duration={2.4 + i * 0.4} />
        ))}
        <Flow d={streamPath} duration={1.4} />
        {outputPaths.map((d, i) => (
          <Flow key={d} d={d} duration={2 + i * 0.5} />
        ))}

        {sensors.map(({ y, label, icon: Icon }) => (
          <g key={label}>
            <circle cx="78" cy={y} r="28" fill="var(--canvas-2)" stroke="var(--line-strong)" />
            <Icon x={67} y={y - 11} width={22} height={22} color="var(--accent)" strokeWidth={1.75} />
            <text x="78" y={y + 46} textAnchor="middle" className="fill-faint" style={{ font: '500 9px var(--font-mono)', letterSpacing: '0.12em' }}>
              {label}
            </text>
          </g>
        ))}

        <Node x={196} y={170} w={112} h={60} title="Kafka" sub="event stream" tone="accent" />
        <circle cx="408" cy="200" r="70" fill="url(#pt-glow)" />
        <Node x={352} y={170} w={112} h={60} title="CNN-LSTM" sub="forecasting" tone="violet" />
        <RiskNode y={80} title="Excursion risk" level={0.62} />
        <RiskNode y={256} title="Delay risk" level={0.38} />
      </svg>
    </div>
  );
}
