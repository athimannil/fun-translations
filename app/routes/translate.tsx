import React from "react";
import { TranslateForm } from "../translate/form";
import Content from "../../view/components/Content";
import Sidepane from "../../view/components/Sidepane";
import { createDefaultFunTranslationService } from "../../io/service/FunTranslationService";
import { useActionData } from "react-router";
import type { Route } from "./+types/translate";
import type { Translation } from "../../domain/types/Translation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }) => {
  const translationService = createDefaultFunTranslationService();
  const translation = await translationService.getTranslation("placeholder");
  // should I do something with that request?

  return translation;
};

const MOCK_TRANSLATIONS: Translation[] = [
  {
    originalText: "Hello, how are you today?",
    translatedText: "Strong with the Force you are today, hmm?",
    engine: "yoda",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    originalText: "I need to finish this project",
    translatedText: "Finish this project, you must. No other choice there is.",
    engine: "yoda",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    originalText: "The weather is beautiful",
    translatedText:
      "Beautiful the weather is, yes. Peaceful it makes one feel.",
    engine: "yoda",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

export default function Translate() {
  const translation = useActionData();

  return (
    <main className="flex h-full py-3">
      <Sidepane translations={MOCK_TRANSLATIONS} />
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
        {JSON.stringify(translation)}
      </Content>
    </main>
  );
}
