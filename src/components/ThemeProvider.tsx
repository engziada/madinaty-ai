"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeCtx {
  theme: ThemeMode;
  setTheme: (next: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "madinaty.theme";
const DEFAULT_THEME: ThemeMode = "light";

function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

/**
 * ThemeProvider — light/dark switcher with localStorage persistence.
 * Default: light (matches the Sunny Horizon palette).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(DEFAULT_THEME);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
        applyTheme(stored);
        return;
      }
    } catch {
      /* ignore */
    }
    applyTheme(DEFAULT_THEME);
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = useMemo<ThemeCtx>(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}

/**
 * Inline script string — run before React hydrates to avoid a flash of the
 * wrong theme. Inject with <script dangerouslySetInnerHTML={{ __html }} /> in
 * the root layout <head>.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var theme = (stored === "light" || stored === "dark") ? stored : "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`;
