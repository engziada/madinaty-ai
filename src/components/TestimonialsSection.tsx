"use client";

import { useState } from "react";
import type { LocaleCode } from "@/types/site";
import { testimonials } from "@/data/testimonials";
import { AstroAvatar } from "@/components/AstroAvatar";

interface TestimonialsSectionProps {
  locale: LocaleCode;
}

/**
 * Testimonials carousel — displays parent/student reviews.
 * Reads from src/data/testimonials.ts which can be edited with real feedback.
 */
export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const isAr = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <>
      <style jsx global>{`
        .testimonials-section {
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }
        .testimonials-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(43, 110, 255, 0.03) 30%,
            rgba(11, 184, 199, 0.03) 70%,
            transparent 100%
          );
          pointer-events: none;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }
        .testimonials-overline {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--teal);
          margin-bottom: 0.75rem;
        }
        .testimonials-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .testimonials-astro {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .testimonial-card {
          max-width: 680px;
          margin: 0 auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          box-shadow: var(--shadow-card);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .testimonial-card::before {
          content: "❝";
          position: absolute;
          top: -10px;
          left: 24px;
          font-size: 4rem;
          color: var(--teal);
          opacity: 0.2;
          line-height: 1;
          font-family: serif;
        }
        [dir="rtl"] .testimonial-card::before {
          left: auto;
          right: 24px;
        }

        .testimonial-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--blue) 0%, var(--teal) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .testimonial-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .testimonial-name {
          font-weight: 700;
          color: var(--text);
          font-size: 1rem;
        }
        .testimonial-relation {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .testimonial-stars {
          display: flex;
          gap: 0.2rem;
          margin-bottom: 1rem;
        }
        .testimonial-star {
          color: #ffc94a;
          font-size: 1.1rem;
        }

        .testimonial-nav {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .testimonial-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .testimonial-dot--active {
          background: var(--teal);
          border-color: var(--teal);
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .testimonials-title { font-size: 1.6rem; }
          .testimonial-card { padding: 1.5rem; margin: 0 1rem; }
          .testimonial-text { font-size: 1rem; }
        }
      `}</style>

      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <div className="testimonials-astro">
              <AstroAvatar mood="celebrating" size="md" />
            </div>
            <p className="testimonials-overline">
              {isAr ? "آراء أولياء الأمور" : "What Parents Say"}
            </p>
            <h2 className="testimonials-title">
              {isAr ? "تجارب حقيقية من مجتمعنا" : "Real Experiences from Our Community"}
            </h2>
          </div>

          <div className="testimonial-card" key={current.id}>
            <div className="testimonial-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="testimonial-star" aria-hidden="true">
                  {i < current.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <p className="testimonial-text">
              {isAr ? current.textAr : current.textEn}
            </p>

            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {(isAr ? current.nameAr : current.nameEn).charAt(0)}
              </div>
              <div className="testimonial-meta">
                <span className="testimonial-name">
                  {isAr ? current.nameAr : current.nameEn}
                </span>
                <span className="testimonial-relation">
                  {isAr ? current.relationAr : current.relationEn}
                </span>
              </div>
            </div>
          </div>

          <div className="testimonial-nav" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                className={`testimonial-dot ${i === activeIndex ? "testimonial-dot--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                role="tab"
                aria-selected={i === activeIndex}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
