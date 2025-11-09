/**
 * Notes Component
 * Displays all notes from transcripts, chat, and manual entries
 * Includes search, filtering, and ability to add new notes
 */

"use client";

import React, { useState } from "react";
import { FileText, MessageCircle, PenTool, Mic, Pin, Headphones, Search, Sparkles, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { typographyClasses } from "@/lib/design-tokens";

interface Note {
  id: string;
  text: string;
  type: "transcript" | "chat" | "manual" | "audio";
  source?: string;
  topic?: string;
  timestamp: string;
  icon?: string;
  duration?: string;
  audioUrl?: string;
}

interface Article {
  id: string;
  title: string;
  source: string;
}

export function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);

  // Add Note Modal - Step tracking
  const [addNoteStep, setAddNoteStep] = useState<"content" | "topic" | "article">("content");
  const [newNoteText, setNewNoteText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Audio Modal - Step tracking
  const [audioStep, setAudioStep] = useState<"ready" | "topic" | "article">("ready");

  const [topics, setTopics] = useState(["How GLP-1 Works", "Side Effects", "Clinical Results", "Drug Comparisons", "Personal Notes"]);
  const [showNewTopicInput, setShowNewTopicInput] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [topicSearchQuery, setTopicSearchQuery] = useState("");
  const [articleSearchQuery, setArticleSearchQuery] = useState("");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Sample articles
  const [articles] = useState<Article[]>([
    { id: "1", title: "Ozempic: Mechanism and Clinical Use", source: "Ozempic Video" },
    { id: "2", title: "GLP-1 Receptor Agonists", source: "Clinical Documentation" },
    { id: "3", title: "Weight Loss Management with Semaglutide", source: "Medical Journal" },
  ]);

  // Sample notes data
  const allNotes: Note[] = [
    {
      id: "1",
      text: "Semaglutide works by mimicking GLP-1, promoting insulin production and suppressing appetite.",
      type: "transcript",
      source: "Ozempic Video",
      topic: "How GLP-1 Works",
      timestamp: "Nov 8, 2024",
      icon: "transcript",
    },
    {
      id: "2",
      text: "Clinical trial showed 15% average weight reduction when paired with diet and exercise.",
      type: "chat",
      source: "AI Chat",
      topic: "Clinical Results",
      timestamp: "Nov 6, 2024",
      icon: "chat",
    },
    {
      id: "3",
      text: "Most common side effects include nausea and gastrointestinal issues.",
      type: "transcript",
      source: "Ozempic Video",
      topic: "Side Effects",
      timestamp: "Nov 5, 2024",
      icon: "transcript",
    },
    {
      id: "4",
      text: "Wegovy is semaglutide at higher doses, specifically approved for weight management.",
      type: "chat",
      source: "AI Chat",
      topic: "Drug Comparisons",
      timestamp: "Nov 3, 2024",
      icon: "chat",
    },
    {
      id: "5",
      text: "Personal reminder: Start with lower dose and monitor for side effects",
      type: "manual",
      source: "Manual Note",
      topic: "Personal Notes",
      timestamp: "Nov 2, 2024",
      icon: "manual",
    },
    {
      id: "6",
      text: "GLP-1 receptors in the brain suppress hunger in the hypothalamus.",
      type: "transcript",
      source: "Ozempic Video",
      topic: "How GLP-1 Works",
      timestamp: "Oct 30, 2024",
      icon: "transcript",
    },
    {
      id: "7",
      text: "Audio note: Quick reminder about monitoring blood sugar levels during initial semaglutide treatment. Important to track any changes in appetite and energy levels.",
      type: "audio",
      source: "Audio Clip",
      topic: "Personal Notes",
      timestamp: "Oct 25, 2024",
      icon: "audio",
      duration: "1:23",
      audioUrl: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    },
    {
      id: "8",
      text: "Audio note: Discussion about potential side effects. Nausea is common in first week but typically subsides. Consult doctor if persistent.",
      type: "audio",
      source: "Audio Clip",
      topic: "Side Effects",
      timestamp: "Oct 20, 2024",
      icon: "audio",
      duration: "2:15",
      audioUrl: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    },
  ];

  const sources = ["Ozempic Video", "AI Chat", "Manual Note"];

  // Handle creating a new topic
  const handleAddNewTopic = () => {
    if (newTopicName.trim() && !topics.includes(newTopicName)) {
      setTopics([...topics, newTopicName]);
      setSelectedTopic(newTopicName);
      setNewTopicName("");
      setShowNewTopicInput(false);
    }
  };

  // Filter notes based on search and selected filter
  const filteredNotes = allNotes.filter((note) => {
    const matchesSearch = note.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === null ||
      selectedFilter === "all" ||
      (selectedFilter.startsWith("topic:") && note.topic === selectedFilter.replace("topic:", "")) ||
      (selectedFilter.startsWith("source:") && note.source === selectedFilter.replace("source:", ""));

    return matchesSearch && matchesFilter;
  });

  const getNoteIcon = (type: string) => {
    switch (type) {
      case "transcript":
        return <FileText size={20} className="text-blue-600" />;
      case "chat":
        return <MessageCircle size={20} className="text-purple-600" />;
      case "manual":
        return <PenTool size={20} className="text-amber-600" />;
      case "audio":
        return <Headphones size={20} className="text-green-600" />;
      default:
        return <Pin size={20} className="text-gray-600" />;
    }
  };

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      // Handle adding note
      setNewNoteText("");
      setSelectedTopic(null);
      setSelectedArticle(null);
      setAddNoteStep("content");
      setShowAddModal(false);
    }
  };

  const handleProceedAddNote = () => {
    if (addNoteStep === "content" && newNoteText.trim()) {
      setAddNoteStep("topic");
    } else if (addNoteStep === "topic") {
      setAddNoteStep("article");
    } else if (addNoteStep === "article") {
      handleAddNote();
    }
  };

  const handleBackAddNote = () => {
    if (addNoteStep === "topic") {
      setAddNoteStep("content");
    } else if (addNoteStep === "article") {
      setAddNoteStep("topic");
    }
  };

  // Filter topics based on search query
  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(topicSearchQuery.toLowerCase())
  );

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(articleSearchQuery.toLowerCase())
  );

  const handleProceedAudio = () => {
    if (audioStep === "ready") {
      setAudioStep("topic");
    } else if (audioStep === "topic") {
      setAudioStep("article");
    } else if (audioStep === "article") {
      setSelectedTopic(null);
      setSelectedArticle(null);
      setAudioStep("ready");
      setShowAudioModal(false);
    }
  };

  const handleBackAudio = () => {
    if (audioStep === "topic") {
      setAudioStep("ready");
    } else if (audioStep === "article") {
      setAudioStep("topic");
    }
  };

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Search and Filter Section */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedFilter(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              selectedFilter === null
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {/* Topic Chips */}
          {topics.map((topic) => (
            <button
              key={`topic:${topic}`}
              onClick={() => setSelectedFilter(`topic:${topic}`)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                selectedFilter === `topic:${topic}`
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-6 py-6 pb-24">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${typographyClasses.sh1} text-gray-500`}>
                No notes found
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="w-full transition-all"
                >
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all">
                    {note.type === "audio" ? (
                      // Audio Note Card
                      <div className="space-y-3">
                        {/* Header with icon and duration */}
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">{getNoteIcon(note.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className={`${typographyClasses.sh1} text-gray-900 leading-relaxed line-clamp-2 mb-1`}>
                              {note.text}
                            </p>
                            {/* Subtle metadata */}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              {note.topic && (
                                <span>{note.topic}</span>
                              )}
                              {note.topic && note.source && (
                                <span>•</span>
                              )}
                              {note.source && (
                                <span>{note.source}</span>
                              )}
                              {(note.topic || note.source) && (
                                <span>•</span>
                              )}
                              <span>{note.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Audio Player */}
                        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg ml-8">
                          <button
                            onClick={() => setPlayingAudioId(playingAudioId === note.id ? null : note.id)}
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              {playingAudioId === note.id ? (
                                // Pause icon
                                <g>
                                  <rect x="6" y="4" width="4" height="16" />
                                  <rect x="14" y="4" width="4" height="16" />
                                </g>
                              ) : (
                                // Play icon
                                <polygon points="5 3 19 12 5 21" />
                              )}
                            </svg>
                          </button>

                          {/* Progress bar */}
                          <div className="flex-1">
                            <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-600 transition-all"
                                style={{ width: playingAudioId === note.id ? "45%" : "0%" }}
                              />
                            </div>
                          </div>

                          {/* Duration */}
                          <span className="text-xs text-gray-600 font-medium flex-shrink-0 w-8 text-right">
                            {note.duration}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Regular Note Card
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{getNoteIcon(note.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className={`${typographyClasses.sh1} text-gray-900 leading-relaxed line-clamp-2 mb-2`}>
                            {note.text}
                          </p>
                          {/* Subtle metadata */}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {note.topic && (
                              <span>{note.topic}</span>
                            )}
                            {note.topic && note.source && (
                              <span>•</span>
                            )}
                            {note.source && (
                              <span>{note.source}</span>
                            )}
                            {(note.topic || note.source) && (
                              <span>•</span>
                            )}
                            <span>{note.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowFabMenu(!showFabMenu)}
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-2xl z-20 group"
        aria-label="Add note"
      >
        <span className={`group-hover:animate-pulse transition-transform ${showFabMenu ? 'rotate-45' : ''}`}>+</span>
      </button>

      {/* Add Note / Audio Modal */}
      {(showAddModal || showAudioModal) && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => {
              setShowAddModal(false);
              setShowAudioModal(false);
            }}
          />

          {/* Modal Panel - Add Note */}
          {showAddModal && (
            <div className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-full">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                {addNoteStep !== "content" && (
                  <button
                    onClick={handleBackAddNote}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Go back"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <h3 className={`${typographyClasses.h3SemiBold} text-gray-900 flex-1 text-center`}>
                  {addNoteStep === "content" && "What's on your mind?"}
                  {addNoteStep === "topic" && "Tag to Topic"}
                  {addNoteStep === "article" && "Link to Article"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAddNoteStep("content");
                    setNewNoteText("");
                    setSelectedTopic(null);
                    setSelectedArticle(null);
                  }}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 py-3 flex gap-1">
                <div className={`h-1 flex-1 rounded-full transition-all ${addNoteStep === "content" || addNoteStep === "topic" || addNoteStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full transition-all ${addNoteStep === "topic" || addNoteStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full transition-all ${addNoteStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
              </div>

              {/* Content - Step 1: Note Content */}
              {addNoteStep === "content" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
                  <div className="space-y-4">
                    <p className={`${typographyClasses.sh1} text-gray-600`}>
                      Write down your thoughts and observations
                    </p>
                    <textarea
                      placeholder="Type your note here..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      autoFocus
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                      rows={6}
                    />
                  </div>
                </div>
              )}

              {/* Content - Step 2: Topic Selection */}
              {addNoteStep === "topic" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
                  <div className="space-y-4">
                    <p className={`${typographyClasses.sh1} text-gray-600 mb-4`}>
                      Which topic does this belong to?
                    </p>

                    {/* Search Topics */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search topics..."
                        value={topicSearchQuery}
                        onChange={(e) => setTopicSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                      />
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      {filteredTopics.length > 0 ? (
                        filteredTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            selectedTopic === topic
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <p className={`${typographyClasses.sh1} font-semibold ${
                            selectedTopic === topic ? "text-purple-700" : "text-gray-900"
                          }`}>
                            {topic}
                          </p>
                        </button>
                      ))
                      ) : (
                        <p className={`${typographyClasses.sh1} text-gray-500 text-center py-4`}>
                          No topics found
                        </p>
                      )}
                    </div>

                    {/* Create New Topic */}
                    {!showNewTopicInput && (
                      <button
                        onClick={() => setShowNewTopicInput(true)}
                        className="w-full p-4 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition-all font-semibold"
                      >
                        + Create New Topic
                      </button>
                    )}

                    {showNewTopicInput && (
                      <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Topic name..."
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddNewTopic();
                              }
                            }}
                            autoFocus
                            className="flex-1 px-3 py-2 bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm text-gray-900 placeholder-gray-500"
                          />
                          <button
                            onClick={handleAddNewTopic}
                            disabled={!newTopicName.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content - Step 3: Article Selection */}
              {addNoteStep === "article" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
                  <div className="space-y-4">
                    <p className={`${typographyClasses.sh1} text-gray-600 mb-4`}>
                      Link this to an article (optional)
                    </p>

                    {/* Search Articles */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={articleSearchQuery}
                        onChange={(e) => setArticleSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                      />
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            selectedArticle === article.id
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <p className={`${typographyClasses.sh1} font-semibold ${
                            selectedArticle === article.id ? "text-purple-700" : "text-gray-900"
                          }`}>
                            {article.title}
                          </p>
                          <p className={`${typographyClasses.caption2} text-gray-500 mt-1`}>
                            {article.source}
                          </p>
                        </button>
                      ))
                      ) : (
                        <p className={`${typographyClasses.sh1} text-gray-500 text-center py-4`}>
                          No articles found
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-sm"
                    >
                      Skip linking article
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAddNoteStep("content");
                    setNewNoteText("");
                    setSelectedTopic(null);
                    setSelectedArticle(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedAddNote}
                  disabled={addNoteStep === "content" && !newNoteText.trim()}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                >
                  {addNoteStep === "article" ? "Save Note" : "Next"}
                </button>
              </div>
            </div>
          )}

          {/* Audio Recording Modal */}
          {showAudioModal && (
            <div className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-full">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                {audioStep !== "ready" && (
                  <button
                    onClick={handleBackAudio}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Go back"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <h3 className={`${typographyClasses.h3SemiBold} text-gray-900 flex-1 text-center`}>
                  {audioStep === "ready" && "Record Audio"}
                  {audioStep === "topic" && "Tag to Topic"}
                  {audioStep === "article" && "Link to Article"}
                </h3>
                <button
                  onClick={() => {
                    setShowAudioModal(false);
                    setAudioStep("ready");
                    setSelectedTopic(null);
                    setSelectedArticle(null);
                  }}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 py-3 flex gap-1">
                <div className={`h-1 flex-1 rounded-full transition-all ${audioStep === "ready" || audioStep === "topic" || audioStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full transition-all ${audioStep === "topic" || audioStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full transition-all ${audioStep === "article" ? "bg-purple-600" : "bg-gray-200"}`} />
              </div>

              {/* Step 1: Ready to Record */}
              {audioStep === "ready" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-12 flex flex-col items-center justify-center">
                  <Mic size={80} className="text-purple-600 mb-6" strokeWidth={1.5} />
                  <p className={`${typographyClasses.h3SemiBold} text-gray-900 text-center mb-2`}>
                    Ready to Record
                  </p>
                  <p className={`${typographyClasses.sh1} text-gray-600 text-center mb-8`}>
                    Tap the microphone button to start recording
                  </p>

                  {/* Record Button */}
                  <button
                    onClick={() => setAudioStep("topic")}
                    className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="8" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Step 2: Topic Selection */}
              {audioStep === "topic" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
                  <div className="space-y-4">
                    <p className={`${typographyClasses.sh1} text-gray-600 mb-4`}>
                      Which topic should this audio belong to?
                    </p>

                    {/* Search Topics */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search topics..."
                        value={topicSearchQuery}
                        onChange={(e) => setTopicSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                      />
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      {filteredTopics.length > 0 ? (
                        filteredTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            selectedTopic === topic
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <p className={`${typographyClasses.sh1} font-semibold ${
                            selectedTopic === topic ? "text-purple-700" : "text-gray-900"
                          }`}>
                            {topic}
                          </p>
                        </button>
                      ))
                      ) : (
                        <p className={`${typographyClasses.sh1} text-gray-500 text-center py-4`}>
                          No topics found
                        </p>
                      )}
                    </div>

                    {/* Create New Topic */}
                    {!showNewTopicInput && (
                      <button
                        onClick={() => setShowNewTopicInput(true)}
                        className="w-full p-4 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition-all font-semibold"
                      >
                        + Create New Topic
                      </button>
                    )}

                    {showNewTopicInput && (
                      <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Topic name..."
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddNewTopic();
                              }
                            }}
                            autoFocus
                            className="flex-1 px-3 py-2 bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm text-gray-900 placeholder-gray-500"
                          />
                          <button
                            onClick={handleAddNewTopic}
                            disabled={!newTopicName.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Article Selection */}
              {audioStep === "article" && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
                  <div className="space-y-4">
                    <p className={`${typographyClasses.sh1} text-gray-600 mb-4`}>
                      Link this to an article (optional)
                    </p>

                    {/* Search Articles */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={articleSearchQuery}
                        onChange={(e) => setArticleSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                      />
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            selectedArticle === article.id
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <p className={`${typographyClasses.sh1} font-semibold ${
                            selectedArticle === article.id ? "text-purple-700" : "text-gray-900"
                          }`}>
                            {article.title}
                          </p>
                          <p className={`${typographyClasses.caption2} text-gray-500 mt-1`}>
                            {article.source}
                          </p>
                        </button>
                      ))
                      ) : (
                        <p className={`${typographyClasses.sh1} text-gray-500 text-center py-4`}>
                          No articles found
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-sm"
                    >
                      Skip linking article
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
                <button
                  onClick={() => {
                    setShowAudioModal(false);
                    setAudioStep("ready");
                    setSelectedTopic(null);
                    setSelectedArticle(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedAudio}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  {audioStep === "article" ? "Save Audio" : "Next"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Action Menu Modal - Only show when FAB menu is open */}
      {showFabMenu && (
      <div className="absolute bottom-24 right-6 z-30 bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
        <button
          onClick={() => {
            setShowAddModal(true);
            setShowFabMenu(false);
          }}
          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 whitespace-nowrap group"
        >
          <PenTool size={22} className="text-amber-600 group-hover:scale-110 transition-transform" />
          <span className={`${typographyClasses.sh1} font-semibold text-gray-900`}>Add Note</span>
        </button>
        <button
          onClick={() => {
            setShowAudioModal(true);
            setShowFabMenu(false);
          }}
          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 whitespace-nowrap group"
        >
          <Mic size={22} className="text-purple-600 group-hover:scale-110 transition-transform" />
          <span className={`${typographyClasses.sh1} font-semibold text-gray-900`}>Record Audio</span>
        </button>
      </div>
      )}
    </div>
  );
}
