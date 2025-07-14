import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://9jatext.com.ng/admin/api/v1",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: baseQuery,
  tagTypes: ["Overview"],
  endpoints: (builder) => ({
    getRevenue: builder.query({
      query: () => "/overview/revenue/",
      providesTags: ["Overview"],
    }),
    getTenants: builder.query({
      query: () => "/overview/tenant/",
      providesTags: ["Overview"],
    }),
    getTenantById: builder.query({
      query: (tenant_id) => `/overview/${tenant_id}/tenant/`,
      providesTags: ["Overview"],
    }),
    getPropertyById: builder.query({
      query: (property_id) => `/overview/${property_id}/property/`,
      providesTags: ["Overview"],
    }),
    getInspectionOverview: builder.query({
      query: () => "/overview/inspection/",
      providesTags: ["Overview"],
    }),
    getUserOverview: builder.query({
      query: () => "/overview/user/",
      providesTags: ["Overview"],
    }),
    getVerifications: builder.query({
      query: () => "/overview/verifications/",
      providesTags: ["Overview"],
    }),
    getVerificationDetails: builder.query({
      query: (id) => `/overview/verification/${id}/details/`,
      providesTags: ["Overview"],
    }),
    getUserDetails: builder.query({
      query: (user_id) => `/admin/user/details/${user_id}/`,
      providesTags: ["Overview"],
    }),
  }),
});

export const {
  useGetRevenueQuery,
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useGetPropertyByIdQuery,
  useGetInspectionOverviewQuery,
  useGetUserOverviewQuery,
  useGetVerificationsQuery,
  useGetVerificationDetailsQuery,
  useGetUserDetailsQuery,
} = overviewApi;
