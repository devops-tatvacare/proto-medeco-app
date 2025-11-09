# Quick Reference - Architecture at a Glance

## Project Stack
- **Framework**: Next.js 16.0.1 + React 19.2.0 + TypeScript
- **Styling**: Tailwind CSS 4 (utility-first, no CSS modules)
- **Fonts**: Poppins (headings) + Manrope (body text)
- **Design System**: Custom tokens from Figma MCP

## Directory Map

```
src/
├── app/
│   ├── page.tsx (Home page with device frame)
│   ├── content/page.tsx (Content detail page)
│   ├── video-drilldown/page.tsx (Video detail page)
│   ├── globals.css (Tailwind + fonts)
│   └── layout.tsx (Root with font setup)
├── components/
│   ├── TabBar.tsx (Bottom navigation)
│   ├── ContentDetail.tsx (Content vault view + TabBar)
│   ├── StatusBar.tsx (Time + system icons + header)
│   └── [other components]
├── lib/
│   ├── design-tokens.ts (Colors, typography, spacing)
│   └── mock-data.ts (Sample data)
└── types/
    └── figma.ts (TypeScript interfaces)
```

## Key Numbers
- Mobile width: 390px
- Device frame height: 1173px
- TabBar height: 77px
- Primary color: #4B4AD5 (purple)
- Text primary: #1f2933 (dark gray)
- Spacing base: 8px

## Active States
- **TabBar selected**: text-purple-600 + font-semibold
- **Icon selected**: opacity-100
- **Icon unselected**: opacity-70 (hover: opacity-85)

## Component Structure Pattern
```
Mobile Frame (device bezel)
└── Screen (white, rounded)
    └── Content Component
        ├── Sticky Header (z-50)
        ├── Scrollable Content (flex-1)
        └── TabBar (bottom navigation)
```

## Must-Use Patterns
1. **Colors**: Use design-tokens.ts values, not hardcoded
2. **Typography**: Use typographyClasses for text styling
3. **Spacing**: Use multiples of 8px (4px, 8px, 16px, 24px, 32px, 48px)
4. **Transitions**: Use transition-colors duration-200 for interactive elements
5. **Mobile first**: Design for 390px, scale up if needed

## File Quick Links
| What | Where |
|------|-------|
| Colors & fonts | `/src/lib/design-tokens.ts` |
| TabBar styling | `/src/components/TabBar.tsx` |
| Content detail view | `/src/components/ContentDetail.tsx` |
| Device frame | `/src/app/content/page.tsx` |
| Global CSS | `/src/app/globals.css` |

## Tailwind Classes Cheatsheet for TabBar
- `text-purple-600` - Active tab color
- `font-semibold` - Active tab weight (600)
- `text-gray-600` - Inactive tab color
- `text-xs` - Label size (12px)
- `w-6 h-6` - Icon size (24px)
- `h-[77px]` - TabBar height
- `gap-1` - Icon to label spacing (4px)
- `transition-colors` - Smooth color change
- `group-hover:text-gray-700` - Hover state

## What's Already Working
✓ TabBar fully integrated in ContentDetail
✓ Design tokens system with all colors/typography
✓ Mobile device frame with notch
✓ Sticky header + scrollable content
✓ State management for active tabs
✓ Responsive Tailwind styling
✓ TypeScript throughout

## TabBar Props
```tsx
<TabBar
  activeTab="discover"              // "home" | "discover" | "feed" | "bookmarks"
  onHomeClick={() => router.back()} // Back button handler
  onTabChange={(tab) => {...}}      // Tab change handler
/>
```
