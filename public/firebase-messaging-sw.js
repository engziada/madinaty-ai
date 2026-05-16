/**
 * Firebase Cloud Messaging Service Worker.
 *
 * This file lives in /public so it is served verbatim (no bundling).
 * It handles push notifications when the site is in the background
 * or the browser is closed.
 *
 * Note: We use the Firebase CDN imports directly because this file is
 * NOT processed by the Next.js build pipeline.
 */

importScripts("https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD6i0BWgpuloOv8YwhS7t4XAo4npkttYWs",
  authDomain: "madinatyai.firebaseapp.com",
  projectId: "madinatyai",
  storageBucket: "madinatyai.firebasestorage.app",
  messagingSenderId: "604538726222",
  appId: "1:604538726222:web:cf825b960377f22f17a01f",
  measurementId: "G-RRZPQNYY5Z",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title ?? "Madinaty AI";
  const notificationOptions = {
    body: payload.notification?.body ?? "",
    icon: "/logo.png",
    badge: "/logo-lite.svg",
    tag: payload.data?.tag ?? "madinaty-ai-default",
    data: payload.data ?? {},
    requireInteraction: false,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

/**
 * Handle notification clicks — open or focus the relevant page.
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url ?? "/ar";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});
