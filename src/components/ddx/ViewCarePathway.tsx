"use client";

import { useState } from 'react';
import { CarePathwayState } from '@/context/DDxContext';

interface ViewCarePathwayProps {
  pathway: CarePathwayState;
  onLinkToPatient: () => void;
  onEdit: (stage: 'assessment' | 'risk-classification' | 'interventions' | 'monitoring') => void;
}

export function ViewCarePathway({ pathway, onLinkToPatient, onEdit }: ViewCarePathwayProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const toggleStage = (stage: string) => {
    setExpandedStage(expandedStage === stage ? null : stage);
  };

  const getStageSummary = (stage: string) => {
    switch (stage) {
      case 'assessment':
        const selectedAssessments = pathway.assessments.filter(a => a.completed);
        return `${selectedAssessments.length} assessment${selectedAssessments.length !== 1 ? 's' : ''} selected`;
      case 'risk-classification':
        return pathway.riskLevel ? `${pathway.riskLevel.charAt(0).toUpperCase() + pathway.riskLevel.slice(1)} Risk` : 'Not set';
      case 'interventions':
        const selectedInterventions = pathway.interventions.filter(i => i.completed);
        return `${selectedInterventions.length} intervention${selectedInterventions.length !== 1 ? 's' : ''} selected`;
      case 'monitoring':
        const selectedMonitoring = pathway.monitoring.filter(m => m.completed);
        return `${selectedMonitoring.length} task${selectedMonitoring.length !== 1 ? 's' : ''} selected`;
      default:
        return '';
    }
  };

  const stages = [
    {
      id: 'assessment',
      name: 'Assessment',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
          <path d="M8.5 2h7"/>
          <path d="M7 16h10"/>
        </svg>
      )
    },
    {
      id: 'risk-classification',
      name: 'Risk Classification',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
        </svg>
      )
    },
    {
      id: 'interventions',
      name: 'Interventions',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="13" height="13" x="9" y="9" rx="2" ry="2"/>
          <path d="M5 5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5Z"/>
          <path d="M14 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5Z"/>
          <path d="M5 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Z"/>
        </svg>
      )
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )
    }
  ];

  return (
    <div className="px-4 py-3">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f8f7ff] to-[#fef5ff] border-b border-[#4b4ad5]/10 px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-[11px] text-[#6b7280] font-semibold uppercase tracking-wide mb-0.5">
                AI-Generated Care Pathway
              </p>
              <h3 className="text-sm font-semibold text-[#171725] leading-tight">
                {pathway.diagnosisName}
              </h3>
            </div>
            <div className="flex-shrink-0 px-2 py-1 bg-[#10b981]/10 rounded-lg">
              <span className="text-[10px] font-bold text-[#10b981]">AI Recommended</span>
            </div>
          </div>
        </div>

        {/* Stages - Accordion Style */}
        <div className="divide-y divide-gray-100">
          {stages.map((stage, index) => (
            <div key={stage.id} className="bg-white">
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#4b4ad5]/10 flex items-center justify-center text-[#4b4ad5]">
                  {stage.icon}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#4b4ad5]">{index + 1}</span>
                    <h4 className="text-sm font-semibold text-[#171725] leading-tight">{stage.name}</h4>
                  </div>
                  <p className="text-xs text-[#6b7280] leading-tight mt-0.5">{getStageSummary(stage.id)}</p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform ${expandedStage === stage.id ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {/* Expanded Content */}
              {expandedStage === stage.id && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-100 bg-gray-50">
                  {stage.id === 'assessment' && (
                    <div className="space-y-1.5">
                      {pathway.assessments.filter(a => a.completed).map(assessment => (
                        <div key={assessment.id} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                          <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <span className="text-xs text-[#171725] flex-1">{assessment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {stage.id === 'risk-classification' && pathway.riskLevel && (
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-xs font-medium text-[#171725]">
                        {pathway.riskLevel.charAt(0).toUpperCase() + pathway.riskLevel.slice(1)} Risk Level
                      </p>
                    </div>
                  )}

                  {stage.id === 'interventions' && (
                    <div className="space-y-1.5">
                      {pathway.interventions.filter(i => i.completed).map(intervention => (
                        <div key={intervention.id} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                          <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <span className="text-xs text-[#171725] flex-1">{intervention.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {stage.id === 'monitoring' && (
                    <div className="space-y-1.5">
                      {pathway.monitoring.filter(m => m.completed).map(task => (
                        <div key={task.id} className="flex items-start gap-2 p-2 bg-white rounded-lg">
                          <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-[#171725] leading-snug">{task.task}</p>
                            <span className="text-[10px] text-[#6b7280]">{task.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => onEdit(stage.id as any)}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-white border border-[#4b4ad5] text-[#4b4ad5] text-xs font-medium transition-all hover:bg-[#4b4ad5]/5 active:scale-[0.98]"
                  >
                    Edit {stage.name}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Link to Patient Button */}
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={onLinkToPatient}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" x2="19" y1="8" y2="14"/>
              <line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
            Link to Patient Record
          </button>
        </div>
      </div>
    </div>
  );
}
