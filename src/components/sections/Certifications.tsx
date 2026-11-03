import { ArrowUpRight } from 'lucide-react';
import { certifications } from '../../data/education';
import type { Certification } from '../../data/types';
import { asset } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Accent, Section, SectionHeading } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

/** Stylised certificate used until a real certificate image is added in data/education.ts. */
function CertificatePreview({ cert }: { cert: Certification }) {
  if (cert.previewImage) {
    return (
      <img
        src={asset(cert.previewImage)}
        alt={`${cert.title} certificate`}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full rounded-lg border border-line object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-lg border border-line bg-linear-to-br from-canvas-2 via-canvas to-canvas-2 transition-transform duration-700 ease-out group-hover:-rotate-1 group-hover:scale-[1.02]"
    >
      <div className="absolute inset-3 rounded-md border border-line-strong" />
      <div className="absolute inset-[18px] rounded-sm border border-line" />
      <div className="relative flex w-3/4 flex-col items-center text-center">
        <span className="font-mono text-[0.55rem] tracking-[0.4em] text-faint uppercase sm:text-[0.6rem]">Certificate</span>
        <span className="mt-2 block h-2 w-3/5 rounded-full bg-ink/25" />
        <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-line-strong" />
        <span className="mt-4 block h-1 w-4/5 rounded-full bg-line" />
        <span className="mt-1 block h-1 w-3/5 rounded-full bg-line" />
      </div>
      <svg viewBox="0 0 80 24" className="absolute bottom-[14%] left-[14%] w-[18%] text-ink/40">
        <path d="M2 18c8-14 14 4 20-6s8 10 14 2 10-8 16 0 12-4 26-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="absolute right-[12%] bottom-[10%] grid size-11 place-items-center rounded-full bg-linear-to-br from-accent to-violet font-mono text-[0.6rem] font-medium text-white shadow-[0_0_24px_-4px_var(--accent)] sm:size-12">
        {cert.issuerShort}
      </span>
    </div>
  );
}

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        id="certifications"
        title={
          <>
            Courses & <Accent>credentials</Accent>.
          </>
        }
        description="Short courses alongside my degree, from computer science fundamentals to data visualization with Power BI."
      />

      <ul className="grid gap-6 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.id} delay={0.08 * i}>
            <SpotlightCard className="group flex h-full flex-col overflow-hidden">
              <div className="border-b border-line bg-canvas-2/30 p-3 sm:p-4">
                <CertificatePreview cert={cert} />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="font-mono text-xs text-faint">{cert.date}</p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">{cert.title}</h3>
                <p className="mt-1 text-muted">{cert.issuer}</p>
                {(cert.credentialId || cert.credentialUrl) && (
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    {cert.credentialId && (
                      <p className="font-mono text-xs text-faint">
                        Credential ID <span className="text-ink">{cert.credentialId}</span>
                      </p>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        Verify credential
                        <ArrowUpRight className="size-3.5" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
