# Figma Node Capture Orchestration Plan

## Project Details
- **Framework**: Next.js 16 with React 19, TypeScript, Tailwind CSS
- **Assets Directory**: `/public/assets/`
- **Capture Directory**: `/figma-captures/`

## Current Scope
Building flow for: **Project app landing screen → Our offerings → Generate DDx**

## Process Status

### Phase 1: Setup ✓
- [x] Identified framework: Next.js 16
- [x] Created figma-captures directory
- [x] Confirmed assets directory: /public/assets/
- [x] Created orchestration plan file

### Phase 2: Capture Loop (IN PROGRESS)
**Current Sequence**: 2 (Ready for next node)

#### Capture Checklist for Node 1: ✓ COMPLETED
- [x] Call mcp__figma__get_design_context
- [x] Call mcp__figma__get_screenshot
- [x] Download images to /public/assets/ with proper naming (18 assets)
- [x] Save node data with sequence number
- [x] Update orchestration plan
- [x] Confirm to user

#### Capture Checklist for Node 2: ✓ COMPLETED
- [x] Call mcp__figma__get_design_context
- [x] Call mcp__figma__get_screenshot
- [x] Download images to /public/assets/ with proper naming (18 assets, 1 new)
- [x] Save node data with sequence number
- [x] Update orchestration plan
- [x] Confirm to user

#### Capture Checklist for Node 3: ✓ COMPLETED (Screenshot only)
- [x] Call mcp__figma__get_design_context (failed - MCP connection issue)
- [x] Call mcp__figma__get_screenshot (success)
- [~] Download images to /public/assets/ (N/A - no assets returned)
- [x] Save node data with sequence number
- [x] Update orchestration plan
- [x] Confirm to user

#### Capture Checklist for Node 4:
- [ ] Call mcp__figma__get_design_context
- [ ] Call mcp__figma__get_screenshot
- [ ] Download images to /public/assets/ with proper naming
- [ ] Save node data with sequence number
- [ ] Update orchestration plan
- [ ] Confirm to user

### Phase 3: Stitching (PENDING - Awaits "DONE" signal)
- [ ] Read all captured data in sequence
- [ ] Generate React components for "Generate DDx" flow
- [ ] Create proper routing structure
- [ ] Use local asset references
- [ ] Integrate into project

---

## Captured Nodes Registry

### Node 1: DDx Welcome & Introduction ✓
- **Status**: Completed
- **Node ID**: 1:29294
- **Timestamp**: 2025-11-18T17:13:00Z
- **Data File**: node-data.json (sequence: 1)
- **Assets**: 18 files (PNGs and SVGs)
- **Description**: DDx Welcome and Introduction Screen with purple gradient background, hero section "Revolutionize Diagnosis with AI", trust factors, and 3-step guide
- **Key Content**:
  - Welcome to DDx header with AI logo
  - Hero: "Revolutionize Diagnosis with AI"
  - Trust section: 4 points (AI algorithms, expert validated, HIPAA/GDPR, clinical studies)
  - How it works: 3 steps (patient details, symptoms, AI diagnosis)
  - Video preview thumbnail

### Node 2: DDx Scrolled State ✓
- **Status**: Completed
- **Node ID**: 1:29492
- **Timestamp**: 2025-11-18T17:15:00Z
- **Data File**: node-data.json (sequence: 2)
- **Assets**: 18 files (1 new SVG: 4d1e1016154368a30841f10c1915c57964547fe2.svg)
- **Description**: Same screen as Node 1 but with scrollable content showing full 'How it works' section
- **Key Content**:
  - Same base content as Node 1
  - Scrollable card content area (1483px height vs 662px)
  - Full visibility of video preview card
  - Interactive scroll indicators
- **Differences from Node 1**:
  - Scrollable vs static view
  - Extended content height
  - Overflow-y-auto enabled
  - Cursor pointer for interactivity

### Node 3: Generate DDx - Gender Selection ✓ (Screenshot Only)
- **Status**: Completed (MCP connection issue - screenshot only)
- **Node ID**: Unknown
- **Timestamp**: 2025-11-18T17:18:00Z
- **Data File**: node-data.json (sequence: 3)
- **Assets**: None (connection failed)
- **Description**: First screen of DDx generation flow - Patient gender selection
- **Key Content**:
  - Header: "Generate DDx" with back arrow and refresh icon
  - AI logo icon in purple
  - Prompt: "Let's get started! To begin, please select the Patient's Gender..."
  - Two radio options: Male (selected), Female
  - Clean white/light gray background
  - Bottom navigation bar
- **Note**: Design context not available due to MCP server connection issue

---

### Node 4: Generate DDx - Age Selection ✓ (Screenshot Only)
- **Status**: Completed
- **Timestamp**: 2025-11-18T17:20:00Z
- **Components Identified**:
  - Completed step indicator (gender with edit icon)
  - Purple AI logo icon
  - Scrollable age picker (16-20 visible, 18 selected)
  - Hand cursor/drag indicator
  - Blue gradient button "Select Age"
  - Navigation bar

---

### Node 5: Generate DDx - Symptoms Input ✓ (Screenshot Only)
- **Status**: Completed
- **Timestamp**: 2025-11-18T17:21:00Z
- **Components Identified**:
  - Fullscreen/expand icon (NEW)
  - Completed steps list (2 items with edit icons)
  - Example prompt cards with purple sparkle icons
  - Multi-line text input field
  - Plus icon (add details)
  - Purple microphone icon (voice input)

---

### Node 6: Generate DDx - Results Screen ✓ (Screenshot Only)
- **Status**: Completed
- **Timestamp**: 2025-11-18T17:22:00Z
- **Components Identified**:
  - PDF attachment icons (red)
  - Yellow warning/note banner
  - Blue share/export icon
  - Tab navigation (3 tabs with green active indicator)
  - Purple medical/diagnosis icons
  - Expandable diagnosis cards with chevron
  - Red dashed underline labels
  - Disclaimer text component

---

### Node 7: DDx History - List View ✓ (Screenshot Only)
- **Status**: Completed
- **Timestamp**: 2025-11-18T17:23:00Z
- **Components Identified**:
  - X close button (modal header)
  - History list item component
  - Timestamp formatting (Today, dates)
  - Truncated text with ellipsis
  - List dividers (gray horizontal lines)
  - Scrollable list container

---

## Last Updated
2025-11-18T17:23:00Z - Node 7 captured. History view documented. Ready for Node 8.
