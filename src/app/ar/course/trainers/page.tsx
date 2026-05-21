import type { Metadata } from "next";
import { CourseTrainersPage } from "@/components/course/CourseTrainersPage";

export const metadata: Metadata = {
  title: "المدربون والمنهج | شات الذكاء الاصطناعي للأطفال | Madinaty AI",
  description: "تعرف على الهيكل الأكاديمي المشرف على الكورس، والمدربين المحترفين، والخطة الزمنية للجلسة التفاعلية.",
};

export default function Page() {
  return <CourseTrainersPage locale="ar" />;
}
