export interface PirateFunTranslationApiResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: "pirate";
  };
}

class PirateTranslationRepo {
  async getTranslation(text: string): Promise<PirateFunTranslationApiResponse> {
    if (import.meta.env.VITE_APP_USE_MOCK === "true") {
      return (await import(
        "./../mocks/api.pirate.json"
      )) as PirateFunTranslationApiResponse;
    }

    const response = await fetch(
      "https://api.funtranslations.com/translate/pirate.json",
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<PirateFunTranslationApiResponse>;
  }
}

export default PirateTranslationRepo;
