/**
 * MobileFrame Component
 * Frame: 343px × 742px (PERFECT - don't change)
 * Content: Scaled down by 68% to look proportional inside frame
 */

import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  // Frame dimensions (PERFECT SIZE - LOCKED)
  const frameWidth = 343;
  const frameHeight = 742;

  // Content designed at iPhone standard width (390px), scaled to fit frame
  const designWidth = 390;
  const contentScale = frameWidth / designWidth; // 0.88 (343/390)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      {/* Mobile Device Frame - FIXED at 343x742 */}
      <div className="relative" style={{ width: `${frameWidth}px` }}>
        {/* Device Bezel */}
        <div className="rounded-[44px] bg-black p-2.5 shadow-2xl">
          {/* Screen - FIXED at 742px height */}
          <div
            className="bg-white rounded-[40px] overflow-hidden relative"
            style={{ height: `${frameHeight}px`, width: `${frameWidth}px` }}
          >
            {/* Scaled content container */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`
              }}
            >
              <div
                style={{
                  width: `${designWidth}px`,
                  height: `${frameHeight / contentScale}px`,
                  transform: `scale(${contentScale})`,
                  transformOrigin: 'top left',
                }}
                className="overflow-y-auto scrollbar-hide"
              >
                {children}
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pt-2.5">
            <div className="w-28 h-1 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
