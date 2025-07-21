import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Sidepane from "./Sidepane";

import type { Translation } from "../../domain/types/Translation";
import type { Engine } from "../../domain/types/Engine";

describe("Sidepane", () => {
  const createMockTranslation = (
    originalText: string,
    translatedText: string,
    engine: Engine = "yoda",
    timestamp: Date = new Date()
  ): Translation => ({
    originalText,
    translatedText,
    engine,
    timestamp,
  });

  it("renders history header", () => {
    render(<Sidepane translations={[]} />);
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });

  it("shows empty state when no translations", () => {
    render(<Sidepane translations={[]} />);
    expect(screen.getByText(/No translations yet/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Start translating to see your history!/i)
    ).toBeInTheDocument();
    expect(screen.getByText("0 translations")).toBeInTheDocument();
  });

  it("shows empty state when translations is undefined", () => {
    render(<Sidepane />);
    expect(screen.getByText(/No translations yet/i)).toBeInTheDocument();
    expect(screen.getByText("0 translations")).toBeInTheDocument();
  });

  it("displays translations count correctly", () => {
    const translations: Translation[] = [
      createMockTranslation("Hello", "Hola"),
      createMockTranslation("World", "Mundo"),
    ];
    render(<Sidepane translations={translations} />);
    expect(screen.getByText("2 translations")).toBeInTheDocument();
  });

  it("renders translation content correctly", () => {
    const translations: Translation[] = [
      createMockTranslation(
        "Hello world",
        "Strong with you, the Force is",
        "yoda",
        new Date("2024-01-01T12:00:00Z")
      ),
    ];

    render(<Sidepane translations={translations} />);

    // Check original text
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    // Check translated text
    expect(
      screen.getByText("Strong with you, the Force is")
    ).toBeInTheDocument();
    // Check engine badge
    expect(screen.getByText("YODA")).toBeInTheDocument();
    // Check labels
    expect(screen.getByText(/Original:/i)).toBeInTheDocument();
    expect(screen.getByText(/Translated:/i)).toBeInTheDocument();
  });

  it("formats timestamps correctly", () => {
    const testDate = new Date("2024-01-15T14:30:00Z");
    const translations: Translation[] = [
      createMockTranslation("Test", "Test translation", "yoda", testDate),
    ];

    render(<Sidepane translations={translations} />);

    // The exact format will depend on locale, but should contain month and time
    expect(screen.getByText(/Jan 15/)).toBeInTheDocument();
  });

  it("handles multiple translations with different engines", () => {
    const translations: Translation[] = [
      createMockTranslation("Hello", "Ahoy there", "pirate" as Engine),
      createMockTranslation("Goodbye", "Strong you are, goodbye", "yoda"),
    ];

    render(<Sidepane translations={translations} />);

    expect(screen.getByText("PIRATE")).toBeInTheDocument();
    expect(screen.getByText("YODA")).toBeInTheDocument();
    expect(screen.getByText("2 translations")).toBeInTheDocument();
  });

  it("generates unique keys for translations with same timestamp", () => {
    const sameTimestamp = new Date("2024-01-01T12:00:00Z");
    const translations: Translation[] = [
      createMockTranslation(
        "First",
        "First translation",
        "yoda",
        sameTimestamp
      ),
      createMockTranslation(
        "Second",
        "Second translation",
        "yoda",
        sameTimestamp
      ),
    ];

    render(<Sidepane translations={translations} />);

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("handles long text with line clamping", () => {
    const longText =
      "This is a very long text that should be clamped because it exceeds the normal display length for the translation history component";
    const translations: Translation[] = [
      createMockTranslation(longText, "Long translation result"),
    ];

    render(<Sidepane translations={translations} />);

    expect(screen.getByText(longText)).toBeInTheDocument();
  });
});
