"use client";

import { useCallback, useEffect, useState } from "react";
import { requestFcmToken, deleteFcmToken } from "@/lib/firebase";
import { gaEvent } from "@/lib/gtag";

type PermissionState = "default" | "granted" | "denied" | "unsupported";

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "unknown";
  let os = "unknown";

  if (/Edg\//i.test(ua)) browser = "edge";
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "opera";
  else if (/Chrome/i.test(ua) && /Safari/i.test(ua)) browser = "chrome";
  else if (/Safari/i.test(ua)) browser = "safari";
  else if (/Firefox/i.test(ua)) browser = "firefox";

  if (/Windows NT/i.test(ua)) os = "windows";
  else if (/Mac OS X/i.test(ua)) os = "macos";
  else if (/Android/i.test(ua)) os = "android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "ios";
  else if (/Linux/i.test(ua)) os = "linux";

  const width = window.innerWidth;
  let screen_size = "sm";
  if (width >= 1280) screen_size = "xl";
  else if (width >= 1024) screen_size = "lg";
  else if (width >= 768) screen_size = "md";

  const platform = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "mobile" : "desktop";

  return { browser, os, screen_size, platform, user_agent: ua, referrer: document.referrer || "direct" };
}

function getNotificationPermission(): PermissionState {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission as PermissionState;
}

export function usePushNotifications(locale: string) {
  const [status, setStatus] = useState<PermissionState>("default");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(getNotificationPermission());
  }, []);

  const subscribe = useCallback(async () => {
    setLoading(true);
    try {
      const fcmToken = await requestFcmToken();
      const permission = getNotificationPermission();
      setStatus(permission);

      if (fcmToken) {
        setToken(fcmToken);

        const info = getBrowserInfo();
        await fetch("/api/push-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: fcmToken,
            locale,
            ...info,
          }),
        });

        gaEvent("notification_granted", {
          locale,
          platform: info.platform,
          os: info.os,
          browser: info.browser,
        });
      } else if (permission === "denied") {
        gaEvent("notification_denied", { locale });
      }
    } catch (err) {
      console.error("[usePushNotifications] subscribe error:", err);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  const unsubscribe = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      await deleteFcmToken();
      await fetch("/api/push-subscribe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setToken(null);
      setStatus("default");
    } catch (err) {
      console.error("[usePushNotifications] unsubscribe error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { status, token, loading, subscribe, unsubscribe };
}
