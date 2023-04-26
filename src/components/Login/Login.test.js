import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { Provider } from "react-redux";
import UserContextProvider from "../../context/user-context";
import store from "../../redux/store";
import { act } from "react-dom/test-utils";

import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
}));

const MockLogin = () => {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserContextProvider>
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

test("able to produce validation errors", async () => {
  render(<MockLogin />);
  fireEvent.blur(screen.getByLabelText("Email"));
  fireEvent.blur(screen.getByLabelText("Password"));

  // Assert that error messages are displayed
  await waitFor(() => {
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });
});

describe("Many testcases bundled into it", () => {
  it("User is able to able to login  with submit button", async () => {
    render(<MockLogin />);
    const linkElement = screen.getByLabelText(/password/i);
    fireEvent.change(linkElement, { target: { value: "testpassword" } });
    const inputElement = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(inputElement, { target: { value: "testuser@test.com" } });
    const btn = screen.getByRole("button", { name: /Submit/i });

    // fireEvent.click(btn);

    act(() => {
      btn.dispatchEvent(new MouseEvent("click"));
    });
    const msg = await screen.findByText("Submitting..");
    expect(msg).toBeInTheDocument();

    const successMsg = await screen.findByText(
      "Login Successfull, You will redirected to Homepage."
    );
    expect(successMsg).toBeInTheDocument();
  });
});
