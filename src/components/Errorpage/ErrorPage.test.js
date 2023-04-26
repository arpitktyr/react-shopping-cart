import React from "react";
import { render, screen } from "@testing-library/react";
import Errorpage from "./Errorpage";
import { useRouteError } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
}));

describe("Errorpage component", () => {
  it("should display 404 error message", () => {
    useRouteError.mockReturnValueOnce({
      status: 404,
    });
    render(<Errorpage />);
    expect(screen.getByText("Not found!")).toBeInTheDocument();
    expect(
      screen.getByText("Could not find resource or page.")
    ).toBeInTheDocument();
  });

  it("should display custom error message", () => {
    useRouteError.mockReturnValueOnce({
      status: 500,
      data: '{"message": "Custom error message"}',
    });
    render(<Errorpage />);
    expect(screen.getByText("An error occurred!")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });
});
