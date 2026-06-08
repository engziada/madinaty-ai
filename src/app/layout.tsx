import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cairo, Alexandria, Inter, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "@/components/conversational/conversational.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { NewsMarquee } from "@/components/NewsMarquee";
import { BackToTop } from "@/components/BackToTop";
import { SkipToContent } from "@/components/SkipToContent";
import { RouteProgress } from "@/components/RouteProgress";
import { GlobalShortcuts } from "@/components/GlobalShortcuts";
import { JsonLd } from "@/components/JsonLd";
import { RootNavFooter } from "@/components/RootNavFooter";
import { NotificationPrompt } from "@/components/NotificationPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-headline", display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-body-ar", display: "swap" });
const alexandria = Alexandria({ subsets: ["arabic"], variable: "--font-headline-ar", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.madinatyai.com";

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
    default: "Madinaty AI - Smart City Intelligence for Madinaty by TMG",
    template: "%s | Madinaty AI"
  },
  description:
    "Madinaty AI is the AI intelligence layer over Madinaty - Egypt's largest integrated city by Talaat Moustafa Group (TMG) in New Cairo. Smart transport, community insights, AI education, and live city services for 700,000+ residents across 23 districts.",
  applicationName: "Madinaty AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Madinaty",
    "مدينتي",
    "Madinaty AI",
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
  creator: "Madinaty AI",
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
    siteName: "Madinaty AI",
    title: "Madinaty AI - Smart City Intelligence for Madinaty by TMG",
    description:
      "The AI intelligence layer over Madinaty, Egypt's largest integrated smart city by Talaat Moustafa Group. Smart transport, community insights, live city map, and AI education for residents.",
    url: siteUrl,
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/madinaty_logo_dark.svg",
        width: 512,
        height: 512,
        alt: "Madinaty AI logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Madinaty AI - Smart City Intelligence for Madinaty by TMG",
    description:
      "The AI intelligence layer over Madinaty - Egypt's largest integrated smart city by Talaat Moustafa Group.",
    images: ["/madinaty_logo_dark.svg"]
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/madinaty_logo_dark.svg", type: "image/svg+xml" }
    ],
    shortcut: "/madinaty_logo_dark.svg",
    apple: "/madinaty_logo_dark.svg"
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false
  }
};

/**
 * Root layout - Arabic is the default locale, light is the default theme.
 * The theme-init script runs before hydration to prevent a flash of the
 * wrong palette on first paint.
 *
 * News is fetched *after* the HTML starts streaming so a slow RSS feed
 * never blocks the initial render. NewsMarquee will show client-fetched
 * data once available.
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lowMem = navigator.deviceMemory && navigator.deviceMemory < 4;
    var lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (reduce || lowMem || lowCpu) {
      document.documentElement.setAttribute('data-reduce-motion', '');
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        document.documentElement.setAttribute('data-tab-hidden', '');
      } else {
        document.documentElement.removeAttribute('data-tab-hidden');
      }
    });
  } catch (_) {}
})();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable} ${alexandria.variable}`}
      >
        <ThemeProvider>
          <SkipToContent />
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          <NewsMarquee />
          <div className="site-bg" />
          <RootNavFooter>
            {children}
          </RootNavFooter>
          <BackToTop />
          <GlobalShortcuts />
          <NotificationPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
