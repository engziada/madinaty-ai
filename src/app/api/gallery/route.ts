import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * GET /api/gallery
 *
 * Dynamically scans `/public/images/gallery/` for image files.
 * Drop your workshop photos (jpg, jpeg, png, webp) into that folder
 * and they'll appear on the gallery page automatically — no code changes needed.
 *
 * Falls back to Unsplash placeholders when the folder is empty.
 *
 * Response shape: { photos: Array<{ src: string; name: string }> }
 */
export const dynamic = "force-dynamic";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Curated fallback images shown when the gallery folder is empty */
const FALLBACK_PHOTOS = [
  { src: "https://picsum.photos/id/1060/400/300.webp", name: "city-park.webp" },
  { src: "https://picsum.photos/id/164/400/300.webp", name: "residential-street.webp" },
  { src: "https://picsum.photos/id/329/400/300.webp", name: "community-gathering.webp" },
  { src: "https://picsum.photos/id/558/400/300.webp", name: "green-space.webp" },
  { src: "https://picsum.photos/id/593/400/300.webp", name: "smart-city.webp" },
  { src: "https://picsum.photos/id/648/400/300.webp", name: "family-event.webp" },
  { src: "https://picsum.photos/id/823/400/300.webp", name: "sunset-view.webp" },
  { src: "https://picsum.photos/id/902/400/300.webp", name: "modern-architecture.webp" },
];

export async function GET() {
  let photos: { src: string; name: string }[] = [];

  try {
    if (fs.existsSync(GALLERY_DIR)) {
      const files = fs.readdirSync(GALLERY_DIR).filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXTENSIONS.has(ext);
      });

      // Sort by name so newest photos (e.g. timestamped) appear first
      files.sort((a, b) => b.localeCompare(a));

      photos = files.map((f) => ({
        src: `/images/gallery/${f}`,
        name: f,
      }));
    }
  } catch {
    // If anything goes wrong reading the filesystem, fall through to fallbacks
  }

  // Use fallback placeholders when no real photos exist
  if (photos.length === 0) {
    photos = FALLBACK_PHOTOS;
  }

  return NextResponse.json(
    { photos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
