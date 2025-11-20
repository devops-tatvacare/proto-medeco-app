/**
 * CarePathwaysTabBar Component
 * Bottom navigation bar for Care Pathways with tabs: Home, Overview, Create, Templates
 * Based on TabBar component but customized for Care Pathways
 */

"use client";

import React, { useState } from "react";

// Image assets downloaded from Figma - now local to project
const imageAssets = {
  arrowUp: "/assets/0365a5d0c99f5aeaf60c2a6907a9c79e822025c4.svg",
  discover: "/assets/417062a3ee2545ea5bc28b9237085ddddf818fd0.svg",
  myFeed: "/assets/14e9e91c8a7741c4e2e2a5687487ef376947e7e8.svg",
  bookmarks: "/assets/cb8b829558ea79a0160fe1c70b5e089239bb0e8b.svg",
};

interface CarePathwaysTabBarProps {
  onTabChange?: (tab: "overview" | "create" | "templates") => void;
  onHomeClick?: () => void;
  activeTab?: "overview" | "create" | "templates";
}

export function CarePathwaysTabBar({ onTabChange, onHomeClick, activeTab = "overview" }: CarePathwaysTabBarProps) {
  const [selected, setSelected] = useState<"home" | "overview" | "create" | "templates">(activeTab);

  React.useEffect(() => {
    setSelected(activeTab);
  }, [activeTab]);

  const tabs = [
    { id: "home", label: "Home", isArrowBack: true },
    { id: "overview", label: "Overview", icon: imageAssets.discover },
    { id: "create", label: "Pathways", icon: imageAssets.bookmarks },
    { id: "templates", label: "Templates", icon: imageAssets.myFeed },
  ] as const;

  const handleTabClick = (tabId: typeof tabs[number]["id"]) => {
    if (tabId === "home") {
      onHomeClick?.();
      return;
    }
    setSelected(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="bg-white border-t border-gray-100 w-full">
      {/* Tab Bar Buttons container */}
      <div className="flex items-center justify-between px-6 h-[77px] box-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="flex flex-col items-center gap-1 transition-colors duration-200 group"
            aria-label={tab.label}
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center h-6 w-6">
              {"isArrowBack" in tab ? (
                /* Home: arrow-up rotated 270deg */
                <div className="rotate-[270deg]">
                  <img
                    alt={tab.label}
                    src={imageAssets.arrowUp}
                    className={`w-6 h-6 transition-opacity duration-200 ${
                      selected === tab.id ? "opacity-100" : "opacity-70 group-hover:opacity-85"
                    }`}
                  />
                </div>
              ) : (
                /* Overview, Create, Templates: 24x24 icons */
                <img
                  alt={tab.label}
                  src={tab.icon}
                  className={`w-6 h-6 transition-opacity duration-200 ${
                    selected === tab.id ? "opacity-100" : "opacity-70 group-hover:opacity-85"
                  }`}
                />
              )}
            </div>
            {/* Label - Poppins 12px */}
            <p
              className={`font-poppins text-xs leading-4 transition-colors duration-200 whitespace-nowrap ${
                selected === tab.id
                  ? "font-semibold text-[#4B4AD5]" /* P-CTA-100: active */
                  : "font-normal text-[#454551] group-hover:text-[#3d4854]" /* T-Text-80: inactive */
              }`}
            >
              {tab.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
