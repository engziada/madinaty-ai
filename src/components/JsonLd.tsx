/**
 * Structured data (JSON-LD) emitter.
 *
 * These structured-data blocks tell Google exactly what this site is,
 * who operates it, what alternate languages it serves, and how to use
 * an internal search box — all of which feed Rich Results + Sitelinks
 * Search Box eligibility for queries like "Madinaty" or "TMG".
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://madinaty.ai";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Madinaty.AI",
  alternateName: ["Madinaty AI", "مدينتي AI", "مدينتي للذكاء الاصطناعي"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "The AI intelligence layer over Madinaty — Egypt's largest integrated smart city, developed by Talaat Moustafa Group (TMG) in New Cairo.",
  foundingLocation: {
    "@type": "Place",
    name: "Madinaty, New Cairo, Egypt",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG"
    }
  },
  areaServed: {
    "@type": "Place",
    name: "Madinaty · New Cairo",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0468,
      longitude: 31.6578
    }
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Talaat Moustafa Group",
    alternateName: ["TMG", "مجموعة طلعت مصطفى"],
    url: "https://talaatmoustafa.com"
  },
  keywords: [
    "Madinaty",
    "مدينتي",
    "Madinaty.AI",
    "TMG",
    "Talaat Moustafa Group",
    "مجموعة طلعت مصطفى",
    "New Cairo",
    "القاهرة الجديدة",
    "smart city",
    "مدينة ذكية",
    "community AI",
    "artificial intelligence",
    "Madinaty smart services",
    "AMI metering"
  ]
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Madinaty.AI",
  url: siteUrl,
  inLanguage: ["ar", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/ar?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "العربية", item: `${siteUrl}/ar` },
    { "@type": "ListItem", position: 3, name: "English", item: `${siteUrl}/en` }
  ]
};

/**
 * Drop inside <head> (or anywhere in the body — both are valid for JSON-LD).
 */
export function JsonLd() {
  const blocks = [organization, website, breadcrumb];
  return (
    <>
      {blocks.map((block, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // JSON-LD is intentionally inlined. Content is static and trusted.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
