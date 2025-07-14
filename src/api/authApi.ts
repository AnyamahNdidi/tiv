import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    adminSignup: build.mutation<
      any,
      { first_name: string; last_name: string; email: string; role: string }
    >({
      query: (data) => ({
        url: "admin/api/v1/admin/create/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAdminSignupMutation } = authApi;
