import { describe, it, expect, beforeEach, vi } from "vitest";
import cacheService from "./CacheService";
import type { Translation } from "domain/types/Translation";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CacheService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get item from localStorage", () => {
    const mockData = { test: "data" };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

    const result = cacheService.get("test-key");

    expect(localStorageMock.getItem).toHaveBeenCalledWith("test-key");
    expect(result).toEqual(mockData);
  });

  it("should set item in localStorage", () => {
    const testData = { test: "data" };

    cacheService.set("test-key", testData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "test-key",
      JSON.stringify(testData)
    );
  });

  it("should add translation to engine array", () => {
    const existingTranslations: Translation[] = [];
    const newTranslation: Translation = {
      originalText: "Hello",
      translatedText: "Hola",
      engine: "yoda",
      timestamp: new Date(),
    };

    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(existingTranslations)
    );

    cacheService.addToEngineArray("yoda", newTranslation);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "yoda",
      JSON.stringify([newTranslation])
    );
  });

  it("should handle Date deserialization", () => {
    const dateString = "2024-01-01T00:00:00.000Z";
    const mockData = { timestamp: dateString };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

    const result = cacheService.get("test-key");

    expect(result).toEqual({
      timestamp: new Date(dateString),
    });
  });
});
