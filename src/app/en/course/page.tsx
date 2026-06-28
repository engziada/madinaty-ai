import type { Metadata } from "next";
import { CoursesIndexPage } from "@/components/course/CoursesIndexPage";

export const metadata: Metadata = {
  title: "Madinaty AI Lab | Courses & Workshops | Madinaty AI",
  description: "Discover workshops and training courses at Madinaty Innovation Hub. Learn AI with Astro!",
};

export default function Page() {
  return <CoursesIndexPage locale="en" />;
}
