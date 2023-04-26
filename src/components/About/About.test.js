import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";
const MockAbout = () => {
  return (
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
};
describe("Testing Contact Us Page", () => {
  it("About page have a heading", () => {
    render(<MockAbout />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  it("About Page have a button", () => {
    render(<MockAbout />);
    const name = screen.getByRole("button", { name: "START SHOPPING" });
    expect(name).toBeInTheDocument();
  });
});
