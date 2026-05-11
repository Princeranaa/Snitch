import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProduct: [],
  },
  reducers: {
    sellerProduct: (state, action) => {
      state.sellerProduct = action.payload;
    },
  },
});

export const { sellerProduct } = productSlice.actions;
export default productSlice.reducer;
