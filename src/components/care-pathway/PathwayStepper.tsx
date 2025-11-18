"use client";

import { PathwayStage } from '@/context/CarePathwayContext';

interface PathwayStepperProps {
  currentStage: PathwayStage;
  completedStages: PathwayStage[];
}

const stages: { id: PathwayStage; label: string; shortLabel: string }[] = [
  { id: 'assessment', label: 'Initial Assessment', shortLabel: 'Assessment' },
  { id: 'risk-classification', label: 'Risk Classification', shortLabel: 'Risk' },
  { id: 'interventions', label: 'Interventions', shortLabel: 'Actions' },
  { id: 'monitoring', label: 'Monitoring', shortLabel: 'Monitor' },
  { id: 'response-evaluation', label: 'Evaluation', shortLabel: 'Evaluate' },
  { id: 'outcome-review', label: 'Outcome', shortLabel: 'Outcome' },
];

export function PathwayStepper({ currentStage, completedStages }: PathwayStepperProps) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between gap-1 overflow-x-auto">
        {stages.map((stage, index) => {
          const isCompleted = completedStages.includes(stage.id);
          const isCurrent = stage.id === currentStage;
          const isPast = index < currentIndex;

          return (
            <div key={stage.id} className="flex items-center flex-shrink-0">
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                    ${isCurrent ? 'bg-[#4b4ad5] text-white' : ''}
                    ${isCompleted || isPast ? 'bg-green-500 text-white' : ''}
                    ${!isCurrent && !isCompleted && !isPast ? 'bg-gray-200 text-gray-500' : ''}
                  `}
                >
                  {isCompleted || isPast ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-[10px] text-center ${isCurrent ? 'text-[#4b4ad5] font-semibold' : 'text-gray-500'}`}>
                  {stage.shortLabel}
                </span>
              </div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div
                  className={`
                    h-0.5 w-4 mx-0.5
                    ${isPast || isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
