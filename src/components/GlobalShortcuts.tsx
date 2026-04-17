"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

/**
 * Global keyboard shortcuts.
 *
 *   • "g h"  → jump to home (locale-aware)
 *   • "Esc"  → if a hash is present, strip it and scroll to top (handy exit)
 *
 * All shortcuts are ignored when the user is typing in an input/textarea/
 * contenteditable element so we never interfere with forms or the chat.
 */
export function GlobalShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let lastKeyTime = 0;
    let lastKey = "";

    function inEditable(target: EventTarget | null): boolean {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable === true
      );
    }

    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (inEditable(event.target)) return;

      const key = event.key.toLowerCase();

      // Esc → clear hash
      if (event.key === "Escape" && window.location.hash) {
        event.preventDefault();
        window.history.pushState(null, "", window.location.pathname + window.location.search);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Two-key combo: g then h → home
      if (lastKey === "g" && key === "h" && Date.now() - lastKeyTime < 900) {
        event.preventDefault();
        const target = pathname?.startsWith("/ar") ? "/ar" : "/en";
        router.push(target);
        lastKey = "";
        return;
      }

      lastKey = key;
      lastKeyTime = Date.now();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, pathname]);

  return null;
}
