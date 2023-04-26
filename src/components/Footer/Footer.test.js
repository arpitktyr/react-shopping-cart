import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer text correctly", () => {
  render(<Footer />);
  const footerText = screen.getByText(
    "Copyright © 2012 The Grocery Company. Call us on +91 9900000011"
  );
  expect(footerText).toBeInTheDocument();
});
