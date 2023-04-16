import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWrapper } from "../../Utils";
import { Constants } from "../../Constants/Index";
const { apiUrl } = Constants;

const product = {
  product: [],
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk("getProduct", async (thunkAPI) => {
  let apiRes = await getWrapper(apiUrl + "products/");
  return apiRes.data.products;
});

const productSlice = createSlice({
  name: "productData",
  initialState: product,
  extraReducers: (builder) => {
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
