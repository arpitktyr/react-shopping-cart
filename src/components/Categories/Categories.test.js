import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Categorieslist from "./Categorieslist";
import Categories from "./Categories";
import store from "../../redux/store";
import { Provider } from "react-redux";

const MockCategoriesList = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Categorieslist />
      </BrowserRouter>
    </Provider>
  );
};

const MockCategories = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Categories catName="Jewellery" catId="1000" />
      </BrowserRouter>
    </Provider>
  );
};
describe("Check Categories", () => {
  test("able to see categories", async () => {
    render(<MockCategories />);
    //eslint-disable-next-line
    screen.debug();
    const cat = screen.getByRole("link");
    expect(cat).toBeInDocument();
  });

  //   it("User is able to able to see the all categories", async () => {
  //     window.fetch = jest.fn();
  //     window.fetch.mockResolvedValueOnce({
  //       json: async () => [
  //         {
  //           category: [
  //             {
  //               name: "Men's clothing",
  //               catId: "100",
  //             },
  //             {
  //               name: "Women's clothing",
  //               catId: "101",
  //             },
  //             {
  //               name: "Electronics",
  //               catId: "102",
  //             },
  //             {
  //               name: "Jewellery",
  //               catId: "103",
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     render(<mockCategoriesList />);
  //     // const listItemElements = await screen.findAllByTestId("test-cat");
  //     // expect(listItemElements).not.toHaveLength(0);
  //     const listItemElement1 = await screen.findByText("Men's clothing");
  //     expect(listItemElement1).toBeInDocument();
  //   });
});
