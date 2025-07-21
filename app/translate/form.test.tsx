import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TranslateForm } from "./form";

// Helper to render the form
const setup = () => {
  render(<TranslateForm />);
};

describe("TranslateForm", () => {
  test("renders all form elements", () => {
    setup();
    expect(screen.getByLabelText(/Translation Engine/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Text to Translate/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /translate/i })
    ).toBeInTheDocument();
  });

  test("engine select works", () => {
    setup();
    const select = screen.getByLabelText(
      /Translation Engine/i
    ) as HTMLSelectElement;
    expect(select.value).toBe("yoda");
    fireEvent.change(select, { target: { value: "pirate" } });
    expect(select.value).toBe("pirate");
  });

  test("text input works", () => {
    setup();
    const input = screen.getByLabelText(
      /Text to Translate/i
    ) as HTMLInputElement;
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Hello there" } });
    expect(input.value).toBe("Hello there");
  });

  test("submit button is disabled when text is empty", () => {
    setup();
    const button = screen.getByRole("button", { name: /translate/i });
    expect(button).toBeDisabled();
  });

  test("submit button is enabled when text is present", () => {
    setup();
    const input = screen.getByLabelText(
      /Text to Translate/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /translate/i });
    fireEvent.change(input, { target: { value: "Test" } });
    expect(button).not.toBeDisabled();
  });

  test("form submission calls handler", () => {
    // Spy on console.log to check for submission
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    setup();
    const input = screen.getByLabelText(
      /Text to Translate/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /translate/i });
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);
    expect(logSpy).toHaveBeenCalledWith("Form submitted");
    logSpy.mockRestore();
  });
});
