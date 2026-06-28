import type { MetadataRoute } from "next";
import { courses } from "@/data/courseData";

/** Canonical site URL. Override in production via `NEXT_PUBLIC_SITE_URL`. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.madinatyai.com";

/**
 * Sitemap including both locales and all known routes.
 * Language alternates are declared so Google serves the correct locale
 * to each user per `hreflang` best practices.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
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
      url: `${siteUrl}/ar/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/ar/founders`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/founders`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/ar/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/ar/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/ar/course`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/course`,
          en: `${siteUrl}/en/course`,
          "x-default": `${siteUrl}/ar/course`
        }
      }
    },
    {
      url: `${siteUrl}/en/course`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/course`,
          en: `${siteUrl}/en/course`,
          "x-default": `${siteUrl}/ar/course`
        }
      }
    }
  ];

  // Dynamic Course Routes
  const courseRoutes: MetadataRoute.Sitemap = courses.flatMap((course) => [
    {
      url: `${siteUrl}/ar/course/${course.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/course/${course.slug}`,
          en: `${siteUrl}/en/course/${course.slug}`,
          "x-default": `${siteUrl}/ar/course/${course.slug}`
        }
      }
    },
    {
      url: `${siteUrl}/en/course/${course.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/course/${course.slug}`,
          en: `${siteUrl}/en/course/${course.slug}`,
          "x-default": `${siteUrl}/ar/course/${course.slug}`
        }
      }
    }
  ]);

  return [...staticRoutes, ...courseRoutes];
}
