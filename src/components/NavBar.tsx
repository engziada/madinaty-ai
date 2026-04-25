"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LocaleCode, SiteContent } from "@/types/site";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChevronDown, MapPin, Bot } from "lucide-react";
import { cities } from "@/data/cities";
import { toggleLocalePath } from "@/lib/locale";

// Services for submenu (excluding AI Bot which is separate nav item)
const getServices = (locale: LocaleCode) => [
  { id: "rental", label: locale === "ar" ? "بوابة الإيجار" : "Rental Portal" },
  { id: "community-club", label: locale === "ar" ? "نادي الاهتمامات" : "Community Club" },
  { id: "poll", label: locale === "ar" ? "لوحة التصويت" : "Poll Board" },
  { id: "skills", label: locale === "ar" ? "تبادل المهارات" : "Skill Exchange" },
  { id: "services-dir", label: locale === "ar" ? "دليل الخدمات" : "Services Dir" },
  { id: "tutoring", label: locale === "ar" ? "الدروس الخصوصية" : "Tutoring" },
  { id: "activities", label: locale === "ar" ? "مكتشف الأنشطة" : "Activities" },
  { id: "marketplace", label: locale === "ar" ? "سوق مدينتي" : "Marketplace" },
  { id: "kitchen", label: locale === "ar" ? "المطابخ المنزلية" : "Ghost Kitchen" },
  { id: "business", label: locale === "ar" ? "معزز الأعمال" : "Business Booster" },
  { id: "summer", label: locale === "ar" ? "تدريب صيفي" : "Summer Training" },
];

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
  const logoSrc = theme === "light" ? "/logo-lite.jpeg" : "/logo.png";
  const services = useMemo(() => getServices(locale), [locale]);

  // When a user is on a non-home route (e.g. /coming-soon, /gallery, /founders),
  // bare `#services` / `#chat` / `#events` anchors have no target on the current
  // page and simply do nothing. Prefix them with the locale home so the router
  // navigates home AND the browser scrolls to the anchor on arrival.
  // On the home route itself we keep bare anchors so we don't needlessly
  // re-navigate (preserves smooth in-page scroll behavior).
  const isHome = pathname === homeHref || pathname === "/";
  const anchorBase = isHome ? "" : homeHref;

  const menuLabel = locale === "ar" ? "القائمة" : "Menu";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Scroll to service anchor.
  //
  // The services list lives inside `.service-bento-wrap`, which is itself a
  // scrollable container (`overflow-y: auto`, `max-height: 75vh`). A plain
  // `window.scrollTo` would only move the outer page and leave the target
  // item scrolled out of view INSIDE the inner container. `scrollIntoView`
  // walks the ancestor chain and scrolls every scrollable parent, so the
  // inner list and the window are both adjusted in one call.
  //
  // The fixed-header clearance is handled via `scroll-margin-top` on the
  // `.svc-card` targets (see globals.css) — the native scroller subtracts
  // that margin automatically, no manual offset math required.
  const scrollToService = useCallback((serviceId: string) => {
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Brief highlight so the user sees which card the nav jumped to.
      element.classList.add("svc-card-highlight");
      window.setTimeout(() => {
        element.classList.remove("svc-card-highlight");
      }, 1600);
    }
    closeMenu();
  }, [closeMenu]);

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
          <img
            src={logoSrc}
            alt="Madinaty AI"
            className="nav-logo"
            width={130}
            height={130}
            decoding="async"
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

          {/* Services Dropdown */}
          <NavDropdown label="Services" labelAr="الخدمات" locale={locale}>
            {services.map((service) => (
              <button
                key={service.id}
                className="nav-dropdown-item"
                onClick={() => scrollToService(service.id)}
                type="button"
              >
                {service.label}
              </button>
            ))}
          </NavDropdown>

          {/* AI Bot - Direct Nav Item */}
          <Link href={`${anchorBase}#chat`} className="nav-ai-bot" onClick={closeMenu}>
            <Bot size={16} />
            {locale === "ar" ? "مدينتي بوت" : "AI Bot"}
          </Link>

          {/* AI Tools */}
          <Link href={`${anchorBase}#ai-tools`} onClick={closeMenu}>
            {locale === "ar" ? "أدوات AI" : "AI Tools"}
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

          {/* More Dropdown */}
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
