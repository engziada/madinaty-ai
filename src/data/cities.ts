/**
 * Shared cities catalog. Used by:
 *   - NavBar "Cities" dropdown (renders selectable chips, deeplinks to /coming-soon)
 *   - ComingSoonPage (looks up the selected city by slug to build the personalized
 *     title and subtitle in both locales)
 *
 * Keep `slug` URL-safe and lowercase — it's the query-string key `?c=<slug>`.
 * `brandName` is the stylized AI-product name shown as the hero title
 * (e.g. "AlShroukAI"), per product direction to replace the generic
 * "Coming Soon" / "قريباً" heading with the city-branded label.
 */

export interface CityInfo {
  slug: string;
  name: string;        // English display name
  nameAr: string;      // Arabic display name
  brandName: string;   // Brand name shown as hero title, e.g. "AlShroukAI"
  active: boolean;     // `true` == live (go to home); `false` == coming-soon
}

export const cities: CityInfo[] = [
  { slug: "madinaty",    name: "Madinaty",    nameAr: "مدينتي",       brandName: "MadinatyAI",    active: true },
  { slug: "rehab",       name: "Rehab",       nameAr: "الرحاب",       brandName: "AlRehabAI",     active: false },
  { slug: "shorouk",     name: "Shorouk",     nameAr: "الشروق",       brandName: "AlShroukAI",    active: false },
  { slug: "zayed",       name: "Zayed",       nameAr: "الشيخ زايد",   brandName: "ZayedAI",       active: false },
  { slug: "october",     name: "October",     nameAr: "٦ أكتوبر",     brandName: "OctoberAI",     active: false },
  { slug: "new-capital", name: "New Capital", nameAr: "العاصمة",      brandName: "NewCapitalAI",  active: false },
  { slug: "new-cairo",   name: "New Cairo",   nameAr: "القاهرة الج.", brandName: "NewCairoAI",    active: false },
  { slug: "10th-ramadan", name: "10th of Ramadan", nameAr: "العاشر من رمضان", brandName: "10thRamadanAI", active: false },
  { slug: "obour",       name: "Obour",       nameAr: "العبور",        brandName: "ObourAI",       active: false },
  { slug: "noor",        name: "Noor",        nameAr: "نور",            brandName: "NoorAI",        active: false },
];

/** Look up a city by slug. Falls back to the first entry when the slug is unknown. */
export function getCityBySlug(slug: string | null | undefined): CityInfo {
  if (!slug) return cities[0];
  return cities.find((c) => c.slug === slug.toLowerCase()) ?? cities[0];
}
