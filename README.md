# Madinaty.AI — Horizon Theme

The official AI-powered community platform for **Madinaty**, Egypt's largest integrated city. Built to bring intelligent, data-driven services to 700,000+ residents across 23 districts in New Cairo.

**Live:** https://madinaty-ai.vercel.app  
**Repo:** https://github.com/engziada/madinaty-ai

---

## About Madinaty

Madinaty is an 8,000-acre master-planned city developed by **Talaat Moustafa Group (TMG)** and managed by **Arab Makan International (AMI)** in New Cairo, Egypt. With 23 districts and over 700,000 residents, it is the largest integrated community in Egypt. Madinaty.AI is the intelligence layer built by the community, for the community.

---

## Features

### Pages & Routes
| Route | Description |
|---|---|
| `/` | English landing page |
| `/ar` | Arabic landing page (RTL) |
| `/vision-future` | Vision & roadmap page (EN) |
| `/ar/vision-future` | Vision & roadmap page (AR) |
| `/coming-soon` | Coming Soon portal (EN) |
| `/ar/coming-soon` | Coming Soon portal (AR) |

### UI & Interactions
- **Horizon Theme** — Midnight blue & electric teal color system with CSS variables
- **Animated hero** — City skyline backdrop with slow zoom + floating teal/blue orbs
- **Scroll-triggered reveal** — `IntersectionObserver` fades elements in as they enter viewport
- **Animated counters** — Value strip counts up (8,000 acres · 700K residents · 23 districts · 100%) on scroll
- **Custom cursor** — Glowing teal dot + lagging ring, expands on hover (hidden on mobile)
- **Coming Soon page** — Live countdown to Sep 1 2026, particle canvas, email notify form
- **Interactive map** — Clickable location nodes for key Madinaty districts
- **AI Chat panel** — Simulated Madinaty Bot conversation UI
- **Bilingual** — Full EN/AR content with RTL layout support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5.15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS (no Tailwind) with CSS variables |
| Fonts | Space Grotesk (headlines) · Inter (body) |
| Deployment | Vercel |
| Package manager | npm |

---

## Project Structure

```
madinaty-ai/
├── public/
│   └── logo.png                     # Brand logo
├── src/
│   ├── app/
│   │   ├── globals.css              # Full design system (variables, components, animations)
│   │   ├── layout.tsx               # Root layout (EN)
│   │   ├── page.tsx                 # EN landing page
│   │   ├── not-found.tsx            # 404 page
│   │   ├── ar/                      # Arabic locale
│   │   │   ├── layout.tsx           # AR layout (dir="rtl")
│   │   │   ├── page.tsx
│   │   │   ├── coming-soon/
│   │   │   └── vision-future/
│   │   ├── coming-soon/
│   │   │   └── page.tsx
│   │   └── vision-future/
│   │       └── page.tsx
│   ├── components/
│   │   ├── LandingPage.tsx          # Main landing page layout
│   │   ├── VisionPage.tsx           # Vision & roadmap page
│   │   ├── ComingSoonPage.tsx       # Coming Soon with countdown & particles
│   │   ├── NavBar.tsx               # Sticky nav with logo, locale circle btn, links
│   │   ├── ChatPanel.tsx            # Madinaty Bot chat UI
│   │   ├── MapPanel.tsx             # Interactive district map
│   │   ├── Footer.tsx               # Site footer
│   │   ├── PageShell.tsx            # Client wrapper: scroll-reveal + cursor
│   │   ├── ValueStrip.tsx           # Animated stat counters (client)
│   │   └── CursorGlow.tsx           # Custom cursor glow effect
│   ├── hooks/
│   │   ├── useScrollReveal.ts       # IntersectionObserver reveal hook
│   │   └── useCounterAnimation.ts  # Scroll-triggered numeric counter hook
│   ├── data/
│   │   └── content.ts               # All EN + AR localized strings & image URLs
│   └── types/
│       └── site.ts                  # Shared TypeScript types (LocaleCode, SiteContent)
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/engziada/madinaty-ai.git
cd madinaty-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run typecheck` | TypeScript check (no emit) |

---

## Design System

### Color Palette (`globals.css` variables)
| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#070d18` | Page background |
| `--surface` | `#0d1520` | Card / panel base |
| `--teal` | `#00d2d2` | Primary accent |
| `--teal-bright` | `#00ffee` | Glows, cursor |
| `--blue` | `#1a6fff` | Secondary accent |
| `--text` | `#e8edf5` | Body text |
| `--text-soft` | `#8a95a8` | Muted text |

### Typography
- **Headlines**: Space Grotesk (700–900)
- **Body**: Inter (400–600)
- Fluid sizing via `clamp()`

### Key Animations
| Name | Description |
|---|---|
| `heroZoom` | Slow backdrop scale 22s alternate |
| `orbFloat` | Floating gradient orbs in hero |
| `fadeUp` | General element entrance |
| `pulse` / `mapPulse` | Status indicators |
| Counter easing | Cubic ease-out on scroll via `useCounterAnimation` |
| `.reveal` → `.revealed` | IntersectionObserver scroll reveal |

---

## Localization

Content is centralized in `src/data/content.ts`. Both `contentEn` and `contentAr` objects implement the `SiteContent` interface. Arabic pages use `dir="rtl"` via the `src/app/ar/layout.tsx` root layout.

To add a new string: update both `contentEn` and `contentAr`, then add the key to `SiteContent` in `src/types/site.ts`.

---

## Deployment

Deployed on **Vercel** via CLI. To redeploy:

```bash
git add -A
git commit -m "your message"
git push
vercel --prod --yes
```

Or connect the GitHub repo to Vercel for automatic deploys on push.

---

## Real Madinaty Facts Integrated

- **8,000 acres** — total city area, New Cairo
- **700,000+ residents** — current population across all phases
- **23 districts** — fully planned residential & commercial zones
- **Developer** — Talaat Moustafa Group (TMG)
- **Management** — Arab Makan International (AMI)
- **Hub** — District B5 AI & Innovation Hub (planned)

---

## License

Proprietary — Madinaty.AI Community Initiative. All rights reserved.
