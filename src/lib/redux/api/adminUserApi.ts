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

export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: baseQuery,
  tagTypes: ["AdminUser"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: "/create/roles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),
    listRoles: builder.query({
      query: () => "/role/list/",
      providesTags: ["AdminUser"],
    }),
    updateRole: builder.mutation({
      query: ({ role_id, ...data }) => ({
        url: `/roles/${role_id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),
    deleteRole: builder.mutation({
      query: (role_id) => ({
        url: `/roles/${role_id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUser"],
    }),
    updateAdminUser: builder.mutation({
      query: ({ admin_id, ...data }) => ({
        url: `/admin/user/${admin_id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),
    deleteAdminUser: builder.mutation({
      query: (admin_id) => ({
        url: `/admin/user/${admin_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUser"],
    }),
    listAdminUsers: builder.query({
      query: () => "/admin/users/",
      providesTags: ["AdminUser"],
    }),
    getAdminUserDetail: builder.query({
      query: (admin_id) => `/admin/users/${admin_id}/`,
      providesTags: ["AdminUser"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreateRoleMutation,
  useListRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
  useListAdminUsersQuery,
  useGetAdminUserDetailQuery,
} = adminUserApi;
