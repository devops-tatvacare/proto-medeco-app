/**
 * Notebooks Page
 * Display user's notebooks in mobile device frame
 */

"use client";

import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
import { Notebooks } from "@/components/Notebooks";

export default function NotebooksPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <MobileFrame>
      <Notebooks onBackClick={handleBackClick} />
    </MobileFrame>
  );
}
