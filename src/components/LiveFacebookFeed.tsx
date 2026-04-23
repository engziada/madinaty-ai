"use client";

import { useEffect, useState } from "react";
import type { LocaleCode } from "@/types/site";

interface FacebookPost {
  id: string;
  icon: string;
  text: string;
  meta: string;
}

type FeedState =
  | { status: "loading" }
  | { status: "ready"; posts: FacebookPost[] }
  | { status: "empty" }
  | { status: "error" };

const LOADING_TIMEOUT_MS = 6000;

export function LiveFacebookFeed({ locale }: { locale: LocaleCode }) {
  const [state, setState] = useState<FeedState>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading" });

    const timeoutId = window.setTimeout(() => {
      if (!alive) return;
      // Hard cap: never leave a spinner up forever.
      setState((prev) => (prev.status === "loading" ? { status: "empty" } : prev));
    }, LOADING_TIMEOUT_MS);

    async function fetchPosts() {
      try {
        const res = await fetch(`/api/facebook?locale=${locale}`);
        if (!res.ok) {
          if (alive) setState({ status: "error" });
          return;
        }
        const data = await res.json();
        if (!alive) return;
        const posts = Array.isArray(data?.posts) ? (data.posts as FacebookPost[]) : [];
        if (posts.length === 0) {
          setState({ status: "empty" });
        } else {
          setState({ status: "ready", posts });
        }
      } catch {
        if (alive) setState({ status: "error" });
      }
    }

    fetchPosts();

    return () => {
      alive = false;
      window.clearTimeout(timeoutId);
    };
  }, [locale]);

  if (state.status === "loading") {
    return (
      <div className="hero-activity hero-activity-skeleton" aria-hidden="true">
        <span className="skeleton-line" />
        <span className="skeleton-line short" />
      </div>
    );
  }

  if (state.status === "empty" || state.status === "error") {
    const msg =
      locale === "ar"
        ? "لا توجد منشورات مجتمعية حديثة."
        : "No recent community posts.";
    return (
      <div className="hero-activity hero-activity-empty" role="status" aria-live="polite">
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <>
      {state.posts.map((post) => (
        <div className="hero-activity" key={post.id}>
          <div className="hero-activity-icon" aria-hidden="true">{post.icon}</div>
          <div className="hero-activity-text">
            {post.text}
            <small>{post.meta}</small>
          </div>
        </div>
      ))}
    </>
  );
}
