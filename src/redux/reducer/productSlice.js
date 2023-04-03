import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWrapper } from "../../Utils";
import { Constants } from "../../Constants/Index";
const { apiUrl } = Constants;

const product = {
  category: [],
  product: [],
  loading: false,
  error: "",
};
export const getCategories = createAsyncThunk(
  "getCategory",
  async (thunkAPI) => {
    let apiRes = await getWrapper(apiUrl + "category");
    return apiRes.data.category;
  }
);

export const getProducts = createAsyncThunk("getProduct", async (thunkAPI) => {
  let apiRes = await getWrapper(apiUrl + "products/");
  return apiRes.data.products;
});

const productSlice = createSlice({
  name: "productData",
  initialState: product,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
