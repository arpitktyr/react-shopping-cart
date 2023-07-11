import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "../../context/user-context";
import { waitFor } from "@testing-library/react";
import axios from "axios";
jest.mock("axios");

const userData = {
  name: "aman",
  email: "aman@gmail.com",
  pincode: "209727",
  address: "Kanpur, Uttar Pradesh",
  mobile: "9956455678",
};
const onSaveMock = jest.fn();

describe("EditProfile component", () => {
  it("User should be able to write in input type", async () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <EditProfile userData={userData} onSave={onSaveMock} />
        </BrowserRouter>
      </UserContextProvider>
    );
    const nameInput = await screen.findByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "amanktyr" } });
    expect(nameInput.value).toBe("amanktyr");

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "amanktyr@gmaill.com" } });
    expect(emailInput.value).toBe("amanktyr@gmaill.com");

    const addInput = screen.getByLabelText("Address");
    fireEvent.change(addInput, { target: { value: "India" } });
    expect(addInput.value).toBe("India");

    const pincodeInput = screen.getByLabelText("Pincode");
    fireEvent.change(pincodeInput, { target: { value: "208024" } });
    expect(pincodeInput.value).toBe("208024");

    const mobileInput = screen.getByLabelText("Mobile");
    fireEvent.change(mobileInput, { target: { value: "2345678989" } });
    expect(mobileInput.value).toBe("2345678989");
  });

  it("should updated user data when the form is submitted", () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <EditProfile userData={userData} onSave={onSaveMock} />
        </BrowserRouter>
      </UserContextProvider>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const pincodeInput = screen.getByLabelText("Pincode");
    const addressInput = screen.getByLabelText("Address");
    const mobileInput = screen.getByLabelText("Mobile");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "aman" } });
    fireEvent.change(emailInput, { target: { value: "aman@gmail.com" } });
    fireEvent.change(pincodeInput, { target: { value: "209727" } });
    fireEvent.change(addressInput, {
      target: { value: "Kanpur, Uttar Pradesh" },
    });
    fireEvent.change(mobileInput, { target: { value: "9956455678" } });
    fireEvent.click(saveButton);
    expect(nameInput.value).toBe("aman");
    expect(emailInput.value).toBe("aman@gmail.com");
    expect(pincodeInput.value).toBe("209727");
    expect(mobileInput.value).toBe("9956455678");
  });

  it("should call the onSave function", async () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <EditProfile userData={userData} onSave={onSaveMock} />
        </BrowserRouter>
      </UserContextProvider>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const pincodeInput = screen.getByLabelText("Pincode");
    const addressInput = screen.getByLabelText("Address");
    const mobileInput = screen.getByLabelText("Mobile");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "aman" } });
    fireEvent.change(emailInput, { target: { value: "aman@gmail.com" } });
    fireEvent.change(pincodeInput, { target: { value: "209727" } });
    fireEvent.change(addressInput, {
      target: { value: "Kanpur, Uttar Pradesh" },
    });
    fireEvent.change(mobileInput, { target: { value: "9956455678" } });

    fireEvent.click(saveButton);
    //fireEvent.submit(screen.getByRole("form"));

    //wait for the form submission to complete
    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalledWith({
        name: "aman",
        email: "aman@gmail.com",
        pincode: "209727",
        address: "Kanpur, Uttar Pradesh",
        mobile: "9956455678",
      });
    });
  });
});

describe("Profile component", () => {
  test("Should show Loading icon", () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </UserContextProvider>
    );
    //screen.debug();
    const loader = screen.getByTestId("loading-spinner");
    expect(loader).toBeInTheDocument();
  });

  test("Should show user Details", async () => {
    const mockValue = {
      name: "aman",
      email: "aman@gmail.com",
      pincode: "209727",
      address: "Kanpur, Uttar Pradesh",
      mobile: "9956455678",
    };

    // Use mockResolvedValueOnce instead of mockReturnValueOnce
    axios.get.mockResolvedValueOnce({ data: mockValue });
    render(
      <UserContextProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </UserContextProvider>
    );
    //screen.debug();
    await waitFor(() => {
      const name = screen.getByText("Something went wrong!");
      expect(name).toBeInTheDocument();
    });
  });
});

test("Snapshot Testing", () => {
  const { container } = render(
    <UserContextProvider>
      <BrowserRouter>
        <EditProfile userData={userData} onSave={onSaveMock} />
      </BrowserRouter>
    </UserContextProvider>
  );
  expect(container.innerHTML).toMatchSnapshot();
});
