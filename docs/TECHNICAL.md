# Madinaty.AI — Technical Reference

> Last updated after the **Sunny Horizon** redesign + multi-feature upgrade
> (theming, marquee, AI tools, article widget, webhooks, AR-default routing).

---

## 1. Stack & Runtime

| Layer       | Choice                                      | Notes                                   |
|-------------|---------------------------------------------|-----------------------------------------|
| Framework   | Next.js **15.5** (App Router, Turbopack)    | React 19.2, strict TypeScript 5.9       |
| Language    | TypeScript (strict)                          | `tsc --noEmit` wired as `npm run typecheck` |
| Styling     | Pure CSS with design tokens in `globals.css` | ~3,180 lines, no CSS framework          |
| Fonts       | `next/font/google` — Exo 2, Orbitron, Cairo, Changa | LTR + RTL pairs                 |
| Maps        | React-Leaflet 5 + Leaflet 1.9               | Used only on `/map` panel               |
| LLM         | `@google/generative-ai` 0.24                 | Used in `/api/chat` (pre-existing)      |
| Persistence | JSON file store (`.data/*.json`)             | Swappable for Redis / SQLite — §6.3     |

Minimum Node: **20.x** (for native `crypto.randomUUID`, `fs/promises`).

---

## 2. Directory Map (post-upgrade)

```
madinaty-ai/
├── public/
│   ├── logo.png           # dark-theme logo (original, glow-friendly)
│   └── logo-lite.jpeg     # light-theme logo (copied from resources/)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root: lang="ar" dir="rtl" data-theme="light"
│   │   ├── page.tsx               # Redirects /  →  /ar
│   │   ├── globals.css            # Single stylesheet (tokens + components + dark overrides)
│   │   ├── ar/                    # Arabic routes (canonical)
│   │   ├── en/                    # English routes (canonical)  ← NEW
│   │   ├── vision-future/         # Legacy EN route (still reachable)
│   │   ├── coming-soon/           # Legacy EN route (still reachable)
│   │   └── api/
│   │       ├── chat/              # Pre-existing Gemini proxy
│   │       ├── news/route.ts              # GET   latest news list
│   │       ├── ai-article/route.ts        # GET   latest AI article
│   │       └── webhooks/
│   │           ├── news/route.ts          # POST  receive news
│   │           └── ai-article/route.ts    # POST  receive article
│   ├── components/
│   │   ├── LandingPage.tsx       # Main page composition (updated)
│   │   ├── NavBar.tsx            # Theme-aware logo + ThemeToggle + locale switch
│   │   ├── ThemeProvider.tsx     # NEW — light/dark context + pre-hydration script
│   │   ├── ThemeToggle.tsx       # NEW — animated sun/moon pill
│   │   ├── NewsMarquee.tsx       # NEW — top sticky marquee
│   │   ├── AiArticleWidget.tsx   # NEW — hero article card
│   │   ├── AiToolsSection.tsx    # NEW — filterable category tools
│   │   ├── ChatPanel.tsx         # Pre-existing
│   │   ├── MapPanel.tsx          # Pre-existing
│   │   ├── EnrollmentModal.tsx   # Pre-existing
│   │   └── …
│   ├── data/
│   │   ├── content.ts            # Site copy (EN + AR)
│   │   └── aiTools.ts            # NEW — 8 categories × ~5 tools (EN + AR)
│   ├── lib/
│   │   └── store.ts              # NEW — JSON-file-backed store
│   └── types/site.ts             # Extended with event.titleHighlight + safetyBadges
└── .data/                        # Runtime-created (gitignored) for webhook payloads
```

---

## 3. Theming System

### 3.1 Token architecture

`src/app/globals.css` defines **all design tokens** in `:root` (light, default) and re-declares the same set inside `[data-theme="dark"] { … }`. Every component consumes only `var(--token)` — **no hardcoded hex values** in components. Swapping theme toggles the attribute on `<html>`, which flips every downstream token atomically.

Core token families:

| Family       | Example vars                                              |
|--------------|-----------------------------------------------------------|
| Surfaces     | `--bg`, `--bg-alt`, `--surface`, `--surface-mid`, `--surface-hi` |
| Borders      | `--border`, `--border-soft`                               |
| Brand        | `--teal`, `--teal-bright`, `--blue`, `--blue-mid`         |
| Warm accents | `--coral`, `--coral-soft`, `--sun`, `--sun-soft`, `--mint`, `--lilac` |
| Text         | `--text`, `--text-soft`, `--text-muted`                   |
| Shadows      | `--shadow-card`, `--shadow-glow`, `--shadow-coral`        |
| Radii        | `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-full`        |

### 3.2 Light/Dark switching

`ThemeProvider` (`src/components/ThemeProvider.tsx`):

- **Default:** `light` (spec requirement).
- **Persistence:** `localStorage["madinaty.theme"]`.
- **No FOUC:** An inline `themeInitScript` runs before React hydrates. It reads the saved preference and sets `document.documentElement[data-theme]` + `style.colorScheme` before first paint.
- **API:**
  ```ts
  const { theme, setTheme, toggleTheme } = useTheme();
  ```

`ThemeToggle` is a pure UI component that calls `toggleTheme()`. It is placed in `NavBar`. Labels accept AR/EN strings from the caller.

### 3.3 Logo swap

`NavBar` picks the image by active theme:

```tsx
const logoSrc = theme === "light" ? "/logo-lite.jpeg" : "/logo.png";
```

CSS applies `mix-blend-mode: multiply` on the light logo to cleanly sit on any near-white surface, and a teal `drop-shadow` on the dark logo for the night vibe.

---

## 4. Routing & Localization

Default landing is **Arabic + Light**.

| URL              | Serves                      | Dir  | Lang |
|------------------|-----------------------------|------|------|
| `/`              | HTTP redirect → `/ar`        | –    | –    |
| `/ar`            | `LandingPage locale="ar"`    | rtl  | ar   |
| `/ar/vision-future`, `/ar/coming-soon` | Arabic sub-pages | rtl | ar |
| `/en`            | `LandingPage locale="en"` ← NEW | ltr | en |
| `/vision-future` | English (legacy, still live) | ltr  | en   |
| `/coming-soon`   | English (legacy, still live) | ltr  | en   |

Direction is controlled by wrapping the inner layout in `<div lang="…" dir="…">`. The root `<html>` is `lang="ar" dir="rtl"` so any unrouted fragment defaults correctly.

`NavBar` locale switch mapping:

```
locale === "ar"  →  localePath = "/en"
locale === "en"  →  localePath = "/ar"
```

---

## 5. New UI Components

### 5.1 `NewsMarquee`

- Mounted once in root `layout.tsx` (above all children).
- `usePathname()` auto-detects locale (`/ar…` → AR copy, otherwise EN).
- Fetches `GET /api/news?limit=20` on mount, then polls every **60 s**.
- List is duplicated in-DOM to achieve a seamless CSS `@keyframes marqueeScroll` loop.
- **RTL behaviour:** `[dir="rtl"] .marquee-track { animation-direction: reverse }`.
- Dismiss button clears the bar for the current session (no persistence by design).

### 5.2 `AiArticleWidget`

- Rendered inside the hero copy column under the CTA buttons.
- Fetches `GET /api/ai-article` on mount + every **120 s**.
- Uses `background-image` rather than `next/image` to avoid remote-hostname config churn.
- Renders a `<a target="_blank">` when `url` is present & not `#`, else a static card.

### 5.3 `AiToolsSection`

- 8 category groups (`General Assistants`, `Productivity`, `Writing`, `Design`, `Image Generation`, `Coding`, `Video & Voice`, `Research & Learning`).
- Tab-style filter ("All" + one chip per category). Each chip uses an accent color matching the group's top border stripe.
- Data lives in `src/data/aiTools.ts` and is fully bilingual (AR strings hand-translated).
- To add/remove tools: edit `categoriesEn` and the corresponding `arOverrides[id].tools`.

---

## 6. Data Layer

### 6.1 Types

```ts
// src/lib/store.ts
interface NewsItem   { id; text; url?; source?; createdAt; }
interface AiArticle  { id; title; summary?; url?; source?; imageUrl?; tag?; createdAt; }
```

### 6.2 JSON file store

`src/lib/store.ts` writes `.data/news.json` and `.data/ai-article.json`. On read:

1. Read file → parse → if non-empty array, return.
2. On parse failure or empty → return seeded defaults (3 news items + 1 article).

Writes are atomic at the single-process level (not multi-worker safe — see §6.3).

Max retained per list: **30** items (newest first). Callers `getNews(limit)` cap at 50.

### 6.3 Swapping to Redis / SQLite

The 4 API routes never import `fs` directly — only `getNews/pushNews/getLatestArticle/pushArticle`. To migrate:

- **Upstash Redis:** replace the 4 store functions with `@upstash/redis` calls; keep the signatures. ~30 min.
- **SQLite (`better-sqlite3`):** same story; create `news` + `ai_article` tables with `(id PK, payload JSON, created_at)`.

Choose Redis for serverless (Vercel/Netlify). Choose SQLite for single-node VPS. Current JSON store is only safe on a **single Node server process**.

---

## 7. Webhook API

Both webhooks require header **`x-webhook-secret: <WEBHOOK_SECRET>`**. The secret is read from `process.env.WEBHOOK_SECRET` and falls back to `dev-secret-change-me` if unset (dev convenience — never run production without setting it).

Set it in `.env.local`:

```dotenv
WEBHOOK_SECRET=<long-random-string>
```

### 7.1 `POST /api/webhooks/news`

Single item:

```json
{ "text": "string (required)", "url": "string?", "source": "string?" }
```

Batch:

```json
{ "items": [ { "text": "…", "url": "…", "source": "…" }, … ] }
```

Response `200`:

```json
{ "ok": true, "stored": [ { "id": "...", "text": "...", "createdAt": "..." } ] }
```

Errors: `401` invalid secret · `400` invalid JSON / missing text.

### 7.2 `POST /api/webhooks/ai-article`

```json
{
  "title":    "string (required)",
  "summary":  "string?",
  "url":      "string?",
  "source":   "string?",
  "imageUrl": "string?",
  "tag":      "string?"
}
```

Response `200`:

```json
{ "ok": true, "stored": { "id": "...", "title": "...", "createdAt": "..." } }
```

### 7.3 Public GETs (consumed by the frontend)

| Method | Path                        | Response                              |
|--------|-----------------------------|---------------------------------------|
| GET    | `/api/news?limit=20`        | `{ items: NewsItem[] }`               |
| GET    | `/api/ai-article`           | `{ article: AiArticle \| null }`      |

Both return `Cache-Control: no-store`, `runtime = "nodejs"`, `dynamic = "force-dynamic"`.

### 7.4 Local test (PowerShell)

```powershell
$secret = (Get-Content .env.local | Where-Object { $_ -match '^WEBHOOK_SECRET=' }) -replace '^WEBHOOK_SECRET=',''

curl.exe -X POST http://localhost:3000/api/webhooks/news `
  -H "content-type: application/json" `
  -H "x-webhook-secret: $secret" `
  -d '{"text":"Smart shuttle launched in B14","source":"Madinaty Desk"}'

curl.exe http://localhost:3000/api/news
```

---

## 8. Security

- **Webhook auth:** shared-secret header. Reject any request without a matching `x-webhook-secret`.
- **Payload validation:** every field is type-checked before persistence; batch items require a non-empty `text`; articles require `title`.
- **Rate limiting:** not yet implemented. Place the site behind Cloudflare/Vercel edge rules OR add `@upstash/ratelimit` when swapping to Redis.
- **Secrets in code:** none. All secrets flow through `.env.local` and `process.env`.
- **XSS:** marquee + article strings render through React text nodes (no `dangerouslySetInnerHTML` on user input). The **only** `dangerouslySetInnerHTML` in the tree is the static theme-init script.
- **CORS:** webhook routes do not set CORS headers. Calls are expected server-to-server. If you need browser POSTs, add an `OPTIONS` handler + `Access-Control-Allow-*`.

---

## 9. Performance Notes

- `ThemeProvider` runs the init script **before hydration** to prevent FOUC.
- Marquee and article widget both use client-side polling (60 s / 120 s). Cheap on the server because JSON store responds in <1 ms.
- `AiToolsSection` is fully client-rendered; filter state is in-memory and causes a cheap re-render (~40 DOM nodes).
- Fonts: 4 Google families loaded via `next/font` (self-hosted CSS, no layout shift).
- Images: hero uses CSS gradients (no raster); AI article image uses `background-image` (no `next/image` remote-host config required).

---

## 10. Known Limitations

1. **JSON store is single-process.** Concurrent writes from multiple Node workers can race and drop an item. For production scale, migrate to Redis (§6.3).
2. **Serverless filesystems reset.** On Vercel/Netlify, `.data/*.json` is ephemeral — every cold start wipes pushed items. Migrate before deploying there.
3. **No rate limiting on webhooks.** Anyone with the secret can flood the marquee.
4. **No pagination on `/api/news`.** Caps at 50 items. Fine for the use case; upgrade if the feed grows.
5. **No admin UI.** News/articles can only be managed by POSTing to the webhook.
6. **Logo-lite is a JPEG on white.** It's masked with `mix-blend-mode: multiply` on light surfaces, but will look odd over any non-white background. Supplying an **SVG or PNG-with-transparency** version would be ideal.

---

## 11. Scripts

```bash
npm run dev         # next dev --turbopack
npm run build       # next build
npm run start       # next start
npm run typecheck   # tsc --noEmit
```

CI recommendation: run `typecheck` + `build` on every PR. No test suite exists yet — if you want one, Playwright + Vitest would fit the stack.

---

## 12. Change Log (this upgrade)

- **Theme:** rewrote tokens to Sunny Horizon; added complete `[data-theme="dark"]` Aurora Night overrides (~450 lines).
- **Promo card:** redesigned as "Safe AI for Kids" with confetti background, safety badges, and parent-dashboard tile.
- **Routing:** `/` now redirects to `/ar` (Arabic is the default landing language). English canonicalised at `/en`.
- **Components added:** `ThemeProvider`, `ThemeToggle`, `NewsMarquee`, `AiArticleWidget`, `AiToolsSection`.
- **APIs added:** `POST /api/webhooks/news`, `POST /api/webhooks/ai-article`, `GET /api/news`, `GET /api/ai-article`.
- **Nav:** logo swaps by theme, added AI Tools anchor, added ThemeToggle, locale-switch now points to `/en` from AR.
- **Types:** `SiteContent.event` gained optional `titleHighlight` + `safetyBadges`.
- **Gitignore:** added `.data/` for runtime state.
