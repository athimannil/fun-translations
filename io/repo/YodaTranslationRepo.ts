export interface YodaFunTranslationApiResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: "yoda";
  };
}

class YodaTranslationRepo {
  async getTranslation(text: string): Promise<YodaFunTranslationApiResponse> {
    if (import.meta.env.VITE_APP_USE_MOCK === "true") {
      return (await import(
        "../mocks/api.yoda.json"
      )) as YodaFunTranslationApiResponse;
    }

    const response = await fetch(
      "https://api.funtranslations.com/translate/yoda.json",
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

    return response.json() as Promise<YodaFunTranslationApiResponse>;
  }
}

export default YodaTranslationRepo;
