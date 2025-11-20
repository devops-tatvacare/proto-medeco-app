"use client";

import { SquarePlus } from 'lucide-react';

interface DDxHeaderProps {
  onHistoryClick: () => void;
  onNewChatClick: () => void;
  onBack?: () => void;
}

export function DDxHeader({ onHistoryClick, onNewChatClick, onBack }: DDxHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Left: Back Button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Center: Title */}
        <h1 className="text-[#171725] text-lg font-semibold absolute left-1/2 -translate-x-1/2">Generate DDx</h1>

        {/* Right: Icons */}
        <div className="flex items-center gap-2">
          {/* History/Clock Icon */}
          <button
            onClick={onHistoryClick}
            className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="View history"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </button>

          {/* New Chat Icon */}
          <button
            onClick={onNewChatClick}
            className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="New chat"
          >
            <SquarePlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
