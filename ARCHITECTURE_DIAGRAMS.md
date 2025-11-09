# Visual Architecture Diagram

## 1. Application Structure Tree

```
medeco-hcp-app/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout + font setup
│   │   ├── page.tsx                  # Home page with mobile frame
│   │   ├── globals.css               # Tailwind + fonts + theme
│   │   │
│   │   ├── content/
│   │   │   └── page.tsx              # Content detail page
│   │   │       └── uses ContentDetail component
│   │   │           └── includes TabBar at bottom
│   │   │
│   │   └── video-drilldown/
│   │       └── page.tsx              # Video detail page
│   │
│   ├── components/                   # React components
│   │   ├── TabBar.tsx                # Navigation tabs
│   │   ├── ContentDetail.tsx         # Content view + TabBar
│   │   ├── StatusBar.tsx             # Header + time + icons
│   │   ├── VideoDrilldown.tsx        # Video player
│   │   ├── RemoteCareBanner.tsx      # Hero banner
│   │   ├── ServiceCard.tsx           # Service grid
│   │   ├── RewardCard.tsx            # Card variants
│   │   ├── AskTatvaCard.tsx          # AI showcase
│   │   ├── Button.tsx                # Button component
│   │   ├── ChatOverlay.tsx           # Chat UI
│   │   └── mcp-status-checker.tsx    # Status display
│   │
│   ├── lib/                          # Utilities & data
│   │   ├── design-tokens.ts          # Colors, typography, spacing
│   │   │   ├── colors: primary, text, gray, button
│   │   │   ├── typography: h1-h4, sh1-sh2, body, caption
│   │   │   ├── spacing: 8px base unit
│   │   │   └── typographyClasses: Tailwind class helpers
│   │   │
│   │   └── mock-data.ts              # Sample data
│   │       ├── mockServices
│   │       ├── mockRewardCards
│   │       └── mockUserProfile
│   │
│   ├── hooks/
│   │   └── useFigmaDesign.ts         # Figma MCP integration
│   │
│   └── types/
│       └── figma.ts                  # TypeScript interfaces
│
├── public/
│   └── assets/                       # Static images
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── postcss.config.mjs                # PostCSS config
│
└── Documentation (ROOT LEVEL)
    ├── PROJECT_ARCHITECTURE.md       # This detailed guide
    ├── TABBAR_STYLING_GUIDE.md       # TabBar styling details
    ├── QUICK_REFERENCE.md            # Quick lookup guide
    ├── PROJECT_SUMMARY.md            # Original summary
    └── COMPONENT_GUIDE.md            # Component usage
```

---

## 2. Component Hierarchy Diagram

```
RootLayout
└── Head: <html>, <body>, fonts setup
    │
    └── Page (page.tsx) or SubPage
        │
        └── MobileFrame (device bezel + notch)
            │
            └── ScreenContent (white, rounded screen)
                │
                ├── Sticky Header
                │   ├── StatusBar
                │   │   ├── Time display
                │   │   └── System icons (signal, wifi, battery)
                │   │
                │   └── HeaderContent
                │       ├── Logo/Branding
                │       └── Action buttons
                │
                ├── ScrollableContent (flex-1, overflow-y-auto)
                │   ├── HeroSection
                │   ├── TrendingSection
                │   ├── NewsSection
                │   ├── TopicsSection
                │   └── etc.
                │
                └── TabBar (bottom navigation)
                    ├── Home (back arrow)
                    ├── Discover (icon)
                    ├── My Feed (icon)
                    └── Bookmarks (icon)
```

---

## 3. CSS Architecture

```
Global Styling
│
├── globals.css (src/app/)
│   ├── Google Fonts import
│   │   ├── Poppins (400, 500, 600, 700)
│   │   └── Manrope (400, 500, 600, 700)
│   │
│   ├── @import "tailwindcss"
│   │   └── All Tailwind utilities available
│   │
│   ├── CSS Variables
│   │   ├── --background: #ffffff
│   │   ├── --foreground: #171717
│   │   ├── --font-poppins
│   │   └── --font-manrope
│   │
│   └── Custom Classes
│       ├── .font-poppins
│       ├── .font-manrope
│       └── .scrollbar-hide
│
└── Design Tokens (lib/design-tokens.ts)
    ├── designTokens object
    │   ├── colors: { primary, white, text, gray, button, labels }
    │   ├── typography: { h1, h3Medium, h3SemiBold, h4Medium, h4SemiBold, sh1, sh2, body2, caption }
    │   └── spacing: { base: 8 }
    │
    └── typographyClasses object
        └── Pre-built Tailwind class strings for each type
```

---

## 4. Styling System Layers

```
Design System (source of truth)
│
├── Design Tokens File (design-tokens.ts)
│   ├── Color definitions
│   ├── Typography specifications
│   └── Spacing system
│
├── Global CSS (globals.css)
│   ├── CSS Variables for colors/fonts
│   ├── Tailwind CSS import
│   └── Custom utility classes
│
└── Component Level (component files)
    ├── Tailwind utility classes
    ├── Conditional classes (active states, hover, etc.)
    └── Inline styles (rarely)
```

---

## 5. Data Flow

```
User Interaction
│
└── Component State (useState)
    │
    ├── TabBar.tsx
    │   └── [selected] state tracks active tab
    │       └── Callbacks: onTabChange, onHomeClick
    │
    └── ContentDetail.tsx
        └── Uses router for navigation
            └── Passes props to TabBar
                └── Listens for TabBar events
```

---

## 6. Page Navigation Structure

```
Home Page (/)
└── Mobile Frame with HomePageContent
    ├── StatusBar
    ├── Services Grid
    ├── Reward Cards
    └── (No TabBar on home)

Content Detail Page (/content)
└── Mobile Frame with ContentDetail
    ├── Sticky Header (StatusBar + Logo)
    ├── Scrollable Content
    │   ├── Hero Section
    │   ├── Trending Cards
    │   ├── News List
    │   └── Topics
    └── TabBar (bottom navigation)
        └── Active: "discover"

Video Drilldown Page (/video-drilldown)
└── Mobile Frame with VideoDrilldown
    ├── Video Player
    ├── Transcript
    └── Related Content
```

---

## 7. TabBar Integration Detail

```
ContentDetail.tsx
│
├── Layout: flex flex-col h-full
│   ├── Sticky Header: sticky top-0 z-50
│   ├── Content: flex-1 overflow-y-auto scrollbar-hide
│   └── TabBar: w-full (appears at bottom)
│
└── TabBar Component (imported)
    ├── Container: bg-white border-t border-gray-100
    ├── Layout: flex items-center justify-between px-6 h-[77px]
    │
    └── Tabs (4 items)
        ├── Home: { id: "home", label: "Home", isArrowBack: true }
        │   └── Back arrow SVG (inline)
        │
        ├── Discover: { id: "discover", label: "Discover", icon: discover.svg }
        │   └── Figma asset from localhost:3845
        │
        ├── My Feed: { id: "feed", label: "My feed", icon: myFeed.svg }
        │   └── Figma asset from localhost:3845
        │
        └── Bookmarks: { id: "bookmarks", label: "Bookmarks", icon: bookmarks.svg }
            └── Figma asset from localhost:3845

Tab Button Styling:
└── Button: flex flex-col items-center gap-1 transition-colors duration-200
    │
    ├── Icon:
    │   ├── Size: w-6 h-6 (24px × 24px)
    │   ├── Selected: opacity-100
    │   └── Unselected: opacity-70 (hover: opacity-85)
    │
    └── Label (p):
        ├── Font: font-poppins text-xs leading-4
        ├── Selected: font-semibold text-purple-600
        └── Unselected: font-regular text-gray-600 (hover: text-gray-700)
```

---

## 8. Design Token Mapping

```
Design Tokens (TypeScript Object)
│
├── Colors
│   ├── primary: "#4B4AD5" → Tailwind: text-purple-600
│   ├── white: "#FFFFFF" → Tailwind: bg-white
│   ├── text.primary: "#1f2933" → Tailwind: text-gray-900
│   └── text.secondary: "#3d4854" → Tailwind: text-gray-600
│
├── Typography
│   ├── h1: { size: 24, weight: 600, font: Poppins }
│   │   → Tailwind: text-2xl font-semibold font-poppins
│   ├── sh2: { size: 12, weight: 400, font: Poppins }
│   │   → Tailwind: text-xs font-normal font-poppins
│   └── body2: { size: 14, weight: 400, font: Manrope }
│       → Tailwind: text-sm font-normal font-manrope
│
└── Spacing
    ├── base: 8 → Tailwind: arbitrary values [8px]
    ├── sm (8px) → Tailwind: p-2, gap-2
    ├── md (16px) → Tailwind: p-4, gap-4
    └── lg (24px) → Tailwind: p-6, gap-6
```

---

## 9. Build & Deploy Structure

```
Development
├── src/ (source code)
├── npm run dev
└── http://localhost:3000

Build Process
├── TypeScript compilation
├── Next.js optimization
├── Tailwind CSS purging
└── Output: .next/ directory

Production
├── npm run build
├── npm run start
├── Optimized bundle
└── Ready for deployment
```

---

## 10. File Dependency Graph

```
page.tsx (home)
├── StatusBar.tsx
├── RemoteCareBanner.tsx
├── ServiceCard.tsx
├── RewardCard.tsx
├── AskTatvaCard.tsx
├── Button.tsx
└── design-tokens.ts

content/page.tsx
└── ContentDetail.tsx
    ├── TabBar.tsx
    │   └── design-tokens.ts
    ├── StatusBar.tsx (content version)
    └── design-tokens.ts

design-tokens.ts (central)
├── Colors
├── Typography
└── Spacing

globals.css (shared)
├── Google Fonts
├── Tailwind CSS
└── CSS Variables
```

