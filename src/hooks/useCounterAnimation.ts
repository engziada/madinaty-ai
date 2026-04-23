"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric counter from 0 to `target` when the element enters the viewport.
 *
 * Safety guarantees (PDF audit fix):
 *   - SSR renders 0 (matches client first paint, avoids hydration mismatch).
 *   - Respects `prefers-reduced-motion` (snaps to target, no animation).
 *   - If IntersectionObserver never fires within 2s (hidden tab, cached reload,
 *     off-screen, unsupported), snaps to `target`.
 *   - Observer-triggered path animates 0 -> target on scroll-into-view.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCounterAnimation(target: number, duration = 1800): { ref: React.RefObject<any>; value: number } {
  const ref = useRef<HTMLElement>(null);
  // IMPORTANT: start at 0 on SSR + first client render so the HTML matches
  // exactly across the hydration boundary. The safety snap-to-target below
  // runs only in the client effect, after hydration has completed.
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference — keep the final value, skip animation.
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }

    let rafId: number | null = null;
    let fallbackTimer: number | null = null;
    let didRun = false;

    const runAnimation = () => {
      if (didRun) return;
      didRun = true;
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      setValue(0);
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        runAnimation();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    // Safety: if observer never fires within 2s, snap to target (never stay at 0).
    fallbackTimer = window.setTimeout(() => {
      observer.disconnect();
      if (!didRun) {
        didRun = true;
        setValue(target);
      }
    }, 2000);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
    };
  }, [target, duration]);

  return { ref, value };
}
