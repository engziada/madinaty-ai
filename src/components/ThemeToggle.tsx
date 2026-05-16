"use client";

import { useTheme } from "@/components/ThemeProvider";
import { gaEvent } from "@/lib/gtag";

interface ThemeToggleProps {
  labelLight?: string;
  labelDark?: string;
}

/**
 * Accessible light/dark toggle.
 */
export function ThemeToggle({ labelLight = "Light", labelDark = "Dark" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    toggleTheme();
    gaEvent("theme_toggled", { theme: nextTheme });
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "is-dark" : "is-light"}`}
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? labelLight : labelDark} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? labelLight : labelDark} theme`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">
          <span className="theme-toggle-icon theme-toggle-icon-sun">☀️</span>
          <span className="theme-toggle-icon theme-toggle-icon-moon">🌙</span>
        </span>
      </span>
      <span className="theme-toggle-label">{isDark ? labelDark : labelLight}</span>
    </button>
  );
}
