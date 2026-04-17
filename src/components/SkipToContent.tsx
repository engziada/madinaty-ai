"use client";

import { usePathname } from "next/navigation";
import type { LocaleCode } from "@/types/site";

/**
 * Keyboard-only skip-to-main-content link. Visually hidden by default;
 * becomes visible on focus. Required for WCAG 2.4.1.
 */
export function SkipToContent() {
  const pathname = usePathname();
  const locale: LocaleCode = pathname?.startsWith("/ar") ? "ar" : "en";
  const label = locale === "ar" ? "تجاوز إلى المحتوى الرئيسي" : "Skip to main content";
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
