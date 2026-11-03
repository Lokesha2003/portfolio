import { useState } from 'react';
import { profile } from '../../data/profile';
import { asset, cn } from '../../lib/utils';

interface ProfilePhotoProps {
  className?: string;
  /** Load eagerly with high priority (hero only). */
  priority?: boolean;
  sizes?: string;
}

/** Circular portrait with a monogram fallback if the image is missing or fails to load. */
export function ProfilePhoto({ className, priority = false, sizes }: ProfilePhotoProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const { photo } = profile;

  return (
    <div className={cn('relative overflow-hidden rounded-full bg-canvas-2', className)}>
      {status !== 'loaded' && (
        <div
          aria-hidden={status === 'loading'}
          role={status === 'error' ? 'img' : undefined}
          aria-label={status === 'error' ? photo.alt : undefined}
          className={cn(
            'absolute inset-0 grid place-items-center bg-linear-to-br from-accent/25 via-canvas-2 to-violet/25',
            status === 'loading' && 'shimmer',
          )}
        >
          {status === 'error' && (
            <span className="font-serif text-[2.5em] italic text-ink/80">{profile.initials}</span>
          )}
        </div>
      )}
      {status !== 'error' && (
        <img
          src={asset(photo.src)}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'relative size-full object-cover transition-opacity duration-700',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
}
