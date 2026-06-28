---
name: interaction-patterns
description: Motion, transitions, micro-interactions, and scroll behaviors for Madinaty AI — intentional, performant, and RTL-safe.
---

# Use when

Use this skill when adding motion, hover states, page transitions, loading feedback, scroll reveals, or any animated interaction to the platform.

# Core rules

- Motion must **clarify state or hierarchy** — never decorative noise
- Prefer **150ms–350ms** for most UI transitions; slower only when cinematic effect is justified
- Always provide **reduced-motion fallbacks**
- Pause animations when **`data-tab-hidden`** is set (tab not visible)
- RTL must not break any transform-based animation — test both directions

---

# Timing & Easing Reference

| Use case | Duration | Easing |
|---|---|---|
| Button hover | `180ms` | `ease` |
| Card hover lift | `280ms` | `ease` |
| Modal slide in | `340ms` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Modal fade out | `200ms` | `ease-in` |
| Toast slide up | `250ms` | `ease-out` |
| Scroll reveal | `500ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Page transition | `300ms` | `ease` |
| Confetti burst (Astro) | `1.2s` | `ease-out forwards` |
| Glow pulse | `3s` | `ease-in-out infinite` |
| Background orb float | `9s–22s` | `ease-in-out infinite alternate` |

---

# Patterns

## Hover lift — card / tile

```css
.tile {
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}
.tile:hover {
  transform: translateY(-6px);
  border-color: rgba(0, 210, 210, 0.28);
  box-shadow: var(--shadow-card), 0 0 28px rgba(0, 210, 210, 0.10);
}
```

## Hover lift — button

```css
.btn {
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: scale(0.97); }
```

## Modal enter / exit

```css
/* Enter */
@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal { animation: modalSlideUp 340ms cubic-bezier(0.22, 1, 0.36, 1) both; }

/* Overlay */
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.modal-overlay { animation: overlayFadeIn 200ms ease both; }
```

## Scroll reveal

```tsx
// Apply .reveal class; IntersectionObserver adds .visible
useEffect(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
```

## Staggered reveal (card grids)

```css
.tile:nth-child(1) { transition-delay: 0ms; }
.tile:nth-child(2) { transition-delay: 60ms; }
.tile:nth-child(3) { transition-delay: 120ms; }
.tile:nth-child(4) { transition-delay: 180ms; }
```

## Focus ring (keyboard nav)

```css
:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
  border-radius: var(--r-sm);
}
```

Never use `outline: none` without a visible replacement.

## Teal glow pulse (active/live states)

```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 6px var(--teal); opacity: 1; }
  50%       { box-shadow: 0 0 2px var(--teal); opacity: 0.5; }
}
.live-dot {
  animation: glowPulse 1.8s ease-in-out infinite;
}
```

## Loading shimmer (skeleton)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-mid) 0%,
    var(--surface-hi) 50%,
    var(--surface-mid) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Platform-pillar hover slide (RTL-safe)

```css
.platform-pillar {
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.platform-pillar:hover { transform: translateX(4px); }
[dir="rtl"] .platform-pillar:hover { transform: translateX(-4px); }
```

## Stat count-up (scroll enter)

```tsx
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(t * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}
```

---

# Pattern output template

When documenting a new interaction pattern, use:

```md
## [Pattern name]
- Trigger: [what initiates it]
- Visual change: [what the user sees]
- Timing: [duration + easing]
- RTL: [any direction-specific adjustments]
- Accessibility fallback: [behavior when reduced-motion is active]
- Implementation hint: [CSS class, keyframe name, or React hook]
```

---

# Reduced-motion fallbacks

```css
/* Kill all custom animations for users who prefer it */
[data-reduce-motion] *,
[data-reduce-motion] *::before,
[data-reduce-motion] *::after {
  animation-duration: 0.001ms !important;
  transition-duration: 0.001ms !important;
}

/* Pause when tab is not visible */
[data-tab-hidden] .animated {
  animation-play-state: paused;
}
```

The `data-reduce-motion` attribute is set by the boot script in `layout.tsx` — no manual detection needed in components.
