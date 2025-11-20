"use client";

import { MonitoringTask } from '@/context/DDxContext';

interface PathwayMonitoringProps {
  monitoringTasks: MonitoringTask[];
  onUpdateTask: (taskId: string, completed: boolean) => void;
  onContinue: () => void;
}

export function PathwayMonitoring({ monitoringTasks, onUpdateTask, onContinue }: PathwayMonitoringProps) {
  const anySelected = monitoringTasks.some(t => t.completed);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-3 py-2 space-y-2.5">
        {/* Timeline View */}
        <div className="space-y-1">
          {monitoringTasks.map((task, index) => (
            <div key={task.id} className="flex gap-2.5 p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => onUpdateTask(task.id, e.target.checked)}
                    className="w-4 h-4 text-[#4b4ad5] border-gray-300 rounded focus:ring-[#4b4ad5]"
                  />
                </label>
                {index < monitoringTasks.length - 1 && (
                  <div className="w-0.5 h-full min-h-[32px] bg-gray-200 mt-1.5" />
                )}
              </div>

              {/* Task content */}
              <div className="flex-1 pb-1">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-xs font-medium text-[#171725] flex-1 leading-snug">
                    {task.task}
                  </p>
                  <span className="text-[10px] bg-[#4b4ad5]/10 text-[#4b4ad5] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    {task.frequency}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#6b7280]">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>Reminder: Every {task.frequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="bg-[#4b4ad5]/5 rounded-lg p-2.5">
          <div className="flex gap-2">
            <svg className="w-4 h-4 text-[#4b4ad5] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p className="text-[10px] text-[#4b4ad5] leading-snug">
              Automated reminders will be sent for each monitoring task based on the schedule
            </p>
          </div>
        </div>
      </div>

      {anySelected && (
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={onContinue}
            className="w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
            }}
          >
            Continue to Final Review
          </button>
        </div>
      )}
    </div>
  );
}
