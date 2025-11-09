/**
 * NotebookDrilldown Component
 * Shows detailed view of a notebook with Sources and Chat tabs
 * Sources include: Articles, Videos, Chat notes, Audio clippings
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";

interface NotebookItem {
  id: string;
  type: "article" | "video" | "chat" | "audio";
  title: string;
  source: string;
  timestamp: string;
  icon?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface NotebookDrilldownProps {
  title: string;
  onBackClick?: () => void;
}

export function NotebookDrilldown({ title, onBackClick }: NotebookDrilldownProps) {
  const [activeTab, setActiveTab] = useState<"sources" | "chat">("sources");
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);

  // Sample sources data
  const sources: NotebookItem[] = [
    {
      id: "1",
      type: "article",
      title: "Understanding Semaglutide: How GLP-1 Agonists Work",
      source: "Medical News Today",
      timestamp: "Nov 8, 2024",
    },
    {
      id: "2",
      type: "video",
      title: "Ozempic is a game-changer. Here's how it works.",
      source: "YouTube",
      timestamp: "Nov 5, 2024",
    },
    {
      id: "3",
      type: "chat",
      title: "AI Response: Clinical trial data and side effects discussion",
      source: "Chat Notes",
      timestamp: "Nov 3, 2024",
    },
    {
      id: "4",
      type: "audio",
      title: "Podcast: GLP-1 Medications Panel Discussion",
      source: "Audio Clipping",
      timestamp: "Nov 1, 2024",
    },
    {
      id: "5",
      type: "article",
      title: "Ozempic vs Wegovy: What's the Difference?",
      source: "Healthline",
      timestamp: "Oct 28, 2024",
    },
    {
      id: "6",
      type: "chat",
      title: "AI Response: Weight loss benefits and mechanisms",
      source: "Chat Notes",
      timestamp: "Oct 25, 2024",
    },
    {
      id: "7",
      type: "video",
      title: "Clinical Trial Results Review",
      source: "YouTube",
      timestamp: "Oct 20, 2024",
    },
    {
      id: "8",
      type: "audio",
      title: "Interview: Endocrinologist on GLP-1 Treatment",
      source: "Audio Clipping",
      timestamp: "Oct 15, 2024",
    },
  ];

  // Sample chat history
  const chatHistory: ChatMessage[] = [
    {
      id: "1",
      text: "How does semaglutide work in the body?",
      sender: "user",
      timestamp: "2:30 PM",
    },
    {
      id: "2",
      text: "Semaglutide is a GLP-1 receptor agonist that mimics the glucagon-like peptide-1 hormone. It works in three key areas: the pancreas (promoting insulin secretion), the stomach (slowing gastric emptying), and the brain (suppressing appetite). This multi-system approach helps with both blood sugar control and weight loss.",
      sender: "ai",
      timestamp: "2:31 PM",
    },
    {
      id: "3",
      text: "What are the side effects?",
      sender: "user",
      timestamp: "2:35 PM",
    },
    {
      id: "4",
      text: "The most common side effects include nausea and gastrointestinal issues like diarrhea, especially when starting the medication. These often improve over time. More serious but rare side effects include pancreatitis and gallbladder issues. It's important to discuss with your healthcare provider.",
      sender: "ai",
      timestamp: "2:36 PM",
    },
    {
      id: "5",
      text: "Is it approved for weight loss?",
      sender: "user",
      timestamp: "2:40 PM",
    },
    {
      id: "6",
      text: "Yes, Ozempic is FDA approved for type 2 diabetes management. Wegovy is the same medication (semaglutide) at higher doses, specifically approved by the FDA for weight management in adults with obesity or overweight conditions.",
      sender: "ai",
      timestamp: "2:41 PM",
    },
  ];

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return "📄";
      case "video":
        return "📹";
      case "chat":
        return "💬";
      case "audio":
        return "🎵";
      default:
        return "📌";
    }
  };

  const getSourceLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Article";
      case "video":
        return "Video";
      case "chat":
        return "Chat Note";
      case "audio":
        return "Audio";
      default:
        return "Source";
    }
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Header with Back Button and Title */}
      <div className="sticky top-0 z-30 w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={onBackClick}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
            {title}
          </h1>
        </div>
      </div>

      {/* Scrollable Content Area with Sticky Tabs */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full flex flex-col">

        {/* Sticky Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex -mx-6">
            {["sources", "chat"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "sources" | "chat")}
                className={`flex-1 py-3 font-semibold text-sm transition-all capitalize text-center ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600 -mb-px bg-purple-50"
                    : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab === "sources" ? "Sources" : "Chat"}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 py-6 pb-8 space-y-3">
            {activeTab === "sources" && (
              <>
                <p className={`${typographyClasses.sh1} text-gray-600 mb-4`}>
                  {sources.length} source{sources.length !== 1 ? "s" : ""} collected
                </p>
                <div className="space-y-3">
                  {sources.map((item) => (
                    <button
                      key={item.id}
                      className="w-full text-left transition-all hover:shadow-sm active:scale-95"
                    >
                      <div className="p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all">
                        <div className="flex gap-3 items-start">
                          {/* Icon */}
                          <div className="flex-shrink-0 text-2xl">
                            {getSourceIcon(item.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`${typographyClasses.sh1} text-gray-900 font-semibold line-clamp-2 mb-1`}>
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                {getSourceLabel(item.type)}
                              </span>
                              <span className={`${typographyClasses.caption2} text-gray-500`}>
                                {item.source}
                              </span>
                            </div>
                            <p className={`${typographyClasses.caption2} text-gray-400 mt-2`}>
                              {item.timestamp}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === "chat" && (
              <div className="space-y-3">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex flex-col gap-1 max-w-xs">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p className={`${typographyClasses.sh1} leading-relaxed`}>
                          {msg.text}
                        </p>
                      </div>
                      <p className={`${typographyClasses.caption2} text-gray-500 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Add Source */}
      <button
        onClick={() => setShowAddSourceModal(true)}
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-2xl z-20 group"
        aria-label="Add source"
      >
        <span className="group-hover:animate-pulse">+</span>
      </button>

      {/* Add Source Modal */}
      {showAddSourceModal && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setShowAddSourceModal(false)}
          />

          {/* Modal Panel */}
          <div className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h3 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
                Add Source
              </h3>
              <button
                onClick={() => setShowAddSourceModal(false)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
              <div className="space-y-3">
                {[
                  { type: "article", label: "Article", icon: "📄", color: "bg-blue-50 border-blue-200" },
                  { type: "video", label: "Video", icon: "📹", color: "bg-red-50 border-red-200" },
                  { type: "chat", label: "Chat Note", icon: "💬", color: "bg-purple-50 border-purple-200" },
                  { type: "audio", label: "Audio Clipping", icon: "🎵", color: "bg-green-50 border-green-200" },
                ].map((sourceType) => (
                  <button
                    key={sourceType.type}
                    onClick={() => {
                      // Handle adding source
                      setShowAddSourceModal(false);
                    }}
                    className={`w-full p-4 border-2 rounded-xl transition-all hover:shadow-md active:scale-95 flex items-center gap-3 ${sourceType.color}`}
                  >
                    <span className="text-2xl">{sourceType.icon}</span>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">{sourceType.label}</p>
                      <p className={`${typographyClasses.caption2} text-gray-600 mt-0.5`}>
                        {sourceType.type === "article" && "Add from website or document"}
                        {sourceType.type === "video" && "Link YouTube or video content"}
                        {sourceType.type === "chat" && "Save from chat history"}
                        {sourceType.type === "audio" && "Upload or link audio file"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
