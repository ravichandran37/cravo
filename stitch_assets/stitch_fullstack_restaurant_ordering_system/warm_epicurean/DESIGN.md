---
name: Warm Epicurean
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#5a4138'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a73a00'
  primary: '#a33900'
  on-primary: '#ffffff'
  primary-container: '#cc4900'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb599'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#00685f'
  on-tertiary: '#ffffff'
  tertiary-container: '#008378'
  on-tertiary-container: '#f4fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-hero:
    fontFamily: Epilogue
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined, hospitable, and sensory-rich culinary atmosphere. It balances the precision of high-end culinary craft with the comforting warmth of an intimate dining room. The aesthetic rests firmly in modern tactile minimalism: uncluttered, structured, and expansive, yet rich in organic warmth through delicate borders, generous whitespace, and radiant, appetizing accents.

### Target Audience & Emotional Intent
- **Audience:** Discerning diners, culinary enthusiasts, and modern patrons seeking effortless table reservations, curated menus, private dining bookings, and online culinary ordering.
- **Tone:** Inviting, reliable, discerning, sensory, and quietly confident.
- **Experience:** Evokes the anticipation of a thoughtfully plated dish—clean, deliberate compositions where typography leads, warm terracotta accents guide intuition, and creamy foundational surfaces reduce optical fatigue.

## Colors

The palette is anchored by natural culinary materials: roasted spice, rich clay, and balanced charcoal slate. Light mode serves as the primary canvas, employing soft cream tones rather than sterile pure white to convey hospitality and organic comfort.

### Palette Architecture
- **Primary (`#ea580c` / Terracotta Accent):** Evokes fire, roasted spices, and saffron warmth. Reserved for key actions, price tags, active order states, and critical focal elements. A lighter tint (`#f97316`) serves as interactive hover feedback.
- **Secondary (`#f59e0b` / Saffron Amber):** A luminous glow used for rating stars, chef selections, seasonal callouts, and secondary dietary tags.
- **Tertiary (`#0d9488` / Fresh Sage):** An earthy herb green used thoughtfully for vegan/vegetarian identifiers, sustainability badges, and affirmative status indicators.
- **Neutral Charcoal Slate (`#1e293b`):** Deep, legible tone for primary typography, icons, and structured outlines, avoiding harsh pure black.
- **Backgrounds & Surfaces:**
  - Base canvas: `#fcfbf9` (Fresh Cream).
  - Cards & modal surfaces: `#ffffff` (Pure Crisp White) framed by delicate borders.
  - Subdued containers: `#f5f2eb` (Warm Bone).
  - Dividers & borders: `#e8e4dc` (Low-contrast linen tone).

## Typography

The pairing combines the architectural character of Epilogue with the rounded, humanistic clarity of Plus Jakarta Sans. Epilogue provides an editorial, bistro-like atmosphere across large titles and section headers without leaning into historic clichés. Plus Jakarta Sans handles menu item descriptions, prices, specifications, and UI controls with crisp legibility across both compact screens and large displays.

## Layout & Spacing

A structured 12-column fluid grid defines large viewports (max container width: 1280px), transitioning to an 8-column layout on tablets and a 4-column layout on mobile viewports.

### Rhythm and Flow
- Spacing follows an organic 4px/8px rhythm. Generous vertical padding creates breathing room reminiscent of high-end editorial menus.
- Menu grids feature generous element gaps to prevent dense visual clutter and allow food imagery and descriptions equal prominence.
- Section dividers remain minimal, relying on space rather than structural horizontal rules wherever possible.

## Elevation & Depth

To sustain a warm and grounded dining atmosphere, elevation minimizes cold synthetic dropshadows. Depth relies on tonal surface layering accompanied by warm ambient diffusion.

### Depth Tiers
- **Tier 0 (Base Canvas):** `#fcfbf9` provides the foundational dining room floor.
- **Tier 1 (Cards & Panels):** Pure white (`#ffffff`) surfaces lifted subtly by a crisp 1px stroke (`#e8e4dc`) and an ambient, warm shadow (`box-shadow: 0 4px 20px -2px rgba(30, 41, 59, 0.04), 0 2px 6px -1px rgba(234, 88, 12, 0.02)`).
- **Tier 2 (Floating Modals & Flyouts):** Elevated cards, cart overlays, and table reservation drawers carry an expanded warm shadow (`box-shadow: 0 16px 32px -4px rgba(30, 41, 59, 0.08), 0 4px 12px -2px rgba(234, 88, 12, 0.04)`) with crisp containment borders.

## Shapes

The design uses a balanced rounded geometry (level `2` = 0.5rem / 8px default radius). This provides approachable, soft corners across cards, buttons, and form controls without straying into overly juvenile pill shapes for primary structures. Accent tags and floating action pills use targeted complete rounding to signal quick interactivity.

## Components

### Buttons
- **Primary:** Terracotta fill (`#ea580c`), crisp white text, `0.5rem` border radius, `0.75rem 1.5rem` padding. Gentle amber luminescence on hover (`#f97316`).
- **Secondary:** Off-white background, 1px stroke in `#e8e4dc`, slate typography (`#1e293b`). Hover shifts background to `#f5f2eb`.
- **Text / Ghost:** Slate text with subtle terracotta underline indicator upon active state.

### Food Badges & Chips
- Compact, uppercase or title-case micro tags with `0.25rem 0.625rem` padding and rounded-full borders.
- **Chef's Pick:** Saffron amber surface tint (`#fef3c7`) with rich amber text (`#b45309`).
- **Organic / Vegan:** Fresh sage tint (`#ccfbf1`) with deep teal text (`#0f766e`).
- **Spicy / House Signature:** Warm terracotta tint (`#ffedd5`) with terracotta text (`#c2410c`).

### Cards & Menu Items
- **Product Card:** Pure white surface, 1px solid `#e8e4dc` border, `1rem` radius. Food imagery occupies the top with a subtle 16:10 or 1:1 aspect ratio, preserving appetizing highlights. Price appears in bold slate typography adjacent to the item title.
- **Interactive State:** Hover lifts the card 2px with an enhanced border tone (`#cbd5e1`).

### Form Controls & Inputs
- Height 44px (minimum touch-friendly target). Background `#ffffff`, border 1px solid `#cbd5e1`. Focus transitions to a clean 1.5px ring in primary terracotta (`#ea580c`) with a soft glow blur.

### Table Reservation & Time Slots
- Interactive time-slot chips styled as light pill buttons (`#ffffff` with `#e8e4dc` border). Selected state switches to solid charcoal slate (`#1e293b`) with white text to indicate unequivocal commitment.