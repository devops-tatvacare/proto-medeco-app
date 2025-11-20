"use client";

import { Assessment } from '@/context/DDxContext';

interface PathwayAssessmentProps {
  assessments: Assessment[];
  onUpdateAssessment: (assessmentId: string, completed: boolean) => void;
  onContinue: () => void;
}

export function PathwayAssessment({ assessments, onUpdateAssessment, onContinue }: PathwayAssessmentProps) {
  const anySelected = assessments.some(a => a.completed);

  const getTypeIcon = (type: Assessment['type']) => {
    switch (type) {
      case 'lab':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
            <path d="M8.5 2h7"/>
            <path d="M7 16h10"/>
          </svg>
        );
      case 'imaging':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        );
      case 'scoring':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/>
            <path d="m19 9-5 5-4-4-3 3"/>
          </svg>
        );
      case 'physical-exam':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="m4.93 4.93 2.83 2.83"/>
            <path d="m16.24 16.24 2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="m4.93 19.07 2.83-2.83"/>
            <path d="m16.24 7.76 2.83-2.83"/>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {assessments.map((assessment) => (
          <label
            key={assessment.id}
            className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 rounded-lg"
          >
            <input
              type="checkbox"
              checked={assessment.completed}
              onChange={(e) => onUpdateAssessment(assessment.id, e.target.checked)}
              className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded focus:ring-[#4b4ad5] flex-shrink-0"
            />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-[#4b4ad5] flex-shrink-0">{getTypeIcon(assessment.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171725] leading-tight">{assessment.name}</p>
                <p className="text-[10px] text-[#6b7280] capitalize mt-0.5">
                  {assessment.type.replace('-', ' ')}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {anySelected && (
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={onContinue}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Continue to Risk Classification
          </button>
        </div>
      )}
    </div>
  );
}
