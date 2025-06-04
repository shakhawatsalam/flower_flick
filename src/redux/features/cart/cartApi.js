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
      async onQueryStarted(
        { cartId, data, flower }, // Now using the full flower object
        { dispatch, queryFulfilled }
      ) {
        // Apply an optimistic update to the cache
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const cart = draft[0]; // Assuming there's only one cart

            // Try to find if the flower already exists in cart items
            const item = cart?.items.find(
              (item) => item.flower.id === flower.id
            );

            if (item) {
              // ✅ If the flower is already in the cart:
              // - Increase the quantity
              // - Update the total price of the item
              cart.total_price -= item.total_price;
              item.quantity += data.quantity;
              item.total_price = item.quantity * flower.price;
              cart.total_price += item.total_price;
            } else {
              // ✅ If the flower is NOT in the cart:
              // - Add a new item to the cart
              // - Push the full flower object
              const newItem = {
                id: Date.now(), // temporary ID for UI
                flower: flower,
                quantity: data.quantity,
                total_price: data.quantity * flower.price,
              };
              cart?.items.push(newItem);
              cart.total_price += newItem.total_price;
            }
          })
        );

        // Rollback if the API call fails
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateCartItem: builder.mutation({
      query: ({ cartId, itemId, data }) => ({
        url: `/carts/${cartId}/items/${itemId}/`,
        method: "PATCH",
        body: data, // e.g., { quantity: 3 }
      }),
      invalidatesTags: ["CART"],
      async onQueryStarted(
        { cartId, itemId, data },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const cart = draft[0]; // Assuming a single cart structure

            const item = cart?.items.find((item) => item.id === itemId);
            if (!item) return;

            // Subtract old total price before updating
            cart.total_price -= item.total_price;

            // Optimistically update item quantity and total price
            item.quantity = data.quantity;
            item.total_price = data.quantity * item.flower.price;

            // Add new total price
            cart.total_price += item.total_price;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Revert changes if update fails
        }
      },
    }),

    deleteCartItem: builder.mutation({
      query: ({ cartId, itemId }) => ({
        url: `/carts/${cartId}/items/${itemId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
      async onQueryStarted({ cartId, itemId }, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const cart = draft[0]; // assuming a single cart
            const itemIndex = cart?.items.findIndex(
              (item) => item.id === itemId
            );

            if (itemIndex === -1 || itemIndex === undefined) return;

            const item = cart.items[itemIndex];

            // Subtract the item's total price from cart total
            cart.total_price -= item.total_price;

            // Remove the item from the cart
            cart.items.splice(itemIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // Roll back optimistic update if the request fails
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateCartMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
