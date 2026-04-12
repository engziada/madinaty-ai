import type { Metadata } from "next";
import { Cairo, Changa, Exo_2, Orbitron } from "next/font/google";
import "./globals.css";

const exoTwo = Exo_2({ subsets: ["latin"], variable: "--font-body" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-headline" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-body-ar" });
const changa = Changa({ subsets: ["arabic"], variable: "--font-headline-ar" });

export const metadata: Metadata = {
  title: "Madinaty.AI | The Digital Aurora Interface",
  description:
    "AI-powered smart city experience for the Madinaty community with interactive services, map intelligence, and education initiatives."
};

/**
 * Root layout for all English routes.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${exoTwo.variable} ${orbitron.variable} ${cairo.variable} ${changa.variable}`}>{children}</body>
    </html>
  );
}
