"use client";

import React from "react";
import { OverviewUserData } from "../OverviewDatas/OverviewUserData";

interface userChartProps {
  data: {
    range: {
      from: string;
      to: string;
    };
    summary: {
      total_active_users: number;
      total_users: number;
      total_verifications_used: number;
      total_verified_users: number;
    };
  };
}

const OverviewUserChart: React.FC<userChartProps> = ({ data }) => {
  console.log("data chart", data);
  const { totalAccessGranted, activeUsers, inactiveUsers } =
    OverviewUserData.summary;

  const summaryCards = [
    {
      label: "Total Users",
      value: data?.summary?.total_users || 0,
    },
    {
      label: "Active Users",
      value: data?.summary?.total_active_users || 0,
    },
    {
      label: "Verified Users",
      value: data?.summary?.total_verified_users || 0,
    },
    {
      label: "Total Verifications",
      value: data?.summary?.total_verifications_used || 0,
    },
  ];

  return (
    <div className="p-6 md:px-12 space-y-10">
      {/* Summary Cards */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 justify-between">
        {summaryCards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg w-full p-4 sm:p-5 space-y-2"
          >
            <h3 className="text-[15px] text-gray-600">{item.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewUserChart;
