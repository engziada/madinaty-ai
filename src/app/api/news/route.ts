import { NextResponse } from "next/server";
import { getNews } from "@/lib/store";
import { getEgyptNews } from "@/lib/egypt-news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/news?limit=20&locale=en
 *   Returns recent Egypt-related headlines from Google News RSS.
 *   Falls back to the JSON-store (webhook-fed + seed items) if the live
 *   feed fails, so the marquee is never empty.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? 20) || 20));
  const localeParam = url.searchParams.get("locale");
  const locale: "en" | "ar" = localeParam === "ar" ? "ar" : "en";

  try {
    const items = await getEgyptNews(locale, limit);
    return NextResponse.json(
      { items, source: "google-news-rss" },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    const fallback = await getNews(limit);
    return NextResponse.json(
      { items: fallback, source: "fallback" },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
