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

export const inspectionApi = createApi({
  reducerPath: "inspectionApi",
  baseQuery: baseQuery,
  tagTypes: ["Inspection"],
  endpoints: (builder) => ({
    getPendingInspections: builder.query({
      query: () => "/admin/inspections/pending/",
      providesTags: ["Inspection"],
    }),
    getInspectionById: builder.query({
      query: (id) => `/admin/inspections/${id}/`,
      providesTags: ["Inspection"],
    }),
    updateInspectionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/inspections/${id}/status/`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Inspection"],
    }),
  }),
});

export const {
  useGetPendingInspectionsQuery,
  useGetInspectionByIdQuery,
  useUpdateInspectionStatusMutation,
} = inspectionApi;
