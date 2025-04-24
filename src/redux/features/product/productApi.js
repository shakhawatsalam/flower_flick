import baseApi from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: ({ searchTerm, categories, priceRange, sortValue, page }) => ({
        url: `/flowers/?search=${searchTerm}&category_id=${categories}&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&ordering=${sortValue}&page=${page}`,
      }),
    }),
    productsById: builder.query({
      query: ({ id }) => ({
        url: `/flowers/${id}/`,
      }),
    }),
  }),
});

export const { useProductsQuery, useProductsByIdQuery } = productApi;
