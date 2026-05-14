import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/states/auth.slice";
import productReducer from "../feature/products/state/product.slice";
import cartReducer from "../feature/Cart/states/cart.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
