"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LocaleCode, SiteContent } from "@/types/site";

interface NavBarProps {
  locale: LocaleCode;
  content: SiteContent;
}

/**
 * Responsive top navigation with locale switching.
 */
export function NavBar({ locale, content }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const localePath = useMemo<string>(() => {
    if (locale === "ar") {
      return "/";
    }
    return "/ar";
  }, [locale]);

  const comingSoonHref = locale === "ar" ? "/ar/coming-soon" : "/coming-soon";

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link className="brand" href={locale === "ar" ? "/ar" : "/"}>
          <img src="/logo.png" alt="Madinaty AI" className="nav-logo" />
          Madinaty.AI
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#chat">{content.nav.platform}</a>
          <a href="#services">{content.nav.services}</a>
          <a href="#map">{content.nav.map}</a>
          <Link href={locale === "ar" ? "/ar/vision-future" : "/vision-future"}>{content.nav.roadmap}</Link>
          <Link href={comingSoonHref} className="btn btn-primary">
            {content.nav.cta}
          </Link>
          <Link href={localePath} className="locale-btn" aria-label="Switch language">
            {content.nav.localeSwitch}
          </Link>
        </nav>
      </div>
    </header>
  );
}
