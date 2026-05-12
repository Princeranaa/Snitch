import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProduct: [],
    products:[]
  },
  reducers: {
    sellerProduct: (state, action) => {
      state.sellerProduct = action.payload;
    },
    setProducts: (state,action)=>{
      state.products = action.payload;
    }
  },
});

export const { sellerProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;
