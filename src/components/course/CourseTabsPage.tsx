"use client";

import { useState, useCallback, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { LocaleCode } from "@/types/site";
import type { Course } from "@/data/courseData";
import { AstroAvatar, type AstroMood } from "@/components/AstroAvatar";
import { HighlightsGallery } from "./HighlightsGallery";

const AstroChatEnrollment = dynamic(
  () => import("@/components/conversational/AstroChatEnrollment").then((m) => m.AstroChatEnrollment),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TabId = "registration" | "overview" | "trainers" | "faq";

interface CourseTabsPageProps {
  course: Course;
  locale: LocaleCode;
}

const TAB_DEFS: { id: TabId; labelAr: string; labelEn: string; icon: string }[] = [
  { id: "registration", labelAr: "التسجيل", labelEn: "Registration", icon: "📅" },
  { id: "overview", labelAr: "نظرة عامة", labelEn: "Overview", icon: "📋" },
  { id: "trainers", labelAr: "المدربون والمنهج", labelEn: "Trainers & Curriculum", icon: "🎓" },
  { id: "faq", labelAr: "أسئلة شائعة", labelEn: "FAQ", icon: "❓" },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CourseTabsPage({ course, locale }: CourseTabsPageProps) {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const isAr = locale === "ar";

  // Read initial tab from URL hash
  const getInitialTab = (): TabId => {
    if (typeof window === "undefined") return "registration";
    const hash = window.location.hash.replace("#", "") as TabId;
    return TAB_DEFS.some((t) => t.id === hash) ? hash : "registration";
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const tabNavRef = useRef<HTMLDivElement>(null);

  // Sync hash with active tab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (TAB_DEFS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const switchTab = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    window.history.replaceState(null, "", `#${tabId}`);
    // Scroll tab into view on mobile
    const tabEl = document.getElementById(`tab-${tabId}`);
    tabEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  // Astro mood per tab
  const astroMood: Record<TabId, AstroMood> = {
    registration: "waving",
    overview: "idle",
    trainers: "talking",
    faq: "thinking",
  };

  return (
    <main id="main-content" className="course-page-wrapper" tabIndex={-1}>
      {/* ── Scoped Styles ── */}
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

        /* ── Hero ── */
        .ct-hero {
          background: linear-gradient(180deg, rgba(43, 110, 255, 0.07) 0%, rgba(43, 110, 255, 0) 100%);
          border-bottom: 1px solid var(--border);
          padding: 3rem 0 0;
          text-align: center;
        }

        .ct-hero-astro {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          transition: all 0.4s ease;
        }

        .ct-badge {
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

        .ct-badge--mint {
          background: var(--mint-soft);
          color: var(--mint);
          border-color: rgba(34, 201, 147, 0.3);
        }

        .ct-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .ct-hero-p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 1.5rem auto;
          line-height: 1.6;
        }

        /* ── Tab Navigation ── */
        .ct-tabs-container {
          display: flex;
          justify-content: center;
          overflow-x: auto;
          padding: 0.25rem 1rem;
          margin-top: 1.5rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .ct-tabs-container::-webkit-scrollbar { display: none; }

        .ct-tabs {
          display: flex;
          gap: 0.35rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.3rem;
          border-radius: 14px;
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .ct-tab {
          padding: 0.65rem 1.3rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-soft);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          z-index: 1;
        }

        .ct-tab:hover {
          color: var(--text);
          background: var(--bg-alt);
        }

        .ct-tab.active {
          color: #ffffff;
          background: var(--blue);
          box-shadow: 0 4px 12px rgba(43, 110, 255, 0.30);
        }

        .ct-tab-icon {
          font-size: 1rem;
        }

        /* ── Tab Content ── */
        .ct-content {
          padding: 2.5rem 0;
          animation: tabFadeIn 0.35s ease;
        }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Shared Card Styles ── */
        .ct-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .ct-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--shadow-card);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .ct-card:hover {
          transform: translateY(-2px);
          border-color: rgba(43, 110, 255, 0.25);
        }

        .ct-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text);
        }

        .ct-card-icon {
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

        .ct-card p, .ct-card li {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .ct-card ul {
          padding-left: 1.25rem;
          margin-top: 0.75rem;
          margin-bottom: 0;
        }
        [dir="rtl"] .ct-card ul {
          padding-left: 0;
          padding-right: 1.25rem;
        }

        .ct-card li { margin-bottom: 0.5rem; }

        /* ── Slot Cards ── */
        .ct-announcement {
          background: var(--sun-soft);
          border: 1px solid var(--sun);
          border-radius: var(--r-lg);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
          color: var(--text);
        }

        .ct-slot-soldout {
          border-color: var(--border);
          background: var(--bg-alt);
          opacity: 0.7;
        }

        .ct-slot-soldout-text {
          font-size: 0.85rem;
          color: var(--coral);
          font-weight: 600;
        }

        .ct-slot-available {
          border-color: var(--blue);
          box-shadow: 0 4px 20px rgba(43, 110, 255, 0.12);
        }

        .ct-slot-lastchance-text {
          font-size: 0.85rem;
          color: var(--mint);
          font-weight: 600;
        }

        .ct-btn-disabled {
          width: 100%;
          background: var(--surface-hi);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.75;
        }

        /* ── Requirements ── */
        .ct-requirements {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .ct-req-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(34, 201, 147, 0.08);
          border: 1px solid rgba(34, 201, 147, 0.2);
          border-radius: 10px;
          font-size: 0.9rem;
          color: var(--text);
        }

        /* ── CTA Banner ── */
        .ct-cta-banner {
          background: linear-gradient(135deg, rgba(43, 110, 255, 0.07) 0%, rgba(11, 184, 199, 0.05) 100%);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          margin-top: 3rem;
          position: relative;
          overflow: hidden;
        }
        .ct-cta-banner::before {
          content: "";
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(43, 110, 255, 0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ct-cta-banner h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .ct-cta-banner p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }
        .ct-cta-btn {
          font-weight: 600;
          font-size: 1.05rem;
          padding: 0.8rem 2.2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(43, 110, 255, 0.25);
          transition: all 0.2s ease;
        }
        .ct-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(43, 110, 255, 0.35);
        }
        .ct-cta-note {
          display: block;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--blue);
        }

        /* ── Timeline ── */
        .ct-timeline-item {
          display: flex;
          gap: 1.5rem;
          position: relative;
          padding-bottom: 2.5rem;
        }
        .ct-timeline-item:last-child { padding-bottom: 0; }
        .ct-timeline-item::before {
          content: "";
          position: absolute;
          top: 2rem; bottom: 0;
          width: 2px;
          background: var(--border);
        }
        [dir="rtl"] .ct-timeline-item::before { left: auto; right: 1.5rem; }
        [dir="ltr"] .ct-timeline-item::before { right: auto; left: 1.5rem; }
        .ct-timeline-item:last-child::before { display: none; }
        .ct-timeline-badge {
          width: 3rem; height: 3rem;
          flex-shrink: 0;
          background: var(--surface);
          border: 2px solid var(--blue);
          color: var(--blue);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          z-index: 1;
        }
        .ct-timeline-content {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          width: 100%;
          box-shadow: var(--shadow-sm);
        }
        .ct-timeline-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
        }
        .ct-time-tag {
          display: inline-block;
          background: var(--teal-dim);
          color: var(--teal);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        /* ── FAQ Accordion ── */
        .ct-faq-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .ct-faq-item:hover { border-color: rgba(43, 110, 255, 0.3); }
        .ct-faq-item.open { border-color: var(--blue); }
        .ct-faq-q {
          width: 100%;
          padding: 1.25rem 1.5rem;
          text-align: start;
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
        .ct-faq-a {
          padding: 0 1.5rem 1.25rem 1.5rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .ct-faq-arrow {
          font-size: 0.8rem;
          transition: transform 0.2s ease;
          color: var(--text-muted);
        }
        .ct-faq-item.open .ct-faq-arrow { transform: rotate(90deg); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ct-title { font-size: 1.75rem; padding: 0 1rem; }
          .ct-hero-p { font-size: 0.95rem; padding: 0 1rem; }
          .ct-tabs-container { justify-content: flex-start; }
          .ct-timeline-item {
            flex-direction: column;
            gap: 0.75rem;
            padding-bottom: 2rem;
          }
          .ct-timeline-item::before { display: none; }
          .ct-timeline-badge {
            width: auto; height: auto;
            border-radius: 8px;
            padding: 0.4rem 0.8rem;
            align-self: flex-start;
          }
        }
        @media (max-width: 576px) {
          .ct-tab { padding: 0.55rem 0.9rem; font-size: 0.82rem; }
          .ct-tab-icon { display: none; }
        }
      `}</style>

      {/* Animated Background */}
      <div className="course-bg-animation">
        <div className="poly poly-1" />
        <div className="poly poly-2" />
        <div className="poly poly-3" />
      </div>

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="container">
          <div className="ct-hero-astro">
            <AstroAvatar mood={astroMood[activeTab]} size="lg" />
          </div>

          <div className="ct-badge">
            <span aria-hidden="true">💡</span>
            <span>{isAr ? course.categoryAr : course.categoryEn}</span>
          </div>

          <h1 className="ct-title">
            {isAr ? course.titleAr : course.titleEn}
          </h1>

          <p className="ct-hero-p">
            {isAr ? course.descriptionAr : course.descriptionEn}
          </p>

          <div className="ct-badge ct-badge--mint">
            <span>⚡ {isAr ? course.priceBadgeAr : course.priceBadgeEn}</span>
          </div>

          {/* Tab Navigation */}
          <div className="ct-tabs-container" ref={tabNavRef}>
            <nav className="ct-tabs" role="tablist">
              {TAB_DEFS.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  className={`ct-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => switchTab(tab.id)}
                  type="button"
                >
                  <span className="ct-tab-icon" aria-hidden="true">{tab.icon}</span>
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── TAB PANELS ── */}
      <section className="ct-content">
        <div className="container">
          {activeTab === "registration" && (
            <RegistrationPanel
              course={course}
              locale={locale}
              isAr={isAr}
              onEnroll={() => setEnrollOpen(true)}
            />
          )}
          {activeTab === "overview" && (
            <OverviewPanel course={course} locale={locale} isAr={isAr} />
          )}
          {activeTab === "trainers" && (
            <TrainersPanel course={course} locale={locale} isAr={isAr} />
          )}
          {activeTab === "faq" && (
            <FaqPanel course={course} locale={locale} isAr={isAr} />
          )}

          {/* CTA Banner (on all tabs except FAQ) */}
          {activeTab !== "faq" && (
            <div className="ct-cta-banner reveal">
              <h2>{isAr ? "جاهز للمستقبل؟ 🚀" : "Ready for the Future? 🚀"}</h2>
              <p>{isAr ? "احجز مكان طفلك الآن في الجلسة التفاعلية العملية" : "Book your child's seat now in the interactive hands-on session."}</p>
              <button className="btn btn-primary ct-cta-btn" onClick={() => setEnrollOpen(true)}>
                {isAr ? course.ctaAr : course.ctaEn}
              </button>
              <span className="ct-cta-note">
                ⚠️ {isAr ? course.discountNoteAr : course.discountNoteEn}
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

/* ================================================================== */
/*  TAB PANELS                                                         */
/* ================================================================== */

interface PanelProps {
  course: Course;
  locale: LocaleCode;
  isAr: boolean;
}

/* ── Registration Tab ── */
function RegistrationPanel({ course, locale, isAr, onEnroll }: PanelProps & { onEnroll: () => void }) {
  return (
    <div className="reveal" role="tabpanel" id="panel-registration" aria-labelledby="tab-registration">
      <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.75rem", fontWeight: "700" }}>
        {isAr ? "التواريخ المتاحة للجلسات القادمة 📅" : "Available Dates for Upcoming Sessions 📅"}
      </h2>

      {/* Announcement Banner */}
      {course.announcementAr && (
        <div className="ct-announcement">
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "700" }}>
            {isAr ? course.announcementTitleAr : course.announcementTitleEn}
          </h3>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            {isAr ? course.announcementAr : course.announcementEn}
          </p>
        </div>
      )}

      {/* Slot Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {course.slots.map((slot) => {
          const isSoldOut = slot.status === "sold-out";
          return (
            <div
              key={slot.id}
              className={`ct-card ${isSoldOut ? "ct-slot-soldout" : "ct-slot-available"}`}
              style={{ textAlign: "center" }}
            >
              <div className="ct-card-icon" style={{ margin: "0 auto 1rem auto", ...(isSoldOut ? { filter: "grayscale(1)" } : {}) }}>📅</div>
              <h3>{isAr ? slot.dateAr : slot.dateEn}</h3>
              <p style={{ fontWeight: "600", color: isSoldOut ? "var(--text-muted)" : "var(--blue)", marginBottom: "0.5rem" }}>
                {isAr ? slot.timeAr : slot.timeEn}
              </p>
              {slot.urgencyAr && (
                <p className={isSoldOut ? "ct-slot-soldout-text" : "ct-slot-lastchance-text"}>
                  {isAr ? slot.urgencyAr : slot.urgencyEn}
                </p>
              )}
              {slot.noteAr && (
                <p style={{ fontSize: "0.8rem", color: "var(--blue)", marginTop: "0.5rem", fontWeight: "500" }}>
                  {isAr ? slot.noteAr : slot.noteEn}
                </p>
              )}
              <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
              {isSoldOut ? (
                <button className="btn ct-btn-disabled" disabled>
                  {isAr ? "كامل العدد" : "Sold Out"}
                </button>
              ) : (
                <button className="btn btn-primary" style={{ width: "100%" }} onClick={onEnroll}>
                  {isAr ? "سجل الآن" : "Register Now"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Requirements */}
      {course.requirements.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.75rem" }}>
            {isAr ? "متطلبات المتدرب" : "Trainee Requirements"}
          </h3>
          <div className="ct-requirements">
            {course.requirements.map((req, i) => (
              <div key={i} className="ct-req-item">
                <span aria-hidden="true">{req.icon}</span>
                <span>{isAr ? req.textAr : req.textEn}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session Gallery */}
      {course.hasGallery && <HighlightsGallery locale={locale} />}

      {/* Session highlights */}
      <div style={{ marginTop: "4rem" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
          {isAr ? "ما الذي يميز هذه الجلسة؟" : "What makes this session special?"}
        </h3>
        <div className="ct-card-grid">
          {course.stats.map((item, idx) => (
            <div key={idx} className="ct-card">
              <h3>
                <span className="ct-card-icon">{item.icon}</span>
                {isAr ? item.titleAr : item.titleEn}
              </h3>
              <p>{isAr ? item.textAr : item.textEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Overview Tab ── */
function OverviewPanel({ course, isAr }: PanelProps) {
  return (
    <div className="reveal" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
      {/* Overview Intro */}
      <div className="ct-card" style={{ marginBottom: "2rem", borderInlineStart: "4px solid var(--blue)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
          {isAr ? "عن الورشة 🚀" : "About the Workshop 🚀"}
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
          {isAr ? course.overviewAr : course.overviewEn}
        </p>
      </div>

      {/* Specs Grid */}
      <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginTop: "3rem", marginBottom: "1.5rem" }}>
        {isAr ? "مواصفات الورشة" : "Workshop Specifications"}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
        {course.specs.map((spec, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1.5rem", borderRadius: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>
              {isAr ? spec.labelAr : spec.labelEn}
            </span>
            <strong style={{ fontSize: "1.05rem", color: "var(--text)" }}>
              {isAr ? spec.valueAr : spec.valueEn}
            </strong>
          </div>
        ))}
      </div>

      {/* Pillars Grid */}
      <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
        {isAr ? "المحاور الأساسية الأربعة للمنهج 💡" : "Four Core Curriculum Pillars 💡"}
      </h3>
      <div className="ct-card-grid">
        {course.pillars.map((pillar, idx) => (
          <div key={idx} className="ct-card">
            <h3>
              <span className="ct-card-icon">{pillar.icon}</span>
              {isAr ? pillar.titleAr : pillar.titleEn}
            </h3>
            <p>{isAr ? pillar.textAr : pillar.textEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Trainers Tab ── */
function TrainersPanel({ course, isAr }: PanelProps) {
  return (
    <div className="reveal" role="tabpanel" id="panel-trainers" aria-labelledby="tab-trainers">
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
        {isAr ? "الهيكل التعليمي والأكاديمي 🎓" : "Academic Supervision & Instructors 🎓"}
      </h2>

      {/* Trainer Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {course.trainers.map((trainer, i) => (
          <div key={i} className="ct-card" style={{ borderTop: `4px solid ${trainer.accentColor}` }}>
            <h3>
              <span className="ct-card-icon">{trainer.icon}</span>
              {isAr ? trainer.labelAr : trainer.labelEn}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              {isAr ? trainer.textAr : trainer.textEn}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center" }}>
        {isAr ? "الخطة الزمنية للجلسة (١٢٠ دقيقة) ⏱️" : "Session Lesson Plan (120 Minutes) ⏱️"}
      </h3>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        {course.timeline.map((item, i) => (
          <div key={i} className="ct-timeline-item">
            <div className="ct-timeline-badge">#{i + 1}</div>
            <div className="ct-timeline-content">
              <span className="ct-time-tag">{isAr ? item.timeAr : item.timeEn}</span>
              <h4>{isAr ? item.titleAr : item.titleEn}</h4>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                {isAr ? item.textAr : item.textEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FAQ Tab ── */
function FaqPanel({ course, isAr }: PanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="reveal" role="tabpanel" id="panel-faq" aria-labelledby="tab-faq" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
        {isAr ? "الأسئلة الشائعة والسياسات ❓" : "Frequently Asked Questions & Policies ❓"}
      </h2>

      {/* FAQs Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
        {course.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`ct-faq-item ${isOpen ? "open" : ""}`}>
              <button
                className="ct-faq-q"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span>{isAr ? faq.qAr : faq.qEn}</span>
                <span className="ct-faq-arrow" aria-hidden="true">
                  {isOpen ? "▼" : isAr ? "◀" : "▶"}
                </span>
              </button>
              {isOpen && (
                <div className="ct-faq-a">
                  {isAr ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Policies */}
      <div className="ct-card" style={{ background: "var(--gold-dim)", borderColor: "rgba(255, 201, 74, 0.3)" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--sun)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span>⚠️</span>
          <span>{isAr ? course.policyTitleAr : course.policyTitleEn}</span>
        </h3>
        <ul style={{ margin: 0, paddingInlineStart: "1.25rem" }}>
          {(isAr ? course.policiesAr : course.policiesEn).map((text, i) => (
            <li key={i} style={{ marginBottom: "0.5rem", fontSize: "0.95rem", color: "var(--text-muted)" }}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
