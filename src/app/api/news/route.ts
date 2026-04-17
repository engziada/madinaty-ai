import { NextResponse } from "next/server";
import { getNews } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/news?limit=20 — list latest news items for the marquee.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? 20) || 20));
  const items = await getNews(limit);
  return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
}
