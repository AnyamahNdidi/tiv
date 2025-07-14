"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dashboardStats } from "./TransactionData";

interface DailyData {
  day: string;
  date: string;
  amount: number;
}

interface TransactionChartProps {
  dailyData: DailyData[];
}

interface CustomTooltipProps {
  active: boolean;
  payload: { value: number }[];
}

interface CustomTooltipProps {
  active: boolean;
  payload: { value: number }[];
}
interface ChartData {
  name: string;
  revenue: number;
}

const data: ChartData[] = [
  { name: "Mon", revenue: 40000 },
  { name: "Tue", revenue: 30000 },
  { name: "Wed", revenue: 50000 },
  { name: "Thur", revenue: 45000 },
  { name: "Fri", revenue: 60000 },
  { name: "Sat", revenue: 70000 },
  { name: "Sun", revenue: 75000 },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 px-4 py-2 rounded shadow">
        <p className="text-sm text-gray-700 font-medium">
          Revenue: ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const TransactionChart: React.FC<TransactionChartProps> = ({ dailyData }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's sm breakpoint
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData = dailyData.map((item) => ({
    name: item.day.slice(0, 3), // Get first 3 letters of day
    revenue: item.amount,
  }));
  const { tenantManagement, inspectionRevenue } = dashboardStats;

  const tenantChartData = [
    { name: "Active", value: tenantManagement.availableFund },
    { name: "Inactive", value: tenantManagement.tenantCharge },
  ];

  const inspectionChartData = [
    { name: "Agent Paid", value: inspectionRevenue.agentPaid },
    { name: "Revenue Generated", value: inspectionRevenue.revenueGenerated },
  ];

  const COLORS = ["#EC5F34", "#4B4B4B"];

  return (
    <div>
      <div className="bg-white rounded-md shadow-md px-4 sm:px-6 md:px-10 py-6 mt-6 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray=""
            />
            <XAxis
              dataKey="name"
              interval={0}
              axisLine={{ stroke: "#EC5F34", strokeWidth: 3 }}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tick={(props) => {
                const { x, y, payload } = props;

                // Mobile: rotate and reduce size
                if (isMobile) {
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={10}
                      textAnchor="end"
                      fill="#6B7280"
                      fontSize={10}
                      transform={`rotate(-30, ${x}, ${y})`}
                    >
                      {payload.value}
                    </text>
                  );
                }

                // Desktop: original styling
                return (
                  <text
                    x={x}
                    y={y}
                    dy={16}
                    textAnchor="middle"
                    fill="#6B7280"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            <YAxis hide={true} domain={["dataMin - 0"]} />
            <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#EC5F34"
              activeDot={{ fill: "#EC5F34", stroke: "#EC5F34", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts Section */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 mt-10 justify-between">
        {/* Tenant Management */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Tenant Management
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={300} height={200}>
              <Pie
                data={tenantChartData}
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {tenantChartData.map((entry, index) => (
                  <Cell
                    key={`cell-tenant-${index}`}
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
                  ${tenantManagement.totalFunded.toLocaleString()}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex justify-around w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Active</span>
              <span className="font-semibold">
                ${tenantManagement.availableFund.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#4B4B4B]" />
              <span className="font-semibold text-gray-500">Inactive</span>
              <span className="font-semibold">
                ${tenantManagement.tenantCharge.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Inspection Revenue */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center">
          <div className="w-full px-6 pt-6">
            <h3 className="text-sm text-gray-700 font-semibold text-start mb-4">
              Inspection Revenue Generated
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <PieChart width={300} height={200}>
              <Pie
                data={inspectionChartData}
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {inspectionChartData.map((entry, index) => (
                  <Cell
                    key={`cell-inspect-${index}`}
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
                  Total Received
                </tspan>
                <tspan x="50%" dy="10%" fontSize={20} fontWeight="bold">
                  ${inspectionRevenue.totalReceived.toLocaleString()}
                </tspan>
              </text>
            </PieChart>
          </div>
          <hr className="w-full border-t border-gray-200 my-4" />
          <div className="flex justify-around w-full px-6 pb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#EC5F34]" />
              <span className="font-semibold text-gray-500">Agent Paid</span>
              <span className="font-semibold">
                ${inspectionRevenue.agentPaid.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[7px] md:text-[9px] lg:text-[10px] xl:text-[12px]">
              <span className="w-3 h-1 rounded bg-[#4B4B4B]" />
              <span className="font-semibold text-gray-500">Revenue</span>
              <span className="font-semibold">
                ${inspectionRevenue.revenueGenerated.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
