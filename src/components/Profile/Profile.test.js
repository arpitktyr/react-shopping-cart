import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "../../context/user-context";

describe("Profile component", () => {
  it("should update the name field when the user types in a fields", () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </UserContextProvider>
    );
    const nameInput = screen.getByLabelText("Name");
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
  it("should call the onSave function with the updated user data when the form is submitted", () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <Profile />
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
});

describe("EditProfile component", () => {
  const userData = {
    name: "aman",
    email: "aman@gmail.com",
    pincode: "209727",
    address: "Kanpur, Uttar Pradesh",
    mobile: "9956455678",
  };
  const onSaveMock = jest.fn();

  it("should update the name field when the user types in a fields", () => {
    render(
      <UserContextProvider>
        <BrowserRouter>
          <EditProfile userData={userData} onSave={onSaveMock} />
        </BrowserRouter>
      </UserContextProvider>
    );
    const nameInput = screen.getByLabelText("Name");
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

  it("should call the onSave function with the updated user data when the form is submitted", () => {
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

    expect(onSaveMock).toHaveBeenCalledWith({
      name: "aman",
      email: "aman@gmail.com",
      pincode: "209727",
      address: "Kanpur, Uttar Pradesh",
      mobile: "9956455678",
    });
  });
});
