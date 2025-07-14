import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetRevenueQuery } from "@/lib/redux/api/overviewApi";

interface RevenueOverviewCard {
  title: string;
  amount: number;
  period: string;
  growth?: number;
}

const OverviewRevenueChart: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: revenueData, isLoading } = useGetRevenueQuery({});

  const revenueCards: RevenueOverviewCard[] = [
    {
      title: "Total Revenue",
      amount: revenueData?.revenue?.total_revenue || 0,
      period: `${revenueData?.range?.from} - ${revenueData?.range?.to}`,
    },
    {
      title: "Verification Revenue",
      amount: revenueData?.revenue?.verification_amount || 0,
      period: `${revenueData?.range?.from} - ${revenueData?.range?.to}`,
    },
    {
      title: "Wallet Funding",
      amount: revenueData?.revenue?.fund_wallet_total || 0,
      period: `${revenueData?.range?.from} - ${revenueData?.range?.to}`,
    },
    {
      title: "Tenant Transactions",
      amount: revenueData?.revenue?.tenant_transaction_total || 0,
      period: `${revenueData?.range?.from} - ${revenueData?.range?.to}`,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 overflow-x-hidden">
      {/* Revenue Cards */}
      <div className="flex flex-wrap xl:flex-nowrap gap-6 mb-8">
        {revenueCards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-4 flex flex-col w-full sm:w-[48%] md:w-[30%] lg:w-1/4 min-w-[200px]"
          >
            <h3 className="text-xs sm:text-[12px] font-medium text-gray-700">
              {item.title}
            </h3>
            <p className="text-[16px] sm:text-[20px] font-bold text-gray-900 mt-1">
              ₦{item.amount.toLocaleString()}
            </p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-md shadow-md px-4 sm:px-6 md:px-10 py-6 mt-6 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={revenueData?.daily_breakdown}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray=""
            />
            <XAxis
              dataKey="day"
              interval={0}
              axisLine={{ stroke: "#EC5F34", strokeWidth: 3 }}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tick={(props) => {
                const { x, y, payload } = props;
                return isMobile ? (
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
                ) : (
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
            <YAxis hide={true} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-300 px-4 py-2 rounded shadow">
                      <p className="text-sm text-gray-700 font-medium">
                        Revenue: ₦{payload[0]?.value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#EC5F34"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "#EC5F34",
                stroke: "#EC5F34",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewRevenueChart;
