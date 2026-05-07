import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معرض الصور | Madinaty AI",
  description:
    "معرض صور يوثق الحياة والفعاليات واللحظات المجتمعية في مدينتي — أكبر مدينة متكاملة في مصر من مجموعة طلعت مصطفى (TMG).",
  alternates: {
    canonical: "/ar/gallery",
    languages: {
      "ar-EG": "/ar/gallery",
      "en-US": "/gallery"
    }
  }
};

export default function GalleryArLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
