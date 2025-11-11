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
        {/* Status Bar Row (54px) */}
        <div className="flex items-center justify-between px-4 py-3 h-[54px] bg-white">
          {/* Time */}
          <p className="font-poppins font-medium text-[16px] text-black tracking-[0.1px]">
            9:41
          </p>

          {/* Status Icons */}
          <div className="flex items-center gap-1">
            {/* Cellular */}
            <div className="w-[19.2px] h-[10.41px] flex items-center justify-center">
              <img alt="cellular" src={imageAssets.statusBar.cellular} className="w-full h-full" />
            </div>

            {/* WiFi */}
            <div className="w-[17.142px] h-[10.23px] flex items-center justify-center">
              <img alt="wifi" src={imageAssets.statusBar.wifi} className="w-full h-full" />
            </div>

            {/* Battery */}
            <div className="w-[25px] h-[12px] flex items-center justify-center relative">
              <div className="absolute border border-black border-solid opacity-[0.35] rounded-[4.3px] w-[25px] h-[12px]" />
              <div className="absolute bg-black rounded-[2.5px] w-[21px] h-[5.33px]" />
            </div>
          </div>
        </div>

        {/* Header Content Row - Only shown for Discover view */}
        {activeView === "discover" && (
        <div className="flex items-center justify-between px-4 py-2 h-[66px] bg-white border-t border-gray-100 gap-3">
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
