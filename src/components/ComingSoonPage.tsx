"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LocaleCode } from "@/types/site";
import { getCityBySlug, type CityInfo } from "@/data/cities";

interface ComingSoonPageProps {
  locale: LocaleCode;
}

/**
 * Build the headline / subtitle / trust copy for a given city in a given locale.
 * The hero *title* is the city brand name (e.g. "AlShroukAI"), replacing the
 * generic "Coming Soon" / "قريباً" per product direction.
 */
function getCopy(city: CityInfo, locale: LocaleCode) {
  const isAr = locale === "ar";
  const cityLabel = isAr ? city.nameAr : city.name;
  return {
    overline: isAr ? "بوابة مدينتي AI" : "Madinaty AI · Portal",
    headline: isAr ? "البوابة قريباً" : "The Portal is",
    // Hero title is always the city-branded product name.
    highlight: city.brandName,
    // Subtitle: exact AR template from product direction.
    sub: isAr
      ? `بوابتك لخدمات المدينة الذكية، بيانات المجتمع المباشرة، تتبع النقل، والذكاء الاصطناعي للمدينة. قريباً لسكان ${cityLabel}.`
      : `Your gateway to smart city services, live community data, shuttle tracking, and AI-powered city intelligence. Coming soon for ${cityLabel} residents.`,
    notifyLabel: isAr ? "أخبرني عند الإطلاق" : "Get notified when we launch",
    notifyPlaceholder: "your@email.com",
    notifyBtn: isAr ? "أخبرني" : "Notify Me",
    notifySuccess: isAr ? "تم التسجيل! سنتواصل معك قريباً." : "You're on the list! We'll reach out soon.",
    back: isAr ? "← العودة للرئيسية" : "← Back to Home",
    trust: isAr
      ? ["خصوصية بالتصميم", "بريد واحد فقط · بدون إزعاج", "إشعار عند الإطلاق"]
      : ["Private by design", "One email, no spam", "Notify on launch"],
    features: isAr
      ? ["النقل الذكي", "بوت مجتمعي AI", "خريطة المدينة المباشرة", "الفعاليات وورش العمل", "إدارة المنزل", "لوحة الأمان"]
      : ["Smart Transportation", "Community AI Bot", "Live City Map", "Events & Workshops", "Home Management", "Safety Dashboard"],
  };
}

/**
 * Inner component. Split out so the `useSearchParams()` call can live
 * inside a `<Suspense>` boundary (Next 15 requires this for any component
 * that reads URL search params).
 */
function ComingSoonInner({ locale }: ComingSoonPageProps) {
  const searchParams = useSearchParams();
  const city = useMemo(() => getCityBySlug(searchParams.get("c")), [searchParams]);
  const t = getCopy(city, locale);
  const isRtl = locale === "ar";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Particle canvas — throttled for mobile + respects reduced-motion ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w0 = window.innerWidth;
    const BASE = w0 < 600 ? 40 : w0 < 1024 ? 80 : 120;
    const CONNECT_DIST = w0 < 600 ? 70 : 100;

    let animId: number | null = null;
    let paused = false;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; a: number; da: number }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < BASE; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.008,
      });
    }

    function draw() {
      if (!ctx || !canvas || paused) {
        animId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a = Math.max(0.05, Math.min(0.85, p.a + p.da));
        if (p.a <= 0.05 || p.a >= 0.85) p.da *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 210, ${p.a})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 210, 210, ${0.06 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    if (reduceMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 210, ${p.a})`;
        ctx.fill();
      }
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    function onVisibility() {
      paused = document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibility);

    animId = requestAnimationFrame(draw);
    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          city: city.name,
          locale,
        }),
      });
    } catch {
      // Best-effort; don't block UI
    }
    setSubmitted(true);
  }

  const homeHref = locale === "ar" ? "/ar" : "/en";

  return (
    <div className="cs-root" dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <canvas ref={canvasRef} className="cs-canvas" />
      <div className="cs-grid-overlay" aria-hidden="true" />
      <div className="cs-glow cs-glow-1" aria-hidden="true" />
      <div className="cs-glow cs-glow-2" aria-hidden="true" />

      {/* NOTE: No in-page header bar here. The global NavBar (rendered by
          RootNavFooter in the root layout) already provides branding,
          navigation, and locale/theme controls. Adding a second header
          on this page created a stacked duplicate. */}

      <main className="cs-main" id="main-content" tabIndex={-1}>
        <div className="cs-content">
          <p className="cs-eye">{t.headline}</p>
          <h1 className="cs-title gradient-text">{t.highlight}</h1>
          <p className="cs-sub">{t.sub}</p>

          {/* Trust row — honest reassurance, no fake countdown */}
          <ul className="cs-trust" aria-label={locale === "ar" ? "تعهداتنا" : "Our promises"}>
            {t.trust.map((line) => (
              <li key={line} className="cs-trust-item">
                <span className="cs-trust-dot" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>

          {/* Notify form */}
          {submitted ? (
            <div className="cs-success">{t.notifySuccess}</div>
          ) : (
            <form className="cs-form" onSubmit={handleNotify}>
              <label className="cs-form-label">{t.notifyLabel}</label>
              <div className="cs-form-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.notifyPlaceholder}
                  required
                  className="cs-input"
                />
                <button type="submit" className="btn btn-primary cs-btn">
                  {t.notifyBtn}
                </button>
              </div>
            </form>
          )}

          {/* Features grid */}
          <div className="cs-features">
            {t.features.map((f) => (
              <div key={f} className="cs-feature-chip">
                <span className="cs-chip-dot" />
                {f}
              </div>
            ))}
          </div>

          <Link href={homeHref} className="cs-back">
            {t.back}
          </Link>
        </div>
      </main>
    </div>
  );
}

/**
 * Futuristic Coming Soon page for the Madinaty AI portal.
 * Reads `?c=<slug>` to render city-specific branding & copy.
 */
export function ComingSoonPage({ locale }: ComingSoonPageProps) {
  return (
    // Next 15 requires useSearchParams to be inside a Suspense boundary
    // or prerendering falls back to client-only rendering for the whole route.
    <Suspense fallback={<div className="cs-root" />}>
      <ComingSoonInner locale={locale} />
    </Suspense>
  );
}
