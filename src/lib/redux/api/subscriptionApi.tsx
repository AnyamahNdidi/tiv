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

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQuery,
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/create/subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    updateSubscription: builder.mutation({
      query: ({ subscription_id, ...data }) => ({
        url: `/${subscription_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (subscription_id) => ({
        url: `/${subscription_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
    listSubscriptions: builder.query({
      query: () => "/",
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useListSubscriptionsQuery,
} = subscriptionApi;
