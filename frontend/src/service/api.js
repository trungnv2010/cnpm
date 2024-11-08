import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = process.env.REACT_APP_KEY;
      console.log(token)
      if (token) headers.set("X-API-KEY", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;