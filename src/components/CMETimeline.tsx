/**
 * CME Timeline Component
 * Shows a timeline view with dates as sections, each containing session summaries
 */

"use client";

import React, { useState } from "react";
import { typographyClasses } from "@/lib/design-tokens";
import { CMESessions } from "./CMESessions";

interface CMESession {
  id: string;
  title: string;
  category: string;
  topic: string;
}

interface DateSection {
  date: string;
  sessions: CMESession[];
}

const mockDateSections: DateSection[] = [
  {
    date: "November 11, 2024",
    sessions: [
      { id: "1", title: "Ozempic is a game-changer. Here's how it works.", category: "ENDOCRINOLOGY", topic: "semaglutide" },
      { id: "2", title: "Understanding GLP-1 receptor agonists", category: "ENDOCRINOLOGY", topic: "semaglutide" },
      { id: "3", title: "Breast cancer screening guidelines 2024", category: "GYNAECOLOGY", topic: "gynae" },
      { id: "4", title: "Advances in cardiac imaging", category: "CARDIOLOGY", topic: "cardiology" },
    ],
  },
  {
    date: "November 10, 2024",
    sessions: [
      { id: "5", title: "Diabetes management best practices", category: "ENDOCRINOLOGY", topic: "diabetes" },
      { id: "6", title: "Cervical cancer prevention", category: "GYNAECOLOGY", topic: "gynae" },
      { id: "7", title: "Heart failure treatment updates", category: "CARDIOLOGY", topic: "cardiology" },
    ],
  },
  {
    date: "November 9, 2024",
    sessions: [
      { id: "8", title: "Thyroid disorder diagnosis", category: "ENDOCRINOLOGY", topic: "endocrinology" },
      { id: "9", title: "Prenatal care essentials", category: "GYNAECOLOGY", topic: "gynae" },
      { id: "10", title: "Hypertension management", category: "CARDIOLOGY", topic: "cardiology" },
      { id: "11", title: "Arrhythmia detection and treatment", category: "CARDIOLOGY", topic: "cardiology" },
    ],
  },
  {
    date: "November 8, 2024",
    sessions: [
      { id: "12", title: "Insulin therapy updates", category: "ENDOCRINOLOGY", topic: "diabetes" },
      { id: "13", title: "Menopause hormone therapy", category: "GYNAECOLOGY", topic: "gynae" },
    ],
  },
];

export function CMETimeline() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleBack = () => {
    setSelectedDate(null);
  };

  const getSessionSummary = (sessions: CMESession[]) => {
    const uniqueTopics = [...new Set(sessions.map(s => s.topic))];
    const topicsText = uniqueTopics.join(", ");
    return `${sessions.length} sessions were conducted on this date regarding ${topicsText}`;
  };

  // If a date is selected, show sessions for that date
  if (selectedDate) {
    return <CMESessions date={selectedDate} onBack={handleBack} />;
  }

  // Otherwise show timeline
  return (
    <div className="w-full flex flex-col gap-4 pb-6 px-4 pt-4">
      {mockDateSections.map((section, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          {/* Date Header */}
          <h2 className={`${typographyClasses.h3Medium} text-gray-900`}>
            {section.date}
          </h2>

          {/* Summary Card - Clickable */}
          <button
            onClick={() => handleDateClick(section.date)}
            className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer text-left border border-gray-100 active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1.5">
              {/* Session Count Badge */}
              <div className="w-fit">
                <div className="bg-purple-100 rounded-full px-2 py-0.5 inline-block">
                  <span className={`${typographyClasses.caption1Bold} text-purple-900`}>
                    {section.sessions.length} SESSIONS
                  </span>
                </div>
              </div>

              {/* Summary Text */}
              <p className={`${typographyClasses.body1} text-gray-700`}>
                {getSessionSummary(section.sessions)}
              </p>

              {/* Arrow Indicator and Logo Row */}
              <div className="flex items-center justify-between gap-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className={`${typographyClasses.sh2} text-purple-600 font-semibold`}>
                    View Sessions
                  </span>
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Zydus Logo */}
                <div className="flex-shrink-0 w-14 h-8 bg-gray-50 rounded-lg p-1 flex items-center justify-center border border-gray-200">
                  <img
                    src="/assets/zydus-logo.png"
                    alt="Zydus"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
