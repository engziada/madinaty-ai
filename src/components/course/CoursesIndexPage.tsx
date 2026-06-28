"use client";

import Link from "next/link";
import type { LocaleCode } from "@/types/site";
import { courses } from "@/data/courseData";
import { AstroAvatar } from "@/components/AstroAvatar";

interface CoursesIndexPageProps {
  locale: LocaleCode;
}

/**
 * Courses catalogue page — the main "Madinaty AI Lab" landing.
 * Astro greets users and presents available courses as interactive cards.
 */
export function CoursesIndexPage({ locale }: CoursesIndexPageProps) {
  const isAr = locale === "ar";

  const t = {
    heroTitleAr: "مختبر Madinaty AI",
    heroTitleEn: "Madinaty AI Lab",
    heroSubAr: "اكتشف الورش والدورات التدريبية المتاحة في مركز الابتكار بمدينتي",
    heroSubEn: "Discover workshops and training courses at Madinaty Innovation Hub",
    astroGreetAr: "أهلاً! أنا أسترو 🐕 مرشدك الذكي. اختر الكورس اللي يناسبك!",
    astroGreetEn: "Hi there! I'm Astro 🐕 your AI guide. Pick the course that suits you!",
    activeAr: "متاح الآن",
    activeEn: "Available Now",
    comingSoonAr: "قريباً",
    comingSoonEn: "Coming Soon",
    viewCourseAr: "عرض التفاصيل",
    viewCourseEn: "View Details",
    fromAr: "من",
    fromEn: "From",
  };

  return (
    <main id="main-content" className="courses-index-wrapper" tabIndex={-1}>
      <style jsx global>{`
        .courses-index-wrapper {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding-bottom: 80px;
          position: relative;
          z-index: 1;
        }

        .courses-bg-animation {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        .ci-poly {
          position: absolute;
          filter: blur(100px);
          opacity: 0.3;
          animation: ciFloat 30s infinite alternate ease-in-out;
        }
        .ci-poly-1 {
          width: 55vw; height: 55vw;
          background: rgba(43, 110, 255, 0.10);
          top: -25%; left: -15%;
          animation-delay: 0s;
        }
        .ci-poly-2 {
          width: 50vw; height: 50vw;
          background: rgba(11, 184, 199, 0.10);
          bottom: -25%; right: -15%;
          animation-delay: -7s;
        }
        .ci-poly-3 {
          width: 40vw; height: 40vw;
          background: rgba(147, 51, 234, 0.06);
          top: 35%; left: 45%;
          animation-delay: -14s;
        }
        @keyframes ciFloat {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(4%, 6%) scale(1.06) rotate(8deg); }
          100% { transform: translate(-4%, -6%) scale(0.94) rotate(-8deg); }
        }

        /* ── Hero ── */
        .courses-hero {
          padding: 4rem 0 3rem;
          text-align: center;
          position: relative;
          background: linear-gradient(180deg, rgba(43, 110, 255, 0.06) 0%, transparent 100%);
          border-bottom: 1px solid var(--border);
        }

        .courses-hero-astro {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .courses-hero-title {
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--blue) 0%, var(--teal) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .courses-hero-sub {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto 1.5rem;
          line-height: 1.6;
        }

        .courses-astro-speech {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.75rem 1.25rem;
          border-radius: 16px;
          font-size: 0.95rem;
          color: var(--text-soft);
          box-shadow: var(--shadow-sm);
          animation: speechFadeIn 0.6s ease forwards;
          max-width: 520px;
        }

        @keyframes speechFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Course Grid ── */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          padding: 3rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .course-index-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-card);
        }

        .course-index-card:hover {
          transform: translateY(-6px);
          border-color: rgba(43, 110, 255, 0.3);
          box-shadow: 0 12px 40px rgba(43, 110, 255, 0.12);
        }

        .course-index-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue), var(--teal));
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .course-index-card:hover::before {
          opacity: 1;
        }

        .course-card-status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          width: fit-content;
        }
        .course-card-status--active {
          background: rgba(34, 201, 147, 0.12);
          color: var(--mint);
          border: 1px solid rgba(34, 201, 147, 0.3);
        }
        .course-card-status--active::before {
          content: "";
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--mint);
          animation: statusPulse 2s infinite;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .course-card-status--coming-soon {
          background: rgba(255, 201, 74, 0.12);
          color: var(--sun);
          border: 1px solid rgba(255, 201, 74, 0.3);
        }

        .course-card-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        .course-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text);
          line-height: 1.3;
        }

        .course-card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .course-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .course-card-price {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .course-card-price-from {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }
        .course-card-price-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--blue);
        }
        .course-card-price-original {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .course-card-cta {
          padding: 0.6rem 1.5rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          background: var(--blue);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .course-card-cta:hover {
          background: var(--blue-hover, #1d5cdb);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(43, 110, 255, 0.3);
        }

        .course-card-cta--disabled {
          background: var(--surface-hi);
          color: var(--text-muted);
          cursor: default;
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .courses-hero-title { font-size: 2rem; }
          .courses-hero-sub { font-size: 1rem; padding: 0 1rem; }
          .courses-grid {
            grid-template-columns: 1fr;
            padding: 2rem 1rem;
          }
          .courses-astro-speech {
            font-size: 0.85rem;
            margin: 0 1rem;
          }
        }
      `}</style>

      {/* Animated Background */}
      <div className="courses-bg-animation">
        <div className="ci-poly ci-poly-1" />
        <div className="ci-poly ci-poly-2" />
        <div className="ci-poly ci-poly-3" />
      </div>

      {/* ── Hero Section ── */}
      <section className="courses-hero">
        <div className="container">
          <div className="courses-hero-astro">
            <AstroAvatar mood="waving" size="xl" />
          </div>
          <h1 className="courses-hero-title">
            {isAr ? t.heroTitleAr : t.heroTitleEn}
          </h1>
          <p className="courses-hero-sub">
            {isAr ? t.heroSubAr : t.heroSubEn}
          </p>
          <div className="courses-astro-speech">
            🐕 {isAr ? t.astroGreetAr : t.astroGreetEn}
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="container">
        <div className="courses-grid">
          {courses.map((course) => {
            const isActive = course.status === "active";
            const href = `/${locale}/course/${course.slug}`;

            return (
              <Link
                key={course.slug}
                href={isActive ? href : "#"}
                className="course-index-card"
                aria-disabled={!isActive}
                tabIndex={isActive ? 0 : -1}
                style={!isActive ? { opacity: 0.6, pointerEvents: "none" } : undefined}
              >
                <span className={`course-card-status ${isActive ? "course-card-status--active" : "course-card-status--coming-soon"}`}>
                  {isActive
                    ? (isAr ? t.activeAr : t.activeEn)
                    : (isAr ? t.comingSoonAr : t.comingSoonEn)
                  }
                </span>

                <span className="course-card-icon" aria-hidden="true">{course.icon}</span>

                <h2 className="course-card-title">
                  {isAr ? course.titleAr : course.titleEn}
                </h2>

                <p className="course-card-desc">
                  {isAr ? course.descriptionAr : course.descriptionEn}
                </p>

                <div className="course-card-footer">
                  <div className="course-card-price">
                    <span className="course-card-price-from">
                      {isAr ? t.fromAr : t.fromEn}
                    </span>
                    <span className="course-card-price-value">
                      {course.priceDiscounted} {isAr ? "ج.م" : course.currency}
                    </span>
                    <span className="course-card-price-original">
                      {course.priceOriginal} {isAr ? "ج.م" : course.currency}
                    </span>
                  </div>
                  <span className={`course-card-cta ${!isActive ? "course-card-cta--disabled" : ""}`}>
                    {isActive
                      ? (isAr ? t.viewCourseAr : t.viewCourseEn)
                      : (isAr ? t.comingSoonAr : t.comingSoonEn)
                    }
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
