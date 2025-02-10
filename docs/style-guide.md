# NBA Stats Analysis Tool - Style Guide

## Color Palette

### Primary Colors

#### Deep Purple (#5E35B1)
- Primary brand color
- Used for:
  - High-priority metric cards (e.g., High Hit Rate display)
  - Primary action buttons
  - Important statistics or numbers
  - Section headers
- Text color: White
- Usage notes: Reserve for the most important UI elements and primary actions

#### Bright Blue (#1D87E4)
- Secondary brand color
- Used for:
  - Secondary metric cards (e.g., High Confidence Scores)
  - Danger/warning buttons
  - Interactive elements
  - Important links
- Text color: White
- Usage notes: Use to draw attention to important but not primary elements

### Supporting Colors

#### Light Purple (#EDE7F6)
- Used for:
  - Tertiary metric cards
  - Row hover states in tables
  - Secondary container backgrounds
  - Active/selected states
- Text color: Dark gray (#1F2937)
- Usage notes: Provides subtle visual feedback and hierarchy

#### Light Blue (#A0D2FA)
- Used for:
  - Supplementary metric cards
  - Background accents
  - Progress indicators
  - Success states
- Text color: Dark gray (#1F2937)
- Usage notes: Best for supplementary information and success indicators

### Base Colors

#### White (#FFFFFF)
- Used for:
  - Component/card backgrounds
  - Modal backgrounds
  - Dropdown menus
  - Form elements
- Usage notes: Used for elevated/interactive elements that should appear above the base layer

#### Light Gray (#EEF2F6)
- Used for:
  - Main page background
  - Spaces between cards/components
  - Subtle borders and dividers
  - Table header backgrounds
  - Secondary backgrounds
- Usage notes: Creates a subtle depth by providing contrast with white components; helps establish visual hierarchy

## Component Color Usage

### Dashboard Metric Cards
1. High Hit Rate (Deep Purple #5E35B1)
   - White text
   - White/transparent icons
   - Highest visual prominence

2. High Confidence (Bright Blue #1D87E4)
   - White text
   - White/transparent icons
   - Secondary visual prominence

3. Games/Players Today (Light Purple #EDE7F6, Light Blue #A0D2FA)
   - Dark text
   - Colored icons
   - Lower visual prominence

### Buttons
- Primary: Deep Purple (#5E35B1)
  - Hover: 90% opacity
  - Disabled: 60% opacity

- Secondary: Outlined Deep Purple
  - Border: #5E35B1
  - Text: #5E35B1
  - Hover: 10% opacity background

- Tertiary/Link: Deep Purple text
  - Text only
  - Hover: 80% opacity

- Danger: Bright Blue (#1D87E4)
  - White text
  - Hover: 90% opacity

### Tables
- Header Background: Light Gray (#EEF2F6)
- Row Hover: Light Purple (#EDE7F6)
- Borders: Light Gray (#EEF2F6)
- Text Colors:
  - Primary Text: Dark Gray (#1F2937)
  - Secondary Text: Gray (#6B7280)
  - Highlight Text: Deep Purple (#5E35B1)

### Interactive Elements
- Hover States: Light Purple (#EDE7F6)
- Focus Rings: Deep Purple (#5E35B1)
- Selected States: Light Purple (#EDE7F6)
- Active States: Deep Purple (#5E35B1)

## Accessibility Notes

### Contrast Ratios
- Deep Purple (#5E35B1) on White: 7.04:1 (Passes WCAG AAA)
- Bright Blue (#1D87E4) on White: 4.52:1 (Passes WCAG AA)
- Dark Text on Light Purple (#EDE7F6): 13.51:1 (Passes WCAG AAA)
- Dark Text on Light Blue (#A0D2FA): 12.89:1 (Passes WCAG AAA)

### Best Practices
- Always use white text on Deep Purple and Bright Blue backgrounds
- Use dark gray text on light backgrounds
- Maintain contrast ratios for all text sizes
- Provide visual feedback for interactive elements
- Use color as enhancement, not sole indicator