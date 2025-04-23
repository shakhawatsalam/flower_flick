import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: `/auth/jwt/create/`,
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/users/`,
        method: "POST",
        body: data,
      }),
    }),
    resendActivation: builder.mutation({
      query: (data) => ({
        url: `/auth/users/resend_activation/`,
        method: "POST",
        body: data,
      }),
    }),
    fetchUserProfile: builder.query({
      query: () => ({
        url: `/auth/users/me`,
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useLazyFetchUserProfileQuery,
  useSignUpMutation,
  useFetchUserProfileQuery,
  useResendActivationMutation,
} = authApi;
