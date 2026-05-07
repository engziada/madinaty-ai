# Madinaty AI — Actions Log

> **Purpose:** Record of all user-requested actions so any AI agent can understand, redo, or undo them.  
> **Format:** Chronological entries with context, files changed, and reversible instructions.

---

## Entry 1 — Hide Services (Keep in Code, Filter at Render)

**Date:** 2026-05-06  
**Requested by:** User (Ziada)  
**Context:** From the services section, user chose 7 services to keep visible and asked to hide all others (not delete) so they can be revealed one by one later when ready.

### What Was Done
- Added `hidden?: boolean` flag to the `Service` type in `src/types/site.ts`.
- Restored all 13 services (EN + AR) in `src/data/content.ts`.
- Set `hidden: true` on 6 services that the user wanted hidden:
  - Rental Portal / بوابة الإيجار الذكية
  - Community Interest Club / نادي الاهتمامات المجتمعي
  - Poll Board / لوحة التصويت المجتمعي
  - Trusted Services Directory / دليل الخدمات الموثوقة
  - Madinaty Tutoring Board / لوحة الدروس الخصوصية
  - Activity Finder / مكتشف الأنشطة
- Updated `src/components/LandingPage.tsx` to filter out hidden services at render time: `.filter((s) => !s.hidden)`.
- Updated visible service count in hero dashboard stats and section titles from 42 → 7 (and Arabic equivalent).

### Files Changed
1. `src/types/site.ts` — added `hidden?: boolean` to Service interface
2. `src/data/content.ts` — restored all services; marked 6 as `hidden: true`; updated counts
3. `src/components/LandingPage.tsx` — added `.filter((s) => !s.hidden)` before `.map()`

### How to Undo (Restore All Services Visible)
Remove the `hidden: true` property from the 6 service objects in both EN and AR arrays inside `src/data/content.ts`, and revert the filter in `LandingPage.tsx` back to `content.services.map(...)`.

### How to Reveal a Single Hidden Service Later
Find the service entry in `src/data/content.ts` (both EN and AR arrays) and remove the line `hidden: true,`. No other file changes needed.

---

## Entry 2 — Hide Coming-Soon Page, Make Landing Page the Default

**Date:** 2026-05-06  
**Requested by:** User (Ziada)  
**Context:** User asked to hide the Coming Soon page and make the full landing page the normal home. Emphasized: hide, do not remove.

### What Was Done
- Swapped `src/app/ar/page.tsx` from `ComingSoonPage` → `LandingPage` (locale="ar").
- Swapped `src/app/en/page.tsx` from `ComingSoonPage` → `LandingPage` (locale="en").
- Kept the `/coming-soon` and `/ar/coming-soon` route files intact but changed them to **redirect** to home:
  - `/coming-soon` → redirects to `/en`
  - `/ar/coming-soon` → redirects to `/ar`
- Removed coming-soon entries from `sitemap.ts` so search engines stop indexing them.
- Cleaned up `src/lib/locale.ts` comment removing `/coming-soon` from the list of root-level English pages.

### Files Changed
1. `src/app/ar/page.tsx` — now renders `<LandingPage locale="ar" />`
2. `src/app/en/page.tsx` — now renders `<LandingPage locale="en" />`
3. `src/app/coming-soon/page.tsx` — now `redirect("/en")` (file kept, page hidden)
4. `src/app/ar/coming-soon/page.tsx` — now `redirect("/ar")` (file kept, page hidden)
5. `src/app/sitemap.ts` — removed `/coming-soon` and `/ar/coming-soon` entries
6. `src/lib/locale.ts` — removed `/coming-soon` from comment list of root-level English pages

### How to Undo (Restore Coming-Soon as Default)
1. Revert `src/app/ar/page.tsx` back to `<ComingSoonPage locale="ar" />`
2. Revert `src/app/en/page.tsx` back to `<ComingSoonPage locale="en" />`
3. Revert `src/app/coming-soon/page.tsx` back to rendering `<ComingSoonPage locale="en" />`
4. Revert `src/app/ar/coming-soon/page.tsx` back to rendering `<ComingSoonPage locale="ar" />`
5. Re-add the two coming-soon entries to `sitemap.ts`
6. Re-add `/coming-soon` to the comment in `src/lib/locale.ts`

### How to Partially Restore (Keep Landing as Default but Allow Direct /coming-soon Access)
Only revert files 3 and 4 (the coming-soon route files) so they render the ComingSoonPage component again, while keeping the home routes (`/ar`, `/en`) pointing to LandingPage.

---

## Entry 3 — SEO Quick Wins Audit & Fixes

**Date:** 2026-05-07  
**Requested by:** User (Ziada)  
**Context:** User asked whether the site is fully SEO-optimized. Audit revealed solid foundation but several gaps.

### What Was Done
- **Gallery page metadata (missing):**
  - Created `src/app/gallery/layout.tsx` with EN metadata (title, description, canonical, hreflang).
  - Created `src/app/ar/gallery/layout.tsx` with AR metadata.
- **Arabic vision-future metadata (missing):**
  - Added `metadata` export to `src/app/ar/vision-future/page.tsx`.
- **Sitemap completeness:**
  - Added missing entries to `src/app/sitemap.ts`:
    - `/ar/gallery`, `/gallery` (priority 0.7)
    - `/ar/founders`, `/founders` (priority 0.7)
    - `/ar/privacy-policy`, `/privacy-policy` (priority 0.5)
    - `/ar/terms-of-use`, `/terms-of-use` (priority 0.5)
- **PWA manifest:**
  - Created `public/manifest.json` with icons, theme colors, and start URL.
  - Added `manifest: "/manifest.json"` to root metadata in `src/app/layout.tsx`.
- **OG image dimension fix:**
  - Actual `logo.png` is 1600×1200; metadata incorrectly claimed 1200×630.
  - Updated OG image dimensions in `src/app/layout.tsx` to match reality.
- **Performance & security headers:**
  - Updated `next.config.ts` with `async headers()` returning:
    - `X-Frame-Options: DENY`
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`
    - Cache-Control for static assets (`/_next/static/*` → 1 year immutable, logos → 1 week)

### Files Changed
1. `src/app/gallery/layout.tsx` — **new file** — EN gallery metadata
2. `src/app/ar/gallery/layout.tsx` — **new file** — AR gallery metadata
3. `src/app/ar/vision-future/page.tsx` — added metadata export
4. `src/app/sitemap.ts` — added 8 missing sub-page entries
5. `public/manifest.json` — **new file** — PWA manifest
6. `src/app/layout.tsx` — added `manifest` ref, fixed OG image dimensions
7. `next.config.ts` — added `async headers()` for cache + security headers

### How to Undo
1. Delete the two new `layout.tsx` files in gallery folders.
2. Revert `ar/vision-future/page.tsx` to remove metadata import/export.
3. Revert `sitemap.ts` to remove the 8 new entries.
4. Delete `public/manifest.json` and remove `manifest:` line from `layout.tsx` metadata.
5. Revert OG image dimensions in `layout.tsx` back to 1200×630 (or whatever previous value was).
6. Revert `next.config.ts` back to `{ reactStrictMode: true }` only.

### What Remains (Out of Scope)
- Page-level Core Web Vitals monitoring (e.g., Vercel Analytics, web-vitals library)
- Custom 1200×630 OG image (current logo is 1600×1200 — not ideal social preview ratio)
- `founders`, `privacy-policy`, `terms-of-use` pages have metadata but could be enhanced with `alternates` canonical/hreflang

---

## Entry 4 — Kids Session Section Updates

**Date:** 2026-05-07  
**Requested by:** User (Ziada)  
**Context:** User manually updated the Arabic event/kids-session text and wanted the same changes reflected in English, plus new content (supervisor info, course importance), a clickable location pin, proper safety badge icons, and a clickable WhatsApp contact.

### What Was Done
- **Synced EN event section** (`src/data/content.ts` `contentEn.event`) to match the AR changes:
  - Updated subtitle from "Ages 7–10" → "Ages 8–12"
  - Updated description (20 kids, no parents inside)
  - Updated promoLabel, promoTitle, promoDescription, labSubtitle
  - Updated stats (10 → 20 kids/session, 50 → 10 free seats)
- **Added `descriptionExtra`** to both EN and AR event objects with:
  - Supervision credentials (Cairo University professors)
  - Preparation & delivery by (software engineers & IT professionals)
  - Hands-on learning tagline
  - Course importance bullet list (logical thinking, AI/ML basics, fun learning)
- **Added `promoLocationUrl`** to both EN and AR with Google Maps share link (`https://share.google/...`)
- **Fixed broken safety badge icons** in both EN and AR:
  - Safe AI: 🛡️ (was garbled)
  - Instructors: 🎓 (already correct)
  - Ages: 👦 (already correct)
  - Symbolic fee: 💰 (was garbled)
  - Contact phone: 📞 (was garbled)
- **Made contact badge clickable** — added `url: "https://wa.me/201026655008"` to the last safetyBadge in both EN and AR.
- **Updated `src/types/site.ts`**:
  - Added `promoLocationUrl?: string` to event type
  - Added `descriptionExtra?: string` to event type
  - Added `url?: string` to safetyBadge items
- **Updated `src/components/LandingPage.tsx`**:
  - Render `descriptionExtra` below main description with `whiteSpace: "pre-line"` for proper line breaks
  - Render safetyBadges with `url` as `<a>` tags (opens WhatsApp)
  - Add 📍 map pin link next to `promoTitle` that opens `promoLocationUrl`
  - Fixed variable shadowing (`content` → `badgeContent` inside map callback)

### Files Changed
1. `src/types/site.ts` — added `promoLocationUrl`, `descriptionExtra`, `url` on safetyBadge
2. `src/data/content.ts` — updated EN event block; updated AR event block (icons, descriptionExtra, promoLocationUrl)
3. `src/components/LandingPage.tsx` — descriptionExtra render, clickable safetyBadge, location pin link

### How to Undo
1. Revert `src/types/site.ts` to remove the three new optional fields.
2. Revert both EN and AR event objects in `src/data/content.ts` to previous values.
3. Revert the event section in `src/components/LandingPage.tsx` back to the original simpler rendering.

---

## Entry 5 — Enrollment Form Dark Mode Fix + API Test

**Date:** 2026-05-07  
**Requested by:** User (Ziada)  
**Context:** Registration form in dark mode had unreadable gray text on white backgrounds for text inputs, dropdowns, and checkbox items. User also requested functional testing of the enrollment submission with 3 dummy data sets.

### What Was Done
- **Fixed dark mode text color** in `src/app/globals.css`:
  - `.enrollment-field input, .enrollment-field select`: changed `color: var(--text);` → `color: #111;` (always dark, readable)
  - `.enrollment-checkbox-item`: changed `color: var(--text);` → `color: #111;` (same fix)
  - In dark mode `var(--text)` becomes `#e8f0fe` (light blue/white), which was invisible against the hardcoded `#ffffff` background on these controls.
- **Tested the enrollment endpoint** by sending 3 dummy payloads directly to the configured `GOOGLE_SHEETS_SCRIPT_URL`:
  - Test 1: "Test Child One" → HTTP 200, `{"success":true}`
  - Test 2: "Test Child Two" → HTTP 200, `{"success":true}`
  - Test 3: "Test Child Three" → HTTP 200, `{"success":true}`
  - All 3 submissions were accepted by the Google Apps Script backend.

### Files Changed
1. `src/app/globals.css` — fixed `color` on `.enrollment-field input/select` and `.enrollment-checkbox-item`

### How to Undo
1. Revert the two `color: #111;` lines in `src/app/globals.css` back to `color: var(--text);`.

---
