import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/states/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
