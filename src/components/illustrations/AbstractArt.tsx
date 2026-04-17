/**
 * Abstract inline-SVG illustrations for Madinaty.AI.
 *
 * Goals:
 *   • Minimal, geometric, smart-city + AI motifs.
 *   • No external assets → zero HTTP requests, works offline, no broken URLs.
 *   • Theme-aware via currentColor and design tokens.
 *   • Small enough to inline without impacting HTML payload noticeably.
 */

import type { SVGProps } from "react";

/* ------------------------------------------------------------------ *
 * HeroSkyline — soft sunrise + stylised city silhouette              *
 * ------------------------------------------------------------------ */

export function HeroSkylineArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abstract Madinaty skyline at sunrise"
      {...props}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff5e8" />
          <stop offset="55%" stopColor="#ffe2c7" />
          <stop offset="100%" stopColor="#ffd0a4" />
        </linearGradient>
        <linearGradient id="city" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b6eff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0bb8c7" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="sun" cx="0.75" cy="0.35" r="0.22">
          <stop offset="0%" stopColor="#ffdb6e" />
          <stop offset="70%" stopColor="#ff9970" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff8a74" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="600" fill="url(#sky)" />
      <rect width="1600" height="600" fill="url(#sun)" />

      {/* Soft horizon band */}
      <rect y="440" width="1600" height="20" fill="#ffffff" opacity="0.35" />

      {/* Back city layer — simplified towers */}
      <g fill="url(#city)" opacity="0.55">
        <rect x="40"   y="360" width="110" height="220" rx="6" />
        <rect x="170"  y="320" width="80"  height="260" rx="6" />
        <rect x="270"  y="380" width="140" height="200" rx="6" />
        <rect x="430"  y="300" width="60"  height="280" rx="4" />
        <rect x="510"  y="350" width="120" height="230" rx="6" />
        <rect x="650"  y="330" width="100" height="250" rx="6" />
        <rect x="770"  y="290" width="160" height="290" rx="8" />
        <rect x="950"  y="350" width="110" height="230" rx="6" />
        <rect x="1080" y="320" width="90"  height="260" rx="6" />
        <rect x="1190" y="370" width="140" height="210" rx="6" />
        <rect x="1350" y="310" width="70"  height="270" rx="4" />
        <rect x="1440" y="360" width="130" height="220" rx="6" />
      </g>

      {/* Front layer — accented towers */}
      <g fill="#2b6eff" opacity="0.85">
        <rect x="220"  y="420" width="44" height="160" rx="4" />
        <rect x="560"  y="400" width="54" height="180" rx="4" />
        <rect x="820"  y="380" width="64" height="200" rx="4" />
        <rect x="1110" y="400" width="50" height="180" rx="4" />
        <rect x="1320" y="420" width="44" height="160" rx="4" />
      </g>

      {/* Teal connective arcs — smart-city signal */}
      <g fill="none" stroke="#0bb8c7" strokeOpacity="0.45" strokeWidth="2">
        <path d="M 240 420 Q 600 260 850 380" />
        <path d="M 580 400 Q 850 280 1140 400" />
        <path d="M 840 380 Q 1100 240 1340 420" />
      </g>

      {/* Signal nodes */}
      <g fill="#ff8a74">
        <circle cx="240"  cy="420" r="5" />
        <circle cx="580"  cy="400" r="5" />
        <circle cx="840"  cy="380" r="6" />
        <circle cx="1140" cy="400" r="5" />
        <circle cx="1340" cy="420" r="5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * EventArt — friendly abstract "family workshop" geometry            *
 * Replaces the photo on the upcoming-event section.                  *
 * ------------------------------------------------------------------ */

export function EventAbstractArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abstract learning workshop illustration"
      {...props}
    >
      <defs>
        <linearGradient id="ev-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe7c7" />
          <stop offset="100%" stopColor="#ffc9b0" />
        </linearGradient>
        <linearGradient id="ev-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b6eff" />
          <stop offset="100%" stopColor="#0bb8c7" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#ev-bg)" />

      {/* Large soft circles — sunshine mood */}
      <circle cx="640" cy="140" r="110" fill="#ffdb6e" opacity="0.55" />
      <circle cx="120" cy="480" r="140" fill="#ff8a74" opacity="0.25" />

      {/* Laptop / tablet frame */}
      <g transform="translate(220 200)">
        <rect x="0" y="0" width="360" height="220" rx="14" fill="#ffffff" stroke="#1e4fd9" strokeWidth="3" />
        <rect x="16" y="18" width="328" height="170" rx="8" fill="url(#ev-screen)" />
        {/* On-screen chat bubbles */}
        <rect x="34"  y="44"  width="120" height="22" rx="11" fill="#ffffff" opacity="0.95" />
        <rect x="190" y="82"  width="140" height="22" rx="11" fill="#ffdb6e" />
        <rect x="34"  y="120" width="170" height="22" rx="11" fill="#ffffff" opacity="0.95" />
        {/* Stand */}
        <rect x="150" y="222" width="60" height="10" rx="3" fill="#1e4fd9" />
        <rect x="110" y="232" width="140" height="6" rx="3" fill="#1e4fd9" />
      </g>

      {/* Child avatar (abstract) */}
      <g transform="translate(120 310)">
        <circle cx="40" cy="40" r="34" fill="#ffdb6e" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="#ff8a74" strokeWidth="3" />
        <circle cx="30" cy="36" r="3" fill="#1e4fd9" />
        <circle cx="50" cy="36" r="3" fill="#1e4fd9" />
        <path d="M 28 50 Q 40 58 52 50" stroke="#1e4fd9" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Parent avatar */}
      <g transform="translate(600 340)">
        <circle cx="40" cy="40" r="40" fill="#ff8a74" />
        <circle cx="40" cy="40" r="40" fill="none" stroke="#1e4fd9" strokeWidth="3" />
        <circle cx="28" cy="36" r="3.5" fill="#ffffff" />
        <circle cx="52" cy="36" r="3.5" fill="#ffffff" />
        <path d="M 26 52 Q 40 62 54 52" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Connective dashed line between avatars */}
      <path
        d="M 180 355 Q 400 240 620 380"
        stroke="#1e4fd9"
        strokeWidth="2.5"
        strokeDasharray="6 8"
        fill="none"
        opacity="0.55"
      />

      {/* Floating code/AI glyphs */}
      <g fontFamily="ui-monospace, monospace" fontSize="24" fill="#1e4fd9" opacity="0.45">
        <text x="60"  y="140">{"<AI/>"}</text>
        <text x="660" y="520">{"{ }"}</text>
        <text x="380" y="540">★</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Section decorations — tiny abstract badges placed near headings    *
 * ------------------------------------------------------------------ */

export function CircuitDecoration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <circle cx="100" cy="100" r="60" opacity="0.25" />
      <circle cx="100" cy="100" r="42" opacity="0.45" />
      <circle cx="100" cy="100" r="24" opacity="0.7" />
      <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
      <path d="M 100 40 L 100 18 L 130 18" />
      <path d="M 100 160 L 100 182 L 70 182" />
      <path d="M 40 100 L 18 100 L 18 70" />
      <path d="M 160 100 L 182 100 L 182 130" />
      <circle cx="130" cy="18" r="3" fill="currentColor" stroke="none" />
      <circle cx="70" cy="182" r="3" fill="currentColor" stroke="none" />
      <circle cx="18" cy="70" r="3" fill="currentColor" stroke="none" />
      <circle cx="182" cy="130" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WaveDecoration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 80"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M 0 40 Q 50 10 100 40 T 200 40 T 300 40" opacity="0.6" />
      <path d="M 0 52 Q 50 22 100 52 T 200 52 T 300 52" opacity="0.3" />
    </svg>
  );
}
