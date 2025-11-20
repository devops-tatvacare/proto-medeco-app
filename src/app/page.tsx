/**
 * Dr.Tatva HCP App - Home Page A1
 * Prototype implementation based on Figma design
 */

"use client";

import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
import { RemoteCareBanner } from "@/components/RemoteCareBanner";
import { ServiceGrid } from "@/components/ServiceCard";
import { RewardCard } from "@/components/RewardCard";
import { AskTatvaCard } from "@/components/AskTatvaCard";
import { mockServices, mockRewardCards, mockUserProfile } from "@/lib/mock-data";

export default function Home() {
  const router = useRouter();

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "content") {
      router.push("/content");
    } else if (serviceId === "ddx") {
      router.push("/ddx");
    } else if (serviceId === "care-pathways") {
      router.push("/care-pathways");
    }
  };
  return (
    <MobileFrame>
      {/* Status Bar */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-3 h-[54px] bg-white">
          {/* Time */}
          <p className="font-poppins font-medium text-base text-black tracking-[0.1px]">
            9:41
          </p>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-black">
            {/* Signal strength */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
              <path d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header with greeting */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <h1 className="text-lg font-medium text-gray-900">
          Hi, {mockUserProfile.name} 👋
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
          {mockUserProfile.hasNotifications && (
            <div className="absolute -top-1 -right-1 w-[9.88px] h-[9.88px] bg-[#4B4AD5] rounded-full border-2 border-white" />
          )}
        </div>
      </div>

      {/* Remote Care Banner */}
      <RemoteCareBanner
        onCtaClick={() => console.log("Remote Care clicked")}
      />

      {/* Services Section */}
      <section className="py-6">
        <ServiceGrid services={mockServices} onServiceClick={handleServiceClick} />
      </section>

      {/* Reward Cards Section */}
      <section className="px-4 space-y-4 pb-6">
        {mockRewardCards.map((card) => (
          <RewardCard
            key={card.id}
            headline={card.headline}
            description={card.description}
            ctaText={card.ctaText}
            icon={card.icon}
            isSponsored={card.isSponsored}
            variant={card.variant}
            onCtaClick={() => {
              if (card.id === "differential-diagnosis") {
                router.push("/ddx");
              } else {
                console.log(`${card.id} clicked`);
              }
            }}
          />
        ))}
      </section>

      {/* Ask Tatva AI Section */}
      <section className="px-4 pb-6">
        <AskTatvaCard onCtaClick={() => console.log("Chat Now clicked")} />
      </section>

      {/* Bottom nudge/notification placeholder */}
      <section className="px-4 pb-6">
        <div className="bg-orange-50 rounded-xl p-3 flex items-center justify-between border border-orange-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-base">
              🔔
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">
                Recommendation
              </p>
              <p className="text-[10px] text-gray-600">
                View patient recommendations
              </p>
            </div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </section>
    </MobileFrame>
  );
}
