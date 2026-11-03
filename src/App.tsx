import { MotionConfig } from 'framer-motion';
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { BackToTop } from './components/ui/BackToTop';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SectionErrorBoundary, SectionSkeleton } from './components/ui/SectionStates';
import { useInitialHashScroll } from './hooks/useInitialHashScroll';

// The hero renders immediately; everything below the fold is code-split and streamed in.
const lazySections: { key: string; label: string; Component: LazyExoticComponent<ComponentType> }[] = [
  { key: 'about', label: 'About', Component: lazy(() => import('./components/sections/About')) },
  { key: 'skills', label: 'Skills', Component: lazy(() => import('./components/sections/Skills')) },
  { key: 'experience', label: 'Experience', Component: lazy(() => import('./components/sections/Experience')) },
  { key: 'projects', label: 'Projects', Component: lazy(() => import('./components/sections/Projects')) },
  { key: 'education', label: 'Education', Component: lazy(() => import('./components/sections/Education')) },
  { key: 'certifications', label: 'Certifications', Component: lazy(() => import('./components/sections/Certifications')) },
  { key: 'activities', label: 'Activities', Component: lazy(() => import('./components/sections/Activities')) },
  { key: 'contact', label: 'Contact', Component: lazy(() => import('./components/sections/Contact')) },
];

export default function App() {
  useInitialHashScroll();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1} className="relative overflow-x-clip focus:outline-none">
        <Hero />
        {lazySections.map(({ key, label, Component }) => (
          <SectionErrorBoundary key={key} label={label}>
            <Suspense fallback={<SectionSkeleton />}>
              <Component />
            </Suspense>
          </SectionErrorBoundary>
        ))}
      </main>

      <Footer />
      <BackToTop />
      <CustomCursor />
    </MotionConfig>
  );
}
