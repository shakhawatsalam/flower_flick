import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};

const calculateTotal = (items) =>
  items.reduce((acc, item) => acc + item.flower.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      state.cart = payload;
    },
    removeCart: (state) => {
      state.cart = {};
    },
    updateItemQuantity: (state, { payload }) => {
      const { itemId, quantity } = payload;
      const item = state.cart.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
        state.cart.total_price = calculateTotal(state.cart.items);
      }
    },
    deleteItem: (state, { payload }) => {
      state.cart.items = state.cart.items.filter((i) => i.id !== payload);
      state.cart.total_price = calculateTotal(state.cart.items);
    },
  },
});

export const { addCart, updateItemQuantity, deleteItem, removeCart } =
  cartSlice.actions;

export default cartSlice.reducer;
