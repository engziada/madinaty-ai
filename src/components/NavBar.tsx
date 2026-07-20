"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LocaleCode, SiteContent } from "@/types/site";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChevronDown, MapPin, Bot } from "lucide-react";
import { cities } from "@/data/cities";
import { toggleLocalePath } from "@/lib/locale";


interface DropdownProps {
  label: string;
  labelAr: string;
  locale: LocaleCode;
  children: React.ReactNode;
}

function NavDropdown({ label, labelAr, locale, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="nav-dropdown" onKeyDown={handleKeyDown}>
      <button
        className="nav-dropdown-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        {locale === "ar" ? labelAr : label}
        <ChevronDown size={14} className={open ? "rotated" : ""} />
      </button>
      {open && <div className="nav-dropdown-menu">{children}</div>}
    </div>
  );
}

interface NavBarProps {
  locale: LocaleCode;
  content: SiteContent;
  onOpenJoin?: () => void;
}

/**
 * Responsive top navigation with locale switching and theme toggle.
 * Services submenu with scroll-to-anchor functionality.
 */
export function NavBar({ locale, content, onOpenJoin }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();
  const localePath = useMemo<string>(() => toggleLocalePath(pathname, locale), [pathname, locale]);
  const comingSoonHref = locale === "ar" ? "/ar/coming-soon" : "/coming-soon";
  const homeHref = locale === "ar" ? "/ar" : "/en";
  const logoSrc = theme === "light" ? "/madinaty_logo-lite.svg" : "/madinaty_logo_dark.svg";

  const isHome = pathname === homeHref || pathname === "/";
  const anchorBase = isHome ? "" : homeHref;

  const menuLabel = locale === "ar" ? "القائمة" : "Menu";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // Close on outside click
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
        <Link className="brand" href={homeHref} onClick={closeMenu} aria-label="Madinaty AI Home">
          <Image
            src={logoSrc}
            alt="Madinaty AI"
            className="nav-logo"
            width={40}
            height={40}
            priority
          />
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
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`nav ${menuOpen ? "open" : ""}`}
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
        >
          {/* Primary Nav */}
          <Link href={homeHref} className="nav-home" onClick={closeMenu}>
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>

          {/* Services Link */}
          <Link href={`${anchorBase}#services`} onClick={closeMenu}>
            {locale === "ar" ? "الخدمات" : "Services"}
          </Link>

          {/* AI Lab - Courses Index */}
          <Link
            href={locale === "ar" ? "/ar/course" : "/en/course"}
            className="nav-ai-bot"
            onClick={closeMenu}
          >
            <Bot size={16} />
            {locale === "ar" ? "مركز الإبتكار و التطوير" : "AI Innovation Lab"}
          </Link>

          {/* AI Tools */}
          <Link href={locale === "ar" ? "/ar/ai-tools" : "/ai-tools"} onClick={closeMenu}>
            {locale === "ar" ? "أدوات إحترافية" : "AI Tools"}
          </Link>

          {/* City Selector */}
          <NavDropdown label="Cities" labelAr="المدن" locale={locale}>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={
                  city.active
                    ? homeHref
                    : `${comingSoonHref}?c=${city.slug}`
                }
                className={`nav-dropdown-item ${city.active ? "active" : ""}`}
                onClick={closeMenu}
              >
                <MapPin size={14} />
                {locale === "ar" ? city.nameAr : city.name}
              </Link>
            ))}
          </NavDropdown>

          {/* More Dropdown (Disabled for now)
          <NavDropdown label="More" labelAr="المزيد" locale={locale}>
            <Link href={locale === "ar" ? "/ar/gallery" : "/gallery"} onClick={closeMenu} className="nav-dropdown-item">
              {locale === "ar" ? "معرض الصور" : "Gallery"}
            </Link>
            <Link href={locale === "ar" ? "/ar/founders" : "/founders"} onClick={closeMenu} className="nav-dropdown-item">
              {locale === "ar" ? "المؤسسون" : "Founders"}
            </Link>
            <Link href={locale === "ar" ? "/ar/vision-future" : "/vision-future"} onClick={closeMenu} className="nav-dropdown-item">
              {content.nav.roadmap}
            </Link>
            <Link href={`${anchorBase}#events`} onClick={closeMenu} className="nav-dropdown-item">
              {locale === "ar" ? "الفعاليات" : "Events"}
            </Link>
          </NavDropdown>
          */}

          {/* CTA + Controls */}
          <button
            className="btn btn-primary nav-cta"
            onClick={() => { closeMenu(); onOpenJoin?.(); }}
            type="button"
          >
            {locale === "ar" ? "سجّل" : "Join"}
          </button>
          <div className="nav-controls">
            <ThemeToggle labelLight="" labelDark="" />
            <Link
              href={localePath}
              className="locale-btn"
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              title={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              lang={locale === "ar" ? "en" : "ar"}
              onClick={closeMenu}
            >
              {locale === "ar" ? "EN" : "عربي"}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
