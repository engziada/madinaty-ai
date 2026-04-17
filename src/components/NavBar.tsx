"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LocaleCode, SiteContent } from "@/types/site";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavBarProps {
  locale: LocaleCode;
  content: SiteContent;
}

/**
 * Responsive top navigation with locale switching and theme toggle.
 *
 * Mobile UX:
 *   • Tapping any nav link closes the menu.
 *   • Escape key closes the menu.
 *   • Click outside closes the menu.
 *   • Hamburger has a 44×44 tap area (iOS guideline).
 *
 * Theming: uses logo-lite.jpeg on light theme, logo.png on dark theme.
 * Locale switch: AR → /en, EN → /ar.
 */
export function NavBar({ locale, content }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement | null>(null);

  const localePath = useMemo<string>(() => (locale === "ar" ? "/en" : "/ar"), [locale]);
  const comingSoonHref = locale === "ar" ? "/ar/coming-soon" : "/coming-soon";
  const homeHref = locale === "ar" ? "/ar" : "/en";
  const logoSrc = theme === "light" ? "/logo-lite.jpeg" : "/logo.png";

  const toggleLight = locale === "ar" ? "فاتح" : "Light";
  const toggleDark = locale === "ar" ? "داكن" : "Dark";
  const menuLabel = locale === "ar" ? "القائمة" : "Menu";
  const aiToolsLabel = locale === "ar" ? "أدوات الذكاء" : "AI Tools";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // Close on outside click.
  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen, closeMenu]);

  return (
    <header className="topbar" ref={navRef}>
      <div className="container nav-wrap">
        <Link className="brand" href={homeHref} onClick={closeMenu}>
          <img
            src={logoSrc}
            alt="Madinaty.AI"
            className="nav-logo"
            width={40}
            height={40}
            decoding="async"
          />
          <span className="brand-wordmark">Madinaty.AI</span>
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-label={menuLabel}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`nav ${menuOpen ? "open" : ""}`}
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
        >
          <a href="#chat" onClick={closeMenu}>{content.nav.platform}</a>
          <a href="#services" onClick={closeMenu}>{content.nav.services}</a>
          <a href="#ai-tools" onClick={closeMenu}>{aiToolsLabel}</a>
          <a href="#map" onClick={closeMenu}>{content.nav.map}</a>
          <Link
            href={locale === "ar" ? "/ar/vision-future" : "/vision-future"}
            onClick={closeMenu}
          >
            {content.nav.roadmap}
          </Link>
          <Link href={comingSoonHref} className="btn btn-primary" onClick={closeMenu}>
            {content.nav.cta}
          </Link>
          <ThemeToggle labelLight={toggleLight} labelDark={toggleDark} />
          <Link
            href={localePath}
            className="locale-btn"
            aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            title={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            lang={locale === "ar" ? "en" : "ar"}
            onClick={closeMenu}
          >
            {content.nav.localeSwitch}
          </Link>
        </nav>
      </div>
    </header>
  );
}
