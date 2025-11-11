/**
 * Video Drilldown Page
 * Detailed view for video content with transcript and notes
 * Mobile device frame at 343px width
 */

"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
import { VideoDrilldown } from "@/components/VideoDrilldown";

function VideoDrilldownContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") as "topics" | "transcripts" | "chat" | null;
  const initialTab = tab || "summary";

  const handleBackClick = () => {
    router.back();
  };

  return (
    <MobileFrame>
      <VideoDrilldown
        title="Ozempic is a game-changer. Here's how it works."
        onBackClick={handleBackClick}
        initialTab={initialTab}
      />
    </MobileFrame>
  );
}

export default function VideoDrilldownPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoDrilldownContent />
    </Suspense>
  );
}
