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

export const verificationApi = createApi({
  reducerPath: "verificationApi",
  baseQuery: baseQuery,
  tagTypes: ["Verification"],
  endpoints: (builder) => ({
    getVerificationRequests: builder.query({
      query: (params) => ({
        url: "/verification/request/",
        params: {
          search: params?.search,
          page: params?.page,
          page_size: params?.page_size,
        },
      }),
      providesTags: ["Verification"],
    }),
    getVerificationDetail: builder.query({
      query: (id) => `/verification/request/${id}/details/`,
      providesTags: ["Verification"],
    }),
    getWorkplaceVerifications: builder.query({
      query: (params) => ({
        url: "/verification/task/docment/",
        params: {
          search: params?.search,
          page: params?.page,
          page_size: params?.page_size,
        },
      }),
      providesTags: ["Verification"],
    }),
    getUploadedDocuments: builder.query({
      query: (id) => `/verification/${id}/documents/`,
      providesTags: ["Verification"],
    }),
    updateWorkplaceStatus: builder.mutation({
      query: ({ id, action }) => ({
        url: `/verification/${id}/workplace/`,
        method: "PUT",
        body: { action },
      }),
      invalidatesTags: ["Verification"],
    }),
    getVerificationProfile: builder.query({
      query: (params) => ({
        url: "/verification/profile/",
        params: {
          search: params?.search,
          search_by_day: params?.search_by_day,
          date_from: params?.date_from,
          date_to: params?.date_to,
          page: params?.page,
          page_size: params?.page_size,
        },
      }),
      providesTags: ["Verification"],
    }),
    getUserVerificationSummary: builder.query({
      query: (userId) => `/verification/profile/details/${userId}/`,
      providesTags: ["Verification"],
    }),
  }),
});

export const {
  useGetVerificationRequestsQuery,
  useGetVerificationDetailQuery,
  useGetWorkplaceVerificationsQuery,
  useGetUploadedDocumentsQuery,
  useUpdateWorkplaceStatusMutation,
  useGetVerificationProfileQuery,
  useGetUserVerificationSummaryQuery,
} = verificationApi;
