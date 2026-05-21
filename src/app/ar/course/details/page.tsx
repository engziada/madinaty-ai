import type { Metadata } from "next";
import { CourseDetailsPage } from "@/components/course/CourseDetailsPage";

export const metadata: Metadata = {
  title: "تفاصيل الورشة | شات الذكاء الاصطناعي للأطفال | Madinaty AI",
  description: "تفاصيل ومحاور ورشة عمل شات الذكاء الاصطناعي وكتابة الأوامر الآمنة للأطفال من ٨ إلى ١٢ سنة بمدينتي.",
};

export default function Page() {
  return <CourseDetailsPage locale="ar" />;
}
