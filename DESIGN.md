---
name: Agri-Management System
colors:
  surface: '#f9faf5'
  surface-dim: '#d9dad6'
  surface-bright: '#f9faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4ef'
  surface-container: '#edeee9'
  surface-container-high: '#e7e9e4'
  surface-container-highest: '#e2e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#42493e'
  inverse-surface: '#2e312e'
  inverse-on-surface: '#f0f1ec'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#7d562d'
  on-secondary: '#ffffff'
  secondary-container: '#ffca98'
  on-secondary-container: '#7a532a'
  tertiary: '#363b2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d5240'
  on-tertiary-container: '#c0c5ad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#f0bd8b'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#623f18'
  tertiary-fixed: '#e0e5cc'
  tertiary-fixed-dim: '#c4c9b1'
  on-tertiary-fixed: '#191d0e'
  on-tertiary-fixed-variant: '#444937'
  background: '#f9faf5'
  on-background: '#1a1c19'
  surface-variant: '#e2e3de'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-table:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  status-badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style

The brand personality of this design system is rooted in reliability, endurance, and practical intelligence. It is designed for agricultural professionals who require high-density data oversight without unnecessary visual noise. The UI evokes the feeling of a well-organized physical workshop: everything is in its place, sturdy, and built for heavy use.

The design style follows a **Corporate / Modern** aesthetic with a subtle **Tactile** influence. It prioritizes clarity and utility, using structural borders and purposeful whitespace to organize complex farm metrics. The interface avoids ephemeral trends in favor of a timeless, stable aesthetic that builds long-term user trust.

## Colors

The color palette is inspired by the landscape of modern agriculture. The primary color is a deep Forest Green, representing growth and stability. The secondary color is a Wheat Gold, used sparingly for accents and primary calls to action that require warmth. 

The neutral palette shifts away from cold grays toward "Warm Stone" tones to reduce eye strain during long periods of data entry. Status colors are saturated and high-contrast, ensuring that alerts regarding crop health or equipment failure are immediately visible against the earthy background.

## Typography

Typography in this design system is optimized for high-density data readability. **Public Sans** is used for headings to provide a sense of official authority and institutional stability. **Inter** is the workhorse for all body text and data displays, chosen for its exceptional legibility in small sizes and its neutral, functional character. 

Data tables utilize a slightly tighter 13px font size with medium weight to ensure numerical values are distinct and scanable. Caps-case labels are used for metadata and category headers to create clear visual hierarchies without requiring larger font sizes.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for the main dashboard view, centering content at a maximum width of 1440px to prevent excessive eye travel on ultra-wide monitors. A 12-column system is used, with standard widgets spanning 3, 4, 6, or 12 columns.

The spacing rhythm is built on a 4px base unit. Data-heavy views (like inventory or field logs) should use "Compact" spacing (sm/md), while marketing or high-level overview pages should use "Comfortable" spacing (md/lg) to allow the interface to breathe.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**. Instead of heavy shadows, the system uses tiered background colors to denote depth. 

- **Level 0 (Base):** The main canvas, using the lightest neutral.
- **Level 1 (Cards/Widgets):** Pure white backgrounds with a subtle 1px border in a slightly darker neutral. 
- **Level 2 (Modals/Popovers):** Surface layers that use a very soft, diffused ambient shadow (6% opacity) to suggest elevation without breaking the "flat and functional" aesthetic.

Interactive elements like buttons use a subtle inner-shadow when pressed to provide tactile feedback, mimicking a physical switch.

## Shapes

The shape language is **Soft** (roundedness 1). A 4px (0.25rem) corner radius is applied to standard input fields, buttons, and small widgets. This creates a professional, modern look that is more approachable than sharp corners but more disciplined and "industrial" than fully rounded pill shapes. 

Large dashboard containers and cards may use `rounded-lg` (8px) to frame content more distinctively, but functional elements remain tight and structured.

## Components

### Buttons
Primary buttons use the Forest Green background with white text. Secondary buttons use a Wheat Gold outline with matching text. All buttons feature a 1px solid border and high-contrast labels.

### Data Tables
Tables are the core of the system. They feature a "Zebra-stripe" pattern on rows using a very light neutral tint. Header rows have a subtle bottom border and use the `label-caps` typography style. Interaction states for rows include a Wheat Gold left-edge highlight on hover.

### Input Fields
Inputs are structured with a 1px border and a background color that is slightly darker than the card surface to clearly define the hit area. Labels are always positioned above the input, never inside as placeholders, to maintain visibility during data entry.

### Dashboard Widgets
Widgets are self-contained cards with a standard header containing a title and an optional "More" action. They should utilize "Data Visualization" components (sparklines, circular progress) that use the primary and status colors.

### Additional Components
- **Field Status Chips:** Small, solid-color badges used in tables to show crop status (e.g., "Harvested", "Irrigating").
- **Metric Tiles:** Large-format numbers with trend indicators (percentage up/down) for quick KPI monitoring.
- **Progress Steppers:** Vertical steppers used in multi-step forms for machinery maintenance logs or planting schedules.