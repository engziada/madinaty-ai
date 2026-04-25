"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JoinModal } from "@/components/JoinModal";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/data/content";
import { detectLocaleFromPath } from "@/lib/locale";

/**
 * Client-side NavBar/Footer wrapper for all pages.
 *
 * Locale is re-derived from the live `pathname` on every route change so that
 * sub-pages (/founders, /gallery, /privacy-policy, …) and the /ar/* twins pick
 * the correct direction + translations without requiring a full page reload.
 */
export function RootNavFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useMemo(() => detectLocaleFromPath(pathname), [pathname]);
  const [mounted, setMounted] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep <html lang> + <body dir> in sync with the active locale so RTL flips
  // correctly when the user toggles locale on a sub-page client-side.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const content = getSiteContent(locale);

  // Prevent hydration mismatch - render minimal during SSR
  if (!mounted) {
    return (
      <>
        <div style={{ minHeight: "64px" }} />
        {children}
      </>
    );
  }

  return (
    <>
      <NavBar locale={locale} content={content} onOpenJoin={() => setJoinOpen(true)} />
      <PageShell>{children}</PageShell>
      <Footer content={content} locale={locale} />
      <JoinModal locale={locale} open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}
