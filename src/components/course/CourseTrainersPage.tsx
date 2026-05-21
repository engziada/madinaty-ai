"use client";

import type { LocaleCode } from "@/types/site";
import { CourseLayout } from "./CourseLayout";

interface CourseTrainersPageProps {
  locale: LocaleCode;
}

export function CourseTrainersPage({ locale }: CourseTrainersPageProps) {
  const isAr = locale === "ar";

  const t = {
    supervisionTitleAr: "الهيكل التعليمي والأكاديمي 🎓",
    supervisionTitleEn: "Academic Supervision & Instructors 🎓",
    
    academicLabelAr: "تحت إشراف أكاديمي:",
    academicLabelEn: "Under Academic Supervision:",
    academicTextAr: "أساتذة ودكاترة هندسة وحاسبات من جامعة القاهرة. يتم إعداد وتدقيق المنهج العلمي ليتناسب مع القدرات العقلية واللغوية للطفل، مع الحفاظ على القواعد البرمجية الصحيحة.",
    academicTextEn: "Professors of Computer Engineering and Computer Science from Cairo University. The curriculum is academically vetted to align with cognitive development stages of young children while introducing proper logical concepts.",

    trainerLabelAr: "الإعداد والتنفيذ:",
    trainerLabelEn: "Design & Execution by:",
    trainerTextAr: "مهندسو برمجيات، خبراء تكنولوجيا معلومات، ومعلمون محترفون لضمان وصول المعلومة للطفل بشكل شيق وبأعلى معايير الأمان التقني والأخلاقي.",
    trainerTextEn: "Senior software engineers, IT specialists, and child education experts who deliver complex technical concepts through storytelling, games, and engaging hands-on coding activities.",

    timelineTitleAr: "الخطة الزمنية للجلسة (١٢٠ دقيقة) ⏱️",
    timelineTitleEn: "Session Lesson Plan (120 Minutes) ⏱️",
    
    timelineAr: [
      { time: "٠٠:٠٠ – ٠٠:٣٠", title: "مقدمة تفاعلية ولعبة تفكير آلي", text: "ترحيب بالطلاب، أنشطة كسر الجليد، ولعبة تفاعلية بدون كمبيوتر (Unplugged Activity) لفهم طريقة معالجة الآلة للأوامر." },
      { time: "٠٠:٣٠ – ٠١:٣٠", title: "تطبيق عملي: هندسة الأوامر الذكية", text: "تطبيق مباشر على أجهزة الكمبيوتر في بيئة آمنة ومراقبة. كتابة الأوامر (Prompts)، وحل تحديات إبداعية ورسم الصور وتأليف القصص بالذكاء الاصطناعي." },
      { time: "٠١:٣٠ – ٠٢:٠٠", title: "تحدي الأمان الرقمي وتوزيع الشهادات", text: "تحدي عملي لكشف المعلومات المضللة (Fact-checking)، ومسابقة الحماية والخصوصية، تليها الاحتفالية وتسليم شهادات الحضور." }
    ],
    timelineEn: [
      { time: "00:00 – 00:30", title: "Interactive Intro & Unplugged Game", text: "Icebreakers and a physical game showing how instructions (algorithms) are executed, helping kids grasp machine thinking without looking at a screen." },
      { time: "00:30 – 01:30", title: "Hands-on: Prompt Engineering Lab", text: "Working in a safe, sandboxed environment. Kids write prompts, solve creative challenges, generate artwork, and co-write stories with AI helpers." },
      { time: "01:30 – 02:00", title: "Digital Safety Quest & Graduation", text: "A fun gamified challenge about fact-checking and spotting biased info, a review of safety rules, followed by certificates of completion." }
    ]
  };

  return (
    <CourseLayout activeTab="trainers" locale={locale}>
      <div className="reveal">
        {/* Academic Supervision and Instructors Cards */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
          {isAr ? t.supervisionTitleAr : t.supervisionTitleEn}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {/* Supervision */}
          <div className="course-detail-card" style={{ borderTop: "4px solid #00c889" }}>
            <h3>
              <span className="course-card-icon">🏫</span>
              {isAr ? t.academicLabelAr : t.academicLabelEn}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              {isAr ? t.academicTextAr : t.academicTextEn}
            </p>
          </div>

          {/* Instructors */}
          <div className="course-detail-card" style={{ borderTop: "4px solid var(--primary)" }}>
            <h3>
              <span className="course-card-icon">💻</span>
              {isAr ? t.trainerLabelAr : t.trainerLabelEn}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              {isAr ? t.trainerTextAr : t.trainerTextEn}
            </p>
          </div>
        </div>

        {/* Timeline Timeline */}
        <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center" }}>
          {isAr ? t.timelineTitleAr : t.timelineTitleEn}
        </h3>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
          <style jsx>{`
            .timeline-item {
              display: flex;
              gap: 1.5rem;
              position: relative;
              padding-bottom: 2.5rem;
            }
            .timeline-item:last-child {
              padding-bottom: 0;
            }
            .timeline-item::before {
              content: "";
              position: absolute;
              top: 2rem;
              bottom: 0;
              width: 2px;
              background: var(--border);
            }
            [dir="rtl"] .timeline-item::before {
              left: auto;
              right: 1.5rem;
            }
            [dir="ltr"] .timeline-item::before {
              right: auto;
              left: 1.5rem;
            }
            .timeline-item:last-child::before {
              display: none;
            }
            .timeline-badge {
              width: 3rem;
              height: 3rem;
              flex-shrink: 0;
              background: var(--surface);
              border: 2px solid var(--primary);
              color: var(--primary);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 0.85rem;
              z-index: 1;
            }
            .timeline-content {
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 1.5rem;
              width: 100%;
              box-shadow: var(--shadow-sm);
            }
            .timeline-content h4 {
              margin: 0 0 0.5rem 0;
              font-size: 1.15rem;
              font-weight: 700;
              color: var(--text);
            }
            .timeline-time-tag {
              display: inline-block;
              background: rgba(99, 102, 241, 0.1);
              color: var(--primary);
              padding: 0.2rem 0.6rem;
              border-radius: 6px;
              font-size: 0.8rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }
            @media (max-width: 576px) {
              .timeline-item {
                flex-direction: column;
                gap: 0.75rem;
                padding-bottom: 2rem;
              }
              .timeline-item::before {
                display: none;
              }
              .timeline-badge {
                width: auto;
                height: auto;
                border-radius: 8px;
                padding: 0.4rem 0.8rem;
                align-self: flex-start;
              }
            }
          `}</style>
          {(isAr ? t.timelineAr : t.timelineEn).map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-badge">
                #{i+1}
              </div>
              <div className="timeline-content">
                <span className="timeline-time-tag">{item.time}</span>
                <h4>{item.title}</h4>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CourseLayout>
  );
}
