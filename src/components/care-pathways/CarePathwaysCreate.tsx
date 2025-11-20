"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

interface SavedPathway {
  id: string;
  name: string;
  specialty: string;
  createdAt: string;
  stages: number;
  lastModified: string;
  linkedPatients?: number;
}

const mockSavedPathways: SavedPathway[] = [
  {
    id: '1',
    name: 'Heart Failure Management',
    specialty: 'Cardiology',
    createdAt: '2025-01-10',
    stages: 6,
    lastModified: '2 days ago',
    linkedPatients: 3
  },
  {
    id: '2',
    name: 'Liver Cirrhosis Protocol',
    specialty: 'Hepatology',
    createdAt: '2025-01-08',
    stages: 5,
    lastModified: '4 days ago',
    linkedPatients: 1
  },
  {
    id: '3',
    name: 'Mental Health Assessment',
    specialty: 'Psychiatry',
    createdAt: '2025-01-05',
    stages: 4,
    lastModified: '1 week ago',
    linkedPatients: 0
  },
  {
    id: '4',
    name: 'Diabetes Care Pathway',
    specialty: 'Endocrinology',
    createdAt: '2025-01-03',
    stages: 6,
    lastModified: '2 weeks ago',
    linkedPatients: 5
  },
];

export function CarePathwaysCreate() {
  const router = useRouter();
  const [pathways] = useState<SavedPathway[]>(mockSavedPathways);

  const handlePathwayClick = (pathwayId: string) => {
    router.push(`/care-pathways/view/${pathwayId}`);
  };

  const handleCreateNew = () => {
    router.push('/care-pathways/builder');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Box - Fixed */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2 bg-[#f5f5f7]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pathways or patients"
            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent text-sm text-[#1f2937] placeholder:text-[#9ca3af]"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Disclaimer Box */}
        <div className="px-4 py-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-[#92400e] mb-1">My Care Pathways</p>
              <p className="text-xs text-[#b45309]">Create and manage your custom care protocols</p>
            </div>
          </div>
        </div>

        {/* Pathways List */}
        <div className="px-4 py-2 pb-24 space-y-3">
        {pathways.map((pathway) => (
          <button
            key={pathway.id}
            onClick={() => handlePathwayClick(pathway.id)}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-gray-200"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 text-left">
                <h3 className="text-base font-semibold text-[#1f2937] mb-1">
                  {pathway.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-[#4b4ad5]/10 text-[#4b4ad5] rounded-full font-medium">
                    {pathway.specialty}
                  </span>
                  <span className="text-xs text-[#6b7280] font-medium">
                    {pathway.stages} stages
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#4b4ad5] to-[#a461d8] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11H3v10h6V11Z"/>
                  <path d="M15 7H9v14h6V7Z"/>
                  <path d="M21 3h-6v18h6V3Z"/>
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6b7280]">Modified {pathway.lastModified}</span>
              <div className="flex items-center gap-2">
                {pathway.linkedPatients !== undefined && pathway.linkedPatients > 0 && (
                  <span className="flex items-center gap-1 text-[#4b4ad5] font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>{pathway.linkedPatients}</span>
                  </span>
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
        </div>

        {/* Empty State (if no pathways) */}
        {pathways.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H3v10h6V11Z"/>
                <path d="M15 7H9v14h6V7Z"/>
                <path d="M21 3h-6v18h6V3Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Care Pathways Yet</h3>
            <p className="text-sm text-gray-600 text-center max-w-xs mb-6">
              Create your first care pathway to start building standardized protocols for your practice
            </p>
          </div>
        )}
      </div>

      {/* FAB - Create Button - Positioned above bottom TabBar (77px + 24px margin) */}
      <button
        onClick={handleCreateNew}
        className="fixed right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center z-10"
        style={{
          background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
          bottom: 'calc(77px + 24px)', // TabBar height (77px) + spacing (24px)
        }}
        aria-label="Create new care pathway"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  );
}
