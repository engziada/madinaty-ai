"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { LocaleCode } from "@/types/site";

interface NewsItem {
  id: string;
  text: string;
  url?: string;
  source?: string;
  createdAt: string;
}

interface Props {
  locale?: LocaleCode;
}

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const DISMISS_KEY = "madinaty.marquee.dismissed";
const SECONDS_PER_ITEM = 10;
const MIN_DURATION_S = 60;

/**
 * Futuristic news ticker bar — glassmorphism, animated gradient border,
 * pulsing live indicator, and tech-style typography.
 *
 * Design:
 *   • Scrolls away naturally with the page (not sticky).
 *   • Dismissed state persisted in sessionStorage.
 *   • Animation duration scales with content count for constant visual speed.
 *   • Reduced motion: animation pauses; content becomes static list.
 *   • Fetched client-side so a slow RSS feed never blocks initial render.
 */
export function NewsMarquee({ locale: explicitLocale }: Props = {}) {
  const pathname = usePathname();
  const locale: LocaleCode = useMemo(() => {
    if (explicitLocale) return explicitLocale;
    return pathname?.startsWith("/ar") ? "ar" : "en";
  }, [pathname, explicitLocale]);

  const [items, setItems] = useState<NewsItem[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(`/api/news?limit=20&locale=${locale}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { items: NewsItem[] };
        if (alive && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      } catch {
        /* ignore */
      }
    }
    load();
    const id = window.setInterval(load, POLL_INTERVAL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [locale]);

  function handleDismiss(): void {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage blocked */
    }
  }

  if (dismissed || items.length === 0) {
    return null;
  }

  const label = locale === "ar" ? "آخر الأخبار" : "Live News";
  const closeLabel = locale === "ar" ? "إغلاق" : "Dismiss";
  const loop = [...items, ...items];
  const durationS = Math.max(MIN_DURATION_S, items.length * SECONDS_PER_ITEM);

  return (
    <aside className="news-ticker" role="complementary" aria-label={label}>
      {/* Animated top gradient border */}
      <div className="news-ticker-border" aria-hidden="true" />

      {/* Live badge with pulse */}
      <div className="news-ticker-badge">
        <span className="news-ticker-pulse" aria-hidden="true" />
        <span className="news-ticker-label">{label}</span>
      </div>

      {/* Scrolling track */}
      <div className="news-ticker-track-wrap">
        <div
          className="news-ticker-track"
          aria-live="off"
          style={{ animationDuration: `${durationS}s` }}
        >
          {loop.map((item, idx) => {
            const inner = (
              <>
                {item.source && (
                  <span className="news-ticker-source">
                    <bdi>{item.source}</bdi>
                  </span>
                )}
                <bdi>{item.text}</bdi>
              </>
            );
            return (
              <span key={`${item.id}-${idx}`} className="news-ticker-item">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
                <span className="news-ticker-sep" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" opacity="0.4" />
                  </svg>
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        className="news-ticker-close"
        aria-label={closeLabel}
        title={closeLabel}
        onClick={handleDismiss}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}
