import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const UserApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api"
  }),
  endpoints: (builder) => ({})
})
