// src/store/noEncontradosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const noEncontradosSlice = createSlice({
  name: "noEncontrados",
  initialState: [],
  reducers: {
    agregarNoEncontrado: (state, action) => {
      state.push({
        code: action.payload, // código de barras
        date: new Date().toISOString(), // fecha/hora de intento
      });
    },
    limpiarNoEncontrados: () => [],
  },
});

export const { agregarNoEncontrado, limpiarNoEncontrados } = noEncontradosSlice.actions;
export default noEncontradosSlice.reducer;
