"use client";

import { useState } from 'react';

interface OutcomeReviewStageProps {
  diagnosisName: string;
  onUpdateOutcome: (status: string, notes: string) => void;
  onExport: () => void;
  onNewPathway: () => void;
}

const outcomeOptions = [
  {
    value: 'resolved',
    label: 'Condition Resolved',
    description: 'Patient symptoms have resolved and treatment goals achieved',
    color: 'green',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  {
    value: 'ongoing',
    label: 'Treatment Ongoing',
    description: 'Patient responding to treatment, continue current plan',
    color: 'blue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"/>
        <path d="m16.2 7.8 2.9-2.9"/>
        <path d="M18 12h4"/>
        <path d="m16.2 16.2 2.9 2.9"/>
        <path d="M12 18v4"/>
        <path d="m4.9 19.1 2.9-2.9"/>
        <path d="M2 12h4"/>
        <path d="m4.9 4.9 2.9 2.9"/>
      </svg>
    )
  },
  {
    value: 'escalated',
    label: 'Escalation Required',
    description: 'Condition worsening or not responding, needs higher level of care',
    color: 'orange',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
      </svg>
    )
  },
  {
    value: 'referred',
    label: 'Specialist Referral',
    description: 'Transferred to specialist or different care setting',
    color: 'purple',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/>
        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/>
        <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/>
      </svg>
    )
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-500' },
};

export function OutcomeReviewStage({
  diagnosisName,
  onUpdateOutcome,
  onExport,
  onNewPathway
}: OutcomeReviewStageProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (selectedOutcome) {
      onUpdateOutcome(selectedOutcome, notes);
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#171725] mb-2">Care Transition & Outcome Review</h2>
        <p className="text-sm text-[#454551]">
          Document the outcome of the care pathway for <strong>{diagnosisName}</strong>
        </p>
      </div>

      {/* Outcome Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#171725]">Select Outcome Status</h3>
        {outcomeOptions.map(option => {
          const isSelected = selectedOutcome === option.value;
          const colors = colorMap[option.color];

          return (
            <button
              key={option.value}
              onClick={() => setSelectedOutcome(option.value)}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${isSelected ? `${colors.bg} ${colors.border}` : 'bg-white border-gray-200 hover:border-[#4b4ad5]'}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? colors.badge : 'bg-gray-100'} ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-semibold mb-1 ${isSelected ? colors.text : 'text-[#171725]'}`}>
                    {option.label}
                  </h4>
                  <p className="text-sm text-[#454551]">
                    {option.description}
                  </p>
                </div>
                {isSelected && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={colors.text}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-[#171725] mb-2">
          Clinical Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document key findings, patient response, next steps, or any relevant clinical notes..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4ad5]/30 focus:border-[#4b4ad5]"
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleSave}
          disabled={!selectedOutcome}
          className={`
            w-full py-3.5 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all
            ${selectedOutcome ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
          `}
          style={{
            background: selectedOutcome ? 'linear-gradient(to right, #4b4ad5, #a461d8)' : '#9ca3af',
          }}
        >
          Save Outcome
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onExport}
            className="py-3 px-4 border-2 border-[#4b4ad5] text-[#4b4ad5] rounded-lg font-medium text-sm transition-all hover:bg-[#4b4ad5]/5"
          >
            Export Pathway
          </button>
          <button
            onClick={onNewPathway}
            className="py-3 px-4 border-2 border-gray-300 text-[#171725] rounded-lg font-medium text-sm transition-all hover:bg-gray-50"
          >
            New Pathway
          </button>
        </div>
      </div>
    </div>
  );
}
