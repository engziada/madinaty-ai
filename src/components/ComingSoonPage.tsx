"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { LocaleCode } from "@/types/site";
// Legacy form fallback: import { EnrollmentModal } from "@/components/EnrollmentModal";
import { AstroChatEnrollment } from "@/components/conversational/AstroChatEnrollment";

interface ComingSoonPageProps {
  locale: LocaleCode;
}

/**
 * Futuristic Coming Soon landing page — the ONLY page visitors see while
 * the full site is under construction.
 *
 * Features:
 *  - Full-screen particle canvas with neural-net lines
 *  - Glitch / holographic title animation
 *  - Floating 3-D orbit rings
 *  - Scanline + grid overlay for depth
 *  - Enrollment modal trigger (same modal as the main landing page)
 */
function ComingSoonInner({ locale }: ComingSoonPageProps) {
  const isAr = locale === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [countdownText, setCountdownText] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });

  /* ── Periodic glitch effect on headline ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  /* ── Countdown — target: June 15 2025 ── */
  useEffect(() => {
    const target = new Date("2025-06-15T10:00:00+03:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setCountdownText({ days: pad(d), hours: pad(h), mins: pad(m), secs: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Particle neural canvas ── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number | null = null;
    let paused = false;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const COUNT = W() < 600 ? 50 : W() < 1024 ? 90 : 140;
    const CONNECT = W() < 600 ? 80 : 120;

    type Pt = { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number; hue: number };
    const pts: Pt[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.009,
      hue: Math.random() < 0.7 ? 180 : Math.random() < 0.5 ? 200 : 270,
    }));

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas || paused) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        p.a = Math.max(0.05, Math.min(0.9, p.a + p.da));
        if (p.a <= 0.05 || p.a >= 0.9) p.da *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.a})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            const alpha = 0.08 * (1 - dist / CONNECT);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,220,210,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    if (reduceMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.a})`; ctx.fill();
      }
    } else {
      const onVis = () => { paused = document.hidden; };
      document.addEventListener("visibilitychange", onVis);
      animId = requestAnimationFrame(draw);
      return () => {
        if (animId !== null) cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    return () => { window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => { return initCanvas(); }, [initCanvas]);

  /* ── Copy ── */
  const copy = isAr ? {
    badge: "🚀 قريباً جداً",
    preTitle: "بوابة مدينتي الذكية",
    title: "مدينتي",
    titleAI: "AI",
    tagline: "ثورة ذكية قادمة لمجتمعك",
    sub: "أعِدّ أبناءك لعصر الذكاء الاصطناعي بأكبر حدث مجاني وفريد من نوعه في مدينتي — ورشة مجانية لتأهيل أطفالك بأمان لعالم الذكاء الاصطناعي",
    eventLabel: "🎯 الحدث القادم",
    eventTitle: "كورس الأطفال المجاني للذكاء الاصطناعي",
    eventDesc: "جلسة تفاعلية مكثفة · ٢ ساعة · أعمار ٧–١٠ سنوات · ٥٠ مقعداً فقط",
    ctaMain: "سجّل طفلك الآن — مجاناً",
    ctaSub: "احجز مكانك قبل امتلاء المقاعد",
    countdownLabel: ["يوم", "ساعة", "دقيقة", "ثانية"],
    promise1: "🔒 مجاني تماماً",
    promise2: "🏆 مدربون محترفون",
    promise3: "🛡️ بيئة آمنة للأطفال",
    comingSoon: "الموقع الكامل قيد الإنشاء — ترقبوا الإطلاق الكبير",
  } : {
    badge: "🚀 Coming Very Soon",
    preTitle: "Madinaty AI Portal",
    title: "Madinaty",
    titleAI: "AI",
    tagline: "A smart revolution is coming to your community",
    sub: "Prepare your kids for the biggest, FREE, one-of-a-kind event in Madinaty — a unique workshop to safely equip your children for the AI era",
    eventLabel: "🎯 Next Event",
    eventTitle: "Free AI Flash Course for Kids",
    eventDesc: "Intensive interactive session · 2 hours · Ages 7–10 · Only 50 seats",
    ctaMain: "Register Your Child — It's FREE",
    ctaSub: "Secure your spot before seats fill up",
    countdownLabel: ["Days", "Hours", "Mins", "Secs"],
    promise1: "🔒 Completely Free",
    promise2: "🏆 Expert Mentors",
    promise3: "🛡️ Safe for Kids",
    comingSoon: "Full website under construction — big launch coming soon",
  };

  return (
    <div className="cs2-root" dir={isAr ? "rtl" : "ltr"} lang={locale}>
      {/* ── Background layers ── */}
      <canvas ref={canvasRef} className="cs2-canvas" aria-hidden="true" />
      <div className="cs2-grid" aria-hidden="true" />
      <div className="cs2-scanlines" aria-hidden="true" />
      <div className="cs2-glow cs2-glow-1" aria-hidden="true" />
      <div className="cs2-glow cs2-glow-2" aria-hidden="true" />
      <div className="cs2-glow cs2-glow-3" aria-hidden="true" />

      {/* ── Orbit rings decoration ── */}
      <div className="cs2-orbit cs2-orbit-1" aria-hidden="true">
        <div className="cs2-orbit-dot" />
      </div>
      <div className="cs2-orbit cs2-orbit-2" aria-hidden="true">
        <div className="cs2-orbit-dot" />
      </div>
      <div className="cs2-orbit cs2-orbit-3" aria-hidden="true">
        <div className="cs2-orbit-dot" />
      </div>

      {/* ── Main content ── */}
      <main className="cs2-main" id="main-content" tabIndex={-1}>
        {/* Logo removed as requested */}

        {/* Badge */}
        <div className="cs2-badge">
          <span className="cs2-badge-dot" aria-hidden="true" />
          {copy.badge}
        </div>

        {/* Pre-title */}
        <p className="cs2-pre-title">{copy.preTitle}</p>

        {/* Hero title */}
        <h1 className={`cs2-title${glitchActive ? " cs2-glitch" : ""}`}>
          <span className="cs2-title-main">{copy.title}</span>
          <span className="cs2-title-ai">&nbsp;{copy.titleAI}</span>
        </h1>

        {/* Tagline */}
        <p className="cs2-tagline gradient-text">{copy.tagline}</p>

        {/* Sub-headline */}
        <p className="cs2-sub">{copy.sub}</p>

        {/* ── Event card ── */}
        <div className="cs2-event-card glass">
          <div className="cs2-event-label">{copy.eventLabel}</div>
          <h2 className="cs2-event-title">{copy.eventTitle}</h2>
          <p className="cs2-event-desc">{copy.eventDesc}</p>

          {/* Promise badges */}
          <div className="cs2-promises">
            <span className="cs2-promise">{copy.promise1}</span>
            <span className="cs2-promise">{copy.promise2}</span>
            <span className="cs2-promise">{copy.promise3}</span>
          </div>
          
          <p className="cs2-event-location-hint" style={{ fontSize: "0.85rem", color: "var(--teal)", marginBottom: "1rem", opacity: 0.9 }}>
            {isAr ? "📍 ملاحظة: سيتم تحديد المكان داخل مدينتي وإعلامكم لاحقاً." : "📍 Note: Location will be within Madinaty. We will inform you once determined."}
          </p>

          {/* CTA */}
          <button
            id="cs2-enroll-btn"
            className="cs2-cta-btn btn btn-primary"
            onClick={() => setEnrollOpen(true)}
          >
            <span className="cs2-cta-inner">
              <span className="cs2-cta-icon">✨</span>
              {copy.ctaMain}
            </span>
          </button>
          <p className="cs2-cta-sub">{copy.ctaSub}</p>
        </div>

        {/* ── Waitlist Form ── */}
        <form 
          className="cs2-waitlist-form" 
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            if (!email) return;
            const btn = e.currentTarget.querySelector("button");
            if (btn) btn.disabled = true;
            try {
              await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, city: "Madinaty", locale }),
              });
              const input = e.currentTarget.querySelector("input");
              if (input) {
                input.value = "";
                input.placeholder = isAr ? "تم التسجيل بنجاح! ✓" : "Successfully subscribed! ✓";
              }
            } catch (err) {
              console.error(err);
            } finally {
              if (btn) {
                btn.disabled = false;
                btn.textContent = isAr ? "تم!" : "Done!";
                setTimeout(() => {
                  btn.textContent = isAr ? "أعلمني عند الإطلاق" : "Notify Me";
                }, 3000);
              }
            }
          }}
        >
          <div className="cs2-waitlist-input-group">
            <input 
              type="email" 
              name="email"
              placeholder={isAr ? "أدخل بريدك الإلكتروني لمعرفة موعد الإطلاق..." : "Enter your email to know when we launch..."} 
              className="cs2-waitlist-input"
              required 
            />
            <button type="submit" className="btn btn-primary cs2-waitlist-btn">
              {isAr ? "أعلمني عند الإطلاق" : "Notify Me"}
            </button>
          </div>
        </form>

        {/* Footer note */}
        <p className="cs2-footer-note">{copy.comingSoon}</p>
      </main>

      {/* ── Enrollment Modal ── */}
      {/* AI-driven conversational enrollment (replaces EnrollmentModal) */}
      <AstroChatEnrollment locale={locale} open={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </div>
  );
}

/**
 * Exported shell — wraps the inner component in a Suspense boundary so that
 * any downstream useSearchParams usage compiles cleanly under Next 15.
 */
export function ComingSoonPage({ locale }: ComingSoonPageProps) {
  return (
    <Suspense fallback={<div className="cs2-root" />}>
      <ComingSoonInner locale={locale} />
    </Suspense>
  );
}
