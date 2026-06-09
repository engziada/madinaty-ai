"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, Sparkles } from "lucide-react";
import type { LocaleCode } from "@/types/site";
import { getSiteContent } from "@/data/content";

interface Photo {
  src: string;
  name: string;
}

interface HighlightsGalleryProps {
  locale: LocaleCode;
}

export function HighlightsGallery({ locale }: HighlightsGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [limit, setLimit] = useState(9); // Default to 9 (3x3 grid)

  const isAr = locale === "ar";
  const content = getSiteContent(locale);
  const t = content.event;

  // Fetch photos on load and shuffle client-side
  useEffect(() => {
    let active = true;
    async function fetchPhotos() {
      try {
        // Cache-busting timestamp to guarantee a fresh random response on each page load
        const res = await fetch(`/api/gallery/session?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (active && Array.isArray(data.photos)) {
          // Shuffle the full list on the client side for guaranteed randomness
          const shuffled = [...data.photos].sort(() => 0.5 - Math.random());
          setPhotos(shuffled);
        }
      } catch (err) {
        console.error("Failed to load highlights gallery", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchPhotos();
    return () => {
      active = false;
    };
  }, []);

  // Manage responsive grid limits
  useEffect(() => {
    function updateLimit() {
      if (window.innerWidth < 768) {
        setLimit(6); // 2x3 grid on small screens
      } else {
        setLimit(9); // 3x3 grid on medium/large screens
      }
    }
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // Manage body scroll overflow dynamically to prevent global scrolling lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Manage ESC key listener for closing lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  if (loading) {
    return (
      <div className="gallery-loader">
        <div className="spinner"></div>
        <p>{t.galleryLoading || "Loading highlights..."}</p>
        <style jsx>{`
          .gallery-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            color: var(--text-soft);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(0, 210, 210, 0.1);
            border-top-color: var(--teal);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!photos || photos.length === 0) return null;

  const visiblePhotos = photos.slice(0, limit);

  return (
    <div className="highlights-gallery-container reveal">
      <div className="gallery-header">
        <div className="title-wrapper">
          <Sparkles className="sparkle-icon" size={32} />
          <h2 className="gallery-title">{t.galleryTitle || "ألبوم الصور مع العباقرة الصغار"}</h2>
        </div>
        <p className="gallery-subtitle">
          {t.gallerySubtitle || "Magical moments from our AI lab!"}
        </p>
      </div>

      <div className="magic-grid">
        {visiblePhotos.map((photo, idx) => {
          // Playful randomness
          const rotation = idx % 2 === 0 ? "rotate(2deg)" : "rotate(-2deg)";
          const colorClass = ["accent-blue", "accent-teal", "accent-purple", "accent-orange"][idx % 4];
          
          return (
            <div 
              key={`${photo.src}-${idx}`} 
              className={`magic-card ${colorClass}`}
              style={{ '--base-rotation': rotation } as any}
              onClick={() => openLightbox(idx)}
            >
              <div className="image-wrapper">
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="gallery-img"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="image-overlay">
                  <div className="zoom-btn">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>
              <div className="magic-tape" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={32} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={visiblePhotos[lightboxIndex].src}
              alt={visiblePhotos[lightboxIndex].name}
              width={1200}
              height={900}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "90vh", borderRadius: "12px" }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .highlights-gallery-container {
          margin: 4rem auto;
          padding: 3rem 1rem;
          max-width: 1200px;
          position: relative;
        }
        
        .gallery-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .title-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .sparkle-icon {
          color: var(--primary);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.2) rotate(15deg); opacity: 1; color: var(--teal); }
          100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
        }
        .gallery-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }
        .gallery-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }
        
        .magic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          padding: 1rem;
        }
        
        .magic-card {
          background: var(--surface);
          padding: 12px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transform: var(--base-rotation);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          cursor: pointer;
          border: 1px solid var(--border);
        }
        
        .magic-card:hover {
          transform: scale(1.05) rotate(0deg) translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        
        /* Colorful Accents */
        .accent-blue { border-bottom: 6px solid #3b82f6; }
        .accent-teal { border-bottom: 6px solid #14b8a6; }
        .accent-purple { border-bottom: 6px solid #8b5cf6; }
        .accent-orange { border-bottom: 6px solid #f97316; }
        
        /* Playful Tape */
        .magic-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 80px;
          height: 24px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          z-index: 2;
          opacity: 0.8;
        }
        [data-theme="dark"] .magic-tape {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
        }
        .gallery-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .magic-card:hover .gallery-img {
          transform: scale(1.1);
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }
        .magic-card:hover .image-overlay {
          opacity: 1;
        }
        
        .zoom-btn {
          background: var(--surface);
          color: var(--primary);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.5);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .magic-card:hover .zoom-btn {
          transform: scale(1);
        }
        
        /* Lightbox styling */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          backdrop-filter: blur(12px);
          cursor: zoom-out;
        }
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100000;
        }
        .lightbox-close:hover {
          background: var(--primary, #00d2d2);
          color: #000000;
          border-color: var(--primary, #00d2d2);
          transform: rotate(90deg) scale(1.1);
        }
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }

        @media (max-width: 768px) {
          .magic-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .gallery-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
