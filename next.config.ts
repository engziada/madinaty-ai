import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
        source: "/logo.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable"
          }
        ]
      },
      {
        source: "/logo-lite.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable"
          }
        ]
      },
      {
        source: "/logo-dark.svg",
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
  }
};

export default nextConfig;
