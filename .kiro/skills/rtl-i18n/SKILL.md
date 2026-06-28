---
name: rtl-i18n
description: RTL layout rules, logical CSS properties, Arabic typography, and bilingual Arabic/English patterns for Madinaty AI.
---

# Use when

Use this skill whenever writing CSS, building layouts, or rendering user-facing text. Arabic is the default language — all layouts must work RTL-first.

# Locale Structure

- **Default:** Arabic (`/ar`), `dir="rtl"`, `lang="ar"`
- **English:** `/en`, `dir="ltr"`, `lang="en"`
- Root `/` → redirects to `/ar`

# Component Pattern

```tsx
import type { LocaleCode, SiteContent } from "@/types/site";

export function MyComponent({ locale, content }: { locale: LocaleCode; content: SiteContent }) {
  const isAr = locale === "ar";
  return <h2>{isAr ? content.titleAr : content.titleEn}</h2>;
}
```

# CSS Logical Properties (mandatory)

| ❌ Physical | ✅ Logical |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `float: left` | `float: inline-start` |

# Arabic Typography

- Body: `Cairo` via `var(--font-body-ar)`
- Headings: `Alexandria` via `var(--font-headline-ar)`
- Applied automatically by globals.css via `[lang="ar"]`
- Arabic needs slightly larger `line-height` — verify at 0.95rem

# Directional Icons

```tsx
import { ChevronRight, ChevronLeft } from "lucide-react";
const ArrowIcon = isAr ? ChevronLeft : ChevronRight;
<ArrowIcon size={18} />
```

Or via CSS:
```css
[dir="rtl"] .arrow-icon { transform: scaleX(-1); }
```

# BrandLogo Exception

`BrandLogo` is always rendered LTR regardless of page direction — never mirror it.

# Positioning Overlays

```css
/* Preferred — logical and direction-safe */
.dropdown-menu {
  inset-inline-start: 0;
  inset-block-start: calc(100% + 0.5rem);
}

/* Fallback when physical coords are unavoidable */
[dir="ltr"] .dropdown-menu { left: 0; }
[dir="rtl"] .dropdown-menu { right: 0; }
```

# Number & Date Formatting

```tsx
new Intl.NumberFormat(isAr ? "ar-EG" : "en-US").format(value);

new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
  year: "numeric", month: "long", day: "numeric"
}).format(new Date(value));
```

# Common Bilingual Pairs

```tsx
// Actions
isAr ? "إرسال" : "Submit"
isAr ? "إلغاء" : "Cancel"
isAr ? "تأكيد" : "Confirm"
isAr ? "إغلاق" : "Close"

// Nav
isAr ? "الرئيسية" : "Home"
isAr ? "من نحن" : "About"
isAr ? "تواصل معنا" : "Contact"

// AI / Chat
isAr ? "مساعد مدينتي AI" : "Madinaty AI Assistant"
isAr ? "مدينتي شات" : "Madinaty Chatbot"
isAr ? "اسألني أي شيء..." : "Ask me anything..."

// States
isAr ? "جاري التحميل..." : "Loading..."
isAr ? "حدث خطأ" : "Something went wrong"
isAr ? "تم بنجاح!" : "Done!"
```

# Accessibility

- `lang` attribute must match the actual text language on the element
- Mixed content: `<span lang="en">English label</span>` inside Arabic page
- Screen readers use `lang` to switch TTS voice — be accurate
