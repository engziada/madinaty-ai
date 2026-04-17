"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

interface Options {
  active: boolean;
  onEscape?: () => void;
}

/**
 * Trap focus inside a container while `active` is true.
 *
 * • Focuses the first focusable element when activated.
 * • Restores focus to the element that was focused prior to activation.
 * • Cycles Tab / Shift+Tab inside the container.
 * • Optionally calls `onEscape` when the user presses Escape.
 */
export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { active, onEscape }: Options
): void {
  useEffect(() => {
    if (!active) return;

    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus first focusable inside the container.
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables[0] ?? container).focus({ preventScroll: true });

    function onKey(event: KeyboardEvent) {
      if (!container) return;

      if (event.key === "Escape" && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (nodes.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, onEscape, ref]);
}
