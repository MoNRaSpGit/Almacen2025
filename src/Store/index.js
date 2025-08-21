// src/Store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefault) => getDefault().concat(productsApi.middleware),
});
