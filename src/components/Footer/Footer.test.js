import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer text correctly", () => {
  render(<Footer />);
  const footerText = screen.getByText("Design and developed by Arpit.");
  expect(footerText).toBeInTheDocument();
});
