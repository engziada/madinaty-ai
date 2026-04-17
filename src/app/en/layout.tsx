import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madinaty.AI — AI Intelligence Layer for Madinaty Smart City",
  description:
    "English portal for Madinaty.AI — the community-built AI layer serving Madinaty by TMG in New Cairo. Explore smart transport, community insights, live city map, and AI education for residents across 23 districts.",
  alternates: {
    canonical: "/en",
    languages: {
      "ar-EG": "/ar",
      "en-US": "/en",
      "x-default": "/ar"
    }
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "/en"
  }
};

/**
 * English layout — LTR direction, English copy.
 */
export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="en" dir="ltr">{children}</div>;
}
