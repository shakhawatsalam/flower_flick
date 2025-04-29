import baseApi from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: `/orders/`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/`,
        method: "POST",
        body: data,
      }),
    }),
    paymentInitiate: builder.mutation({
      query: (data) => ({
        url: `/payment/initiate/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  usePaymentInitiateMutation,
} = orderApi;
