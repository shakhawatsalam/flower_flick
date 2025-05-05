import baseApi from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `/categories/`,
      }),
      providesTags: ["CATEGORY"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
