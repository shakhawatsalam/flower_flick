import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice.js";
import baseApi from "./features/api/baseApi.js";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
