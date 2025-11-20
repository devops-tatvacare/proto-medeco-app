"use client";

import { Intervention } from '@/context/DDxContext';

interface PathwayInterventionsProps {
  interventions: Intervention[];
  onUpdateIntervention: (interventionId: string, completed: boolean) => void;
  onContinue: () => void;
}

export function PathwayInterventions({ interventions, onUpdateIntervention, onContinue }: PathwayInterventionsProps) {
  const anySelected = interventions.some(i => i.completed);

  const getCategoryIcon = (category: Intervention['category']) => {
    switch (category) {
      case 'medication':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="13" height="13" x="9" y="9" rx="2" ry="2"/>
            <path d="M5 5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5Z"/>
            <path d="M14 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5Z"/>
            <path d="M5 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Z"/>
          </svg>
        );
      case 'procedure':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          </svg>
        );
      case 'education':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 9-10-7L2 9l10 7 10-7Z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        );
      case 'referral':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'lifestyle':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10H12V2Z"/>
          </svg>
        );
    }
  };

  // Group interventions by category
  const groupedInterventions = interventions.reduce((acc, intervention) => {
    const categoryLabels = {
      medication: 'Medications',
      procedure: 'Procedures & Treatments',
      lifestyle: 'Non-pharmacological Care',
      education: 'Patient Education & Self-Management',
      referral: 'Referrals'
    };
    const label = categoryLabels[intervention.category];
    if (!acc[label]) acc[label] = [];
    acc[label].push(intervention);
    return acc;
  }, {} as Record<string, Intervention[]>);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-3">
        {Object.entries(groupedInterventions).map(([category, items]) => (
          <div key={category} className="space-y-1">
            <h3 className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wide px-0.5">
              {category}
            </h3>
            <div className="space-y-1">
              {items.map((intervention) => (
                <label
                  key={intervention.id}
                  className="flex items-start gap-2 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={intervention.completed}
                    onChange={(e) => onUpdateIntervention(intervention.id, e.target.checked)}
                    className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded focus:ring-[#4b4ad5] flex-shrink-0 mt-0.5"
                  />
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="text-[#4b4ad5] flex-shrink-0 mt-0.5">{getCategoryIcon(intervention.category)}</span>
                    <p className="text-xs text-[#171725] leading-snug flex-1">
                      {intervention.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
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
            Continue to Monitoring
          </button>
        </div>
      )}
    </div>
  );
}
