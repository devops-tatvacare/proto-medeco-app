/**
 * AskTatvaCard Component
 * Card with AI engine animation placeholder, mascot, and CTA
 */

"use client";

import React from "react";
import { Button } from "./Button";
import { typographyClasses } from "@/lib/design-tokens";

interface AskTatvaCardProps {
  onCtaClick?: () => void;
}

export function AskTatvaCard({ onCtaClick }: AskTatvaCardProps) {
  return (
    <div className="relative w-full bg-white rounded-3xl overflow-hidden">
      {/* Background gradient waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 342 324"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 Q 85 30, 170 50 T 342 50 L 342 324 L 0 324 Z"
            fill="url(#gradient1)"
            opacity="0.1"
          />
          <path
            d="M0 100 Q 85 80, 170 100 T 342 100 L 342 324 L 0 324 Z"
            fill="url(#gradient2)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4B4AD5" />
              <stop offset="100%" stopColor="#7B7AE5" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B3AC5" />
              <stop offset="100%" stopColor="#6B6AD5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Text Area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <h3 className={`${typographyClasses.h3Medium} text-gray-900 mb-3`}>
            Tatva AI
          </h3>
          <p className={`${typographyClasses.sh2} text-gray-600 mb-4`}>
            Leverage Tatva AI, get personalized medical insights from Pubmed.
          </p>
          <Button onClick={onCtaClick} size="medium" className="!w-auto px-6">
            <span>Chat Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>
        </div>

        {/* AI Engine Section */}
        <div className="flex items-center justify-between">
          {/* AI Animation with actual gradient background */}
          <div className="relative w-[120px] h-[120px]">
            {/* Gradient background with blur */}
            <div
              className="absolute inset-0 rounded-[28.4px] opacity-40 blur-[14.2px]"
              style={{
                backgroundImage: "conic-gradient(from 90deg, rgba(153, 106, 197, 1) 0%, rgba(198, 89, 189, 1) 6.02%, rgba(243, 71, 181, 1) 12.05%, rgba(245, 112, 191, 1) 15.28%, rgba(247, 153, 202, 1) 18.51%, rgba(249, 194, 212, 1) 21.74%, rgba(251, 235, 222, 1) 24.97%, rgba(175, 243, 238, 1) 31.35%, rgba(136, 247, 245, 1) 34.54%, rgba(98, 251, 253, 1) 37.73%, rgba(136, 251, 242, 1) 40.77%, rgba(175, 250, 231, 1) 43.82%, rgba(251, 249, 208, 1) 49.91%, rgba(253, 203, 161, 1) 56.32%, rgba(254, 157, 113, 1) 62.72%, rgba(211, 175, 143, 1) 65.72%, rgba(168, 194, 174, 1) 68.73%, rgba(124, 212, 204, 1) 71.73%, rgba(81, 230, 234, 1) 74.73%, rgba(62, 194, 212, 1) 77.97%, rgba(42, 158, 190, 1) 81.20%, rgba(23, 122, 168, 1) 84.44%, rgba(3, 86, 146, 1) 87.68%, rgba(21, 88, 152, 1) 89.22%, rgba(39, 89, 159, 1) 90.76%, rgba(74, 93, 171, 1) 93.84%, rgba(110, 96, 184, 1) 96.92%, rgba(145, 99, 196, 1) 100%)"
              }}
            />

            {/* Main container with border and gradient */}
            <div className="absolute inset-0 rounded-[20.377px] border-[3.871px] border-[#9c68c4] bg-gradient-to-b from-[#10011f] to-[#0e0321] overflow-hidden">
              {/* Background animation SVGs */}
              <div className="absolute inset-0 opacity-30">
                <img
                  src="/assets/1e80272072e7c908b22fa11768f034ebaa17000e.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* AI Icon in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px]">
                <img
                  src="/assets/1c70c7e91d92c0853499c42f0349f492b1387b36.svg"
                  alt="AI Symbol"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* MyTatva AI Engine branding */}
          <div className="flex flex-col items-start ml-3">
            <span
              className={`${typographyClasses.caption2} text-[#9076f4] mb-1`}
            >
              Powered By
            </span>
            <img
              src="/assets/a8fa60265e57108e280ffdd541c573d65605ca69.png"
              alt="MyTatva"
              className="h-[18.273px] mb-1"
              style={{
                maskImage: "url(/assets/a8fa60265e57108e280ffdd541c573d65605ca69.png)",
                maskSize: "contain",
                backgroundColor: "#9076f4"
              }}
            />
            <span className={`${typographyClasses.caption1Bold} text-[#9076f4]`}>
              AI Engine
            </span>
          </div>

          {/* Mascot with actual image */}
          <div className="w-[148px] h-[94px] relative">
            <img
              src="/assets/d5e182ccf5d25ffcccb1d5c046d31e28213ae67b.png"
              alt="Mascot"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
