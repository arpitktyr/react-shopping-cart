import React from "react";
import { renderWithProviders } from "../../Utils/test-utils";
import { BrowserRouter, useLoaderData, useSubmit } from "react-router-dom";
import RootLayout from "./Root";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
  useLoaderData: jest.fn(),
  useSubmit: jest.fn(),
}));

jest.mock("../../Utils/auth", () => ({
  getTokenDuration: jest.fn(() => 1000),
}));

it("calls submit with logout action when token is expired", () => {
  useLoaderData.mockReturnValueOnce("EXPIRED");
  const submitMock = jest.fn();
  useSubmit.mockReturnValueOnce(submitMock);

  renderWithProviders(
    <BrowserRouter>
      <RootLayout />
    </BrowserRouter>
  );

  expect(submitMock).toHaveBeenCalledWith(null, {
    action: "/logout",
    method: "post",
  });
});
