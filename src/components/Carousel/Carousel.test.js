import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../../Utils/test-utils";
import Carousel from "./Carousel";
import { BrowserRouter } from "react-router-dom";
export const handlers = [
  rest.get(
    "https://node-cart-backend.onrender.com/products/",
    (req, res, ctx) => {
      return res(
        ctx.json({
          products: [
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
          ],
        }),
        ctx.delay(150)
      );
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches & receives a user after clicking the fetch user button", async () => {
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
