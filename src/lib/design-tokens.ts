/**
 * Dr.Tatva Design System Tokens
 * Extracted from Figma MCP server
 *
 * Color Palette:
 * - Primary: #4B4AD5 (Purple for CTAs)
 * - Text Primary: #1f2933 (Main text)
 * - Text Secondary: #3d4854 (Secondary text)
 * - White: #FFFFFF
 *
 * Typography:
 * - Headings: Poppins (H1-H4, SH1-SH2)
 * - Body/Caption: Manrope
 *
 * Spacing: 8px base unit
 */

import { DesignTokens } from "@/types/figma";

export const designTokens: DesignTokens = {
  colors: {
    primary: "#4B4AD5",
    white: "#FFFFFF",
    text: {
      primary: "#1f2933",
      secondary: "#3d4854",
    },
    gray: {
      gray800: "#1f2933",
    },
    button: {
      labelPrimary: "#ffffff",
    },
    labels: {
      primary: "#000000",
    },
    textColors: {
      text80: "#454551",
    },
  },
  typography: {
    h1: {
      family: "Poppins",
      style: "SemiBold",
      size: 24,
      weight: 600,
      lineHeight: 32,
    },
    h3Medium: {
      family: "Poppins",
      style: "Medium",
      size: 18,
      weight: 500,
      lineHeight: 26,
    },
    h3SemiBold: {
      family: "Poppins",
      style: "SemiBold",
      size: 18,
      weight: 600,
      lineHeight: 26,
    },
    h4Medium: {
      family: "Poppins",
      style: "Medium",
      size: 16,
      weight: 500,
      lineHeight: 24,
    },
    h4SemiBold: {
      family: "Poppins",
      style: "SemiBold",
      size: 16,
      weight: 600,
      lineHeight: 24,
    },
    sh1: {
      family: "Poppins",
      style: "Regular",
      size: 14,
      weight: 400,
      lineHeight: 22,
    },
    sh2: {
      family: "Poppins",
      style: "Regular",
      size: 12,
      weight: 400,
      lineHeight: 18,
    },
    body2Regular: {
      family: "Manrope",
      style: "Regular",
      size: 14,
      weight: 400,
      lineHeight: 22,
    },
    caption1Bold: {
      family: "Manrope",
      style: "Bold",
      size: 12,
      weight: 700,
      lineHeight: 16,
    },
    caption2Regular: {
      family: "Manrope",
      style: "Regular",
      size: 10,
      weight: 400,
      lineHeight: 14,
    },
  },
  spacing: {
    base: 8,
  },
};

// Helper functions for consistent spacing
export const spacing = {
  xs: `${designTokens.spacing.base * 0.5}px`, // 4px
  sm: `${designTokens.spacing.base}px`, // 8px
  md: `${designTokens.spacing.base * 2}px`, // 16px
  lg: `${designTokens.spacing.base * 3}px`, // 24px
  xl: `${designTokens.spacing.base * 4}px`, // 32px
  xxl: `${designTokens.spacing.base * 6}px`, // 48px
};

// Typography CSS class helpers
export const typographyClasses = {
  h1: "font-poppins font-semibold text-xl leading-7",
  h3Medium: "font-poppins font-medium text-base leading-6",
  h3SemiBold: "font-poppins font-semibold text-base leading-6",
  h4Medium: "font-poppins font-medium text-sm leading-5",
  h4SemiBold: "font-poppins font-semibold text-sm leading-5",
  sh1: "font-poppins font-normal text-xs leading-[18px]",
  sh2: "font-poppins font-normal text-[11px] leading-4",
  body2: "font-manrope font-normal text-xs leading-[18px]",
  body1: "font-manrope font-normal text-sm leading-5",
  caption1Bold: "font-manrope font-bold text-[11px] leading-4",
  caption2: "font-manrope font-normal text-[9px] leading-3",
};
