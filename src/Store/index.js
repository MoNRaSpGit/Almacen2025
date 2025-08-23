// src/Store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import noEncontradosReducer from "./noEncontradosSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    orders: ordersReducer,
    noEncontrados: noEncontradosReducer,
  },
  middleware: (getDefault) => getDefault().concat(productsApi.middleware),
});
