import React, { useEffect } from "react";
import type { Translation } from "../../domain/types/Translation";
import { Engine } from "domain/types/Engine";

interface SidepaneProps {
  translations?: Translation[];
  onDelete?: (engine: Engine, originalText: string) => void;
  onDeleteAll?: () => void;
}

export default function Sidepane({
  translations,
  onDelete,
  onDeleteAll,
}: SidepaneProps) {
  const translationCount = translations?.length ?? 0;

  return (
    <aside className="w-100 min-w-100 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="h-full flex flex-col">
          <header className="flex items-center justify-between pb-4 mb-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                History
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {translationCount} translations
              </p>
            </div>
            {translationCount > 0 && (
              <button
                className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 rounded-md border border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700 transition-colors font-medium cursor-pointer"
                title="Clear history"
                onClick={onDeleteAll}
              >
                Clear History
              </button>
            )}
          </header>
          {translationCount == 0 ? (
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
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <div className="space-y-2">
                {translations?.map((translation, index) => (
                  <div
                    key={`${translation.timestamp.getTime()}-${index}`}
                    className="group bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 uppercase tracking-wide">
                            {translation.engine}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {translation.timestamp.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(
                              translation.engine,
                              translation.originalText
                            );
                          }}
                          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                          title="Delete this translation"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                            Original:
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2 leading-relaxed">
                            {translation.originalText}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                            Translated:
                          </p>
                          <p className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2 leading-relaxed">
                            {translation.translatedText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
