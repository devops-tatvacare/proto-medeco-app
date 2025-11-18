"use client";

import { Gender } from '@/context/DDxContext';

interface GenderSelectorProps {
  onSelect: (gender: Gender) => void;
  selectedGender?: Gender;
}

export function GenderSelector({ onSelect, selectedGender }: GenderSelectorProps) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-[#171725] font-semibold text-base mb-4">
        Select Patient's Gender
      </h3>

      <div className="flex gap-3">
        {/* Male Button */}
        <button
          onClick={() => onSelect('Male')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
            selectedGender === 'Male'
              ? 'border-[#4b4ad5] bg-[#4b4ad5]/5 text-[#4b4ad5]'
              : 'border-gray-300 bg-white text-[#171725] hover:border-[#4b4ad5]/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Male</span>
            {selectedGender === 'Male' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            )}
          </div>
        </button>

        {/* Female Button */}
        <button
          onClick={() => onSelect('Female')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
            selectedGender === 'Female'
              ? 'border-[#4b4ad5] bg-[#4b4ad5]/5 text-[#4b4ad5]'
              : 'border-gray-300 bg-white text-[#171725] hover:border-[#4b4ad5]/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Female</span>
            {selectedGender === 'Female' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
