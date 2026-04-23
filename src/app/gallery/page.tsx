"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";

interface Photo {
  src: string;
  name: string;
}

/**
 * Inline "professional DSLR camera" SVG used in the load-modal.
 * Outline-style, two-tone, works on light and dark backgrounds.
 */
function ProCameraIcon({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 96"
      role="img"
      aria-labelledby="pro-cam-title"
      className="pro-camera-icon"
    >
      <title id="pro-cam-title">Professional camera</title>
      <defs>
        <linearGradient id="pc-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e4fd9" />
          <stop offset="100%" stopColor="#0bb8c7" />
        </linearGradient>
        <linearGradient id="pc-lens" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b5b" />
          <stop offset="100%" stopColor="#ffc94a" />
        </linearGradient>
      </defs>

      {/* Top accessory shoe */}
      <rect x="52" y="6" width="20" height="8" rx="1.5" fill="url(#pc-body)" />

      {/* Body */}
      <path
        d="M8 28 Q8 22 14 22 L36 22 L44 16 Q46 14 50 14 L74 14 Q78 14 80 16 L88 22 L110 22 Q116 22 116 28 L116 78 Q116 84 110 84 L14 84 Q8 84 8 78 Z"
        fill="url(#pc-body)"
        opacity="0.95"
      />

      {/* Grip accent */}
      <rect x="10" y="30" width="16" height="50" rx="3" fill="#000" opacity="0.18" />

      {/* Viewfinder dot */}
      <circle cx="100" cy="32" r="2.2" fill="#ffffff" opacity="0.9" />

      {/* Lens outer */}
      <circle cx="62" cy="52" r="28" fill="#0a1a36" opacity="0.25" />
      <circle cx="62" cy="52" r="26" fill="url(#pc-lens)" />
      {/* Lens rings */}
      <circle cx="62" cy="52" r="26" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="62" cy="52" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      {/* Aperture */}
      <circle cx="62" cy="52" r="12" fill="#0a1a36" />
      <circle cx="62" cy="52" r="11" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" />
      {/* Highlight flare */}
      <ellipse cx="56" cy="46" rx="6" ry="3" fill="#ffffff" opacity="0.55" />

      {/* Flash window (right) */}
      <rect x="90" y="44" width="16" height="10" rx="1.5" fill="#ffffff" opacity="0.25" />

      {/* Shutter button */}
      <circle cx="22" cy="16" r="4" fill="#ff6b5b" />
    </svg>
  );
}

/**
 * Announcement modal shown on first load — tells the user uploads are coming.
 */
function UploadAnnouncementModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content gallery-announce"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-announce-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="modal-icon" aria-hidden="true">
          <ProCameraIcon size={96} />
        </div>
        <h3 id="gallery-announce-title">See Madinaty through your own lens</h3>
        <p>
          Soon you&apos;ll be able to upload your own photos that capture
          Madinaty&apos;s beauty through your eyes — your street, your sunrise,
          your favorite spot. Until then, enjoy the community gallery below.
        </p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(true);

  // Dynamic photo listing from `/api/gallery`.
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
    <main className="gallery-page">
      {showModal && <UploadAnnouncementModal onClose={() => setShowModal(false)} />}

      <section className="gallery-hero">
        <h1 className="gallery-hero-title">Madinaty Gallery</h1>
        <p className="gallery-hero-subtitle">
          Capturing the essence of Egypt&apos;s smartest city — moments, spaces,
          and the community that makes it special.
        </p>
        {/* "Submit Your Photos" is disabled until upload infra ships. */}
        <button className="gallery-invite" disabled aria-disabled="true" title="Coming soon">
          <span aria-hidden="true" style={{ display: "inline-flex" }}>
            <ProCameraIcon size={18} />
          </span>
          Uploads Coming Soon
        </button>
      </section>

      <section className="gallery-grid" aria-busy={loading}>
        {loading ? (
          <div className="gallery-empty">
            <p>Loading gallery…</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-empty">
            <ProCameraIcon size={64} />
            <p>No gallery photos yet.</p>
            <p className="gallery-empty-sub">Photos will appear here soon — stay tuned!</p>
          </div>
        ) : (
          photos.map((photo, index) => (
            <button
              key={photo.src}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${index * 0.05}s` }}
              type="button"
              aria-label={`Open photo ${index + 1}`}
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
            aria-label="Close"
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
          href="/en"
          className="btn btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
