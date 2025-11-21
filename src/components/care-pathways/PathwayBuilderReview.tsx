"use client";

import { useRouter } from 'next/navigation';
import { usePathwayBuilder } from '@/context/PathwayBuilderContext';

export function PathwayBuilderReview() {
  const router = useRouter();
  const {
    pathwayName,
    specialty,
    description,
    assessments,
    riskLevel,
    interventions,
    monitoring,
    savePathway
  } = usePathwayBuilder();

  const selectedAssessments = assessments.filter(a => a.selected);
  const selectedInterventions = interventions.filter(i => i.selected);
  const selectedMonitoring = monitoring.filter(m => m.selected);

  const handleSave = () => {
    savePathway();
    router.push('/care-pathways?tab=create');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {/* Basic Info */}
        <div className="bg-gradient-to-r from-[#f8f7ff] to-[#fef5ff] rounded-lg p-3 border border-[#4b4ad5]/10">
          <h3 className="text-sm font-semibold text-[#171725] mb-2">Pathway Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-[#6b7280] uppercase tracking-wide">Name</p>
              <p className="text-sm font-medium text-[#1f2937]">{pathwayName}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7280] uppercase tracking-wide">Specialty</p>
              <p className="text-sm font-medium text-[#1f2937]">{specialty}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7280] uppercase tracking-wide">Description</p>
              <p className="text-xs text-[#6b7280]">{description}</p>
            </div>
          </div>
        </div>

        {/* Assessments */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h3 className="text-sm font-semibold text-[#171725] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Assessments ({selectedAssessments.length})
          </h3>
          <div className="space-y-1">
            {selectedAssessments.map(a => (
              <p key={a.id} className="text-xs text-[#6b7280] pl-6">" {a.name}</p>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h3 className="text-sm font-semibold text-[#171725] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Risk Classification
          </h3>
          <p className="text-sm font-medium text-[#1f2937] capitalize pl-6">
            {riskLevel?.replace('-', ' ') || 'Not specified'}
          </p>
        </div>

        {/* Interventions */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h3 className="text-sm font-semibold text-[#171725] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11H3v10h6V11Z"/>
              <path d="M15 7H9v14h6V7Z"/>
              <path d="M21 3h-6v18h6V3Z"/>
            </svg>
            Interventions ({selectedInterventions.length})
          </h3>
          <div className="space-y-1">
            {selectedInterventions.map(i => (
              <p key={i.id} className="text-xs text-[#6b7280] pl-6">
                " {i.description}
                <span className="text-[10px] text-[#9ca3af] ml-2">({i.priority} priority)</span>
              </p>
            ))}
          </div>
        </div>

        {/* Monitoring */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h3 className="text-sm font-semibold text-[#171725] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Monitoring Tasks ({selectedMonitoring.length})
          </h3>
          <div className="space-y-1">
            {selectedMonitoring.map(m => (
              <p key={m.id} className="text-xs text-[#6b7280] pl-6">
                " {m.task}
                <span className="text-[10px] text-[#9ca3af] ml-2">({m.frequency})</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="border-t border-gray-100 p-3">
        <button
          onClick={handleSave}
          className="w-full py-3 px-4 rounded-lg text-white font-semibold text-sm transition-all hover:shadow-lg active:scale-[0.98]"
          style={{
            background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
          }}
        >
          Save Care Pathway
        </button>
      </div>
    </div>
  );
}
