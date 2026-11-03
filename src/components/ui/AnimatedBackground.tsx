/** Slow-drifting colour fields and film grain behind the whole page. Pure CSS, GPU-friendly. */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-noise" />
    </div>
  );
}
