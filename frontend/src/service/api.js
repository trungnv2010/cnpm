import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQueryWithAuth = (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const apiKey = process.env.REACT_APP_KEY;
      if (apiKey) headers.set("X-API-KEY", apiKey);

      const token = api.getState().user?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  
  return baseQuery(args, api, extraOptions);
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});

export default apiSlice;
