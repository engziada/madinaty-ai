# Course Deduplication, Page Creation & Knowledge Base Update

Fix duplicate courses, create 5 individual course pages, update Astro's knowledge base, fix the hero dashboard pillboard entries, and verify Astro answers correctly.

## Current State Summary

### Duplicate Courses Found in [courseData.ts](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/data/courseData.ts)

The file contains **10 course entries** but only **5 unique courses** exist. Each duplicate pair:

| # | Original (Lines 148–511) | Duplicate (Lines 513–997) | Canonical Title (Arabic) | New Slug |
|---|---|---|---|---|
| 1 | `kids-ai-chatbots` (L148) | — (no dup) | شات الذكاء الاصطناعي للأطفال | `kids-session` |
| 2 | `kids-coding-scratch` (L274) | `kids-coding-scratch` (L514) — **"مبادئ البرمجة وتصميم الألعاب للأطفال"** | مبادئ البرمجة وتصميم الألعاب للأطفال | `kids-ai-dev` |
| 3 | `python-ai-programming` (L338) | `python-ai-programming` (L659) — **"بايثون وذكاء اصطناعي"** | بايثون وذكاء اصطناعي | `python-ai-programming` |
| 4 | `robotics-smart-systems` (L397) | `robotics-smart-systems` (L774) — **"الروبوتات والأنظمة الذكية"** | الروبوتات والأنظمة الذكية | `robotics-smart-systems` |
| 5 | `ai-pilot-day` (L453) | `ai-pilot-day` (L883) — **"القيادة بالذكاء الاصطناعي"** | القيادة بالذكاء الاصطناعي | `ai-pilot-day` |

### Merge Strategy

For each duplicate pair, keep the duplicate's **corrected Arabic title** and merge by taking the **most complete data from either version**, filling in any gaps. The duplicate entries (lines 513–997) generally have **more accurate pricing** and **corrected titles**, while the originals (lines 148–511) have **richer content** (trainers, timeline, pillars, FAQs).

---

## User Review Required

> [!IMPORTANT]
> **Kids' Session (slug: `kids-session`) Price**: You confirmed 450 EGP with original price 569.99 shown as strikethrough. This means the discount changes from 65% → ~21%. The World Cup promo text (449.99 EGP) in the landing page event section and knowledge base will also be updated to reflect 450 EGP.

> [!IMPORTANT]
> **All 5 courses will be marked as `status: "active"` (Open for Registration)**. The current UI blocks navigation to `"coming-soon"` courses (disabled cards, `notFound()` for non-active slugs). This gate in `[slug]/page.tsx` line 28 (`course.status !== "active"`) must be removed.

> [!WARNING]  
> **KidsAIDev, PythonTrack, Robotics, AI4Leaders** currently have `slots: []` (no session dates) and `trainers: []`. They will still be navigable and show "Open for Registration" but the Registration tab will show a "Contact us via WhatsApp" CTA since no specific slots are defined. If you have specific dates/slots, provide them.

---

## Open Questions

> [!IMPORTANT]
> **Missing Data for New Courses** — The following courses need your input if you have it:
> - **KidsAIDev** (`kids-ai-dev`): FAQs are empty, trainers are empty. Should we reuse the trainers from KidsSession?
> - **PythonTrack** (`python-ai-programming`): FAQs minimal (1 item), trainers minimal (1 item). Need more?
> - **Robotics** (`robotics-smart-systems`): Same as above.
> - **AI4Leaders** (`ai-pilot-day`): Same as above.
> - Or should I keep them as-is and mark them "Open for Registration" with a WhatsApp CTA?

---

## Proposed Changes

### Component 1: Course Data — Deduplication & Merge

#### [MODIFY] [courseData.ts](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/data/courseData.ts)

**Goal**: Reduce from 10 entries to 5 merged entries, with corrected data.

**Course 1 — Kids Session (`kids-session`)**:
- Rename slug: `kids-ai-chatbots` → `kids-session`
- Update price: `priceOriginal: 569.99`, `priceDiscounted: 450`
- Update discount: `"~21%"`
- Update `priceBadgeAr/En` to reflect 450 EGP
- Update `discountNoteAr/En` accordingly
- Mark `status: "active"`

**Course 2 — Kids AI Dev (`kids-ai-dev`)**:
- Rename slug: `kids-coding-scratch` → `kids-ai-dev`
- Merge data: Take original's richer trainers/timeline/pillars (lines 274–336), but use duplicate's corrected title "مبادئ البرمجة وتصميم الألعاب للأطفال", pricing (1800 EGP), stats (6 weeks, small groups), and timeline (6 sessions)
- Mark `status: "active"`

**Course 3 — Python Track (`python-ai-programming`)**:
- Keep slug `python-ai-programming`
- Merge: Use duplicate's corrected title "بايثون وذكاء اصطناعي" / "Python & AI Prodigy", pricing (5100 EGP), and stats (8 weeks, 24 hours)
- Keep original's richer pillars (4 items) and timeline (3 months/levels)
- Mark `status: "active"`

**Course 4 — Robotics (`robotics-smart-systems`)**:
- Keep slug `robotics-smart-systems`
- Merge: Use duplicate's corrected title "الروبوتات والأنظمة الذكية" / "RoboCraft & Smart Systems", pricing (6200 EGP), and stats (8 weeks, 24 hours)
- Keep original's richer pillars (4 items) and timeline (3 levels)
- Mark `status: "active"`

**Course 5 — AI4Leaders (`ai-pilot-day`)**:
- Keep slug `ai-pilot-day`
- Merge: Use duplicate's corrected title "القيادة بالذكاء الاصطناعي" / "AI Executive Pilot", pricing (4000 EGP), and stats (1 day, 9 hours)
- Keep original's richer pillars (4 items), timeline, and FAQs
- Mark `status: "active"`

**Delete**: Lines 513–997 (all 5 duplicate entries) after merging their unique data into lines 148–511.

---

### Component 2: Route Pages — Enable All Courses

#### [MODIFY] [page.tsx](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/app/ar/course/%5Bslug%5D/page.tsx)

- `generateStaticParams()` (line 11): Remove `.filter((c) => c.status === "active")` so all courses generate static pages
- `Page()` (line 28): Remove `|| course.status !== "active"` check so all courses are accessible

#### [MODIFY] [page.tsx](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/app/en/course/%5Bslug%5D/page.tsx) (if exists, same changes)

Check and apply same changes to the English route.

---

### Component 3: Courses Index Page — Fix for Active Courses

#### [MODIFY] [CoursesIndexPage.tsx](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/components/course/CoursesIndexPage.tsx)

- All courses are now `status: "active"`, so the existing logic will naturally link them
- Remove deduplication needed since courseData will only have 5 unique entries
- Cards that were previously disabled (opacity 0.6, pointer-events none) will now be fully active and clickable
- Update the "Open for Registration" label text for courses with no specific slots: show "مفتوح للتسجيل" / "Open for Registration" instead of "Coming Soon"

---

### Component 4: Knowledge Base Update

#### [MODIFY] [madinaty-knowledge.ts](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/data/madinaty-knowledge.ts)

Replace the existing 2 course-related entries (indices 3 and 6 in EN, 2 and 6 in AR) with comprehensive, updated knowledge covering all 5 courses:

**English additions**:
```
- "Madinaty AI Lab offers 5 training courses: (1) AI Chatbots for Kids (ages 8-12, 2-hour awareness session, 450 EGP), (2) Coding Principles & Game Design for Kids (ages 8-12, 6 weeks/12 hours, 1800 EGP), (3) Python & AI Prodigy (8 weeks/24 hours, 5100 EGP), (4) RoboCraft & Smart Systems (8 weeks/24 hours, 6200 EGP), (5) AI Executive Pilot for leaders & managers (1 day/9 hours, 4000 EGP). All courses are open for registration."
- "AI Chatbots for Kids: 2-hour session at Triple A Education Center, East Hub, 2nd Floor, Madinaty. Price 450 EGP (discounted from 569.99 EGP). Max 10 kids per session. Covers AI basics, safe prompt engineering, digital safety, and critical thinking. Supervised by Cairo University professors. Course page: /en/course/kids-session"
- "Coding Principles & Game Design for Kids: 6-week course (12 hours total, 2 sessions/week). Price 1800 EGP. Kids build their own games and interactive stories. Requires personal laptop. Course page: /en/course/kids-ai-dev"
- "Python & AI Prodigy: 3-level program (8 weeks, 24 hours). Price 5100 EGP. From Python basics to building a face recognition AI model. Requires personal laptop. Course page: /en/course/python-ai-programming"
- "RoboCraft & Smart Systems: 3-level program (8 weeks, 24 hours). Price 6200 EGP. Electronics, Arduino programming, and building obstacle-avoiding robots. 100% hands-on hardware training. Course page: /en/course/robotics-smart-systems"
- "AI Executive Pilot (for leaders & managers): 1-day intensive (9 hours). Price 4000 EGP. Zero-code training covering prompt engineering, strategic thinking, decision analysis, and building a personal AI advisor. Includes certified AI Pilot certificate. Course page: /en/course/ai-pilot-day"
```

**Arabic additions**: Same content translated to Arabic with correct URLs using `/ar/course/...`.

Remove old/outdated course entries that reference old pricing (199.99, 449.99) or old session dates.

---

### Component 5: Landing Page Event Section Update

#### [MODIFY] [content.ts](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/data/content.ts)

Update the `event` section in both `contentEn` and `contentAr` to:
- Change price references from 449.99/199.99 → 450 EGP
- Update promo text to reflect new pricing
- Update stats values
- Update safety badges pricing
- Update lab subtitle

---

### Component 6: Hero Dashboard Pillboard Fix

#### Investigation & Fix for [RecentActivitiesFeed](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/components/RecentActivitiesFeed.tsx)

The hero pillboard fetches from `/api/activities?locale=X` which queries a Neon database (`platform_activities` table). Possible issues on Vercel:

1. **NEON_DATABASE_URL not set**: Verify `.env.local` has `NEON_DATABASE_URL` and that it's set in Vercel Environment Variables
2. **Empty table**: The `platform_activities` table might not have been seeded with entries
3. **Edge runtime compatibility**: The API uses `runtime = "edge"` with `@neondatabase/serverless` — this should work on Vercel Edge

**Fix approach**:
- Add a **static fallback** in `RecentActivitiesFeed.tsx` — if the API returns empty/error, render hardcoded course links as default entries instead of showing "No recent community activities"
- The fallback entries will link to all 5 course pages with correct URLs
- Additionally, update the admin hero page content via the `/admin/hero` panel or directly seed the database

#### [MODIFY] [RecentActivitiesFeed.tsx](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/components/RecentActivitiesFeed.tsx)

Add fallback content that shows course links when the API returns empty:

```typescript
const FALLBACK_CONTENT: Record<LocaleCode, string> = {
  en: `[🤖 AI Chatbots for Kids — 450 EGP](/en/course/kids-session)
[🎮 Coding & Game Design for Kids — 1,800 EGP](/en/course/kids-ai-dev)
[🐍 Python & AI Prodigy — 5,100 EGP](/en/course/python-ai-programming)
[⚙️ RoboCraft & Smart Systems — 6,200 EGP](/en/course/robotics-smart-systems)
[🚀 AI Executive Pilot — 4,000 EGP](/en/course/ai-pilot-day)`,
  ar: `[🤖 شات الذكاء الاصطناعي للأطفال — ٤٥٠ ج.م](/ar/course/kids-session)
[🎮 مبادئ البرمجة وتصميم الألعاب — ١٨٠٠ ج.م](/ar/course/kids-ai-dev)
[🐍 بايثون وذكاء اصطناعي — ٥١٠٠ ج.م](/ar/course/python-ai-programming)
[⚙️ الروبوتات والأنظمة الذكية — ٦٢٠٠ ج.م](/ar/course/robotics-smart-systems)
[🚀 القيادة بالذكاء الاصطناعي — ٤٠٠٠ ج.م](/ar/course/ai-pilot-day)`
};
```

When API returns empty or errors, render `FALLBACK_CONTENT[locale]` instead of the empty message.

---

### Component 7: CourseTabsPage — Handle Courses Without Slots

#### [MODIFY] [CourseTabsPage.tsx](file:///f:/Web-Projects/MadinatyAI/Codes/Platform/src/components/course/CourseTabsPage.tsx)

The Registration tab currently shows slot-based booking. For courses with `slots: []`:
- Show a "Open for Registration — Contact us via WhatsApp" CTA instead of empty slot list
- Display course price prominently
- Add a WhatsApp CTA button linking to `https://wa.me/201026655008`

---

### Component 8: Astro Chatbot Testing

After all changes, verify Astro answers correctly by:

1. **Build the project** to ensure no TypeScript/build errors
2. **Test the chatbot API** with sample questions:
   - "What courses do you offer?" → Should list all 5 courses with prices
   - "How much is the kids AI session?" → Should say 450 EGP
   - "What is the Python course about?" → Should describe the 3-level program
   - "Where are the courses held?" → Should mention Triple A Education Center
   - "How do I register for robotics?" → Should provide course link and WhatsApp

---

## Verification Plan

### Automated Tests
```bash
# Build to verify no TypeScript errors
npm run build

# Verify all 5 course slugs are accessible
# After build, check .next/server/app/ar/course/*.html files exist
```

### Manual Verification
- Verify courses index page shows exactly 5 cards, all clickable
- Verify each course page loads with 4 tabs (Registration, Overview, Trainers, FAQ)
- Verify hero pillboard shows course links (fallback or DB content)
- Verify Astro chatbot answers course questions correctly using the updated knowledge base
- Deploy to Vercel and verify hero pillboard renders on production

### Files Modified (Summary)

| File | Action |
|------|--------|
| `src/data/courseData.ts` | Merge duplicates → 5 entries, update slugs/prices/status |
| `src/app/ar/course/[slug]/page.tsx` | Remove active-only filter |
| `src/app/en/course/[slug]/page.tsx` | Remove active-only filter (if exists) |
| `src/components/course/CoursesIndexPage.tsx` | Update status labels |
| `src/data/madinaty-knowledge.ts` | Rewrite with all 5 courses' data |
| `src/data/content.ts` | Update event section pricing |
| `src/components/RecentActivitiesFeed.tsx` | Add fallback course links |
| `src/components/course/CourseTabsPage.tsx` | Handle empty slots gracefully |
