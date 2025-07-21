import React from "react";
import type { Translation } from "../../domain/types/Translation";

interface SidepaneProps {
  translations?: Translation[];
}

export default function Sidepane({ translations }: SidepaneProps) {
  return (
    <aside className="w-100 min-w-100 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="h-full flex flex-col">
          <header className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                History
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                0 translations
              </p>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No translations yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Start translating to see your history!
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
