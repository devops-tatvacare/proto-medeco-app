"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileFrame } from '@/components/MobileFrame';
import { CarePathwaysTabBar } from '@/components/CarePathwaysTabBar';
import { CarePathwaysOverview } from '@/components/care-pathways/CarePathwaysOverview';
import { CarePathwaysCreate } from '@/components/care-pathways/CarePathwaysCreate';
import { CarePathwaysTemplates } from '@/components/care-pathways/CarePathwaysTemplates';

export default function CarePathwaysPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'templates'>('overview');

  const handleBackClick = () => {
    router.back();
  };

  const handleTabChange = (tab: "overview" | "create" | "templates") => {
    setActiveTab(tab);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full w-full overflow-hidden">
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#f5f5f7]">
          {activeTab === 'overview' && <CarePathwaysOverview onCreateClick={() => handleTabChange('create')} />}
          {activeTab === 'create' && <CarePathwaysCreate />}
          {activeTab === 'templates' && <CarePathwaysTemplates />}
        </div>

        {/* Bottom Tab Bar Navigation */}
        <CarePathwaysTabBar
          onHomeClick={handleBackClick}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
      </div>
    </MobileFrame>
  );
}
