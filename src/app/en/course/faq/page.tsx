import type { Metadata } from "next";
import { CourseFaqPage } from "@/components/course/CourseFaqPage";

export const metadata: Metadata = {
  title: "FAQ & Policies | AI Chatbots for Kids | Madinaty AI",
  description: "Frequently asked questions regarding workshop costs, required equipment, locations, and attendance/cancellation policy.",
};

export default function Page() {
  return <CourseFaqPage locale="en" />;
}
