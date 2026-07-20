import type { Metadata } from "next";
import { CoursesIndexPage } from "@/components/course/CoursesIndexPage";

export const metadata: Metadata = {
  title: "مركز الإبتكار | الدورات والورش التدريبية | Madinaty AI",
  description: "اكتشف أحدث دورات الذكاء الاصطناعي والتكنولوجيا للأطفال والمحترفين في مركز الإبتكار بمدينتي.",
};

export default function Page() {
  return <CoursesIndexPage locale="ar" />;
}
