"use client";

import { DecisionFork, RiskLevel } from '@/context/CarePathwayContext';

interface RiskClassificationStageProps {
  decisionFork: DecisionFork;
  onSelectOption: (value: string) => void;
  onContinue: () => void;
}

const riskColors: Record<string, { bg: string; border: string; text: string }> = {
  standard: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
  high: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700' },
  complex: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700' },
};

export function RiskClassificationStage({
  decisionFork,
  onSelectOption,
  onContinue
}: RiskClassificationStageProps) {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#171725] mb-2">Risk & Severity Classification</h2>
        <p className="text-sm text-[#454551]">
          {decisionFork.question}
        </p>
      </div>

      {/* Decision Options */}
      <div className="space-y-3">
        {decisionFork.options.map(option => {
          const isSelected = decisionFork.selected === option.value;
          const colors = riskColors[option.value] || { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700' };

          return (
            <button
              key={option.value}
              onClick={() => onSelectOption(option.value)}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${isSelected ? `${colors.bg} ${colors.border}` : 'bg-white border-gray-200 hover:border-[#4b4ad5]'}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Radio Button */}
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
                  ${isSelected ? colors.border : 'border-gray-300'}
                `}>
                  {isSelected && (
                    <div className={`w-3 h-3 rounded-full ${option.value === 'standard' ? 'bg-blue-500' : option.value === 'high' ? 'bg-orange-500' : 'bg-red-500'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className={`text-base font-semibold mb-1 ${isSelected ? colors.text : 'text-[#171725]'}`}>
                    {option.label}
                  </h4>
                  <p className="text-sm text-[#454551]">
                    {option.value === 'standard' && 'Patient has stable vital signs, minimal symptoms, and no significant comorbidities.'}
                    {option.value === 'high' && 'Patient has moderate symptoms, some vital sign abnormalities, or early complications.'}
                    {option.value === 'complex' && 'Patient has severe symptoms, unstable vitals, multiple comorbidities, or requires intensive management.'}
                  </p>
                </div>

                {/* Check Icon */}
                {isSelected && (
                  <div className="flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={colors.text}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!decisionFork.selected}
        className={`
          w-full py-3.5 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all
          ${decisionFork.selected ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
        `}
        style={{
          background: decisionFork.selected ? 'linear-gradient(to right, #4b4ad5, #a461d8)' : '#9ca3af',
        }}
      >
        {decisionFork.selected ? 'Continue to Interventions' : 'Select a risk level to continue'}
      </button>
    </div>
  );
}
