import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * GET /api/gallery
 *
 * Returns every `imgi_*.{png,jpg,jpeg,webp}` file that actually exists under
 * `/public`. Gallery components fetch this on mount so new uploads (once the
 * feature ships) appear automatically without code changes. Until then, this
 * guarantees the grid never tries to render broken `<img>` references.
 *
 * Response shape: { photos: Array<{ src: string; name: string }> }
 */
export const dynamic = "force-dynamic";

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const PATTERN = /^imgi_/i;

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const entries = await fs.readdir(publicDir);

    const photos = entries
      .filter((f) => PATTERN.test(f) && ALLOWED_EXT.has(path.extname(f).toLowerCase()))
      .sort()
      .map((filename) => ({
        src: `/${filename}`,
        name: filename,
      }));

    return NextResponse.json(
      { photos },
      {
        headers: {
          // Short cache so a newly dropped photo shows up within a minute
          // without hammering the filesystem on every request.
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("[/api/gallery] Failed to list photos:", error);
    return NextResponse.json({ photos: [] }, { status: 200 });
  }
}
