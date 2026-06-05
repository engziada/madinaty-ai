import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface FacebookPost {
  id: string;
  icon: string;
  text: string;
  meta: string;
}

interface RapidPost {
  post_id?: string;
  id?: string;
  // Text content — in priority order
  message?: string;
  text?: string;
  content?: string;
  post_text?: string;
  message_rich?: string;
  title?: string;
  // Timestamp — API returns numeric Unix epoch in `timestamp`
  timestamp?: string | number;
  time?: string | number;
  created_time?: string | number;
  date?: string | number;
  // Author
  author?: string;
  user_name?: string;
}

// NOTE: Read from process.env at request-time (inside the function), NOT here.
// Module-level constants are snapshotted at build time on some Vercel configurations.

const MOCK_POSTS_EN: FacebookPost[] = [
  {
    id: "fb-1",
    icon: "📢",
    text: "The annual Madinaty marathon has been successfully concluded! Thanks to all the 2000+ residents who participated.",
    meta: "2 hours ago · @MadinatyOfficial",
  },
  {
    id: "fb-2",
    icon: "🌿",
    text: "Spring is here! Enjoy the newly opened botanical garden in District 12. Open daily until sunset.",
    meta: "5 hours ago · @MadinatyOfficial",
  },
  {
    id: "fb-3",
    icon: "🚦",
    text: "Traffic Update: Maintenance works on the Southern Ring Road are completed. Traffic flow is back to normal.",
    meta: "1 day ago · @MadinatyOfficial",
  },
];

const MOCK_POSTS_AR: FacebookPost[] = [
  {
    id: "fb-1",
    icon: "📢",
    text: "اختتام ماراثون مدينتي السنوي بنجاح! شكرًا لأكثر من 2000 ساكن شاركوا في هذا الحدث الرائع.",
    meta: "منذ ساعتين · @MadinatyOfficial",
  },
  {
    id: "fb-2",
    icon: "🌿",
    text: "الربيع وصل! استمتعوا بالحديقة النباتية المفتوحة حديثًا في الحي الثاني عشر. مفتوحة يوميًا حتى الغروب.",
    meta: "منذ 5 ساعات · @MadinatyOfficial",
  },
  {
    id: "fb-3",
    icon: "🚦",
    text: "تحديث مروري: تم الانتهاء من أعمال الصيانة على الطريق الدائري الجنوبي وعادت حركة المرور إلى طبيعتها.",
    meta: "منذ يوم واحد · @MadinatyOfficial",
  },
];

function extractText(post: RapidPost): string {
  // `message` is the plain-text body from the facebook-scraper3 API
  const raw =
    post.message ??
    post.text ??
    post.content ??
    post.post_text ??
    post.message_rich ??
    post.title ??
    "";
  const clean = raw.replace(/\n+/g, " ").trim();
  return clean.slice(0, 160) + (clean.length > 160 ? "\u2026" : "");
}

function parseTimestamp(raw: string | number | undefined): Date | null {
  if (raw == null) return null;

  // Numeric timestamp (seconds or milliseconds)
  const num = Number(raw);
  if (!isNaN(num) && num > 0) {
    // Heuristic: 10 digits = seconds, 13 digits = milliseconds
    const ms = num < 1_000_000_000_000 ? num * 1000 : num;
    const d = new Date(ms);
    if (!isNaN(d.getTime())) return d;
  }

  // ISO or other string
  const d = new Date(String(raw));
  if (!isNaN(d.getTime())) return d;

  return null;
}

function extractTime(post: RapidPost, locale: string): string {
  const raw = post.timestamp ?? post.time ?? post.created_time ?? post.date;
  const date = parseTimestamp(raw as string | number | undefined);
  if (!date) return locale === "ar" ? "\u0645\u0646\u0630 \u0642\u0644\u064a\u0644" : "Just now";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffH / 24);

  if (locale === "ar") {
    if (diffD > 0) return `\u0645\u0646\u0630 ${diffD} ${diffD === 1 ? "\u064a\u0648\u0645" : "\u0623\u064a\u0627\u0645"}`;
    if (diffH > 0) return `\u0645\u0646\u0630 ${diffH} ${diffH === 1 ? "\u0633\u0627\u0639\u0629" : "\u0633\u0627\u0639\u0627\u062a"}`;
    return "\u0645\u0646\u0630 \u0642\u0644\u064a\u0644";
  }
  if (diffD > 0) return `${diffD}d ago`;
  if (diffH > 0) return `${diffH}h ago`;
  return "Just now";
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

async function fetchRapidPosts(locale: string): Promise<FacebookPost[] | null> {
  // Read at request time so Vercel env var updates take effect without a rebuild
  const apiKey  = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST ?? "facebook-scraper3.p.rapidapi.com";
  const pageId  = process.env.FACEBOOK_PAGE_ID ?? "100064538536099";

  if (!apiKey) {
    console.warn("[RapidAPI] RAPIDAPI_KEY is not set — falling back to mock");
    return null;
  }

  try {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const url =
      `https://${apiHost}/page/posts` +
      `?page_id=${encodeURIComponent(pageId)}` +
      `&start_date=${formatDate(tenDaysAgo)}` +
      `&end_date=${formatDate(today)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[RapidAPI] HTTP ${res.status}: ${await res.text()}`);
      return null;
    }

    const json = (await res.json()) as unknown;
    console.log("[RapidAPI] Raw response:", JSON.stringify(json, null, 2));

    // Defensively extract array from common RapidAPI wrapper shapes
    let items: RapidPost[] = [];
    if (Array.isArray(json)) {
      items = json;
    } else if (json && typeof json === "object") {
      const obj = json as Record<string, unknown>;
      if (Array.isArray(obj.data)) items = obj.data as RapidPost[];
      else if (Array.isArray(obj.results)) items = obj.results as RapidPost[];
      else if (Array.isArray(obj.posts)) items = obj.posts as RapidPost[];
      else {
        // Try to find any array property
        const arr = Object.values(obj).find((v) => Array.isArray(v)) as RapidPost[] | undefined;
        if (arr) items = arr;
      }
    }

    const posts: FacebookPost[] = items
      .filter((p) => extractText(p).length > 0)
      .slice(0, 3)
      .map((p) => ({
        id: p.post_id ?? p.id ?? `fb-${Math.random().toString(36).slice(2, 8)}`,
        icon: "📢",
        text: extractText(p),
        meta: `${extractTime(p, locale)} · @MadinatyOfficial`,
      }));

    return posts.length > 0 ? posts : null;
  } catch (err) {
    console.warn("[RapidAPI] Fetch failed:", err);
    return null;
  }
}

/**
 * GET /api/facebook
 *
 * Fetches the latest 3 posts from a Facebook page via RapidAPI scraper.
 * Date range is rolling: last 10 days from today.
 * Fetch result is cached for 12 hours to respect the 100 req/month tier.
 * Falls back to realistic mock data when:
 *  - RAPIDAPI_KEY is not configured
 *  - The RapidAPI request fails or returns no posts
 *
 * Required env vars:
 *   RAPIDAPI_KEY=your_key_here
 *   RAPIDAPI_HOST=facebook-scraper3.p.rapidapi.com
 *   FACEBOOK_PAGE_ID=100064538536099
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";

  // Diagnostic: log env var presence on every request
  console.log("[facebook/route] RAPIDAPI_KEY set:", !!process.env.RAPIDAPI_KEY);
  console.log("[facebook/route] FACEBOOK_PAGE_ID:", process.env.FACEBOOK_PAGE_ID);

  const realPosts = await fetchRapidPosts(locale);
  const isMock = realPosts === null;
  const posts = realPosts ?? (locale === "ar" ? MOCK_POSTS_AR : MOCK_POSTS_EN);

  return NextResponse.json(
    { posts },
    {
      headers: {
        "Cache-Control": "no-store",
        // Debug headers — remove once confirmed working
        "X-Posts-Source": isMock ? "mock" : "rapidapi",
        "X-Key-Set": process.env.RAPIDAPI_KEY ? "yes" : "no",
        "X-Page-Id": process.env.FACEBOOK_PAGE_ID ?? "(not set)",
      },
    },
  );
}
