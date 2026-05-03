---
name: "abijith.sh"
description: "Personal portfolio and blog of Abijith S — one backend engineer's home on the web"
colors:
  clay: "oklch(47% 0.09 155)"
  clay-light: "oklch(69% 0.09 155)"
  unbleached: "oklch(97.5% 0.007 80)"
  inkstone: "oklch(17% 0.014 50)"
  washi: "oklch(95% 0.010 80)"
  pith: "oklch(92% 0.013 78)"
  sandstone: "oklch(54% 0.012 65)"
  linen-edge: "oklch(88% 0.015 74)"
  ironwood: "oklch(13.5% 0.016 50)"
  warm-offwhite: "oklch(93% 0.010 75)"
  workshop: "oklch(18% 0.018 50)"
  workbench: "oklch(22% 0.018 50)"
  warm-stone: "oklch(58% 0.014 62)"
  iron-edge: "oklch(28% 0.020 50)"
  kiln-red: "oklch(45% 0.22 18)"
  ember-red: "oklch(63% 0.22 20)"
typography:
  display:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  title:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  full: "9999px"
components:
  content-card:
    backgroundColor: "washi"
    textColor: "inkstone"
    rounded: "md"
    padding: "20px"
  content-card-hover:
    backgroundColor: "pith"
    borderColor: "clay"
    rounded: "md"
  tag-pill:
    backgroundColor: "clay (10% alpha)"
    textColor: "clay"
    rounded: "full"
    padding: "2px 8px"
  icon-button:
    textColor: "clay"
    rounded: "sm"
    padding: "8px"
  nav-link:
    textColor: "sandstone"
---

# Design System: abijith.sh

## 1. Overview

**Creative North Star: "The Craftsman's Desk"**

Warm materials, everything in its place, the tools of someone who takes pride in their work. This system draws from the feeling of a well-organized workshop at different hours of the day: unbleached paper under good afternoon light, the same desk by lamplight in the evening. Every surface is intentional. Nothing is ornamental for its own sake.

**Color reference:** _A well-kept workshop at different hours of the day — green-handled precision tools on unbleached paper under good afternoon light, the same bench by lamplight in the evening. Green as the color of systems that work: a successful build, a healthy indicator light, a well-maintained machine. Every surface is intentional. Nothing is ornamental for its own sake._

The palette uses warm neutrals paired with a deep evergreen accent. The green breaks from the warm-red/terracotta convention and gives the site a grounded, technical identity. The light theme is unbleached paper under good light; the dark theme is the same workshop after sundown, with the amber warmth of the desk lamp casting everything in the same hue family. Green carries identity and interaction; warm neutrals carry the canvas.

**Color strategy: Committed** — Green carries ~40% of the site's identity surfaces: hero role text, the horizontal rule below the name, prose links, tag pills, active nav states, icon buttons, TOC active headings, and reading progress. The canvas is never green. Green marks identity and interaction. That's its job.

**Key Characteristics:**

- All OKLCH colors. Every neutral is tinted toward warmth (chroma ≥ 0.007); no pure black, no pure white.
- Committed color strategy: Clay is the system's voice across both themes. The hue is the same; only the lightness changes between light (L=47%) and dark (L=69%).
- Dark theme is warm-shifted (amber hue 50°), not cool. Both modes feel like the same room.
- Single typeface (Satoshi) carrying the entire hierarchy through weight and scale.
- Flat by default. Elevation emerges from tonal layering, not static shadows.

## 2. Colors

### Accent

- **Evergreen** (`oklch(47% 0.09 155)`): The sole accent. Deep forest green, grounded and confident. Used for the logo, horizontal rule, prose links, tag pills, active nav, icon buttons, TOC active headings, and reading progress. Passes WCAG AA on the light background. Never used as a background fill or large surface color.
- **Evergreen Light** (`oklch(69% 0.09 155)`): Dark theme variant. Same hue family, higher lightness. Passes WCAG AA on the dark background. Keeps the same character — green indicator light caught in warm lamplight.

### Light palette — "Unbleached Paper"

- **Unbleached** (`oklch(97.5% 0.007 80)`): Light background. Barely-warm off-white, like quality unbleached paper stock. Never pure white.
- **Inkstone** (`oklch(17% 0.014 50)`): Light foreground. Warm near-black, clay-tinted. Like quality printing ink. Warmer and darker than the previous carbon (#2c2c2c).
- **Washi** (`oklch(95% 0.010 80)`): Card and secondary surfaces. One step deeper than Unbleached.
- **Pith** (`oklch(92% 0.013 78)`): Popover and hover surfaces. The deepest light neutral.
- **Sandstone** (`oklch(54% 0.012 65)`): Muted text. Dates, descriptions, metadata. Warm gray. Passes WCAG AA (≈4.7:1).
- **Linen Edge** (`oklch(88% 0.015 74)`): Borders and dividers. Warm, visible, not harsh.
- **Kiln Red** (`oklch(45% 0.22 18)`): Destructive / error states. Pure cardinal red — distinguishable from Clay (different hue at 18° vs 30°).

### Dark palette — "Workshop at Night"

- **Ironwood** (`oklch(13.5% 0.016 50)`): Dark background. Warm amber-shifted near-black, like aged ironwood or a very dark walnut. Unlike the previous midnight (#1a1a1d) which was almost-cool.
- **Warm Off-White** (`oklch(93% 0.010 75)`): Dark foreground. Off-white with warmth.
- **Workshop** (`oklch(18% 0.018 50)`): Dark card. Slightly elevated warm surface.
- **Workbench** (`oklch(22% 0.018 50)`): Dark popover. Deeper warm surface.
- **Warm Stone** (`oklch(58% 0.014 62)`): Dark muted text. Warm stone. Passes WCAG AA (≈4.7:1).
- **Iron Edge** (`oklch(28% 0.020 50)`): Dark borders. Warm, just visible against the background.
- **Ember Red** (`oklch(63% 0.22 20)`): Destructive / error states in dark mode.

### Named Rules

**The Committed Strategy Rule.** Green carries 30–40% of the site's visual weight. It is not a token accent used once in the nav. Every identity surface and interactive state uses green. Diluting it defeats the system.

**The Surface Boundary Rule.** Committed ≠ drenched. Page backgrounds and body text are never green. Green marks things you interact with or things that identify the site. The canvas stays warm neutral.

**The No-Neutrals Rule.** Every color in the system has chroma ≥ 0.007. Pure black (#000) and pure white (#fff) are prohibited. Even the darkest dark and brightest light carry a perceptible tint.

**The Same-Room Rule.** Both light and dark themes use the same warm-amber hue direction (H=50–80° in OKLCH). Neither theme is cool. The dark is not the opposite of the light — it's the same desk at a different hour.

## 3. Typography

**Display Font:** Satoshi (system-ui, sans-serif fallback)  
**Body Font:** Satoshi (same family; weight and scale create hierarchy)  
**Label Font:** Satoshi (uppercase, wide tracking distinguishes labels from body)

**Character:** Satoshi is a geometric sans with just enough warmth in its terminals to feel human. Single-family: hierarchy lives entirely in weight (400 to 700) and scale (0.8125rem to 3.75rem). No serif/sans personality crutch.

### Hierarchy

- **Display** (700, clamp 2.25rem–3.75rem, line-height 1.1, tracking -0.025em): Hero name. Single largest element. Negative tracking keeps it confident.
- **Headline** (600, 1.5rem, line-height 1.3): Blog post titles, section headings.
- **Title** (600, 1.25rem, line-height 1.4): Card titles, secondary headings.
- **Body** (400, 1rem, line-height 1.625): All running content. Max 65–75ch line length.
- **Label** (600, 0.8125rem, letter-spacing 0.05em, uppercase): Section markers. Used sparingly.

### Named Rules

**The Scale-Only Rule.** One typeface means hierarchy from weight and size contrast alone. Adjacent heading levels must differ by ≥1.25× in size or one full weight step. Flat hierarchies are prohibited.

**The Writing-First Rule.** Blog prose typography takes priority. Body line height (1.625) and line length (65–75ch) are tuned for long-form reading comfort. Everything else accommodates this.

## 4. Elevation

Flat by default. Depth from tonal layering, not shadows. Cards (Washi) sit one step deeper than the page (Unbleached); popovers (Pith) one step deeper still. The eye reads the tonal step as depth without shadow.

Shadows appear exclusively on hover feedback. The card hover state: subtle lift shadow (4px 12px at 6% opacity light / 30% dark) + translateY(-2px). Never applied to non-interactive elements.

### Named Rules

**The Flat-By-Default Rule.** Static shadows prohibited. Elevation through tonal surface steps only. Shadows reserved for interactive hover feedback.

## 5. Components

### Content Card

- **Background:** Card surface at rest. Popover surface on hover (one tonal step deeper).
- **Border:** None. Tonal surface difference provides visual separation.
- **Hover behavior:** Card scales 1.01% with ease-out, background deepens one tonal step, arrow icon shifts to green, 200ms ease-out.

### Tag Pill

- **Shape:** Fully rounded.
- **Background:** Clay at 10% alpha.
- **Text:** Clay.
- **No border.** Padding: 2px 8px.

### Navigation Link

- **Text:** Sandstone at rest. Inkstone / Warm Off-White on hover.
- **Underline:** Invisible at rest. Grows left-to-right (200ms) in Clay on hover.

### Header

- **Logo:** "AS" in green, 20px, semibold. The green anchor of the page.
- **Border:** Bottom Linen Edge at 50% opacity.

### Footer

- **Middot** between year and author name: green. The only green in the footer.
- **Border:** Top Linen Edge at 50% opacity.

## 6. Do's and Don'ts

### Do:

- **Do** use green on identity markers (logo, accent rules, section bars), interactive states (card hover tonal shift, nav underlines, back links), prose links, tag pills, icon buttons, reading progress, TOC active headings. Green is the system's voice.
- **Do** tint every neutral toward warmth (OKLCH hue 50–80°). No surface should feel cold.
- **Do** make hover states tangible. Cards scale and deepen. Nav links grow underlines. Arrows shift.
- **Do** cap body text at 65–75ch. Reading comfort is non-negotiable.
- **Do** use tonal surface steps (Unbleached > Washi > Pith) instead of shadows for depth.
- **Do** keep both light and dark themes warm. The dark is not the opposite of the light.

### Don't:

- **Don't** use pure black (#000) or pure white (#fff). Every surface and text color is tinted.
- **Don't** use Clay or terracotta as the accent. The system has moved to a green accent. Update any remaining clay references.
- **Don't** use side-stripe borders (border-left > 1px as accent). Blockquotes use a 2px left border; that's the one exception.
- **Don't** use gradient text (background-clip: text with a gradient). Emphasis comes from weight or size.
- **Don't** apply glassmorphism decoratively. All surfaces are opaque and tonal.
- **Don't** add static shadows to any element. Shadows are for hover feedback only.
- **Don't** use Clay as a large background fill or body text color. It marks identity and interaction, not surfaces.
- **Don't** let the dark theme go cool. Ironwood (warm amber-shifted dark) is not negotiable.
- **Don't** add 3D scenes, particle effects, scroll-jacking, or WebGL showcases. The craft shows in precision, not spectacle.
