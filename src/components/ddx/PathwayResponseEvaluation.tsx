"use client";

interface PathwayResponseEvaluationProps {
  onContinue: () => void;
  onModifyTreatment: () => void;
}

export function PathwayResponseEvaluation({ onContinue, onModifyTreatment }: PathwayResponseEvaluationProps) {
  return (
    <div className="px-4 py-4 space-y-3">
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-8 h-8 bg-[#4b4ad5] rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[#171725] text-sm font-semibold mb-1">Response to Treatment Evaluation</p>
          <p className="text-[#454551] text-sm leading-relaxed">
            Evaluate patient's response to the care plan and determine next steps.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={onContinue}
          className="w-full p-4 border-2 border-green-500 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors"
        >
          <h4 className="text-base font-semibold text-green-700 mb-1">Positive Response</h4>
          <p className="text-sm text-green-600">
            Patient responding well to treatment, continue to outcome review
          </p>
        </button>

        <button
          onClick={onModifyTreatment}
          className="w-full p-4 border-2 border-orange-500 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors"
        >
          <h4 className="text-base font-semibold text-orange-700 mb-1">Modify Treatment</h4>
          <p className="text-sm text-orange-600">
            Suboptimal response, return to interventions to adjust plan
          </p>
        </button>

        <button
          onClick={onContinue}
          className="w-full p-4 border-2 border-red-500 bg-red-50 rounded-lg text-left hover:bg-red-100 transition-colors"
        >
          <h4 className="text-base font-semibold text-red-700 mb-1">Escalate Care</h4>
          <p className="text-sm text-red-600">
            Condition worsening, escalate to higher level of care and complete pathway
          </p>
        </button>
      </div>
    </div>
  );
}
