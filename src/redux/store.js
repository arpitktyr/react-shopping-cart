//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import handleCart from "./reducer/handleCart";
import cartSlice from "./reducer/cartSlice";
import productSlice from "./reducer/productSlice";
import categorySlice from "./reducer/categorySlice";

//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = configureStore({
  reducer: { handleCart, categorySlice, cartSlice, productSlice },
});

//used for configure store in test cases with predifined State

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: { handleCart, categorySlice, cartSlice, productSlice },
    preloadedState,
  });
};

export default store;
