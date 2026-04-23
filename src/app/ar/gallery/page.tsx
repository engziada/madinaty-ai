"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";

interface Photo {
  src: string;
  name: string;
}

/** Professional camera SVG (shared visual motif — matches the English page). */
function ProCameraIcon({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 96"
      role="img"
      aria-labelledby="pro-cam-title-ar"
      className="pro-camera-icon"
    >
      <title id="pro-cam-title-ar">كاميرا احترافية</title>
      <defs>
        <linearGradient id="pc-body-ar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e4fd9" />
          <stop offset="100%" stopColor="#0bb8c7" />
        </linearGradient>
        <linearGradient id="pc-lens-ar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b5b" />
          <stop offset="100%" stopColor="#ffc94a" />
        </linearGradient>
      </defs>
      <rect x="52" y="6" width="20" height="8" rx="1.5" fill="url(#pc-body-ar)" />
      <path
        d="M8 28 Q8 22 14 22 L36 22 L44 16 Q46 14 50 14 L74 14 Q78 14 80 16 L88 22 L110 22 Q116 22 116 28 L116 78 Q116 84 110 84 L14 84 Q8 84 8 78 Z"
        fill="url(#pc-body-ar)"
        opacity="0.95"
      />
      <rect x="10" y="30" width="16" height="50" rx="3" fill="#000" opacity="0.18" />
      <circle cx="100" cy="32" r="2.2" fill="#ffffff" opacity="0.9" />
      <circle cx="62" cy="52" r="28" fill="#0a1a36" opacity="0.25" />
      <circle cx="62" cy="52" r="26" fill="url(#pc-lens-ar)" />
      <circle cx="62" cy="52" r="26" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="62" cy="52" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="62" cy="52" r="12" fill="#0a1a36" />
      <circle cx="62" cy="52" r="11" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" />
      <ellipse cx="56" cy="46" rx="6" ry="3" fill="#ffffff" opacity="0.55" />
      <rect x="90" y="44" width="16" height="10" rx="1.5" fill="#ffffff" opacity="0.25" />
      <circle cx="22" cy="16" r="4" fill="#ff6b5b" />
    </svg>
  );
}

function UploadAnnouncementModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content gallery-announce"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-announce-title-ar"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">
          <X size={20} />
        </button>
        <div className="modal-icon" aria-hidden="true">
          <ProCameraIcon size={96} />
        </div>
        <h3 id="gallery-announce-title-ar">شاهد مدينتي بعيناك</h3>
        <p>
          قريباً ستتمكن من رفع صورك الخاصة التي تعبّر عن جمال مدينتي بعيناك —
          شارعك، شروقك، مكانك المفضل. حتى ذلك الحين، استمتع بمعرض المجتمع
          أدناه.
        </p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            فهمت
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPageAr() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setPhotos(Array.isArray(data.photos) ? data.photos : []);
      } catch {
        if (!cancelled) setPhotos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  return (
    <main className="gallery-page" dir="rtl">
      {showModal && <UploadAnnouncementModal onClose={() => setShowModal(false)} />}

      <section className="gallery-hero">
        <h1 className="gallery-hero-title">معرض مدينتي</h1>
        <p className="gallery-hero-subtitle">
          التقاط جوهر أذكى مدينة في مصر — لحظات، مساحات، والمجتمع الذي يجعلها
          مميزة.
        </p>
        {/* شاركنا صورك معطل حتى إطلاق ميزة الرفع */}
        <button className="gallery-invite" disabled aria-disabled="true" title="قريباً">
          <span aria-hidden="true" style={{ display: "inline-flex" }}>
            <ProCameraIcon size={18} />
          </span>
          ميزة الرفع قريباً
        </button>
      </section>

      <section className="gallery-grid" aria-busy={loading}>
        {loading ? (
          <div className="gallery-empty">
            <p>جارٍ تحميل المعرض…</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-empty">
            <ProCameraIcon size={64} />
            <p>لا توجد صور بعد.</p>
            <p className="gallery-empty-sub">الصور ستظهر هنا قريباً — ترقبوا!</p>
          </div>
        ) : (
          photos.map((photo, index) => (
            <button
              key={photo.src}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${index * 0.05}s` }}
              type="button"
              aria-label={`عرض الصورة ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt="" loading="lazy" />
            </button>
          ))
        )}
      </section>

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="إغلاق"
          >
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[lightboxIndex].src}
            alt=""
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="container" style={{ padding: "2rem 1rem", textAlign: "center" }}>
        <Link
          href="/ar"
          className="btn btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={18} />
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
