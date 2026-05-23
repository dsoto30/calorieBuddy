---
name: Calorie Buddy
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5c3f40'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0037'
  primary: '#b80035'
  on-primary: '#ffffff'
  primary-container: '#e11d48'
  on-primary-container: '#fffaf9'
  inverse-primary: '#ffb3b6'
  secondary: '#6f46b9'
  on-secondary: '#ffffff'
  secondary-container: '#b188ff'
  on-secondary-container: '#44118d'
  tertiary: '#60595e'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a7277'
  on-tertiary-container: '#fffaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b6'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920028'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d3bbff'
  on-secondary-fixed: '#260059'
  on-secondary-fixed-variant: '#572ba0'
  tertiary-fixed: '#eae0e6'
  tertiary-fixed-dim: '#cec4ca'
  on-tertiary-fixed: '#1f1a1e'
  on-tertiary-fixed-variant: '#4b454a'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1280px
---

## Brand & Style
The design system for Calorie Buddy centers on the concept of **Precision Vitality**. It balances the clinical accuracy required for health and nutrition tracking with an energetic, motivating atmosphere. The target audience includes health-conscious individuals and athletes who value data-driven progress but desire an interface that feels human and encouraging rather than cold or institutional.

The aesthetic follows a **Modern Corporate** foundation infused with **Minimalist** clarity. It prioritizes high-quality typography, generous white space, and a focused color palette to reduce cognitive load during frequent daily logging. The emotional response should be one of "empowered discipline"—where the UI provides the structure (precision) and the color palette provides the drive (vitality).

## Colors
The palette is anchored by **Rose 600 (#e11d48)**, a vibrant yet sophisticated red that signifies energy, heart health, and action. This primary color is used for key call-to-actions, progress indicators, and active states. 

To provide depth and maintain a professional "SaaS-like" feel, a deep **Violet (#4c1d95)** serves as the secondary color, used sparingly for data accents and secondary highlights. The background utilizes a very light **Rose Tint (#fdf2f8)** to soften the interface compared to pure white, while **Slate (#0f172a)** provides high-contrast neutral tones for text and structural borders, ensuring maximum readability and a rounded feel.

## Typography
The typography strategy reinforces the "Precision Vitality" narrative by mixing a high-character sans-serif with a functional workhorse and a technical mono font.

- **Hanken Grotesk** is used for headlines to provide a sharp, contemporary, and energetic feel. Its bold weights are used to celebrate user milestones and daily totals.
- **Inter** handles all body copy and form inputs, chosen for its exceptional legibility and neutral, professional tone.
- **JetBrains Mono** is utilized for "data points"—calorie counts, macro percentages, and timestamps—to evoke a sense of scientific accuracy and technical precision.

## Layout & Spacing
The layout follows a **Fluid Grid** model built on a 4px baseline shift to ensure mathematical harmony between elements. 

- **Mobile:** Uses a 4-column layout with 16px side margins. Elements are primarily stacked vertically to facilitate one-handed logging.
- **Tablet/Desktop:** Transitions to a 12-column grid with a maximum content width of 1280px. 
- **Spacing Rhythm:** Vertical rhythm is strictly enforced using increments of 8px (sm, md, lg). Information-dense areas (like meal logs) use `sm` (8px) spacing, while major section breaks use `xl` (48px) to provide visual breathing room.

## Elevation & Depth
This design system uses **Tonal Layers** and **Low-Contrast Outlines** to define hierarchy rather than heavy shadows.

- **Level 0 (Base):** The rose-tinted background serves as the canvas.
- **Level 1 (Cards):** Pure white surfaces with a subtle 1px border in a lightened neutral shade.
- **Level 2 (Modals/Popovers):** Uses a soft, ambient shadow (10% opacity of the primary color) to indicate temporary focus.
- **Interactive States:** Buttons and interactive cards use a subtle "inner glow" or slight color shift on hover.

## Shapes
A **Rounded** language is applied throughout the system (8px / 0.5rem base). Progress bars and primary buttons use "Full/Pill" rounding.

## Components
- **Buttons:** Primary buttons are solid Rose-red with white text, pill-shaped corners. Secondary buttons use an outlined style with the Rose-red stroke.
- **Cards:** White backgrounds with an 8px corner radius. Include a 1px border (#e2e8f0).
- **Inputs:** Clean, 2px bottom-border focus states using the Primary Rose color. Use Inter for input text and JetBrains Mono for numeric values.
- **Progress Rings/Bars:** Use the Primary Rose for the filled state and a 20% opacity version for the track.
- **Chips:** Light Rose fill with dark Rose text for dietary tags.
- **Lists:** Borderless list style for daily logs, separated by 1px horizontal dividers.
