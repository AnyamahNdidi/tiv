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

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery,
  tagTypes: ["Authorization"],
  endpoints: (builder) => ({
    verifyUser: builder.mutation({
      query: (user_id) => ({
        url: `/verify_user/${user_id}/`,
        method: "POST",
        body: { verify: true },
      }),
      invalidatesTags: ["Authorization"],
    }),
    verifyBVN: builder.mutation({
      query: (user_id) => ({
        url: `/bvn_verified/${user_id}/`,
        method: "POST",
        body: { verify: true },
      }),
      invalidatesTags: ["Authorization"],
    }),
    blockUser: builder.mutation({
      query: (user_id) => ({
        url: `/block/${user_id}/`,
        method: "POST",
        body: { blocked: true },
      }),
      invalidatesTags: ["Authorization"],
    }),
    unblockUser: builder.mutation({
      query: (user_id) => ({
        url: `/block/${user_id}/`,
        method: "POST",
        body: { blocked: false },
      }),
      invalidatesTags: ["Authorization"],
    }),

    listSections: builder.query({
      query: () => ({
        url: "/list/section/",
        method: "GET",
      }),
      providesTags: ["Authorization"],
    }),

    assignPermissions: builder.mutation({
      query: (permissions) => ({
        url: "/assign/permissions/",
        method: "POST",
        body: permissions,
      }),
      invalidatesTags: ["Authorization"],
    }),
  }),
});

export const {
  useVerifyUserMutation,
  useVerifyBVNMutation,
  useBlockUserMutation,
  useListSectionsQuery,
  useAssignPermissionsMutation,
  useUnblockUserMutation,
} = authorizationApi;
