/**
 * ContentDetail Component
 * Content vault drilldown view based on Figma node 1:41940
 * Includes sticky TatvaShots header from node 1:42151
 * Bottom TabBar navigation
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { typographyClasses } from "@/lib/design-tokens";
import { imageAssets } from "@/lib/assets";
import { TabBar } from "./TabBar";
import { Notebooks } from "./Notebooks";
import { Notes } from "./Notes";

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
        <div className="flex items-center justify-between px-4 py-3 h-[66px] bg-white border-t border-gray-100 gap-3">
          {/* Logo */}
          <div className="h-[50px] flex-1 flex items-center">
            <img
              alt="TatvaShots"
              src="/assets/IMG_0056.png"
              className="h-full object-contain"
            />
          </div>

          {/* Settings Icon */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <img alt="settings" src={imageAssets.navigation.settings} className="w-full h-full" />
          </div>
        </div>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
        {activeView === "discover" && (
        <div className="flex flex-col gap-6 pb-8 px-6 pt-6">
          {/* Hero Section with Image */}
          <button
            onClick={handleHeroClick}
            className="relative h-72 w-full overflow-hidden rounded-bl-2xl rounded-br-2xl bg-gradient-to-br from-pink-400 via-pink-300 to-pink-500 hover:shadow-lg transition-shadow active:opacity-95 cursor-pointer group"
            aria-label="View video details"
          >
            <img
              src={imageAssets.content.ozempicHero}
              alt="Ozempic medication"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Hero Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 text-white">
              {/* Category Tag */}
              <div className="w-fit">
                <div className="bg-blue-100 rounded-full px-3 py-1 inline-block">
                  <span className="text-xs font-semibold text-blue-900">
                    ENDOCRINOLOGY
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold leading-tight">
                Ozempic is a game-changer. Here's how it works.
              </h2>

              {/* Carousel Indicator */}
              <div className="flex gap-1">
                <div className="relative h-1 flex-grow bg-white/50 rounded-full overflow-hidden">
                  <div className="absolute h-full w-3/5 bg-white rounded-full" />
                </div>
                <div className="h-1 w-1 bg-white rounded-full" />
                <div className="h-1 w-1 bg-white rounded-full" />
              </div>
            </div>
          </button>

          {/* Trending Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span>✨</span> Trending
              </h3>
              <a
                href="#"
                className="text-sm text-purple-600 font-medium underline hover:text-purple-700"
              >
                View More
              </a>
            </div>

            {/* Trending Cards Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-60 rounded-3xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="h-32 bg-gradient-to-br from-blue-300 to-purple-300 overflow-hidden">
                    {idx === 1 && (
                      <img
                        src={imageAssets.card1Image}
                        alt="trending"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {idx === 2 && (
                      <img
                        src={imageAssets.card2Image}
                        alt="trending"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="inline-block">
                      <span className="text-xs font-semibold text-yellow-900 bg-yellow-100 px-2 py-1 rounded-full">
                        {idx % 2 === 0 ? "CARDIOLOGY" : "ORTHOPAEDIC"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      Generative smart AI platform specially for cardiologist in
                      India & Thailand
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All News Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span>📰</span> All News
              </h3>
              <a
                href="#"
                className="text-sm text-purple-600 font-medium underline hover:text-purple-700"
              >
                View More
              </a>
            </div>

            {/* News List */}
            <div className="space-y-4">
              {[
                {
                  category: "ORTHOPAEDIC",
                  title: "Understanding the types of Breast Cancer",
                },
                {
                  category: "CARDIOLOGY",
                  title: "Understanding the types of Breast Cancer",
                },
                {
                  category: "GYNAECOLOGY",
                  title: "Understanding the types of Breast Cancer",
                },
                {
                  category: "NEUROLOGY",
                  title: "Understanding the types of Breast Cancer",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex gap-4 items-start cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-yellow-900 bg-yellow-100 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium line-clamp-3">
                        {item.title}
                      </p>
                    </div>

                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-22 h-22 rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-pink-200 to-blue-200">
                      <img
                        src={imageAssets.card1Image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  {idx < 3 && <div className="h-px bg-gray-200" />}
                </div>
              ))}
            </div>
          </div>

          {/* Topics Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">🏷️</span>
              <h3 className="text-xl font-semibold text-gray-900">Topics</h3>
            </div>

            {/* Topic Pills */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {[
                  "Hepatology",
                  "Infectious Disease",
                  "Gynaecology",
                  "Neurology",
                  "Hepatology",
                  "Pulmonology",
                ].map((topic, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      idx === 0
                        ? "text-purple-600 border-b-2 border-purple-600 pb-1.5"
                        : "text-gray-600 hover:text-gray-700"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Active topic underline indicator */}
              <div className="mt-4 h-0.5 bg-gradient-to-r from-purple-600 to-transparent rounded-full w-16" />
            </div>

            {/* Content items with images */}
            <div className="space-y-4">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      Understanding the types of Breast Cancer Understanding the
                      types of Breast Cancer
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 bg-gradient-to-br from-orange-200 to-red-200">
                    <img
                      src={imageAssets.card2Image}
                      alt="topic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}

              {/* View More Button */}
              <div className="flex justify-center pt-4">
                <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors underline">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
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
