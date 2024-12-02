import apiSlice from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (params) => ({
        url: "products/search",
        method: "get",
        params,
      }),
    }),
  }),
});


export const { useSearchProductQuery } = productApiSlice;
