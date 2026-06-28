---
name: ui-prompt-library
description: Reusable prompt templates for generating uncommon, high-quality UI sections on the Madinaty AI platform — hero, dashboard, onboarding, empty states, and more.
---

# Use when

Use this skill when starting a new UI section, page, or feature from scratch — especially when the goal is fresh, distinctive design rather than a generic layout.

# How to use

Pick the nearest template below, fill in the bracketed fields, then iterate using the `ui-critique-checklist` skill.

---

# Hero Section

```
Design a hero section for [feature/page name] on Madinaty AI.

Theme: Sunny Horizon (light). Dark override: Aurora Night.
Tokens: --teal (#0bb8c7), --coral (#ff6b5b), --sun (#ffc94a), --bg (#f6f9ff).
Fonts: Space Grotesk 900 for headline, Inter for body.
Layout: 2-column grid on desktop (copy left, visual right), single column on mobile.
Direction: RTL-first (Arabic default). Use logical CSS properties.

Must include:
- Overline label (.overline class, teal)
- Hero headline with clamp(2.6rem, 6.5vw, 5rem), weight 900
- Subheadline in --text-soft, max 52ch
- 2 CTAs: .btn-primary (coral→sun gradient) + .btn-outline (teal)
- AstroAvatar mood="[idle|waving]" size="[lg|xl]" in the visual column
- Animated background (.site-bg pattern with radial gradients)

Visual direction: [describe the mood — e.g. "bright, sky-like, optimistic city morning"]
```

---

# Feature / Service Card Grid

```
Design a bento card grid for [feature area] on Madinaty AI.

Grid: 12-column bento (.bento class). Cards use .tile with hover lift translateY(-6px).
Accent tiles (.tile-accent) have a blue gradient background.
Each card needs: .tile-icon (teal background, 2.75rem), h3, short paragraph.

Cards to generate:
1. [Card 1 title + 1-line description]
2. [Card 2 title + 1-line description]
3. [Card 3 title + 1-line description]

Layout: tile-lg (span 7) for the hero card, tile-half (span 6) for the rest.
Direction: RTL. Hover effects must not break in RTL.
```

---

# Onboarding / Enrollment Flow

```
Design a multi-step onboarding flow for [feature name].

Character: AstroAvatar as the guide throughout.
- Step intro: mood="waving", size="lg"
- During input: mood="listening", size="sm" (corner of input)
- Processing: mood="thinking", size="md"
- Completion: mood="celebrating", size="xl"

Steps: [list the steps]
Each step: overline with step number, h3 title, paragraph description, form fields if needed.
Progress: thin teal→blue gradient bar at the top.
Modal size: min(520px, 96vw), slides up with cubic-bezier(0.22, 1, 0.36, 1).
```

---

# Dashboard Panel

```
Design a dashboard panel for [data/feature].

Style: glass card (.glass class) inside a .section on --bg-alt background.
Header: h3 title + status dot (.ai-pulse, teal, pulsing) + optional action button.
Metric row: 3–4 .hero-stat boxes (large teal number, small muted label).
Content area: [describe — chart, list, map, activity feed].
Empty state: AstroAvatar mood="idle" size="xl" + descriptive message.
Loading state: AstroAvatar mood="thinking" size="lg".

Direction: RTL-first. Locale-aware labels.
```

---

# Empty State

```
Design an empty state for [context — e.g. "no search results", "no bookings yet"].

Character: AstroAvatar mood="[idle|waving]" size="xl", centered.
Headline: friendly, max 8 words, --text color, Space Grotesk 700.
Subtext: 1–2 sentences in --text-soft, max 40ch.
CTA: single .btn-primary button — [CTA label].
Background: subtle, no heavy decoration. Use --bg-alt or leave transparent.
```

---

# Conversational AI Chat UI

```
Design a chat interface for [feature/bot name].

Layout: modal or panel, min(520px, 96vw).
Header: AstroAvatar mood="talking" size="sm" + bot name + close button (X icon).
Messages:
- Bot bubbles: --bg-alt background, --text color, border-radius var(--r-lg) var(--r-lg) var(--r-lg) 0
- User bubbles: teal→blue gradient, white text, border-radius var(--r-lg) var(--r-lg) 0 var(--r-lg)
Input row: textarea + send button (.btn-primary circle, coral→sun gradient).
Typing indicator: AstroAvatar mood="thinking" size="sm" + 3-dot pulse.

Direction: RTL-first. Flip bubble radius for RTL.
```

---

# Section with Stats / Social Proof

```
Design a value strip or stats section for [page].

Style: .value-strip (grid, 4 columns, teal separators).
Each item: large teal number (clamp 1.8rem–2.8rem, weight 900), small muted label.
Stats: [list stat + label pairs]
Animation: count-up on scroll enter (IntersectionObserver).
Direction: RTL. Logical borders (border-inline-end).
```

---

# Notification / Toast

```
Design a notification system for [context].

Types: success (mint), warning (sun), error (coral), info (teal).
Position: bottom-inline-start (RTL-aware).
Anatomy: colored left border (border-inline-start), icon, title, message, optional dismiss X.
Animation: slide up from bottom + fade in, 250ms ease-out.
Auto-dismiss: 4 seconds.
```

---

# Mobile Navigation

```
Design a mobile navigation drawer for Madinaty AI.

Trigger: hamburger .menu-btn (3 lines, teal color).
Drawer: slides in from inline-start (RTL-aware), full height.
Background: var(--surface), backdrop blur 24px.
Items: same as desktop nav + locale toggle + theme toggle.
Active indicator: teal left border (border-inline-start) + teal text color.
Close: overlay tap or swipe-out.
```

---

# Prompting tips

- Always specify **RTL-first** and **bilingual (Arabic/English)**
- Reference specific **token names** (not hex codes) in prompts
- Mention **AstroAvatar** mood + size explicitly for AI UI sections
- State **light + dark** behavior if the section appears in both themes
- Ask for **hover and focus states** explicitly — they're often skipped
