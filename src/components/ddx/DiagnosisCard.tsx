"use client";

import Image from 'next/image';
import { Sparkles, WandSparkles } from 'lucide-react';
import { Diagnosis } from '@/context/DDxContext';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  onToggle: () => void;
  onViewCarePathway?: (diagnosisId: string, diagnosisName: string, mode: 'view' | 'create') => void;
  showCarePathwayButton?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export function DiagnosisCard({ diagnosis, onToggle, onViewCarePathway, showCarePathwayButton = true, isFirst, isLast }: DiagnosisCardProps) {
  return (
    <div className={`bg-white border-x border-gray-200 ${isFirst ? 'border-t rounded-t-lg' : ''} ${isLast ? 'border-b rounded-b-lg' : 'border-b'} overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-gray-50 transition-colors"
      >
        {/* Medical Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#EDDFF7] flex items-center justify-center p-1.5">
          <div className="relative w-full h-full">
            <Image
              src="/assets/e6f4cad957073395675383f34d256d0f548ea29d.svg"
              alt=""
              fill
              className="object-contain"
            />
            <Image
              src="/assets/e1f66aa69742bed81693a338cc80a560e260b27b.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <h4 className="text-[#171725] font-semibold text-sm mb-1 leading-tight truncate">
            {diagnosis.name}
          </h4>
          {/* Diagnosis Type Label with Meter */}
          <div className="flex items-center gap-1.5">
            {/* Red Meter Bars */}
            <div className="flex items-center gap-[2px]">
              <div className="w-[13px] h-[4px] bg-[#ef1941] rounded-[2px]" />
              <div className="w-[13px] h-[4px] bg-[#ef1941] rounded-[2px]" />
              <div className="w-[13px] h-[4px] bg-[#ef1941] rounded-[2px]" />
              <div className="w-[13px] h-[4px] bg-[#ef1941] rounded-[2px]" />
            </div>
            {/* Label */}
            <p className="text-[#ef1941] text-xs font-medium leading-[18px]">
              {diagnosis.label}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 transition-transform ${diagnosis.expanded ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Expanded Content */}
      {diagnosis.expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100 space-y-2.5">
          <p className="text-xs text-[#454551] leading-snug">
            Detailed information about {diagnosis.name} would appear here, including symptoms, causes, diagnostic criteria, and recommended treatments.
          </p>

          {/* Care Pathway CTAs */}
          {onViewCarePathway && showCarePathwayButton && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewCarePathway) {
                    onViewCarePathway(diagnosis.id, diagnosis.name, 'view');
                  }
                }}
                className="flex-1 py-2 px-2.5 rounded-lg bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 border border-[#10b981] text-[#059669] font-medium text-xs transition-all hover:from-[#10b981]/20 hover:to-[#059669]/20 active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Care Pathway</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewCarePathway) {
                    onViewCarePathway(diagnosis.id, diagnosis.name, 'create');
                  }
                }}
                className="flex-1 py-2 px-2.5 rounded-lg text-white font-medium text-xs transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5"
                style={{
                  background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
                }}
              >
                <WandSparkles className="w-3.5 h-3.5" />
                <span>Create Pathway</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
