/**
 * Notebooks Component
 * Lists all user-created notebooks in vertical stack of horizontal tiles
 * Includes floating action button to create new notebooks
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";
import { NotebookDrilldown } from "./NotebookDrilldown";

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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState("");

  const handleCreateNotebook = () => {
    if (newNotebookTitle.trim()) {
      const gradients = [
        "from-blue-400 to-purple-500",
        "from-pink-400 to-red-500",
        "from-yellow-400 to-orange-500",
        "from-green-400 to-teal-500",
      ];
      const newNotebook: Notebook = {
        id: Date.now().toString(),
        title: newNotebookTitle,
        description: "",
        itemCount: 0,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        bgGradient: gradients[notebooks.length % gradients.length],
      };
      setNotebooks([newNotebook, ...notebooks]);
      setNewNotebookTitle("");
      setShowCreateModal(false);
    }
  };

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
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full flex flex-col">
        <div className="w-full flex flex-col pb-8 px-6 pt-6">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className={`${typographyClasses.h1} text-gray-900 mb-2`}>
            My Notebooks
          </h1>
          <p className={`${typographyClasses.sh1} text-gray-500`}>
            {notebooks.length} notebook{notebooks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Notebooks List - Vertical Stack */}
        <div className="space-y-4">
          {notebooks.map((notebook) => (
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

        {/* Empty State (shown when no notebooks) */}
        {notebooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">📓</div>
            <p className={`${typographyClasses.h3SemiBold} text-gray-600 mb-2`}>
              No notebooks yet
            </p>
            <p className={`${typographyClasses.sh1} text-gray-500 mb-6`}>
              Create your first notebook to start organizing your notes
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Create Notebook
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Floating Action Button - Create Notebook */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white font-semibold text-2xl z-20 group"
        aria-label="Create new notebook"
      >
        <span className="group-hover:animate-pulse">+</span>
      </button>

      {/* Create Notebook Modal */}
      {showCreateModal && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setShowCreateModal(false)}
          />

          {/* Modal Panel */}
          <div className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h3 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
                Create Notebook
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
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
              <div className="space-y-4">
                <div>
                  <label className={`${typographyClasses.h4SemiBold} text-gray-700 block mb-3`}>
                    Notebook Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ozempic Research"
                    value={newNotebookTitle}
                    onChange={(e) => setNewNotebookTitle(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCreateNotebook();
                      }
                    }}
                    autoFocus
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotebook}
                disabled={!newNotebookTitle.trim()}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
