/**
 * Tiny JSON-file-backed store for webhook payloads.
 *
 * Why: Next.js on managed hosts has no persistent filesystem, but this project
 * targets Node.js runtime on a conventional server. Using a JSON file avoids
 * a native dependency (like better-sqlite3) that often breaks Windows builds.
 * Swap this module for Redis / SQLite later without touching API routes.
 */

import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");

export interface NewsItem {
  id: string;
  text: string;
  url?: string;
  source?: string;
  createdAt: string;
}

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

type StoreShape = "news" | "ai-article";

interface Payloads {
  news: NewsItem[];
  "ai-article": AiArticle[];
}

const DEFAULTS: Payloads = {
  news: [
    {
      id: "seed-1",
      text: "Madinaty.AI launches free 'Safe AI for Kids' workshop — 42 sponsored seats.",
      source: "Madinaty Community",
      createdAt: new Date().toISOString()
    },
    {
      id: "seed-2",
      text: "Smart shuttle network now covers all 23 districts with 2-minute average wait.",
      source: "Mobility Hub",
      createdAt: new Date().toISOString()
    },
    {
      id: "seed-3",
      text: "New solar research campus hits 98% grid self-sufficiency this quarter.",
      source: "Energy Desk",
      createdAt: new Date().toISOString()
    }
  ],
  "ai-article": [
    {
      id: "seed-article",
      title: "What every parent should know before letting kids use AI",
      summary:
        "A 3-minute primer on safety, prompt hygiene, and how to spot hallucinations — written for Madinaty families.",
      source: "Madinaty.AI Blog",
      tag: "Parenting",
      url: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80",
      createdAt: new Date().toISOString()
    }
  ]
};

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(kind: StoreShape): string {
  return path.join(DATA_DIR, `${kind}.json`);
}

async function readList<K extends StoreShape>(kind: K): Promise<Payloads[K]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(filePath(kind), "utf8");
    const parsed = JSON.parse(raw) as Payloads[K];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // file missing or unparsable — fall through to defaults
  }
  return DEFAULTS[kind] as Payloads[K];
}

async function writeList<K extends StoreShape>(kind: K, items: Payloads[K]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath(kind), JSON.stringify(items, null, 2), "utf8");
}

const MAX_ITEMS = 30;

export async function getNews(limit = 20): Promise<NewsItem[]> {
  const list = await readList("news");
  return list.slice(0, limit);
}

export async function pushNews(item: Omit<NewsItem, "id" | "createdAt"> & Partial<Pick<NewsItem, "id" | "createdAt">>): Promise<NewsItem> {
  const list = await readList("news");
  const record: NewsItem = {
    id: item.id ?? crypto.randomUUID(),
    text: item.text,
    url: item.url,
    source: item.source,
    createdAt: item.createdAt ?? new Date().toISOString()
  };
  const next = [record, ...list].slice(0, MAX_ITEMS);
  await writeList("news", next);
  return record;
}

export async function getLatestArticle(): Promise<AiArticle | null> {
  const list = await readList("ai-article");
  return list[0] ?? null;
}

export async function pushArticle(item: Omit<AiArticle, "id" | "createdAt"> & Partial<Pick<AiArticle, "id" | "createdAt">>): Promise<AiArticle> {
  const list = await readList("ai-article");
  const record: AiArticle = {
    id: item.id ?? crypto.randomUUID(),
    title: item.title,
    summary: item.summary,
    url: item.url,
    source: item.source,
    imageUrl: item.imageUrl,
    tag: item.tag,
    createdAt: item.createdAt ?? new Date().toISOString()
  };
  const next = [record, ...list].slice(0, MAX_ITEMS);
  await writeList("ai-article", next);
  return record;
}

/**
 * Shared secret used by incoming webhooks. Set WEBHOOK_SECRET in .env.local.
 * Falls back to a dev-only value so local testing works out of the box.
 */
export function expectedWebhookSecret(): string {
  return process.env.WEBHOOK_SECRET ?? "dev-secret-change-me";
}
