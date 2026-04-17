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

const POLL_INTERVAL_MS = 60_000;
const DISMISS_KEY = "madinaty.marquee.dismissed";
const SCROLL_HIDE_THRESHOLD = 60; // hide when user scrolls past this

/**
 * Top marquee bar streaming Madinaty community news.
 *
 * Design rules:
 *   • Positioned relatively — it scrolls AWAY on page scroll, so the
 *     sticky NavBar below takes its place at top=0. The marquee never
 *     covers the NavBar.
 *   • Extra protection: hides itself the moment the user starts scrolling
 *     down. Reappears only when scrolling back to the very top.
 *   • Dismissed state is persisted in sessionStorage so it stays hidden
 *     within a session but returns on next visit.
 *   • Reduced motion: animation pauses; content becomes a static list.
 *   • ARIA: live region but polite, so screen readers don't get spammed.
 */
export function NewsMarquee({ locale: explicitLocale }: Props = {}) {
  const pathname = usePathname();
  const locale: LocaleCode = useMemo(() => {
    if (explicitLocale) return explicitLocale;
    return pathname?.startsWith("/ar") ? "ar" : "en";
  }, [pathname, explicitLocale]);

  const [items, setItems] = useState<NewsItem[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

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

  // Hide on scroll-down, show again only at very top.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolledAway(window.scrollY > SCROLL_HIDE_THRESHOLD);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch + poll.
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/news?limit=20", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { items: NewsItem[] };
        if (alive && Array.isArray(data.items)) {
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
  }, []);

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

  return (
    <aside
      className={`marquee-bar ${scrolledAway ? "is-hidden" : ""}`}
      role="complementary"
      aria-label={label}
      aria-hidden={scrolledAway ? "true" : undefined}
    >
      <span className="marquee-badge" aria-hidden="true">
        <span className="marquee-dot" />
        {label}
      </span>

      <div className="marquee-track-wrap">
        <div className="marquee-track" aria-live="off">
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
