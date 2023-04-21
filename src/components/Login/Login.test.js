import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
const MockLogin = () => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

test("that Login Page have heading", () => {
  render(<MockLogin />);
  const text = screen.getByText(/Log in/i);
  expect(text).toBeInTheDocument();
});

test("Has a username Field", () => {
  render(<MockLogin />);
  const linkElement = screen.getByPlaceholderText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});

test("Has a password Field", () => {
  render(<MockLogin />);
  const passElement = screen.getByPlaceholderText(/Password/i);
  expect(passElement).toBeInTheDocument();
});

//you can use it also it will work as test
it("should be able to type into input", () => {
  render(<MockLogin />);
  const inputElement = screen.getByPlaceholderText(/Enter email/i);
  fireEvent.click(inputElement);
  fireEvent.change(inputElement, { target: { value: "amanktyr@gmail.com" } });
  expect(inputElement.value).toBe("amanktyr@gmail.com");
});

describe("Many testcases bundled into it", () => {
  render(<MockLogin />);
  const mockLoginRe = jest.fn(() => Promise.resolve());

  it("User is able to able to login on with submit button", () => {
    const mockUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFycGl0dHR0dEBnbWFpbC5jb20iLCJpYXQiOjE2ODE2Mzg0MDcsImV4cCI6MTY4MTY0MjAwN30.1p84wcszEZxzFoUAitDX1IyGCATfufnkKHEkJxV2bd8",
      id: "7ae12488-3452-4347-8042-014c771483b0",
      email: "arpittttt@gmail.com",
      name: "arpit ktyr",
    };

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          ...mockUser,
        },
      ],
    });

    const linkElement = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(linkElement, { target: { value: "testpassword" } });
    const inputElement = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(inputElement, { target: { value: "testuser@test.com" } });
    const btn = screen.getByRole("button", { name: /Submit/i });

    fireEvent.click(btn);

    // expect(mockLogin).toBeCalledTimes(1);
    // expect(mockLogin).toHaveBeenCalledWith(mockUser);
    expect(window.location.pathname).toBe("/");
  });
});
