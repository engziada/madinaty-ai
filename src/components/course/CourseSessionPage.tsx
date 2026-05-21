"use client";

import { useState, Suspense } from "react";
import type { LocaleCode } from "@/types/site";
import { CourseLayout } from "./CourseLayout";
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
    june6Ar: "السبت ٦ يونيو ٢٠٢٦",
    june6En: "Saturday, June 6, 2026",
    june13Ar: "السبت ١٣ يونيو ٢٠٢٦",
    june13En: "Saturday, June 13, 2026",
    timeAr: "٨:٠٠ مساءً – ١٠:٠٠ مساءً (ساعتان)",
    timeEn: "8:00 PM – 10:00 PM (2 Hours)",
    seatsAr: "متبقي مقاعد محدودة للجلسة",
    seatsEn: "Limited seats remaining for this session",
    detailsTitleAr: "ما الذي يميز هذه الجلسة؟",
    detailsTitleEn: "What makes this session special?",
    statsAr: [
      { icon: "🛡️", title: "بيئة تعليمية آمنة", text: "استخدام أدوات وحسابات تم التحقق منها وبإشراف مدربين متخصصين." },
      { icon: "👥", title: "مجموعات صغيرة جداً", text: "بحد أقصى ١٠ أطفال في القاعة لضمان تجودة التفاعل والتعلم الفردي." },
      { icon: "💰", title: "سعر مدعوم للمجتمع", text: "تخفيض ٦٥٪ لسكان مدينتي (٢٠٠ ج.م بدلاً من ٥٧٠ ج.م) لأول ٢٠ مشترك." }
    ],
    statsEn: [
      { icon: "🛡️", title: "100% Safe Environment", text: "Using verified AI tools and accounts supervised by experienced trainers." },
      { icon: "👥", title: "Ultra-small Groups", text: "Max 10 kids per room to ensure personalized attention and interactive learning." },
      { icon: "💰", title: "Community Subsidized", text: "65% discount for Madinaty residents (200 EGP instead of 570 EGP) for the first 20 signups." }
    ]
  };

  return (
    <CourseLayout activeTab="session" locale={locale}>
      <div className="reveal">
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.75rem", fontWeight: "700" }}>
          {isAr ? t.datesTitleAr : t.datesTitleEn}
        </h2>

        {/* Date Selector Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {/* Slot 1: June 6 */}
          <div className="course-detail-card" style={{ border: "1px solid var(--primary)", background: "rgba(99, 102, 241, 0.03)", textAlign: "center" }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto" }}>📅</div>
            <h3>{isAr ? t.june6Ar : t.june6En}</h3>
            <p style={{ fontWeight: "600", color: "var(--primary)", marginBottom: "0.5rem" }}>
              {isAr ? t.timeAr : t.timeEn}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#00c889" }}>
              🟢 {isAr ? t.seatsAr : t.seatsEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setEnrollOpen(true)}>
              {isAr ? t.registerBtnAr : t.registerBtnEn}
            </button>
          </div>

          {/* Slot 2: June 13 */}
          <div className="course-detail-card" style={{ border: "1px solid var(--primary)", background: "rgba(99, 102, 241, 0.03)", textAlign: "center" }}>
            <div className="course-card-icon" style={{ margin: "0 auto 1rem auto" }}>📅</div>
            <h3>{isAr ? t.june13Ar : t.june13En}</h3>
            <p style={{ fontWeight: "600", color: "var(--primary)", marginBottom: "0.5rem" }}>
              {isAr ? t.timeAr : t.timeEn}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#00c889" }}>
              🟢 {isAr ? t.seatsAr : t.seatsEn}
            </p>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setEnrollOpen(true)}>
              {isAr ? t.registerBtnAr : t.registerBtnEn}
            </button>
          </div>
        </div>

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
