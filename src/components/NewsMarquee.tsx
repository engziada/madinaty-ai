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
  initialItems?: NewsItem[];
}

const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 min — server already caches 10 min
const DISMISS_KEY = "madinaty.marquee.dismissed";
/**
 * Per-item scroll time (seconds). Higher = slower. With an average headline
 * length ~60 chars, 5s/item gives ~12 chars/s — comfortable reading pace.
 */
const SECONDS_PER_ITEM = 10;
const MIN_DURATION_S = 60;

/**
 * Top marquee bar streaming Egypt news (Google News RSS).
 *
 * Design:
 *   • Positioned relatively — scrolls away naturally with the page. The
 *     sticky NavBar below takes over at top=0. The bar does NOT auto-hide
 *     on scroll (that caused a jarring "vanish" the moment you nudged the
 *     page).
 *   • Dismissed state is persisted in sessionStorage so a user who closes
 *     the bar doesn't see it again this session.
 *   • Animation duration scales with content width: more headlines = longer
 *     duration so the *visual* speed stays constant regardless of item
 *     count.
 *   • Reduced motion: animation pauses; content becomes a static list.
 *   • Initial items are SSR-provided so the bar never renders blank.
 */
export function NewsMarquee({ locale: explicitLocale, initialItems = [] }: Props = {}) {
  const pathname = usePathname();
  const locale: LocaleCode = useMemo(() => {
    if (explicitLocale) return explicitLocale;
    return pathname?.startsWith("/ar") ? "ar" : "en";
  }, [pathname, explicitLocale]);

  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [dismissed, setDismissed] = useState(false);

  // Restore dismissed state from sessionStorage (per tab / session).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  // Fetch + poll (skip first fetch if we already have SSR items in the
  // current locale — avoids an immediate refetch flicker).
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
    // Only skip the initial load when SSR items are present AND the
    // visitor's locale matches the SSR locale. Hard to detect the latter
    // reliably, so we always refresh once — cheap due to server cache.
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
  const closeLabel = locale === "ar" ? "إغلاق شريط الأخبار" : "Dismiss news bar";
  const loop = [...items, ...items]; // duplicate for seamless loop
  const durationS = Math.max(MIN_DURATION_S, items.length * SECONDS_PER_ITEM);

  return (
    <aside
      className="marquee-bar"
      role="complementary"
      aria-label={label}
    >
      <span className="marquee-badge" aria-hidden="true">
        <span className="marquee-dot" />
        {label}
      </span>

      <div className="marquee-track-wrap">
        <div
          className="marquee-track"
          aria-live="off"
          style={{ animationDuration: `${durationS}s` }}
        >
          {loop.map((item, idx) => {
            const inner = (
              <>
                {item.source && (
                  <strong>
                    <bdi>{item.source}</bdi>
                  </strong>
                )}
                <bdi>{item.text}</bdi>
              </>
            );
            return (
              <span key={`${item.id}-${idx}`} className="marquee-item">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
                <span className="marquee-sep" aria-hidden="true">•</span>
              </span>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="marquee-close"
        aria-label={closeLabel}
        title={closeLabel}
        onClick={handleDismiss}
      >
        <span aria-hidden="true">×</span>
      </button>
    </aside>
  );
}
