import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
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
  endpoints: () => ({}),
});

export default baseApi;
