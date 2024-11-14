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
  }),
});

export const {
  useGetDailySalesQuery,
  useGetRevenueStatisticsQuery,
  useGetPendingOrdersQuery,
  useGetTopSellingProductsQuery
} = adminApiSlice;
