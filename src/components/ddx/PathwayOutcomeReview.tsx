"use client";

import { useState } from 'react';

interface PathwayOutcomeReviewProps {
  diagnosisName: string;
  onLinkPatient: () => void;
  onStartNewDDx: () => void;
}

export function PathwayOutcomeReview({ diagnosisName, onLinkPatient, onStartNewDDx }: PathwayOutcomeReviewProps) {
  const [notes, setNotes] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-2.5">
        {/* Doctor Notes */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#171725]">
            Doctor Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add clinical notes, observations, or any additional information about this care pathway..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs text-[#171725] placeholder:text-[#98a2b3] focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent resize-none leading-snug"
            rows={3}
          />
          <p className="text-[10px] text-[#6b7280]">
            These notes will be attached to the patient record
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#4b4ad5]/5 rounded-lg p-2.5">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
              <h4 className="text-xs font-semibold text-[#171725] mb-0.5 leading-tight">Care Pathway Complete</h4>
              <p className="text-[10px] text-[#6b7280] leading-snug">
                Assessment, risk classification, interventions, and monitoring schedule have been configured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-100 p-3 space-y-2">
        <button
          onClick={onLinkPatient}
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

        <button
          onClick={onStartNewDDx}
          className="w-full py-2.5 px-4 rounded-lg bg-white border-2 border-gray-200 text-[#171725] font-medium text-sm transition-all hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Start New DDx
        </button>
      </div>
    </div>
  );
}
