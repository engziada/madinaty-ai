"use client";

import { useState } from "react";
import type { LocaleCode } from "@/types/site";
import { CourseLayout } from "./CourseLayout";

interface CourseFaqPageProps {
  locale: LocaleCode;
}

export function CourseFaqPage({ locale }: CourseFaqPageProps) {
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = {
    faqTitleAr: "الأسئلة الشائعة والسياسات ❓",
    faqTitleEn: "Frequently Asked Questions & Policies ❓",
    policyTitleAr: "سياسة الحضور والإلغاء",
    policyTitleEn: "Attendance & Cancellation Policy",
    policyTextsAr: [
      "التسجيل المسبق إلزامي لحضور الجلسة وتأمين المقعد.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل موعد الجلسة بـ ٤٨ ساعة على الأقل ليتمكن الطلاب في قائمة الانتظار من المشاركة.",
      "الرسوم (١٩٩٫٩٩ ج.م) غير مستردة في حالة الغياب بدون إشعار مسبق قبل الموعد بـ ٤٨ ساعة."
    ],
    policyTextsEn: [
      "Prior registration is strictly mandatory to secure your child's seat.",
      "To cancel or reschedule, please notify us at least 48 hours in advance so we can offer the seat to candidates on the waiting list.",
      "The promo fee (199.99 EGP) is non-refundable for no-shows without 48-hour prior notice."
    ],
    faqsAr: [
      {
        q: "هل الكورس مجاني بالكامل؟",
        a: "الورشة ليست مجانية، بل تُقدم بسعر رمزي مدعوم لسكان مدينتي فقط وهو ١٩٩٫٩٩ ج.م للطفل (خصم ٦٥٪ من السعر الأصلي البالغ ٥٧٠ ج.م)، وذلك لأول ٢٠ مشترك لتغطية تكاليف التشغيل وضمان جدية الحجز."
      },
      {
        q: "ما هي الفئة العمرية المستهدفة؟",
        a: "الورشة مصممة خصيصاً للأطفال من عمر ٨ إلى ١٢ سنة. المنهج والألعاب التعليمية والتطبيقات العملية مناسبة تماماً لهذه الفئة العمرية."
      },
      {
        q: "أين تقع القاعة المخصصة للورشة؟",
        a: "تقام الورشة في مركز Triple A التعليمي (East Hub - الدور الثاني)، القاهرة الجديدة. الموقع مجهز بالكامل بأجهزة الكمبيوتر وشبكة إنترنت سريعة وبيئة مكيفة وآمنة للأطفال."
      },
      {
        q: "هل يمكن لأولياء الأمور حضور الورشة مع الأطفال؟",
        a: "نعم، يمكن لأولياء الأمور الحضور مع أطفالهم للمراقبة، ويمكنهم أيضاً المشاركة في بعض الأنشطة التفاعلية خلال الجلسة."
      },
      {
        q: "ما هي الأدوات المطلوبة من الطفل؟",
        a: "لا يحتاج الطفل لإحضار أي أجهزة معه. المركز يوفر أجهزة كمبيوتر وشاشات وحسابات تعليمية آمنة ومجهزة لكل طفل لتطبيق الأنشطة عملياً."
      }
    ],
    faqsEn: [
      {
        q: "Is the workshop completely free?",
        a: "No, the session is subsidized at a very low price of 199.99 EGP per child for the Madinaty community (65% off the standard fee of 570 EGP). This special pricing applies to the first 20 children to cover operating costs and confirm commitment."
      },
      {
        q: "What is the target age group?",
        a: "The workshop is tailored for children aged 8 to 12. The exercises, interactive storytelling, prompting games, and safety principles are specially designed for this cognitive stage."
      },
      {
        q: "Where is the session located?",
        a: "Sessions take place at the Triple A Education Center, 2nd Floor, East Hub, Madinaty. The lab is equipped with high-speed computers, safe internet filters, and a comfortable, secure environment."
      },
      {
        q: "Can parents attend the classroom session?",
        a: "Yes, parents may attend with their kids to monitor and may even contribute to some of the activities during the session."
      },
      {
        q: "Do children need to bring their own laptops?",
        a: "No, everything is provided! Every child will have access to a computer with pre-configured, safe educational AI sandboxes and tools."
      }
    ]
  };

  const currentFaqs = isAr ? t.faqsAr : t.faqsEn;

  return (
    <CourseLayout activeTab="faq" locale={locale}>
      <div className="reveal" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
          {isAr ? t.faqTitleAr : t.faqTitleEn}
        </h2>

        {/* FAQs Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
          <style jsx>{`
            .faq-item {
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: 12px;
              overflow: hidden;
              transition: border-color 0.2s ease;
            }
            .faq-item:hover {
              border-color: rgba(99, 102, 241, 0.3);
            }
            .faq-item.open {
              border-color: var(--primary);
            }
            .faq-q {
              width: 100%;
              padding: 1.25rem 1.5rem;
              text-align: left;
              background: none;
              border: none;
              color: var(--text);
              font-size: 1.05rem;
              font-weight: 700;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              outline: none;
            }
            [dir="rtl"] .faq-q {
              text-align: right;
            }
            .faq-a {
              padding: 0 1.5rem 1.25rem 1.5rem;
              color: var(--text-muted);
              font-size: 0.95rem;
              line-height: 1.6;
            }
            .faq-arrow {
              font-size: 0.8rem;
              transition: transform 0.2s ease;
              color: var(--text-muted);
            }
            .faq-item.open .faq-arrow {
              transform: rotate(90deg);
            }
          `}</style>
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-arrow" aria-hidden="true">
                    {isOpen ? "▼" : isAr ? "◀" : "▶"}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-a">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Policies section */}
        <div className="course-detail-card" style={{ background: "rgba(255, 170, 0, 0.02)", borderColor: "rgba(255, 170, 0, 0.15)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#e6a800", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <span>⚠️</span>
            <span>{isAr ? t.policyTitleAr : t.policyTitleEn}</span>
          </h3>
          <ul style={{ margin: 0, paddingLeft: isAr ? 0 : "1.25rem", paddingRight: isAr ? "1.25rem" : 0 }}>
            {(isAr ? t.policyTextsAr : t.policyTextsEn).map((text, i) => (
              <li key={i} style={{ marginBottom: "0.5rem", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CourseLayout>
  );
}
