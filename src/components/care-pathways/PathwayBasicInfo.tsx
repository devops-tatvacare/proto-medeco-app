"use client";

import { useState } from 'react';
import { usePathwayBuilder } from '@/context/PathwayBuilderContext';

export function PathwayBasicInfo() {
  const { setBasicInfo, pathwayName, specialty, description } = usePathwayBuilder();
  const [name, setName] = useState(pathwayName);
  const [spec, setSpec] = useState(specialty);
  const [desc, setDesc] = useState(description);

  const canContinue = name.trim() && spec.trim() && desc.trim();

  const handleContinue = () => {
    if (canContinue) {
      setBasicInfo(name, spec, desc);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#200535] to-[#5e0f9b] px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-[28px] font-bold leading-[36px] mb-2 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgb(158, 173, 255) 0%, rgb(255, 128, 145) 100%)'
            }}
          >
            Pathway Details
          </h1>
          <p className="text-white/80 text-sm">
            Let's start by defining the basic information
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl space-y-5">
          {/* Pathway Name */}
          <div>
            <label htmlFor="pathway-name" className="block text-sm font-semibold text-[#1f2937] mb-2">
              Pathway Name *
            </label>
            <input
              id="pathway-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Heart Failure Management"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent text-[#1f2937] placeholder:text-[#9ca3af]"
            />
          </div>

          {/* Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-semibold text-[#1f2937] mb-2">
              Medical Specialty *
            </label>
            <select
              id="specialty"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent text-[#1f2937] bg-white"
            >
              <option value="">Select specialty...</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Hepatology">Hepatology</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Neurology">Neurology</option>
              <option value="Oncology">Oncology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#1f2937] mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief description of this care pathway..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent text-[#1f2937] placeholder:text-[#9ca3af] resize-none"
            />
            <p className="text-xs text-[#6b7280] mt-1">{desc.length}/500 characters</p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all ${
              canContinue
                ? 'hover:shadow-xl active:scale-[0.98]'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: canContinue ? 'linear-gradient(to right, #4b4ad5, #a461d8)' : '#9ca3af',
            }}
          >
            Continue to Assessment
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-center text-white/60 text-xs mt-4">
          All fields are required to continue
        </p>
      </div>
    </div>
  );
}
