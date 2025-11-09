/**
 * ServiceCard Component
 * Displays a service offering with icon, title, and optional sponsored tag
 */

"use client";

import React from "react";
import { typographyClasses } from "@/lib/design-tokens";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  isSponsored?: boolean;
  onClick?: () => void;
  id?: string;
}

export function ServiceCard({
  title,
  icon,
  isSponsored = false,
  onClick,
  id,
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-[24px] overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-[0px_0px_18px_0px_rgba(0,0,0,0.04)]"
      style={{ height: "160px" }}
      data-service-id={id}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#cacfff] to-[#eff1ff] border border-[#e2e2ea] rounded-[24px]" />

      {/* Ornamental Circles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[182px] h-[82px] left-[-7.17%] top-0 right-[-6.56%] bottom-[-0.58%]">
          <svg viewBox="0 0 182 82" fill="none" className="w-full h-full">
            <circle cx="20" cy="15" r="8" fill="#cacfff" opacity="0.3" />
            <circle cx="50" cy="10" r="6" fill="#e2e2ea" opacity="0.2" />
            <circle cx="80" cy="20" r="7" fill="#cacfff" opacity="0.25" />
            <circle cx="120" cy="12" r="5" fill="#e2e2ea" opacity="0.3" />
            <circle cx="160" cy="18" r="6" fill="#cacfff" opacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Sponsored Tag */}
      {isSponsored && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-[#16a34a] px-2 py-1 rounded-br-[16px] rounded-tl-[16px]">
            <span className={`${typographyClasses.caption2} text-white font-medium text-[12px]`}>
              Sponsored
            </span>
          </div>
          {/* Small triangle pointer */}
          <div
            className="absolute left-0 bottom-0 translate-y-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4.684px solid transparent",
              borderRight: "0px solid transparent",
              borderTop: "3.513px solid #16a34a",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-[6px] px-4 py-6">
        {/* Icon container */}
        <div className="h-[62px] flex items-center justify-center overflow-clip w-full">
          {icon}
        </div>

        {/* Title */}
        <p
          className="font-poppins font-semibold text-[16px] leading-[24px] text-[#48486f] text-center whitespace-nowrap"
        >
          {title}
        </p>
      </div>
    </div>
  );
}

/**
 * ServiceGrid Component
 * 2x2 grid layout for service cards
 */

interface ServiceGridProps {
  services: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    isSponsored?: boolean;
  }>;
  onServiceClick?: (serviceId: string) => void;
}

export function ServiceGrid({ services, onServiceClick }: ServiceGridProps) {
  return (
    <div className="px-6">
      <div className="mb-6">
        <h2 className={`${typographyClasses.h1} text-black mb-2`}>
          Our offerings
        </h2>
        <p className={`${typographyClasses.sh1} text-[#3d4854]`}>
          Dr.Tatva offers offers a whole host of services that will assist you in your Doctor journey
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            icon={service.icon}
            isSponsored={service.isSponsored}
            onClick={() => onServiceClick?.(service.id)}
          />
        ))}
      </div>
    </div>
  );
}
