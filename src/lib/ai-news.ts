/**
 * AI News fetcher — pulls trendy AI/ML articles from Google News RSS.
 *
 * Why Google News RSS for AI:
 *   • Extremely fast, auto-curated, no API key required.
 *   • Supports language/region querying natively.
 */

export interface AiArticle {
  id: string;
  title: string;
  summary?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
  tag?: string;
  createdAt: string;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const FETCH_TIMEOUT_MS = 6_000;
const MAX_ITEMS = 25;

interface CacheEntry {
  items: AiArticle[];
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

function feedUrl(locale: "en" | "ar"): string {
  if (locale === "ar") {
    // Arabic: search for "الذكاء الاصطناعي"
    return "https://news.google.com/rss/search?q=%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1+%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A&hl=ar&gl=EG&ceid=EG:ar";
  }
  return "https://news.google.com/rss/search?q=Artificial+Intelligence+OR+Generative+AI&hl=en-US&gl=US&ceid=US:en";
}

/**
 * Strip CDATA wrappers and decode the handful of entities we actually
 * encounter in RSS text nodes.
 */
function decodeXmlText(input: string): string {
  let out = input.trim();
  // Unwrap <![CDATA[ ... ]]>
  const cdata = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(out);
  if (cdata) out = cdata[1];
  out = out
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&");
  // Strip any leftover HTML tags (Google News sometimes embeds <a> in description).
  out = out.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return out;
}

function extractTag(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = re.exec(block);
  return m ? decodeXmlText(m[1]) : null;
}

/**
 * Google News titles have the form "Headline text - Publisher Name".
 * Split on the last " - " to separate headline and source.
 */
function splitTitleAndSource(title: string): { text: string; source?: string } {
  const idx = title.lastIndexOf(" - ");
  if (idx <= 0 || idx >= title.length - 3) {
    return { text: title };
  }
  return {
    text: title.slice(0, idx).trim(),
    source: title.slice(idx + 3).trim()
  };
}

function parseRss(xml: string, locale: "en" | "ar"): AiArticle[] {
  const items: AiArticle[] = [];
  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = itemRe.exec(xml)) !== null && items.length < MAX_ITEMS) {
    const block = match[1];
    const rawTitle = extractTag(block, "title");
    if (!rawTitle) continue;
    const { text, source: titleSource } = splitTitleAndSource(rawTitle);
    const link = extractTag(block, "link") ?? undefined;
    const pubDate = extractTag(block, "pubDate");
    const sourceTag = extractTag(block, "source") ?? titleSource;
    const createdAt = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
    items.push({
      id: `ai-news-${i++}-${Buffer.from(text).toString("base64").slice(0, 16)}`,
      title: text,
      url: link,
      source: sourceTag,
      tag: locale === "ar" ? "ذكاء اصطناعي" : "AI News",
      createdAt
    });
  }
  return items;
}

async function fetchWithTimeout(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      // Some RSS endpoints are picky about UA.
      headers: { "User-Agent": "MadinatyAI-NewsBot/1.0 (+https://www.madinatyai.com)" },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error(`RSS fetch failed: ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch AI news for the given locale.
 */
export async function getAiNews(locale: "en" | "ar", limit = 1): Promise<AiArticle[]> {
  const now = Date.now();
  const cached = cache.get(locale);
  if (cached && cached.expiresAt > now) {
    return cached.items.slice(0, limit);
  }

  const xml = await fetchWithTimeout(feedUrl(locale));
  const items = parseRss(xml, locale);
  if (items.length === 0) {
    throw new Error("RSS returned zero AI items");
  }
  cache.set(locale, { items, expiresAt: now + TTL_MS });
  return items.slice(0, limit);
}
