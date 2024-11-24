import apiSlice from "./api";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailySales: builder.query({
      query: () => ({
        url: `admin/overview/daily-sales`,
        method: "get",
      }),
    }),
    getPendingOrders: builder.query({
      query: () => ({
        url: `admin/overview/pending-orders`,
        method: "get",
      }),
    }),
    getRevenueStatistics: builder.query({
      query: ({ period }) => ({
        url: "admin/overview/revenue-statistics",
        method: "get",
        params: { period },
      }),
    }),
    getTopSellingProducts: builder.query({
      query: ({ period }) => ({
        url: "admin/overview/top-selling-products",
        method: "get",
        params: { period },
      }),
    }),
    getSearchCustomer: builder.query({
      query:({query})=>({
        url:"admin/search",
        method:"get",
        params:{query},
      }),
    }),
    getSearchProducts: builder.query({
      query:({query})=>({
        url:"products/search",
        method:"get",
        params:{query},
      }),
    }),
    createOrder: builder.mutation({
      query: ( body ) => ({
        url: "admin/orders/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetDailySalesQuery,
  useGetRevenueStatisticsQuery,
  useGetPendingOrdersQuery,
  useGetTopSellingProductsQuery,
  useGetSearchCustomerQuery,
  useGetSearchProductsQuery,
  useCreateOrderMutation,
} = adminApiSlice;
