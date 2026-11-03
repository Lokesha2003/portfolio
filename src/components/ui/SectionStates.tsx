import { RotateCw, TriangleAlert } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

/** Placeholder shown while a lazy-loaded section is being fetched. */
export function SectionSkeleton() {
  return (
    <div data-section-skeleton role="status" aria-label="Loading section" className="container-x py-24 sm:py-32">
      <div className="shimmer h-3 w-28 rounded-full" />
      <div className="shimmer mt-6 h-10 w-full max-w-xl rounded-xl" />
      <div className="shimmer mt-3 h-10 w-2/3 max-w-md rounded-xl" />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="shimmer h-44 rounded-2xl border border-line" />
        ))}
      </div>
    </div>
  );
}

interface SectionErrorBoundaryProps {
  label: string;
  children: ReactNode;
}

/** Keeps one broken section (e.g. a chunk that failed to download) from taking down the page. */
export class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label}] failed to render`, error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div role="alert" className="container-x py-16">
        <div className="glass flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
            <div>
              <p className="font-medium">The {this.props.label} section couldn’t load.</p>
              <p className="mt-1 text-sm text-muted">This is usually a network hiccup. Reloading the page normally fixes it.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-glass-strong"
          >
            <RotateCw className="size-4" aria-hidden />
            Reload
          </button>
        </div>
      </div>
    );
  }
}
