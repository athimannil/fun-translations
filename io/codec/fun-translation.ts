import type { Translation } from "domain/types/Translation";

interface FunTranslationService {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: Translation["engine"];
  };
}

export const fromDto = (response: FunTranslationService): Translation => {
  return {
    originalText: response.contents.text, // Fixed: was 'text'
    translatedText: response.contents.translated, // Fixed: was 'translated'
    engine: response.contents.translation,
    timestamp: new Date(), // Add timestamp
  };
};
