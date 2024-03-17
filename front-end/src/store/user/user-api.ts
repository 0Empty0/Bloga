import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const UserApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({})
})
