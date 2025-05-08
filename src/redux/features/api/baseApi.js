import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("authToken");
      // If token exists, add it to the Authorization heade
      if (token) {
        const parsedToken = JSON.parse(token);
        headers.set("authorization", `JWT ${parsedToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CART", "PRODUCT", "IMAGE", "CATEGORY"],
  endpoints: () => ({}),
});

export default baseApi;
