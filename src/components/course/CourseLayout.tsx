"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { LocaleCode } from "@/types/site";

const AstroChatEnrollment = dynamic(
  () => import("@/components/conversational/AstroChatEnrollment").then((m) => m.AstroChatEnrollment),
  { ssr: false }
);

interface CourseLayoutProps {
  children: React.ReactNode;
  activeTab: "session" | "details" | "trainers" | "faq";
  locale: LocaleCode;
}

export function CourseLayout({ children, activeTab, locale }: CourseLayoutProps) {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const isAr = locale === "ar";

  const navigation = [
    { id: "session", labelAr: "احجز الجلسة", labelEn: "Book Session", href: `/${locale}/course/session` },
    { id: "details", labelAr: "تفاصيل الورشة", labelEn: "Workshop Details", href: `/${locale}/course/details` },
    { id: "trainers", labelAr: "المدربون والمنهج", labelEn: "Trainers & Curriculum", href: `/${locale}/course/trainers` },
    { id: "faq", labelAr: "أسئلة شائعة وسياسات", labelEn: "FAQ & Policies", href: `/${locale}/course/faq` },
  ];

  const t = {
    categoryAr: "مركز الابتكار بمدينتي · Triple A إيست هب",
    categoryEn: "Madinaty Innovation Hub · Triple A East Hub",
    titleAr: "شات الذكاء الاصطناعي للأطفال (أعمار ٨-١٢)",
    titleEn: "AI Chatbots for Kids (Ages 8-12)",
    badgeAr: "عرض المونديال: ٤٤٩٫٩٩ ج.م (خصم ٢٠٪) 🏆⚽",
    badgeEn: "World Cup Offer: 449.99 EGP (20% Off) 🏆⚽",
    descriptionAr: "ورشة عمل تفاعلية لبناء مهارات المستقبل، تعليم أدوات الشات والكتابة الآمنة للأوامر.",
    descriptionEn: "An interactive hands-on workshop to build future-ready skills, teaching chatbot tools, safe prompting, and critical thinking.",
    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    noteAr: "خصم المونديال ٢٠٪ مستمر لآخر يونيو · متاح للجميع ⚽",
    noteEn: "20% World Cup discount ongoing through June · Available for everyone ⚽"
  };

  return (
    <main id="main-content" className="course-page-wrapper" tabIndex={-1}>
      {/* Scope CSS Styles for Course layouts */}
      <style jsx global>{`
        .course-page-wrapper {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding-bottom: 80px;
          position: relative;
          z-index: 1;
        }
        
        .course-bg-animation {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        .poly {
          position: absolute;
          filter: blur(90px);
          opacity: 0.35;
          animation: floatBg 25s infinite alternate ease-in-out;
        }
        .poly-1 {
          width: 50vw; height: 50vw;
          background: rgba(43, 110, 255, 0.12);
          top: -20%; left: -10%;
          animation-delay: 0s;
        }
        .poly-2 {
          width: 45vw; height: 45vw;
          background: rgba(11, 184, 199, 0.12);
          bottom: -20%; right: -10%;
          animation-delay: -5s;
        }
        .poly-3 {
          width: 40vw; height: 40vw;
          background: rgba(147, 51, 234, 0.08);
          top: 30%; left: 40%;
          animation-delay: -10s;
        }
        @keyframes floatBg {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(3%, 8%) scale(1.05) rotate(10deg); }
          100% { transform: translate(-3%, -8%) scale(0.95) rotate(-10deg); }
        }

        .course-hero {
          background: linear-gradient(180deg, rgba(43, 110, 255, 0.07) 0%, rgba(43, 110, 255, 0) 100%);
          border-bottom: 1px solid var(--border);
          padding: 3rem 0;
          text-align: center;
        }

        .course-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          background: rgba(43, 110, 255, 0.10);
          color: var(--blue);
          border: 1px solid rgba(43, 110, 255, 0.22);
          margin-bottom: 1rem;
        }

        .course-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .course-hero-p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 1.5rem auto;
          line-height: 1.6;
        }

        .course-subnav-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          margin-bottom: 1rem;
          overflow-x: auto;
          padding: 0.25rem;
        }

        .course-subnav {
          display: flex;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.35rem;
          border-radius: 12px;
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
        }

        .course-subnav-link {
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-soft);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .course-subnav-link:hover {
          color: var(--text);
          background: var(--bg-alt);
        }

        .course-subnav-link.active {
          color: #ffffff;
          background: var(--blue);
          box-shadow: 0 4px 12px rgba(43, 110, 255, 0.30);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .course-title {
            font-size: 1.75rem;
            padding: 0 1rem;
          }
          .course-hero-p {
            font-size: 0.95rem;
            padding: 0 1rem;
          }
          .course-subnav-container {
            justify-content: flex-start;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Generic details styling */
        .course-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .course-detail-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--shadow-card);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .course-detail-card:hover {
          transform: translateY(-2px);
          border-color: rgba(43, 110, 255, 0.25);
        }

        .course-detail-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text);
        }

        .course-card-icon {
          width: 2.2rem;
          height: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(43, 110, 255, 0.08);
          color: var(--blue);
          border-radius: 8px;
          font-size: 1.2rem;
        }

        .course-detail-card p, .course-detail-card li {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .course-detail-card ul {
          padding-left: 1.25rem;
          margin-top: 0.75rem;
          margin-bottom: 0;
        }
        
        [dir="rtl"] .course-detail-card ul {
          padding-left: 0;
          padding-right: 1.25rem;
        }

        .course-detail-card li {
          margin-bottom: 0.5rem;
        }

        /* Sticky bottom action for course registration */
        .course-cta-banner {
          background: linear-gradient(135deg, rgba(43, 110, 255, 0.07) 0%, rgba(11, 184, 199, 0.05) 100%);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          margin-top: 3rem;
          position: relative;
          overflow: hidden;
        }

        .course-cta-banner::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(43, 110, 255, 0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .course-cta-banner h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .course-cta-banner p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .course-cta-btn {
          font-weight: 600;
          font-size: 1.05rem;
          padding: 0.8rem 2.2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(43, 110, 255, 0.25);
          transition: all 0.2s ease;
        }

        .course-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(43, 110, 255, 0.35);
        }

        .course-cta-note {
          display: block;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--blue);
        }
      `}</style>

      {/* Animated Background */}
      <div className="course-bg-animation">
        <div className="poly poly-1" />
        <div className="poly poly-2" />
        <div className="poly poly-3" />
      </div>

      {/* ── COURSE HERO ── */}
      <section className="course-hero">
        <div className="container">
          <div className="course-badge">
            <span aria-hidden="true">💡</span>
            <span>{isAr ? t.categoryAr : t.categoryEn}</span>
          </div>
          <h1 className="course-title">
            {isAr ? t.titleAr : t.titleEn}
          </h1>
          <p className="course-hero-p">
            {isAr ? t.descriptionAr : t.descriptionEn}
          </p>
          <div className="course-badge" style={{ background: "rgba(0, 200, 137, 0.1)", color: "#00c889", borderColor: "rgba(0, 200, 137, 0.2)" }}>
            <span>⚡ {isAr ? t.badgeAr : t.badgeEn}</span>
          </div>

          {/* Sub-Navigation tabs */}
          <div className="course-subnav-container">
            <nav className="course-subnav">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`course-subnav-link ${activeTab === item.id ? "active" : ""}`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── PAGE CONTENT ── */}
      <section className="course-content-section">
        <div className="container">
          {children}

          {/* Premium call to action box at the bottom of pages (except FAQ perhaps, but good for all!) */}
          {activeTab !== "faq" && (
            <div className="course-cta-banner reveal">
              <h2>{isAr ? "جاهز للمستقبل؟ 🚀" : "Ready for the Future? 🚀"}</h2>
              <p>{isAr ? "احجز مكان طفلك الآن في الجلسة التفاعلية العملية" : "Book your child's seat now in the interactive hands-on session."}</p>
              <button className="btn btn-primary course-cta-btn" onClick={() => setEnrollOpen(true)}>
                {isAr ? t.ctaAr : t.ctaEn}
              </button>
              <span className="course-cta-note">
                ⚠️ {isAr ? t.noteAr : t.noteEn}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Astro Enrollment Chat Modal */}
      <Suspense fallback={null}>
        <AstroChatEnrollment
          open={enrollOpen}
          onClose={() => setEnrollOpen(false)}
          locale={locale}
        />
      </Suspense>
    </main>
  );
}
