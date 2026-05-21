import type { Metadata } from "next";
import { CourseTrainersPage } from "@/components/course/CourseTrainersPage";

export const metadata: Metadata = {
  title: "Curriculum & Trainers | AI Chatbots for Kids | Madinaty AI",
  description: "Learn about the academic supervision team from Cairo University, expert instructors, and the chronological lesson timeline.",
};

export default function Page() {
  return <CourseTrainersPage locale="en" />;
}
