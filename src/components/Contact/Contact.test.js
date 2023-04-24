import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "./Contact";
const MockContact = () => {
  return (
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );
};
describe("Testing Contact Us Page", () => {
  it("Contact page have a heading", () => {
    render(<MockContact />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  it("Contact page have a name field", () => {
    render(<MockContact />);
    const name = screen.getByPlaceholderText("Your Name");
    expect(name).toBeInTheDocument();
  });
  it("Contact page have a email field", () => {
    render(<MockContact />);
    const email = screen.getByPlaceholderText("Enter Email");
    expect(email).toBeInTheDocument();
  });
  it("Contact page have a mobile no field", () => {
    render(<MockContact />);
    const mob = screen.getByPlaceholderText("Your Mobile Number");
    expect(mob).toBeInTheDocument();
  });
  it("Contact page have a message field", () => {
    render(<MockContact />);
    const text = screen.getByRole("textbox", { name: /message/i });
    expect(text).toBeInTheDocument();
  });
});
