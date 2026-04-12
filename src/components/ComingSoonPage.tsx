"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LocaleCode } from "@/types/site";

interface ComingSoonPageProps {
  locale: LocaleCode;
}

const copy = {
  en: {
    overline: "Madinaty.AI · Portal",
    headline: "The Portal is",
    highlight: "Coming Soon",
    sub: "We're building the full Madinaty.AI portal — your gateway to smart city services, live community data, shuttle tracking, and AI-powered city intelligence. Launching soon for Madinaty residents.",
    countdown: { days: "Days", hours: "Hours", mins: "Mins", secs: "Secs" },
    notifyLabel: "Get notified when we launch",
    notifyPlaceholder: "your@email.com",
    notifyBtn: "Notify Me",
    notifySuccess: "You're on the list! We'll reach out soon.",
    back: "← Back to Home",
    stats: [
      { value: "8,000", label: "Acres of Smart City" },
      { value: "700K+", label: "Future Users" },
      { value: "23", label: "Districts Covered" }
    ],
    features: ["Smart Transportation", "Community AI Bot", "Live City Map", "Events & Workshops", "Home Management", "Safety Dashboard"]
  },
  ar: {
    overline: "Madinaty.AI · البوابة",
    headline: "البوابة",
    highlight: "قريباً",
    sub: "نبني بوابة Madinaty.AI الكاملة — بوابتك لخدمات المدينة الذكية وبيانات المجتمع الحية وتتبع الحافلات وذكاء المدينة. الإطلاق قريباً لسكان مدينتي.",
    countdown: { days: "يوم", hours: "ساعة", mins: "دقيقة", secs: "ثانية" },
    notifyLabel: "أخبرني عند الإطلاق",
    notifyPlaceholder: "بريدك@الإلكتروني",
    notifyBtn: "أبلغني",
    notifySuccess: "أنت في القائمة! سنتواصل معك قريباً.",
    back: "→ العودة للرئيسية",
    stats: [
      { value: "٨٠٠٠", label: "فدان مدينة ذكية" },
      { value: "+٧٠٠ألف", label: "مستخدم مستقبلي" },
      { value: "٢٣", label: "حي مغطى" }
    ],
    features: ["النقل الذكي", "مدينتي بوت", "خريطة المدينة الحية", "الفعاليات والورش", "إدارة المنزل", "لوحة السلامة"]
  }
};

/**
 * Futuristic Coming Soon page for the Madinaty.AI portal.
 */
export function ComingSoonPage({ locale }: ComingSoonPageProps) {
  const t = copy[locale];
  const isRtl = locale === "ar";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Countdown to a fixed launch date ── */
  useEffect(() => {
    const target = new Date("2026-09-01T00:00:00");
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; a: number; da: number }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.008
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
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
      /* Connect nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 210, 210, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  const homeHref = locale === "ar" ? "/ar" : "/";

  return (
    <div className="cs-root" dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <canvas ref={canvasRef} className="cs-canvas" />

      <div className="cs-grid-overlay" aria-hidden="true" />

      <div className="cs-glow cs-glow-1" aria-hidden="true" />
      <div className="cs-glow cs-glow-2" aria-hidden="true" />

      <header className="cs-header">
        <Link href={homeHref} className="cs-brand">
          Madinaty.AI
        </Link>
        <div className="cs-overline-tag">{t.overline}</div>
      </header>

      <main className="cs-main">
        <div className="cs-content">
          <p className="cs-eye">{t.headline}</p>
          <h1 className="cs-title gradient-text">{t.highlight}</h1>
          <p className="cs-sub">{t.sub}</p>

          {/* Stats */}
          <div className="cs-stats">
            {t.stats.map((s) => (
              <div key={s.label} className="cs-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="cs-countdown">
            {(["days", "hours", "mins", "secs"] as const).map((unit) => (
              <div key={unit} className="cs-unit">
                <strong>{String(timeLeft[unit]).padStart(2, "0")}</strong>
                <span>{t.countdown[unit]}</span>
              </div>
            ))}
          </div>

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
