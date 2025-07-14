"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  overviewMetrics,
  landlordOnboarding,
  revenueFromLandlord,
} from "../OverviewDatas/OverviewOperationsData";

const COLORS = ["#EC5F34", "#4B4B4B"];

const OverviewOperationsChart = () => {
  const metricCards = [
    { label: "Total Requested", value: overviewMetrics.totalRequested },
    { label: "Completed", value: overviewMetrics.completed },
    { label: "Pending", value: overviewMetrics.pending },
    { label: "Failed", value: overviewMetrics.failed },
    { label: "Ongoing", value: overviewMetrics.ongoing },
  ];

  const agentChartData = [
    { name: "Active", value: landlordOnboarding.active },
    { name: "Inactive", value: landlordOnboarding.inactive },
  ];

  const revenueChartData = [
    { name: "Verifications", value: revenueFromLandlord.verifications },
    { name: "Tenant Mgmt", value: revenueFromLandlord.tenantManagement },
  ];

  return (
    <div className="p-4 sm:p-6 md:px-12 space-y-10">
      {/* Overview Metrics */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {metricCards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg w-full sm:w-[48%] md:w-full p-5 space-y-3"
          >
            <h3 className="text-sm text-gray-600">{item.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 justify-between">
        {/* Landlord Chart */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Landlord Onboarding
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={500} height={280}>
              <Pie
                data={agentChartData}
                startAngle={180}
                endAngle={0}
                cx={250}
                cy={140}
                innerRadius={70}
                outerRadius={90}
                dataKey="value"
                labelLine={false}
              >
                {agentChartData.map((entry, index) => (
                  <Cell
                    key={`cell-agent-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="#111827"
              >
                <tspan x="50%" dy="-15%">
                  Total
                </tspan>
                <tspan x="50%" dy="10%" fontSize="20" fontWeight="bold">
                  {landlordOnboarding.total}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex justify-center gap-8 w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 rounded-md bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Active</span>
              <span className="font-semibold">{landlordOnboarding.active}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 rounded-sm bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Inactive</span>
              <span className="font-semibold">
                {landlordOnboarding.inactive}
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Revenue From Landlords
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={500} height={280}>
              <Pie
                data={revenueChartData}
                startAngle={180}
                endAngle={0}
                cx={250}
                cy={140}
                innerRadius={70}
                outerRadius={90}
                dataKey="value"
                labelLine={false}
              >
                {revenueChartData.map((entry, index) => (
                  <Cell
                    key={`cell-revenue-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="#111827"
              >
                <tspan x="50%" dy="-15%">
                  Total
                </tspan>
                <tspan x="50%" dy="10%" fontSize="20" fontWeight="bold">
                  ${revenueFromLandlord.totalReceived.toLocaleString()}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex justify-center gap-8 w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded-md bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Verifications</span>
              <span className="font-semibold">
                ${revenueFromLandlord.verifications.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded-sm bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">
                Tenant Management
              </span>
              <span className="font-semibold">
                ${revenueFromLandlord.tenantManagement.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewOperationsChart;
