import apiSlice from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: ({ query }) => ({
        url: "products/search",
        method: "get",
        params: { query },
      }),
    }),
  }),
});


export const { useSearchProductQuery } = productApiSlice;
