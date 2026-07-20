"use client";

import { Fragment, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { LocaleCode } from "@/types/site";
import { getSiteContent } from "@/data/content";
import { ValueStrip } from "@/components/ValueStrip";
import { AiArticleWidget } from "@/components/AiArticleWidget";
import { RecentActivitiesFeed } from "@/components/RecentActivitiesFeed";

const ChatFab = dynamic(() => import("@/components/ChatFab").then((m) => m.ChatFab), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then((m) => m.TestimonialsSection), { ssr: false });


interface LandingPageProps {
  locale: LocaleCode;
}

/**
 * Main landing page — Horizon Theme redesign.
 */
export function LandingPage({ locale }: LandingPageProps) {
  const content = getSiteContent(locale);

  const isAr = locale === "ar";

  const statsEn = [
    { rawValue: 8000, suffix: "", label: "Acres · New Cairo" },
    { rawValue: 700, suffix: "K+", label: "Residents" },
    { rawValue: 23, suffix: "", label: "Districts" },
    { rawValue: 100, suffix: "%", label: "Community Driven" }
  ];
  const statsAr = [
    { rawValue: 8000, suffix: "", label: "فدان · القاهرة الجديدة" },
    { rawValue: 700, suffix: "ألف+", label: "ساكن" },
    { rawValue: 23, suffix: "", label: "حي" },
    { rawValue: 100, suffix: "%", label: "مجتمعي بالكامل" }
  ];
  const stats = isAr ? statsAr : statsEn;

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryLabels: Record<string, string> = {
    core: locale === "ar" ? "الخدمات الأساسية" : "Core",
    community: locale === "ar" ? "المجتمع" : "Community",
    economy: locale === "ar" ? "الاقتصاد" : "Economy",
    education: locale === "ar" ? "التعليم" : "Education",
    lifestyle: locale === "ar" ? "الحياة" : "Lifestyle",
  };

  const visibleServices = content.services.filter((s) => !s.hidden);
  const uniqueCategories = Array.from(new Set(visibleServices.map(s => s.category).filter(Boolean))) as string[];

  const filteredServices = activeCategory === "all" 
    ? visibleServices 
    : visibleServices.filter(s => s.category === activeCategory);

  return (
    <>
      <main id="main-content" tabIndex={-1}>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="hero-wrap" id="platform">
          <Image
            src="/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="hero-skyline-art"
            priority
            unoptimized
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-backdrop-overlay" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy reveal">
              <h1 className="hero-title">
                {content.hero.titlePrefix}{" "}
                <span className="gradient-text">{content.hero.titleHighlight}</span>
                {content.hero.titleSuffix}
              </h1>

              <p className="hero-text">{content.hero.text}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#services">
                  {content.hero.primaryAction}
                </a>
              </div>

              <AiArticleWidget locale={locale} />
            </div>

            <div className="hero-visual reveal">
              <div className="hero-panel">
                <div className="hero-panel-top">
                  <span className="panel-dot" />
                  <span className="panel-dot" />
                  <span className="panel-dot" />
                  <span className="panel-title-bar">{content.hero.dashboardTitle}</span>
                </div>
                <div className="hero-panel-body">
                  <div className="hero-stat-row">
                    {content.hero.dashboardStats.map((stat, i) => (
                      <div className="hero-stat" key={`stat-${i}`}>
                        <strong>{stat.value}</strong>
                        <small>{stat.label}</small>
                      </div>
                    ))}
                  </div>

                  <Suspense
                    fallback={
                      <div className="hero-activity hero-activity-skeleton" aria-hidden="true">
                        <span className="skeleton-line" />
                        <span className="skeleton-line short" />
                      </div>
                    }
                  >
                    <RecentActivitiesFeed locale={locale} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE STRIP ───────────────────────────────────── */}
        <ValueStrip items={stats} />



        {/* ── OUR PLATFORM ────────────────────────────────── */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head reveal">
              <p className="overline">{content.sections.servicesOverline}</p>
              <h2>{content.about.title}</h2>
            </div>
            <div className="platform-horizontal reveal">
              <p className="platform-summary">{content.about.summary}</p>
              <div className="platform-pillars">
                {content.about.cards.map((card, idx) => (
                  <div className="platform-pillar" key={`pillar-${idx}`}>
                    <span className="pillar-icon" aria-hidden="true">{card.icon}</span>
                    <div>
                      <strong>{card.title}</strong>
                      <p>{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="platform-highlights">
                {content.about.highlights.map((h) => (
                  <div key={h} className="check-item">
                    <div className="check-icon" aria-hidden="true">✓</div>
                    <p>{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR SERVICES ────────────────────────────────── */}
        <section className="section section-alt" id="services">
          <div className="container">
            <div className="section-head reveal">
              <p className="overline">{locale === "ar" ? "خدماتنا" : "Our Services"}</p>
              <h2>{content.sections.servicesTitle}</h2>
            </div>

            <div className="services-filter reveal">
              <button 
                className={`filter-pill ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                {locale === "ar" ? "الكل" : "All"}
              </button>
              {uniqueCategories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {categoryLabels[cat] ?? cat}
                </button>
              ))}
            </div>

            <div className="service-bento reveal">
              {filteredServices.map((svc, idx) => {
                const serviceIdMap: Record<string, string> = {
                  "AI Flash Courses for Kids": "kids-lab",
                  "كورسات ذكاء اصطناعي للأطفال": "kids-lab",
                  "Summer Business Training": "summer",
                  "تدريب صيفي للشباب": "summer",
                  "Rental Portal": "rental",
                  "بوابة الإيجار الذكية": "rental",
                  "Community Interest Club": "community-club",
                  "نادي الاهتمامات المجتمعي": "community-club",
                  "Poll Board": "poll",
                  "لوحة التصويت المجتمعي": "poll",
                  "Skill Exchange Network": "skills",
                  "شبكة تبادل المهارات": "skills",
                  "Trusted Services Directory": "services-dir",
                  "دليل الخدمات الموثوقة": "services-dir",
                  "Madinaty Tutoring Board": "tutoring",
                  "لوحة الدروس الخصوصية": "tutoring",
                  "Activity Finder": "activities",
                  "مكتشف الأنشطة": "activities",
                  "Madinaty Marketplace": "marketplace",
                  "الكانتو": "marketplace",
                  "Ghost Kitchen Incubator": "kitchen",
                  "حاضنة المطابخ المنزلية": "kitchen",
                  "Local Business Booster": "business",
                  "معزز الأعمال المحلية": "business",
                };
                const serviceId = serviceIdMap[svc.title];
                
                const isErp = svc.title === "AZHA ERP System" || svc.title === "نظام إدارة الأعمال";
                const href = isErp ? (locale === "ar" ? "/ar/erp" : "/en/erp") : undefined;

                const cardInner = (
                  <>
                    <div className="svc-header">
                      <span className="svc-icon" aria-hidden="true">{svc.icon}</span>
                      <span className="svc-explore-btn" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {isAr ? (
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                          ) : (
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          )}
                        </svg>
                      </span>
                    </div>
                    <div className="svc-content">
                      <h4>{svc.title}</h4>
                      <p>{svc.text}</p>
                    </div>
                  </>
                );

                if (href) {
                  return (
                    <Link
                      key={`svc-${idx}-${activeCategory}`}
                      href={href}
                      id={serviceId ? `service-${serviceId}` : undefined}
                      className={`svc-card svc-${svc.size ?? "normal"} svc-animate`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {cardInner}
                    </Link>
                  );
                }

                return (
                  <article
                    key={`svc-${idx}-${activeCategory}`}
                    id={serviceId ? `service-${serviceId}` : undefined}
                    className={`svc-card svc-${svc.size ?? "normal"} svc-animate`}
                  >
                    {cardInner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>



        {/* ── MAP ─────────────────────────────────────────────
        <section className="section container" id="map">
          <div className="section-head center reveal">
            <p className="overline">{content.sections.mapOverline}</p>
            <h2>{content.sections.mapTitle}</h2>
          </div>
          <MapPanel content={content} />
        </section>
        */}

        {/* ── TESTIMONIALS ── */}
        <TestimonialsSection locale={locale} />
      </main>



      {/* Floating AI chatbot */}
      <ChatFab content={content} locale={locale} />
    </>
  );
}
