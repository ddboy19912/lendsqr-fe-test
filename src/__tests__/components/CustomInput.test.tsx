import CustomInput from "@/components/CustomInput";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("CustomInput Component", () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    value: "",
    placeholderText: "Search...",
    inputType: "text" as const,
    onChange: mockOnChange,
  };

  it("renders input with correct props", () => {
    render(<CustomInput {...defaultProps} value="test value" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue("test value");
    expect(input).toHaveAttribute("placeholder", "Search...");
  });

  it("calls onChange handler when input changes", async () => {
    render(<CustomInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders search icon button", () => {
    render(<CustomInput {...defaultProps} />);

    const button = screen.getByRole("button");
    const icon = screen.getByTestId("search-icon");
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<CustomInput {...defaultProps} />);

    const container = screen.getByTestId("custom-input-container");
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(container).toHaveClass("overflow-hidden rounded-lg");
    expect(input).toHaveClass("rounded-l-lg rounded-r-none");
    expect(button).toHaveClass("bg-teal");
  });

  it("handles different input types", () => {
    const { rerender } = render(
      <CustomInput {...defaultProps} inputType="number" />
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    rerender(<CustomInput {...defaultProps} inputType="search" />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("displays placeholder when value is empty", () => {
    render(<CustomInput {...defaultProps} value="" />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
