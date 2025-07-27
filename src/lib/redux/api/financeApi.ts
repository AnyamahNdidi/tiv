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
      query: (params) => ({
        url: "/finance/revenue/dump/",
        params: {
          search: params?.search,
          date_from: params?.date_from,
          date_to: params?.date_to,
          page: params?.page,
          page_size: params?.page_size,
        },
      }),
      providesTags: ["Finance"],
    }),
    getAllCoupons: builder.query({
      query: () => "/get/coupon/all/",
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
      query: (code) => ({
        url: `/confirm/coupon/code/`,
        params: { coupon_code: code },
      }),
      providesTags: ["Finance"],
    }),
    updateServiceCharge: builder.mutation({
      query: (chargeData) => ({
        url: "/service/charge/",
        method: "PUT",
        body: chargeData,
      }),
      invalidatesTags: ["Finance"],
    }),
    updateBonusCharge: builder.mutation({
      query: (bonusData) => ({
        url: "/bonus/charge/",
        method: "PUT",
        body: bonusData,
      }),
      invalidatesTags: ["Finance"],
    }),
    updateInspectionCharge: builder.mutation({
      query: (inspectionData) => ({
        url: "/inspection/charge/",
        method: "PUT",
        body: inspectionData,
      }),
      invalidatesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetFinanceRevenueQuery,
  useGetFinanceRevenueDumpQuery,
  useCreateCouponMutation,
  useConfirmCouponCodeQuery,
  useGetAllCouponsQuery,
  useUpdateServiceChargeMutation,
  useUpdateBonusChargeMutation,
  useUpdateInspectionChargeMutation,
} = financeApi;
