"use client";

import { PathwayStage } from '@/context/DDxContext';
import { ReactNode } from 'react';

interface PathwayIntroProps {
  diagnosisName: string;
  currentStage: number;
  totalStages: number;
  stageName: string;
  stageDescription: string;
  stageIcon: React.ReactNode;
  onBack?: (stage: PathwayStage) => void;
  children: ReactNode;
}

export function PathwayIntro({
  diagnosisName,
  currentStage,
  totalStages,
  stageName,
  stageDescription,
  stageIcon,
  onBack,
  children
}: PathwayIntroProps) {
  const getPreviousStage = (): PathwayStage | null => {
    const stages: PathwayStage[] = ['assessment', 'risk-classification', 'interventions', 'monitoring', 'outcome-review'];
    const currentIndex = currentStage - 1;
    return currentIndex > 0 ? stages[currentIndex - 1] : null;
  };

  const handleBack = () => {
    const prevStage = getPreviousStage();
    if (prevStage && onBack) {
      onBack(prevStage);
    }
  };

  return (
    <div className="px-4 py-3">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col max-h-[calc(100vh-180px)]">
        {/* Care Pathway Header - Fixed */}
        <div className="bg-gradient-to-r from-[#f8f7ff] to-[#fef5ff] border-b border-[#4b4ad5]/10 px-3 py-2 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            {onBack && (
              <button
                onClick={handleBack}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-white hover:bg-gray-50 transition-colors active:scale-95 border border-gray-200"
                aria-label="Go back to previous step"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#6b7280] font-semibold uppercase tracking-wide mb-1">
                Care Pathway • {diagnosisName}
              </p>
              {/* Progress bar */}
              <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4b4ad5] to-[#a461d8] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStage / totalStages) * 100}%` }}
                />
              </div>
            </div>

            {/* Step counter badge */}
            <div className="flex-shrink-0 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#4b4ad5]/20">
              <span className="text-[10px] font-bold text-[#4b4ad5]">
                {currentStage}/{totalStages}
              </span>
            </div>
          </div>
        </div>

        {/* Current Stage Info - Fixed */}
        <div className="px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
          <div className="flex gap-2.5 items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[#4b4ad5] rounded-lg flex items-center justify-center">
              {stageIcon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#171725] mb-0.5 leading-tight">
                {stageName}
              </h3>
              <p className="text-xs text-[#6b7280] leading-snug">
                {stageDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Stage Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
