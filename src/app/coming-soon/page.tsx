import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Portal Coming Soon — Madinaty AI",
  description:
    "The Madinaty AI portal is launching soon for residents of Madinaty by TMG in New Cairo. Get notified when smart city services, community AI, and live maps go live.",
  alternates: {
    canonical: "/coming-soon",
    languages: {
      "ar-EG": "/ar/coming-soon",
      "en-US": "/coming-soon"
    }
  }
};

export default function ComingSoon() {
  return <ComingSoonPage locale="en" />;
}
