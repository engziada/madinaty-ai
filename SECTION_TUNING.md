# Landing Page — Section-by-Section Fine-Tuning Tracker

Workspace: `madinaty-ai/`
Started: 2026-04-18

Legend:
- **Need action**: yes / no
- **Type of action**: content / styling / layout / behavior / a11y / i18n / performance / refactor / none
- **Progress**: 0–100%
- **Committed**: yes / no

---

## 1. News Marquee Bar
Files: `src/components/NewsMarquee.tsx`, `src/app/api/news/route.ts`, `src/lib/egypt-news.ts` (new)
- Need action: no
- Type of action: content (live data source) + behavior (locale-aware fetch)
- Progress: 100% (completed)
- Committed: yes
- Notes: Replaced static/webhook-only feed with Google News RSS. Fixed RTL animation issues and speed. 10-min in-memory cache. Falls back to stored/seed items on fetch failure.

## 2. Nav Bar
File: `src/components/NavBar.tsx`, `src/app/globals.css`
- Need action: no
- Type of action: layout / styling
- Progress: 100% (completed)
- Committed: yes
- Notes: Removed brand wordmark, enlarged logo to overlap main page with a circular shape (50%). Replaced background hover box with animated underline matching the accent color for both themes.
## 3. Hero
File: `src/components/LandingPage.tsx` (hero-wrap) + `AiArticleWidget.tsx`
- Need action: no
- Type of action: styling / content / behavior
- Progress: 100% (completed)
- Committed: yes
- Notes: Removed logo badge, styled dashboard and AI news feed as translucent glass components with bottom alignment. Handled AI News RSS via Google News and created Facebook mockup integration for LiveFeed. Re-routed secondary Action to point to #events.

## 4. Value Strip (Stats)
File: `src/components/ValueStrip.tsx`
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 5. About
File: `src/components/LandingPage.tsx` (#about)
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 6. Services (Bento Grid)
File: `src/components/LandingPage.tsx` (#services)
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 7. AI Tools Section
File: `src/components/AiToolsSection.tsx`
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 8. Chat Section
File: `src/components/ChatPanel.tsx` (+ LandingPage #chat)
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 9. Upcoming Event
File: `src/components/LandingPage.tsx` (.upcoming-shell) + `EnrollmentModal.tsx`
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 10. Map Section
File: `src/components/MapPanel.tsx` + `MadinatyMap.tsx`
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

## 11. Footer
File: `src/components/Footer.tsx`
- Need action: TBD
- Type of action: TBD
- Progress: 0%
- Committed: no

---

## Current Focus
**Section 3 — Hero** (awaiting goals from Ziada)
