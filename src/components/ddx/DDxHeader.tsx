"use client";

interface DDxHeaderProps {
  onHistoryClick: () => void;
  onBack?: () => void;
}

export function DDxHeader({ onHistoryClick, onBack }: DDxHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Left: Back arrow */}
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
        <h1 className="text-[#171725] text-lg font-semibold">Generate DDx</h1>

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

          {/* Refresh Icon */}
          <button
            className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Refresh"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>

          {/* Expand Icon */}
          <button
            className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Expand"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
