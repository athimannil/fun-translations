import { describe, test, expect, vi, beforeAll } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TranslateForm } from "./form";

vi.mock("react-router", () => ({
  Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
}));

beforeAll(() => {
  HTMLFormElement.prototype.requestSubmit = vi.fn();
});

const setup = () => {
  return render(<TranslateForm />);
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

  test("form submission works", () => {
    const { container } = setup();
    const input = screen.getByLabelText(
      /Text to Translate/i
    ) as HTMLInputElement;
    const form = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(input, { target: { value: "Test" } });

    expect(() => fireEvent.submit(form)).not.toThrow();

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Test");
  });

  test("form has correct attributes", () => {
    const { container } = setup();
    const form = container.querySelector("form") as HTMLFormElement;
    expect(form).toHaveAttribute("method", "post");
  });

  test("form elements have correct names for form submission", () => {
    setup();
    const engineSelect = screen.getByLabelText(/Translation Engine/i);
    const textInput = screen.getByLabelText(/Text to Translate/i);

    expect(engineSelect).toHaveAttribute("name", "engine");
    expect(textInput).toHaveAttribute("name", "text");
  });

  test("form data is correct when filled", () => {
    const { container } = setup();
    const input = screen.getByLabelText(
      /Text to Translate/i
    ) as HTMLInputElement;
    const select = screen.getByLabelText(
      /Translation Engine/i
    ) as HTMLSelectElement;
    const form = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.change(select, { target: { value: "pirate" } });

    const formData = new FormData(form);
    expect(formData.get("text")).toBe("Test message");
    expect(formData.get("engine")).toBe("pirate");
  });
});
