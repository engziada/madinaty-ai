import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  /**
   * Performance & security headers applied to all routes.
   * - Cache-Control for static assets (fonts, images, CSS, JS)
   * - Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)"
          }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        source: "/madinaty_logo_dark.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable"
          }
        ]
      },
      {
        source: "/madinaty_logo-lite.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable"
          }
        ]
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },

  /**
   * Redirects from old flat course URLs to the new slugged routes.
   * Note: Next.js redirects cannot include URL hashes (#registration, #overview, etc.),
   * so we redirect to the course page root. The component defaults to the Registration tab.
   */
  async redirects() {
    const oldTabs = ["session", "details", "trainers", "faq"] as const;
    const locales = ["ar", "en"] as const;

    return locales.flatMap((locale) =>
      oldTabs.map((tab) => ({
        source: `/${locale}/course/${tab}`,
        destination: `/${locale}/course/kids-ai-chatbots`,
        permanent: true,
      }))
    );
  }
};

export default nextConfig;
