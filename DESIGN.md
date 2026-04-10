# Design Brief

## Direction
Sunder Shanti Hotel Management — warm, professional hospitality UI designed for fast staff workflows and guest-centric operations.

## Tone
Editorial hospitality aesthetic with cream warmth and sage green anchors — inviting and trustworthy, never cold or corporate.

## Differentiation
Sage green primary accent with warm gold secondary highlights create warmth without cliché; hotel-branded header with integrated logo sets commercial hospitality tone.

## Color Palette

| Token      | OKLCH           | Role                           |
| ---------- | --------------- | ------------------------------ |
| background | 0.96 0.015 75   | Warm cream, minimal visual tax |
| foreground | 0.2 0.03 50     | Deep charcoal, high contrast   |
| card       | 0.98 0.01 75    | Content surface, subtle warmth |
| primary    | 0.52 0.12 160   | Sage green, trust & calm       |
| accent     | 0.65 0.14 70    | Warm gold, highlights & CTAs   |
| muted      | 0.92 0.02 75    | Subtle backgrounds, secondary  |
| destructive| 0.5 0.2 25      | Alert red for warnings         |

## Typography
- Display: Lora — editorial headings, section titles, logo text. Serif elegance suits hospitality.
- Body: DM Sans — form labels, table content, micro-copy. Clean, fast scanning.
- Scale: h1 `text-5xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth
Subtle shadows with soft warm tones (no stark black); cards elevated via `shadow-elevated` (0 4px 12px with 8% black opacity). Borders use sage green at 30% opacity for visual lightness.

## Structural Zones

| Zone    | Background       | Border                  | Notes                                  |
| ------- | ---------------- | ----------------------- | -------------------------------------- |
| Header  | card (0.98)      | muted-foreground 15%    | Hotel logo, search, user menu          |
| Sidebar | charcoal (0.18)  | sidebar-border          | Navigation, warm gold on hover/active  |
| Content | background       | —                       | Cream base; card sections have borders |
| Footer  | muted (0.92)     | border top              | Secondary info, light separator       |

## Spacing & Rhythm
Dense grouping with 1.5rem gaps between sections; micro-spacing 0.75rem within components. Cards have 1.5rem padding. Consistent 0.625rem border-radius across all interactive elements.

## Component Patterns
- Buttons: sage green primary, warm gold accent variant. Rounded 0.625rem. Hover darkens via opacity.
- Cards: cream background with `hotel-accent-border` (sage green, 30% opacity). Shadow elevation on hover.
- Badges: muted background with foreground text. Small rounded (0.5rem).
- Inputs: cream background with sage green ring on focus. Subtle border.

## Motion
- Entrance: fade-in 300ms ease-out for cards on initial load.
- Hover: `transition-smooth` (all 0.3s cubic-bezier) on interactive elements. Slight scale (1.02) and shadow increase.
- Decorative: none—focus on information clarity over animation.

## Constraints
- No dark mode complexity; light theme only for staff use and screen brightness compatibility.
- Max 2 fonts (Lora + DM Sans) to maintain performance and brand consistency.
- Sage green primary, warm gold accent, no tertiary accent—forces intentional color usage.
- Cards always have visible borders or subtle shadow distinction—no ghost cards.

## Signature Detail
Sage green 30% opacity borders on all cards create a soft visual system that whispers hotel branding without overwhelming the interface—hospitality through restraint.
