/**
 * Notebooks Component
 * Lists all user-created notebooks in vertical stack of horizontal tiles
 * Includes floating action button to create new notebooks
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";
import { NotebookDrilldown } from "./NotebookDrilldown";
import { NotebookCreation } from "./NotebookCreation";

interface Notebook {
  id: string;
  title: string;
  description?: string;
  itemCount: number;
  createdAt: string;
  bgGradient: string;
}

interface NotebooksProps {
  onBackClick?: () => void;
}

export function Notebooks({ }: NotebooksProps) {
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
  const [showCreation, setShowCreation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [notebooks, setNotebooks] = useState<Notebook[]>([
    {
      id: "1",
      title: "Ozempic Research",
      description: "Notes and findings about Ozempic and GLP-1 mechanisms",
      itemCount: 12,
      createdAt: "Nov 8, 2024",
      bgGradient: "from-blue-400 to-purple-500",
    },
    {
      id: "2",
      title: "Clinical Trials",
      description: "Clinical trial data and results summary",
      itemCount: 8,
      createdAt: "Nov 5, 2024",
      bgGradient: "from-pink-400 to-red-500",
    },
    {
      id: "3",
      title: "Side Effects & Safety",
      description: "Comprehensive side effects documentation",
      itemCount: 15,
      createdAt: "Nov 1, 2024",
      bgGradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "4",
      title: "Drug Comparisons",
      description: "Ozempic vs Wegovy vs Mounjaro comparison",
      itemCount: 10,
      createdAt: "Oct 28, 2024",
      bgGradient: "from-green-400 to-teal-500",
    },
  ]);

  // Filter notebooks based on search and selected filter
  const filteredNotebooks = notebooks.filter((notebook) => {
    const matchesSearch = notebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notebook.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === null ||
      selectedFilter === "all" ||
      (selectedFilter === "recent" && new Date(notebook.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      (selectedFilter === "popular" && notebook.itemCount > 10);

    return matchesSearch && matchesFilter;
  });

  // If creation flow is open, show it
  if (showCreation) {
    return (
      <NotebookCreation
        onBackClick={() => setShowCreation(false)}
      />
    );
  }

  // If a notebook is selected, show the drilldown view
  if (selectedNotebook) {
    return (
      <NotebookDrilldown
        title={selectedNotebook.title}
        onBackClick={() => setSelectedNotebook(null)}
      />
    );
  }

  return (
    <div className="w-full bg-neutral-50 flex flex-col h-full relative">
      {/* Search and Filter Section */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notebooks..."
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
          <button
            onClick={() => setSelectedFilter("recent")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              selectedFilter === "recent"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSelectedFilter("popular")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              selectedFilter === "popular"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide w-full flex flex-col">
        <div className="w-full flex flex-col pb-8 px-6 pt-6">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className={`${typographyClasses.h1} text-gray-900 mb-2`}>
            My Notebooks
          </h1>
          <p className={`${typographyClasses.sh1} text-gray-500`}>
            {filteredNotebooks.length} notebook{filteredNotebooks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Notebooks List - Vertical Stack */}
        {filteredNotebooks.length > 0 ? (
        <div className="space-y-4">
          {filteredNotebooks.map((notebook) => (
            <button
              key={notebook.id}
              onClick={() => setSelectedNotebook(notebook)}
              className="w-full text-left transition-all hover:shadow-md active:scale-95"
            >
              <div className={`bg-gradient-to-r ${notebook.bgGradient} rounded-2xl p-5 shadow-md text-white`}>
                {/* Notebook Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg leading-tight mb-1">
                      {notebook.title}
                    </h2>
                    {notebook.description && (
                      <p className="text-sm opacity-90 line-clamp-2">
                        {notebook.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>

                {/* Notebook Meta */}
                <div className="flex items-center justify-between text-xs opacity-85">
                  <span>{notebook.itemCount} item{notebook.itemCount !== 1 ? "s" : ""}</span>
                  <span>{notebook.createdAt}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className={`${typographyClasses.h3SemiBold} text-gray-600 mb-2`}>
              {notebooks.length === 0 ? "No notebooks yet" : "No matching notebooks"}
            </p>
            <p className={`${typographyClasses.sh1} text-gray-500 mb-6`}>
              {notebooks.length === 0
                ? "Create your first notebook to start organizing your notes"
                : "Try adjusting your search or filters"}
            </p>
            {notebooks.length === 0 && (
              <button
                onClick={() => setShowCreation(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Create Notebook
              </button>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Floating Action Button - Create Notebook */}
      <button
        onClick={() => setShowCreation(true)}
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-2xl z-20 group"
        aria-label="Create new notebook"
      >
        <span className="group-hover:animate-pulse">+</span>
      </button>
    </div>
  );
}
