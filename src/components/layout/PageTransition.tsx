import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition Component
 * Triggers a subtle, elegant fade and slight upward slide animation
 * whenever the route or page changes, preventing abrupt jarring cuts.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter min-h-full w-full">
      {children}
    </div>
  );
}
