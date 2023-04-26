import React from "react";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "./Home";
import { renderWithProviders } from "../../Utils/test-utils";

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

test("Homepage should have a Banner", () => {
  renderWithProviders(<MockHome />);
  const img = screen.getByAltText("grocery bag");
  expect(img).toBeInTheDocument();
});
