import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedCounterProps {
  /** Target number to count up to */
  end: number;
  /** Starting number, defaults to 0 */
  start?: number;
  /** Animation duration in milliseconds, defaults to 2000 */
  duration?: number;
  /** String prefix (e.g. '$', '₹') */
  prefix?: string;
  /** String suffix (e.g. '+', '%', 'k') */
  suffix?: string;
  /** Number of decimal places, defaults to 0 */
  decimals?: number;
  /** Use comma thousand separators (e.g. 1,550 vs 1550). Defaults to false */
  useGrouping?: boolean;
  /** Additional CSS class names for styling */
  className?: string;
  /** Intersection threshold to trigger animation (0.0 to 1.0), defaults to 0.15 */
  threshold?: number;
}

/**
 * AnimatedCounter Component
 * Triggers a smooth count-up animation when scrolled into view.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  useGrouping = false,
  className = '',
  threshold = 0.15,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(start);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use IntersectionObserver to start counting only when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTimestamp: number | null = null;
          let animationFrameId: number;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic: fast start, smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOutCubic;

            setCurrentValue(current);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCurrentValue(end);
            }
          };

          animationFrameId = requestAnimationFrame(step);

          return () => {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
          };
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, start, duration, hasAnimated, threshold]);

  // Format the number
  const formatNumber = (num: number): string => {
    const fixed = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
    if (!useGrouping) return fixed;

    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <span ref={elementRef} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {formatNumber(currentValue)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
