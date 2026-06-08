"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isAr = locale === "ar";
  const content = getSiteContent(locale);
  const t = content.event;

  // Fetch photos on load
  useEffect(() => {
    let active = true;
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/gallery/session", { cache: "no-store" });
        const data = await res.json();
        if (active && Array.isArray(data.photos)) {
          setPhotos(data.photos);
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
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

  if (photos.length === 0) {
    return null; // Don't render empty section
  }

  return (
    <div className="highlights-gallery-container reveal">
      <div className="gallery-header">
        <h2 className="gallery-title">{t.galleryTitle || "First Session Highlights"}</h2>
        <p className="gallery-subtitle">
          {t.gallerySubtitle || "Real moments and certifications from our initial session."}
        </p>
      </div>

      <div className="carousel-outer">
        {/* Navigation Buttons */}
        <button
          className="nav-btn prev-btn"
          onClick={isAr ? handleNext : handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            ref={trackRef}
            style={{
              transform: `translateX(${isAr ? currentIndex * 100 : -currentIndex * 100}%)`,
            }}
          >
            {photos.map((photo, idx) => (
              <div key={photo.src} className="carousel-slide">
                <div className="image-wrapper" onClick={() => openLightbox(idx)}>
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="gallery-img"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  <div className="image-overlay">
                    <ZoomIn className="zoom-icon" size={32} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-btn next-btn"
          onClick={isAr ? handlePrev : handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress indicators / dots */}
      <div className="carousel-dots">
        {photos.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${currentIndex === idx ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={28} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].name}
              width={1200}
              height={900}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "90vh" }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .highlights-gallery-container {
          margin: 4rem 0;
          padding: 2rem;
          background: rgba(13, 21, 32, 0.6);
          border: 1px solid var(--border);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .gallery-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.85rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--teal) 0%, var(--blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .gallery-subtitle {
          color: var(--text-soft);
          font-size: 0.95rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .carousel-outer {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .carousel-viewport {
          width: 100%;
          max-width: 800px;
          height: 450px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
        .carousel-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .carousel-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          position: relative;
        }
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
        }
        .gallery-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .image-wrapper:hover .gallery-img {
          transform: scale(1.05);
        }
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(7, 13, 24, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }
        .image-wrapper:hover .image-overlay {
          opacity: 1;
        }
        .zoom-icon {
          color: var(--teal);
          filter: drop-shadow(0 2px 8px rgba(0, 210, 210, 0.4));
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .image-wrapper:hover .zoom-icon {
          transform: scale(1);
        }
        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 21, 32, 0.8);
          border: 1px solid var(--border);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .nav-btn:hover {
          background: var(--teal);
          color: #070d18;
          border-color: var(--teal);
          box-shadow: 0 0 15px rgba(0, 210, 210, 0.4);
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dot.active {
          background: var(--teal);
          width: 24px;
          border-radius: 100px;
          box-shadow: 0 0 8px rgba(0, 210, 210, 0.6);
        }
        
        /* Lightbox styling */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 13, 24, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(8px);
        }
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          color: var(--text-soft);
          cursor: pointer;
          transition: color 0.2s;
        }
        .lightbox-close:hover {
          color: var(--teal);
        }
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .highlights-gallery-container {
            padding: 1rem;
            margin: 2.5rem 0;
          }
          .carousel-viewport {
            height: 250px;
          }
          .nav-btn {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}
