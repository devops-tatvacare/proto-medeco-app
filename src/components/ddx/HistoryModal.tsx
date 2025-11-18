"use client";

interface HistoryEntry {
  id: string;
  timestamp: string;
  summary: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  if (!isOpen) return null;

  // Mock history data
  const history: HistoryEntry[] = [
    {
      id: '1',
      timestamp: 'Today, 1:30 pm',
      summary: '18 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    },
    {
      id: '2',
      timestamp: 'Today, 11:10 pm',
      summary: '26 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    },
    {
      id: '3',
      timestamp: '31st Dec, 5:00 pm',
      summary: '26 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    },
    {
      id: '4',
      timestamp: '31st Dec, 4:00 pm',
      summary: '26 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    },
    {
      id: '5',
      timestamp: '30th Dec, 3:00 pm',
      summary: '26 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    },
    {
      id: '6',
      timestamp: '30th Dec, 2:00 pm',
      summary: '26 year old male reports intermittent chest pain (moderate) over two weeks, worsening with...'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#171725]">DDx History</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          {history.map((entry, index) => (
            <div key={entry.id}>
              <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-[#171725] text-sm mb-1">
                  {entry.timestamp}
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  {entry.summary}
                </p>
              </button>
              {index < history.length - 1 && (
                <div className="mx-6 border-b border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
