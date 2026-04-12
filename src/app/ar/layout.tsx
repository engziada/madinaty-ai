import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madinaty.AI | الواجهة الرقمية",
  description: "تجربة مدينة ذكية مدعومة بالذكاء الاصطناعي لمجتمع مدينتي."
};

/**
 * Arabic layout that enforces RTL direction.
 */
export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ar" dir="rtl">{children}</div>;
}
