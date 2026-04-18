import { NextRequest, NextResponse } from "next/server";
import { sendEnrollmentConfirmation } from "@/lib/resend";

// Configuration: Use Google Apps Script Web App URL (simpler than Service Account)
// Set GOOGLE_SHEETS_SCRIPT_URL in .env.local after deploying the script from scripts/google-apps-script.js
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL?.trim() ?? "";

interface EnrollmentPayload {
  childName: string;
  childAge: string;
  childGender: string;
  childGrade: string;
  schoolName: string;
  parentName: string;
  parentNationalId: string;
  phone: string;
  email: string;
  madinatyAddress: string;
  interests: string[];
  hobbies: string;
  locale: "en" | "ar";
}

function isValidPayload(payload: unknown): payload is EnrollmentPayload {
  if (!payload || typeof payload !== "object") {
    console.error("[Enrollment] Invalid payload: not an object");
    return false;
  }

  const data = payload as Partial<EnrollmentPayload>;
  const age = Number(data.childAge);

  const validations = [
    { name: "childName", valid: typeof data.childName === "string" && data.childName.trim().length > 1, value: data.childName },
    { name: "childAge", valid: Number.isFinite(age) && age >= 7 && age <= 10, value: data.childAge },
    { name: "childGender", valid: typeof data.childGender === "string" && data.childGender.trim().length > 0, value: data.childGender },
    { name: "childGrade", valid: typeof data.childGrade === "string" && data.childGrade.trim().length > 0, value: data.childGrade },
    { name: "schoolName", valid: typeof data.schoolName === "string" && data.schoolName.trim().length > 1, value: data.schoolName },
    { name: "parentName", valid: typeof data.parentName === "string" && data.parentName.trim().length > 1, value: data.parentName },
    { name: "parentNationalId", valid: typeof data.parentNationalId === "string" && /^\d{14}$/.test(data.parentNationalId), value: data.parentNationalId },
    { name: "phone", valid: typeof data.phone === "string" && /^\+?[0-9\s-]{7,15}$/.test(data.phone), value: data.phone },
    { name: "email", valid: typeof data.email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email), value: data.email },
    { name: "madinatyAddress", valid: typeof data.madinatyAddress === "string" && data.madinatyAddress.trim().length > 2, value: data.madinatyAddress },
    { name: "interests", valid: Array.isArray(data.interests) && data.interests.length > 0, value: data.interests },
    { name: "hobbies", valid: typeof data.hobbies === "string" && data.hobbies.trim().length > 1, value: data.hobbies },
    { name: "locale", valid: data.locale === "en" || data.locale === "ar", value: data.locale }
  ];

  const failed = validations.filter(v => !v.valid);
  if (failed.length > 0) {
    console.error("[Enrollment] Validation failed for fields:", failed.map(f => ({ field: f.name, value: f.value })));
  }

  return failed.length === 0;
}

function getEnrollmentEndpoint(): string {
  return (
    process.env.ENROLLMENT_WEBHOOK_URL ??
    process.env.SHEETS_ENDPOINT ??
    process.env.NEXT_PUBLIC_SHEETS_ENDPOINT ??
    ""
  ).trim();
}

// Generate registration number: MDN-YYYYMMDD-XXXX
function generateRegistrationNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MDN-${dateStr}-${random}`;
}

// Send to Google Apps Script Web App (much simpler than Service Account)
async function sendToGoogleScript(
  payload: EnrollmentPayload,
  regNumber: string
): Promise<boolean> {
  if (!GOOGLE_SCRIPT_URL) {
    console.error("[Enrollment] Google Script URL not configured");
    return false;
  }

  try {
    console.log("[Enrollment] Sending to Google Script URL:", GOOGLE_SCRIPT_URL.slice(0, 50) + "...");

    const requestBody = {
      ...payload,
      registrationNumber: regNumber,
      submittedAt: new Date().toISOString()
    };
    console.log("[Enrollment] Request body:", JSON.stringify(requestBody, null, 2));

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      cache: "no-store"
    });

    console.log("[Enrollment] Google Script response status:", res.status);

    const responseText = await res.text();
    console.log("[Enrollment] Google Script response text:", responseText.slice(0, 500));

    let data: { success?: boolean } = { success: false };
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("[Enrollment] Failed to parse Google Script response as JSON");
    }

    const success = res.ok && data.success === true;
    console.log("[Enrollment] Google Script success:", success);
    return success;
  } catch (error) {
    console.error("[Enrollment] Google Script network/error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as unknown;
    console.log("[Enrollment] Received payload:", payload);

    if (!isValidPayload(payload)) {
      console.error("[Enrollment] Invalid payload validation failed");
      return NextResponse.json({ error: "Invalid enrollment payload" }, { status: 400 });
    }

    const regNumber = generateRegistrationNumber();
    console.log("[Enrollment] Generated reg number:", regNumber);
    console.log("[Enrollment] Google Script URL configured:", !!GOOGLE_SCRIPT_URL);

    // Try Google Apps Script first
    const scriptSuccess = await sendToGoogleScript(payload, regNumber);
    console.log("[Enrollment] Google Script success:", scriptSuccess);

    // Fallback to webhook if configured and script fails
    const endpoint = getEnrollmentEndpoint();
    console.log("[Enrollment] Webhook endpoint configured:", !!endpoint);

    let webhookSuccess = false;
    if (!scriptSuccess && endpoint) {
      try {
        const webhookRes = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            registrationNumber: regNumber,
            submittedAt: new Date().toISOString()
          }),
          cache: "no-store"
        });
        webhookSuccess = webhookRes.ok;
        console.log("[Enrollment] Webhook response:", webhookRes.status, webhookSuccess);
      } catch (err) {
        console.error("[Enrollment] Webhook failed:", err);
      }
    }

    if (!scriptSuccess && !endpoint) {
      console.error("[Enrollment] Both storage methods failed");
      return NextResponse.json(
        { error: "No enrollment storage configured" },
        { status: 503 }
      );
    }

    // Send confirmation email (non-blocking - don't wait for it)
    sendEnrollmentConfirmation({
      parentName: payload.parentName,
      childName: payload.childName,
      email: payload.email,
      registrationNumber: regNumber,
      locale: payload.locale
    }).catch((err) => console.error("Email send failed:", err));

    console.log("[Enrollment] Success - returning reg number:", regNumber);
    return NextResponse.json(
      { ok: true, registrationNumber: regNumber },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Enrollment] Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error while submitting enrollment", details: String(error) },
      { status: 500 }
    );
  }
}
