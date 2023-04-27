import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter, useRouteLoaderData } from "react-router-dom";
import { renderWithProviders } from "../../Utils/test-utils";
import Cart from "./Cart";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
}));

const MockCart = () => {
  return (
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
};
const cart = [
  {
    id: 5,
    title: "John Hardy Women's Legends",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
    category: "Jewellery",
    catId: "103",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
    qty: 3,
  },
];
test("has no Product at beginning", () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />);
  const text = screen.getByText(/Your cart is empty./i);
  expect(text).toBeInTheDocument();
});

test("Able to show one Product in Cart", () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });

  const text = screen.getByText(/John Hardy Women's Legends/i);
  expect(text).toBeInTheDocument();
});

test("Able to show multiple Product in Cart", () => {
  const cart = [
    {
      id: 5,
      title: "John Hardy Women's Legends",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
      category: "Jewellery",
      catId: "103",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 4.6,
        count: 400,
      },
      qty: 3,
    },
    {
      id: 6,
      title: "Second product Title",
      price: 623,
      description: "From our Legends Collection.",
      category: "Jewellery",
      catId: "103",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 4.5,
        count: 400,
      },
      qty: 1,
    },
  ];
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });

  const items = screen.getAllByTestId("cart-items");
  expect(items.length).toBe(2);
});

test("Able to Remove Product in Cart", async () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });
  const removeButton = screen.getByRole("button", { name: "Remove" });
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton);
  const text = await screen.findByText(/Your cart is empty./i);
  expect(text).toBeInTheDocument();
});
test("Able to increase product quantity in Cart", async () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });
  const incButton = screen.getByRole("button", { name: "+" });
  expect(incButton).toBeInTheDocument();
  fireEvent.click(incButton);
  const text = await screen.findByText(4);
  expect(text).toBeInTheDocument();
});

test("Able to decrease Product quantity in Cart", async () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });
  const desButton = screen.getByRole("button", { name: "-" });
  expect(desButton).toBeInTheDocument();
  fireEvent.click(desButton);
  const text = await screen.findByText(2);
  expect(text).toBeInTheDocument();
});

test("See message for login at checkout if not logged in.", async () => {
  useRouteLoaderData.mockReturnValueOnce("");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });
  const Button = screen.getByRole("button", { name: "Checkout" });
  expect(Button).toBeInTheDocument();
  fireEvent.click(Button);
  const text = await screen.findByText(
    "Please first login to proceed with order."
  );
  expect(text).toBeInTheDocument();
});

test("Able to checkout if used is logged in", async () => {
  useRouteLoaderData.mockReturnValueOnce("Token");
  renderWithProviders(<MockCart />, {
    preloadedState: {
      handleCart: cart,
    },
  });
  const Button = screen.getByRole("button", { name: "Checkout" });
  expect(Button).toBeInTheDocument();
  fireEvent.click(Button);
  const text = await screen.findByText(
    "This functionality is under development, Hope will implement it."
  );
  expect(text).toBeInTheDocument();
});
