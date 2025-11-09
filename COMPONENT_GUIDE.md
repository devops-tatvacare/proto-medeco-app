# Component Usage Guide

## Button Component

```tsx
import { Button } from "@/components/Button";

// Primary button (default)
<Button onClick={() => console.log("clicked")}>
  Click Me
</Button>

// Secondary button
<Button variant="secondary">
  Secondary Action
</Button>

// Different sizes
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

## StatusBar Component

```tsx
import { StatusBar } from "@/components/StatusBar";

<StatusBar
  userName="Dr.Umesh"
  hasNotifications={true}
/>
```

## ServiceCard & ServiceGrid

```tsx
import { ServiceCard, ServiceGrid } from "@/components/ServiceCard";

// Individual card
<ServiceCard
  title="Generate DDx"
  icon={<YourIconComponent />}
  isSponsored={true}
  onClick={() => console.log("clicked")}
/>

// Grid layout
<ServiceGrid services={[
  { id: "1", title: "Service 1", icon: <Icon />, isSponsored: true },
  { id: "2", title: "Service 2", icon: <Icon />, isSponsored: false },
]} />
```

## RewardCard Component

```tsx
import { RewardCard } from "@/components/RewardCard";

// Large variant
<RewardCard
  headline="Differential Diagnosis"
  description="AI tool helps generate possible diagnosis"
  ctaText="Generate DDx"
  variant="large"
  isSponsored={true}
  icon={<YourIcon />}
  onCtaClick={() => console.log("CTA clicked")}
/>

// Medium variant
<RewardCard
  headline="TatvaShots"
  description="Discover the latest medical news"
  ctaText="Explore"
  variant="medium"
  icon={<YourIcon />}
/>
```

## AskTatvaCard Component

```tsx
import { AskTatvaCard } from "@/components/AskTatvaCard";

<AskTatvaCard
  onCtaClick={() => console.log("Chat Now clicked")}
/>
```

## RemoteCareBanner Component

```tsx
import { RemoteCareBanner } from "@/components/RemoteCareBanner";

<RemoteCareBanner
  onCtaClick={() => console.log("Explore clicked")}
/>
```

## Using Design Tokens

```tsx
import { designTokens, typographyClasses } from "@/lib/design-tokens";

// Colors
<div style={{ backgroundColor: designTokens.colors.primary }}>
  Purple background
</div>

// Typography classes
<h1 className={typographyClasses.h1}>
  Heading 1
</h1>

<p className={typographyClasses.body2}>
  Body text
</p>
```

## Using the Figma Hook

```tsx
"use client";

import { useFigmaDesign } from "@/hooks/useFigmaDesign";

export function MyComponent() {
  const { tokens, isLoading, error, isMcpConnected } = useFigmaDesign();

  if (isLoading) return <div>Loading design tokens...</div>;
  if (error) return <div>Using fallback tokens</div>;

  return (
    <div style={{ color: tokens.colors.text.primary }}>
      Connected to MCP: {isMcpConnected ? "Yes" : "No"}
    </div>
  );
}
```

## Customizing Components

### Extending Button
```tsx
import { Button } from "@/components/Button";

<Button
  className="shadow-lg hover:shadow-xl"
  onClick={handleClick}
>
  Custom styled button
</Button>
```

### Custom Service Icons
```tsx
const customIcon = (
  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
    <svg>...</svg>
  </div>
);

<ServiceCard title="My Service" icon={customIcon} />
```

## Mock Data Structure

```tsx
// Service Item
{
  id: string;
  title: string;
  icon: React.ReactNode;
  isSponsored?: boolean;
}

// Reward Card Data
{
  id: string;
  headline: string;
  description: string;
  ctaText: string;
  icon?: React.ReactNode;
  isSponsored: boolean;
  variant: "large" | "medium";
}

// User Profile
{
  name: string;
  role: string;
  hasNotifications: boolean;
}
```

## Styling Tips

1. **Use Tailwind classes** for quick styling
2. **Import design tokens** for brand colors
3. **Use typography classes** for consistent fonts
4. **Follow 8px spacing** system: use `spacing.sm`, `spacing.md`, etc.
5. **Mobile-first** approach: default styles are for 390px, use `md:` for larger screens

## Common Patterns

### Adding a new service
```tsx
import { mockServices } from "@/lib/mock-data";

const newService = {
  id: "my-service",
  title: "My Service",
  icon: <MyIcon />,
  isSponsored: false,
};

// In your component
<ServiceGrid services={[...mockServices, newService]} />
```

### Handling clicks
```tsx
<RewardCard
  {...cardProps}
  onCtaClick={() => {
    console.log("Tracking analytics...");
    router.push("/details");
  }}
/>
```

### Conditional rendering
```tsx
{user.isAuthenticated && (
  <StatusBar
    userName={user.name}
    hasNotifications={user.notifications > 0}
  />
)}
```
