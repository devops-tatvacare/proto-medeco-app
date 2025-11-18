"use client";

import { MonitoringTask } from '@/context/CarePathwayContext';

interface MonitoringStageProps {
  monitoringTasks: MonitoringTask[];
  onUpdateTask: (id: string, completed: boolean) => void;
  onContinue: () => void;
}

export function MonitoringStage({
  monitoringTasks,
  onUpdateTask,
  onContinue
}: MonitoringStageProps) {
  const completedCount = monitoringTasks.filter(t => t.completed).length;

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#171725] mb-2">Monitoring & Follow-up Plan</h2>
        <p className="text-sm text-[#454551] mb-3">
          Schedule and track ongoing monitoring activities to ensure treatment effectiveness and patient safety.
        </p>
        <div className="text-sm font-medium text-[#4b4ad5]">
          {completedCount} of {monitoringTasks.length} scheduled
        </div>
      </div>

      {/* Monitoring Timeline */}
      <div className="space-y-3">
        {monitoringTasks.map((task, index) => (
          <div
            key={task.id}
            className={`
              rounded-lg border p-4 transition-all
              ${task.completed ? 'border-green-500 bg-green-50/30' : 'border-gray-200 bg-white'}
            `}
          >
            <div className="flex items-start gap-4">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onUpdateTask(task.id, !task.completed)}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${task.completed ? 'bg-green-500 border-green-500' : 'border-[#4b4ad5] bg-white hover:bg-[#4b4ad5]/10'}
                  `}
                >
                  {task.completed ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#4b4ad5]" />
                  )}
                </button>
                {index < monitoringTasks.length - 1 && (
                  <div className={`w-0.5 h-8 mt-1 ${task.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className={`text-base font-semibold mb-1 ${task.completed ? 'text-green-700' : 'text-[#171725]'}`}>
                  {task.task}
                </h4>
                <div className="flex items-center gap-3 text-sm text-[#454551]">
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>Every {task.frequency}</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                      <span>Due: {task.dueDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <p className="text-sm text-blue-900">
            Monitoring tasks should be scheduled in the patient's calendar. Automated reminders can be set up in the EHR system.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full py-3.5 px-6 rounded-lg text-white font-medium text-base shadow-lg transition-all hover:shadow-xl"
        style={{
          background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
        }}
      >
        Continue to Response Evaluation
      </button>
    </div>
  );
}
