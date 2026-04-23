import { NextRequest, NextResponse } from "next/server";
import { insertRegistration } from "@/lib/db";
import { sendEnrollmentConfirmation } from "@/lib/resend";

const ADDRESS_PART_RE = /^[\p{L}\p{N}\-/ ]{1,10}$/u;
const ALLOWED_GENDERS = new Set(["Male", "Female", "Prefer not to say"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      role,
      gender,
      group_no,
      building_no,
      apartment_no,
      district,
      interests,
      message,
      locale = "en",
    } = body;

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push(locale === "ar" ? "الاسم مطلوب (حرفين على الأقل)" : "Name is required (min 2 characters)");
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(locale === "ar" ? "بريد إلكتروني صحيح مطلوب" : "Valid email is required");
    }
    if (!phone || typeof phone !== "string" || !/^\+?[\d\s-]{7,15}$/.test(phone)) {
      errors.push(locale === "ar" ? "رقم هاتف صحيح مطلوب" : "Valid phone number is required");
    }

    // Gender: required when the caller sent one (i.e. the new form).
    // Older callers that still send `role` without `gender` remain valid.
    const hasGender = typeof gender === "string" && gender.length > 0;
    if (hasGender && !ALLOWED_GENDERS.has(gender)) {
      errors.push(locale === "ar" ? "قيمة النوع غير صحيحة" : "Invalid gender value");
    }

    // Unit address: if any part is provided, all three must be valid.
    const addressProvided = [group_no, building_no, apartment_no].some(
      (v) => typeof v === "string" && v.trim().length > 0
    );
    if (addressProvided) {
      if (
        typeof group_no !== "string" ||
        typeof building_no !== "string" ||
        typeof apartment_no !== "string" ||
        !ADDRESS_PART_RE.test(group_no.trim()) ||
        !ADDRESS_PART_RE.test(building_no.trim()) ||
        !ADDRESS_PART_RE.test(apartment_no.trim())
      ) {
        errors.push(
          locale === "ar"
            ? "عنوان الوحدة غير صحيح (مجموعة/عمارة/شقة)"
            : "Invalid unit address (group/building/apartment)"
        );
      }
    }

    // Either gender+address (new form) OR role (legacy) must identify the request.
    if (!hasGender && (!role || typeof role !== "string")) {
      errors.push(locale === "ar" ? "بيانات ناقصة" : "Missing fields");
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, error: errors.join("; ") }, { status: 400 });
    }

    // Save to SQLite
    const result = insertRegistration({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: typeof role === "string" && role.trim() ? role.trim() : "Resident",
      gender: hasGender ? gender : null,
      group_no: addressProvided ? (group_no as string).trim() : null,
      building_no: addressProvided ? (building_no as string).trim() : null,
      apartment_no: addressProvided ? (apartment_no as string).trim() : null,
      district: district?.trim() || null,
      interests: interests?.trim() || null,
      message: message?.trim() || null,
      locale,
    });

    // Send confirmation email (best-effort)
    try {
      await sendEnrollmentConfirmation({
        email: email.trim(),
        parentName: name.trim(),
        childName: name.trim(),
        registrationNumber: `JOIN-${result.lastInsertRowid}`,
        locale: locale === "ar" ? "ar" : "en",
      });
    } catch {
      // Email is best-effort, don't fail the request
    }

    return NextResponse.json({
      ok: true,
      message: locale === "ar"
        ? "تم التسجيل بنجاح! سنتواصل معك قريباً."
        : "Registration successful! We'll contact you soon.",
      registrationNumber: `JOIN-${result.lastInsertRowid}`,
    });
  } catch (error) {
    console.error("[JOIN API] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
}
