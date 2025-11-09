# Dr.Tatva HCP App

A fully functional **Next.js 16 + React 19 + TypeScript** prototype of the Dr.Tatva Healthcare Professional platform. This is a mobile-first healthcare professional app with service offerings, AI integration, and content management features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18+ and npm
- Figma MCP server running locally (optional, for Figma assets)

### Setup

```bash
# Install dependencies
npm install

# Configure environment (optional)
cp .env.local.example .env.local

# Start the app
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)**

### Available Scripts
- `npm run dev` – Start dev server
- `npm run build` – Create optimized build
- `npm run start` – Run production server
- `npm run lint` – Run ESLint

---

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Home page with services & rewards
│   ├── content/page.tsx           # Content vault detail page
│   ├── video-drilldown/page.tsx  # Video player page
│   ├── layout.tsx                 # Root layout with fonts
│   └── globals.css                # Global styles + Tailwind + fonts
│
├── components/
│   ├── StatusBar.tsx              # Header with time & user greeting
│   ├── RemoteCareBanner.tsx       # Hero banner
│   ├── ServiceCard.tsx            # Service grid cards
│   ├── RewardCard.tsx             # Reward/incentive cards
│   ├── AskTatvaCard.tsx           # AI assistant showcase
│   ├── TabBar.tsx                 # Bottom navigation (4 tabs)
│   ├── Button.tsx                 # Primary/secondary buttons
│   ├── ContentDetail.tsx          # Content vault with TabBar
│   ├── ChatOverlay.tsx            # Chat interface
│   └── mcp-status-checker.tsx     # MCP connection status
│
├── lib/
│   ├── design-tokens.ts           # Colors, typography, spacing
│   └── mock-data.ts               # Sample data for components
│
├── hooks/
│   └── useFigmaDesign.ts          # Figma integration hook
│
└── types/
    └── figma.ts                   # TypeScript interfaces
```

---

## 🎨 Design System

**Tech Stack:**
- Tailwind CSS 4 (utility-first styling)
- Next.js 16 (App Router)
- React 19 (latest)
- TypeScript 5 (strict mode)
- Figma MCP for design tokens

**Design Tokens:** (`src/lib/design-tokens.ts`)
- **Colors:** Primary (#4B4AD5), text colors, grays
- **Typography:** Poppins (headings) + Manrope (body)
- **Spacing:** 8px base unit (4px, 8px, 16px, 24px, 32px, 48px)

**Device Specs:**
- Mobile width: 390px
- TabBar height: 77px
- iOS-style notch included

---

## 🏗️ Architecture Overview

### Key Components

**StatusBar** - Displays time, system status, user greeting
**ServiceGrid** - 4-card grid for main services
**RewardCard** - Large card variants for incentives
**AskTatvaCard** - AI feature showcase
**TabBar** - Bottom navigation with 4 tabs (Home, Discover, Feed, Bookmarks)

### Navigation Flow
```
Home (/)
  ├── Content button → /content (Content Vault)
  ├── Video → /video-drilldown (Video Player)
  └── TabBar → Switch between tabs
```

### Styling Patterns
1. Use design-tokens from `src/lib/design-tokens.ts`
2. Apply Tailwind utility classes for responsive design
3. Use `typographyClasses` for consistent typography
4. Mobile-first approach (390px base width)

---

## 🔗 Figma MCP Integration

The app includes an MCP proxy at `/api/mcp/*` for Figma integration.

**Environment Variables:**
```
FIGMA_MCP_SERVER_URL=http://localhost:3845
NEXT_PUBLIC_FIGMA_MCP_SERVER_URL=http://localhost:3845 (optional)
```

**Test the proxy:**
```bash
curl http://localhost:3000/api/mcp/health
```

---

## 📊 Current Status

✅ **Completed:**
- Home page (A1 design) fully implemented
- All core components (StatusBar, Cards, TabBar, etc.)
- Design system with tokens
- TypeScript strict mode
- Mobile frame with iOS styling
- Navigation routing
- Mock data integration

🔄 **In Development:**
- Backend API integration
- Real data sources
- Advanced features

---

## 🛠️ Common Tasks

### Add a New Component
1. Create file in `src/components/YourComponent.tsx`
2. Import design tokens: `import { designTokens, typographyClasses } from "@/lib/design-tokens"`
3. Use Tailwind classes with design tokens
4. Export from component file

### Modify Colors/Typography
Edit `src/lib/design-tokens.ts` - all design tokens are centralized here.

### Add a New Page
Create a new folder in `src/app/[page-name]/page.tsx` with the App Router pattern.

### Update TabBar
Modify `src/components/TabBar.tsx` and integrate in the component using it (e.g., ContentDetail).

---

## 📝 Notes

- **Design Tokens:** Extracted from Figma, centralized in one file for easy updates
- **Mobile-First:** All layouts designed for 390px viewport
- **Type Safety:** Full TypeScript with strict mode enabled
- **No CSS Modules:** Pure Tailwind utility classes for consistency

---

## 📦 Tech Stack Summary

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | Poppins, Manrope (Google Fonts) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Design System | Figma MCP |

---

**Last Updated:** November 10, 2025
**Status:** Active Development
