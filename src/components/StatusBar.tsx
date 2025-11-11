/**
 * StatusBar Component
 * Time display and header with greeting + profile icon
 */

"use client";

import React, { useState, useEffect } from "react";
import { typographyClasses } from "@/lib/design-tokens";

interface StatusBarProps {
  userName?: string;
  hasNotifications?: boolean;
}

export function StatusBar({
  userName = "Dr.Umesh",
  hasNotifications = false,
}: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* iPhone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2">
        <div className="flex items-center">
          <span className={`${typographyClasses.sh1} font-semibold`}>
            {currentTime}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-black">
          {/* Signal strength */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
            <rect
              x="4.5"
              y="5"
              width="3"
              height="7"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="9"
              y="3"
              width="3"
              height="9"
              rx="1"
              fill="currentColor"
            />
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
          </svg>
          {/* WiFi */}
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            className="ml-1"
          >
            <path
              d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Battery */}
          <svg
            width="25"
            height="12"
            viewBox="0 0 25 12"
            fill="none"
            className="ml-1"
          >
            <rect
              x="0.5"
              y="0.5"
              width="21"
              height="11"
              rx="2.5"
              stroke="currentColor"
            />
            <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
            <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Header with greeting */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h1 className={`${typographyClasses.h4Medium} text-gray-900`}>
          Hi, {userName} 👋
        </h1>
        <div className="relative">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <div className="opacity-80 w-6 h-6">
              <img
                src="/assets/ba30676c4284e98ed0c95b8fb7dd29295432ff79.svg"
                alt="User profile"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {hasNotifications && (
            <div className="absolute -top-1 -right-1 w-[9.88px] h-[9.88px] bg-[#4B4AD5] rounded-full border-2 border-white" />
          )}
        </div>
      </div>
    </div>
  );
}
