import { NextResponse } from "next/server";
import { expectedWebhookSecret, pushNews } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/news
 *
 * Authenticate with header:  `x-webhook-secret: <WEBHOOK_SECRET>`
 *
 * Body (single item):   { "text": string, "url"?: string, "source"?: string }
 * Body (batch):          { "items": Array<{ text, url?, source? }> }
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
    text?: string;
    url?: string;
    source?: string;
    items?: Array<{ text: string; url?: string; source?: string }>;
  };

  const batch = body.items ?? (body.text ? [{ text: body.text, url: body.url, source: body.source }] : []);

  if (batch.length === 0) {
    return NextResponse.json({ error: "Missing 'text' or non-empty 'items'" }, { status: 400 });
  }

  const stored = [];
  for (const item of batch) {
    if (!item.text || typeof item.text !== "string") {
      return NextResponse.json({ error: "Each item must include a 'text' string" }, { status: 400 });
    }
    stored.push(await pushNews(item));
  }

  return NextResponse.json({ ok: true, stored });
}
