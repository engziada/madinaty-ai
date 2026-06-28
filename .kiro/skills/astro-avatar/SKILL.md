---
name: astro-avatar
description: Rules and usage patterns for AstroAvatar — the mandatory AI mascot for all AI-related UI on Madinaty AI platform.
---

# Use when

Use this skill whenever building any AI-related UI: chat interfaces, loading states, success/error screens, onboarding flows, empty states, or any feature where the AI is acting.

# Rule

**Never use a generic icon, spinner, or illustration where Astro applies.**
If a new AI feature is requested without AstroAvatar, flag it and add it.

# Import

```tsx
import { AstroAvatar } from "@/components/AstroAvatar";
```

# API

```tsx
<AstroAvatar mood="idle" size="md" />
```

## mood prop

| Value | Animation | When to use |
|---|---|---|
| `idle` | Tail wag + eye blink | Default / passive state |
| `talking` | Mouth move + head bob | AI generating a response |
| `listening` | Both ears perk | Waiting for user input |
| `celebrating` | Jump + fast tail + confetti | Success, completion, achievement |
| `thinking` | AI badge spins | Processing, loading |
| `error` | Head shakes | Error state, failed request |
| `waving` | Right paw waves | Welcome, FAB trigger, greeting |

## size prop

| Value | px | Use case |
|---|---|---|
| `sm` | 60 | Sidebar, chat input corner |
| `md` | 90 | Standard — modal headers, inline |
| `lg` | 120 | Modal headers, section intros |
| `xl` | 180 | Success / empty screens |
| `huge` | 260 | Full-screen celebrations, hero |

# Usage Patterns

## FAB trigger
```tsx
<button className="chat-fab" onClick={() => setOpen(true)}>
  <AstroAvatar mood="waving" size="md" />
  <span className="chat-fab-label">{isAr ? "مدينتي شات" : "Madinaty Chatbot"}</span>
</button>
```

## Chat modal header
```tsx
<div className="chat-modal-title">
  <AstroAvatar mood="talking" size="sm" />
  <span>{isAr ? "مساعد مدينتي AI" : "Madinaty AI Assistant"}</span>
</div>
```

## Loading / thinking
```tsx
{isLoading && <AstroAvatar mood="thinking" size="lg" />}
```

## Success screen
```tsx
<AstroAvatar mood="celebrating" size="xl" />
<h2>{isAr ? "تم بنجاح!" : "All done!"}</h2>
```

## Error state
```tsx
<AstroAvatar mood="error" size="md" />
<p>{isAr ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong. Try again."}</p>
```

## Empty state
```tsx
<AstroAvatar mood="idle" size="xl" />
<p>{isAr ? "اسألني أي شيء عن مدينتي" : "Ask Astro anything about Madinaty."}</p>
```

# Styling notes

- Uses platform tokens internally: `--teal`, `--teal-dim`, `--coral`, `--surface`, `--surface-hi`, `--text-muted`
- Auto-adapts to light/dark — no extra theming needed
- Mobile: `lg` → 80px, `xl` → 140px at `max-width: 600px`

# Do not

- Replace with generic spinner, robot emoji, or chat bubble icon
- Use inside non-AI contexts (regular form buttons, nav items)
- Override internal SVG colors via inline styles — use mood/size props only
