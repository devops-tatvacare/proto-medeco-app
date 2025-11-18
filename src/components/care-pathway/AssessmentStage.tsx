"use client";

import { Assessment } from '@/context/CarePathwayContext';

interface AssessmentStageProps {
  assessments: Assessment[];
  onUpdateAssessment: (id: string, completed: boolean, result?: string) => void;
  onContinue: () => void;
}

const typeIcons = {
  lab: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
      <path d="M8.5 2h7"/>
      <path d="M7 16h10"/>
    </svg>
  ),
  imaging: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  ),
  scoring: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  'physical-exam': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
};

export function AssessmentStage({ assessments, onUpdateAssessment, onContinue }: AssessmentStageProps) {
  const completedCount = assessments.filter(a => a.completed).length;
  const allCompleted = completedCount === assessments.length;

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#171725] mb-2">Initial Assessment & Diagnostics</h2>
        <p className="text-sm text-[#454551]">
          Complete the following assessments to establish baseline information and guide care decisions.
        </p>
        <div className="mt-3 text-sm font-medium text-[#4b4ad5]">
          {completedCount} of {assessments.length} completed
        </div>
      </div>

      {/* Assessment Checklist */}
      <div className="space-y-3">
        {assessments.map(assessment => (
          <div
            key={assessment.id}
            className={`
              bg-white rounded-lg border p-4 transition-all
              ${assessment.completed ? 'border-green-500 bg-green-50/30' : 'border-gray-200'}
            `}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <button
                onClick={() => onUpdateAssessment(assessment.id, !assessment.completed)}
                className={`
                  flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                  ${assessment.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-[#4b4ad5]'}
                `}
              >
                {assessment.completed && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>

              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${assessment.completed ? 'bg-green-500/20 text-green-700' : 'bg-[#4b4ad5]/10 text-[#4b4ad5]'}`}>
                {typeIcons[assessment.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${assessment.completed ? 'text-green-700' : 'text-[#171725]'}`}>
                  {assessment.name}
                </h4>
                <p className="text-xs text-[#454551] mt-1 capitalize">
                  {assessment.type.replace('-', ' ')}
                </p>
                {assessment.result && (
                  <p className="text-xs text-green-700 mt-2 font-medium">
                    Result: {assessment.result}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!allCompleted}
        className={`
          w-full py-3.5 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all
          ${allCompleted ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
        `}
        style={{
          background: allCompleted ? 'linear-gradient(to right, #4b4ad5, #a461d8)' : '#9ca3af',
        }}
      >
        {allCompleted ? 'Continue to Risk Classification' : `Complete ${assessments.length - completedCount} more assessments`}
      </button>
    </div>
  );
}
