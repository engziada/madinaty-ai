import type { Metadata } from "next";
import { CourseFaqPage } from "@/components/course/CourseFaqPage";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة والسياسات | شات الذكاء الاصطناعي للأطفال | Madinaty AI",
  description: "الأسئلة الشائعة حول أسعار الكورس والسن والخصوصية وسياسات الحضور والإلغاء بمدينتي.",
};

export default function Page() {
  return <CourseFaqPage locale="ar" />;
}
