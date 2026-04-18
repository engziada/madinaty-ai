import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface EnrollmentEmailData {
  parentName: string;
  childName: string;
  email: string;
  registrationNumber: string;
  locale: "en" | "ar";
}

export async function sendEnrollmentConfirmation(
  data: EnrollmentEmailData
): Promise<boolean> {
  console.log("[Resend] Starting email send to:", data.email);
  console.log("[Resend] API key configured:", !!process.env.RESEND_API_KEY);

  if (!resend) {
    console.error("[Resend] Not configured - RESEND_API_KEY missing or invalid");
    return false;
  }

  const isArabic = data.locale === "ar";

  try {
    console.log("[Resend] Sending email...");

    const result = await resend.emails.send({
      from: "Madinaty AI <onboarding@resend.dev>", // Resend test domain - requires verified recipient
      to: data.email,
      subject: isArabic
        ? "تم تأكيد تسجيل نادي مدينتي للذكاء الاصطناعي"
        : "Madinaty AI Club Registration Confirmed",
      html: isArabic
        ? `<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0057b8;">تم التسجيل بنجاح! 🎉</h2>
          <p>مرحباً ${data.parentName}،</p>
          <p>تم تسجيل <strong>${data.childName}</strong> بنجاح في نادي مدينتي للذكاء الاصطناعي.</p>
          <div style="background: linear-gradient(135deg, #0057b8 0%, #00a3e0 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">رقم التسجيل الخاص بك:</p>
            <p style="margin: 8px 0; font-size: 24px; font-weight: bold; font-family: monospace; letter-spacing: 1px;">${data.registrationNumber}</p>
          </div>
          <p style="color: #666; font-size: 14px;">احتفظ بهذا الرقم - ستحتاجه للاستفسارات المستقبلية</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>سنقوم بالتواصل معك عبر الهاتف أو البريد الإلكتروني لتأكيد موعد الجلسة.</p>
          <p>شكراً لانضمامك إلى نادي مدينتي!</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">فريق مدينتي للذكاء الاصطناعي</p>
        </div>`
        : `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0057b8;">Registration Successful! 🎉</h2>
          <p>Hi ${data.parentName},</p>
          <p><strong>${data.childName}</strong> has been successfully registered for Madinaty AI Club.</p>
          <div style="background: linear-gradient(135deg, #0057b8 0%, #00a3e0 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your Registration Number:</p>
            <p style="margin: 8px 0; font-size: 24px; font-weight: bold; font-family: monospace; letter-spacing: 1px;">${data.registrationNumber}</p>
          </div>
          <p style="color: #666; font-size: 14px;">Save this number - you'll need it for future inquiries</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>We'll contact you via phone or email to confirm the session date.</p>
          <p>Thank you for joining Madinaty AI Club!</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">Madinaty AI Team</p>
        </div>`
    });

    console.log("[Resend] Send result:", result);

    if (result.error) {
      console.error("[Resend] Error:", result.error);
      return false;
    }

    if (result.data?.id) {
      console.log("[Resend] Email sent successfully, ID:", result.data.id);
      return true;
    }

    console.log("[Resend] Unknown response:", result);
    return false;
  } catch (err) {
    console.error("[Resend] Failed to send email:", err);
    return false;
  }
}
