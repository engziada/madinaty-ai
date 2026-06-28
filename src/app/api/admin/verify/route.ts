import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export const runtime = "edge";

function getSql() {
  const raw = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!raw) throw new Error("NEON_DATABASE_URL is not set");
  return neon(raw);
}

const ADMIN_PHONE = "+201555250555";

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();

    if (!otp || typeof otp !== "string") {
      return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
    }

    const sql = getSql();

    // Verify OTP
    const result = await sql`
      SELECT id, (expires_at > CURRENT_TIMESTAMP) as is_valid FROM admin_otp 
      WHERE phone = ${ADMIN_PHONE} AND otp = ${otp}
      ORDER BY created_at DESC LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const record = result[0];
    if (!record.is_valid) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 401 });
    }

    // OTP valid. Delete it so it can't be reused
    await sql`DELETE FROM admin_otp WHERE id = ${record.id}`;

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
