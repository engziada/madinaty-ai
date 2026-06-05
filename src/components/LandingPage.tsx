"use client";

import { Fragment, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { LocaleCode } from "@/types/site";
import { getSiteContent } from "@/data/content";
import { ValueStrip } from "@/components/ValueStrip";
import { AiArticleWidget } from "@/components/AiArticleWidget";
import { LiveFacebookFeed } from "@/components/LiveFacebookFeed";

const ChatFab = dynamic(() => import("@/components/ChatFab").then((m) => m.ChatFab), { ssr: false });
const AstroChatEnrollment = dynamic(
  () => import("@/components/conversational/AstroChatEnrollment").then((m) => m.AstroChatEnrollment),
  { ssr: false }
);

interface LandingPageProps {
  locale: LocaleCode;
}

/**
 * Main landing page — Horizon Theme redesign.
 */
export function LandingPage({ locale }: LandingPageProps) {
  const content = getSiteContent(locale);
  const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);

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
                <a className="btn btn-outline" href="#events">
                  {content.hero.secondaryAction}
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

                  {/* Announcement: top item in dashboard */}
                  <div
                    className="hero-activity"
                    style={{
                      background: "rgba(255, 243, 205, 0.6)",
                      borderLeft: "3px solid #f0c040",
                      borderRadius: "0 8px 8px 0",
                    }}
                  >
                    <div className="hero-activity-icon" aria-hidden="true">📢</div>
                    <div className="hero-activity-text" style={{ color: "#856404", fontWeight: 500 }}>
                      {isAr
                        ? "الجلسات الثلاثة الأولى (٦ يونيو) تم حجزها بالكامل. مقاعد مخفضة بـ ١٩٩٫٩٩ ج.م لا تزال متاحة لجلسة ١٣ يونيو — أسرع!"
                        : "First 3 sessions (June 6) fully reserved. Discounted seats at 199.99 EGP still available for June 13 session — hurry!"}
                      <small style={{ color: "#b38f00" }}>
                        {isAr ? "آخر فرصة · عرض محدود" : "Last chance · Limited offer"}
                      </small>
                    </div>
                  </div>

                  <Suspense
                    fallback={
                      <div className="hero-activity hero-activity-skeleton" aria-hidden="true">
                        <span className="skeleton-line" />
                        <span className="skeleton-line short" />
                      </div>
                    }
                  >
                    <LiveFacebookFeed locale={locale} />
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
              <p className="overline accent-overline">{content.about.overline}</p>
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
            <div className="service-bento reveal">
              {content.services.filter((s) => !s.hidden).map((svc, idx, arr) => {
                const prevCategory = idx > 0 ? arr[idx - 1].category : null;
                const showGroupLabel = svc.category && svc.category !== prevCategory;
                const categoryLabels: Record<string, string> = {
                  core: locale === "ar" ? "الخدمات الأساسية" : "Core Platform",
                  community: locale === "ar" ? "المجتمع" : "Community",
                  economy: locale === "ar" ? "الاقتصاد المحلي" : "Local Economy",
                  education: locale === "ar" ? "التعليم" : "Education",
                  lifestyle: locale === "ar" ? "الحياة اليومية" : "Lifestyle",
                };
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
                  "سوق مدينتي": "marketplace",
                  "Ghost Kitchen Incubator": "kitchen",
                  "حاضنة المطابخ المنزلية": "kitchen",
                  "Local Business Booster": "business",
                  "معزز الأعمال المحلية": "business",
                };
                const serviceId = serviceIdMap[svc.title];
                return (
                  <Fragment key={`svc-fragment-${idx}`}>
                    {showGroupLabel && (
                      <div key={`label-${svc.category}`} className="svc-group-label">
                        {categoryLabels[svc.category!] ?? svc.category}
                      </div>
                    )}
                    <article
                      key={`svc-${idx}`}
                      id={serviceId ? `service-${serviceId}` : undefined}
                      className={`svc-card svc-${svc.size ?? "normal"}`}
                    >
                      <div className="svc-header">
                        <span className="svc-icon" aria-hidden="true">{svc.icon}</span>
                      </div>
                      <h4>{svc.title}</h4>
                      <p>{svc.text}</p>
                    </article>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── UPCOMING EVENT ────────────────────────────────── */}
        <section className="section section-alt" id="events">
          <div className="container reveal">
            <div className="upcoming-shell ad-shell" id="ad-kids-lab">
              <div className="upcoming-content">
                <div className="upcoming-main">
                  <p className="overline overline-light">{content.event.overline}</p>
                  <div className="upcoming-pill">{content.event.subtitle}</div>
                  <h2 className="upcoming-title">
                    {content.event.title}
                    {content.event.titleHighlight && (
                      <span className="highlight">{content.event.titleHighlight}</span>
                    )}
                  </h2>
                  <p className="upcoming-description">{content.event.description}</p>

                  {content.event.descriptionExtra && (
                    <p className="upcoming-description-extra" style={{ whiteSpace: "pre-line" }}>
                      {content.event.descriptionExtra}
                    </p>
                  )}

                  {content.event.safetyBadges && content.event.safetyBadges.length > 0 && (
                    <div className="safety-badges" aria-label="Safety commitments">
                      {content.event.safetyBadges.map((badge) => {
                        const badgeContent = (
                          <>
                            <span className="safety-badge-icon" aria-hidden="true">{badge.icon}</span>
                            {badge.label}
                          </>
                        );
                        return badge.url ? (
                          <a
                            key={badge.label}
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="safety-badge safety-badge-link"
                          >
                            {badgeContent}
                          </a>
                        ) : (
                          <span key={badge.label} className="safety-badge">
                            {badgeContent}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="upcoming-actions">
                    <button className="btn btn-primary" type="button" onClick={() => setEnrollmentOpen(true)}>
                      {content.event.cta}
                    </button>
                    <p className="upcoming-cta-note">{content.event.promoLabel}</p>
                  </div>
                </div>

                <div className="upcoming-side">
                  <figure className="upcoming-image-card">
                    <Image
                      src="/ad-1.webp"
                      alt={locale === "ar" ? "أطفال يتعلمون أدوات الذكاء الاصطناعي بأمان" : "Kids learning AI chat tools in a safe and guided environment"}
                      className="upcoming-image"
                      width={480}
                      height={320}
                      loading="lazy"
                    />
                    <figcaption>
                      {locale === "ar" ? "جلسة تفاعلية آمنة وممتعة" : "Interactive, safe, and fun learning session"}
                    </figcaption>
                  </figure>

                  <div className="promo-box">
                    <small>{content.event.promoLabel}</small>
                    <h3>
                      {content.event.promoTitle}
                      {content.event.promoLocationUrl && (
                        <a
                          href={content.event.promoLocationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="promo-location-link"
                          aria-label={locale === "ar" ? "عرض الموقع على الخريطة" : "View location on map"}
                          title={locale === "ar" ? "عرض الموقع على الخريطة" : "View location on map"}
                        >
                          <span aria-hidden="true">📍</span>
                        </a>
                      )}
                    </h3>
                    <p>{content.event.promoDescription}</p>
                  </div>

                  <div className="upcoming-stats-panel">
                  <div className="event-stats">
                    {content.event.stats.map((stat) => (
                      <div key={`${stat.value}-${stat.label}`}>
                        <strong>{stat.value}</strong>
                        <small>{stat.label}</small>
                      </div>
                    ))}
                  </div>
                  <div className="upcoming-lab-tile">
                    <div>
                      <strong>{content.event.labTitle}</strong>
                      <small>{content.event.labSubtitle}</small>
                    </div>
                    <span>⚙️</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ERP PROMO ─────────────────────────────────────── */}
        <section className="section section-alt" id="erp-promo">
          <div className="container">
            <div className="erp-promo-shell ad-shell reveal" id="ad-business">
              <div className="erp-promo-content">
                <p className="overline">{locale === "ar" ? "معزز الأعمال" : "Business Enhancer"}</p>
                <div className="erp-promo-pill">{locale === "ar" ? "للأعمال" : "For Business"}</div>
                <h2 className="upcoming-title">
                  {locale === "ar" ? "نظام ERP " : "Smart ERP "}
                  <span className="highlight">{locale === "ar" ? "الذكي" : "System"}</span>
                </h2>
                <p className="erp-promo-description">
                  {locale === "ar"
                    ? "نظام AZHA ERP متكامل لإدارة أعمالك — نقطة بيع، مشتريات ومبيعات، مخزون، محاسبة، ضرائب، وموارد بشرية في منصة سحابية واحدة."
                    : "All-in-one AZHA ERP system — POS, sales & purchases, inventory, accounting, taxes, HR, and CRM in one cloud platform."}
                </p>
                <div className="safety-badges" aria-label="ERP features">
                  {locale === "ar"
                    ? [
                        { icon: "🛒", label: "نقطة بيع" },
                        { icon: "📦", label: "إدارة المخزون" },
                        { icon: "💰", label: "المحاسبة" },
                        { icon: "📊", label: "التقارير" },
                        { icon: "👥", label: "الموارد البشرية" },
                        { icon: "🧾", label: "الضرائب والزكاة" },
                        { icon: "🏪", label: "متجر إلكتروني خلال أسبوع" },
                        { icon: "🚀", label: "صفحة هبوط خلال ٤٨ ساعة" },
                      ].map((b) => (
                        <span key={b.label} className="safety-badge">
                          <span className="safety-badge-icon" aria-hidden="true">{b.icon}</span>
                          {b.label}
                        </span>
                      ))
                    : [
                        { icon: "🛒", label: "POS" },
                        { icon: "📦", label: "Inventory" },
                        { icon: "💰", label: "Accounting" },
                        { icon: "📊", label: "Reports" },
                        { icon: "👥", label: "HR" },
                        { icon: "🧾", label: "Tax & Zakat" },
                        { icon: "🏪", label: "eCommerce in 1 Week" },
                        { icon: "🚀", label: "Landing Page in 48H" },
                      ].map((b) => (
                        <span key={b.label} className="safety-badge">
                          <span className="safety-badge-icon" aria-hidden="true">{b.icon}</span>
                          {b.label}
                        </span>
                      ))
                  }
                </div>
                <div className="erp-promo-launch">
                  <p>
                    {locale === "ar"
                      ? "سرّع نمو أعمالك وحقق تواجدك الرقمي فورًا — متجرك الإلكتروني جاهز خلال أسبوع، وصفحة الهبوط خلال ٤٨ ساعة."
                      : "Accelerate your business and establish your online presence instantly — your custom eCommerce store in 1 week, and your landing page in just 48 hours."}
                  </p>
                  <small>
                    {locale === "ar"
                      ? "🎁 صفحة الهبوط مجانية لأول ١٠ عملاء!"
                      : "🎁 Landing page is completely FREE for the first 10 customers!"}
                  </small>
                </div>
                <a
                  className="promo-box promo-box-link"
                  href="https://wa.me/201026655008"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                >
                  <small>{locale === "ar" ? "عرض محدود" : "Limited Offer"}</small>
                  <h3>
                    {locale === "ar" ? "تواصل معنا الآن" : "Contact Us Now"}
                    <span aria-hidden="true">💬</span>
                  </h3>
                  <p>
                    {locale === "ar"
                      ? "للإستفسارات والحجز، تواصل معنا عبر واتساب على +201026655008"
                      : "For inquiries and booking, reach us on WhatsApp at +201026655008"}
                  </p>
                </a>
                <a
                  className="btn btn-primary"
                  href="https://smart.azhasoft.com/login_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === "ar" ? "ابدأ تجربتك الآن" : "Start Your Demo Now"}
                </a>
              </div>
              <figure className="upcoming-image-card">
                <Image
                  src="/erp-promo.webp"
                  alt={locale === "ar" ? "نظام ERP الذكي - معزز الأعمال" : "Smart ERP System - Business Enhancer"}
                  className="upcoming-image"
                  width={520}
                  height={380}
                  loading="lazy"
                />
                <figcaption>
                  {locale === "ar" ? "منصة إدارة أعمال متكاملة" : "All-in-one business management platform"}
                </figcaption>
              </figure>
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
      </main>

      {/* AI-driven conversational enrollment (replaces EnrollmentModal) */}
      <AstroChatEnrollment locale={locale} open={isEnrollmentOpen} onClose={() => setEnrollmentOpen(false)} />

      {/* Floating AI chatbot */}
      <ChatFab content={content} locale={locale} />
    </>
  );
}
