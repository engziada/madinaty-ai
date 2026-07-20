import type { Metadata } from "next";
import { Suspense } from "react";
import { AiToolsSection } from "@/components/AiToolsSection";

export const metadata: Metadata = {
  title: "أدوات إحترافية | Madinaty AI",
  description:
    "مجموعة مختارة بعناية من أفضل أدوات الذكاء الاصطناعي على الويب — مصنّفة حسب الاستخدام. ChatGPT، Claude، Gemini، Copilot، Midjourney، والمزيد. كل رابط جربناه، وهو آمن للاستكشاف.",
  openGraph: {
    title: "أدوات إحترافية | Madinaty AI",
    description:
      "مجموعة مختارة بعناية من أفضل أدوات الذكاء الاصطناعي — مصنّفة حسب الاستخدام.",
    images: ["/madinaty_logo_dark.svg"],
  },
};

export default function AiToolsPageAr() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/*
        Suspense is required: AiToolsSection calls useSearchParams
        for URL-based category persistence. Without a boundary,
        Next.js bails out of static generation.
      */}
      <Suspense fallback={null}>
        <AiToolsSection locale="ar" />
      </Suspense>
    </main>
  );
}
