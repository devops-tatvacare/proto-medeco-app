"use client";

import { useState } from 'react';

interface AgePickerProps {
  onSelect: (age: number) => void;
}

export function AgePicker({ onSelect }: AgePickerProps) {
  const [selectedAge, setSelectedAge] = useState<number>(18);

  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  const visibleAges = ages.slice(Math.max(0, selectedAge - 3), selectedAge + 2);

  const handleAgeClick = (age: number) => {
    setSelectedAge(age);
  };

  const handleSubmit = () => {
    onSelect(selectedAge);
  };

  return (
    <div className="px-4 py-4">
      <h3 className="text-[#171725] font-semibold text-base mb-4 text-center">
        Select Patient's Age
      </h3>

      {/* Age Picker */}
      <div className="flex flex-col items-center gap-2 mb-6">
        {/* Up Arrow */}
        <button
          onClick={() => setSelectedAge(prev => Math.min(100, prev + 1))}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Increase age"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>

        {/* Age Values */}
        <div className="flex flex-col items-center gap-1 py-2">
          {visibleAges.map((age, index) => {
            const isSelected = age === selectedAge;
            const distance = Math.abs(index - 2);
            const opacity = isSelected ? 1 : Math.max(0.3, 1 - distance * 0.3);

            return (
              <button
                key={age}
                onClick={() => handleAgeClick(age)}
                className={`w-32 py-2 rounded-xl text-center font-medium transition-all ${
                  isSelected
                    ? 'text-[#4b4ad5] border-2 border-[#4b4ad5] bg-white text-xl scale-110'
                    : 'text-gray-600 border-2 border-transparent text-base'
                }`}
                style={{ opacity }}
              >
                {age}
              </button>
            );
          })}
        </div>

        {/* Down Arrow */}
        <button
          onClick={() => setSelectedAge(prev => Math.max(1, prev - 1))}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Decrease age"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Select Age Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 px-6 rounded-full text-white font-medium text-base shadow-lg transition-all hover:shadow-xl"
        style={{
          background: 'linear-gradient(to right, #4b4ad5, #a461d8)'
        }}
      >
        Select Age
      </button>
    </div>
  );
}
