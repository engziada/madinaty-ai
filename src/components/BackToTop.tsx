"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { LocaleCode } from "@/types/site";

const SCROLL_THRESHOLD = 420;

interface Props {
  locale?: LocaleCode;
}

/**
 * Floating "back to top / hero" pill.
 *
 * Visibility rules:
 *   • Shown when vertical scroll exceeds SCROLL_THRESHOLD.
 *   • Also shown whenever the URL has a hash (e.g. #services, #map),
 *     so readers anchored deep into the page can always return home.
 *
 * Behaviour: clears the hash with history.pushState so the URL reverts
 * to the canonical home route, then smooth-scrolls to the top.
 */
export function BackToTop({ locale: explicitLocale }: Props = {}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [hasHash, setHasHash] = useState(false);

  const locale: LocaleCode = explicitLocale ?? (pathname?.startsWith("/ar") ? "ar" : "en");
  const label = locale === "ar" ? "العودة للأعلى" : "Back to top";
  const homeLabel = locale === "ar" ? "للرئيسية" : "Home";

  useEffect(() => {
    let ticking = false;

    const syncHash = () => {
      setHasHash(typeof window !== "undefined" && window.location.hash.length > 1);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    syncHash();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname]);

  const show = visible || hasHash;

  function handleClick() {
    // Strip any anchor hash so the URL bar returns to the canonical page.
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className={`back-to-top ${show ? "is-visible" : ""} ${hasHash ? "has-hash" : ""}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
    >
      <span className="back-to-top-icon" aria-hidden="true">↑</span>
      <span className="back-to-top-label">
        {hasHash ? homeLabel : label}
      </span>
    </button>
  );
}
