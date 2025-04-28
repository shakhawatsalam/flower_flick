import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
