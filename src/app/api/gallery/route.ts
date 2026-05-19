import { NextResponse } from "next/server";

/**
 * GET /api/gallery
 *
 * Returns lightweight placeholder photos from an online service.
 * Previously scanned local `/public` for `imgi_*` files; now uses
 * curated Unsplash source images via picsum.photos for instant
 * loading and zero local storage cost.
 *
 * Response shape: { photos: Array<{ src: string; name: string }> }
 */
export const dynamic = "force-dynamic";

const PLACEHOLDER_IDS = [
  { id: 1060, name: "city-park.webp" },
  { id: 164, name: "residential-street.webp" },
  { id: 329, name: "community-gathering.webp" },
  { id: 558, name: "green-space.webp" },
  { id: 593, name: "smart-city.webp" },
  { id: 648, name: "family-event.webp" },
  { id: 823, name: "sunset-view.webp" },
  { id: 902, name: "modern-architecture.webp" },
];

export async function GET() {
  const photos = PLACEHOLDER_IDS.map((p) => ({
    src: `https://picsum.photos/id/${p.id}/400/300.webp`,
    name: p.name,
  }));

  return NextResponse.json(
    { photos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
