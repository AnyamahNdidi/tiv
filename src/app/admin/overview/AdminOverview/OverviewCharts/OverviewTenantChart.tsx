"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useGetTenantsQuery } from "@/lib/redux/api/overviewApi";

export default function OverviewTenantChart() {
  const { data: tenantOverview, isLoading } = useGetTenantsQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  return (
    <div className="xl:flex gap-4 px-4 md:px-12 py-4">
      {/* Revenue Card */}
      <div className="flex flex-col md:flex-col lg:flex-row justify-between items-start lg:items-center bg-white border border-gray-200 rounded-[16px] px-6 py-9 min-h-[160px] w-full gap-6">
        {/* Text box */}
        <div className="flex flex-col justify-between h-full flex-1">
          <p className="text-[#4B4B4B] text-base font-medium">
            Total Wallet Balance
          </p>
          <p className="text-[32px] font-bold text-black mt-2">
            ₦{tenantOverview?.total_wallet_balance?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-gray-500">
            {tenantOverview?.range?.from} - {tenantOverview?.range?.to}
          </p>
        </div>

        {/* Chart box */}
        <div className="w-full lg:w-[250px] h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { value: tenantOverview?.total_wallet_transactions || 0 },
                { value: tenantOverview?.total_bonus_given || 0 },
                { value: tenantOverview?.fund_wallet_total || 0 },
                { value: tenantOverview?.total_wallet_balance || 0 },
              ]}
            >
              <defs>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC5F34" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EC5F34" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#EC5F34"
                strokeWidth={2}
                fill="url(#colorOrange)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Tenants Added */}
      <div className="flex flex-col justify-center bg-white border border-gray-200 rounded-[16px] px-6 py-5 min-h-[160px] w-full">
        <p className="text-[#4B4B4B] text-base font-medium">
          Total Tenants Added
        </p>
        <p className="text-[32px] font-bold text-black mt-2">
          {tenantOverview?.total_tenants || 0}
        </p>
      </div>

      {/* Total Properties Added */}
      <div className="flex flex-col justify-center bg-white border border-gray-200 rounded-[16px] px-6 py-5 min-h-[160px] w-full">
        <p className="text-[#4B4B4B] text-base font-medium">
          Total Properties Added
        </p>
        <p className="text-[32px] font-bold text-black mt-2">
          {tenantOverview?.total_properties || 0}
        </p>
      </div>
    </div>
  );
}
