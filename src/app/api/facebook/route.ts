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
  text?: string;
  message?: string;
  content?: string;
  post_text?: string;
  title?: string;
  time?: string;
  timestamp?: string;
  created_time?: string;
  date?: string;
  author?: string;
  user_name?: string;
}

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST ?? "facebook-scraper3.p.rapidapi.com";
const PAGE_ID = process.env.FACEBOOK_PAGE_ID ?? "100064467919192";

/** 12-hour fetch cache = ~60 calls/month, safely under the 100 req/month tier. */
const CACHE_TTL_SECONDS = 43200;

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
  const raw =
    post.text ??
    post.message ??
    post.content ??
    post.post_text ??
    post.title ??
    "";
  return raw.slice(0, 140) + (raw.length > 140 ? "…" : "");
}

function extractTime(post: RapidPost, locale: string): string {
  const raw = post.time ?? post.timestamp ?? post.created_time ?? post.date;
  if (!raw) return locale === "ar" ? "منذ قليل" : "Just now";

  const date = new Date(raw);
  if (isNaN(date.getTime())) return raw; // return original string if unparseable

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffH / 24);

  if (locale === "ar") {
    if (diffD > 0) return `منذ ${diffD} ${diffD === 1 ? "يوم" : "أيام"}`;
    if (diffH > 0) return `منذ ${diffH} ${diffH === 1 ? "ساعة" : "ساعات"}`;
    return "منذ قليل";
  }
  if (diffD > 0) return `${diffD}d ago`;
  if (diffH > 0) return `${diffH}h ago`;
  return "Just now";
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

async function fetchRapidPosts(locale: string): Promise<FacebookPost[] | null> {
  if (!RAPIDAPI_KEY) return null;

  try {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const url =
      `https://${RAPIDAPI_HOST}/page/posts` +
      `?page_id=${encodeURIComponent(PAGE_ID)}` +
      `&start_date=${formatDate(tenDaysAgo)}` +
      `&end_date=${formatDate(today)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
        "Content-Type": "application/json",
      },
      next: { revalidate: CACHE_TTL_SECONDS },
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
 *   FACEBOOK_PAGE_ID=100064467919192
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";

  const realPosts = await fetchRapidPosts(locale);

  const posts = realPosts ?? (locale === "ar" ? MOCK_POSTS_AR : MOCK_POSTS_EN);

  return NextResponse.json({ posts }, { headers: { "Cache-Control": "no-store" } });
}
