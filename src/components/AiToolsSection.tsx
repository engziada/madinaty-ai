"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LocaleCode } from "@/types/site";
import { getAiTools } from "@/data/aiTools";

interface Props {
  locale: LocaleCode;
}

/**
 * AI Tools showcase — category filter + search + grouped tool cards.
 *
 * A11y / UX enhancements:
 *   • `role="tablist"` with roving arrow-key navigation across filters.
 *   • Active category persisted in the URL as `?category=` so views are
 *     shareable / bookmarkable.
 *   • Live search box filters tools by name or tagline.
 */
export function AiToolsSection({ locale }: Props) {
  const copy = useMemo(() => getAiTools(locale), [locale]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCategory = searchParams?.get("category") ?? "all";
  const [activeId, setActiveId] = useState<string>(urlCategory);
  const [query, setQuery] = useState<string>("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Keep state in sync when URL changes externally (back/forward nav).
  useEffect(() => {
    setActiveId(urlCategory);
  }, [urlCategory]);

  const allLabel = locale === "ar" ? "الكل" : "All";
  const searchPlaceholder =
    locale === "ar" ? "ابحث عن أداة... (مثل: ChatGPT)" : "Search tools (e.g. ChatGPT)";
  const noResultsLabel = locale === "ar" ? "لا توجد نتائج." : "No results.";
  const emptyHintLabel =
    locale === "ar"
      ? "جرّب كلمات بحث مختلفة أو اعرض كل الفئات."
      : "Try a different keyword or show all categories.";
  const clearSearchLabel = locale === "ar" ? "مسح البحث" : "Clear search";
  const showAllCategoriesLabel = locale === "ar" ? "عرض كل الفئات" : "Show all categories";

  const updateCategory = useCallback(
    (id: string) => {
      setActiveId(id);
      const params = new URLSearchParams(Array.from(searchParams?.entries?.() ?? []));
      if (id === "all") {
        params.delete("category");
      } else {
        params.set("category", id);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}#ai-tools` : `${pathname}#ai-tools`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const trimmedQuery = query.trim().toLowerCase();
  const hasQuery = trimmedQuery.length > 0;

  const visibleCategories = useMemo(() => {
    const base = activeId === "all" ? copy.categories : copy.categories.filter((c) => c.id === activeId);
    if (!hasQuery) return base;
    return base
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter((t) => {
          const hay = `${t.name} ${t.tagline ?? ""}`.toLowerCase();
          return hay.includes(trimmedQuery);
        })
      }))
      .filter((c) => c.tools.length > 0);
  }, [copy.categories, activeId, trimmedQuery, hasQuery]);

  const visibleToolsCount = visibleCategories.reduce((sum, cat) => sum + cat.tools.length, 0);
  const metaLabel =
    locale === "ar"
      ? `يعرض الآن ${visibleToolsCount} أدوات ضمن ${visibleCategories.length} فئات`
      : `Showing ${visibleToolsCount} tools in ${visibleCategories.length} categories`;

  const tabIds = ["all", ...copy.categories.map((c) => c.id)];

  function focusTab(index: number) {
    const clamped = (index + tabIds.length) % tabIds.length;
    const el = tabRefs.current[clamped];
    if (el) {
      el.focus();
      updateCategory(tabIds[clamped]);
    }
  }

  function onTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    // Roving tabindex: arrows navigate, Home/End jump to edges.
    const forwardKey = locale === "ar" ? "ArrowLeft" : "ArrowRight";
    const backKey = locale === "ar" ? "ArrowRight" : "ArrowLeft";

    if (event.key === forwardKey) {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === backKey) {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(tabIds.length - 1);
    }
  }

  return (
    <section className="section container" id="ai-tools" aria-labelledby="ai-tools-heading">
      <div className="section-head center reveal">
        <p className="overline">{copy.overline}</p>
        <h2 id="ai-tools-heading">{copy.title}</h2>
        <p className="section-head-sub">{copy.subtitle}</p>
        <div className="ai-tools-count-badge">
          {copy.categories.reduce((sum, c) => sum + c.tools.length, 0)}
          &nbsp;{locale === "ar" ? "أداة في" : "tools across"}&nbsp;
          {copy.categories.length}
          &nbsp;{locale === "ar" ? "فئات" : "categories"}
        </div>
      </div>

      <div className="ai-tools-toolbar reveal">
        <label className="ai-tools-search">
          <span className="visually-hidden">{searchPlaceholder}</span>
          <span className="ai-tools-search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="ai-tools-search-clear"
              onClick={() => setQuery("")}
              aria-label={locale === "ar" ? "مسح البحث" : "Clear search"}
            >
              ×
            </button>
          )}
        </label>
      </div>

      <p className="ai-tools-meta reveal" role="status" aria-live="polite">
        {metaLabel}
      </p>

      <div className="ai-tools-filters-wrap reveal">
        <div
          className="ai-tools-filters"
          role="tablist"
          aria-label={copy.title}
        >
          {tabIds.map((id, index) => {
            const isAll = id === "all";
            const cat = isAll ? null : copy.categories.find((c) => c.id === id) ?? null;
            const isActive = activeId === id;
            const label = isAll ? allLabel : cat!.title;
            const icon = isAll ? "✨" : cat!.icon;
            const accentClass = isAll ? "" : `accent-${cat!.accent}`;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="ai-tools-grid"
                tabIndex={isActive ? 0 : -1}
                className={`ai-tools-filter ${accentClass} ${isActive ? "is-active" : ""}`}
                onClick={() => updateCategory(id)}
                onKeyDown={(e) => onTabKey(e, index)}
                aria-label={label}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="ai-tools-grid"
        className="ai-tools-grid reveal"
        role="tabpanel"
        aria-live="polite"
      >
        {visibleCategories.length === 0 ? (
          <div className="ai-tools-empty" role="status" aria-live="polite">
            <p>{noResultsLabel}</p>
            <p className="ai-tools-empty-hint">{emptyHintLabel}</p>
            <div className="ai-tools-empty-actions">
              {hasQuery && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setQuery("")}
                >
                  {clearSearchLabel}
                </button>
              )}
              {activeId !== "all" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateCategory("all")}
                >
                  {showAllCategoriesLabel}
                </button>
              )}
            </div>
          </div>
        ) : (
          visibleCategories.map((cat) => (
            <div key={cat.id} className={`ai-tools-group accent-${cat.accent}`}>
              <header className="ai-tools-group-head">
                <span className="ai-tools-group-icon" aria-hidden="true">{cat.icon}</span>
                <div>
                  <h3>{cat.title}</h3>
                  <small>
                    {cat.tools.length} {locale === "ar" ? "أدوات" : "tools"}
                  </small>
                </div>
              </header>
              <ul className="ai-tools-list">
                {cat.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      className="ai-tool-link"
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={tool.tagline ?? ""}
                      aria-label={tool.tagline ? `${tool.name} — ${tool.tagline}` : tool.name}
                    >
                      <span className="ai-tool-name">
                        <bdi>{tool.name}</bdi>
                      </span>
                      {tool.tagline && (
                        <span className="ai-tool-tagline">
                          <bdi>{tool.tagline}</bdi>
                        </span>
                      )}
                      <span className="ai-tool-cta" aria-hidden="true">
                        {copy.visitLabel} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
