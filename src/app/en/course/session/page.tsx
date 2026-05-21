import type { Metadata } from "next";
import { CourseSessionPage } from "@/components/course/CourseSessionPage";

export const metadata: Metadata = {
  title: "Book Session | AI Chatbots for Kids | Madinaty AI",
  description: "Book your child's seat now in the interactive AI session at Triple A East Hub, Madinaty. Subsidized pricing and limited seats available.",
};

export default function Page() {
  return <CourseSessionPage locale="en" />;
}
