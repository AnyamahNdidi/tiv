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

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: baseQuery,
  tagTypes: ["Finance"],
  endpoints: (builder) => ({
    getFinanceRevenue: builder.query({
      query: () => "/finance/revenue/",
      providesTags: ["Finance"],
    }),
    getFinanceRevenueDump: builder.query({
      query: () => "/finance/revenue/dump/",
      providesTags: ["Finance"],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/create/coupon/",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Finance"],
    }),
    confirmCouponCode: builder.query({
      query: (code) => `/confirm/coupon/code/${code}`,
      providesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetFinanceRevenueQuery,
  useGetFinanceRevenueDumpQuery,
  useCreateCouponMutation,
  useConfirmCouponCodeQuery,
} = financeApi;
