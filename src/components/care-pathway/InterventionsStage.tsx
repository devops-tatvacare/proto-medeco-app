"use client";

import { Intervention } from '@/context/CarePathwayContext';

interface InterventionsStageProps {
  interventions: Intervention[];
  onUpdateIntervention: (id: string, completed: boolean) => void;
  onContinue: () => void;
}

const categoryIcons = {
  medication: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  ),
  procedure: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4"/>
      <path d="m17 7 3-3"/>
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>
    </svg>
  ),
  education: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  referral: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  lifestyle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
};

const priorityColors = {
  high: { bg: 'bg-red-50', badge: 'bg-red-500', text: 'text-red-700' },
  medium: { bg: 'bg-orange-50', badge: 'bg-orange-500', text: 'text-orange-700' },
  low: { bg: 'bg-blue-50', badge: 'bg-blue-500', text: 'text-blue-700' },
};

export function InterventionsStage({
  interventions,
  onUpdateIntervention,
  onContinue
}: InterventionsStageProps) {
  const highPriority = interventions.filter(i => i.priority === 'high');
  const completedHigh = highPriority.filter(i => i.completed).length;
  const canContinue = completedHigh === highPriority.length;

  // Group interventions by category
  const grouped = interventions.reduce((acc, intervention) => {
    if (!acc[intervention.category]) {
      acc[intervention.category] = [];
    }
    acc[intervention.category].push(intervention);
    return acc;
  }, {} as Record<string, Intervention[]>);

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#171725] mb-2">Interventions & Care Actions</h2>
        <p className="text-sm text-[#454551] mb-3">
          Implement the following care interventions. High priority items must be completed to proceed.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-[#171725]">High Priority:</span>
          <span className={`font-semibold ${canContinue ? 'text-green-600' : 'text-red-600'}`}>
            {completedHigh}/{highPriority.length} completed
          </span>
        </div>
      </div>

      {/* Interventions by Category */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-[#171725] mb-2 capitalize flex items-center gap-2">
              <div className="w-5 h-5 text-[#4b4ad5]">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              {category}
            </h3>
            <div className="space-y-2">
              {items.map(intervention => {
                const colors = priorityColors[intervention.priority];

                return (
                  <div
                    key={intervention.id}
                    className={`
                      rounded-lg border p-3 transition-all
                      ${intervention.completed ? 'border-green-500 bg-green-50/30' : `border-gray-200 ${colors.bg}`}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => onUpdateIntervention(intervention.id, !intervention.completed)}
                        className={`
                          flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5
                          ${intervention.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-[#4b4ad5]'}
                        `}
                      >
                        {intervention.completed && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          <p className={`text-sm flex-1 ${intervention.completed ? 'text-green-700 line-through' : 'text-[#171725]'}`}>
                            {intervention.description}
                          </p>
                          <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-semibold text-white ${colors.badge}`}>
                            {intervention.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`
          w-full py-3.5 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all
          ${canContinue ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
        `}
        style={{
          background: canContinue ? 'linear-gradient(to right, #4b4ad5, #a461d8)' : '#9ca3af',
        }}
      >
        {canContinue ? 'Continue to Monitoring' : `Complete ${highPriority.length - completedHigh} more high priority items`}
      </button>
    </div>
  );
}
