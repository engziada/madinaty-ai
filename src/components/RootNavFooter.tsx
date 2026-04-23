"use client";

import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JoinModal } from "@/components/JoinModal";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/data/content";
import type { LocaleCode } from "@/types/site";

function detectLocale(): LocaleCode {
  if (typeof window === "undefined") return "ar";
  const path = window.location.pathname;
  if (path.startsWith("/en")) return "en";
  const stored = localStorage.getItem("locale") as LocaleCode | null;
  if (stored === "en" || stored === "ar") return stored;
  return "ar";
}

/**
 * Client-side NavBar/Footer wrapper for all pages.
 * Provides locale detection, NavBar, Footer, and global modals (Join).
 */
export function RootNavFooter({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>("ar");
  const [mounted, setMounted] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setMounted(true);
  }, []);

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
