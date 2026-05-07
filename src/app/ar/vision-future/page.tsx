import type { Metadata } from "next";
import { VisionPage } from "@/components/VisionPage";

export const metadata: Metadata = {
  title: "الرؤية وخارطة الطريق — Madinaty AI",
  description:
    "خارطة طريق Madinaty AI على ثلاث مراحل — البُعد المجتمعي المبني على الذكاء الاصطناعي فوق مدينتي من مجموعة طلعت مصطفى (TMG). من الخدمات الأساسية إلى التنسيق الذكي عبر ٢٣ حياً في القاهرة الجديدة.",
  alternates: {
    canonical: "/ar/vision-future",
    languages: {
      "ar-EG": "/ar/vision-future",
      "en-US": "/vision-future"
    }
  }
};

/**
 * Arabic vision route.
 */
export default function ArabicVisionPage() {
  return <VisionPage locale="ar" />;
}
