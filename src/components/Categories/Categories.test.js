import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Categorieslist from "./Categorieslist";
import Categories from "./Categories";
import { renderWithProviders } from "../../Utils/test-utils";

const MockCategoriesList = () => {
  return (
    <BrowserRouter>
      <Categorieslist />
    </BrowserRouter>
  );
};

const MockCategories = () => {
  return (
    <BrowserRouter>
      <Categories catName="Jewellery" catId="1000" />
    </BrowserRouter>
  );
};

describe("Check Categories", () => {
  test("able to see categories", () => {
    render(<MockCategories />);
    const cat = screen.getByRole("link");
    const catName = screen.getByText(/Jewellery/i);
    expect(catName).toBeInTheDocument();
    expect(cat).toHaveTextContent(/Explore/i);
  });

  test("able to navigate to product page", () => {
    render(<MockCategories />);
    const catBtn = screen.getByRole("link");
    fireEvent.click(catBtn);
    expect(window.location.pathname).toBe("/products/1000");
  });

  test("Category List Testing", async () => {
    const categoriesData = {
      category: [
        {
          name: "Men's clothing",
          catId: "100",
        },
        {
          name: "Women's clothing",
          catId: "101",
        },
        {
          name: "Electronics",
          catId: "102",
        },
        {
          name: "Jewellery",
          catId: "103",
        },
      ],
      categoryLoading: false,
      categoryError: "",
    };
    renderWithProviders(<MockCategoriesList />, {
      preloadedState: {
        categorySlice: categoriesData,
      },
    });
    const list = await screen.findAllByTestId("test-cat");
    expect(list.length).toBe(4);
  });

  test("Category should show loading state", async () => {
    const categoriesData = {
      category: [],
      categoryLoading: true,
      categoryError: "",
    };
    renderWithProviders(<MockCategoriesList />, {
      preloadedState: {
        categorySlice: categoriesData,
      },
    });
    const loading = await screen.findByTestId("loading-spinner");
    expect(loading).toBeInTheDocument();
  });

  test("Category should show Errors", async () => {
    const categoriesData = {
      category: [],
      categoryLoading: false,
      categoryError: "Something went wrong.",
    };
    renderWithProviders(<MockCategoriesList />, {
      preloadedState: {
        categorySlice: categoriesData,
      },
    });
    const error = await screen.findByText("Something went wrong.");
    expect(error).toBeInTheDocument();
  });
});
