import { describe, it, expect, vi, beforeEach } from "vitest";
import { funTranslationService } from "./FunTranslationService";
import type { Engine } from "domain/types/Engine";

vi.mock("../../domain/normalizeText", () => ({
  normalizeText: vi.fn((text: string) => text.trim()),
}));

vi.mock("./CacheService", () => ({
  default: {
    get: vi.fn(),
    addToEngineArray: vi.fn(),
  },
}));

vi.mock("../repo/YodaTranslationRepo", () => ({
  default: class MockYodaRepo {
    async getTranslation(text: string) {
      return {
        success: { total: 1 },
        contents: {
          translated: `Translated to Yoda: ${text}`,
          text,
          translation: "yoda",
        },
      };
    }
  },
}));

vi.mock("../repo/PirateTranslationRepo", () => ({
  default: class MockPirateRepo {
    async getTranslation(text: string) {
      return {
        success: { total: 1 },
        contents: {
          translated: `Translated to Pirate: ${text}`,
          text,
          translation: "pirate",
        },
      };
    }
  },
}));

describe("FunTranslationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should translate text using yoda engine", async () => {
    const result = await funTranslationService.getTranslation("Hello", "yoda");

    expect(result).toEqual({
      originalText: "Hello",
      translatedText: "Translated to Yoda: Hello",
      engine: "yoda",
      timestamp: expect.any(Date),
    });
  });

  it("should translate text using pirate engine", async () => {
    const result = await funTranslationService.getTranslation(
      "Hello",
      "pirate"
    );

    expect(result).toEqual({
      originalText: "Hello",
      translatedText: "Translated to Pirate: Hello",
      engine: "pirate",
      timestamp: expect.any(Date),
    });
  });

  it("should throw error for unknown engine", async () => {
    await expect(
      funTranslationService.getTranslation("Hello", "unknown" as Engine)
    ).rejects.toThrow();
  });
});
