import type { Metadata } from "next";
import { CoursesIndexPage } from "@/components/course/CoursesIndexPage";

export const metadata: Metadata = {
  title: "AI Innovation Lab | Courses & Workshops | Madinaty AI",
  description: "Explore the latest AI and technology courses for kids and professionals at the Madinaty AI Innovation Lab.",
};

export default function Page() {
  return <CoursesIndexPage locale="en" />;
}
