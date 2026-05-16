"use client";

import { useEffect, useState } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { gaEvent } from "@/lib/gtag";

function getPageLocale() {
  if (typeof document === "undefined") return "ar";
  return document.documentElement.lang || "ar";
}

export function NotificationPrompt() {
  const [locale, setLocale] = useState("ar");
  const { status, loading, subscribe } = usePushNotifications(locale);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setLocale(getPageLocale());
  }, []);

  useEffect(() => {
    // Don't show if already granted/denied or previously dismissed this session.
    if (status === "granted" || status === "denied" || dismissed) return;

    // Small delay so the prompt doesn't clash with initial page paint.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, [status, dismissed]);

  useEffect(() => {
    if (visible) {
      gaEvent("notification_prompt_shown", { locale });
    }
  }, [visible, locale]);

  const handleEnable = async () => {
    await subscribe();
    setVisible(false);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    gaEvent("notification_dismissed", { locale });
  };

  if (!visible) return null;

  const isAr = locale === "ar";

  return (
    <div
      className="notif-prompt"
      role="dialog"
      aria-modal="false"
      aria-label={isAr ? "طلب الإشعارات" : "Notification request"}
    >
      <div className="notif-prompt-inner">
        {/* Astro avatar icon — inline SVG fallback so no extra dependency */}
        <div className="notif-prompt-avatar" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="var(--accent,#1e4fd9)" opacity="0.12" />
            <circle cx="32" cy="26" r="10" fill="var(--accent,#1e4fd9)" />
            <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="var(--accent,#1e4fd9)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="24" r="1.5" fill="#fff" />
            <circle cx="36" cy="24" r="1.5" fill="#fff" />
          </svg>
        </div>

        <div className="notif-prompt-body">
          <p className="notif-prompt-title">
            {isAr ? "هل تريد متابعة أخبار مدينتي AI؟" : "Stay in the loop with Madinaty AI"}
          </p>
          <p className="notif-prompt-desc">
            {isAr
              ? "احصل على إشعارات فورية بشأن ورش العمل، أخبار المدينة والخدمات الذكية."
              : "Get instant updates on workshops, city news & smart services."}
          </p>
        </div>

        <div className="notif-prompt-actions">
          <button
            type="button"
            className="notif-prompt-btn notif-prompt-btn-primary"
            onClick={handleEnable}
            disabled={loading}
          >
            {loading
              ? isAr
                ? "جارٍ التفعيل..."
                : "Enabling..."
              : isAr
              ? "تفعيل الإشعارات"
              : "Enable Notifications"}
          </button>
          <button
            type="button"
            className="notif-prompt-btn notif-prompt-btn-ghost"
            onClick={handleDismiss}
          >
            {isAr ? "لاحقاً" : "Not now"}
          </button>
        </div>
      </div>
    </div>
  );
}
