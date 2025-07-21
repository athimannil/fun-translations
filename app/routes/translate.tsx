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
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const engine = formData.get("engine") as Engine;

  if (!text || !engine) {
    throw new Error("Missing text or engine");
  }

  try {
    const translation = await funTranslationService.getTranslation(
      text,
      engine
    );
    return { success: true, translation };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

const engines: Engine[] = ["yoda", "pirate"];

export default function Translate() {
  const [allTranslations, setAllTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    const all = engines.flatMap(
      (engine) => cacheService.get<Translation[]>(engine) || []
    );
    setAllTranslations(all);
  }, []);

  const actionData = useActionData<typeof action>();

  const handleTranslationSubmit = async (data: {
    text: string;
    engine: Engine;
  }) => {
    const { text, engine } = data;
    const result = await funTranslationService.getTranslation(text, engine);

    const all = engines.flatMap(
      (engine) => cacheService.get<Translation[]>(engine) || []
    );
    setAllTranslations(all);
  };

  const handleDeleteTranslationHistory = (
    engine: Engine,
    originalText: string
  ) => {
    console.log(engine);
    console.log(originalText);
    console.log(allTranslations);
    cacheService.removeFromEngineArray<Translation>(engine, originalText);
    setAllTranslations((prev) =>
      prev.filter(
        (item) =>
          !(item.engine === engine && item.originalText === originalText)
      )
    );
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
        <TranslateForm onTranslation={handleTranslationSubmit} />
        {actionData?.translation && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3>Translation Result:</h3>
            <p>{actionData.translation.translatedText}</p>
          </div>
        )}
      </Content>
    </main>
  );
}
