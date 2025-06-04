import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function isTokenExpired(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const exp = decodedPayload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch {
    return true; // Assume invalid if any error
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://flowerflick.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const parsedToken = JSON.parse(token);
        if (parsedToken && !isTokenExpired(parsedToken)) {
          headers.set("authorization", `JWT ${parsedToken}`);
        } else {
          localStorage.removeItem("authToken");
        }
      }
      return headers;
    } catch {
      localStorage.removeItem("authToken");
      return headers;
    }
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.data?.code === "token_not_valid") {
    localStorage.removeItem("authToken");
    // Retry the request without the token
    const retryResult = await baseQuery(args, api, extraOptions);
    return retryResult;
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["CART", "PRODUCT", "IMAGE", "CATEGORY","CREATE_CART"],
  endpoints: () => ({}),
});

export default baseApi;
