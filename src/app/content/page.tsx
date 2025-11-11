/**
 * Content Detail Page
 * Drilldown view from Home page showing detailed content
 * Mobile device frame at 343px width
 */

"use client";

import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
import { ContentDetail } from "@/components/ContentDetail";

export default function ContentPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <MobileFrame>
      <ContentDetail onBackClick={handleBackClick} />
    </MobileFrame>
  );
}
