import baseApi from "../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `/carts/`,
        method: "GET",
      }),
      providesTags: ["CART"],
    }),
    createCart: builder.mutation({
      query: () => ({
        url: `/carts/`,
        method: "POST",
      }),
      providesTags: ["CART"],
    }),
    addToCart: builder.mutation({
      query: ({ cartId, data }) => ({
        url: `/carts/${cartId}/items/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),
    updateCartItem: builder.mutation({
      query: ({ cartId, itemId, data }) => ({
        url: `/carts/${cartId}/items/${itemId}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} = cartApi;
