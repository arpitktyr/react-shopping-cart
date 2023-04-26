import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  test("should be able to type into input Types", () => {
    render(<MockContact />);
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const mobNoInput = screen.getByLabelText("Phone Number");
    const msgInput = screen.getByLabelText("Message");
    fireEvent.change(nameInput, { target: { value: "arpit" } });
    fireEvent.change(emailInput, { target: { value: "arpit@example.com" } });
    fireEvent.change(mobNoInput, { target: { value: "9956261111" } });
    fireEvent.change(msgInput, { target: { value: "Hello" } });
    expect(nameInput.value).toBe("arpit");
    expect(emailInput.value).toBe("arpit@example.com");
    expect(mobNoInput.value).toBe("9956261111");
    expect(msgInput.value).toBe("Hello");
  });
});
test("able to produce validation errors", async () => {
  render(<MockContact />);

  fireEvent.blur(screen.getByLabelText("Name"));
  fireEvent.blur(screen.getByLabelText("Email"));
  fireEvent.blur(screen.getByLabelText("Phone Number"));
  fireEvent.blur(screen.getByLabelText("Message"));

  await waitFor(() => {
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Phone No. is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Message is required.")).toBeInTheDocument();
  });
});
