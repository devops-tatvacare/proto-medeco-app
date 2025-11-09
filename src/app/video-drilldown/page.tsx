/**
 * Video Drilldown Page
 * Detailed view for video content with transcript and notes
 * Mobile device frame at 390px width
 */

"use client";

import { useRouter } from "next/navigation";
import { VideoDrilldown } from "@/components/VideoDrilldown";

export default function VideoDrilldownPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[540px]">
        {/* Device Bezel */}
        <div className="rounded-[65px] bg-black p-4 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-9 bg-black rounded-b-[40px] z-10" />

          {/* Screen */}
          <div className="bg-white rounded-[60px] overflow-hidden h-[1173px] flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <VideoDrilldown
                title="Ozempic is a game-changer. Here's how it works."
                onBackClick={handleBackClick}
              />
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pt-4">
            <div className="w-40 h-1.5 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
