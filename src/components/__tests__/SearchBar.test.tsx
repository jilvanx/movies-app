import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  it("renders correctly with default props", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("renders with provided value", () => {
    const { getByDisplayValue } = render(<SearchBar value="test search" />);
    expect(getByDisplayValue("test search")).toBeTruthy();
  });

  it("calls onChangeText when input changes", () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onChangeText={mockOnChange} />
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.changeText(input, "new search");

    expect(mockOnChange).toHaveBeenCalledWith("new search");
  });
});
