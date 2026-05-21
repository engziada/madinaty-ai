import type { Metadata } from "next";
import { CourseSessionPage } from "@/components/course/CourseSessionPage";

export const metadata: Metadata = {
  title: "احجز الجلسة | شات الذكاء الاصطناعي للأطفال | Madinaty AI",
  description: "احجز مقعد طفلك الآن في جلسة الذكاء الاصطناعي التفاعلية بمركز Triple A إيست هب بمدينتي. المقاعد محدودة وبسعر رمزي لضمان جدية الحجز.",
};

export default function Page() {
  return <CourseSessionPage locale="ar" />;
}
