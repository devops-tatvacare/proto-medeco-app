/**
 * Asset Configuration
 * Centralized mapping of all image assets used in the application
 *
 * NOTE: Some assets are placeholders pointing to local files that need to be
 * exported from Figma and placed in the public/assets directory.
 */

export const imageAssets = {
  // Status Bar Icons
  statusBar: {
    battery: "/assets/status-battery.svg",
    wifi: "/assets/status-wifi.svg",
    cellular: "/assets/status-cellular.svg",
  },

  // Navigation Icons
  navigation: {
    arrowUp: "/assets/tab-arrow-up.svg",
    discover: "/assets/tab-discover.svg",
    feed: "/assets/tab-feed.svg",
    bookmarks: "/assets/tab-bookmarks.svg",
    settings: "/assets/settings-icon.svg",
    settings2: "/assets/settings-2.svg",
  },

  // Branding & Logos
  branding: {
    tatvashotsLogo: "/assets/IMG_0056.png", // Already exists locally
    tatvashotsLogoFigma: "/assets/tatvashots-logo-figma.png",
    tatvashotsIcon: "/assets/tatvashots-icon.png",
    tatvacontent: "/assets/tatvacontent-logo.png", // Already exists locally
    mytatva: "/assets/mytatva-logo.png",
  },

  // Feature Icons
  features: {
    ddx: "/assets/ddx-icon.png",
    tatvaAI: "/assets/tatva-ai-mascot.png",
    remoteCare: "/assets/remote-care-icon.png",
  },

  // Content Images
  content: {
    heroBanner: "/assets/hero-banner.png",
    ozempicHero: "/assets/ozempic-hero.jpg", // Already exists locally
    cardTrending1: "/assets/card-trending-1.png",
    cardTrending2: "/assets/card-trending-2.png",
  },

  // Remote Care Banner
  remoteCare: {
    teamPhoto: "/assets/remote-care-team.png",
    leftFigure: "/assets/remote-care-left.png",
    centerFigure: "/assets/remote-care-center.png",
    ornamentBg: "/assets/remote-care-ornament.svg",
  },

  // AI Components
  ai: {
    animationBg: "/assets/ai-animation-bg.svg",
    symbol: "/assets/ai-symbol.svg",
    mascot: "/assets/tatva-ai-mascot.png",
  },

  // User Interface
  ui: {
    userProfile: "/assets/user-profile-icon.svg",
  },
} as const;

/**
 * Get asset URL with optional fallback
 */
export function getAssetUrl(path: string, fallback?: string): string {
  return path || fallback || "";
}
