import { StatusBadge } from "@/components/StatusBadge";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("StatusBadge Component", () => {
  it("renders active status correctly", () => {
    render(<StatusBadge status="active" />);
    const badge = screen.getByText(/active/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("active-status");
  });

  it("renders inactive status correctly", () => {
    render(<StatusBadge status="inactive" />);
    const badge = screen.getByText(/inactive/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("inactive-status");
  });

  it("renders pending status correctly", () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByText(/pending/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("pending-status");
  });

  it("renders blacklisted status correctly", () => {
    render(<StatusBadge status="blacklisted" />);
    const badge = screen.getByText(/blacklisted/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("blacklisted-status");
  });
});
