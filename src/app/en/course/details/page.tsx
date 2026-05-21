import type { Metadata } from "next";
import { CourseDetailsPage } from "@/components/course/CourseDetailsPage";

export const metadata: Metadata = {
  title: "Workshop Details | AI Chatbots for Kids | Madinaty AI",
  description: "Curriculum topics, age range, duration, and specifications of the AI Chatbots & Safe Prompting workshop for kids in Madinaty.",
};

export default function Page() {
  return <CourseDetailsPage locale="en" />;
}
