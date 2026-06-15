"use client";

import { useState, Suspense } from "react";
import type { LocaleCode } from "@/types/site";
import { CourseLayout } from "./CourseLayout";
import { HighlightsGallery } from "./HighlightsGallery";
import dynamic from "next/dynamic";

const AstroChatEnrollment = dynamic(
  () => import("@/components/conversational/AstroChatEnrollment").then((m) => m.AstroChatEnrollment),
  { ssr: false }
);

interface CourseSessionPageProps {
  locale: LocaleCode;
}

export function CourseSessionPage({ locale }: CourseSessionPageProps) {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const isAr = locale === "ar";

  const t = {
    datesTitleAr: "التواريخ المتاحة للجلسات القادمة 📅",
    datesTitleEn: "Available Dates for Upcoming Sessions 📅",
    registerBtnAr: "سجل الآن",
    registerBtnEn: "Register Now",
    soldOutBtnAr: "كامل العدد",
    soldOutBtnEn: "Sold Out",
    june6Ar: "السبت ٦ يونيو ٢٠٢٦",
    june6En: "Saturday, June 6, 2026",
    june13Ar: "السبت ١٣ يونيو ٢٠٢٦",
    june13En: "Saturday, June 13, 2026",
    june20Ar: "السبت ٢٠ يونيو ٢٠٢٦",
    june20En: "Saturday, June 20, 2026",
    time12Ar: "١٢:٠٠ ظهراً – ٢:٠٠ ظهراً (ساعتان)",
    time12En: "12:00 PM – 2:00 PM (2 Hours)",
    time8Ar: "٨:٠٠ مساءً – ١٠:٠٠ مساءً (ساعتان)",
    time8En: "8:00 PM – 10:00 PM (2 Hours)",
    soldOutAr: "🔴 كامل العدد — تم حجز جميع المقاعد",
    soldOutEn: "🔴 Sold Out — All seats reserved",
    lastChanceAr: "🟢 مقاعد مخفضة متاحة — آخر فرصة!",
    lastChanceEn: "🟢 Discounted seats available — Last chance!",
    hurryAr: "أسرع — هذا آخر موعد للحجز بالسعر المخفض ١٩٩٫٩٩ ج.م",
    hurryEn: "Hurry up — this is your last chance to book at the discounted price of 199.99 EGP",
    detailsTitleAr: "ما الذي يميز هذه الجلسة؟",
    detailsTitleEn: "What makes this session special?",
    announcementTitleAr: "📢 إعلان هام",
    announcementTitleEn: "📢 Important Announcement",
    announcementBodyAr: "الموجتان الأولى والثانية (٦ و ١٣ يونيو) تمتا بنجاح كبير وكامل العدد. نفتح الآن باب الحجز للموجة الثالثة يوم السبت ٢٠ يونيو الساعة ١٢:٠٠ ظهراً — أسرع قبل نفاذ المقاعد!",
    announcementBodyEn: "Waves 1 & 2 (June 6 & 13) were a huge success and fully reserved. We are now opening registration for Wave 3 on Saturday, June 20 at 12:00 PM — hurry before seats fill up!",
    statsAr: [
      { icon: "🛡️", title: "بيئة تعليمية آمنة", text: "استخدام أدوات وحسابات تم التحقق منها وبإشراف مدربين متخصصين." },
      { icon: "👥", title: "مجموعات صغيرة جداً", text: "بحد أقصى ١٠ أطفال في القاعة لضمان جودة التفاعل والتعلم الفردي." },
      { icon: "💰", title: "سعر مدعوم للمجتمع", text: "تخفيض ٦٥٪ لسكان مدينتي (١٩٩٫٩٩ ج.م بدلاً من 569.99 ج.م) — آخر فرصة!" }
    ],
    statsEn: [
      { icon: "🛡️", title: "100% Safe Environment", text: "Using verified AI tools and accounts supervised by experienced trainers." },
      { icon: "👥", title: "Ultra-small Groups", text: "Max 10 kids per room to ensure personalized attention and interactive learning." },
      { icon: "💰", title: "Community Subsidized", text: "65% discount for Madinaty residents (199.99 EGP instead of 569.99 EGP) — last chance!" }
    ]
  };

  return (
    <CourseLayout activeTab="session" locale={locale}>
      <div className="reveal">
        <h2 style={{ textAlign: "center", marginBottom: "2rem", marginTop: "3rem", fontSize: "1.75rem", fontWeight: "700" }}>
          {isAr ? t.datesTitleAr : t.datesTitleEn}
        </h2>

        {/* Announcement Banner */}
        <div style={{
          background: "linear-gradient(135deg, #fff3cd, #ffeaa7)",
          border: "1px solid #f0c040",
          borderRadius: "12px",
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#856404"
        }}>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "700" }}>
            {isAr ? t.announcementTitleAr : t.announcementTitleEn}
          </h3>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            {isAr ? t.announcementBodyAr : t.announcementBodyEn}
          </p>
        </div>

        {/* Date Selector Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {/* Slot 1: June 6 @ 12:00 PM — SOLD OUT */}
          <div className="course-detail-card" style={{ border: "1px solid #e5e7eb", background: "rgba(0,0,0,0.03)", textAlign: "center", opacity: 0.7 }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto", filter: "grayscale(1)" }}>📅</div>
            <h3>{isAr ? t.june6Ar : t.june6En}</h3>
            <p style={{ fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              {isAr ? t.time12Ar : t.time12En}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#dc2626", fontWeight: "600" }}>
              {isAr ? t.soldOutAr : t.soldOutEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn" style={{ width: "100%", background: "#9ca3af", cursor: "not-allowed" }} disabled>
              {isAr ? t.soldOutBtnAr : t.soldOutBtnEn}
            </button>
          </div>

          {/* Slot 2: June 6 @ 8:00 PM — SOLD OUT */}
          <div className="course-detail-card" style={{ border: "1px solid #e5e7eb", background: "rgba(0,0,0,0.03)", textAlign: "center", opacity: 0.7 }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto", filter: "grayscale(1)" }}>📅</div>
            <h3>{isAr ? t.june6Ar : t.june6En}</h3>
            <p style={{ fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              {isAr ? t.time8Ar : t.time8En}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#dc2626", fontWeight: "600" }}>
              {isAr ? t.soldOutAr : t.soldOutEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn" style={{ width: "100%", background: "#9ca3af", cursor: "not-allowed" }} disabled>
              {isAr ? t.soldOutBtnAr : t.soldOutBtnEn}
            </button>
          </div>

          {/* Slot 3: June 13 @ 8:00 PM — SOLD OUT */}
          <div className="course-detail-card" style={{ border: "1px solid #e5e7eb", background: "rgba(0,0,0,0.03)", textAlign: "center", opacity: 0.7 }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto", filter: "grayscale(1)" }}>📅</div>
            <h3>{isAr ? t.june13Ar : t.june13En}</h3>
            <p style={{ fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              {isAr ? t.time12Ar : t.time12En}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#dc2626", fontWeight: "600" }}>
              {isAr ? t.soldOutAr : t.soldOutEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn" style={{ width: "100%", background: "#9ca3af", cursor: "not-allowed" }} disabled>
              {isAr ? t.soldOutBtnAr : t.soldOutBtnEn}
            </button>
          </div>

          {/* Slot 4: June 20 @ 12:00 PM — WAVE 3 */}
          <div className="course-detail-card" style={{ border: "2px solid var(--primary)", background: "rgba(99, 102, 241, 0.05)", textAlign: "center", boxShadow: "0 4px 20px rgba(99,102,241,0.12)" }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto" }}>📅</div>
            <h3>{isAr ? t.june20Ar : t.june20En}</h3>
            <p style={{ fontWeight: "600", color: "var(--primary)", marginBottom: "0.5rem" }}>
              {isAr ? t.time12Ar : t.time12En}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#00c889", fontWeight: "600" }}>
              {isAr ? t.lastChanceAr : t.lastChanceEn}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--primary)", marginTop: "0.5rem", fontWeight: "500" }}>
              {isAr ? t.hurryAr : t.hurryEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setEnrollOpen(true)}>
              {isAr ? t.registerBtnAr : t.registerBtnEn}
            </button>
          </div>
        </div>

        {/* First Session Gallery */}
        <HighlightsGallery locale={locale} />

        {/* Bullet points info */}
        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
            {isAr ? t.detailsTitleAr : t.detailsTitleEn}
          </h3>
          <div className="course-card-grid">
            {(isAr ? t.statsAr : t.statsEn).map((item, idx) => (
              <div key={idx} className="course-detail-card">
                <h3>
                  <span className="course-card-icon">{item.icon}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <AstroChatEnrollment
          open={enrollOpen}
          onClose={() => setEnrollOpen(false)}
          locale={locale}
        />
      </Suspense>
    </CourseLayout>
  );
}
