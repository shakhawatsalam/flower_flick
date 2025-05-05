import { data } from "react-router";
import baseApi from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: ({ searchTerm, categories, priceRange, sortValue, page }) => ({
        url: `/flowers/?search=${searchTerm}&category_id=${categories}&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&ordering=${sortValue}&page=${page}`,
      }),
      providesTags: ["PRODUCT"],
    }),
    createFlower: builder.mutation({
      query: (data) => ({
        url: `/flowers/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    uploadFlowerImage: builder.mutation({
      query: ({ flowerId, data }) => ({
        url: `/flowers/${flowerId}/images/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    deleteFlowerImage: builder.mutation({
      query: ({ flowerId, id }) => ({
        url: `/flowers/${flowerId}/images/${id}/`,
        method: "DELETE",
        body: data,
      }),
      // invalidatesTags: ["IMAGE"],
    }),
    deleteFlower: builder.mutation({
      query: (id) => ({
        url: `/flowers/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    updateFlower: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flowers/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    getFlowerImage: builder.query({
      query: ({ flowerId }) => ({
        url: `/flowers/${flowerId}/images/`,
      }),
      // providesTags: ["IMAGE"],
    }),
    productsById: builder.query({
      query: ({ id }) => ({
        url: `/flowers/${id}/`,
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useProductsByIdQuery,
  useCreateFlowerMutation,
  useUploadFlowerImageMutation,
  useDeleteFlowerMutation,
  useDeleteFlowerImageMutation,
  useGetFlowerImageQuery,
  useUpdateFlowerMutation,
} = productApi;
