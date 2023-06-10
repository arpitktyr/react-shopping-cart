import React from "react";
import { rest } from "msw";
import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../../Utils/test-utils";
import Carousel from "./Carousel";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { Constants } from "../../Constants/Index";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Carousel Testing", async () => {
  renderWithProviders(
    <BrowserRouter>
      <Carousel />
    </BrowserRouter>
  );

  const link = await screen.findAllByRole("link");
  const img = await screen.findAllByRole("img");
  const heading = await screen.findAllByRole("heading");

  expect(link.length).toBe(6);
  expect(img.length).toBe(6);
  expect(heading.length).toBe(3);
});

test("Carousel Error Testing", async () => {
  server.use(
    rest.get(`${Constants.apiUrl}products`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  renderWithProviders(
    <BrowserRouter>
      <Carousel />
    </BrowserRouter>
  );
  const loading = screen.getByText(/loading.../i);
  expect(loading).toBeInTheDocument();
  const error = await screen.findByText(/something went wrong/i);
  expect(error).toBeInTheDocument();
});
