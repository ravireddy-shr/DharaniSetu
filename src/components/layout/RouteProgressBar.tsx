import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Top Route Loading Progress Bar
 * Provides a subtle, premium loading bar at the top of the viewport
 * whenever the user changes routes/pages, giving smooth visual feedback.
 */
export function RouteProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress bar on route change
    setIsVisible(true);
    setProgress(25);

    const timer1 = setTimeout(() => {
      setProgress(65);
    }, 80);

    const timer2 = setTimeout(() => {
      setProgress(90);
    }, 180);

    const timer3 = setTimeout(() => {
      setProgress(100);
    }, 280);

    const timer4 = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 450);

    // Also smoothly scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [location.pathname, location.search]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#115E59] via-[#0D9488] to-[#D97706] shadow-[0_0_8px_rgba(17,94,89,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
          transition: progress === 100 ? 'width 0.15s ease-out, opacity 0.2s ease-in 0.1s' : 'width 0.25s ease-out',
        }}
      />
    </div>
  );
}
