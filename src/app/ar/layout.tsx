import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madinaty.AI — طبقة الذكاء الاصطناعي لمدينتي",
  description:
    "Madinaty.AI · البوابة العربية · طبقة الذكاء الاصطناعي فوق مدينتي، أكبر مدينة متكاملة في مصر من مجموعة طلعت مصطفى (TMG) في القاهرة الجديدة. خدمات ذكية، نقل تنبؤي، خريطة حية، وتعليم AI للعائلات عبر ٢٣ حياً.",
  alternates: {
    canonical: "/ar",
    languages: {
      "ar-EG": "/ar",
      "en-US": "/en",
      "x-default": "/ar"
    }
  },
  openGraph: {
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: "/ar"
  }
};

/**
 * Arabic layout that enforces RTL direction.
 */
export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ar" dir="rtl">{children}</div>;
}
