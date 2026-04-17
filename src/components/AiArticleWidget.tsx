"use client";

import { useEffect, useState } from "react";
import type { LocaleCode } from "@/types/site";

interface Article {
  id: string;
  title: string;
  summary?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
  tag?: string;
  createdAt: string;
}

interface Props {
  locale: LocaleCode;
}

const STALE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Hero AI-article card. Surfaces whatever the /api/webhooks/ai-article
 * endpoint last stored.
 *
 * Extras:
 *   • Hidden entirely if the stored article is older than 7 days, so a
 *     forgotten webhook never leaves stale content lingering.
 *   • Native Web Share API button (falls back to copy-link).
 *   • `<bdi>` around title/summary so mixed-script strings render
 *     correctly in either locale direction.
 */
export function AiArticleWidget({ locale }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/ai-article", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { article: Article | null };
        if (alive) setArticle(data.article);
      } catch {
        /* ignore */
      }
    }
    load();
    const id = window.setInterval(load, 120_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  if (!article) return null;

  // Auto-hide stale articles so the hero never shows content older than a week.
  const createdAtMs = Date.parse(article.createdAt);
  if (!Number.isNaN(createdAtMs) && Date.now() - createdAtMs > STALE_MS) {
    return null;
  }

  const readLabel = locale === "ar" ? "اقرأ الآن" : "Read now";
  const overline = locale === "ar" ? "مقال اليوم · ذكاء اصطناعي" : "Today · AI Pick";
  const shareLabel = locale === "ar" ? "مشاركة" : "Share";
  const copiedLabel = locale === "ar" ? "تم النسخ ✓" : "Copied ✓";

  async function handleShare(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!article) return;
    const shareData = {
      title: article.title,
      text: article.summary ?? article.title,
      url: article.url && article.url !== "#" ? article.url : window.location.href
    };
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share(shareData);
        return;
      }
    } catch {
      /* user cancelled or share failed — fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* ignore */
    }
  }

  const hasUrl = Boolean(article.url && article.url !== "#");

  const media = (
    <div className="ai-article-media" aria-hidden="true">
      {article.imageUrl ? (
        <span
          className="ai-article-img"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        />
      ) : (
        <span className="ai-article-img ai-article-img-placeholder">📰</span>
      )}
      {article.tag && <span className="ai-article-tag">{article.tag}</span>}
    </div>
  );

  const body = (
    <div className="ai-article-body">
      <span className="ai-article-overline">{overline}</span>
      <h3 className="ai-article-title">
        <bdi>{article.title}</bdi>
      </h3>
      {article.summary && (
        <p className="ai-article-summary">
          <bdi>{article.summary}</bdi>
        </p>
      )}
      <span className="ai-article-cta">
        {article.source && <em><bdi>{article.source}</bdi></em>}
        {hasUrl && (
          <span className="ai-article-cta-link">
            {readLabel} <span aria-hidden="true">→</span>
          </span>
        )}
      </span>
    </div>
  );

  const shareBtn = (
    <button
      type="button"
      className="ai-article-share"
      onClick={handleShare}
      aria-label={shareLabel}
      title={shareLabel}
    >
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
      <span className="ai-article-share-label">{copied ? copiedLabel : shareLabel}</span>
    </button>
  );

  if (hasUrl) {
    return (
      <div className="ai-article-wrap">
        <a
          className="ai-article-card"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {media}
          {body}
        </a>
        {shareBtn}
      </div>
    );
  }

  return (
    <div className="ai-article-wrap">
      <div className="ai-article-card ai-article-card-static">
        {media}
        {body}
      </div>
      {shareBtn}
    </div>
  );
}
