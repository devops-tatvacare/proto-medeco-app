"use client";

import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  specialty: string;
  description: string;
  stages: number;
  usageCount: number;
}

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Hypertension Management',
    specialty: 'Cardiology',
    description: 'Evidence-based protocol for managing hypertensive patients with lifestyle modifications and pharmacotherapy',
    stages: 5,
    usageCount: 243
  },
  {
    id: 't2',
    name: 'Type 2 Diabetes Care',
    specialty: 'Endocrinology',
    description: 'Comprehensive pathway for diabetes management including glucose monitoring, medication adjustment, and complications screening',
    stages: 6,
    usageCount: 187
  },
  {
    id: 't3',
    name: 'COPD Exacerbation Protocol',
    specialty: 'Pulmonology',
    description: 'Standardized approach to acute COPD exacerbations with bronchodilators, steroids, and oxygen therapy',
    stages: 4,
    usageCount: 156
  },
  {
    id: 't4',
    name: 'Depression Screening & Treatment',
    specialty: 'Psychiatry',
    description: 'Step-wise approach to depression management with screening, medication, and therapy options',
    stages: 5,
    usageCount: 134
  },
  {
    id: 't5',
    name: 'Chronic Kidney Disease',
    specialty: 'Nephrology',
    description: 'CKD staging and management protocol with dietary counseling, medication, and dialysis planning',
    stages: 6,
    usageCount: 98
  },
  {
    id: 't6',
    name: 'Asthma Action Plan',
    specialty: 'Pulmonology',
    description: 'Personalized asthma management with controller medications, rescue inhalers, and trigger avoidance',
    stages: 4,
    usageCount: 167
  },
];

export function CarePathwaysTemplates() {
  const [templates] = useState<Template[]>(mockTemplates);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = ['all', ...Array.from(new Set(templates.map(t => t.specialty)))];

  const filteredTemplates = selectedSpecialty === 'all'
    ? templates
    : templates.filter(t => t.specialty === selectedSpecialty);

  const handleUseTemplate = (templateId: string) => {
    alert(`Using template: ${templates.find(t => t.id === templateId)?.name}\n\nThis would create a new pathway based on this template.`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Box - Fixed */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2 bg-[#f5f5f7]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent text-sm"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Disclaimer Box */}
        <div className="px-4 py-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-yellow-800 mb-1">Template Library</p>
              <p className="text-xs text-yellow-700">Pre-configured pathways for common conditions</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border-2 ${
                  selectedSpecialty === specialty
                    ? 'bg-[#4b4ad5] text-white border-[#4b4ad5] shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#4b4ad5] hover:text-[#4b4ad5] shadow-sm'
                }`}
              >
                {specialty === 'all' ? 'All' : specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="px-4 py-2 pb-6 space-y-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#4b4ad5] to-[#a461d8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11H3v10h6V11Z"/>
                  <path d="M15 7H9v14h6V7Z"/>
                  <path d="M21 3h-6v18h6V3Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-[#4b4ad5]/10 text-[#4b4ad5] rounded-full font-medium">
                    {template.specialty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {template.stages} stages
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {template.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Used by {template.usageCount} doctors
              </span>
              <button
                onClick={() => handleUseTemplate(template.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md active:scale-95"
                style={{
                  background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
                }}
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H3v10h6V11Z"/>
                <path d="M15 7H9v14h6V7Z"/>
                <path d="M21 3h-6v18h6V3Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Templates Found</h3>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              No templates available for the selected specialty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
