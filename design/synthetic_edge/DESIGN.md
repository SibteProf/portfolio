---
name: Synthetic Edge
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The design system is engineered for high-end developer portfolios, balancing technical precision with creative flair. The brand personality is "The Human Architect"—combining a rigorous, professional foundation with approachable, hand-drawn elements that signal individuality.

The visual style is **Modern Dark Mode** with **Glassmorphic** accents. It utilizes deep layering, subtle backdrop blurs, and "1px border" precision to create a high-fidelity, desktop-class experience. To differentiate from standard SaaS templates, the system introduces "Sticker-style" badges and expressive hand-drawn underlines, injecting a sense of craft into a high-tech environment.

## Colors
The palette is centered on a deep, obsidian base called "Space Gray" (#0B0E14), which provides the high-contrast foundation needed for professional coding environments. 

- **Primary (Electric Indigo):** Used for call-to-action buttons, active states, and brand-defining focal points.
- **Secondary (Neon Mint):** Reserved for success states, code syntax highlighting, and small "status" indicators to provide a fresh, energetic counterpoint.
- **Surfaces:** UI containers use a slightly lighter "Slate Gray" (#161B22) to establish depth.
- **Accents:** Use a low-opacity version of Electric Indigo for "glow" effects and subtle gradients.

## Typography
This design system employs a tri-font strategy to delineate content types clearly:

1.  **Plus Jakarta Sans:** Used for all major headings. It should be set with tight letter-spacing and bold weights to feel impactful and modern.
2.  **Inter:** The workhorse for body text, descriptions, and long-form content. It ensures maximum readability against dark backgrounds.
3.  **JetBrains Mono:** Dedicated to code snippets, terminal outputs, and small labels (like dates or tags). This reinforces the "developer" identity.

**Hand-drawn Accents:** Key phrases in headlines may be styled with a custom SVG "underline" path in Electric Indigo to break the rigid geometry of the layout.

## Layout & Spacing
The system uses a **Fixed Grid** model for desktop, centered within a 1200px container to maintain readability. 

- **Grid:** 12-column system for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit drives all margins and paddings. 
- **Sectioning:** Large vertical gaps (80px+) are encouraged between portfolio projects to give the work "room to breathe."
- **Terminal Layouts:** For code sections, use a "windowed" layout with a fixed aspect ratio and internal padding of 24px (md) to simulate a real IDE.

## Elevation & Depth
Depth is achieved through a combination of **Glassmorphism** and **Subtle Glows**:

- **Level 1 (Base):** Space Gray background.
- **Level 2 (Cards):** Surface color with a 1px solid border (`rgba(255,255,255,0.05)`).
- **Level 3 (Modals/Overlays):** Backdrop blur (12px) with a semi-transparent surface and a soft Indigo outer glow (`box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1)`).

Borders are essential; never use shadows without a 1px border to define the edge. This maintains the "sleek" technical feel.

## Shapes
The design system follows a **Rounded** (0.5rem) language for standard components like cards and buttons. 

- **Sticker Badges:** These are the exception, using "Pill-shaped" (1rem+) corners and a thicker 2px border to look like physical stickers.
- **Code Blocks:** Should have slightly tighter corners (0.25rem) to mimic the appearance of text editors.

## Components
- **Buttons:** Primary buttons use a solid Electric Indigo fill with a white text label. Secondary buttons are "Ghost" style with a 1px border that glows on hover.
- **Sticker Badges:** Small chips used for tech stacks (e.g., "React", "Rust"). They use high-contrast backgrounds and are often tilted by 2-3 degrees for a playful, analog feel.
- **Input Fields:** Darker than the surface color, using a Neon Mint cursor and a 1px Indigo border focus state.
- **Project Cards:** Feature a subtle glassmorphic overlay for the project title that appears on hover, blurring the project screenshot behind it.
- **Terminal Component:** A custom container with "red-yellow-green" window controls in the top left, using JetBrains Mono for all internal text.