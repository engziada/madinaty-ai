import type { Metadata } from "next";
import { VisionPage } from "@/components/VisionPage";

export const metadata: Metadata = {
  title: "Vision & Roadmap — Madinaty AI",
  description:
    "The three-phase roadmap for Madinaty AI — the community-built AI layer over Madinaty by TMG (Talaat Moustafa Group). From core services to full city-wide orchestration across 23 districts in New Cairo.",
  alternates: {
    canonical: "/vision-future",
    languages: {
      "ar-EG": "/ar/vision-future",
      "en-US": "/vision-future"
    }
  }
};

/**
 * English vision route.
 */
export default function VisionFuturePage() {
  return <VisionPage locale="en" />;
}
