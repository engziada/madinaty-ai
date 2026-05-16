/**
 * Lazy-initialized Firebase client for Web Push & Analytics.
 *
 * Everything here is browser-only. The module never initializes on the
 * server, so it is safe to import in shared components.
 */

import type { FirebaseApp } from "firebase/app";
import type { Messaging } from "firebase/messaging";

let messagingInstance: Messaging | null = null;
let appInstance: FirebaseApp | null = null;

function getConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

function mask(s: string | undefined) {
  if (!s) return "(missing)";
  return s.slice(0, 4) + "..." + s.slice(-4);
}

function validateConfig() {
  const c = getConfig();
  const missing: string[] = [];
  if (!c.apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!c.authDomain) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!c.projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (!c.messagingSenderId) missing.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (!c.appId) missing.push("NEXT_PUBLIC_FIREBASE_APP_ID");

  if (missing.length > 0) {
    console.error(
      "[Firebase] Missing environment variables:", missing.join(", "),
      "\\nMake sure .env.local is present and the dev server was restarted after adding them."
    );
    return false;
  }

  const vapid = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  console.log("[Firebase] Config keys present. VAPID:", mask(vapid), "Project:", c.projectId);
  return true;
}

async function importFirebase() {
  const [{ initializeApp }, { getMessaging, getToken, onMessage }] = await Promise.all([
    import("firebase/app"),
    import("firebase/messaging"),
  ]);
  return { initializeApp, getMessaging, getToken, onMessage };
}

/**
 * Initialise Firebase App + Messaging once.
 * Safe to call multiple times — returns the same instance.
 */
export async function initFirebase(): Promise<{ app: FirebaseApp; messaging: Messaging } | null> {
  if (typeof window === "undefined") return null;
  if (messagingInstance && appInstance) {
    return { app: appInstance, messaging: messagingInstance };
  }

  if (!validateConfig()) return null;

  const { initializeApp, getMessaging } = await importFirebase();
  const config = getConfig() as Required<ReturnType<typeof getConfig>>;

  appInstance = initializeApp(config);
  messagingInstance = getMessaging(appInstance);

  return { app: appInstance, messaging: messagingInstance };
}

/**
 * Request notification permission and return the FCM token.
 * Returns `null` if permission is denied or Firebase is unavailable.
 */
export async function requestFcmToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  // Graceful degradation: if the browser doesn't support notifications,
  // bail early without noisy errors.
  if (!("Notification" in window)) {
    console.warn("[FCM] This browser does not support notifications.");
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  // Push API is blocked in private/incognito mode on some browsers (e.g., Firefox).
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn(
      "[FCM] Push API is not available in this browser context. " +
        "Common causes: private/incognito window, or the browser does not support web push."
    );
    return null;
  }

  const instance = await initFirebase();
  if (!instance) {
    console.error("[FCM] Firebase could not initialise — check config above.");
    return null;
  }

  const { getToken, onMessage } = await importFirebase();

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.error("[FCM] NEXT_PUBLIC_FIREBASE_VAPID_KEY is missing. Add it to .env.local and restart the dev server.");
    return null;
  }

  try {
    // Explicitly register the messaging service worker.
    // Firebase's auto-registration sometimes silently fails, especially after
    // a stale/broken registration from a previous attempt.
    const existingReg = await navigator.serviceWorker.getRegistration();
    if (existingReg) {
      console.log("[FCM] Unregistering stale service worker:", existingReg.scope);
      await existingReg.unregister();
    }

    const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("[FCM] Service Worker registered:", swRegistration.scope);

    if (!swRegistration.pushManager) {
      console.warn("[FCM] Service Worker registration has no pushManager — browser may be in private mode.");
      return null;
    }

    const token = await getToken(instance.messaging, {
      vapidKey,
      serviceWorkerRegistration: swRegistration,
    });

    if (!token) {
      console.warn("[FCM] getToken returned empty after explicit SW registration.");
      return null;
    }

    console.log("[FCM] Token:", token);

    // Listen for foreground messages (while the page is open).
    onMessage(instance.messaging, (payload) => {
      // Browsers permission-gate foreground notifications, so we show
      // a polite in-app toast instead of relying on the OS banner.
      if (payload.notification) {
        showInAppToast(payload.notification.title ?? "Madinaty AI", payload.notification.body ?? "");
      }
    });

    return token;
  } catch (err: unknown) {
    const message = String((err as Error)?.message ?? err);
    const origin = typeof window !== "undefined" ? window.location.origin : "unknown";
    if (message.includes("missing required authentication credential") || message.includes("401")) {
      console.error(
        "[FCM] Authentication failed at origin:", origin,
        "\nThis is usually caused by one of the following:\n" +
        "  1. You are using '127.0.0.1:3000' instead of 'localhost:3000'.\n" +
        "     Fix: Open EXACTLY http://localhost:3000/ar (not 127.0.0.1)\n" +
        "  2. The Firebase Cloud Messaging API is NOT enabled.\n" +
        "     Fix: https://console.cloud.google.com/apis/library/fcm.googleapis.com → Enable\n" +
        "  3. Your API key has HTTP referrer / IP restrictions.\n" +
        "     Fix: https://console.cloud.google.com/apis/credentials → Click your API key →\n" +
        "          Remove restrictions (temporarily) or add http://localhost:3000\n" +
        "  4. A stale Service Worker is caching an old registration.\n" +
        "     Fix: DevTools → Application → Service Workers → Unregister 'firebase-messaging-sw.js'\n" +
        "          Then DevTools → Application → Storage → Clear site data → Reload"
      );
    } else {
      console.error("[FCM] getToken failed:", err);
    }
    return null;
  }
}

/**
 * Delete the current FCM token (unsubscribe from pushes).
 */
export async function deleteFcmToken(): Promise<void> {
  if (typeof window === "undefined" || !messagingInstance) return;
  const { deleteToken } = await import("firebase/messaging");
  await deleteToken(messagingInstance);
}

/* ------------------------------------------------------------------ */
// Simple ephemeral toast for foreground FCM messages

function showInAppToast(title: string, body: string) {
  if (typeof document === "undefined") return;

  const existing = document.getElementById("fcm-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "fcm-toast";
  toast.setAttribute(
    "style",
    "position:fixed;inset-inline-start:1rem;inset-block-end:1rem;" +
      "z-index:9999;max-width:320px;padding:1rem 1.25rem;" +
      "background:var(--card-bg,#fff);color:var(--text-main,#0b1426);" +
      "border:1px solid var(--border,#e2e8f0);border-radius:12px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,0.12);font-family:inherit;" +
      "animation:fadeSlideIn 0.35s ease;"
  );

  toast.innerHTML = `
    <div style="font-weight:700;margin-bottom:0.25rem;font-size:0.9375rem;">${escapeHtml(title)}</div>
    <div style="font-size:0.875rem;opacity:0.85;line-height:1.4;">${escapeHtml(body)}</div>
  `;

  document.body.appendChild(toast);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeSlideIn {
      from { opacity:0; transform:translateY(12px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => toast.remove(), 450);
  }, 6000);
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
