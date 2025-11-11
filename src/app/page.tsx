/**
 * Dr.Tatva HCP App - Home Page A1
 * Prototype implementation based on Figma design
 */

"use client";

import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
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
    <MobileFrame>
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
            onCtaClick={() => console.log(`${card.id} clicked`)}
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
