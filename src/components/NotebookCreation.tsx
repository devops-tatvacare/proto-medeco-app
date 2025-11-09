/**
 * NotebookCreation Component
 * Multi-step notebook creation flow with source selection
 * Step 1: Notebook name
 * Step 2: Add sources with search (notes, audio, articles, PDFs)
 * Step 3: Create and view notebook
 */

"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Music, BookOpen, File, Sparkles, ChevronLeft, X, Check, Search, Upload, Cloud } from "lucide-react";
import { typographyClasses } from "@/lib/design-tokens";
import { NotebookDetail } from "./NotebookDetail";

interface Source {
  id: string;
  type: "note" | "audio" | "article" | "pdf" | "web-search" | "upload";
  title: string;
  description?: string;
  icon: string;
  source?: string; // Where it came from
  category?: "app" | "web" | "upload"; // Visual categorization
}

interface Notebook {
  id: string;
  name: string;
  sources: Source[];
  createdAt: string;
}

interface NotebookCreationProps {
  onBackClick?: () => void;
}

// Source Card Component
function SourceCard({
  source,
  isSelected,
  onSelect,
  onRemove,
  getSourceIcon,
  getCategoryLabel,
  typographyClasses,
  idx,
}: {
  source: Source;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  getSourceIcon: (type: string) => React.ReactNode;
  getCategoryLabel: (category?: string) => string;
  typographyClasses: Record<string, string>;
  idx: number;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: idx * 0.03 }}
      onClick={isSelected ? onRemove : onSelect}
      className={`w-full p-4 text-left rounded-xl border-2 transition-all group ${
        isSelected
          ? "border-purple-400 bg-purple-50/50"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          {getSourceIcon(source.icon)}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${typographyClasses.sh1} text-gray-900 font-semibold truncate group-hover:text-purple-700 transition-colors`}>
            {source.title}
          </p>
          {source.description && (
            <p className={`${typographyClasses.caption2} text-gray-600 mt-1`}>
              {source.description}
            </p>
          )}
          {source.source && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                {source.source}
              </span>
            </div>
          )}
        </div>
        <motion.div
          animate={{ scale: isSelected ? 1 : 0.8, opacity: isSelected ? 1 : 0 }}
          className="flex-shrink-0"
        >
          {isSelected && (
            <Check size={22} className="text-purple-600" strokeWidth={3} />
          )}
        </motion.div>
      </div>
    </motion.button>
  );
}

export function NotebookCreation({ onBackClick }: NotebookCreationProps) {
  const [step, setStep] = useState<"name" | "sources" | "complete">("name");
  const [notebookName, setNotebookName] = useState("");
  const [selectedSources, setSelectedSources] = useState<Source[]>([]);
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");
  const [webSearchQuery, setWebSearchQuery] = useState("");
  const [webSearchResults, setWebSearchResults] = useState<Source[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Source[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [creatingPhase, setCreatingPhase] = useState<"button" | "animation" | "complete">("button");
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // App sources - clearly marked as "In App"
  const [appSources] = useState<Source[]>([
    { id: "1", type: "note", title: "Ozempic: Mechanism of Action", description: "Understanding GLP-1 pathways", icon: "note", category: "app", source: "Your Notes" },
    { id: "2", type: "note", title: "Clinical Trial Results", description: "15% weight reduction study", icon: "note", category: "app", source: "Your Notes" },
    { id: "3", type: "note", title: "Dosage Guidelines", description: "Proper administration protocols", icon: "note", category: "app", source: "Your Notes" },
    { id: "4", type: "audio", title: "Side Effects Discussion", description: "Expert perspective on adverse effects", icon: "audio", category: "app", source: "Your Clips" },
    { id: "5", type: "audio", title: "Patient Testimonials", description: "Real-world experiences", icon: "audio", category: "app", source: "Your Clips" },
    { id: "6", type: "article", title: "GLP-1 Receptor Agonists", description: "Medical journal article", icon: "article", category: "app", source: "App Library" },
    { id: "7", type: "article", title: "Weight Loss Management", description: "Clinical guidelines", icon: "article", category: "app", source: "App Library" },
    { id: "8", type: "article", title: "Diabetes Management", description: "Endocrinology perspective", icon: "article", category: "app", source: "App Library" },
  ]);

  // Filter app sources based on search
  const filteredAppSources = appSources.filter((source) =>
    source.title.toLowerCase().includes(sourceSearchQuery.toLowerCase()) ||
    source.description?.toLowerCase().includes(sourceSearchQuery.toLowerCase())
  );

  // Handle web search
  const handleWebSearch = async () => {
    if (!webSearchQuery.trim()) return;

    setIsSearching(true);
    // Simulate web search delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock web search results
    const mockResults: Source[] = [
      { id: `web-1`, type: "web-search", title: "Understanding GLP-1 Agonists in Diabetes Management", description: "Comprehensive review from medical research database", icon: "web-search", category: "web", source: "Medical Research" },
      { id: `web-2`, type: "web-search", title: "Ozempic vs Wegovy: Clinical Comparison Study 2024", description: "Latest clinical data and safety profiles", icon: "web-search", category: "web", source: "Clinical Journal" },
      { id: `web-3`, type: "web-search", title: "Weight Loss Management Strategies with GLP-1 Drugs", description: "Patient outcomes and lifestyle integration", icon: "web-search", category: "web", source: "Health Articles" },
    ];

    setWebSearchResults(mockResults);
    setIsSearching(false);
  };

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newUploadedFiles: Source[] = Array.from(files).map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      type: "upload",
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      description: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      icon: "upload",
      category: "upload",
      source: "Your Files",
    }));

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Helper function to render icons based on type
  const getSourceIcon = (iconType: string) => {
    switch (iconType) {
      case "note":
        return <FileText size={20} className="text-blue-600" />;
      case "audio":
        return <Music size={20} className="text-green-600" />;
      case "article":
        return <BookOpen size={20} className="text-purple-600" />;
      case "pdf":
        return <File size={20} className="text-red-600" />;
      case "web-search":
        return <Cloud size={20} className="text-cyan-600" />;
      case "upload":
        return <Upload size={20} className="text-orange-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  // Helper to get category badge styling
  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case "app":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "web":
        return "bg-cyan-50 text-cyan-700 border border-cyan-200";
      case "upload":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case "app":
        return "Your Content";
      case "web":
        return "Web Search";
      case "upload":
        return "Your Files";
      default:
        return "Source";
    }
  };

  const handleCreateNotebook = () => {
    if (notebookName.trim()) {
      setStep("sources");
    }
  };

  const handleAddSource = (source: Source) => {
    if (!selectedSources.find(s => s.id === source.id)) {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const handleRemoveSource = (sourceId: string) => {
    setSelectedSources(selectedSources.filter(s => s.id !== sourceId));
  };

  const handleFinishCreation = async () => {
    setIsCreating(true);
    setCreatingPhase("animation");

    // Show animation for 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000));

    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name: notebookName,
      sources: selectedSources,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setCreatingPhase("complete");
    setNotebook(newNotebook);
    setStep("complete");
    setIsCreating(false);
  };

  // If notebook is created, show detail view
  if (notebook && step === "complete") {
    return (
      <NotebookDetail
        notebook={notebook}
        onBackClick={() => {
          setStep("name");
          setNotebookName("");
          setSelectedSources([]);
          setNotebook(null);
          onBackClick?.();
        }}
      />
    );
  }

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => {
              if (step === "sources") {
                setStep("name");
              } else {
                onBackClick?.();
              }
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>

          <h1 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
            {step === "name" && "Create Notebook"}
            {step === "sources" && "Add Sources"}
          </h1>

          <div className="w-8" />
        </div>

        {/* Step Indicator */}
        {step !== "complete" && (
          <div className="px-6 py-3 flex gap-1">
            <div className={`h-1 flex-1 rounded-full transition-all ${step === "name" || step === "sources" ? "bg-purple-600" : "bg-gray-200"}`} />
            <div className={`h-1 flex-1 rounded-full transition-all ${step === "sources" ? "bg-purple-600" : "bg-gray-200"}`} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Creation Animation Screen */}
        {creatingPhase === "animation" && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex flex-col items-center gap-8"
              >
                {/* Blinking Sparkles Icon */}
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <Sparkles size={80} className="text-purple-600" strokeWidth={1.5} />
                </motion.div>

                {/* Creating Text */}
                <div className="text-center space-y-2">
                  <p className={`${typographyClasses.h3SemiBold} text-gray-900`}>
                    Creating Your Notebook...
                  </p>
                  <p className={`${typographyClasses.sh1} text-gray-500`}>
                    Adding {selectedSources.length} source{selectedSources.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 1: Notebook Name */}
        {step === "name" && (
          <div className="px-6 py-8 flex flex-col">
            <p className={`${typographyClasses.sh1} text-gray-600 mb-6`}>
              Give your notebook a meaningful name to organize your research
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g., Ozempic Clinical Research"
                value={notebookName}
                onChange={(e) => setNotebookName(e.target.value)}
                autoFocus
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-base"
              />
            </div>

            {/* Examples */}
            <div className="mt-8 space-y-3">
              <p className={`${typographyClasses.caption2} text-gray-500 uppercase tracking-wider`}>
                Suggested names
              </p>
              {["Ozempic Clinical Research", "Weight Loss Management", "GLP-1 Drug Comparison"].map((example) => (
                <button
                  key={example}
                  onClick={() => setNotebookName(example)}
                  className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <p className={`${typographyClasses.sh1} text-gray-700 group-hover:text-purple-700 font-medium`}>
                    {example}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Add Sources */}
        {step === "sources" && (
          <div className="px-6 py-6 flex flex-col h-full">
            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-hide -mx-6 px-6 flex flex-col">
              <div className="space-y-6">
                {/* Selected Sources - Sticky Banner */}
                {selectedSources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky top-0 z-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <Check size={16} />
                        </motion.div>
                        <div>
                          <p className={`${typographyClasses.h4SemiBold} text-white`}>
                            {selectedSources.length} source{selectedSources.length !== 1 ? "s" : ""} selected
                          </p>
                          <p className={`${typographyClasses.caption2} text-white/80`}>
                            Ready to add to your notebook
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSources([])}
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label="Clear all"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions - Upload & Web Search */}
                <div className="grid grid-cols-2 gap-3">
                  {/* File Upload */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-orange-300 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors group"
                  >
                    <div className="text-center">
                      <Upload size={24} className="text-orange-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <p className={`${typographyClasses.caption2} text-orange-700 font-semibold`}>
                        Upload Files
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      aria-label="Upload documents"
                    />
                  </motion.label>

                  {/* Web Search */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsWebSearchActive(!isWebSearchActive)}
                    className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl transition-all group ${
                      isWebSearchActive
                        ? "border-cyan-400 bg-cyan-100"
                        : "border-cyan-300 bg-cyan-50 hover:bg-cyan-100"
                    }`}
                  >
                    <div className="text-center">
                      <Cloud
                        size={24}
                        className={`mx-auto mb-1 group-hover:scale-110 transition-transform ${
                          isWebSearchActive ? "text-cyan-700" : "text-cyan-600"
                        }`}
                      />
                      <p className={`${typographyClasses.caption2} font-semibold ${
                        isWebSearchActive ? "text-cyan-800" : "text-cyan-700"
                      }`}>
                        Web Search
                      </p>
                    </div>
                  </motion.button>
                </div>

                {/* Web Search Input - Animated Appearance */}
                <AnimatePresence>
                  {isWebSearchActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search the web for sources..."
                          value={webSearchQuery}
                          onChange={(e) => setWebSearchQuery(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleWebSearch()}
                          autoFocus
                          className="flex-1 pl-10 pr-4 py-3 bg-white border border-cyan-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleWebSearch}
                          disabled={isSearching || !webSearchQuery.trim()}
                          className="px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center"
                        >
                          {isSearching ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                              <Search size={18} />
                            </motion.div>
                          ) : (
                            <Search size={18} />
                          )}
                        </motion.button>
                      </div>
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Your Content Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <p className={`${typographyClasses.h4SemiBold} text-gray-900`}>
                      Your Content
                    </p>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {appSources.length}
                    </span>
                  </div>

                  {/* App Sources Search */}
                  {filteredAppSources.length > 0 && (
                    <div className="relative mb-2">
                      <input
                        type="text"
                        placeholder="Search your content..."
                        value={sourceSearchQuery}
                        onChange={(e) => setSourceSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  )}

                  {filteredAppSources.length > 0 ? (
                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {filteredAppSources.map((source, idx) => {
                          const isSelected = selectedSources.some(s => s.id === source.id);
                          return (
                            <SourceCard
                              key={source.id}
                              source={source}
                              isSelected={isSelected}
                              onSelect={() => handleAddSource(source)}
                              onRemove={() => handleRemoveSource(source.id)}
                              getSourceIcon={getSourceIcon}
                              getCategoryLabel={getCategoryLabel}
                              typographyClasses={typographyClasses}
                              idx={idx}
                            />
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  ) : sourceSearchQuery ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6 text-gray-500"
                    >
                      <p className={`${typographyClasses.sh1}`}>No matches found</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6 text-gray-500"
                    >
                      <p className={`${typographyClasses.sh1}`}>No content available</p>
                    </motion.div>
                  )}
                </div>

                {/* Web Search Results */}
                {webSearchResults.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <p className={`${typographyClasses.h4SemiBold} text-gray-900`}>
                        Web Search Results
                      </p>
                      <span className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {webSearchResults.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {webSearchResults.map((source, idx) => {
                          const isSelected = selectedSources.some(s => s.id === source.id);
                          return (
                            <SourceCard
                              key={source.id}
                              source={source}
                              isSelected={isSelected}
                              onSelect={() => handleAddSource(source)}
                              onRemove={() => handleRemoveSource(source.id)}
                              getSourceIcon={getSourceIcon}
                              getCategoryLabel={getCategoryLabel}
                              typographyClasses={typographyClasses}
                              idx={idx}
                            />
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <p className={`${typographyClasses.h4SemiBold} text-gray-900`}>
                        Your Files
                      </p>
                      <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {uploadedFiles.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {uploadedFiles.map((source, idx) => {
                          const isSelected = selectedSources.some(s => s.id === source.id);
                          return (
                            <SourceCard
                              key={source.id}
                              source={source}
                              isSelected={isSelected}
                              onSelect={() => handleAddSource(source)}
                              onRemove={() => handleRemoveSource(source.id)}
                              getSourceIcon={getSourceIcon}
                              getCategoryLabel={getCategoryLabel}
                              typographyClasses={typographyClasses}
                              idx={idx}
                            />
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
        <button
          onClick={() => {
            if (step === "sources") {
              setStep("name");
            } else {
              onBackClick?.();
            }
          }}
          disabled={isCreating}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {step === "sources" ? "Back" : "Cancel"}
        </button>
        <motion.button
          onClick={() => {
            if (step === "name") {
              handleCreateNotebook();
            } else if (step === "sources") {
              handleFinishCreation();
            }
          }}
          disabled={(step === "name" && !notebookName.trim()) || isCreating}
          whileHover={!isCreating && (step === "name" ? notebookName.trim() : selectedSources.length > 0) ? { scale: 1.02 } : {}}
          whileTap={!isCreating && (step === "name" ? notebookName.trim() : selectedSources.length > 0) ? { scale: 0.98 } : {}}
          className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors relative overflow-hidden"
        >
          {isCreating ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} />
              </motion.div>
              Creating...
            </span>
          ) : (
            step === "name" ? "Next" : "Create Notebook"
          )}
        </motion.button>
      </div>
    </div>
  );
}
