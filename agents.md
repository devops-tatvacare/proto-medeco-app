# Codex Agent Quickstart

Project: **Dr.Tatva HCP App** — mobile-first prototype for healthcare professionals (Next.js 16, React 19, TypeScript, Tailwind CSS 4).

## What’s Here
- App Router pages under `src/app`: home (`page.tsx`), DDx chat (`/ddx`), care pathway (`/care-pathway` + `/care-pathways`), CME/content, video drilldown, notebooks, APIs (MCP proxy at `/api/mcp`).
- Shared UI in `src/components` (MobileFrame, StatusBar, RemoteCareBanner, ServiceCard grid, RewardCard, AskTatvaCard, TabBar, ChatOverlay, MCP status checker; ddx/* and care-pathway/* subcomponents).
- State/context in `src/context`: `DDxContext`, `CarePathwayContext`, `PathwayBuilderContext`.
- Design tokens in `src/lib/design-tokens.ts`; mock data in `src/lib/mock-data.ts`.
- Global styles & Tailwind v4 import in `src/app/globals.css`; fonts Poppins + Manrope from Google Fonts.
- Assets under `public/assets`; Figma capture metadata in `figma-captures/` (`orchestration-plan.md`, `node-data.json`).
- Documentation: `README.md`, `DDx-IMPLEMENTATION-SUMMARY.md`, `CARE-PATHWAY-IMPLEMENTATION.md`.

## Tech Stack & Conventions
- Next.js 16 App Router with React 19, TypeScript strict. Scripts: `npm run dev | build | start | lint`.
- Tailwind CSS 4 via `@import "tailwindcss";` in globals; mobile width target 390px.
- Use design tokens (`designTokens`, `spacing`, `typographyClasses`) for colors, spacing, typography instead of ad-hoc values where possible.
- Assets: prefer existing files in `public/assets`; new assets should follow existing naming and live in that folder.
- Components assume `MobileFrame` wrapper and sticky status bar for mobile UI; keep layouts mobile-first.

## Key Flows
- **Home (/)**: hero banner, service grid (routes: ddx, care-pathways, content), reward cards, Ask Tatva AI card.
- **DDx (/ddx)**: chat-like linear flow (welcome → gender → age → symptoms/files → results) managed by `DDxContext`; includes history modal. Edit actions reset downstream steps.
- **Care Pathway (/care-pathway)**: staged workflow (assessment → risk classification → interventions → monitoring → outcome) managed by `CarePathwayContext`; entry often from DDx “View Care Pathway”.

## MCP / Figma
- MCP proxy endpoints at `/api/mcp/*`; expected env vars: `FIGMA_MCP_SERVER_URL` and optional `NEXT_PUBLIC_FIGMA_MCP_SERVER_URL`.
- Capture plan and node registry live in `figma-captures/orchestration-plan.md`; continue sequence if resuming captures.

## How to Work Safely
- Keep TypeScript types used in contexts/components in sync when adding fields; flows depend on step enums in contexts.
- Reuse design tokens and typography helpers; avoid new inline hex/px unless tokenized.
- Maintain mobile framing and sticky status bar; check for regressions in 390px viewport.
- When adding pages/components, follow App Router pattern (`src/app/<route>/page.tsx`) and wrap in `MobileFrame`.
- Lint with `npm run lint` before handoff; no other automated tests currently present.
