"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric counter from 0 to `target` when the element enters the viewport.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCounterAnimation(target: number, duration = 1800): { ref: React.RefObject<any>; value: number } {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function step(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
