"use client";

import { Suspense, useState } from "react";
import type { LocaleCode } from "@/types/site";
import { getSiteContent } from "@/data/content";
import { NavBar } from "@/components/NavBar";
import { ChatPanel } from "@/components/ChatPanel";
import { MapPanel } from "@/components/MapPanel";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { ValueStrip } from "@/components/ValueStrip";
import { EnrollmentModal } from "@/components/EnrollmentModal";
import { AiArticleWidget } from "@/components/AiArticleWidget";
import { AiToolsSection } from "@/components/AiToolsSection";

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
    <PageShell>
      <div className="site-bg" />
      <NavBar locale={locale} content={content} />

      <main id="main-content" tabIndex={-1}>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="hero-wrap" id="platform">
          <img
            src="/hero-bg1.webp"
            alt=""
            aria-hidden="true"
            className="hero-skyline-art"
            loading="eager"
            decoding="async"
          />
          <div className="hero-backdrop-overlay" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy reveal">
              <div className="hero-logo-badge">
                <div className="hero-logo-ring">
                  <img src="/logo.png" alt="Madinaty AI logo" />
                </div>
                <div className="hero-badge-text">
                  <strong>{content.hero.overline}</strong>
                  Madinaty Community
                </div>
              </div>

              <h1 className="hero-title">
                {content.hero.titlePrefix}{" "}
                <span className="gradient-text">{content.hero.titleHighlight}</span>
                {content.hero.titleSuffix}
              </h1>

              <p className="hero-text">{content.hero.text}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#chat">
                  {content.hero.primaryAction}
                </a>
                <a className="btn btn-outline" href={locale === "ar" ? "/ar/vision-future" : "/vision-future"}>
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
                  <span className="panel-title-bar">Madinaty.AI · Live Dashboard</span>
                </div>
                <div className="hero-panel-body">
                  <div className="hero-stat-row">
                    <div className="hero-stat">
                      <strong>4.2K</strong>
                      <small>Residents</small>
                    </div>
                    <div className="hero-stat">
                      <strong>42</strong>
                      <small>AI Labs</small>
                    </div>
                    <div className="hero-stat">
                      <strong>99%</strong>
                      <small>Uptime</small>
                    </div>
                  </div>
                  <div className="hero-activity">
                    <div className="hero-activity-icon">🚌</div>
                    <div className="hero-activity-text">
                      Smart shuttle dispatched — District 5
                      <small>2 minutes ago · autonomous</small>
                    </div>
                  </div>
                  <div className="hero-activity">
                    <div className="hero-activity-icon">🎓</div>
                    <div className="hero-activity-text">
                      Workshop registered — AI for Kids
                      <small>Just now · 42 seats available</small>
                    </div>
                  </div>
                  <div className="hero-activity">
                    <div className="hero-activity-icon">🏠</div>
                    <div className="hero-activity-text">
                      Home energy optimized — Block C-7
                      <small>5 minutes ago · 18% savings</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE STRIP ───────────────────────────────────── */}
        <ValueStrip items={stats} />

        {/* ── ABOUT ─────────────────────────────────────────── */}
        <section className="section container" id="about">
          <div className="about-grid reveal">
            <div className="about-text">
              <p className="overline">{content.about.overline}</p>
              <h2>{content.about.title}</h2>
              <p>{content.about.summary}</p>
              <div className="about-checks">
                {content.about.highlights.map((highlight) => (
                  <div key={highlight} className="check-item">
                    <div className="check-icon" aria-hidden="true">✓</div>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-visual">
              <div className="about-card">
                <div className="about-card-icon">🧠</div>
                <h4>AI-First Community</h4>
                <p>Every service is powered by adaptive intelligence built for residents.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🔒</div>
                <h4>Privacy by Design</h4>
                <p>Data stays local. Insights go city-wide without compromising identity.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🌐</div>
                <h4>Open Ecosystem</h4>
                <p>Built by developers, for residents. Open to builders and entrepreneurs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────── */}
        <section className="section section-alt" id="services">
          <div className="container">
            <div className="section-head reveal">
              <p className="overline">{content.sections.servicesOverline}</p>
              <h2>{content.sections.servicesTitle}</h2>
            </div>

            <div className="bento reveal">
              <article className="tile tile-lg">
                <div className="tile-icon">🚌</div>
                <h3>{content.cards.transportTitle}</h3>
                <p>{content.cards.transportText}</p>
              </article>

              <article className="tile tile-sm tile-accent">
                <div className="tile-icon">📊</div>
                <h3>{content.cards.insightsTitle}</h3>
                <p>{content.cards.insightsText}</p>
              </article>

              <article className="tile tile-narrow">
                <div className="tile-icon">🏠</div>
                <h3>{content.cards.homeTitle}</h3>
                <p>{content.cards.homeText}</p>
              </article>

              <article className="tile tile-wide">
                <div className="tile-icon">🛡️</div>
                <h3>{content.cards.safetyTitle}</h3>
                <p>{content.cards.safetyText}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── AI TOOLS ────────────────────────────────── */}
        {/* Suspense is required: AiToolsSection calls useSearchParams
            for URL-based category persistence. Without a boundary,
            Next.js bails out of static generation on /ar and /en. */}
        <Suspense fallback={null}>
          <AiToolsSection locale={locale} />
        </Suspense>

        {/* ── CHAT ─────────────────────────────────────── */}
        <section className="section container" id="chat">
          <div className="section-head center reveal">
            <p className="overline">{content.sections.chatOverline}</p>
            <h2>{content.sections.chatTitle}</h2>
          </div>
          <ChatPanel content={content} locale={locale} />
        </section>

        {/* ── UPCOMING EVENT ────────────────────────────────── */}
        <section className="section section-alt">
          <div className="container reveal">
            <div className="upcoming-shell">
              <div className="upcoming-overlay" aria-hidden="true" />
              <img
                src="/ad-1.webp"
                alt=""
                aria-hidden="true"
                className="upcoming-event-art"
                loading="lazy"
                decoding="async"
              />
              <div className="upcoming-content">
                <div>
                  <p className="overline overline-light">{content.event.overline}</p>
                  <div className="upcoming-pill">{content.event.subtitle}</div>
                  <h2 className="upcoming-title">
                    {content.event.title}
                    {content.event.titleHighlight && (
                      <span className="highlight">{content.event.titleHighlight}</span>
                    )}
                  </h2>
                  <p>{content.event.description}</p>

                  {content.event.safetyBadges && content.event.safetyBadges.length > 0 && (
                    <div className="safety-badges" aria-label="Safety commitments">
                      {content.event.safetyBadges.map((badge) => (
                        <span key={badge.label} className="safety-badge">
                          <span className="safety-badge-icon" aria-hidden="true">{badge.icon}</span>
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="promo-box">
                    <small>{content.event.promoLabel}</small>
                    <h3>{content.event.promoTitle}</h3>
                    <p>{content.event.promoDescription}</p>
                  </div>
                  <button className="btn btn-primary" type="button" onClick={() => setEnrollmentOpen(true)}>
                    {content.event.cta}
                  </button>
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
        </section>

        {/* ── MAP ───────────────────────────────────────────── */}
        <section className="section container" id="map">
          <div className="section-head center reveal">
            <p className="overline">{content.sections.mapOverline}</p>
            <h2>{content.sections.mapTitle}</h2>
          </div>
          <MapPanel content={content} />
        </section>
      </main>

      <Footer content={content} />
      <EnrollmentModal locale={locale} open={isEnrollmentOpen} onClose={() => setEnrollmentOpen(false)} />
    </PageShell>
  );
}
