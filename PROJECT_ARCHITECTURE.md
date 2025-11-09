# Dr.Tatva HCP App - Project Architecture & Component Patterns

## 1. OVERALL DIRECTORY STRUCTURE

```
medeco-hcp-app/
├── src/
│   ├── app/
│   │   ├── api/mcp/[...path]/route.ts          # MCP proxy for Figma integration
│   │   ├── layout.tsx                           # Root layout with font variables
│   │   ├── globals.css                          # Global styles + Tailwind + fonts
│   │   ├── page.tsx                             # Home page A1 (main screen)
│   │   ├── content/
│   │   │   └── page.tsx                         # Content detail drilldown page
│   │   └── video-drilldown/
│   │       └── page.tsx                         # Video detail drilldown page
│   ├── components/
│   │   ├── StatusBar.tsx                        # Time + system icons + header
│   │   ├── RemoteCareBanner.tsx                 # Hero banner with gradient
│   │   ├── ServiceCard.tsx                      # Service grid (2x2)
│   │   ├── RewardCard.tsx                       # Large/medium card variants
│   │   ├── AskTatvaCard.tsx                     # AI feature showcase
│   │   ├── Button.tsx                           # Primary/secondary buttons
│   │   ├── TabBar.tsx                           # Bottom navigation (Home, Discover, Feed, Bookmarks)
│   │   ├── ContentDetail.tsx                    # Content vault detail view
│   │   ├── VideoDrilldown.tsx                   # Video player with transcript
│   │   ├── ChatOverlay.tsx                      # Chat interface
│   │   └── mcp-status-checker.tsx               # MCP connection status
│   ├── hooks/
│   │   └── useFigmaDesign.ts                    # Hook for fetching Figma tokens
│   ├── lib/
│   │   ├── design-tokens.ts                     # Design system tokens + helpers
│   │   └── mock-data.ts                         # Mock data for all components
│   └── types/
│       └── figma.ts                             # TypeScript interfaces
├── public/
│   └── assets/                                  # Static images
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 2. MOBILE FRAME/DEVICE COMPONENTS

The mobile device frame is a **container pattern** used on both the home page and drilldown pages.

### Location: `src/app/page.tsx` & `src/app/content/page.tsx`

**Pattern:**
```tsx
// Mobile device container with iOS-style bezel
<div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
  {/* Mobile Device Frame */}
  <div className="relative w-full max-w-[540px]">
    {/* Device Bezel */}
    <div className="rounded-[65px] bg-black p-4 shadow-2xl">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-9 bg-black rounded-b-[40px] z-10" />

      {/* Screen */}
      <div className="bg-white rounded-[60px] overflow-hidden h-[1173px] flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Content Component Here */}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pt-4">
        <div className="w-40 h-1.5 bg-black rounded-full" />
      </div>
    </div>
  </div>
</div>
```

**Key specifications:**
- **Screen width**: 390px (mobile-first standard)
- **Screen height**: 1173px (flexible, scrollable)
- **Bezel radius**: 65px (rounded corners)
- **Notch**: 224px width × 36px height
- **Home indicator**: 160px width × 6px height
- **Aspect ratio**: iPhone 12+ style

---

## 3. CONTENT DETAILS SCREEN COMPONENT

### Location: `/src/components/ContentDetail.tsx`

**Structure:**
```
ContentDetail
├── Sticky Header (120px total height)
│   ├── Status Bar Row (54px)
│   │   ├── Time display (9:41)
│   │   └── System icons (cellular, WiFi, battery)
│   └── Header Content Row (66px)
│       ├── TatvaShots Logo
│       └── Settings Icon
├── Scrollable Content Area
│   ├── Hero Section (288px)
│   │   ├── Background image
│   │   ├── Gradient overlay
│   │   ├── Category tag (ORTHOPAEDIC)
│   │   ├── Title
│   │   └── Carousel indicators
│   ├── Trending Section
│   │   ├── Header with "View More"
│   │   └── Horizontal scroll cards (60px height)
│   ├── All News Section
│   │   ├── Header with "View More"
│   │   └── News list items (with thumbnails)
│   └── Topics Section
│       ├── Topic pills/filters
│       ├── Underline indicator
│       └── Content items with images
└── Tab Bar (77px, sticky at bottom)
    ├── Home (arrow back)
    ├── Discover
    ├── My Feed
    └── Bookmarks
```

**Key features:**
- Sticky header with z-index 50 for persistent display during scroll
- Scrollable content area with `overflow-y-auto`
- Horizontal scroll on trending cards with `scrollbar-hide`
- TabBar at bottom with Home click handler
- Uses design tokens for colors and typography

---

## 4. NAVIGATION & MENU BAR COMPONENTS

### TabBar Component
**Location:** `/src/components/TabBar.tsx`

**Implementation:**
```tsx
interface TabBarProps {
  onTabChange?: (tab: "home" | "discover" | "feed" | "bookmarks") => void;
  onHomeClick?: () => void;
  activeTab?: "home" | "discover" | "feed" | "bookmarks";
}

export function TabBar({ onTabChange, onHomeClick, activeTab = "discover" }: TabBarProps) {
  const [selected, setSelected] = useState<"home" | "discover" | "feed" | "bookmarks">(activeTab);

  const tabs = [
    { id: "home", label: "Home", isArrowBack: true },
    { id: "discover", label: "Discover", icon: imageAssets.discover },
    { id: "feed", label: "My feed", icon: imageAssets.myFeed },
    { id: "bookmarks", label: "Bookmarks", icon: imageAssets.bookmarks },
  ] as const;

  return (
    <div className="bg-white border-t border-gray-100 w-full">
      <div className="flex items-center justify-between px-6 h-[77px]">
        {/* Tabs with state management */}
      </div>
    </div>
  );
}
```

**Styling:**
- Height: 77px (h-[77px])
- Padding: 24px horizontal (px-6)
- Background: white
- Border-top: 1px gray-100
- Icons: 24px × 24px
- Selected state: purple color (#4B4AD5) + semibold weight
- Unselected state: gray-600 with opacity transitions

### StatusBar Component
**Location:** `/src/components/StatusBar.tsx`

- Time display with real-time update
- System icons (signal, WiFi, battery) via SVG
- User greeting with profile icon
- Notification indicator (blue dot)

---

## 5. STYLING SYSTEM

### **Framework: Tailwind CSS 4** 
- **CSS-in-JS approach**: Utility-first classes
- **No CSS Modules** - everything is Tailwind
- **PostCSS**: Used with Tailwind 4

**Configuration:**
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4
- `postcss.config.mjs`: Minimal config

**Global styles:** `/src/app/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-poppins: "Poppins", sans-serif;
  --font-manrope: "Manrope", sans-serif;
}
```

**Tailwind utilities used throughout:**
- `flex`, `gap-X`, `px-X`, `py-X` - layout & spacing
- `text-Xsl`, `font-semibold`, `leading-X` - typography
- `bg-color-XXX`, `border-color-XXX`, `text-color-XXX` - colors
- `rounded-Xpx`, `rounded-full` - borders
- `overflow-y-auto`, `overflow-x-auto` - scrolling
- `hover:`, `active:`, `group-hover:` - interactive states
- `transition-colors`, `duration-200` - animations
- `absolute`, `relative`, `sticky`, `z-50` - positioning
- `w-full`, `max-w-XXX`, `h-Xpx` - sizing
- `shadow-X`, `shadow-2xl` - shadows

---

## 6. DESIGN TOKENS & THEME CONFIGURATION

### Location: `/src/lib/design-tokens.ts`

**Color Palette:**
```tsx
colors: {
  primary: "#4B4AD5",        // Purple for CTAs and active states
  white: "#FFFFFF",
  text: {
    primary: "#1f2933",      // Main text (dark gray)
    secondary: "#3d4854",    // Secondary text (lighter gray)
  },
  gray: {
    gray800: "#1f2933",
  },
  button: {
    labelPrimary: "#ffffff", // White text on primary button
  },
  labels: {
    primary: "#000000",
  },
  textColors: {
    text80: "#454551",       // Alternative gray
  },
}
```

**Typography System:**
```tsx
typography: {
  h1: {                        // Headings (24px)
    family: "Poppins",
    size: 24,
    weight: 600,
    lineHeight: 32,
  },
  h3Medium: {                  // Headings Medium (18px)
    family: "Poppins",
    size: 18,
    weight: 500,
    lineHeight: 26,
  },
  h3SemiBold: {                // Headings Semibold (18px)
    family: "Poppins",
    size: 18,
    weight: 600,
    lineHeight: 26,
  },
  h4Medium: {                  // Headings Medium (16px)
    family: "Poppins",
    size: 16,
    weight: 500,
    lineHeight: 24,
  },
  h4SemiBold: {                // Headings Semibold (16px)
    family: "Poppins",
    size: 16,
    weight: 600,
    lineHeight: 24,
  },
  sh1: {                       // Small Heading 1 (14px)
    family: "Poppins",
    size: 14,
    weight: 400,
    lineHeight: 22,
  },
  sh2: {                       // Small Heading 2 (12px)
    family: "Poppins",
    size: 12,
    weight: 400,
    lineHeight: 18,
  },
  body2Regular: {              // Body text (14px)
    family: "Manrope",
    size: 14,
    weight: 400,
    lineHeight: 22,
  },
  caption1Bold: {              // Caption Bold (12px)
    family: "Manrope",
    size: 12,
    weight: 700,
    lineHeight: 16,
  },
  caption2Regular: {           // Caption Regular (10px)
    family: "Manrope",
    size: 10,
    weight: 400,
    lineHeight: 14,
  },
}
```

**Spacing System (8px base):**
```tsx
spacing: {
  base: 8,                     // 8px base unit
}

// Helper aliases:
spacing: {
  xs: "4px",                   // 0.5 × 8px
  sm: "8px",                   // 1 × 8px
  md: "16px",                  // 2 × 8px
  lg: "24px",                  // 3 × 8px
  xl: "32px",                  // 4 × 8px
  xxl: "48px",                 // 6 × 8px
}
```

**Typography Classes (Tailwind-based):**
```tsx
typographyClasses: {
  h1: "font-poppins font-semibold text-2xl leading-8",
  h3Medium: "font-poppins font-medium text-lg leading-[26px]",
  h3SemiBold: "font-poppins font-semibold text-lg leading-[26px]",
  h4Medium: "font-poppins font-medium text-base leading-6",
  h4SemiBold: "font-poppins font-semibold text-base leading-6",
  sh1: "font-poppins font-normal text-sm leading-[22px]",
  sh2: "font-poppins font-normal text-xs leading-[18px]",
  body2: "font-manrope font-normal text-sm leading-[22px]",
  caption1Bold: "font-manrope font-bold text-xs leading-4",
  caption2: "font-manrope font-normal text-[10px] leading-[14px]",
}
```

**Fonts:**
- **Poppins**: H1-H4, SH1-SH2 (headings) - weights: 400, 500, 600, 700
- **Manrope**: Body, Caption (body text) - weights: 400, 500, 600, 700
- Loaded via `next/font/google` in `layout.tsx`

---

## 7. IMPLEMENTATION PATTERNS

### Pattern 1: Component with Design Tokens
```tsx
import { designTokens, typographyClasses } from "@/lib/design-tokens";

export function MyComponent() {
  return (
    <div style={{ backgroundColor: designTokens.colors.primary }}>
      <h1 className={typographyClasses.h1}>Heading</h1>
      <p className={typographyClasses.body2}>Body text</p>
    </div>
  );
}
```

### Pattern 2: Sticky Header + Scrollable Content + Fixed Footer
```tsx
// Used in ContentDetail.tsx
<div className="w-full bg-neutral-50 flex flex-col h-full">
  {/* Sticky Header */}
  <div className="sticky top-0 z-50 w-full bg-white">
    {/* Header content */}
  </div>

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto scrollbar-hide">
    {/* Content items */}
  </div>

  {/* Fixed Bottom Navigation */}
  <TabBar />
</div>
```

### Pattern 3: Responsive Mobile Frame
```tsx
// Used in page.tsx files
<div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
  <div className="relative w-full max-w-[540px]">
    <div className="rounded-[65px] bg-black p-4 shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-9 bg-black rounded-b-[40px] z-10" />
      <div className="bg-white rounded-[60px] overflow-hidden h-[1173px] flex flex-col">
        {/* Content */}
      </div>
      <div className="flex justify-center pt-4">
        <div className="w-40 h-1.5 bg-black rounded-full" />
      </div>
    </div>
  </div>
</div>
```

### Pattern 4: Active State Management
```tsx
// TabBar component pattern
const [selected, setSelected] = useState<TabId>(activeTab);

const handleTabClick = (tabId: TabId) => {
  setSelected(tabId);
  onTabChange?.(tabId);
};

// Conditional styling based on state
className={`text-purple-600 font-semibold`} // if selected
className={`text-gray-600 group-hover:text-gray-700`} // if not selected
```

---

## 8. KEY ARCHITECTURAL PRINCIPLES

1. **Mobile-First Design**: All layouts designed for 390px width
2. **Tailwind CSS Only**: No CSS modules or styled-components
3. **Design Tokens First**: Colors and typography from tokens, not hardcoded
4. **Component Composition**: Small, reusable components with props
5. **State Management**: React hooks (useState) for local state
6. **Responsive**: Flexbox-based layouts that adapt to screen size
7. **Accessibility**: ARIA labels on interactive elements
8. **Performance**: Proper use of overflow and scrollbar-hide for mobile
9. **Figma Integration**: MCP hook ready for live design token updates
10. **TypeScript**: Full type safety with strict mode

---

## 9. GUIDELINES FOR APPLYING TABBAR TO CONTENTDETAIL

Since you're applying TabBar styling to the ContentDetail screen:

1. **TabBar is already integrated** in `ContentDetail.tsx` (line 324-328)
2. **Height management**: TabBar = 77px, ensure content scrolls above it
3. **Sticky header**: ContentDetail header stays at top (z-50), TabBar at bottom
4. **Color consistency**: Both use primary purple (#4B4AD5) for active state
5. **Typography**: TabBar uses typography.sh2 for labels
6. **Spacing**: Use 8px base unit for internal TabBar spacing
7. **Icons**: Use Figma-provided SVG assets or inline SVG for back arrow
8. **Active state**: Primary purple background for text + darker icon opacity
9. **Transitions**: Use `transition-colors duration-200` for smooth state changes
10. **Mobile viewport**: Ensure TabBar doesn't overflow 390px width

---

## 10. QUICK REFERENCE: FILE LOCATIONS

| Component | Path | Purpose |
|-----------|------|---------|
| TabBar | `src/components/TabBar.tsx` | Bottom navigation (4 tabs) |
| ContentDetail | `src/components/ContentDetail.tsx` | Content vault detail view |
| StatusBar | `src/components/StatusBar.tsx` | Time + icons + header |
| Design Tokens | `src/lib/design-tokens.ts` | Colors, typography, spacing |
| Mock Data | `src/lib/mock-data.ts` | Sample data for components |
| Types | `src/types/figma.ts` | TypeScript interfaces |
| Content Page | `src/app/content/page.tsx` | Content detail page route |
| Home Page | `src/app/page.tsx` | Home page with mobile frame |

