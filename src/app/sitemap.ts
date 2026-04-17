import type { MetadataRoute } from "next";

/** Canonical site URL. Override in production via `NEXT_PUBLIC_SITE_URL`. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madinaty.ai";

/**
 * Sitemap including both locales and all known routes.
 * Language alternates are declared so Google serves the correct locale
 * to each user per `hreflang` best practices.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/ar`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar`,
          en: `${siteUrl}/en`,
          "x-default": `${siteUrl}/ar`
        }
      }
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar`,
          en: `${siteUrl}/en`,
          "x-default": `${siteUrl}/ar`
        }
      }
    },
    {
      url: `${siteUrl}/ar/vision-future`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/vision-future`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/ar/coming-soon`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/coming-soon`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    }
  ];
}
