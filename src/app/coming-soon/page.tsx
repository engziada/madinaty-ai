import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Madinaty AI",
  description:
    "The Madinaty AI portal for residents of Madinaty by TMG in New Cairo. Smart city services, community AI, and live maps.",
};

export default async function ComingSoon({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  return <ComingSoonPage locale="en" citySlug={c} />;
}
