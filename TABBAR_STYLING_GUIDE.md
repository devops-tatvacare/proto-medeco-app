# TabBar Styling Implementation Guide

## Current Implementation

The TabBar is already integrated at the bottom of ContentDetail.tsx and uses consistent styling with the rest of the application.

### TabBar Component Location
**File:** `/src/components/TabBar.tsx` (92 lines)

### Current Styling Details

```tsx
// Container
<div className="bg-white border-t border-gray-100 w-full">
  <div className="flex items-center justify-between px-6 h-[77px]">
```

**Container CSS:**
- Background: `bg-white` (white)
- Border-top: `border-t border-gray-100` (1px light gray)
- Width: `w-full` (100% of parent)
- Height: `h-[77px]` (77px fixed)
- Padding: `px-6` (24px horizontal)
- Layout: `flex items-center justify-between` (flexbox, space-between)

### Tab Button Styling

```tsx
<button
  onClick={() => handleTabClick(tab.id)}
  className="flex flex-col items-center gap-1 transition-colors duration-200 group"
>
```

**Button CSS:**
- Layout: `flex flex-col items-center gap-1` (vertical flex, centered, 4px gap)
- Animation: `transition-colors duration-200` (smooth color transition)
- Hover group: `group` (enables group-hover on children)

### Icon Styling (SVG/Image)

```tsx
<img
  alt={tab.label}
  src={tab.icon}
  className={`w-6 h-6 transition-colors duration-200 ${
    selected === tab.id ? "opacity-100" : "opacity-70 group-hover:opacity-85"
  }`}
/>
```

**Icon CSS:**
- Size: `w-6 h-6` (24px × 24px)
- Animation: `transition-colors duration-200`
- Selected state: `opacity-100` (full opacity)
- Unselected state: `opacity-70` (70% opacity)
- Hover state: `group-hover:opacity-85` (85% opacity)

### Label Styling

```tsx
<p
  className={`font-poppins text-xs leading-4 transition-colors duration-200 whitespace-nowrap ${
    selected === tab.id
      ? "font-semibold text-purple-600"
      : "font-regular text-gray-600 group-hover:text-gray-700"
  }`}
>
  {tab.label}
</p>
```

**Label CSS:**
- Font: `font-poppins text-xs leading-4` (Poppins, 12px, 16px line-height)
- Whitespace: `whitespace-nowrap` (prevent wrapping)
- Animation: `transition-colors duration-200`
- Selected state:
  - Color: `text-purple-600` (#4B4AD5)
  - Weight: `font-semibold` (600)
- Unselected state:
  - Color: `text-gray-600`
  - Weight: `font-regular` (400)
  - Hover: `group-hover:text-gray-700`

---

## Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #4B4AD5 | Selected tab text color |
| `text.primary` | #1f2933 | Primary text (not used in TabBar) |
| `text.secondary` | #3d4854 | Secondary text (not used in TabBar) |
| **Font** | Poppins | Tab labels |
| **Size** | 12px | Tab label text (text-xs) |
| **Weight (selected)** | 600 | Semibold for active tab |
| **Weight (unselected)** | 400 | Regular for inactive tabs |
| **Icon size** | 24px | Width and height |
| **Container height** | 77px | Full TabBar height |

---

## Integration in ContentDetail

**Location in file:** Lines 323-328

```tsx
{/* Tab Bar - Bottom Navigation */}
<TabBar
  onHomeClick={handleHomeClick}
  onTabChange={(tab) => console.log("Tab changed:", tab)}
  activeTab="discover"
/>
```

**Props passed:**
- `onHomeClick`: Callback for home/back button
- `onTabChange`: Callback for tab changes
- `activeTab`: Currently active tab (default: "discover")

---

## Tab Configuration

The TabBar has 4 tabs defined as constants in the component:

```tsx
const tabs = [
  { id: "home", label: "Home", isArrowBack: true },
  { id: "discover", label: "Discover", icon: imageAssets.discover },
  { id: "feed", label: "My feed", icon: imageAssets.myFeed },
  { id: "bookmarks", label: "Bookmarks", icon: imageAssets.bookmarks },
];
```

**Tab IDs:** "home" | "discover" | "feed" | "bookmarks"

**Special handling:**
- `home` tab renders as back arrow SVG (no icon asset)
- Other tabs use Figma-provided SVG icons from localhost:3845

---

## Layout Hierarchy in ContentDetail

```
ContentDetail (flex flex-col h-full)
├── Sticky Header (sticky top-0 z-50)
│   ├── Status Bar (54px)
│   └── Header Content (66px)
├── Scrollable Content (flex-1 overflow-y-auto scrollbar-hide)
│   └── Content sections with padding
└── TabBar (w-full, appears at bottom due to flex-col layout)
```

**Key layout behaviors:**
1. ContentDetail uses `flex flex-col h-full` (full height, vertical flex)
2. Header uses `sticky top-0 z-50` (stays at top during scroll)
3. Content uses `flex-1 overflow-y-auto` (takes remaining space, scrollable)
4. TabBar appears last in DOM, rendered at bottom by flexbox layout
5. No explicit positioning needed - flexbox flow handles it

---

## Responsive Behavior

**Mobile (390px - current):**
- Full width TabBar with evenly distributed tabs
- 77px height with comfortable touch target (minimum 44px)
- Icons 24px × 24px
- 24px horizontal padding leaves 342px content area

**Potential desktop scaling:**
- Max-width constraint would apply (currently on device frame)
- Tabs might use different spacing or size
- Not currently implemented

---

## Styling Consistency Checklist

When applying or modifying TabBar styling, ensure:

- [ ] Use `text-purple-600` (#4B4AD5) for active state (from design tokens)
- [ ] Use `font-semibold` (weight: 600) for active labels
- [ ] Use `font-regular` (weight: 400) for inactive labels
- [ ] Use Poppins font for all labels (`font-poppins`)
- [ ] Use 12px text size (`text-xs`)
- [ ] Use 24px icons (`w-6 h-6`)
- [ ] Use 77px container height (`h-[77px]`)
- [ ] Use white background (`bg-white`)
- [ ] Use gray-100 border (`border-gray-100`)
- [ ] Use 4px gap between icon and label (`gap-1`)
- [ ] Use smooth transitions (`transition-colors duration-200`)
- [ ] Use opacity changes for icon states (100%, 85%, 70%)
- [ ] Use gray-600/gray-700 for inactive/hover states
- [ ] Maintain 24px horizontal padding (`px-6`)

---

## Color Palette Reference

For TabBar styling decisions:

```
Primary Interactive:
  Active/Selected: #4B4AD5 (purple-600) ← Used for active tab text

Neutral/Inactive:
  Default text: #666666 (gray-600) ← Used for inactive tab labels
  Hover text: #5a5a5a (gray-700) ← Used on hover
  Border: #f3f4f6 (gray-100) ← Used for border-top
  
Background:
  Container: #FFFFFF (white)

Icon States:
  Full: opacity-100 (selected)
  Hover: opacity-85 (unselected on hover)
  Default: opacity-70 (unselected)
```

---

## Common Modifications

### 1. Change active tab color
```tsx
// In TabBar.tsx, change:
"font-semibold text-purple-600"
// To:
"font-semibold text-blue-600" // or your color
```

### 2. Change tab height
```tsx
// In TabBar.tsx, change:
<div className="flex items-center justify-between px-6 h-[77px]">
// To:
<div className="flex items-center justify-between px-6 h-[88px]">
```

### 3. Adjust icon size
```tsx
// In TabBar.tsx, change:
className={`w-6 h-6 ...`}
// To:
className={`w-7 h-7 ...`}
```

### 4. Change gap between icon and label
```tsx
// In TabBar.tsx, change:
className="flex flex-col items-center gap-1 ..."
// To:
className="flex flex-col items-center gap-2 ..."
```

### 5. Make border thicker
```tsx
// In TabBar.tsx, change:
<div className="bg-white border-t border-gray-100 w-full">
// To:
<div className="bg-white border-t-2 border-gray-100 w-full">
```

---

## Testing the TabBar

### Current state:
1. Home tab: Shows back arrow, calls `onHomeClick()`
2. Other tabs: Show icons from Figma, call `onTabChange(tabId)`
3. Active tab: Purple text, semibold, full icon opacity
4. Inactive tab: Gray text, regular weight, 70% icon opacity
5. Hover: Gray text darkens to gray-700, icon opacity to 85%

### To test functionality:
1. Navigate to `/content` page
2. See TabBar at bottom of ContentDetail
3. Click different tabs and observe state changes
4. Click Home (back arrow) to navigate back
5. Verify colors match design tokens

---

## Files to Review

1. **TabBar.tsx** - The component itself
2. **ContentDetail.tsx** - Where TabBar is integrated (line 324)
3. **design-tokens.ts** - Design token definitions (line 22-39)
4. **globals.css** - Font families and CSS variables

---

## Next Steps for Customization

If you need to customize TabBar styling:

1. Review the current implementation in `/src/components/TabBar.tsx`
2. Check design token values in `/src/lib/design-tokens.ts`
3. Test changes locally with `npm run dev`
4. Ensure responsive behavior on mobile viewport
5. Maintain accessibility with proper ARIA labels
6. Update this guide if making breaking changes

