//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import handleCart from "./reducer/handleCart";
import cartSlice from "./reducer/cartSlice";
import productSlice from "./reducer/productSlice";

//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = configureStore({
  reducer: { handleCart, cartSlice, productSlice },
});

export default store;
