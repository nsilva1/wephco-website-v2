# Design System & Specifications: Luxe Realty Landing Page

This document defines the updated color palette, typography system, spacing, borders, interactive effects, and component layouts extracted from the **Luxe Realty Landing Page** project (`projects/12011794165935328354`).

---

## 1. Core Design System

### A. Color Palette
The color scheme is an elegant, editorial dark mode utilizing deep forest greens, opulent golds, and clean cream/white accents.

| Color Variable | Hex Code | Purpose / Application |
| :--- | :--- | :--- |
| `primary` | `#d4af35` | Gold accents, active text state, icons, borders, prominent badges, primary CTA fill. |
| `secondary` | `#013220` | Forest green, used for container overlays, gradients, and soft background blends. |
| `background-dark` | `#011a11` | Deep dark forest green (derived from secondary), base dark background. |
| `background-light` | `#f8f7f6` | Off-white / Cream, base light background (if toggled). |
| `text-slate-100` | `#f1f5f9` | Off-white text for secondary titles, general contrast text. |
| `text-slate-300` | `#cbd5e1` | Soft gray-white text for body copy, descriptions. |
| `text-slate-400` | `#94a3b8` | Darker gray for auxiliary text, icons, stats, metadata labels. |

### B. Typography
The system relies on a single typography family, prioritizing weight and letter-spacing contrast.

- **Primary Font Family:** `Manrope`, sans-serif (imported from Google Fonts).
- **Headings & Displays:**
  - **Display (Hero Headline):** `font-light`, `tracking-tight` (e.g., `text-4xl md:text-7xl`) paired with `font-extrabold italic` for emphasis spans.
  - **Section Headings:** `font-light`, `text-4xl md:text-5xl` with bold highlights.
  - **Card Titles:** `text-xl font-light`.
- **Labels & Subtitles:**
  - **Section Subtitles:** `font-bold tracking-[0.3em] uppercase text-xs text-primary`.
  - **Input Labels:** `text-[10px] uppercase font-bold text-primary tracking-widest`.
- **Body Text:** `font-light leading-relaxed text-slate-300`.

### C. Spacing & Borders
- **Border Radius System:**
  - `DEFAULT`: `0.25rem` (4px)
  - `lg` / `rounded-lg`: `0.5rem` (8px) - Used for primary buttons, input fields, cards.
  - `xl` / `rounded-xl`: `0.75rem` (12px) - Used for search bar cards, featured sections.
  - `2xl` / `rounded-2xl`: `1rem` (16px) - Used for contact forms and main container layouts.
  - `full` / `rounded-full`: `9999px` - Used for round CTAs, avatar indicators.
- **Borders & Dividers:**
  - Standard borders use `border-primary/10` or `border-primary/20`.
  - No harsh dividers. Content sections are demarcated using borders with alpha channels (`10%` to `20%` opacity).

### D. Interactive & Visual Effects
- **Glassmorphism (`glass-effect`):**
  - **CSS Details:**
    ```css
    .glass-effect {
        background: rgba(1, 50, 32, 0.6); /* 60% opacity secondary forest green */
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(212, 175, 53, 0.2); /* 20% opacity primary gold border */
    }
    ```
- **Scale Animation:** Group hover cards zoom inner images with `group-hover:scale-110 transition-transform duration-700`.
- **Horizontal Infinite Marquee Scroll:**
  - **CSS Keyframes:**
    ```css
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-scroll {
        animation: scroll 30s linear infinite;
    }
    .marquee-container:hover .animate-scroll {
        animation-play-state: paused;
    }
    ```

---

## 2. Component Layouts

### A. Navigation Header
- **Layout:** Fixed (`fixed top-0 w-full z-50`), height 20 (`h-20`), background blur (`bg-background-dark/80 backdrop-blur-md`), subtle bottom border (`border-b border-primary/10`).
- **Brand Identity:** Left-aligned, SVG icon in primary gold, brand text uppercase (`text-xl font-extrabold tracking-widest text-primary`).
- **Navigation Menu:** Centered desktop links, uppercase tracking-wide (`text-sm font-medium hover:text-primary transition-colors tracking-wide uppercase`).
- **CTAs & Profiles:** Right-aligned. Fill button (`bg-primary text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase`). Round avatar cropped profile wrapper (`h-10 w-10 rounded-full border border-primary/30 p-0.5`).

### B. Interactive Hero Search Overlay
- **Layout:** Centered within a full-screen background overlay.
- **Search Wrapper:** Multi-field layout wrapped in a glassmorphic container (`glass-effect p-2 rounded-xl md:rounded-full flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto`).
- **Inner Fields:** Divided into three segments:
  1. **Location Input:** Location icon, small uppercase gold label, and transparent input text.
  2. **Property Type Dropdown:** Home icon, small uppercase gold label, and customized select input (bg-transparent, custom option lists).
  3. **Price Range Input:** Payments icon, small uppercase gold label, and transparent price search query.
  - *Separators:* Vertically divided on desktop (`divide-y-0 md:divide-x divide-primary/20`).
- **CTA Button:** Primary button positioned at the end of the overlay (`bg-primary text-background-dark px-10 py-4 rounded-lg md:rounded-full font-bold flex items-center justify-center gap-2 group`). Shows dynamic arrow translation on hover.

### C. Featured Property Card
- **Grid Layout:** 3-column responsive flex grid (`grid grid-cols-1 md:grid-cols-3 gap-10`).
- **Structure:**
  - **Container:** `group relative bg-secondary/20 rounded-xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-500`.
  - **Image:** Stretched container with aspect ratio `aspect-[4/5]`, zoom transition (`group-hover:scale-110 transition-transform duration-700`).
  - **Float Badge:** Floating indicator (`absolute top-4 left-4 bg-background-dark/80 backdrop-blur-md px-4 py-1.5 rounded text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/20`).
  - **Details Card Overlay:** Bottom gradient fade (`bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80`).
  - **Metadata:** Bold gold price (`text-primary text-2xl font-black mb-1`), title (`text-white text-xl font-light mb-4`), feature list items (beds, baths, sqft) using gray icon alignments (`text-slate-400 text-xs font-medium`).
  - **CTA Button:** `w-full py-3 border border-primary/30 text-primary hover:bg-primary hover:text-background-dark font-bold text-xs tracking-widest uppercase rounded-lg transition-all`.

### D. Vision & Split-Feature Block
- **Layout:** 2-column grid (`grid grid-cols-1 md:grid-cols-2 gap-16 items-center`).
- **Text Area:** Structured column with uppercase gold section pre-header, large heading, multi-paragraph story, and stats indicators displaying key metric highlights side-by-side (`$4.2B+ Total Sales` and `25+ Years Excellence`).
- **Image Area:** Right-hand layout with an offset floating frame border (`absolute -top-4 -right-4 w-full h-full border border-primary/20 rounded-xl z-0`) and grayscale to colored image transitions (`grayscale hover:grayscale-0 transition-all duration-700`).

### E. Accordion FAQ
- **Wrapper:** Centered, restricted width (`max-w-3xl mx-auto space-y-4`).
- **Item Cards:** Individual boxes (`border border-primary/10 bg-background-dark/50 rounded-lg p-6 hover:border-primary/30 transition-colors cursor-pointer group`).
- **Details:** Text flex layout showing questions, a rotating primary icon indicator on hover (`group-hover:rotate-45 transition-transform`), and hidden dropdown descriptions.

### F. Contact Form Block
- **Layout:** Split layout, left side contains location, email, and phone contact items with 3xl primary icons.
- **Card Container:** Right side form container (`bg-secondary/20 p-8 md:p-12 rounded-2xl border border-primary/10`).
- **Fields:** Input fields utilize quiet borders with semi-transparent background (`w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none`).
- **Form Submit CTA:** Prominent fill CTA (`w-full bg-primary hover:bg-white text-background-dark font-bold py-4 rounded-lg tracking-[0.2em] uppercase transition-all duration-300`).
