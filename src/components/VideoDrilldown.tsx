/**
 * VideoDrilldown Component
 * Detailed video view with Topics, Transcript, and Notes
 * Includes Tatva AI floating action button with chat overlay
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";
import { ChatOverlay } from "./ChatOverlay";
import { NotebookCreation } from "./NotebookCreation";

interface VideoDrilldownProps {
  title: string;
  onBackClick?: () => void;
  initialTab?: string;
}

type TabType = "summary" | "topics" | "transcript" | "notes" | "transcripts" | "chat";

export function VideoDrilldown({ title, onBackClick, initialTab = "summary" }: VideoDrilldownProps) {
  // Map incoming tab names to internal tab names
  const mapTabName = (tab: string): TabType => {
    if (tab === "transcripts") return "transcript";
    if (tab === "chat") return "notes";
    return tab as TabType;
  };

  const [activeTab, setActiveTab] = useState<TabType>(mapTabName(initialTab));
  const [notes, setNotes] = useState<string[]>([]);
  const [selectedTranscriptIndex, setSelectedTranscriptIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotebookCreation, setShowNotebookCreation] = useState(false);

  // YouTube video ID extracted from: https://youtu.be/laPaezEsteI?si=kFmzvHoHxEs6Sfg0
  const youtubeVideoId = "laPaezEsteI";

  // Transcript data with timestamps
  const transcriptData = [
    { time: "0:00", text: "This is a Ozempic. It's a drug approved by the FDA to manage type 2 diabetes." },
    { time: "0:05", text: "Maybe you've heard the jingle. [singing] \"Oh, oh, oh Ozempic.\"" },
    { time: "0:10", text: "Or maybe you've seen Ozempic in the news recently for another reason - weight loss." },
    { time: "0:20", text: "Ozempic was designed to help people manage their blood sugar but it's also proven to help people lose weight." },
    { time: "0:48", text: "According to the latest data from the National Institutes of Health, around 42% of adults in the US are currently categorized as obese." },
    { time: "0:58", text: "The CDC's list of health risks associated with obesity include heart disease, stroke, and type 2 diabetes." },
    { time: "1:07", text: "Not everyone living with type 2 diabetes is considered obese but the two are closely linked." },
    { time: "1:15", text: "One of the leading recommendations for managing type 2 diabetes is weight loss." },
    { time: "1:57", text: "For a long time, doctors have had mixed views on how to make weight loss more accessible." },
    { time: "2:06", text: "Historically, weight loss drugs have been associated with dangerous side effects and have been pulled from the market." },
    { time: "2:23", text: "With new diabetes drugs like Ozempic, scientists have a safe and effective tool for weight loss based on something inside our bodies: Hormones." },
    { time: "2:32", text: "Hormones are the body's messengers running from one place to another prompting certain cells into action." },
    { time: "2:43", text: "One of them is GLP-1: the hormone that tells us when we're full." },
    { time: "2:54", text: "Semaglutide, the generic name for Ozempic, is made to mimic GLP-1." },
    { time: "3:00", text: "When food enters your stomach and begins to work its way through the digestive system, your body releases GLP-1 in the intestine." },
    { time: "3:12", text: "In the pancreas, GLP-1 receptors promote the production of insulin and suppress the production of glucagon." },
    { time: "3:49", text: "In the stomach, GLP-1 receptors slow gastric emptying, which means food doesn't move through the digestive system as quickly." },
    { time: "4:10", text: "There are GLP-1 receptors in the brain, particularly in the hypothalamus that suppress hunger cravings." },
    { time: "4:32", text: "A major clinical trial of semaglutide in adults showed an average weight reduction of around 15% when paired with diet and exercise." },
    { time: "4:59", text: "These drugs aren't without side effects. The most common being nausea and gastrointestinal effects like diarrhea." },
    { time: "5:29", text: "The number of prescriptions of Semaglutide has risen dramatically since becoming available in late 2017." },
    { time: "5:39", text: "In 2021, the FDA approved Semaglutide to be prescribed at a higher dose for weight management specifically, branded under the name Wegovy." },
    { time: "6:15", text: "Mounjaro, another medication developed specifically for type 2 diabetes, is currently being fast tracked for approval by the FDA." },
    { time: "6:26", text: "Now that Ozempic's notoriety helps Semaglutide go mainstream, it and drugs like it will only become more commonly prescribed for weight management." },
  ];

  // Topics with color indicators and durations - from actual video content
  const topics = [
    { title: "What is Ozempic and GLP-1", color: "bg-red-400", duration: "2:54" },
    { title: "How GLP-1 Works in the Body", color: "bg-yellow-300", duration: "1:18" },
    { title: "Weight Loss & Health Benefits", color: "bg-pink-400", duration: "1:30" },
    { title: "Clinical Results & Future Drugs", color: "bg-purple-500", duration: "1:51" },
  ];

  const handleAddNote = (transcriptIdx: number) => {
    const noteText = `[${transcriptData[transcriptIdx].time}] ${transcriptData[transcriptIdx].text}`;
    if (!notes.includes(noteText)) {
      setNotes([...notes, noteText]);
    }
    setSelectedTranscriptIndex(transcriptIdx);
  };

  const handleRemoveNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // If notebook creation is open, show it
  if (showNotebookCreation) {
    return (
      <NotebookCreation
        onBackClick={() => setShowNotebookCreation(false)}
      />
    );
  }

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        {/* Status Bar Row */}
        <div className="flex items-center justify-between px-6 py-3 h-[54px] bg-white">
          <p className="font-poppins font-medium text-base text-black tracking-[0.1px]">
            9:41
          </p>
          <div className="flex items-center gap-1.5 text-black">
            {/* Signal strength */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
              <path d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Header Content Row */}
        <div className="flex items-center justify-between px-6 py-3 h-[66px] bg-white border-t border-gray-100 gap-3">
          <button
            onClick={onBackClick}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1"></div>

          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area with Sticky Tabs */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full flex flex-col">
        {/* Non-scrolling Header Section */}
        <div className="px-4 pt-4 flex-shrink-0">
          {/* Title */}
          <h1 className={`${typographyClasses.h1} text-gray-900 mb-4`}>
            {title}
          </h1>

          {/* YouTube Video Embed - Inline player */}
          <div className="w-full bg-black rounded-xl overflow-hidden mb-4 shadow-md">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex -mx-4">
            {["summary", "topics", "transcript", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`flex-1 py-2 font-semibold text-xs transition-all capitalize text-center ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600 -mb-px bg-purple-50"
                    : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-4 py-4 pb-6 space-y-3">
            {activeTab === "summary" && (
              <div className="space-y-3">
                {/* Main Summary Box with Gradient */}
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl border border-purple-100 p-4 shadow-sm">
                  <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed mb-2`}>
                    Ozempic, a medication developed to manage type 2 diabetes, has been in the news a lot lately because of one of its signature side effects: drastic weight loss. Both Ozempic and Wegovy are brand names of a drug called semaglutide—one of several drugs that mimic GLP-1, a crucial digestive hormone that amplifies a process our bodies perform naturally.
                  </p>

                  <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed`}>
                    GLP-1 works in three key areas: the pancreas (regulating insulin and glucagon), the stomach (slowing digestion and extending fullness), and the brain (suppressing appetite). This multi-system approach helps insulin-resistant bodies manage blood sugar and promotes weight loss.
                  </p>
                </div>

                {/* Key Mechanisms Box */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-3 shadow-sm">
                  <h3 className="font-semibold text-purple-900 mb-2 text-xs">How GLP-1 Works</h3>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white text-[9px] font-semibold">1</span>
                      </div>
                      <p className={`${typographyClasses.sh1} text-purple-800`}><span className="font-semibold">Pancreas:</span> Promotes insulin production and suppresses glucagon</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white text-[9px] font-semibold">2</span>
                      </div>
                      <p className={`${typographyClasses.sh1} text-purple-800`}><span className="font-semibold">Stomach:</span> Slows gastric emptying and extends feeling of fullness</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white text-[9px] font-semibold">3</span>
                      </div>
                      <p className={`${typographyClasses.sh1} text-purple-800`}><span className="font-semibold">Brain:</span> Suppresses appetite and promotes satiety</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "topics" && (
              <div className="space-y-3">
                {/* Timeline Seeker Card */}
                <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                  {/* Timeline progress bar */}
                  <div className="mb-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-purple-600 rounded-full" />
                    </div>
                  </div>

                  {/* Timeline dots with labels */}
                  <div className="relative">
                    {/* Connecting line for visual reference */}
                    <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

                    {/* Dots container - spread evenly */}
                    <div className="flex justify-between items-start px-1">
                      {topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center group cursor-pointer"
                        >
                          {/* Dot */}
                          <div className="relative z-10 mb-2.5">
                            <div
                              className={`w-5 h-5 rounded-full ${topic.color} border-3 border-white shadow-md group-hover:scale-125 group-hover:shadow-lg transition-all`}
                            />
                          </div>
                          {/* Timestamp below dot */}
                          <p className="text-xs text-gray-600 font-medium text-center">
                            {topic.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topics List */}
                <div className="space-y-2">
                  {topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${topic.color} shadow-sm`} />
                        <p className={`${typographyClasses.sh1} text-gray-800 group-hover:text-gray-900 font-medium line-clamp-2`}>
                          {topic.title}
                        </p>
                      </div>
                      <p className={`${typographyClasses.sh1} text-gray-500 flex-shrink-0 ml-3 font-medium`}>
                        {topic.duration}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Play All Button */}
                <div className="flex justify-center pt-1">
                  <button className="flex items-center gap-1.5 px-5 py-2 bg-black text-white rounded-full font-semibold text-xs hover:bg-gray-900 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Play All
                  </button>
                </div>
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="space-y-2">
                {transcriptData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg transition-all cursor-pointer border ${
                      selectedTranscriptIndex === idx
                        ? "bg-purple-50 border-purple-300"
                        : "bg-white border-gray-100 hover:border-purple-200"
                    }`}
                    onClick={() => handleAddNote(idx)}
                  >
                    <div className="flex gap-2">
                      <div className="flex-shrink-0">
                        <p className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
                          {item.time}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed`}>{item.text}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddNote(idx);
                          }}
                          className="text-[10px] text-purple-600 font-semibold mt-1 hover:text-purple-700"
                        >
                          + Add to Notes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-2">
                {notes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className={`${typographyClasses.sh1} text-gray-500`}>
                      No notes yet. Select from transcript to add notes.
                    </p>
                  </div>
                ) : (
                  notes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-100 group">
                      <p className={`${typographyClasses.sh1} text-gray-700 leading-relaxed mb-1`}>{note}</p>
                      <button
                        onClick={() => handleRemoveNote(idx)}
                        className="text-[10px] text-red-600 font-semibold hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
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

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-4 flex items-center gap-2 z-20">
        {/* Create Notebook FAB */}
        <button
          onClick={() => setShowNotebookCreation(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white z-20"
          aria-label="Create Notebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Chat FAB */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-xs z-20 group"
          aria-label="Open Tatva AI chat"
        >
          <span className="text-xl group-hover:animate-pulse">💬</span>
        </button>
      </div>

      {/* Chat Overlay */}
      {isChatOpen && (
        <ChatOverlay
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          videoTitle={title}
          onAddNote={(noteText) => {
            if (!notes.includes(noteText)) {
              setNotes([...notes, noteText]);
            }
          }}
        />
      )}
    </div>
  );
}
