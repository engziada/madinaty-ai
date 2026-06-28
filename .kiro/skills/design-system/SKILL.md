---
name: design-system
description: Madinaty AI design tokens, themes, typography, layout grid, and core CSS patterns. Load this whenever building or reviewing any UI.
---

# Use when

Use this skill for any UI work — new components, page sections, style fixes, or theme-aware code.

# Stack

- **Framework:** Next.js 15 App Router, React 19
- **Styling:** Vanilla CSS custom properties — NO Tailwind, NO shadcn, NO Radix
- **Icons:** `lucide-react` only
- **Fonts:** Google Fonts via `next/font` — Inter, Space Grotesk, Cairo, Alexandria

# Themes

Two themes: **Sunny Horizon (light, default)** and **Aurora Night (dark)**.

Toggled via `data-theme="dark"` on `<html>`. Persisted to `localStorage` under `"madinaty.theme"`.

```tsx
const { theme, toggleTheme, setTheme } = useTheme(); // from @/components/ThemeProvider
```

# Design Tokens

Always use `var(--token)` — never hardcode colors, radii, or shadows.

## Light Theme (`:root`)

```css
/* Backgrounds */
--bg:          #f6f9ff   /* main page */
--bg-alt:      #eef3ff   /* alternate sections */
--surface:     #ffffff   /* cards/panels */
--surface-mid: #f3f7ff
--surface-hi:  #e6eeff

/* Borders */
--border:      rgba(20, 60, 140, 0.10)
--border-soft: rgba(20, 60, 140, 0.06)

/* Brand */
--teal:        #0bb8c7   /* primary accent */
--teal-bright: #14d4d4
--teal-dim:    rgba(11, 184, 199, 0.12)
--blue:        #2b6eff
--blue-mid:    #1e4fd9

/* Warm accents */
--coral:       #ff6b5b   /* primary CTA */
--coral-soft:  #ffd7d1
--sun:         #ffc94a
--sun-soft:    #fff1c2
--mint:        #22c993
--lilac:       #9b7bff
--gold:        #ffc94a
--gold-dim:    rgba(255, 201, 74, 0.18)

/* Text */
--text:        #0c1a33   /* deep navy */
--text-soft:   #516787
--text-muted:  #8094b0

/* Radii */
--r-sm:   0.5rem
--r-md:   0.875rem
--r-lg:   1.25rem
--r-xl:   1.75rem
--r-full: 999px         /* pill */

/* Shadows */
--shadow-card:  0 14px 42px rgba(20,60,140,0.10), 0 2px 6px rgba(20,60,140,0.06)
--shadow-glow:  0 14px 50px rgba(11,184,199,0.20)
--shadow-coral: 0 12px 34px rgba(255,107,91,0.22)
```

## Dark Theme (`[data-theme="dark"]`)

```css
--bg:          #070d18
--bg-alt:      #0c1425
--surface:     #0f1c32
--surface-mid: #142338
--surface-hi:  #1a2d48
--border:      rgba(0, 210, 210, 0.14)
--teal:        #00d2d2
--teal-bright: #00ffee
--teal-dim:    rgba(0, 210, 210, 0.15)
--coral:       #ff8a74
--sun:         #f5c842
--mint:        #3be0a4
--text:        #e8f0fe
--text-soft:   #9fb5d0
--text-muted:  #6b84a3
--shadow-card: 0 10px 34px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.30)
--shadow-glow: 0 0 40px rgba(0,210,210,0.22)
```

# Typography

## Font Variables

```css
var(--font-headline)    /* Space Grotesk — Latin headings */
var(--font-headline-ar) /* Alexandria — Arabic headings */
var(--font-body)        /* Inter — Latin body */
var(--font-body-ar)     /* Cairo — Arabic body */
```

Arabic fonts apply automatically via `[lang="ar"]` in globals.css.

## Type Scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero h1 | `clamp(2.6rem, 6.5vw, 5rem)` | 900 | `letter-spacing: -0.03em`, `text-wrap: balance` |
| Section h2 | `clamp(1.75rem, 4vw, 2.5rem)` | 800 | `letter-spacing: -0.02em` |
| Card h3 | `1.25rem` | 700 | Space Grotesk |
| Body | `0.95rem` | 400 | `line-height: 1.65` |
| Overline | `0.72rem` | 700 | `letter-spacing: 0.2em`, uppercase, teal |

## Overline Pattern

```tsx
<p className="overline">Section Label</p>
<h2>Section Heading</h2>
```

The `.overline` class renders with a teal `::before` line decoration.

# Layout

## Container

```css
.container { width: min(1280px, 92vw); margin-inline: auto; }
```

## Sections

```css
.section { padding: 5.5rem 0; }
.section-alt { background: var(--bg-alt); }
```

## Bento Grid (12-col)

```css
.bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; }
.tile-lg   { grid-column: span 7; }
.tile-sm   { grid-column: span 5; }
.tile-half { grid-column: span 6; }
.tile-wide { grid-column: span 8; }
```

## Spacing

8px grid. Use: `0.5rem` `1rem` `1.5rem` `2rem` `3rem` `4rem` `5.5rem`

# Core CSS Patterns

## Glass Card

```css
.glass {
  background: linear-gradient(155deg, rgba(255,255,255,0.9), rgba(246,249,255,0.72));
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  border-radius: var(--r-lg);
}
```

## Tile

```css
.tile {
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  transition: transform 0.28s ease, border-color 0.28s, box-shadow 0.28s;
}
.tile:hover { transform: translateY(-6px); border-color: rgba(0,210,210,0.28); }
```

## Buttons

```css
.btn-primary { background: linear-gradient(135deg, var(--coral), var(--sun)); color: #fff; }
.btn-outline  { border: 1.5px solid var(--teal); color: var(--teal); background: transparent; }
.btn-ghost    { background: rgba(255,255,255,0.08); border: 1px solid var(--border); }
.btn-gold     { background: linear-gradient(135deg, var(--gold), var(--sun)); color: #0c1a33; }
/* All .btn: border-radius: var(--r-full); min-height: 2.75rem; translateY(-2px) on hover */
```

# Key Conventions

1. No Tailwind — CSS in `globals.css` or co-located `.css` files
2. Always `var(--token)` — no hardcoded colors
3. AstroAvatar required for all AI UI — see `astro-avatar` skill
4. `"use client"` on all interactive components
5. New sections: `<section class="section"><div class="container">`
6. RTL-first — always logical CSS properties
