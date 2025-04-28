import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice.js";
import cartSlice from "./features/cart/cartSlice.js";
import baseApi from "./features/api/baseApi.js";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    userSlice,
    cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
