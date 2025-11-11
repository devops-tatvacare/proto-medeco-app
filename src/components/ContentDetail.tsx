/**
 * ContentDetail Component
 * Content vault drilldown view based on Figma node 1:41940
 * Includes sticky TatvaShots header from node 1:42151
 * Bottom TabBar navigation
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
import { typographyClasses } from "@/lib/design-tokens";
import { imageAssets } from "@/lib/assets";
import { TabBar } from "./TabBar";
import { Notebooks } from "./Notebooks";
import { Notes } from "./Notes";
import { CMETimeline } from "./CMETimeline";

interface ContentDetailProps {
  onBackClick?: () => void;
}

export function ContentDetail({ onBackClick }: ContentDetailProps) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"discover" | "bookmarks" | "feed">("discover");

  const handleHeroClick = () => {
    router.push("/video-drilldown");
  };

  const handleHomeClick = () => {
    onBackClick?.();
  };

  const handleDiscoverClick = () => {
    setActiveView("discover");
  };

  const handleBookmarksClick = () => {
    setActiveView("bookmarks");
  };

  const handleFeedClick = () => {
    setActiveView("feed");
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full">
      {/* Status Bar - Always shown */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        {/* Status Bar Row */}
        <div className="flex items-center justify-between px-6 py-3 h-[54px] bg-white">
          {/* Time */}
          <p className="font-poppins font-medium text-base text-black tracking-[0.1px]">
            9:41
          </p>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-black">
            {/* Signal strength */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
              <path d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Header Content Row - Only shown for Discover view */}
        {activeView === "discover" && (
        <div className="flex items-center justify-between px-6 py-2 h-[66px] bg-white border-t border-gray-100 gap-3">
          {/* Logo */}
          <div className="flex-1 flex items-center overflow-hidden">
            <img
              alt="CME"
              src="/assets/cme-logo.png"
              className="h-[60px] w-auto max-w-none"
            />
          </div>

          {/* Settings Icon */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <Settings2 className="w-6 h-6 text-gray-700" />
          </div>
        </div>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
        {activeView === "discover" && (
          <CMETimeline />
        )}

        {activeView === "bookmarks" && (
          <Notes />
        )}

        {activeView === "feed" && (
          <Notebooks />
        )}
      </div>

      {/* Tab Bar - Bottom Navigation */}
      <TabBar
        onHomeClick={handleHomeClick}
        onBookmarksClick={handleBookmarksClick}
        onFeedClick={handleFeedClick}
        onTabChange={(tab) => {
          if (tab === "discover") {
            handleDiscoverClick();
          }
        }}
        activeTab={activeView}
      />
    </div>
  );
}
