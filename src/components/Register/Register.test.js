import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register.js";
import UserContextProvider from "../../context/user-context.js";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
}));

const MockRegister = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </UserContextProvider>
  );
};

test("that Register Page have heading", () => {
  render(<MockRegister />);
  const text = screen.getByText("Create a new user");
  expect(text).toBeInTheDocument();
});

test("Has a username Field", () => {
  render(<MockRegister />);
  const linkElement = screen.getByLabelText("Email");
  expect(linkElement).toBeInTheDocument();
});

test("Has a password Field", () => {
  render(<MockRegister />);
  const passElement = screen.getByLabelText("Password");
  expect(passElement).toBeInTheDocument();
});
test("Has a confirm password Field", () => {
  render(<MockRegister />);
  const conPassElement = screen.getByLabelText("Confirm Password");
  expect(conPassElement).toBeInTheDocument();
});

test("Has a name Field", () => {
  render(<MockRegister />);
  const name = screen.getByLabelText("Name");
  expect(name).toBeInTheDocument();
});

test("should be able to type into input Types", () => {
  render(<MockRegister />);
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  fireEvent.change(nameInput, { target: { value: "arpit" } });
  fireEvent.change(emailInput, { target: { value: "arpit@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  expect(nameInput.value).toBe("arpit");
  expect(emailInput.value).toBe("arpit@example.com");
  expect(passwordInput.value).toBe("password123");
  expect(confirmPasswordInput.value).toBe("password123");
});

test("able to produce validation errors", async () => {
  render(<MockRegister />);

  fireEvent.blur(screen.getByLabelText("Name"));
  fireEvent.blur(screen.getByLabelText("Email"));
  fireEvent.blur(screen.getByLabelText("Password"));
  fireEvent.blur(screen.getByLabelText("Confirm Password"));

  await waitFor(() => {
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen.getByText("Confirm Password is required.")
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });
});

describe("Many testcases bundled into it", () => {
  it("User is able to able to Register  with submit button", async () => {
    render(<MockRegister />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "aman" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "aman@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "testpassword" },
    });
    const btn = screen.getByRole("button", { name: /Submit/i });

    // fireEvent.click(btn);

    act(() => {
      btn.dispatchEvent(new MouseEvent("click"));
    });
    const msg = await screen.findByText("Submitting..");
    expect(msg).toBeInTheDocument();

    const successMsg = await screen.findByText(
      "Registered Successfully, Will redirected to Homepage."
    );
    expect(successMsg).toBeInTheDocument();
  });
});
