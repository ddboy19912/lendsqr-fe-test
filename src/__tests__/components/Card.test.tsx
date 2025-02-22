import { UsersIllustration } from "@/assets";
import Card from "@/components/Card";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Mock Content
const TestCardContent = () => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">Total Users</h3>
        <p className="mt-2 text-3xl font-bold">2,453</p>
        <img src={UsersIllustration} alt="users-illustration" />
      </div>
    </div>
    <p className="mt-4 text-sm text-green-600">+15% from last month</p>
  </Card>
);

describe("Card Component", () => {
  it("renders children content correctly", () => {
    render(<TestCardContent />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("2,453")).toBeInTheDocument();
    expect(screen.getByText("+15% from last month")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <Card className="bg-blue-100">
        <div>Test Content</div>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("bg-blue-100");
  });
});
