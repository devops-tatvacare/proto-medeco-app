"use client";

import { usePathwayBuilder } from '@/context/PathwayBuilderContext';

export function PathwayBuilderRiskClassification() {
  const { riskLevel, setRiskLevel, advanceStep } = usePathwayBuilder();

  const riskOptions = [
    {
      value: 'standard' as const,
      label: 'Standard Risk',
      description: 'For patients with stable conditions and minimal complications',
      indicator: '#10b981'
    },
    {
      value: 'high' as const,
      label: 'High Risk',
      description: 'For patients requiring intensive monitoring and care',
      indicator: '#f59e0b'
    },
    {
      value: 'complex' as const,
      label: 'Complex/Comorbid',
      description: 'For patients with multiple conditions or complications',
      indicator: '#ef4444'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {riskOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setRiskLevel(option.value)}
            className={`w-full p-2.5 text-left transition-all hover:bg-gray-50 active:bg-gray-100 rounded-lg ${
              riskLevel === option.value ? 'bg-[#4b4ad5]/5' : ''
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  borderColor: riskLevel === option.value ? option.indicator : '#d1d5db',
                  backgroundColor: riskLevel === option.value ? option.indicator : 'transparent'
                }}
              >
                {riskLevel === option.value && (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-1 h-7 rounded-full flex-shrink-0"
                  style={{ backgroundColor: option.indicator }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#171725] leading-tight">
                    {option.label}
                  </h4>
                  <p className="text-[11px] text-[#6b7280] leading-snug mt-0.5">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {riskLevel && (
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={advanceStep}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Continue to Interventions
          </button>
        </div>
      )}
    </div>
  );
}
