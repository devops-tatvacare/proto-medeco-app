/**
 * Figma Design System Types
 * Generated from Dr.Tatva's Figma design tokens
 */

export interface FigmaFont {
  family: string;
  style: string;
  size: number;
  weight: number;
  lineHeight: number;
}

export interface DesignTokens {
  colors: {
    primary: string;
    white: string;
    text: {
      primary: string;
      secondary: string;
    };
    gray: {
      gray800: string;
    };
    button: {
      labelPrimary: string;
    };
    labels: {
      primary: string;
    };
    textColors: {
      text80: string;
    };
  };
  typography: {
    h1: FigmaFont;
    h3Medium: FigmaFont;
    h3SemiBold: FigmaFont;
    h4Medium: FigmaFont;
    h4SemiBold: FigmaFont;
    sh1: FigmaFont;
    sh2: FigmaFont;
    body2Regular: FigmaFont;
    caption1Bold: FigmaFont;
    caption2Regular: FigmaFont;
  };
  spacing: {
    base: number;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  isSponsored: boolean;
}

export interface RewardCardData {
  id: string;
  headline: string;
  description: string;
  ctaText: string;
  icon?: string;
  isSponsored: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  hasNotifications: boolean;
}
