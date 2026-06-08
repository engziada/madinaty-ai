# Design

## Theme
- **Name:** Horizon Theme
- **Style:** Futuristic, visionary dark mode with neon accents and high contrast.
- **Base Background:** Midnight Blue (`#070d18` / `oklch(11.8% 0.024 242.3)`)
- **Visual Feel:** Glassmorphic containers, subtle glowing borders, slow ambient floats, and precise alignments.

## Color Palette

### Core Colors
| Color Token | Hex Code | OKLCH | Usage |
|---|---|---|---|
| `--bg` | `#070d18` | `oklch(11.8% 0.024 242.3)` | Main page background |
| `--surface` | `#0d1520` | `oklch(15.2% 0.022 240)` | Card and panel surfaces |
| `--border` | `#1e293b` | `oklch(23% 0.029 243.3)` | Subtle grid and divider borders |
| `--teal` | `#00d2d2` | `oklch(76.2% 0.16 195)` | Primary brand accent, glowing details |
| `--teal-bright` | `#00ffee` | `oklch(91.5% 0.165 180)` | High-intensity glows, active indicators |
| `--blue` | `#1a6fff` | `oklch(53.2% 0.23 255)` | Secondary accent, primary action buttons |
| `--text` | `#e8edf5` | `oklch(93.8% 0.012 240)` | High-contrast body text |
| `--text-soft` | `#8a95a8` | `oklch(65.1% 0.018 240)` | Muted copy and supportive text |

## Typography

### Families
- **Display & Headings:** Space Grotesk (700–900 weight)
- **Body & Controls:** Inter (400–600 weight)

### Scale
- **Hero Title:** `clamp(2.5rem, 6vw, 4.5rem)` (letter-spacing: `-0.02em`, `text-wrap: balance`)
- **Section Heading (h2):** `clamp(1.75rem, 4vw, 2.5rem)` (letter-spacing: `-0.01em`, `text-wrap: balance`)
- **Card Title (h3):** `1.25rem` (Space Grotesk, bold)
- **Body Text:** `0.95rem` (Inter, line-height: `1.6`)

## Layout & Rhythm
- **Grid Spacing:** Variable spacing based on 8px grid system.
- **Containers:** Max width `1200px` for optimal readability and content centering.
- **RTL Support:** Native mirroring using `dir="rtl"` attribute with flipped arrow symbols.

## Components & Micro-interactions
- **Glass Cards:**
  - Background: `rgba(13, 21, 32, 0.6)`
  - Backdrop Filter: `blur(12px)`
  - Border: `1px solid var(--border)`
  - Hover: subtle translates (`translateY(-2px)`) and glowing teal/blue borders.
- **Buttons:**
  - `.btn-primary`: solid electric blue, teal hover transitions with glow.
  - `.btn-secondary`: transparent background, solid border, white/teal hover text.
- **Animations:**
  - Smooth transitions for hover states (`transition: all 0.2s ease`).
  - Scroll reveals using IntersectionObserver (`.reveal` classes).
