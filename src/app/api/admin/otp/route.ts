import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "edge";

function getSql() {
  const raw = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!raw) throw new Error("NEON_DATABASE_URL is not set");
  return neon(raw);
}

const ADMIN_PHONE = "+201555250555";

export async function POST(request: Request) {
  try {
    const wahaBaseUrl = process.env.WAHA_BASE_URL;
    const wahaApiKey = process.env.WAHA_API_KEY;
    const wahaSession = process.env.WAHA_SESSION || "default";

    if (!wahaBaseUrl || !wahaApiKey) {
      return NextResponse.json({ error: "WAHA configuration is missing" }, { status: 500 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const sql = getSql();

    // Clean up old OTPs for this phone to avoid clutter
    await sql`DELETE FROM admin_otp WHERE phone = ${ADMIN_PHONE}`;

    // Store new OTP
    await sql`
      INSERT INTO admin_otp (phone, otp, expires_at)
      VALUES (${ADMIN_PHONE}, ${otp}, CURRENT_TIMESTAMP + INTERVAL '5 minutes')
    `;

    // Send via WAHA
    const cleanDigits = ADMIN_PHONE.replace(/\D/g, "");
    let digits = cleanDigits;
    if (digits.startsWith("002")) digits = digits.slice(2);
    if (digits.startsWith("01") && digits.length === 11) digits = "2" + digits;
    if (digits.startsWith("1") && digits.length === 10) digits = "20" + digits;
    const adminChatId = `${digits}@c.us`;

    const messageText = `🔒 *Madinaty AI Admin Login*\n\nYour OTP is: *${otp}*\n\nThis OTP will expire in 5 minutes.`;

    const res = await fetch(`${wahaBaseUrl}/api/sendText`, {
      method: "POST",
      headers: {
        "X-Api-Key": wahaApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session: wahaSession,
        chatId: adminChatId,
        text: messageText
      })
    });

    if (!res.ok) {
      console.error("WAHA send OTP failed:", await res.text());
      return NextResponse.json({ error: "Failed to send OTP via WhatsApp" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin OTP error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
