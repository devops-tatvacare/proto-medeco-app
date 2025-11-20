"use client";

import { Assessment, Intervention, MonitoringTask } from '@/context/DDxContext';

interface PathwayDetailViewProps {
  pathwayId: string;
  onBack: () => void;
}

// Mock data for the saved pathway
const getMockPathwayData = (id: string) => {
  const pathways: Record<string, any> = {
    '1': {
      name: 'Heart Failure Management',
      specialty: 'Cardiology',
      description: 'Comprehensive care pathway for managing heart failure patients',
      assessments: [
        { id: 'a1', type: 'lab', name: 'Complete Blood Count (CBC)', completed: true },
        { id: 'a2', type: 'lab', name: 'B-type Natriuretic Peptide (BNP)', completed: true },
        { id: 'a3', type: 'imaging', name: 'Chest X-Ray', completed: true },
        { id: 'a4', type: 'imaging', name: 'Echocardiogram', completed: false },
      ],
      riskLevel: 'high',
      interventions: [
        { id: 'i1', category: 'medication', description: 'ACE Inhibitor (e.g., Lisinopril 10mg daily)', priority: 'high', completed: true },
        { id: 'i2', category: 'medication', description: 'Beta-blocker (e.g., Metoprolol 25mg BID)', priority: 'high', completed: true },
        { id: 'i3', category: 'education', description: 'Dietary sodium restriction counseling', priority: 'high', completed: false },
      ],
      monitoring: [
        { id: 'm1', task: 'Follow-up visit', frequency: '2 weeks', completed: false },
        { id: 'm2', task: 'Repeat BNP level', frequency: '4 weeks', completed: false },
      ],
    },
    '2': {
      name: 'Liver Cirrhosis Protocol',
      specialty: 'Hepatology',
      description: 'Evidence-based pathway for liver cirrhosis management',
      assessments: [
        { id: 'a1', type: 'lab', name: 'Liver Function Tests', completed: true },
        { id: 'a2', type: 'imaging', name: 'Abdominal Ultrasound', completed: true },
        { id: 'a3', type: 'scoring', name: 'Child-Pugh Score', completed: true },
      ],
      riskLevel: 'standard',
      interventions: [
        { id: 'i1', category: 'medication', description: 'Diuretics for ascites management', priority: 'high', completed: true },
        { id: 'i2', category: 'education', description: 'Alcohol abstinence counseling', priority: 'high', completed: true },
      ],
      monitoring: [
        { id: 'm1', task: 'Liver function monitoring', frequency: '1 month', completed: false },
      ],
    },
  };

  return pathways[id] || pathways['1'];
};

export function PathwayDetailView({ pathwayId, onBack }: PathwayDetailViewProps) {
  const pathway = getMockPathwayData(pathwayId);

  const getTypeIcon = (type: Assessment['type']) => {
    switch (type) {
      case 'lab':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
            <path d="M8.5 2h7"/>
            <path d="M7 16h10"/>
          </svg>
        );
      case 'imaging':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        );
      case 'scoring':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/>
            <path d="m19 9-5 5-4-4-3 3"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{pathway.name}</h1>
            <p className="text-xs text-gray-600">{pathway.specialty}</p>
          </div>
        </div>
      </div>

      {/* Pathway Info Banner */}
      <div className="bg-gradient-to-r from-[#4b4ad5] to-[#a461d8] px-4 py-4">
        <p className="text-white/90 text-sm">{pathway.description}</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#f5f5f7] px-4 py-4 space-y-4">
        {/* Assessments Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Assessments
          </h3>
          <div className="space-y-2">
            {pathway.assessments.map((assessment: Assessment) => (
              <div key={assessment.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  checked={assessment.completed}
                  readOnly
                  className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded"
                />
                <span className="text-[#4b4ad5]">{getTypeIcon(assessment.type)}</span>
                <span className={`text-sm flex-1 ${assessment.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {assessment.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Level Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Risk Classification
          </h3>
          <div className={`px-3 py-2 rounded-lg inline-block ${
            pathway.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
            pathway.riskLevel === 'complex' ? 'bg-red-100 text-red-700' :
            'bg-green-100 text-green-700'
          }`}>
            <span className="text-sm font-semibold capitalize">{pathway.riskLevel} Risk</span>
          </div>
        </div>

        {/* Interventions Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11H3v10h6V11Z"/>
              <path d="M15 7H9v14h6V7Z"/>
              <path d="M21 3h-6v18h6V3Z"/>
            </svg>
            Interventions
          </h3>
          <div className="space-y-2">
            {pathway.interventions.map((intervention: Intervention) => (
              <div key={intervention.id} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  checked={intervention.completed}
                  readOnly
                  className="w-4 h-4 mt-0.5 text-[#4b4ad5] border-gray-300 rounded"
                />
                <div className="flex-1">
                  <span className={`text-sm block ${intervention.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {intervention.description}
                  </span>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                    intervention.priority === 'high' ? 'bg-red-100 text-red-700' :
                    intervention.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {intervention.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20"/>
            </svg>
            Monitoring
          </h3>
          <div className="space-y-2">
            {pathway.monitoring.map((task: MonitoringTask) => (
              <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="w-4 h-4 mt-0.5 text-[#4b4ad5] border-gray-300 rounded"
                />
                <div className="flex-1">
                  <span className={`text-sm block ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {task.task}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    Every {task.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
