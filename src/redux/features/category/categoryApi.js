import baseApi from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: `/categories/`,
      }),
    }),
  }),
});

export const { useCategoriesQuery } = categoryApi;
