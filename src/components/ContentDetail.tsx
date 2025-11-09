/**
 * ContentDetail Component
 * Content vault drilldown view based on Figma node 1:41940
 * Includes sticky TatvaShots header from node 1:42151
 * Bottom TabBar navigation
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { typographyClasses } from "@/lib/design-tokens";
import { TabBar } from "./TabBar";

// Image assets from Figma
const imageAssets = {
  tatvashotsLogo: "http://localhost:3845/assets/f2b54445247db8f8300dc69638a0ab70b2c26312.png",
  statusBarBattery: "http://localhost:3845/assets/e4868acc8a0c614eaeac54b83706c99d62389ea4.svg",
  statusBarWifi: "http://localhost:3845/assets/00ef7896ae5b5d01884ef59b3a0f16f84b2946ef.svg",
  statusBarCellular: "http://localhost:3845/assets/ec0ea5ff4c95cacc501ee57c32042320415a40b4.svg",
  settingsIcon: "http://localhost:3845/assets/1b401b5c77bf342c4d0a62756dfc9751b84cd77c.svg",
  heroBanner: "http://localhost:3845/assets/2d9a0650ed65af75a47657269a92892006284519.png",
  card1Image: "http://localhost:3845/assets/b161b711d745f0bb3973517bfe4d26b4a302e38d.png",
  card2Image: "http://localhost:3845/assets/c777e93932b22ce617d2a25ea177aaaa5a9c1937.png",
};

interface ContentDetailProps {
  onBackClick?: () => void;
}

export function ContentDetail({ onBackClick }: ContentDetailProps) {
  const router = useRouter();

  const handleHeroClick = () => {
    router.push("/video-drilldown");
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full">
      {/* Sticky Header (120px total) */}
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
              <img alt="cellular" src={imageAssets.statusBarCellular} className="w-full h-full" />
            </div>

            {/* WiFi */}
            <div className="w-[17.142px] h-[10.23px] flex items-center justify-center">
              <img alt="wifi" src={imageAssets.statusBarWifi} className="w-full h-full" />
            </div>

            {/* Battery */}
            <div className="w-[25px] h-[12px] flex items-center justify-center relative">
              <div className="absolute border border-black border-solid opacity-[0.35] rounded-[4.3px] w-[25px] h-[12px]" />
              <div className="absolute bg-black rounded-[2.5px] w-[21px] h-[5.33px]" />
            </div>
          </div>
        </div>

        {/* Header Content Row (66px) */}
        <div className="flex items-center justify-between px-4 py-3 h-[66px] bg-white border-t border-gray-100 gap-3">
          {/* Back Button */}
          <button
            onClick={onBackClick}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

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
            <img alt="settings" src={imageAssets.settingsIcon} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
        <div className="flex flex-col gap-6 pb-8 px-6 pt-6">
          {/* Hero Section with Image */}
          <button
            onClick={handleHeroClick}
            className="relative h-72 w-full overflow-hidden rounded-bl-2xl rounded-br-2xl bg-gradient-to-b from-black/40 to-black/70 hover:shadow-lg transition-shadow active:opacity-95 cursor-pointer group"
            aria-label="View video details"
          >
            <img
              src={imageAssets.heroBanner}
              alt="Content hero"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Hero Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 text-white">
              {/* Category Tag */}
              <div className="w-fit">
                <div className="bg-yellow-100 rounded-full px-3 py-1 inline-block">
                  <span className="text-xs font-semibold text-yellow-900">
                    ORTHOPAEDIC
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold leading-tight">
                Understanding the types of serious brain tumour and its symptoms
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
      </div>

      {/* Tab Bar - Bottom Navigation */}
      <TabBar onTabChange={(tab) => console.log("Tab changed:", tab)} activeTab="discover" />
    </div>
  );
}
