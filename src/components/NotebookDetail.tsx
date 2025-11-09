/**
 * NotebookDetail Component
 * Shows notebook with Sources and Chat tabs
 * Sources: Display all added sources
 * Chat: Chat with AI about the notebook content
 */

"use client";

import React, { useState } from "react";
import { BookOpen, Headphones, FileText, Music, ChevronLeft, Send, Library, MessageCircle } from "lucide-react";
import { typographyClasses } from "@/lib/design-tokens";

interface Source {
  id: string;
  type: "note" | "audio" | "article" | "pdf" | "web-search" | "upload";
  title: string;
  description?: string;
  icon?: string;
  source?: string;
  category?: "app" | "web" | "upload";
}

interface Notebook {
  id: string;
  name: string;
  sources: Source[];
  createdAt: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface NotebookDetailProps {
  notebook: Notebook;
  onBackClick?: () => void;
}

export function NotebookDetail({ notebook, onBackClick }: NotebookDetailProps) {
  const [activeTab, setActiveTab] = useState<"sources" | "chat">("sources");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to render source icons based on type
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText size={28} className="text-blue-600" />;
      case "audio":
        return <Music size={28} className="text-green-600" />;
      case "article":
        return <BookOpen size={28} className="text-purple-600" />;
      case "pdf":
        return <Headphones size={28} className="text-red-600" />;
      default:
        return <FileText size={28} className="text-gray-600" />;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, userMessage]);
      setInputValue("");

      // Simulate AI response
      setIsLoading(true);
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Based on your notebook "${notebook.name}" with ${notebook.sources.length} sources, I understand you're researching: ${notebook.sources.map(s => s.title).join(", ")}. How can I help you analyze this content?`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBackClick}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 text-center">
            <h1 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
              {notebook.name}
            </h1>
            <p className={`${typographyClasses.caption2} text-gray-500 mt-0.5`}>
              {notebook.sources.length} source{notebook.sources.length !== 1 ? "s" : ""} • Created {notebook.createdAt}
            </p>
          </div>

          <div className="w-8" />
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => setActiveTab("sources")}
            className={`flex-1 py-3 font-semibold text-sm transition-all border-b-2 ${
              activeTab === "sources"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Library size={18} /> Sources
            </span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 font-semibold text-sm transition-all border-b-2 ${
              activeTab === "chat"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <MessageCircle size={18} /> Chat
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Sources Tab */}
        {activeTab === "sources" && (
          <div className="px-6 py-6">
            {notebook.sources.length > 0 ? (
              <div className="space-y-4">
                {/* Group sources by type */}
                {["note", "audio", "article", "pdf"].map((type) => {
                  const typeSources = notebook.sources.filter(s => s.type === type);
                  if (typeSources.length === 0) return null;

                  const typeLabel = {
                    note: "Notes",
                    audio: "Audio Clips",
                    article: "Articles",
                    pdf: "PDFs",
                  }[type];

                  return (
                    <div key={type} className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <p className={`${typographyClasses.h4SemiBold} text-gray-900`}>
                          {typeLabel}
                        </p>
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {typeSources.length}
                        </span>
                      </div>

                      {typeSources.map((source) => (
                        <div
                          key={source.id}
                          className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {getSourceIcon(source.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`${typographyClasses.sh1} text-gray-900 font-semibold group-hover:text-purple-700 transition-colors`}>
                                {source.title}
                              </p>
                              {source.description && (
                                <p className={`${typographyClasses.caption2} text-gray-600 mt-1`}>
                                  {source.description}
                                </p>
                              )}
                            </div>
                            <button
                              className="flex-shrink-0 ml-3 w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-50 rounded-lg transition-colors"
                              aria-label="View source"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className={`${typographyClasses.h3SemiBold} text-gray-600 mb-2`}>
                  No sources added
                </p>
                <p className={`${typographyClasses.sh1} text-gray-500`}>
                  Add sources to your notebook to get started
                </p>
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="px-6 py-6 flex flex-col h-full">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <p className={`${typographyClasses.h3SemiBold} text-gray-900 mb-2`}>
                  Chat with your sources
                </p>
                <p className={`${typographyClasses.sh1} text-gray-600 mb-6`}>
                  Ask questions about the content in your notebook and get intelligent answers based on all your sources
                </p>
                <div className="space-y-2 w-full max-w-sm">
                  {[
                    "What are the main findings?",
                    "Summarize the key points",
                    "What sources mention side effects?",
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputValue(prompt);
                      }}
                      className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors group"
                    >
                      <p className={`${typographyClasses.sh1} text-purple-700 group-hover:text-purple-900 font-medium`}>
                        {prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex flex-col gap-1 max-w-xs">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p className={`${typographyClasses.sh1} leading-relaxed`}>
                          {message.text}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}>
                        <p className={`${typographyClasses.caption2} text-gray-500`}>
                          {message.timestamp}
                        </p>
                        {message.sender === "ai" && (
                          <button
                            className="text-xs text-purple-600 font-semibold hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded transition-colors"
                            aria-label="Add to notes"
                          >
                            + Add to Notes
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Input (only in chat tab) */}
      {activeTab === "chat" && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white rounded-t-3xl">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              placeholder="Ask a question about your notebook..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
