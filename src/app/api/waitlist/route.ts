import { NextRequest, NextResponse } from "next/server";
import { insertWaitlist } from "@/lib/db";

/**
 * Waitlist API — stores city-specific launch notification sign-ups.
 *
 * Body: { email: string, city: string, locale?: "en" | "ar" }
 * Returns: { ok: true } on success, { ok: false, error } on validation failure.
 *
 * Idempotent: submitting the same (email, city) pair only refreshes the
 * created_at timestamp (see `insertWaitlist` upsert).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, city, locale = "en" } = body ?? {};

    const errors: string[] = [];
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(locale === "ar" ? "بريد إلكتروني صحيح مطلوب" : "Valid email is required");
    }
    if (!city || typeof city !== "string" || city.trim().length < 2) {
      errors.push(locale === "ar" ? "اسم المدينة مطلوب" : "City is required");
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, error: errors.join("; ") }, { status: 400 });
    }

    insertWaitlist({
      email: (email as string).trim().toLowerCase(),
      city: (city as string).trim(),
      locale: locale === "ar" ? "ar" : "en",
    });

    return NextResponse.json({
      ok: true,
      message:
        locale === "ar"
          ? "تم تسجيلك في قائمة الانتظار. سنتواصل معك عند الإطلاق."
          : "You're on the waitlist. We'll reach out when we launch.",
    });
  } catch (error) {
    console.error("[WAITLIST API] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}
