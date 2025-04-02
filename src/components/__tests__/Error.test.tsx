import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Error } from "../Error";

describe("Error Component", () => {
  it("renders error message correctly", () => {
    const message = "Test error message";
    const { getByText } = render(<Error message={message} />);

    expect(getByText(message)).toBeTruthy();
  });

  it("renders retry button when onRetry prop is provided", () => {
    const message = "Test error message";
    const onRetry = jest.fn();
    const { getByText } = render(<Error message={message} onRetry={onRetry} />);

    const retryButton = getByText("Try Again");
    expect(retryButton).toBeTruthy();
  });

  it("does not render retry button when onRetry prop is not provided", () => {
    const message = "Test error message";
    const { queryByText } = render(<Error message={message} />);

    expect(queryByText("Try Again")).toBeNull();
  });

  it("calls onRetry function when retry button is pressed", () => {
    const message = "Test error message";
    const onRetry = jest.fn();
    const { getByText } = render(<Error message={message} onRetry={onRetry} />);

    const retryButton = getByText("Try Again");
    fireEvent.press(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders with correct styling", () => {
    const message = "Test error message";
    const { getByTestId } = render(<Error message={message} />);

    const container = getByTestId("error-container");
    expect(container.props.className).toContain("flex-1");
    expect(container.props.className).toContain("justify-center");
    expect(container.props.className).toContain("items-center");
  });
});
