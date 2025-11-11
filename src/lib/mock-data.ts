/**
 * Mock Data for Dr.Tatva HCP App
 */

import React from "react";

export const mockServices = [
  {
    id: "ddx",
    title: "Generate DDx",
    isSponsored: true,
    icon: React.createElement(
      "div",
      { className: "w-[62px] h-[62px] flex items-center justify-center" },
      React.createElement("img", {
        src: "/assets/875eed473dc5007247b3d5c7ea7fd77f7974eaa9.png",
        alt: "Generate DDx",
        className: "w-full h-full object-contain transform rotate-180 scale-y-[-1]",
      })
    ),
  },
  {
    id: "tatvashots",
    title: "TatvaShots",
    isSponsored: true,
    icon: React.createElement(
      "div",
      { className: "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/6a60bb1fb584b4f4b9dc5f0493a040cb3daa7844.png",
        alt: "TatvaShots",
        className: "w-full h-full object-cover",
      })
    ),
  },
  {
    id: "tatva-ai",
    title: "Tatva AI",
    isSponsored: true,
    icon: React.createElement(
      "div",
      { className: "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/d5e182ccf5d25ffcccb1d5c046d31e28213ae67b.png",
        alt: "Tatva AI",
        className: "w-full h-full object-cover",
      })
    ),
  },
  {
    id: "remote-care",
    title: "Remote Care",
    isSponsored: false,
    icon: React.createElement(
      "div",
      { className: "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/f261b47381c5b61d61e2d3a8624259376455cd2a.png",
        alt: "Remote Care",
        className: "w-full h-full object-cover",
      })
    ),
  },
  {
    id: "content",
    title: "Continuing Medical Education",
    isSponsored: true,
    icon: React.createElement(
      "div",
      { className: "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/6a60bb1fb584b4f4b9dc5f0493a040cb3daa7844.png",
        alt: "Continuing Medical Education",
        className: "w-full h-full object-cover",
      })
    ),
  },
];

export const mockRewardCards = [
  {
    id: "differential-diagnosis",
    headline: "Differential Diagnosis",
    description:
      "AI tool helps generate possible diagnosis by analyzing patient data. <a href=\"#\" style=\"color: #4b4ad5; text-decoration: underline;\">Know more</a>",
    ctaText: "Generate DDx",
    isSponsored: true,
    variant: "large" as const,
    icon: React.createElement(
      "div",
      { className: "w-[123px] h-[123px] flex items-center justify-center rounded-2xl overflow-hidden" },
      React.createElement("img", {
        src: "/assets/875eed473dc5007247b3d5c7ea7fd77f7974eaa9.png",
        alt: "DDx Icon",
        className: "w-full h-full object-cover",
      })
    ),
  },
  {
    id: "tatvashots-card",
    headline: "TatvaShots",
    description: "Discover the latest medical news tailored to your preferences.",
    ctaText: "Explore TatvaShots",
    isSponsored: true,
    variant: "medium" as const,
    icon: React.createElement(
      "div",
      { className: "w-[120px] h-[110px] rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/6a60bb1fb584b4f4b9dc5f0493a040cb3daa7844.png",
        alt: "TatvaShots",
        className: "w-full h-full object-cover",
      })
    ),
  },
  {
    id: "remote-care-card",
    headline: "Remote Care",
    description:
      "Recommend care plans to your patients & earn rewards. <a href=\"#\" style=\"color: #4b4ad5; text-decoration: underline;\">Know more</a>",
    ctaText: "Refer Care Plan",
    isSponsored: false,
    variant: "medium" as const,
    icon: React.createElement(
      "div",
      { className: "w-[116px] h-[110px] rounded-2xl flex items-center justify-center overflow-hidden" },
      React.createElement("img", {
        src: "/assets/f261b47381c5b61d61e2d3a8624259376455cd2a.png",
        alt: "Remote Care",
        className: "w-full h-full object-cover",
      })
    ),
  },
];

export const mockUserProfile = {
  name: "Dr.Umesh",
  role: "Healthcare Professional",
  hasNotifications: true,
};
