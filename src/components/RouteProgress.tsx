"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Top-of-viewport progress bar that animates on every route change.
 *
 * No external dependency. Detects navigation by observing clicks on same-origin
 * anchor tags and hash changes, then flushes to 100% once the new pathname
 * settles.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<number | null>(null);
  const previousKey = useRef<string>("");

  function start() {
    setVisible(true);
    setProgress(10);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 8 : p));
    }, 180);
  }

  function finish() {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setProgress(100);
    window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
  }

  // Intercept clicks on same-origin anchors to start the bar.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = (event.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const anchor = target as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.target === "_blank") return;
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
        start();
      } catch {
        /* ignore */
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // When the route key changes, finish the bar.
  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (previousKey.current && previousKey.current !== key) {
      finish();
    }
    previousKey.current = key;
  }, [pathname, searchParams]);

  useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current);
    },
    []
  );

  if (!visible) return null;

  return (
    <div className="route-progress" role="progressbar" aria-label="Loading" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div className="route-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
