import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        const itemProductId = item.product?._id?.toString();
        const itemVariantId = item.variant?.toString();

        if (
          itemProductId === productId?.toString() &&
          itemVariantId === variantId?.toString()
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    },
  },
});

export const { setItems, addItems, removeItems, incrementCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
