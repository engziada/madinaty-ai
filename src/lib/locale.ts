import type { LocaleCode } from "@/types/site";

/**
 * Detect the active locale from a Next.js pathname.
 *
 * Rules (evaluated in order):
 *   1. Paths under `/ar` (or exactly `/ar`) → "ar".
 *   2. Paths under `/en` (or exactly `/en`) → "en".
 *   3. Root-level sub-pages that have NO Arabic twin mounted (e.g. `/founders`,
 *      `/gallery`, `/privacy-policy`, `/terms-of-use`, `/vision-future`,
 *      `/coming-soon`) are English-by-content → "en".
 *   4. Bare `/` → "ar" (Arabic is the default home locale).
 */
export function detectLocaleFromPath(pathname: string | null | undefined): LocaleCode {
  if (!pathname) return "ar";
  // Normalize: strip trailing slashes (but keep "/").
  const p = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (p === "/ar" || p.startsWith("/ar/")) return "ar";
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/" || p === "") return "ar";
  // Any other root-level page is an English-only route today.
  return "en";
}

/**
 * Build the href for the opposite-locale version of the current pathname.
 *
 * Preserves sub-paths wherever a twin exists:
 *   - `/ar`              ↔ `/en`
 *   - `/`                → `/ar` (home is Arabic-default)
 *   - `/ar/founders`     → `/founders`
 *   - `/founders`        → `/ar/founders`
 *   - `/ar/privacy-policy` → `/privacy-policy`
 *   - `/en`              → `/ar`
 *   - `/en/anything`     → `/ar/anything`
 */
export function toggleLocalePath(
  pathname: string | null | undefined,
  currentLocale: LocaleCode,
): string {
  if (!pathname) return currentLocale === "ar" ? "/en" : "/ar";
  const p = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Currently Arabic → switch to English twin.
  if (p === "/ar") return "/en";
  if (p.startsWith("/ar/")) {
    const rest = p.slice(3); // "/ar/founders" → "/founders"
    // Root-level English pages live at `/<slug>`, not `/en/<slug>`.
    return rest || "/en";
  }

  // Currently English /en route → mirror under /ar.
  if (p === "/en") return "/ar";
  if (p.startsWith("/en/")) {
    const rest = p.slice(3); // "/en/foo" → "/foo"
    return `/ar${rest}`;
  }

  // Root home `/` → Arabic home.
  if (p === "/" || p === "") return "/ar";

  // Root-level English sub-pages → prefix with /ar.
  return `/ar${p}`;
}
