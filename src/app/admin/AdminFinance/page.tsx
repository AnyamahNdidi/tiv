"use client";
import React, { useState } from "react";
import { dashboardStats } from "./TransactionData";
import TransactionChart from "./TransactionChart";
import DateRangeSelector from "@/components/DateRangeSelector";
import { useGetFinanceRevenueQuery } from "@/lib/redux/api/financeApi";
interface RevenueData {
  range: {
    from: string;
    to: string;
  };
  revenue: {
    fund_wallet_total: number;
    verification_amount: number;
    tenant_transaction_total: number;
    total_revenue: number;
  };
  daily_breakdown: {
    day: string;
    date: string;
    amount: number;
  }[];
}

export default function Transaction() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: revenueData, isLoading, error } = useGetFinanceRevenueQuery({});

  console.log;

  const revenue = revenueData?.revenue || {
    total_revenue: 0,
    tenant_transaction_total: 0,
    verification_amount: 0,
    fund_wallet_total: 0,
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 w-full max-w-screen overflow-x-hidden">
      <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
        Transaction
      </h1>

      {/* Reusable Date Range */}
      <DateRangeSelector
        onDateChange={(start, end) => {
          setStartDate(revenueData?.range?.from);
          setEndDate(revenueData?.range?.to);
        }}
      />

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: revenue.total_revenue },
          { label: "Subscription", value: revenue.tenant_transaction_total },
          { label: "Inspection", value: revenue.verification_amount },
          { label: "Fund Wallet", value: revenue.fund_wallet_total },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 sm:p-5 space-y-1 sm:space-y-2"
          >
            <h3 className="text-[13px] sm:text-sm lg:text-base font-medium text-gray-600">
              {item.label}
            </h3>
            <p className="text-lg sm:text-xl lg:text-[20px] font-semibold text-gray-900">
              ₦{item.value?.toLocaleString() ?? "0"}
            </p>
          </div>
        ))}
      </div>

      {/* Transaction Chart */}
      <div className="mt-8">
        <TransactionChart dailyData={revenueData?.daily_breakdown || []} />
      </div>
    </div>
  );
}
