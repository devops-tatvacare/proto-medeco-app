"use client";

import { useState } from 'react';

interface PathwayBuilderProps {
  onBack: () => void;
  onSave: () => void;
}

type NodeType = 'assessment' | 'decision' | 'intervention' | 'monitoring' | 'follow-up';

interface PathwayNode {
  id: string;
  type: NodeType;
  title: string;
  configured: boolean;
}

const NODE_LIBRARY: { type: NodeType; label: string; icon: string }[] = [
  { type: 'assessment', label: 'Assessment', icon: '📋' },
  { type: 'decision', label: 'Decision Point', icon: '⚖️' },
  { type: 'intervention', label: 'Intervention', icon: '💊' },
  { type: 'monitoring', label: 'Monitoring', icon: '📊' },
  { type: 'follow-up', label: 'Follow-up', icon: '📅' },
];

export function PathwayBuilder({ onBack, onSave }: PathwayBuilderProps) {
  const [pathwayName, setPathwayName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [nodes, setNodes] = useState<PathwayNode[]>([]);
  const [showNodeLibrary, setShowNodeLibrary] = useState(false);
  const [selectedNode, setSelectedNode] = useState<PathwayNode | null>(null);

  const addNode = (type: NodeType) => {
    const newNode: PathwayNode = {
      id: `node-${Date.now()}`,
      type,
      title: NODE_LIBRARY.find(n => n.type === type)?.label || '',
      configured: false,
    };
    setNodes([...nodes, newNode]);
    setShowNodeLibrary(false);
    setSelectedNode(newNode);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const getNodeIcon = (type: NodeType) => {
    return NODE_LIBRARY.find(n => n.type === type)?.icon || '📄';
  };

  const handleSave = () => {
    if (!pathwayName.trim()) {
      alert('Please enter a pathway name');
      return;
    }
    if (nodes.length === 0) {
      alert('Please add at least one node to the pathway');
      return;
    }
    onSave();
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Create Care Pathway</h1>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#f5f5f7]">
        {/* Pathway Info Form */}
        <div className="px-4 py-4 space-y-3 bg-white border-b border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Pathway Name *
            </label>
            <input
              type="text"
              value={pathwayName}
              onChange={(e) => setPathwayName(e.target.value)}
              placeholder="e.g., Heart Failure Management"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Specialty
            </label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="e.g., Cardiology"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] focus:border-transparent"
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Pathway Flow</h3>
            <button
              onClick={() => setShowNodeLibrary(!showNodeLibrary)}
              className="px-3 py-1.5 bg-[#4b4ad5] text-white rounded-lg text-xs font-medium hover:shadow-md transition-all"
            >
              {showNodeLibrary ? 'Close Library' : '+ Add Node'}
            </button>
          </div>

          {/* Node Library */}
          {showNodeLibrary && (
            <div className="mb-4 bg-white rounded-xl p-3 shadow-sm border border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">Select a node type:</p>
              <div className="grid grid-cols-2 gap-2">
                {NODE_LIBRARY.map((nodeType) => (
                  <button
                    key={nodeType.type}
                    onClick={() => addNode(nodeType.type)}
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-[#4b4ad5] hover:bg-[#4b4ad5]/5 transition-all active:scale-95"
                  >
                    <div className="text-2xl mb-1">{nodeType.icon}</div>
                    <div className="text-xs font-medium text-gray-900">{nodeType.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pathway Nodes */}
          {nodes.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-3">🔨</div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Build Your Pathway</h4>
              <p className="text-xs text-gray-600">
                Click "+ Add Node" to start building your care pathway
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {nodes.map((node, index) => (
                <div key={node.id} className="relative">
                  {/* Node Card */}
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                      selectedNode?.id === node.id
                        ? 'border-[#4b4ad5] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 text-2xl">{getNodeIcon(node.type)}</div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-semibold text-gray-900">{node.title}</div>
                        <div className="text-xs text-gray-500 capitalize">{node.type}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNode(node.id);
                        }}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  </button>

                  {/* Connection Arrow */}
                  {index < nodes.length - 1 && (
                    <div className="flex justify-center py-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                        <path d="M12 5v14m0 0l-7-7m7 7l7-7"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Configuration Panel (shown when node is selected) */}
        {selectedNode && (
          <div className="px-4 py-4 bg-white border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Configure: {selectedNode.title}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Node Name
                </label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => {
                    setNodes(nodes.map(n =>
                      n.id === selectedNode.id ? { ...n, title: e.target.value } : n
                    ));
                    setSelectedNode({ ...selectedNode, title: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4ad5]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Add details about this step..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4ad5] resize-none"
                />
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
