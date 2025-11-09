/**
 * RewardCard Component
 * Card with headline, description, CTA button, and ornamental background
 */

import React from "react";
import { Button } from "./Button";
import { typographyClasses } from "@/lib/design-tokens";

interface RewardCardProps {
  headline: string;
  description: string;
  ctaText: string;
  icon?: React.ReactNode;
  isSponsored?: boolean;
  onCtaClick?: () => void;
  variant?: "large" | "medium";
}

export function RewardCard({
  headline,
  description,
  ctaText,
  icon,
  isSponsored = false,
  onCtaClick,
  variant = "large",
}: RewardCardProps) {
  const isLarge = variant === "large";

  return (
    <div className="relative w-full bg-white rounded-[24px] overflow-hidden border border-[rgba(205,210,255,0.3)]">
      {/* Sponsored Tag */}
      {isSponsored && (
        <div className="absolute top-0 left-0 z-20">
          <div className="bg-green-500 px-2 py-1 rounded-br-lg">
            <span
              className={`${typographyClasses.caption2} text-white font-semibold`}
            >
              Sponsored
            </span>
          </div>
          <div
            className="absolute left-0 bottom-0 translate-y-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "0px solid transparent",
              borderTop: "4px solid #10b981",
            }}
          />
        </div>
      )}

      {/* Ornamental Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 opacity-20">
          {/* Large circles */}
          <div
            className="absolute rounded-full bg-purple-300"
            style={{ width: "60px", height: "60px", top: "20px", right: "30px" }}
          />
          <div
            className="absolute rounded-full bg-blue-200"
            style={{ width: "42px", height: "42px", top: "60px", right: "100px" }}
          />
          <div
            className="absolute rounded-full bg-pink-200"
            style={{ width: "42px", height: "42px", top: "120px", right: "50px" }}
          />
          {/* Small circles */}
          <div
            className="absolute rounded-full bg-purple-200"
            style={{ width: "22px", height: "22px", top: "15px", right: "120px" }}
          />
          <div
            className="absolute rounded-full bg-blue-100"
            style={{ width: "22px", height: "22px", top: "80px", right: "20px" }}
          />
          <div
            className="absolute rounded-full bg-pink-100"
            style={{ width: "33px", height: "33px", top: "100px", right: "80px" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-6 flex flex-col gap-6">
        {/* Text & Icon Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Text content */}
          <div className="flex flex-col gap-3" style={{ maxWidth: "168px" }}>
            <h3
              className={`${
                isLarge ? typographyClasses.h1 : typographyClasses.h3Medium
              } text-[#1f2933] opacity-90`}
            >
              {headline}
            </h3>
            <p
              className={`${typographyClasses.sh1} text-[#3d4854]`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Icon with Badge */}
          {icon && isLarge && (
            <div className="flex items-center justify-center flex-shrink-0">
              <div className="relative w-[123px] h-[123px] flex-none rotate-180 scale-y-[-1]">
                {icon}

                {/* Badge Overlay */}
                <div className="absolute top-[43.45px] left-[43.64px] w-[29.52px] h-[28.282px] bg-[#0a79ed] rounded-[5.5px] flex items-center justify-center shadow-md">
                  <span
                    className="text-white font-bold text-[11.668px] leading-none rotate-180 scale-y-[-1]"
                    style={{ textShadow: "rgba(6, 49, 109, 0.4) 0px 0px 0.876px" }}
                  >
                    DDx
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Icon for medium variant (no badge) */}
          {icon && !isLarge && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button onClick={onCtaClick} size="large" className="w-full">
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
