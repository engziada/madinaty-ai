import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Madinaty AI",
  description:
    "Photo gallery capturing life, events, and community moments across Madinaty — Egypt's largest integrated smart city by Talaat Moustafa Group (TMG).",
  alternates: {
    canonical: "/gallery",
    languages: {
      "ar-EG": "/ar/gallery",
      "en-US": "/gallery"
    }
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
