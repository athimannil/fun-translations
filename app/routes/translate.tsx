import { useState, useEffect } from "react";
import { useActionData } from "react-router";
import { TranslateForm } from "../translate/form";
import Content from "../../view/components/Content";
import Sidepane from "../../view/components/Sidepane";
import { funTranslationService } from "io/service/FunTranslationService";
import cacheService from "io/service/CacheService";
import type { Route } from "./+types/translate";
import type { Translation } from "../../domain/types/Translation";
import { Engine } from "domain/types/Engine";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fun Translations" },
    {
      name: "description",
      content: "Transform your text with different translation engines",
    },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const engine = formData.get("engine") as Engine;

  if (!text || !engine) {
    return { success: false, error: "Missing text or engine" };
  }

  try {
    const translation = await funTranslationService.getTranslation(
      text,
      engine
    );
    return { success: true, translation };
  } catch (error) {
    console.error("Translation error:", error);
    return { success: false, error: (error as Error).message };
  }
};

const engines: Engine[] = ["yoda", "pirate"];

export default function Translate() {
  const [allTranslations, setAllTranslations] = useState<Translation[]>([]);
  const actionData = useActionData<typeof action>();

  const loadTranslations = () => {
    if (typeof window === "undefined") return;

    const all = engines.flatMap((engine) => {
      const engineTranslations = cacheService.get<Translation[]>(engine) || [];
      return engineTranslations;
    });

    all.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setAllTranslations(all);
  };

  useEffect(() => {
    loadTranslations();
  }, []);

  // Handle successful translation - save to localStorage and reload
  useEffect(() => {
    if (actionData?.success && actionData.translation) {
      cacheService.addToEngineArray<Translation>(
        actionData.translation.engine,
        actionData.translation
      );
      // Reload translations
      loadTranslations();
    }
  }, [actionData]);

  const handleDeleteTranslationHistory = (
    engine: Engine,
    originalText: string
  ) => {
    cacheService.removeFromEngineArray<Translation>(engine, originalText);
    loadTranslations(); // Reload after deletion
  };

  const handleDeleteAllTranslationsHistory = () => {
    cacheService.removeAllEngines(engines);
    setAllTranslations([]);
  };

  return (
    <main className="flex h-full">
      <Sidepane
        onDelete={handleDeleteTranslationHistory}
        onDeleteAll={handleDeleteAllTranslationsHistory}
        translations={allTranslations}
      />
      <Content>
        <div className="text-center py-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Fun Translations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Transform your text with different translation engines
          </p>
        </div>

        <TranslateForm />

        {actionData?.success && actionData.translation && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Translation Result
              </h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium uppercase tracking-wide">
                {actionData.translation.engine}
              </span>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Original Text
                </label>
                <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
                  {actionData.translation.originalText}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Translated Text
                </label>
                <p className="text-gray-900 dark:text-white text-lg font-medium leading-relaxed">
                  {actionData.translation.translatedText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Show error result */}
        {actionData?.success === false && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Translation Error:
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              {actionData.error}
            </p>
          </div>
        )}
      </Content>
    </main>
  );
}
