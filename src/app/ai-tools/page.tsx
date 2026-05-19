import type { Metadata } from "next";
import { Suspense } from "react";
import { AiToolsSection } from "@/components/AiToolsSection";

export const metadata: Metadata = {
  title: "AI Tools | Madinaty AI",
  description:
    "A curated toolbox of the best AI tools on the web — grouped by what you want to get done. ChatGPT, Claude, Gemini, Copilot, Midjourney, and more. Every link is vetted and safe to explore.",
  openGraph: {
    title: "AI Tools | Madinaty AI",
    description:
      "A curated toolbox of the best AI tools on the web — grouped by what you want to get done.",
    images: ["/madinaty_logo_dark.svg"],
  },
};

export default function AiToolsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/*
        Suspense is required: AiToolsSection calls useSearchParams
        for URL-based category persistence. Without a boundary,
        Next.js bails out of static generation.
      */}
      <Suspense fallback={null}>
        <AiToolsSection locale="en" />
      </Suspense>
    </main>
  );
}
