import { NextRequest, NextResponse } from "next/server";
import { upsertPushToken, deletePushToken } from "@/lib/db";

/**
 * Push token subscription API.
 *
 * POST  → save or update a token with rich segmentation data.
 * DELETE → remove a token (unsubscribe).
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    await upsertPushToken({
      token,
      locale: body.locale ?? "ar",
      platform: body.platform ?? null,
      os: body.os ?? null,
      browser: body.browser ?? null,
      screen_size: body.screen_size ?? null,
      user_agent: body.user_agent ?? null,
      referrer: body.referrer ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[push-subscribe] POST error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    await deletePushToken(token);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[push-subscribe] DELETE error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
