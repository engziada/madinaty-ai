"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { AstroAvatar } from "./AstroAvatar";
import type { LocaleCode, SiteContent } from "@/types/site";

interface ChatFabProps {
  content: SiteContent;
  locale: LocaleCode;
}

/**
 * Floating AI chatbot FAB (Floating Action Button).
 *
 * Renders Astro as a playful bottom-right floating character.
 * Clicking opens a themed floating modal with the ChatPanel.
 */
export function ChatFab({ content, locale }: ChatFabProps) {
  const [open, setOpen] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isAr = locale === "ar";
  const label = isAr ? "مدينتي شات" : "Madinaty Chatbot";

  /* Periodic playful wiggle to catch attention */
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      const timeout = setTimeout(() => setWiggle(false), 800);
      return () => clearTimeout(timeout);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  /* Open via global custom event (NavBar, etc.) */
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-madinaty-chat", handler);
    return () => window.removeEventListener("open-madinaty-chat", handler);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on overlay click */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) setOpen(false);
    },
    []
  );

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        className={`chat-fab ${wiggle ? "chat-fab--wiggle" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={label}
        title={label}
      >
        <AstroAvatar mood="waving" size="md" />
        <span className="chat-fab-label">{label}</span>
      </button>

      {/* Floating modal */}
      {open && (
        <div
          className="chat-fab-modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="chat-fab-modal" ref={modalRef}>
            <div className="chat-fab-modal-header">
              <div className="chat-fab-modal-title">
                <AstroAvatar mood="talking" size="sm" />
                <span>
                  {isAr ? "مساعد مدينتي AI" : "Madinaty AI Assistant"}
                </span>
              </div>
              <button
                type="button"
                className="chat-fab-modal-close"
                onClick={() => setOpen(false)}
                aria-label={isAr ? "إغلاق" : "Close"}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="chat-fab-modal-body">
              <ChatPanel content={content} locale={locale} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
