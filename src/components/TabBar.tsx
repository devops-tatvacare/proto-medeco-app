/**
 * TabBar Component
 * Bottom navigation bar with tabs: Home, Discover, My feed, Bookmarks
 * Extracted from Figma node 1:40432
 */

"use client";

import React, { useState } from "react";

// Image assets from Figma
const imageAssets = {
  arrowUp: "http://localhost:3845/assets/0365a5d0c99f5aeaf60c2a6907a9c79e822025c4.svg",
  discover: "http://localhost:3845/assets/417062a3ee2545ea5bc28b9237085ddddf818fd0.svg",
  myFeed: "http://localhost:3845/assets/14e9e91c8a7741c4e2e2a5687487ef376947e7e8.svg",
  bookmarks: "http://localhost:3845/assets/cb8b829558ea79a0160fe1c70b5e089239bb0e8b.svg",
};

interface TabBarProps {
  onTabChange?: (tab: "home" | "discover" | "feed" | "bookmarks") => void;
  onHomeClick?: () => void;
  activeTab?: "home" | "discover" | "feed" | "bookmarks";
}

export function TabBar({ onTabChange, onHomeClick, activeTab = "discover" }: TabBarProps) {
  const [selected, setSelected] = useState<"home" | "discover" | "feed" | "bookmarks">(activeTab);

  const tabs = [
    { id: "home", label: "Home", isArrowBack: true },
    { id: "discover", label: "Discover", icon: imageAssets.discover },
    { id: "feed", label: "My feed", icon: imageAssets.myFeed },
    { id: "bookmarks", label: "Bookmarks", icon: imageAssets.bookmarks },
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
      <div className="flex items-center justify-between px-6 h-[77px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="flex flex-col items-center gap-1 transition-colors duration-200 group"
            aria-label={tab.label}
          >
            <div className="flex items-center justify-center">
              {"isArrowBack" in tab ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-600 group-hover:text-gray-700 transition-colors"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <img
                  alt={tab.label}
                  src={tab.icon}
                  className={`w-6 h-6 transition-colors duration-200 ${
                    selected === tab.id ? "opacity-100" : "opacity-70 group-hover:opacity-85"
                  }`}
                />
              )}
            </div>
            <p
              className={`font-poppins text-xs leading-4 transition-colors duration-200 whitespace-nowrap ${
                selected === tab.id
                  ? "font-semibold text-purple-600"
                  : "font-regular text-gray-600 group-hover:text-gray-700"
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
