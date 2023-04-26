import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { renderWithProviders } from "../../Utils/test-utils";
import { server } from "../../mocks/server";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteLoaderData: jest.fn(),
}));
const MockHeader = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe("Check Categories", () => {
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
    renderWithProviders(<MockHeader />, {
      preloadedState: {
        categorySlice: categoriesData,
      },
    });
    const list = await screen.findAllByTestId("categories-list");
    expect(list.length).toBe(4);
  });

  test("Category Links should show loading state", async () => {
    const categoriesData = {
      category: [],
      categoryLoading: true,
      categoryError: "",
    };
    renderWithProviders(<MockHeader />, {
      preloadedState: {
        categorySlice: categoriesData,
      },
    });
    const loading = await screen.findByTestId("loading-spinner");
    expect(loading).toBeInTheDocument();
  });
});

test("Carousel Testing", async () => {
  server.listen();
  renderWithProviders(<MockHeader />);

  const list = await screen.findAllByTestId("categories-list");
  expect(list.length).toBe(4);
  server.close();
});
