/**
 * VideoDrilldown Component
 * Detailed video view with Topics, Transcript, and Notes
 * Includes Tatva AI floating action button with chat overlay
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";
import { ChatOverlay } from "./ChatOverlay";

interface VideoDrilldownProps {
  title: string;
  onBackClick?: () => void;
}

type TabType = "topics" | "transcript" | "notes";

export function VideoDrilldown({ title, onBackClick }: VideoDrilldownProps) {
  const [activeTab, setActiveTab] = useState<TabType>("topics");
  const [notes, setNotes] = useState<string[]>([]);
  const [selectedTranscriptIndex, setSelectedTranscriptIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock transcript data
  const transcriptData = [
    "Brain tumours are abnormal growths of cells in the brain that can originate from brain cells or spread from cancer elsewhere in the body.",
    "There are two main types of brain tumours: primary tumours that originate in the brain and secondary tumours that spread from other parts of the body.",
    "Common symptoms of brain tumours include persistent headaches, vision problems, balance disorders, nausea and vomiting, cognitive changes, and seizures.",
    "The severity and symptoms depend on the tumour's location, size, and rate of growth within the brain structure.",
    "Diagnosis typically involves MRI or CT scans followed by a biopsy to determine the exact type of tumour.",
    "Treatment options include surgery, radiation therapy, and chemotherapy depending on the tumour type and stage.",
    "Early detection and proper treatment planning significantly improve patient outcomes and quality of life.",
    "It is important to seek medical attention if you experience persistent symptoms or concerning changes in your health.",
  ];

  // Extract 4 main topics from transcript
  const topics = [
    "Types of Brain Tumours",
    "Recognizing Symptoms",
    "Diagnostic Methods",
    "Treatment Options",
  ];

  const handleAddNote = (transcriptIdx: number) => {
    if (!notes.includes(transcriptData[transcriptIdx])) {
      setNotes([...notes, transcriptData[transcriptIdx]]);
    }
    setSelectedTranscriptIndex(transcriptIdx);
  };

  const handleRemoveNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Sticky Header (120px total) */}
      <div className="sticky top-0 z-30 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        {/* Status Bar Row (54px) */}
        <div className="flex items-center justify-between px-4 py-3 h-[54px] bg-white">
          <p className="font-poppins font-medium text-[16px] text-black tracking-[0.1px]">
            9:41
          </p>
          <div className="flex items-center gap-1">
            <div className="w-[19.2px] h-[10.41px]" />
            <div className="w-[17.142px] h-[10.23px]" />
            <div className="w-[25px] h-[12px] flex items-center justify-center relative">
              <div className="absolute border border-black border-solid opacity-[0.35] rounded-[4.3px] w-[25px] h-[12px]" />
              <div className="absolute bg-black rounded-[2.5px] w-[21px] h-[5.33px]" />
            </div>
          </div>
        </div>

        {/* Header Content Row (66px) */}
        <div className="flex items-center justify-between px-4 py-3 h-[66px] bg-white border-t border-gray-100 gap-3">
          <button
            onClick={onBackClick}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="h-[50px] flex-1 flex items-center">
            <img
              alt="TatvaShots"
              src="/assets/IMG_0056.png"
              className="h-full object-contain"
            />
          </div>

          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
        <div className="flex flex-col pb-8 px-6 pt-6">
          {/* Title */}
          <h1 className={`${typographyClasses.h1} text-gray-900 mb-6`}>
            {title}
          </h1>

          {/* Video Player */}
          <div className="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden mb-6 flex items-center justify-center shadow-md">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4B4AD5" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {["topics", "transcript", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`px-4 py-3 font-semibold text-sm transition-all capitalize ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600 -mb-px"
                    : "text-gray-600 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "topics" && (
              <div className="space-y-3">
                {topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">{idx + 1}</span>
                    </div>
                    <p className={`${typographyClasses.sh1} text-gray-700`}>{topic}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="space-y-3">
                {transcriptData.map((text, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      selectedTranscriptIndex === idx
                        ? "bg-purple-50 border-purple-300"
                        : "bg-white border-gray-100 hover:border-purple-200"
                    }`}
                    onClick={() => handleAddNote(idx)}
                  >
                    <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed`}>{text}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddNote(idx);
                      }}
                      className="text-xs text-purple-600 font-semibold mt-2 hover:text-purple-700"
                    >
                      + Add to Notes
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3">
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className={`${typographyClasses.sh1} text-gray-500`}>
                      No notes yet. Select from transcript to add notes.
                    </p>
                  </div>
                ) : (
                  notes.map((note, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-gray-100 group">
                      <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed mb-2`}>{note}</p>
                      <button
                        onClick={() => handleRemoveNote(idx)}
                        className="text-xs text-red-600 font-semibold hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-xs z-20 group"
        aria-label="Open Tatva AI chat"
      >
        <span className="text-2xl group-hover:animate-pulse">💬</span>
      </button>

      {/* Chat Overlay */}
      {isChatOpen && (
        <ChatOverlay
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          videoTitle={title}
        />
      )}
    </div>
  );
}
