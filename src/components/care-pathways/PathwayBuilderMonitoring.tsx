"use client";

import { usePathwayBuilder } from '@/context/PathwayBuilderContext';

export function PathwayBuilderMonitoring() {
  const { monitoring, updateMonitoringTask, advanceStep } = usePathwayBuilder();
  const anySelected = monitoring.some(m => m.selected);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {monitoring.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 rounded-lg"
          >
            <input
              type="checkbox"
              checked={task.selected}
              onChange={(e) => updateMonitoringTask(task.id, e.target.checked)}
              className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded focus:ring-[#4b4ad5] flex-shrink-0"
            />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-[#4b4ad5] flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171725] leading-tight">{task.task}</p>
                <p className="text-[10px] text-[#6b7280] mt-0.5">
                  Frequency: {task.frequency}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {anySelected && (
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={advanceStep}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Continue to Review
          </button>
        </div>
      )}
    </div>
  );
}
