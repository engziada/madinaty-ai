---
name: ui-critique-checklist
description: Structured checklist for reviewing Madinaty AI UI work — originality, hierarchy, accessibility, responsiveness, RTL, and brand consistency.
---

# Use when

Use this skill after generating or writing a UI section to self-critique before delivering. Also use it when reviewing a design decision or asking AI to evaluate a layout.

# How to use

Run through each section. For each item that fails, state the problem and fix it before moving on. You don't need to pass every item — trade-offs are fine if they're intentional and documented.

---

# 1. Visual Originality

- [ ] Does it avoid the "generic SaaS template" look (white card grid, blue CTA, stock illustration)?
- [ ] Does it use at least one distinctive visual treatment from the Madinaty AI palette (teal glow, coral gradient, glassmorphism, animated hero backdrop)?
- [ ] Could someone identify this as Madinaty AI without the logo?
- [ ] Is there a clear visual focal point that draws the eye first?
- [ ] Are animations and transitions purposeful — not decorative noise?

---

# 2. Visual Hierarchy

- [ ] Can a user scan the section in 3 seconds and understand its purpose?
- [ ] Is the heading scale correct? (Hero > Section h2 > Card h3 > Body)
- [ ] Is the overline present where a section needs a label?
- [ ] Does text contrast pass WCAG AA? (--text on --bg, --text on --surface)
- [ ] Are CTAs visually prioritized — primary stands out over secondary?
- [ ] Is there sufficient whitespace between elements? (8px grid minimum)

---

# 3. Token Compliance

- [ ] Are all colors using `var(--token)` — no hardcoded hex values?
- [ ] Are all radii using `var(--r-*)` tokens?
- [ ] Are shadows using `var(--shadow-card)`, `var(--shadow-glow)`, or `var(--shadow-coral)`?
- [ ] Are fonts using `var(--font-headline)`, `var(--font-body)`, and their `-ar` variants?
- [ ] Does it render correctly in both `data-theme="light"` and `data-theme="dark"`?

---

# 4. RTL & Bilingual

- [ ] Are all directional CSS properties logical (`margin-inline-start`, not `margin-left`)?
- [ ] Do directional icons flip correctly in RTL (`ChevronLeft` ↔ `ChevronRight`)?
- [ ] Is text layout correct in Arabic — no English word order bleeding through?
- [ ] Are number and date formats locale-aware (`Intl.NumberFormat`, `Intl.DateTimeFormat`)?
- [ ] Is `BrandLogo` still LTR inside the RTL layout?
- [ ] Does the layout hold up visually in both `dir="rtl"` and `dir="ltr"`?

---

# 5. AI & AstroAvatar

- [ ] Is AstroAvatar used for all AI-related UI elements?
- [ ] Is the correct mood chosen for each state (loading → `thinking`, success → `celebrating`, etc.)?
- [ ] Is the correct size chosen for the context?
- [ ] Is there no generic spinner, robot emoji, or placeholder where Astro should appear?

---

# 6. Responsiveness

- [ ] Does the layout work at 375px (mobile), 768px (tablet), 1280px (desktop)?
- [ ] Do grids collapse gracefully? (12-col bento → 2-col → 1-col)
- [ ] Are `clamp()` font sizes used for headings?
- [ ] Is touch target size adequate? (minimum 44×44px for interactive elements)
- [ ] Does the hero visual column hide or restack correctly on mobile?

---

# 7. Accessibility

- [ ] Are all interactive elements reachable by keyboard?
- [ ] Do icon-only buttons have `aria-label`?
- [ ] Do modals have `role="dialog"` + `aria-modal="true"` + `aria-label`?
- [ ] Is focus trapped inside open modals?
- [ ] Are decorative SVGs hidden from screen readers (`aria-hidden="true"`)?
- [ ] Do animations respect `data-reduce-motion` and `prefers-reduced-motion`?
- [ ] Is the `lang` attribute accurate on all text elements (especially mixed Arabic/English)?

---

# 8. Performance

- [ ] Are heavy animations paused when `data-tab-hidden` is set?
- [ ] Are images using `next/image` with explicit `width` + `height`?
- [ ] Are fonts loaded via `next/font` (already configured in layout)?
- [ ] Are client components marked `"use client"` — and only when actually needed?
- [ ] Are large lists virtualized or paginated (not rendering 100+ DOM nodes)?

---

# 9. Interaction Quality

- [ ] Do hover states provide clear visual feedback?
- [ ] Do focus states have visible outlines (not `outline: none` without replacement)?
- [ ] Are transition timings consistent with the platform standard (0.2s–0.28s for most, 0.6s for cinematic)?
- [ ] Is there feedback for every async operation (loading → success/error)?
- [ ] Do CTAs feel satisfying to click? (subtle scale + shadow change on `:active`)

---

# 10. Brand Consistency

- [ ] Does the section feel consistent with the rest of the platform?
- [ ] Is Astro present wherever AI is involved?
- [ ] Is the brand voice correct in copy — smart, warm, community-first, not corporate?
- [ ] Are Arabic translations accurate and natural (not machine-literal)?
- [ ] Is the visual mood consistent with the Sunny Horizon / Aurora Night themes?

---

# Critique prompt template

When asking AI to critique a piece of UI, use this format:

```
Review this UI section against the Madinaty AI design system.

Check:
1. Token compliance — are all colors, radii, and shadows using CSS variables?
2. RTL correctness — logical properties, directional icons, Arabic typography.
3. AstroAvatar — is it used for AI states? Correct mood and size?
4. Hierarchy — can I scan this in 3 seconds?
5. Accessibility — keyboard nav, aria labels, reduced-motion support.
6. Responsiveness — does it hold at 375px?

[paste the component code or describe the layout]

For each issue found, state what is wrong and suggest the specific fix using platform tokens and conventions.
```
