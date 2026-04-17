import { NextResponse } from "next/server";
import { expectedWebhookSecret, pushArticle } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/ai-article
 *
 * Authenticate with header:  `x-webhook-secret: <WEBHOOK_SECRET>`
 *
 * Body: {
 *   "title": string,
 *   "summary"?: string,
 *   "url"?: string,
 *   "source"?: string,
 *   "imageUrl"?: string,
 *   "tag"?: string
 * }
 */
export async function POST(request: Request): Promise<NextResponse> {
  const secret = request.headers.get("x-webhook-secret");
  if (!secret || secret !== expectedWebhookSecret()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const body = payload as {
    title?: string;
    summary?: string;
    url?: string;
    source?: string;
    imageUrl?: string;
    tag?: string;
  };

  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Missing required 'title' string" }, { status: 400 });
  }

  const stored = await pushArticle({
    title: body.title,
    summary: body.summary,
    url: body.url,
    source: body.source,
    imageUrl: body.imageUrl,
    tag: body.tag
  });

  return NextResponse.json({ ok: true, stored });
}
