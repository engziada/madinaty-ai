import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Madinaty AI",
  description:
    "The Madinaty AI portal for residents of Madinaty by TMG in New Cairo. Smart city services, community AI, and live maps.",
};

/**
 * Hidden: coming-soon page now redirects to the English home.
 * Keep file intact so route can be restored later if needed.
 */
export default function ComingSoon(): never {
  redirect("/en");
}
