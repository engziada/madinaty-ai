"use client";

import React, { useState, useEffect, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import type { LocaleCode } from "@/types/site";

interface FeedState {
  status: "loading" | "ready" | "error";
  content?: string;
}

const LOADING_TIMEOUT_MS = 6000;

export function RecentActivitiesFeed({ locale }: { locale: LocaleCode }) {
  const [state, setState] = useState<FeedState>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading" });

    const timeoutId = window.setTimeout(() => {
      if (!alive) return;
      setState((prev) => (prev.status === "loading" ? { status: "error" } : prev));
    }, LOADING_TIMEOUT_MS);

    async function fetchActivities() {
      try {
        const res = await fetch(`/api/activities?locale=${locale}`);
        if (!res.ok) {
          if (alive) setState({ status: "error" });
          return;
        }
        const data = await res.json();
        if (!alive) return;
        
        if (data && data.content) {
          setState({ status: "ready", content: data.content });
        } else {
          setState({ status: "error" });
        }
      } catch {
        if (alive) setState({ status: "error" });
      }
    }

    fetchActivities();

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

  if (state.status === "error" || !state.content) {
    const msg =
      locale === "ar"
        ? "لا توجد أنشطة مجتمعية حديثة."
        : "No recent community activities.";
    return (
      <div className="hero-activity hero-activity-empty" role="status" aria-live="polite">
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <div className="hero-feed-container">
      <ReactMarkdown
        components={{
          p: ({ node, children }) => <>{children}</>,
          strong: ({ node, children }) => <strong style={{ display: "block", fontWeight: 700, marginBottom: "0.2rem", textDecoration: "none" }}>{children}</strong>,
          a: ({ node, href, children }) => {
            let icon = "💬";
            let content = children;
            
            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length > 0 && typeof childrenArray[0] === "string") {
              const text = childrenArray[0] as string;
              const match = text.match(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation})\s*(.*)/u);
              if (match) {
                icon = match[1];
                childrenArray[0] = match[2];
                content = childrenArray;
              } else if (text.trim().length > 0) {
                // If it starts with text but not emoji, just use default icon
              }
            }

            return (
              <a href={href} className="hero-feed-item" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="hero-activity-icon" aria-hidden="true">{icon}</div>
                <div className="hero-activity-text">
                  {content}
                </div>
              </a>
            );
          }
        }}
      >
        {state.content}
      </ReactMarkdown>
    </div>
  );
}
