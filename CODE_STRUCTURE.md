# Clairetouati (Turrim) - Code Structure & Architecture Guidelines

This document provides a comprehensive technical reference for the codebase architecture, folder structure, routing, interactive systems, design tokens, and coding standards of the **Clairetouati / Turrim** front-end application.

---

## 📌 Project Overview

**Clairetouati (Turrim)** is an interactive, modern educational platform designed for special needs education and innovative pedagogy. The platform combines 2D physics simulations, 3D interactive models, dynamic typography, and a dashboard learning management system.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.1.6` | React Framework (App Router, Server & Client Components) |
| **React & React DOM** | `19.2.3` | UI Library |
| **TypeScript** | `^5` | Strict static type checking |
| **Tailwind CSS** | `^4.0.0` | Utility-first styling with CSS-first configuration |
| **Framer Motion** | `^12.31.1` | UI animations, layout transitions, and gesture interactions |
| **Matter.js** | `^0.20.0` | 2D rigid body physics engine (Hero interactive canvas) |
| **Three.js** | `^0.182.0` | 3D rendering engine |
| **@react-three/fiber** | `^9.5.0` | React renderer for Three.js |
| **@react-three/drei** | `^10.7.7` | Helper abstractions for React Three Fiber |
| **Radix UI** | `^1.4.3` | Accessible, unstyled UI primitives |
| **Shadcn UI** | Latest | Reusable UI components (New York style) |
| **Embla Carousel** | `^8.6.0` | Carousel engine for interactive curiosity sliders |
| **Lenis Smooth Scroll** | `^1.3.26` | High-performance smooth scrolling (`lenis/react`) |
| **Lucide React** | `^0.563.0` | Iconography suite |
| **Fonts** | Google Fonts | `Inter`, `Geist Mono`, `Roboto Flex` (Variable Font) |

---

## 📁 Full Directory & File Structure

```plaintext
clairetouati_next_js_mern_front_end/
├── .next/                                # Next.js build and cache output
├── app/                                  # App Router routes and global configs
│   ├── (auth)/                           # Authentication route group (unauthenticated layout)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                  # Forgot password request screen
│   │   ├── reset-password/
│   │   │   └── page.tsx                  # Reset password entry form
│   │   ├── sign-in/
│   │   │   └── page.tsx                  # Sign in / Login screen
│   │   ├── sign-up/
│   │   │   └── page.tsx                  # Sign up / Registration screen
│   │   └── verify-otp/
│   │       └── page.tsx                  # 6-digit OTP verification screen
│   ├── (public)/                         # Public-facing route group (with Navbar & Footer)
│   │   ├── about/
│   │   │   └── page.tsx                  # About page (inventor bio, values, methodology)
│   │   ├── contact/
│   │   │   └── page.tsx                  # Contact form & information
│   │   ├── course/
│   │   │   ├── [courseId]/
│   │   │   │   ├── layout.tsx            # Public course detail layout
│   │   │   │   └── page.tsx              # Public course detail page
│   │   │   └── page.tsx                  # Course catalog / directory page
│   │   ├── products/
│   │   │   └── page.tsx                  # Complete products catalog & workshop page
│   │   ├── layout.tsx                    # Public layout wrapping Navbar & Footer
│   │   └── page.tsx                      # Landing / Home page
│   ├── dashboard/                        # Authenticated LMS dashboard route group
│   │   ├── my-courses/
│   │   │   ├── [courseId]/
│   │   │   │   └── page.tsx              # Video player & lesson navigation screen
│   │   │   └── page.tsx                  # User enrolled/active/completed course list
│   │   ├── notifications/
│   │   │   └── page.tsx                  # Notification feed (grouped by Today/Yesterday/Earlier)
│   │   ├── overview/
│   │   │   └── page.tsx                  # Dashboard overview with stats and in-progress courses
│   │   ├── settings/
│   │   │   └── page.tsx                  # Profile and password settings tabs
│   │   ├── layout.tsx                    # Dashboard layout wrapper with sidebar & header
│   │   └── page.tsx                      # Dashboard root redirect (redirects to /dashboard/overview)
│   ├── favicon.ico                       # Favicon asset
│   ├── globals.css                       # Tailwind CSS v4 imports, theme tokens, OKLCH variables
│   └── layout.tsx                        # Global root layout (HTML, fonts, global wrappers)
├── assets/                               # Imported project image assets
│   ├── ab_img_1.png                      # About page graphic asset 1
│   ├── ab_img_2.png                      # About page graphic asset 2
│   ├── ab_img_3.png                      # About page graphic asset 3
│   ├── bg_image.jpg                      # CTA banner background image
│   ├── image_bg.png                      # Decorative background 1
│   ├── image_bg_2.png                    # Decorative background 2
│   ├── image_bg_3.png                    # Decorative background 3
│   ├── image_bg_4.png                    # Decorative background 4
│   ├── logo.png                          # Turrim official brand logo
│   ├── owner.jpg                         # Founder profile portrait
│   └── user.jpg                          # User avatar mock image
├── components/                           # Component library
│   ├── layout/                           # Global & structural layout components
│   │   └── DashboardLayout.tsx           # Dashboard sidebar, responsive header, active navigation
│   ├── providers/                        # Global context and client providers
│   │   └── SmoothScrollProvider.tsx      # Lenis smooth scroll React provider wrapper
│   ├── page/                             # Feature- and page-specific view components
│   │   ├── About/                        # Components for /about page
│   │   │   ├── AboutSection.tsx          # Hero intro section with founder bio
│   │   │   ├── ArchitectureABCSection.tsx# Architectural ABC alphabet showcase
│   │   │   ├── BioTextSection.tsx        # Extended biographical text
│   │   │   ├── CallToActionSection.tsx   # Pre-footer call to action
│   │   │   ├── CommunityInclusionSection.tsx # Community & accessibility values
│   │   │   ├── FoundersLetterSection.tsx # Personal note from the founder
│   │   │   ├── LearningHumanSection.tsx  # Human-centric learning philosophy
│   │   │   ├── MethodInActionSection.tsx # Concrete pedagogical methodology
│   │   │   ├── OurApproachSection.tsx    # Step-by-step approach cards
│   │   │   ├── OurValuesSection.tsx      # Core values grid
│   │   │   ├── ScienceDesignSection.tsx  # Intersection of cognitive science & design
│   │   │   └── ScienceOfPlaySection.tsx  # Play-based learning mechanisms
│   │   ├── Course/                       # Components for /course catalog page
│   │   │   ├── CourseCard.tsx            # Public course card with pricing and reviews
│   │   │   └── CoursePage.tsx            # Public course catalog list & filter view
│   │   ├── CourseDetails/                # Components for /course/[courseId] public detail
│   │   │   ├── ActionButtonSection.tsx   # Enrollment CTA action block
│   │   │   ├── CourseCurriculum.tsx      # Expandable syllabus curriculum accordions
│   │   │   ├── CourseDescription.tsx     # Full course synopsis & objectives
│   │   │   ├── CourseDetailsHero.tsx     # Course header & metadata banner
│   │   │   ├── CourseMainDetails.tsx     # Composite wrapper for course details
│   │   │   └── CourseTabs.tsx            # Details tab switchers (Description, Curriculum)
│   │   ├── Home/                         # Components for / landing page
│   │   │   ├── CuriosityCarousel.tsx     # Embla carousel with alphabet curiosity cards
│   │   │   ├── Hero.tsx                  # Matter.js 2D interactive physics shape simulation
│   │   │   ├── Testimonials.tsx          # User & educator testimonials
│   │   │   └── TurrimInfoSection.tsx     # Product feature highlights & video demo
│   │   ├── MyCourses/                    # Components for /dashboard/my-courses
│   │   │   ├── ActiveCourses.tsx         # Filtered active courses grid
│   │   │   ├── CompletedCourses.tsx      # Filtered completed courses grid
│   │   │   ├── EnrolledCourses.tsx       # All enrolled courses grid
│   │   │   └── MyCoursesStpes.tsx        # Animated tab controller (Enrolled, Active, Completed)
│   │   ├── Notifications/                # Components for /dashboard/notifications
│   │   │   └── Notifications.tsx         # Categorized notification feed with relative time
│   │   ├── Overview/                     # Components for /dashboard/overview
│   │   │   ├── ProgressCourses.tsx       # In-progress course cards with progress bars
│   │   │   └── StatsSection.tsx          # Key metrics cards (Enrolled, Active, Completed)
│   │   ├── Playroom/                     # Components for /playroom interactive 3D alphabet
│   │   │   ├── Playroom3DViewer.tsx      # R3F 3D letter Canvas with OrbitControls & Text3D
│   │   │   ├── PlayroomAlphabetKeyboard.tsx # 2-row A-Z color badges with active selection
│   │   │   ├── PlayroomColorFilters.tsx  # Color filter pill selectors (All/Yellow/Orange/Rouge/Purple/Blue/Green)
│   │   │   ├── PlayroomLetterInfo.tsx    # Header badge, letter cases, sound pronunciation, and color
│   │   │   ├── PlayroomTipAndActions.tsx # Random generator button and slide tip callout banner
│   │   │   ├── PlayroomWordCard.tsx      # Example word display card with audio speaker
│   │   │   ├── index.tsx                 # Main composite Playroom page layout
│   │   │   └── playroomData.ts           # Letter dataset, color mapping, phonetics, and words
│   │   ├── Settings/                     # Components for /dashboard/settings
│   │   │   ├── PasswordSettingsForm.tsx  # Password change form with security checks
│   │   │   ├── ProfileSettingsForm.tsx   # User profile edit form & avatar upload
│   │   │   └── SettingsTabSection.tsx    # Animated tab container for profile/password settings
│   │   └── UserCourseDetail/             # Components for /dashboard/my-courses/[courseId]
│   │       ├── CourseVideo.tsx           # Video container with Overview & Resources tabs
│   │       ├── CourseVideoList.tsx       # Collapsible video playlist with completion checkboxes
│   │       ├── OverviewTab.tsx           # Lesson overview notes & objectives
│   │       ├── ResourceTab.tsx           # Downloadable lesson attachments & assets
│   │       └── Vidoe.tsx                 # HTML5 video element player
│   ├── shared/                           # Reusable cross-page shared components
│   │   ├── BreadCrumb.tsx                # Hierarchical navigation breadcrumb
│   │   ├── CourseCard.tsx                # Standard dashboard course progress card
│   │   ├── Footer.tsx                    # Global public footer with links
│   │   ├── Navbar.tsx                    # Responsive sticky navbar with auto-hide and language toggle
│   │   ├── PlayroomSection.tsx           # 3D interactive model playroom preview
│   │   ├── SearchBar.tsx                 # Dashboard filter and course search input
│   │   ├── ThreeModelViewer.tsx          # React Three Fiber Canvas with OrbitControls
│   │   └── TurrimCTA.tsx                 # Full-width CTA with mouse-proximity dynamic typography
│   └── ui/                               # Atomic primitives (Shadcn / Radix)
│       ├── button.tsx                    # Variant-driven Button component (CVA)
│       └── carousel.tsx                  # Embla-based customizable Carousel component
├── lib/                                  # Core library helper utilities
│   └── utils.ts                          # `cn()` helper (clsx + tailwind-merge)
├── public/                               # Publicly accessible static assets
│   ├── models/                           # 3D models and JSX R3F components
│   │   ├── A_alphabet_lore.jsx           # R3F component for Alphabet Lore model
│   │   ├── Alphabet_a.jsx                # R3F component for Alphabet A model
│   │   ├── a_alphabet_lore.glb           # Binary GLTF 3D model asset
│   │   └── alphabet_a.glb                # Binary GLTF 3D model asset
│   ├── file.svg                          # Static icon
│   ├── globe.svg                         # Static icon
│   ├── next.svg                          # Static logo
│   ├── vercel.svg                        # Static logo
│   ├── video.mp4                         # Demo video stream asset
│   └── window.svg                        # Static icon
├── utils/                                # Business logic and helper functions
│   └── notification-utils.ts             # Time relative formatter and category grouping utility
├── components.json                       # Shadcn UI configuration file
├── eslint.config.mjs                     # ESLint configuration
├── next.config.ts                        # Next.js configuration
├── package.json                          # NPM dependencies and scripts
├── postcss.config.mjs                    # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json                         # TypeScript compiler configuration
├── CODE_STRUCTURE.md                     # Code structure & architectural documentation (this file)
└── README.md                             # Project setup and running instructions
```

---

## 🗺️ Application Routing Architecture

The application is structured using Next.js App Router route groups:

```
app/
├── (auth)/                     --> Unauthenticated Authentication Views
│   ├── /sign-in                --> User authentication
│   ├── /sign-up                --> User registration
│   ├── /forgot-password        --> Email OTP request
│   ├── /verify-otp             --> OTP confirmation
│   └── /reset-password         --> Password reset submission
│
├── (public)/                   --> Public Marketing & Catalog Views (Wrapped with Navbar & Footer)
│   ├── /                       --> Home / Landing Page
│   ├── /about                  --> About & Story Page
│   ├── /contact                --> Contact Form Page
│   ├── /course                 --> Course Catalog Page
│   ├── /course/[courseId]      --> Public Course Details & Curriculum
│   └── /playroom               --> Interactive 3D Alphabet Game Room
│
└── dashboard/                  --> Authenticated LMS Workspace (Wrapped with DashboardLayout)
    ├── /dashboard              --> Redirects to /dashboard/overview
    ├── /dashboard/overview     --> Learner dashboard overview & quick access
    ├── /dashboard/my-courses   --> Enrolled, active, and completed courses
    ├── /dashboard/my-courses/[courseId] --> Interactive video learning player & curriculum tracker
    ├── /dashboard/notifications--> Notification center
    └── /dashboard/settings     --> Profile and password management
```

---

## 🧩 Key Architecture & Component Patterns

### 1. Interactive 2D Physics Simulation (`components/page/Home/Hero.tsx`)
- **Engine**: Built with **Matter.js** (`Engine`, `Render`, `Runner`, `Bodies`, `Composite`, `MouseConstraint`).
- **Interactive Bodies**: Multi-colored geometric shapes (circles, squares, polygons) dropped into a canvas bounded by invisible barrier walls.
- **Custom Canvas Renderer**: Text labels (`"Cure Through wonder"`) are dynamically drawn on top of physics bodies matching their rotation angle and position.
- **Interactive State**: Clicking or dragging shapes alters background SVG letter highlighting.
- **Lifecycle & Cleanup**: Engine, renderers, runner instances, and window listeners are cleaned up inside `useEffect` return to eliminate memory leaks.

### 2. Interactive 3D Model Playroom (`components/shared/ThreeModelViewer.tsx`)
- **Engine**: Powered by **Three.js**, `@react-three/fiber`, and `@react-three/drei`.
- **Lighting & Camera**: Incorporates `ambientLight`, `Environment` presets (`forest`), and restricted `OrbitControls` (disabling zoom/pan for smooth page scrolling).
- **Models**: GLTF models (`Alphabet_a.jsx` / `.glb`) loaded dynamically inside WebGL canvas.

### 3. Mouse-Proximity Variable Typography (`components/shared/TurrimCTA.tsx`)
- **Font**: Variable font `Roboto_Flex` with customizable axis settings (`'wght'`, `'wdth'`, `'slnt'`).
- **Interaction**: Calculates Euclidean distance between mouse coordinates and individual character spans via `requestAnimationFrame` with lerped smoothing factor (`0.1`).
- **Dynamic CSS Variable Axes**: Letters physically expand and thicken (`wght: 100 -> 1000`, `wdth: 100 -> 151`) as the cursor approaches.

### 4. Smart Navigation & Layouts
- **Public Navbar (`components/shared/Navbar.tsx`)**: Sticky navigation with scroll-direction detection (`useScroll`, `useMotionValueEvent`) that auto-hides on downward scroll (>150px) and reappears on upward scroll. Features an animated language switch (EN/FR) with Framer Motion `layoutId="lang-bg"`.
- **Dashboard Layout (`components/layout/DashboardLayout.tsx`)**: Full-height responsive layout with a brand-green sidebar (`#064228`), active navigation pill transitions (`layoutId="active-pill"`), notification status indicators, and contextual header title updates.

### 5. Utility & State Management
- **Conditional Styling**: `cn()` utility in `lib/utils.ts` combining `clsx` and `tailwind-merge`.
- **Notification Helpers (`utils/notification-utils.ts`)**:
  - `formatRelativeTime(isoString)`: Formats timestamps into `"Xs ago"`, `"Xm ago"`, `"Xh ago"`, `"Xd ago"`, `"Xw ago"`.
  - `groupNotifications(items)`: Partitions flat notification items into chronological groups (`Today`, `Yesterday`, `Earlier`).

---

## 🎨 Design System & Styling Guidelines

> 📘 **For comprehensive AI Agent rules, component blueprints, and complete color tokens, see [DESIGN_SYSTEM_GUIDELINES.md](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/DESIGN_SYSTEM_GUIDELINES.md) and [.agents/rules/design-system.md](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/.agents/rules/design-system.md).**

### 1. Tailwind CSS v4 Configuration (`app/globals.css`)
Tailwind CSS v4 uses a **CSS-first configuration** with `@import "tailwindcss";` and `@theme inline`.

- **Color Space**: Uses **OKLCH** color values for perceptual color uniformity and accessible contrast.
- **Color Variables**:
  - `--background`: Light / Dark mode responsive backgrounds.
  - `--foreground`: Text color.
  - `--primary` / `--primary-foreground`: Primary action elements.
  - `--secondary`: `#E8E8E8` / Custom neutral accents.
  - `--brand-green`: `#064228` (Primary brand accent for dashboard and sidebar).
  - `--brand-green-muted`: `#2D5A43` / `#DFFADA`.
  - `--accent-gold`: `#DC9F12` / `#996300`.
- **Border Radius**: Defined through CSS token `--radius: 0.625rem;` with scalable calc functions (`radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-2xl`, etc.).

### 2. Typography
- **Primary Body & Display**: `Inter` (via `next/font/google` variable `--font-inter`).
- **Monospace**: `Geist_Mono` (variable `--font-geist-mono`).
- **Interactive Experimental**: `Roboto_Flex` with dynamic variable font axes.

---

## 📐 Coding Conventions & Standards

### 1. Component Design & Boundaries
- **Server Components by Default**: Keep components as Server Components unless interactivity, state, lifecycle hooks, or Framer Motion requires Client Components.
- **Client Components (`"use client"`)**: Explicitly add `"use client"` at the very top of files utilizing `useState`, `useEffect`, `useRef`, `usePathname`, or Framer Motion `motion.*`.
- **Atomic Hierarchy**:
  - `components/ui/`: Generic, primitive components with zero domain logic.
  - `components/shared/`: Cross-page reusable domain components.
  - `components/page/<Feature>/`: Domain-specific page subcomponents.
  - `components/layout/`: Structural frame layouts.

### 2. Naming Standards
- **Component Files**: `PascalCase` (e.g., `CourseCard.tsx`, `Hero.tsx`).
- **Utility / Config Files**: `kebab-case` or `camelCase` (e.g., `notification-utils.ts`, `utils.ts`).
- **Types / Interfaces**: `PascalCase` (e.g., `Course`, `NotificationItem`, `NotificationGroup`).
- **Props Interfaces**: Suffix with `Props` (e.g., `CourseCardProps`).

### 3. Animation & Physics Rules
- Prefer subtle, spring-based animations (`type: "spring", bounce: 0.2, duration: 0.6`).
- Always use Framer Motion `layoutId` for sliding pill indicators (tabs, navigation links, toggle switches).
- Always clean up Canvas event listeners, `requestAnimationFrame` IDs, and Matter.js / Three.js engines in `useEffect` cleanup return functions.

---

## 📝 Recent Updates & Changelog

### 2026-08-27
- **Lenis Smooth Scrolling (`components/providers/SmoothScrollProvider.tsx`)**: Integrated `@lenis/react` (`lenis`) for ultra-smooth inertia-based scrolling across all pages. Configured `@import "lenis/dist/lenis.css";` in `globals.css` and added `data-lenis-prevent` to nested scrollable containers (e.g., Dashboard layout main scroll, video playlist scroll) to ensure seamless nested scrolling without lockouts.
- **Complete Codebase Audit & Documentation**: Fully analyzed and updated `CODE_STRUCTURE.md` to document the entire project architecture, route hierarchy (`(auth)`, `(public)`, `dashboard`), component breakdown across all features, Matter.js 2D physics integration, Three.js 3D model viewer, dynamic variable font mechanics, and Tailwind CSS v4 design tokens.

### 2026-02-11
- **Carousel Component (`components/ui/carousel.tsx`)**: Updated `CarouselPrevious` and `CarouselNext` to support rendering children. This allows for custom icon implementation, replacing the default Lucide arrows when needed.
- **Curiosity Carousel (`components/page/Home/CuriosityCarousel.tsx`)**: Implemented custom solid triangle SVG icons for navigation buttons. Updated styles to remove default shadcn button styling (border, background, hover effects) and adjusted colors to a specific brown tone (`#996300`) to match design requirements.
