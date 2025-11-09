/**
 * Dr.Tatva HCP App - Home Page A1
 * Prototype implementation based on Figma design
 */

"use client";

import { useRouter } from "next/navigation";
import { StatusBar } from "@/components/StatusBar";
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
    }
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
              {/* Status Bar & Header */}
              <StatusBar
                userName={mockUserProfile.name}
                hasNotifications={mockUserProfile.hasNotifications}
              />

              {/* Remote Care Banner */}
              <RemoteCareBanner
                onCtaClick={() => console.log("Remote Care clicked")}
              />

              {/* Services Section */}
              <section className="py-8">
                <ServiceGrid services={mockServices} onServiceClick={handleServiceClick} />
              </section>

              {/* Reward Cards Section */}
              <section className="px-6 space-y-6 pb-8">
                {mockRewardCards.map((card) => (
                  <RewardCard
                    key={card.id}
                    headline={card.headline}
                    description={card.description}
                    ctaText={card.ctaText}
                    icon={card.icon}
                    isSponsored={card.isSponsored}
                    variant={card.variant}
                    onCtaClick={() => console.log(`${card.id} clicked`)}
                  />
                ))}
              </section>

              {/* Ask Tatva AI Section */}
              <section className="px-6 pb-8">
                <AskTatvaCard onCtaClick={() => console.log("Chat Now clicked")} />
              </section>

              {/* Bottom nudge/notification placeholder */}
              <section className="px-6 pb-8">
                <div className="bg-orange-50 rounded-2xl p-4 flex items-center justify-between border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-xl">
                      🔔
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Recommendation
                      </p>
                      <p className="text-xs text-gray-600">
                        View patient recommendations
                      </p>
                    </div>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </section>
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
