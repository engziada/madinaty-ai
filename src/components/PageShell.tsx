"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CursorGlow } from "@/components/CursorGlow";

/**
 * Client wrapper that activates scroll-reveal and cursor glow for any page.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  return (
    <>
      <CursorGlow />
      {children}
    </>
  );
}
