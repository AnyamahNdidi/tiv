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
      query: () => "/verification/request/",
      providesTags: ["Verification"],
    }),
    getVerificationDetail: builder.query({
      query: (id) => `/verification/request/${id}/details/`,
      providesTags: ["Verification"],
    }),
    getWorkplaceVerifications: builder.query({
      query: () => "/verification/task/docment/",
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
      query: () => "/verification/profile/",
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
