import { NextResponse } from "next/server";
import { getLatestArticle } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/ai-article — return the most recently received AI article.
 */
export async function GET(): Promise<NextResponse> {
  const article = await getLatestArticle();
  return NextResponse.json({ article }, { headers: { "Cache-Control": "no-store" } });
}
