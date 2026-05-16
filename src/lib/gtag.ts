/**
 * Type-safe Google Analytics 4 event helper.
 *
 * Why not use firebase/analytics directly? GA4 via gtag.js gives us
 * custom dimensions (locale, theme) and deeper funnel tracking out
 * of the box, while Firebase Analytics is more mobile-centric.
 *
 * This wrapper is safe to call anywhere (client-only). On the server
 * or before gtag loads, the calls are silently dropped.
 */

type GtagEvent =
  | "join_modal_opened"
  | "join_form_submitted"
  | "join_form_error"
  | "chat_started"
  | "chat_message_sent"
  | "theme_toggled"
  | "notification_prompt_shown"
  | "notification_granted"
  | "notification_denied"
  | "notification_dismissed"
  | "map_explored"
  | "gallery_image_viewed"
  | "waitlist_subscribed";

interface EventParams {
  locale?: string;
  theme?: "light" | "dark";
  platform?: string;
  os?: string;
  browser?: string;
  error_count?: number;
  role?: string;
  city?: string;
  [key: string]: string | number | undefined;
}

export function gaEvent(eventName: GtagEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as Record<string, unknown>).gtag as
    | ((command: string, action: string, config?: Record<string, unknown>) => void)
    | undefined;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

/**
 * Set persistent user properties (e.g. locale) so every subsequent
 * event carries the dimension automatically.
 */
export function gaSetUserProperties(props: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as Record<string, unknown>).gtag as
    | ((command: string, action: string, config?: Record<string, unknown>) => void)
    | undefined;
  if (typeof gtag === "function") {
    gtag("set", "user_properties", props);
  }
}
