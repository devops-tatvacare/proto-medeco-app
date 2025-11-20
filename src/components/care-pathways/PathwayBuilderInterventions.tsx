"use client";

import { usePathwayBuilder, Intervention } from '@/context/PathwayBuilderContext';

export function PathwayBuilderInterventions() {
  const { interventions, updateIntervention, advanceStep } = usePathwayBuilder();
  const anySelected = interventions.some(i => i.selected);

  const getCategoryIcon = (category: Intervention['category']) => {
    switch (category) {
      case 'medication':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M7 7h10v10l-5 5-5-5V7z"/>
          </svg>
        );
      case 'procedure':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        );
      case 'education':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      case 'referral':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'lifestyle':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        );
    }
  };

  const getPriorityColor = (priority: Intervention['priority']) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {interventions.map((intervention) => (
          <label
            key={intervention.id}
            className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 rounded-lg"
          >
            <input
              type="checkbox"
              checked={intervention.selected}
              onChange={(e) => updateIntervention(intervention.id, e.target.checked)}
              className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded focus:ring-[#4b4ad5] flex-shrink-0"
            />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-[#4b4ad5] flex-shrink-0">{getCategoryIcon(intervention.category)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171725] leading-tight">{intervention.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#6b7280] capitalize">
                    {intervention.category.replace('-', ' ')}
                  </span>
                  <span
                    className="text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded"
                    style={{
                      color: getPriorityColor(intervention.priority),
                      backgroundColor: `${getPriorityColor(intervention.priority)}15`
                    }}
                  >
                    {intervention.priority}
                  </span>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {anySelected && (
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={advanceStep}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Continue to Monitoring
          </button>
        </div>
      )}
    </div>
  );
}
