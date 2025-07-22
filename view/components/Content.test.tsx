import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Content from "./Content";

describe("Content", () => {
  it("renders children correctly", () => {
    render(
      <Content>
        <div>Test content</div>
      </Content>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(
      <Content>
        <div>Test</div>
      </Content>
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass(
      "flex-1",
      "bg-white",
      "dark:bg-gray-900",
      "overflow-y-auto"
    );
  });
});
