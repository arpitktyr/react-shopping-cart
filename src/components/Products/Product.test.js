import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../Utils/test-utils";
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";
import ProductDetailCard from "./ProductDetailCard";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Carousel Testing", async () => {
  renderWithProviders(
    <BrowserRouter>
      <ProductList />
    </BrowserRouter>
  );

  const Product = await screen.findAllByTestId("product-list");
  expect(Product).toBeTruthy();
});

test("Testing Product is rendering", async () => {
  const product = {
    id: 5,
    title: "John Hardy Women's Legends",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "Jewellery",
    catId: "103",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  };

  render(
    <BrowserRouter>
      <ProductCard data={product} />
    </BrowserRouter>
  );
  const productTitle = screen.getByText(/John Hardy Women's Lege.../i);
  expect(productTitle).toBeInTheDocument();
  const productRating = screen.getByText(/4.6/i);
  expect(productRating).toBeInTheDocument();
  const productReview = screen.getByText(/400/i);
  expect(productReview).toBeInTheDocument();
  const productbtn = screen.getByText(/view/i);
  expect(productbtn).toBeInTheDocument();
  //   const link = screen.getByTestId("product-btn");
  //   fireEvent.click(link);
  //   expect(mockHistory.push).toBeCalledTime(1);
  //   expect(mockHistory.push).toBeCalledWith("/product/5");
});

test("Testing Product Detail page is rendering", async () => {
  const product = {
    id: 5,
    title: "John Hardy Women's Legends",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "Jewellery",
    catId: "103",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  };

  renderWithProviders(
    <BrowserRouter>
      <ProductDetailCard data={product} />
    </BrowserRouter>
  );
  const productTitle = screen.getByText(/John Hardy Women's Legends/i);
  expect(productTitle).toBeInTheDocument();
  const productbtn = screen.getByText(/Add to Cart/i);
  expect(productbtn).toBeInTheDocument();
  const producttext = screen.getByText(
    /From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection./i
  );
  expect(producttext).toBeInTheDocument();
});
