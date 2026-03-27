'use client';

interface SkeletonProps {
  className?: string;
  /** Number of text lines to render (default 3) */
  lines?: number;
  /** Show a circular avatar placeholder */
  avatar?: boolean;
}

/** Pulsing skeleton placeholder for loading states */
export default function Skeleton({ className = '', lines = 3, avatar = false }: SkeletonProps) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {avatar && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      )}
      {!avatar && Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}
