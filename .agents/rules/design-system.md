# Turrim (Clairetouati) Design System & UI Component Rules

Whenever designing, generating, or refactoring UI components, pages, or sections in this repository, you MUST strictly follow the design identity and technical standards detailed below:

## 1. Aesthetic Identity
- **Design Personality**: "Bauhaus meets Modern Montessori & Scandinavian Minimalism".
- **Visuals**: Clean, generous white/warm-neutral canvas with vibrant geometric accents (Yellow `#FFD600`, Orange `#FF8A50`, Rouge `#C8102E`, Purple `#6930C3`, Blue `#0056D2`, Green `#007F3E`).
- **Tactile Shapes**: Always use rounded organic corners (`rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`, `rounded-full`). Avoid sharp 90° corners.
- **Micro-Interactions**: All clickable elements should feature subtle spring hover/tap scales (`whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`).

## 2. Mandatory Color & Contrast Rules
- **Canvas & Card Surfaces**: `bg-zinc-50`, `bg-white`, `#FBF9F7`, `#F8F8F8`, `#F9FAFB`.
- **Brand Identity Green**: `#064228` (deep forest green, used for LMS sidebar and primary brand identity).
- **Mint Badges**: `#dffada` / `#BBF7D0` for pill tags and badges.
- **Action Green**: `#1da824` / `#22C55E` for status/price/pill toggles.
- **CRITICAL CONTRAST RULE**:
  - Yellow backgrounds (`#FFD600` / `#EAB308`): **MUST use dark text** (`text-[#1A1A2E]`).
  - Orange, Rouge, Purple, Blue, Green backgrounds: **MUST use crisp white text** (`text-white`).

## 3. Typography Rules
- **Primary Body & Display**: `font-sans` (`Inter`).
- **Eyebrow / Category Tag**: `text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]`.
- **Section Titles**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight uppercase` (or title case).
- **Body**: `text-sm sm:text-base md:text-lg leading-relaxed text-[#555555] font-normal`.

## 4. Layout & Spacing
- **Section Padding**: `py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20`.
- **Container**: Wrap content in `<div className="container mx-auto">`.
- **Grids**: Standard gap `gap-6 sm:gap-8 md:gap-12`.

## 5. Animation & Scroll Rules
- **Lenis Smooth Scroll**: ANY nested scroll container (drawer, dropdown list, modal, video playlist) MUST have `data-lenis-prevent` to prevent scroll-locking.
- **Sliding Tabs**: Use Framer Motion `layoutId="<unique-id>"` with transition `{ type: "spring", bounce: 0.2, duration: 0.5 }`.
- **Canvas Cleanups**: Always cleanly unmount Matter.js engines, R3F canvases, and event listeners in `useEffect` return blocks.

## 6. Architecture & Code Conventions
- Add `"use client"` at the very top if using state, effects, or Framer Motion.
- Suffix component prop types with `Props` (e.g. `HeroProps`).
- Organize files into `components/ui/`, `components/shared/`, or `components/page/<Domain>/`.
- Use `cn()` from `@/lib/utils` for conditional classes.
- For complete specifications, tokens, and code examples, refer to [DESIGN_SYSTEM_GUIDELINES.md](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/DESIGN_SYSTEM_GUIDELINES.md).
