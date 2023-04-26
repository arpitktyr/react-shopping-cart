import React from "react";
import { screen } from "@testing-library/react";
import { BrowserRouter, useRouteLoaderData } from "react-router-dom";
import { renderWithProviders } from "../../Utils/test-utils";
import Cart from "./Cart";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
}));

const MockCart = () => {
  return (
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
};
test("has no Product at beginning", () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />);
  const text = screen.getByText(/Your cart is empty./i);
  expect(text).toBeInTheDocument();
});
