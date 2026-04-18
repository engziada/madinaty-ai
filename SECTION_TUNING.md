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
- Need action: no
- Type of action: none
- Progress: 100% (skipped/approved)
- Committed: no changes needed
- Notes: Evaluated and approved as is by user.

## 5+6. About + Services (Platform — Merged)
Files: `src/components/LandingPage.tsx` (#platform), `src/data/content.ts`, `src/types/site.ts`, `src/app/globals.css`
- Need action: no
- Type of action: content / styling / layout / i18n / refactor
- Progress: 100% (completed)
- Committed: yes
- Notes: User requested merge of sections 5 and 6 into a single `#platform` section. Left column: sticky About narrative with pillar cards and highlight checks. Right column: 5-service bento grid with wide (AI Bot), tall (Kids Courses), and normal cards for Summer Training, Rental Portal, Community Club. All cards use glassmorphism with badge labels (Live / Coming Soon). Replaced old generic `cards` object in SiteContent with structured `services[]` array. VisionPage updated to use new services map. Full EN+AR i18n. Responsive to single column at 900px.

## 7. AI Tools Section
Files: `src/components/AiToolsSection.tsx`, `src/app/globals.css`
- Need action: no
- Type of action: UX behavior / mobile optimization / styling / a11y
- Progress: 100% (completed)
- Committed: no
- Notes: Completed all phases in one pass. Added stronger empty state with actions, mobile horizontal filter chips (RTL-safe), live result meta label, focus-visible states for filters and links, and improved visual hierarchy for tool groups. Kept touch tooltip fallback behavior for long descriptions.

## 8. Chat Section
Files: `src/components/ChatPanel.tsx`, `src/app/api/chat/route.ts`, `src/data/madinaty-knowledge.ts`
- Need action: yes
- Type of action: behavior / prompt policy / backend integration
- Progress: 90% (tool-calling + grounded rendering + anti-hallucination)
- Committed: no
- Notes: Chat now uses Groq tool-calling as router (`search_madinaty_web`) and runs Serper only when Groq decides live local search is needed. Discovery answers are grounded from Serper trusted sources (Google Maps / Tripadvisor / Instagram / Facebook), synthesized via strict JSON schema, and rendered in deterministic friendly format with hotlinks. Added anti-hallucination constraints to prevent dish/product names being treated as venue names. Chat UI now renders safe markdown links/bold for AI replies and includes beta notation in title. Remaining gap: reliability hardening (retry + model fallback + routing logs).

## 9. Upcoming Event
File: `src/components/LandingPage.tsx` (.upcoming-shell) + `EnrollmentModal.tsx`
- Need action: yes
- Type of action: UX behavior / i18n / form quality
- Progress: 90% (content + form + backend fix)
- Committed: no
- Notes: Updated event copy and stats (one-day 2H session, ages 7–10, 10 kids per session without parents, first 50 free, date/time/place TBD, Madinaty professional instructors). Added catchy visual image card in upcoming side panel. Enrollment form includes required fields (kid + guardian + address + interests + hobbies) with EN/AR labels. **Removed district field** as requested. Added **red asterisk indicators** on all mandatory fields. Registration submits to Google Sheets via Google Apps Script. Confirmation emails via Resend.com. Success modal displays registration number (MDN-YYYYMMDD-XXXX). Modal scrollability and focus trap fixed.

## 10. Map Section
File: `src/components/MapPanel.tsx` + `MadinatyMap.tsx`
- Need action: no
- Type of action: Hidden (paused for later)
- Progress: 0%
- Committed: no
- Notes: Section commented out in `LandingPage.tsx`. Map component preserved for future work. Uncomment import and JSX block to restore.

## 11. Footer
File: `src/components/Footer.tsx`
- Need action: yes
- Type of action: Enhancement complete
- Progress: 100%
- Committed: no
- Notes: Enhanced footer with 3-column layout: brand section with social icons (Facebook, Instagram, Twitter, YouTube), contact section (admin email + WhatsApp with icons), and quick links. Added bottom bar with AI Club tagline. Back-to-top button now stops before footer (180px margin). Uses lucide-react icons. Responsive design for mobile.

## 12. Navigation Bar
File: `src/components/NavBar.tsx`
- Need action: yes
- Type of action: Enhancement
- Progress: 100%
- Committed: no
- Notes: Updated navbar with links to all sections: Home (#platform), Services (#services), AI Tools (#ai-tools), Chat/Madinaty Bot (#chat), Events (#events), Roadmap (/vision-future). Fixed duplicate section ID (services section was #platform, changed to #services). CTA button now links to Events section for registration. Removed hidden Map link.

---

## Current Focus
**All sections complete** — Landing page fully tuned.
