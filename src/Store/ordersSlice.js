// src/Store/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // cada pedido será {id, date, items: [...]}
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: action.payload, // array de productos
      };
      state.orders.push(newOrder);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
