import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWrapper } from "../../Utils";
import { Constants } from "../../Constants/Index";
const { apiUrl } = Constants;

const category = {
  category: [],
  categoryLoading: false,
  categoryError: "",
};

export const getCategories = createAsyncThunk(
  "getCategory",
  async (thunkAPI) => {
    let apiRes = await getWrapper(apiUrl + "category");
    return apiRes.data.category;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: category,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.categoryLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoryLoading = false;
      state.category = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.categoryLoading = false;
      state.categoryError = action.error.message;
    });
  },
});

export default categorySlice.reducer;
