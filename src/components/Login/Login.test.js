import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

import { Provider } from "react-redux";
import store from "../../redux/store";
import { act } from "react-dom/test-utils";

const MockLogin = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

test("that Login Page have heading", () => {
  render(<MockLogin />);
  const text = screen.getByText("Log in");
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
  const passwordElement = screen.getByPlaceholderText(/Enter Password/i);

  fireEvent.change(inputElement, { target: { value: "amanktyr@gmail.com" } });
  fireEvent.change(passwordElement, { target: { value: "amanktyr" } });
  expect(inputElement.value).toBe("amanktyr@gmail.com");
  expect(passwordElement.value).toBe("amanktyr");
});

describe("Many testcases bundled into it", () => {
  it("User is able to able to login  with submit button", () => {
    render(<MockLogin />);
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

    const linkElement = screen.getByLabelText(/password/i);
    fireEvent.change(linkElement, { target: { value: "testpassword" } });
    const inputElement = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(inputElement, { target: { value: "testuser@test.com" } });
    const btn = screen.getByRole("button", { name: /Submit/i });

    // fireEvent.click(btn);

    act(() => {
      btn.dispatchEvent(new MouseEvent("click"));
    });

    expect(window.location.pathname).toBe("/");
  });
});
