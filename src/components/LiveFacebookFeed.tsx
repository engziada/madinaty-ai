"use client";

import { useEffect, useState } from "react";
import type { LocaleCode } from "@/types/site";

interface FacebookPost {
  id: string;
  icon: string;
  text: string;
  meta: string;
}

export function LiveFacebookFeed({ locale }: { locale: LocaleCode }) {
  const [posts, setPosts] = useState<FacebookPost[] | null>(null);

  useEffect(() => {
    let alive = true;
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/facebook?locale=${locale}`);
        if (!res.ok) return;
        const data = await res.json();
        if (alive) setPosts(data.posts);
      } catch {
        // Fallback silently if fetch fails
      }
    }
    fetchPosts();
    return () => {
      alive = false;
    };
  }, [locale]);

  if (!posts) {
    return <div className="hero-activity">Loading live feed...</div>;
  }

  return (
    <>
      {posts.map((post) => (
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
