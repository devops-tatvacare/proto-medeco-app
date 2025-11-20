"use client";

import { useState } from 'react';

interface SymptomsInputProps {
  onSubmit: (symptoms: string, files: File[]) => void;
}

export function SymptomsInput({ onSubmit }: SymptomsInputProps) {
  const [symptoms, setSymptoms] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleExampleClick = (example: string) => {
    setSymptoms(example);
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      onSubmit(symptoms, files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const examples = [
    "Chest pain with shortness of breath at night",
    "Headache changes"
  ];

  return (
    <div className="w-full">
      {/* Example Prompts */}
      <div className="px-4 py-4 bg-[#f5f5f7]">
        <h4 className="text-[#454551] text-sm font-medium mb-3">
          Try Examples Prompts
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 hover:border-[#4b4ad5]/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-sm text-[#171725]">{example}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box at Bottom */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-[0px_-4px_12px_rgba(0,0,0,0.08)]">
        {/* File Upload Display */}
        {files.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8" fill="white"/>
                </svg>
                <span className="text-xs text-red-700 truncate max-w-[120px]">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Input Row with Icons and Send Button */}
        <div className="flex items-center gap-3">
          {/* File Upload Icon */}
          <label className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#4b4ad5] cursor-pointer transition-colors">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </label>

          {/* Text Input with Mic Icon */}
          <div className="flex-1 relative">
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Ask anything..."
              rows={1}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl border-2 border-[#4b4ad5] focus:border-[#4b4ad5] focus:outline-none resize-none text-sm text-[#171725] placeholder:text-[#98a2b3] max-h-[120px] leading-relaxed"
              style={{ minHeight: '48px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />

            {/* Mic Icon */}
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition-colors"
              aria-label="Voice input"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={!symptoms.trim()}
            className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full transition-all ${
              symptoms.trim()
                ? 'bg-gradient-to-r from-[#4b4ad5] to-[#a461d8] hover:shadow-lg active:scale-95'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Send"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
