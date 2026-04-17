import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cairo, Changa, Exo_2, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { NewsMarquee } from "@/components/NewsMarquee";
import { BackToTop } from "@/components/BackToTop";
import { SkipToContent } from "@/components/SkipToContent";
import { RouteProgress } from "@/components/RouteProgress";
import { GlobalShortcuts } from "@/components/GlobalShortcuts";
import { JsonLd } from "@/components/JsonLd";

const exoTwo = Exo_2({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-headline", display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-body-ar", display: "swap" });
const changa = Changa({ subsets: ["arabic"], variable: "--font-headline-ar", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madinaty.ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#070d18" }
  ],
  colorScheme: "light dark"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Madinaty.AI — Smart City Intelligence for Madinaty by TMG",
    template: "%s | Madinaty.AI"
  },
  description:
    "Madinaty.AI is the AI intelligence layer over Madinaty — Egypt's largest integrated city by Talaat Moustafa Group (TMG) in New Cairo. Smart transport, community insights, AI education, and live city services for 700,000+ residents across 23 districts.",
  applicationName: "Madinaty.AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Madinaty",
    "مدينتي",
    "Madinaty AI",
    "Madinaty.AI",
    "TMG",
    "Talaat Moustafa Group",
    "مجموعة طلعت مصطفى",
    "New Cairo",
    "القاهرة الجديدة",
    "smart city Egypt",
    "مدينة ذكية",
    "community AI",
    "ذكاء اصطناعي",
    "smart shuttle",
    "AMI metering",
    "Madinaty app",
    "Madinaty services",
    "Madinaty portal",
    "Madinaty residents",
    "AI for kids",
    "workshops Madinaty"
  ],
  authors: [{ name: "Madinaty Community" }],
  creator: "Madinaty.AI",
  publisher: "Madinaty Community",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/ar",
      "en-US": "/en",
      "x-default": "/ar"
    }
  },
  openGraph: {
    type: "website",
    siteName: "Madinaty.AI",
    title: "Madinaty.AI — Smart City Intelligence for Madinaty by TMG",
    description:
      "The AI intelligence layer over Madinaty, Egypt's largest integrated smart city by Talaat Moustafa Group. Smart transport, community insights, live city map, and AI education for residents.",
    url: siteUrl,
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Madinaty.AI logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Madinaty.AI — Smart City Intelligence for Madinaty by TMG",
    description:
      "The AI intelligence layer over Madinaty — Egypt's largest integrated smart city by Talaat Moustafa Group.",
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png"
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false
  }
};

/**
 * Root layout — Arabic is the default locale, light is the default theme.
 * The theme-init script runs before hydration to prevent a flash of the
 * wrong palette on first paint.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd />
      </head>
      <body
        className={`${exoTwo.variable} ${orbitron.variable} ${cairo.variable} ${changa.variable}`}
      >
        <ThemeProvider>
          <SkipToContent />
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          <NewsMarquee />
          {children}
          <BackToTop />
          <GlobalShortcuts />
        </ThemeProvider>
      </body>
    </html>
  );
}
