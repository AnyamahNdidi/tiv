"use client";

import React from "react";
import { overviewInspectionData } from "../OverviewDatas/OverviewInspectionData";
import { PieChart, Pie, Cell } from "recharts";

interface InspectionChartProps {
  data: {
    range: {
      from: string;
      to: string;
    };
    total_inspections: number;
    total_completed: number;
    total_pending: number;
    total_revenue: number;
  };
}

const COLORS = ["#EC5F34", "#4B4B4B"];

const OverviewInspectionChart: React.FC<InspectionChartProps> = ({ data }) => {
  const { summary, agents, revenue } = overviewInspectionData;

  if (!data) return null;

  const chartData = [
    { name: "Completed", value: data.total_completed },
    { name: "Pending", value: data.total_pending },
    { name: "Total Revenue", value: data.total_revenue ?? 0 },
    // { name: "Total Revenue", value: data.total_revenue??0 },
  ];

  return (
    <div className="p-4 sm:p-6 md:px-12 space-y-10">
      {/* Summary Cards */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 sm:gap-5">
        {[
          {
            label: "Total Inspections",
            value: data.total_inspections,
          },
          { label: "Total Completed", value: data.total_completed },
          { label: "Total Pending", value: data.total_pending },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg w-full sm:w-[48%] md:w-[40%] lg:w-[32%] p-4 sm:p-5 space-y-2"
          >
            <h3 className="text-sm md:text-[15px] text-gray-600 font-medium">
              {item.label}
            </h3>
            <p className="text-2xl md:text-[26px] lg:text-[28px] font-semibold text-gray-800">
              {item.value ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Charts */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 justify-center">
        {/* Agents Chart */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Total Agents Onboarded
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={300} height={200}>
              <Pie
                data={chartData}
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
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
                <tspan x="50%" dy="10%" fontSize={20} fontWeight="bold">
                  {agents.total}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex justify-around w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 rounded bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Active</span>
              <span className="font-semibold">{agents.active}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 rounded bg-[#4B4B4B]" />
              <span className="font-semibold text-gray-500">Inactive</span>
              <span className="font-semibold">{agents.inactive}</span>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        {/* <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Inspection Revenue Generated
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={300} height={200}>
              <Pie
                data={chartData}
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {chartData.map((entry, index) => (
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
                  Total Revenue
                </tspan>
                <tspan x="50%" dy="10%" fontSize={20} fontWeight="bold">
                  ${data.total_revenue.toLocaleString()}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex gap-2 justify-around w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Completed</span>
              <span className="font-semibold">{data.total_completed}</span>
            </div>
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#4B4B4B]" />
              <span className="font-semibold text-gray-500">Pending</span>
              <span className="font-semibold">{data.total_pending}</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OverviewInspectionChart;
