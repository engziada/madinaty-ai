---
name: component-patterns
description: File structure, React conventions, accessibility rules, and reusable UI patterns for Madinaty AI components.
---

# Use when

Use this skill when creating new components, refactoring existing ones, or reviewing code structure and accessibility.

# File Structure

```
src/components/
  MyFeature/
    index.tsx        ← named export, main component
    MyFeature.css    ← co-located scoped styles
```

Single-file components go directly in `src/components/MyFeature.tsx`.

# File Conventions

```tsx
"use client"; // required for state, effects, or event handlers

import "./MyFeature.css";

interface MyFeatureProps {
  locale: LocaleCode;
  content: SiteContent;
}

export function MyFeature({ locale, content }: MyFeatureProps) {
  const isAr = locale === "ar";
  // ...
}
```

- **Named exports only** — no default exports
- Server components: no `"use client"`, fetch data directly
- Interactive components: always `"use client"`

# Bilingual Props Pattern

```tsx
interface Props {
  locale: LocaleCode;   // "ar" | "en"
  content: SiteContent; // bilingual content object
}

const isAr = locale === "ar";
const label = isAr ? "النص بالعربي" : "English text";
```

# Page Section Pattern

```tsx
<section className="section" id="my-section">
  <div className="container">
    <p className="overline">{isAr ? "التسمية" : "Label"}</p>
    <h2>{isAr ? "العنوان" : "Heading"}</h2>
    {/* content */}
  </div>
</section>
```

# Cards

```tsx
// Glass card
<div className="glass"> ... </div>

// Bento tile
<div className="tile tile-lg"> ... </div>
<div className="tile tile-half"> ... </div>
```

# Buttons

```tsx
<button type="button" className="btn btn-primary">Get Started</button>
<button type="button" className="btn btn-outline">Learn More</button>
<button type="button" className="btn btn-ghost">Cancel</button>
```

Always set `type="button"` on non-submit buttons.

# Forms

```tsx
<form onSubmit={handleSubmit}>
  {/* fields */}
  {isLoading && <AstroAvatar mood="thinking" size="md" />}
  {success && <AstroAvatar mood="celebrating" size="xl" />}
  {error && <AstroAvatar mood="error" size="md" />}
</form>
```

# Modals

```tsx
<div
  className="modal-overlay"
  onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
  role="dialog"
  aria-modal="true"
  aria-label={isAr ? "العنوان" : "Title"}
>
  <div className="modal" ref={modalRef}>
    {/* header / body / footer */}
  </div>
</div>
```

- Close on `Escape`: `document.addEventListener("keydown", ...)`
- Lock scroll: `document.body.style.overflow = "hidden"` on open, restore on close
- Trap focus inside the modal

# Accessibility Rules

- `aria-label` on all icon-only interactive elements
- Semantic HTML always — `<button>` not `<div onClick>`
- `role="dialog"` + `aria-modal="true"` on overlays
- `role="img"` + `aria-label` on SVG illustrations
- All interactive elements must be keyboard-reachable
- Respect `data-reduce-motion` and `prefers-reduced-motion`

# Animation

```css
/* Standard card hover */
transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

/* Pause when tab hidden or reduced-motion requested */
[data-reduce-motion] .animated { animation: none !important; }
[data-tab-hidden] .animated { animation-play-state: paused; }
```

# Icons

```tsx
import { ChevronRight, X, Search } from "lucide-react";
<ChevronRight size={20} strokeWidth={2} />
```

lucide-react only. No emoji icons in UI.

# Loading States

```tsx
// Non-AI skeleton
<div className="skeleton" style={{ width: "100%", height: "1.5rem" }} />

// AI loading — always use Astro
<AstroAvatar mood="thinking" size="lg" />
```

# Global Event Bus

```tsx
// Fire
window.dispatchEvent(new CustomEvent("open-madinaty-chat"));

// Listen
useEffect(() => {
  const handler = () => setOpen(true);
  window.addEventListener("open-madinaty-chat", handler);
  return () => window.removeEventListener("open-madinaty-chat", handler);
}, []);
```

# CSS Naming

BEM-ish: `block-name__element--modifier`

```css
.chat-fab {}
.chat-fab--wiggle {}
.chat-fab-modal {}
.chat-fab-modal-header {}
```

Always prefix with the component name.

# Key Components

| Component | Import | Purpose |
|---|---|---|
| `AstroAvatar` | `@/components/AstroAvatar` | AI mascot |
| `useTheme` | `@/components/ThemeProvider` | Light/dark context |
| `BrandLogo` | `@/components/BrandLogo` | Logotype (always LTR) |
| `PageShell` | `@/components/PageShell` | Page wrapper |
| `ChatFab` | `@/components/ChatFab` | Floating AI chat |
| `ChatPanel` | `@/components/ChatPanel` | Chat messages + input |
| `EnrollmentModal` | `@/components/EnrollmentModal` | Course enrollment form |
