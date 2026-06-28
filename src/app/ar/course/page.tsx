import type { Metadata } from "next";
import { CoursesIndexPage } from "@/components/course/CoursesIndexPage";

export const metadata: Metadata = {
  title: "مختبر Madinaty AI | الدورات والورش التدريبية | Madinaty AI",
  description: "اكتشف الورش والدورات التدريبية المتاحة في مركز الابتكار بمدينتي. تعلّم الذكاء الاصطناعي مع أسترو!",
};

export default function Page() {
  return <CoursesIndexPage locale="ar" />;
}
