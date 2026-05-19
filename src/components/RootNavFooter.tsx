"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/data/content";
import { detectLocaleFromPath } from "@/lib/locale";

const CopilotJoinForm = dynamic(
  () => import("@/components/conversational/CopilotJoinForm").then((m) => m.CopilotJoinForm),
  { ssr: false }
);

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
  const [joinOpen, setJoinOpen] = useState(false);

  // Keep <html lang> + <body dir> in sync with the active locale so RTL flips
  // correctly when the user toggles locale on a sub-page client-side.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const content = getSiteContent(locale);

  return (
    <>
      <NavBar locale={locale} content={content} onOpenJoin={() => setJoinOpen(true)} />
      <PageShell>{children}</PageShell>
      <Footer content={content} locale={locale} />
      <CopilotJoinForm locale={locale} open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}
