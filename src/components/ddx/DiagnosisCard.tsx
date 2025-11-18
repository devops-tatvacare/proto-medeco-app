"use client";

import { Diagnosis } from '@/context/DDxContext';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  onToggle: () => void;
  onViewCarePathway?: (diagnosisId: string) => void;
}

export function DiagnosisCard({ diagnosis, onToggle, onViewCarePathway }: DiagnosisCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
      >
        {/* Medical Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#4b4ad5]/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <h4 className="text-[#171725] font-semibold text-base mb-1">
            {diagnosis.name}
          </h4>
          <p
            className="text-sm font-medium"
            style={{
              color: '#dc2626',
              textDecoration: 'underline',
              textDecorationStyle: 'dashed',
              textDecorationColor: '#dc2626'
            }}
          >
            {diagnosis.label}
          </p>
        </div>

        {/* Chevron */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#454551"
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
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-3">
          <p className="text-sm text-[#454551] leading-relaxed">
            Detailed information about {diagnosis.name} would appear here, including symptoms, causes, diagnostic criteria, and recommended treatments.
          </p>

          {/* Care Pathway CTA */}
          {onViewCarePathway && (
            <button
              onClick={() => onViewCarePathway(diagnosis.id)}
              className="w-full py-3 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-md"
              style={{
                background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
              }}
            >
              View Care Pathway
            </button>
          )}
        </div>
      )}
    </div>
  );
}
