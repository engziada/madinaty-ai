import { NextResponse } from "next/server";
import { getAiNews } from "@/lib/ai-news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/ai-article?locale=en — returns the most recent AI news article.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";
  try {
    const articles = await getAiNews(locale, 1);
    const article = articles.length > 0 ? articles[0] : null;
    return NextResponse.json({ article }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ article: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
