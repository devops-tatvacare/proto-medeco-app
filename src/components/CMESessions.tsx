/**
 * CME Sessions Component
 * Shows all sessions for a specific date with Topics/Transcripts/Chat badges
 * Displayed within the mobile frame context
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { typographyClasses } from "@/lib/design-tokens";
import { imageAssets } from "@/lib/assets";

interface Session {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface CMESessionsProps {
  date: string;
  onBack: () => void;
}

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Ozempic is a game-changer. Here's how it works.",
    category: "ENDOCRINOLOGY",
    imageUrl: "/assets/ozempic-hero.jpg",
  },
  {
    id: "2",
    title: "Understanding GLP-1 receptor agonists",
    category: "ENDOCRINOLOGY",
    imageUrl: "/assets/ozempic-hero.jpg",
  },
  {
    id: "3",
    title: "Breast cancer screening guidelines 2024",
    category: "GYNAECOLOGY",
    imageUrl: "/assets/ozempic-hero.jpg",
  },
  {
    id: "4",
    title: "Advances in cardiac imaging",
    category: "CARDIOLOGY",
    imageUrl: "/assets/ozempic-hero.jpg",
  },
];

export function CMESessions({ date, onBack }: CMESessionsProps) {
  const router = useRouter();

  const handleBadgeClick = (sessionId: string, tab: "topics" | "transcripts" | "chat") => {
    // Navigate to video drilldown with specific tab active
    router.push(`/video-drilldown?session=${sessionId}&tab=${tab}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-8 px-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className={`${typographyClasses.h3Medium} text-gray-900`}>
            CME Sessions
          </h1>
          <p className={`${typographyClasses.body2} text-gray-600`}>
            {date}
          </p>
        </div>
      </div>

      {/* Sessions List */}
      {mockSessions.map((session) => (
        <div key={session.id} className="flex flex-col gap-3">
          {/* Session Tile - Based on Ozempic hero tile design - Clickable */}
          <button
            onClick={() => handleBadgeClick(session.id, "topics")}
            className="relative h-72 w-full overflow-hidden rounded-bl-2xl rounded-br-2xl bg-gradient-to-br from-pink-400 via-pink-300 to-pink-500 shadow-md hover:shadow-lg transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <img
              src={session.imageUrl}
              alt={session.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Session Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 text-white">
              {/* Category Badge */}
              <div className="w-fit">
                <div className="bg-blue-100 rounded-full px-3 py-1 inline-block">
                  <span className="text-xs font-semibold text-blue-900">
                    {session.category}
                  </span>
                </div>
              </div>

              {/* Title and Logo Row */}
              <div className="flex items-end justify-between gap-3">
                {/* Title */}
                <h2 className="text-lg font-semibold leading-tight flex-1 text-left">
                  {session.title}
                </h2>

                {/* Zydus Logo */}
                <div className="flex-shrink-0 w-20 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center">
                  <img
                    src="/assets/zydus-logo.png"
                    alt="Zydus"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </button>

          {/* Action Badges - Topics, Transcripts, Chat */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleBadgeClick(session.id, "topics")}
              className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow border border-gray-200 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className={`${typographyClasses.sh2} text-gray-900 font-semibold`}>
                  Topics
                </span>
              </div>
            </button>

            <button
              onClick={() => handleBadgeClick(session.id, "transcripts")}
              className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow border border-gray-200 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className={`${typographyClasses.sh2} text-gray-900 font-semibold`}>
                  Transcripts
                </span>
              </div>
            </button>

            <button
              onClick={() => handleBadgeClick(session.id, "chat")}
              className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow border border-gray-200 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className={`${typographyClasses.sh2} text-gray-900 font-semibold`}>
                  Chat
                </span>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
