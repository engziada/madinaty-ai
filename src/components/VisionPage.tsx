import { genesisImages, getSiteContent } from "@/data/content";
import type { LocaleCode } from "@/types/site";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { PageShell } from "@/components/PageShell";

interface VisionPageProps {
  locale: LocaleCode;
}

/**
 * Vision and roadmap page — Horizon Theme redesign.
 */
export function VisionPage({ locale }: VisionPageProps) {
  const content = getSiteContent(locale);

  return (
    <PageShell>
      <div className="site-bg" />
      <NavBar locale={locale} content={content} />

      <main id="main-content" tabIndex={-1}>
        {/* ── VISION HERO ───────────────────────────────────── */}
        <section className="hero-vision-wrap container" id="platform">
          <div className="reveal">
            <p className="overline">{content.vision.overline}</p>
            <h1 className="hero-title">
              {content.vision.title}
              <span className="gradient-text">Madinaty.AI</span>
            </h1>
            <p className="hero-text">{content.vision.subtitle}</p>
          </div>
        </section>

        {/* ── GENESIS ───────────────────────────────────────── */}
        <section className="section section-alt">
          <div className="container">
            <div className="split reveal">
              <div>
                <p className="overline">{content.vision.genesisOverline}</p>
                <h2>{content.vision.genesisTitle}</h2>
                {content.vision.genesisParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="split-images">
                <img src={genesisImages[0]} alt="Community founder collaboration" />
                <img src={genesisImages[1]} alt="Hands on advanced electronics" />
              </div>
            </div>
          </div>
        </section>

        {/* ── PILLARS ───────────────────────────────────────── */}
        <section className="section container" id="services">
          <div className="section-head reveal">
            <p className="overline">{content.vision.pillarsOverline}</p>
            <h2>{content.vision.pillarsTitle}</h2>
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

            <article className="tile tile-wide">
              <div className="tile-icon">🏠</div>
              <h3>{content.cards.homeTitle}</h3>
              <p>{content.cards.homeText}</p>
            </article>

            <article className="tile tile-narrow">
              <div className="tile-icon">🛡️</div>
              <h3>{content.cards.safetyTitle}</h3>
              <p>{content.cards.safetyText}</p>
            </article>
          </div>
        </section>

        {/* ── ROADMAP ───────────────────────────────────────── */}
        <section className="section section-alt" id="roadmap">
          <div className="container">
            <div className="section-head center reveal">
              <p className="overline">{content.vision.roadmapOverline}</p>
              <h2>{content.vision.roadmapTitle}</h2>
            </div>

            <div className="roadmap-grid reveal">
              <article className="phase phase-primary">
                <div className="phase-number">Phase 01</div>
                <h3>Core</h3>
                <p>Launch the central Madinaty.AI web and mobile interfaces for all residents.</p>
              </article>
              <article className="phase phase-secondary">
                <div className="phase-number">Phase 02</div>
                <h3>Pulse</h3>
                <p>Integrate local businesses and social graph intelligence into one adaptive ecosystem.</p>
              </article>
              <article className="phase phase-tertiary">
                <div className="phase-number">Phase 03</div>
                <h3>Harmony</h3>
                <p>Complete smart transit and utility orchestration with real-time optimization loops.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="section container">
          <div className="cta-section reveal">
            <div className="ai-pulse" style={{ margin: "0 auto 1.25rem" }} />
            <h2>{content.vision.ctaTitle}</h2>
            <p>{content.vision.ctaText}</p>
            <a className="btn btn-primary" href={locale === "ar" ? "/ar" : "/en"}>
              {content.vision.ctaButton}
            </a>
          </div>
        </section>
      </main>

      <Footer content={content} />
    </PageShell>
  );
}
