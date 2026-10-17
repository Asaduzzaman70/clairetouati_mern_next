# 🎨 Turrim (Clairetouati) — AI Agent Design System & Styling Guidelines

> **Target Audience**: AI Agents (Gemini, Antigravity, Claude, Cursor, Copilot) & Front-end Engineers  
> **Purpose**: Strictly enforce design consistency, thematic integrity, typography rules, color palettes, and motion patterns across all newly created components, sections, and pages.  
> **Status**: Active & Mandatory Standard

---

## 🏛 1. Core Brand Philosophy & Aesthetic DNA

Turrim is an innovative educational and pedagogical platform bridging **tactile physical learning, 3D interactive geometry, and modern pedagogical science** (invented by Claire Touati). 

The visual identity is defined as **"Bauhaus meets Modern Montessori & Scandinavian Minimalism"**:
1. **Airy, Clean Canvases**: Generous white and warm neutral backgrounds (`bg-white`, `bg-zinc-50`, `#FBF9F7`, `#F8F8F8`).
2. **Joyful Geometric Accents**: Saturated, rich Bauhaus colors (Gold, Coral/Orange, Rouge, Purple, Blue, Forest Green) used intentionally for content blocks, playful letterings, and interactive states.
3. **Tactile & Organic Border Radiuses**: Generously rounded corners (`rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`, `rounded-full`) reflecting physical wooden toys and safe, child-friendly tactile objects.
4. **Delightful Micro-interactions**: Fluid Framer Motion gestures (`whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`), spring physics, and sliding pill indicators (`layoutId`).
5. **No Clutter, High Contrast**: Crisp typography, high contrast ratios, deliberate spacing, and zero generic boilerplate styling.

---

## 🎨 2. Color Palette System & Tokens

### 2.1 Neutral Canvas & Surfaces
| Token / Name | Hex / Utility | Intended Usage |
| :--- | :--- | :--- |
| **Page Canvas (Default)** | `bg-zinc-50` / `#FAFAFA` | Main public background wrapper |
| **Pure Surface** | `bg-white` / `#FFFFFF` | Primary card background, section contrasts |
| **Warm Card Canvas** | `#FBF9F7` | Course cards, directory cards, subtle warmth |
| **Light Neutral Surface** | `#F8F8F8` / `#F9FAFB` | Dashboard backgrounds, values grid, auth cards |
| **Soft Gray Accent** | `#E8E8E8` / `#EFEFEF` | Secondary buttons, 3D canvas card backdrops, tag pills |
| **Borders & Dividers** | `border-border/40`, `border-black/5`, `#E5E7EB` | Hairline dividers, card outlines |
| **Dark Heading Text** | `#1F2937`, `#1e293b`, `#1A1A2E` | Headings, titles, high-emphasis text |
| **Muted Body Text** | `#64748b`, `#555555`, `text-gray-700` | Paragraphs, captions, descriptions |

---

### 2.2 Brand & Identity Accents
| Token / Name | Hex / Utility | Intended Usage |
| :--- | :--- | :--- |
| **Brand Deep Green** | `#064228` | Dashboard sidebar, primary brand identity, active headers |
| **Brand Mint Pastel** | `#dffada` / `#BBF7D0` | Category badges, success pills, highlight chips |
| **Accent Action Green** | `#1da824` / `#22C55E` | Language toggle pills, pricing emphasis, checkmarks |
| **Accent Gold / Ochre** | `#DC9F12` / `#FFD600` / `#996300` | Carousel navigation arrows, highlight badges, warm cards |
| **Dark Primary Action** | `#0a0a0a` / `#1F2937` | Main CTA buttons, high-priority actions |

---

### 2.3 The 6 Montessori / Geometric Palette Tokens
Used across `CuriosityCarousel`, `OurValuesSection`, `TurrimInfoSection`, and `Playroom`:

| Category | Primary Vibrant Hex | Pastel Soft Hex | Contrast Text Rule *(MANDATORY)* |
| :--- | :--- | :--- | :--- |
| **Yellow / Gold** | `#FFD600` / `#EAB308` / `#DC9F12` | `#FEF08A` | **MUST use dark text** (`text-[#1A1A2E]` or `text-foreground`) |
| **Orange / Coral** | `#FF8A50` / `#F97316` / `#FF7E4D` | `#FED7AA` | **MUST use crisp white text** (`text-white`) |
| **Rouge / Red** | `#C8102E` / `#C81E3D` / `#DC143C` | `#FECDD3` | **MUST use crisp white text** (`text-white`) |
| **Purple / Violet** | `#6930C3` / `#7C3AED` / `#4C259D` | `#DDD6FE` | **MUST use crisp white text** (`text-white`) |
| **Blue / Ocean** | `#0056D2` / `#0264C8` / `#0066CC` | `#BAE6FD` | **MUST use crisp white text** (`text-white`) |
| **Green / Emerald** | `#007F3E` / `#008037` / `#047857` | `#BBF7D0` | **MUST use crisp white text** (`text-white`) |

> ⚠️ **AI AGENT CRITICAL ACCESSIBILITY RULE**:  
> Never render light or white text on Yellow cards. Never render dark gray text on Blue, Rouge, or Purple blocks. Always adhere strictly to the contrast table above.

---

## 🔤 3. Typography Scale & Guidelines

### 3.1 Font Families
- **Primary Body & Display**: `Inclusive Sans` (configured in `lib/fonts.ts` as `--font-inclusive-sans`, applied as default `font-sans` and `font-inclusive`), with fallback to `Inter` (`--font-inter`).
- **Decorative / Display Serif**: `Mirrut` (configured in `lib/fonts.ts` as `--font-mirrut`, applied via `font-mirrut`).
- **Monospace / Code / Timestamps**: `Geist_Mono` (`--font-geist-mono`).
- **Dynamic Variable Axis Typography**: `Roboto_Flex` (used for mouse-proximity variable axis animations in `TurrimCTA`).
- **3D Three.js WebGL Typography**: `helvetiker_regular.typeface.json` & `helvetiker_bold.typeface.json` (exported as `THREE_FONTS` in `lib/fonts.ts`).

### 3.2 Type Scale Reference
| Level | Tailwind Classes | Usage Context |
| :--- | :--- | :--- |
| **Eyebrow / Overline** | `text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]` | Section categorizer above `<h2>` |
| **Display / Hero H1** | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]` | Hero section, about page founder title |
| **Section Title H2** | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight uppercase` | Primary section headers |
| **Card Title H3** | `text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight leading-snug` | Course cards, carousel cards, value cards |
| **Body Paragraph** | `text-sm sm:text-base md:text-lg leading-relaxed text-[#555555] font-normal` | Editorial text, descriptions, details |
| **Micro / Caption** | `text-xs sm:text-sm text-muted-foreground font-medium` | Metadata, counts, secondary hints |
| **Giant Watermark Letter** | `text-[200px] sm:text-[280px] md:text-[380px] font-black opacity-10 leading-none select-none pointer-events-none` | Decorative background letters inside cards |

---

## 🧱 4. Component Design Patterns & Radius Language

### 4.1 Corner Radiuses ("Tactile Organic Curves")
The site avoids sharp, aggressive 90° corners. Always use softened curves:
- **Pills & Buttons**: `rounded-full`
- **Main Feature Cards**: `rounded-2xl` (16px) on mobile, scaling to `rounded-[2rem]` (32px) or `rounded-3xl` (24px) on desktop
- **Hero & Canvas Blocks**: `rounded-3xl` or `rounded-[2.5rem]`
- **Inputs & Textareas**: `rounded-xl` to `rounded-[18px]`
- **Small Badges / Micro-controls**: `rounded-md` (6px) or `rounded-lg` (8px)

### 4.2 Buttons & Action Triggers
Always use or extend `@/components/ui/button`:
```tsx
// 1. Primary Action Button (Black/Dark Slate)
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <Button className="rounded-full bg-[#0a0a0a] text-white hover:bg-black/90 h-11 px-6 text-base font-semibold shadow-sm cursor-pointer">
    Get Started
  </Button>
</motion.div>

// 2. Secondary Pill Button (Soft Neutral Gray)
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <Button variant="secondary" className="rounded-full bg-[#E8E8E8] hover:bg-zinc-200 text-foreground h-11 px-5 text-base font-semibold cursor-pointer">
    Enter the playroom
  </Button>
</motion.div>

// 3. Outline Pill Button
<Button variant="outline" className="rounded-full border-2 border-secondary-foreground bg-background hover:bg-secondary h-11 px-5 text-base font-semibold">
  Learn More
</Button>
```

### 4.3 Interactive Pill & Tab Switchers
For tabs, language switchers, and segment controls, always use Framer Motion `layoutId`:
```tsx
<div className="flex items-center bg-secondary rounded-full p-1 gap-1 relative overflow-hidden">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={cn(
        "px-5 py-2 rounded-full text-sm font-semibold transition-colors relative z-10 cursor-pointer",
        activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {tab.label}
      {activeTab === tab.id && (
        <motion.div
          layoutId="active-pill-unique-id"
          className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
    </button>
  ))}
</div>
```

### 4.4 Form Controls & Inputs
```tsx
<div className="space-y-2">
  <label className="text-xs sm:text-sm font-semibold text-[#374151] ml-1">
    Label Text
  </label>
  <div className="relative group">
    <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
      <Mail className="w-5 h-5" />
    </div>
    <input
      type="text"
      placeholder="Enter value..."
      className="w-full h-13 sm:h-15 pl-12 sm:pl-15 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-base placeholder:text-zinc-400"
    />
  </div>
</div>
```

### 4.5 Standard Card Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
  className="bg-[#FBF9F7] rounded-[2rem] p-5 sm:p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40 flex flex-col gap-4"
>
  {/* Card media / content */}
</motion.div>
```

---

## 📐 5. Spacing, Grid & Layout Conventions

### 5.1 Standard Section Spacing
Every full-width section must follow standard vertical rhythm:
- **Default Section**: `py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20`
- **Compact Section**: `py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8`
- **Hero / High-Impact Banner**: `py-20 sm:py-28 md:py-40 lg:py-56`
- **Container wrapper**: `<div className="container mx-auto">`

### 5.2 Responsive Grid Breakpoints
```tsx
// 2 Columns (50/50 Split)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">

// 3 Columns (Cards, Values, Showcase)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

// 4 Columns (Perks, Stats, Badges)
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
```

---

## 🏃‍♂️ 6. Animation, Physics & Scrolling Rules

1. **Lenis Smooth Scroll Awareness**:
   - The entire app uses `@lenis/react` for smooth inertia scrolling.
   - **MANDATORY**: Any custom scrollable container inside a modal, dropdown, drawer, dashboard main view, or playlist sidebar MUST include the attribute:
     ```tsx
     <div data-lenis-prevent className="overflow-y-auto ...">
     ```
   - Failing to include `data-lenis-prevent` will cause nested scroll locks on desktop and trackpads.

2. **Framer Motion Standards**:
   - Standard Spring Transition: `transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}`
   - Standard Fade-in Viewport:
     ```tsx
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, ease: "easeOut" }}
     ```
   - Micro Tap Feedbacks:
     ```tsx
     whileHover={{ scale: 1.02 }}
     whileTap={{ scale: 0.98 }}
     ```

3. **Physics (Matter.js) & 3D (Three.js / React Three Fiber)**:
   - Always run canvas instances on client side (`"use client"`).
   - If rendering R3F canvases or heavy models, wrap with `dynamic(() => import(...), { ssr: false })`.
   - Always implement complete cleanup inside `useEffect`:
     ```tsx
     return () => {
       window.removeEventListener("resize", handleResize);
       if (runner) Runner.stop(runner);
       if (render) Render.stop(render);
       if (engine) Engine.clear(engine);
     };
     ```

---

## 📂 7. Directory Placement & Architectural Hierarchy

When generating or editing components, place them in the correct directory:

| Directory | Purpose | Example |
| :--- | :--- | :--- |
| `components/ui/` | Primitive, domain-agnostic atoms (Radix / Shadcn) | `button.tsx`, `carousel.tsx`, `dialog.tsx` |
| `components/shared/` | Reusable multi-page domain components | `Navbar.tsx`, `Footer.tsx`, `TurrimCTA.tsx`, `BreadCrumb.tsx` |
| `components/layout/` | Structural page frames & layouts | `DashboardLayout.tsx` |
| `components/providers/`| Client context providers | `SmoothScrollProvider.tsx` |
| `components/page/<Feature>/` | Feature/Page-specific views and subcomponents | `About/OurValuesSection.tsx`, `Home/Hero.tsx` |
| `lib/utils.ts` | Core helper utilities | `cn()` (clsx + tailwind-merge) |
| `constants/` | Static configuration arrays, mappings | Mock data, color configurations |

---

## 📋 8. AI Agent Implementation Checklist (Run Before Submitting Code)

Before writing any new component or section, verify:
- [ ] **Component Boundary**: Added `"use client"` if using React state, hooks, or Framer Motion?
- [ ] **Color Contrast**: Checked the 6 Bauhaus colors? Yellow has dark text; others have white text.
- [ ] **Border Radii**: Used tactile curves (`rounded-full`, `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`)? Never sharp default corners.
- [ ] **Micro-Interactions**: Wrapped interactive clickables in `motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`?
- [ ] **Smooth Scroll**: Added `data-lenis-prevent` to any nested scrollable element?
- [ ] **Responsive Rhythm**: Applied standard padding scale (`py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12`)?
- [ ] **Clean Typography**: Used `font-sans` (`Inter`), title tracking `tracking-tight`, and proper hierarchy?
- [ ] **TypeScript Strictness**: Created an explicit interface ending with `Props` (e.g. `MySectionProps`)?
- [ ] **No Ad-hoc Styling**: Used `cn()` from `@/lib/utils` for conditional class merges?
