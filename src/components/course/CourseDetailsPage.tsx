"use client";

import type { LocaleCode } from "@/types/site";
import { CourseLayout } from "./CourseLayout";

interface CourseDetailsPageProps {
  locale: LocaleCode;
}

export function CourseDetailsPage({ locale }: CourseDetailsPageProps) {
  const isAr = locale === "ar";

  const t = {
    overviewTitleAr: "عن الورشة 🚀",
    overviewTitleEn: "About the Workshop 🚀",
    overviewTextAr: "في هذه الورشة التفاعلية التي تمتد لساعتين، سيتعلم الأطفال كيف يعمل الذكاء الاصطناعي التوليدي من خلال التجربة العملية. يتم تنظيم الطلاب في مجموعات صغيرة (١٠ أطفال كحد أقصى) لتوفير أقصى قدر من الاهتمام الفردي ومساعدة الأطفال على بناء ثقتهم الرقمية.",
    overviewTextEn: "In this 2-hour interactive workshop, children will discover how generative AI works through hands-on experimentation. Students are organized in small group settings (max 10 kids) to ensure personalized attention and foster digital confidence.",
    
    specsTitleAr: "مواصفات الورشة",
    specsTitleEn: "Workshop Specifications",
    specsAr: [
      { label: "الفئة العمرية", value: "٨ إلى ١٢ سنة" },
      { label: "مدة الجلسة", value: "ساعتان كاملتان (١٢٠ دقيقة)" },
      { label: "المكان", value: "مركز Triple A التعليمي، الدور الثاني، إيست هب، مدينتي" },
      { label: "الحد الأقصى", value: "١٠ طلاب فقط لكل جلسة لضمان جودة الاستيعاب" },
    ],
    specsEn: [
      { label: "Target Age", value: "8 to 12 years old" },
      { label: "Session Duration", value: "2 full hours (120 minutes)" },
      { label: "Location", value: "Triple A Education Center, 2nd Floor, East Hub, Madinaty" },
      { label: "Room Capacity", value: "Strictly max 10 students for quality interaction" },
    ],

    pillarsTitleAr: "المحاور الأساسية الأربعة للمنهج 💡",
    pillarsTitleEn: "Four Core Curriculum Pillars 💡",
    pillarsAr: [
      {
        icon: "🤖",
        title: "أساسيات الذكاء الاصطناعي",
        text: "فهم مبسط لما هو الذكاء الاصطناعي، كيف يتعلم، والفرق بين العقل البشري والآلة بطريقة شيقة ومناسبة للأطفال."
      },
      {
        icon: "✏️",
        title: "الكتابة الآمنة للأوامر (Prompting)",
        text: "تعلم القواعد الأساسية لصياغة أسئلة وطلبات واضحة للحصول على أفضل إجابات، واستعمال الشات كمساعد ذكي للتعلم والإبداع."
      },
      {
        icon: "🛡️",
        title: "الأمان الرقمي والخصوصية",
        text: "قواعد ذهبية لحماية البيانات الشخصية، وعدم مشاركة أي معلومات حساسة، ومعرفة متى يجب إغلاق الشات والتحدث مع الوالدين."
      },
      {
        icon: "🔍",
        title: "التفكير النقدي والتحقق",
        text: "تدريب الأطفال على عدم تصديق كل ما تنتجه الآلة، وفهم كيف يمكن للشات أن يخطئ (الهلوسة)، وكيفية التحقق من صحة الإجابات."
      }
    ],
    pillarsEn: [
      {
        icon: "🤖",
        title: "AI & Machine Learning Basics",
        text: "A simplified, kid-friendly look at what AI is, how it processes information, and the differences between human minds and computer models."
      },
      {
        icon: "✏️",
        title: "Safe Prompt Engineering",
        text: "Learning the golden rules of structuring questions and instructions to get the best responses, using AI as an interactive study buddy."
      },
      {
        icon: "🛡️",
        title: "Digital Safety & Privacy",
        text: "Essential guidelines on protecting private information, avoiding sharing sensitive personal data, and knowing when to ask parents for help."
      },
      {
        icon: "🔍",
        title: "Critical Thinking & Verification",
        text: "Empowering children to analyze AI responses critically, understand AI 'hallucinations', and run simple checks to verify factual correctness."
      }
    ]
  };

  return (
    <CourseLayout activeTab="details" locale={locale}>
      <div className="reveal">
        {/* Intro */}
        <div className="course-detail-card" style={{ marginBottom: "2rem", borderLeft: "4px solid var(--primary)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            {isAr ? t.overviewTitleAr : t.overviewTitleEn}
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
            {isAr ? t.overviewTextAr : t.overviewTextEn}
          </p>
        </div>

        {/* Specs Table / Grid */}
        <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginTop: "3rem", marginBottom: "1.5rem" }}>
          {isAr ? t.specsTitleAr : t.specsTitleEn}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
          {(isAr ? t.specsAr : t.specsEn).map((spec, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.5rem", borderRadius: "12px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>
                {spec.label}
              </span>
              <strong style={{ fontSize: "1.05rem", color: "var(--text)" }}>{spec.value}</strong>
            </div>
          ))}
        </div>

        {/* Pillars Grid */}
        <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
          {isAr ? t.pillarsTitleAr : t.pillarsTitleEn}
        </h3>
        <div className="course-card-grid">
          {(isAr ? t.pillarsAr : t.pillarsEn).map((pillar, idx) => (
            <div key={idx} className="course-detail-card">
              <h3>
                <span className="course-card-icon">{pillar.icon}</span>
                {pillar.title}
              </h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </CourseLayout>
  );
}
